// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('mixins/annotation_support');  

/** @class

  The table controller manages a set of Smartgraphs.Point objects that represent a particular sampling of a
  DataDef. It is intended to be the content of a Smartgraphs.TableView.
  
  At the moment, it also instructs the tableview when to switch between 'table display' and 'numeric display' mode.
  This is done when data is streaming into the datadef from a sensor, because the table view is inefficient at 
  appending new elements and cannot do so at interactive speeds. ('Numeric display' mode displays just the latest
  sensor reading, instead of trying to append the latest sensor reading to a table.)
  
  @extends SC.Object
  @extends Smartgraphs.AnnotationSupport
*/
Smartgraphs.TableController = SC.ArrayController.extend( Smartgraphs.AnnotationSupport,
/** @scope Smartgraphs.tableController.prototype */ {

  init: function () {
    sc_super();
    var statechart = this.get('statechartDef').create();
    statechart.initStatechart();
    statechart.set('owner', this);
    this.set('statechart', statechart);
  },

  statechartDef: SC.Statechart.design({
    trace: Smartgraphs.trace,
    rootState: SC.State.design({
      substatesAreConcurrent: YES,
      
      DEFAULT: SC.State.design({
        owner: SC.outlet('statechart.owner'),

        taggingToolDidUpdateTag: function (context, tag) {
          this.get('owner').updateRecentTagIndexStack(tag);
          return YES;
        }
      })
    })
  }),
  
  statechart: null,
  
  datadef: null,
  dataRepresentation: null,
  pointset: null,
  
  /**
    Stack maintaining the indices in the table of recently tagged points. The index of the most recently-tagged point
    for this datadef is at the end of the array. When this updates, the table view can attempt to scroll the most 
    recent indices into view.
    
    @property {Number[]}
  */
  recentTagIndexStack: null,
  
  isSelectable: NO,
  
  selectionBinding:    '*pointset.selection',
  selectionBindingDefault: SC.Binding.oneWay(),
  
  isStreamingBinding:  '*datadef.isStreaming',
  isStreamingBindingDefault:  SC.Binding.oneWay(),
  
  latestXBinding:      '*datadef.latestX',
  latestXBindingDefault: SC.Binding.oneWay(),
  
  latestYBinding:      '*datadef.latestY',
  latestYBindingDefault: SC.Binding.oneWay(),

  xUnitsBinding:       '*datadef.xUnits',
  xUnitsBindingDefault: SC.Binding.oneWay(),
  
  yUnitsBinding:       '*datadef.yUnits',
  yUnitsBindingDefault: SC.Binding.oneWay(),
    
  xShortLabelBinding:  '*datadef.xShortLabel',
  xShortLabelBindingDefault: SC.Binding.oneWay(),
  
  yShortLabelBinding:  '*datadef.yShortLabel',
  yShortLabelBindingDefault: SC.Binding.oneWay(),  
  
  /**
    Whether to display the table (or else the numeric view)
    
    @property {Boolean}
  */
  showTable: function () {
    return !this.get('isStreaming');
  }.property('isStreaming').cacheable(),
  
  
  clear: function () {
    this.clearAnnotations();
    this.set('datadef', null);
    this.set('dataRepresentation', null);    
    this.set('pointset', null);
    this.set('content', []);    
  },
  
  setupTable: function (config) {      
    var datadef,
        datadefName,
        options = {},
        rep;
        
    // do this in a runloop because setting 'datadef' twice (in clear() and below) in the same runloop confuses the self-binding
    // (xUnitsBinding)
    SC.RunLoop.begin();
    this.clear();
    SC.RunLoop.end();
    
    if (SC.typeOf(config.data) === SC.T_STRING) {
      datadefName = config.data;
    }
    else {
      datadefName = config.data[0];
      options = config.data[1];
    }

    datadef = Smartgraphs.activityObjectsController.findDatadef(datadefName);
    rep = datadef.getNewRepresentation(options);

    this.set('datadef', datadef);
    this.set('dataRepresentation', rep);
    this.set('pointset', rep.get('pointset'));
    this.set('content', this.getPath('pointset.points'));
    
    this.addAnnotationsByName(config.annotations);
  },
  
  updateRecentTagIndexStack: function (tag) {
    var currentDatadefName = this.getPath('datadef.name'),
        tagDatadefName     = tag.get('datadefName'),
        guid               = SC.guidFor(tag),
        stack              = this.get('recentTagIndexStack'),
        stackIndex,
        tagX               = tag.get('x'),
        tagY               = tag.get('y'),
        point,
        i,
        len;
    
    if (SC.none(stack)) {
      stack = [];
      this.set('recentTagIndexStack', []);
      this._stackIndicesOfTagsByGuid = {};
    }
    
    if (tagDatadefName === null) {
      // tag was cleared. Remove from stack, regardless.
      stackIndex = this._stackIndicesOfTagsByGuid[guid];

      if (!SC.none(stackIndex)) {
        stack.removeAt(stackIndex, 1);
        delete this._stackIndicesOfTagsByGuid[guid];
      }
    }
    else if (tagDatadefName === currentDatadefName) {
      // push onto the stack

      // maintain the stack of recently tagged points between activity steps. However, once we start tagging a new
      // dataset, clear the stack
      if (currentDatadefName !== this._datadefNameForTagStack) {
        stack.set('length', 0);
        this._stackIndicesOfTagsByGuid = {};
        this._datadefNameForTagStack = currentDatadefName;
      }
      
      stackIndex = this._stackIndicesOfTagsByGuid[guid];

      if (!SC.none(stackIndex)) {
        stack.removeAt(stackIndex, 1);
        delete this._stackIndicesOfTagsByGuid[guid];
      }

      // Find the index, in the table, of the just-tagged point.
      for (i = 0, len = this.get('length'); i < len; i++) {
        point = this.objectAt(i);
        if (point.get('x') === tagX && point.get('y') == tagY) {
          stack.pushObject(i);
          stackIndex = stack.get('length') - 1;
          this._stackIndicesOfTagsByGuid[guid] = stackIndex;
          break;
        }
      }
    }
  },
  
  // Events
  
  sendAction: function (action, context, args) {
    var statechart = this.get('statechart');
    return statechart.sendAction.apply(statechart, arguments);
  },
  
  dataPointSelected: function (dataRepresentation, x, y) {
    Smartgraphs.statechart.sendAction('dataPointSelected', this, { dataRepresentation: dataRepresentation, x: x, y: y });
  }

});
