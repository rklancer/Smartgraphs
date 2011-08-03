// ==========================================================================
// Project:   Smartgraphs.Label
// Copyright: ©2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/label');

/** @class

  An annotation which displays a text label next to a data point. 

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.Label = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.Label.prototype */ {

  /**
    The x-value of the point being labeled.
    
    @property {Number}
  */
  x: SC.Record.attr(Number),
  
  /**
    The y-value of the point being labeled.
    
    @property {Number}
  */
  y: SC.Record.attr(Number),
  
  /**
    The text of the label being applied.
    
    @property {String}
  */
  text: SC.Record.attr(String),
  
  /**
    x-position of the lower left corner of the label, relative to the point the label is annotating.
    Note that this is measured in pixels.
    
    @property {Number}    
  */
  xOffset: SC.Record.attr(Number, { defaultValue: -100 }),
  
  /**
    y-position of the lower left corner of the label, relative to the point the label is annotating.
    Note that this is measured in pixels.
  
    @property {Number}
  */
  yOffset: SC.Record.attr(Number, { defaultValue: -40}),
  
  /**
    Whether to draw an 'x' (or other marker) at the target point. Should be NO if we are pointing right at a clearly
    marked data point, for example.
    
    @property {Boolean}
  */
  shouldMarkTargetPoint: SC.Record.attr(Boolean, { defaultValue: YES }),
  
  /**
    Transient property -- was the label added to the graph by the label tool? If NO, assume it was predefined in the
    activity.
    @property {Boolean}
  */
  createdByLabelTool: NO,

  /**
    Transient property -- has the label already automatically "selected all for editing"? If so, don't do so again,
    e.g., when we regain firstResponder.
    
    @property {Boolean}
  */
  hasEditedFirstTime: NO,

  labelSet: null,
  
  isRemovalEnabled: function () {
    if (this.get('labelSet')) {
      return this.getPath('labelSet.isRemovalEnabled');
    }
    else {
      return this._isRemovalEnabled || NO;
    }
  }.property(),
  
  enableRemoval: function () {
    this._isRemovalEnabled = YES;
    this.notifyPropertyChange('isRemovalEnabled');
  },
  
  disableRemoval: function () {
    this._isRemovalEnabled = NO;
    this.notifyPropertyChange('isRemovalEnabled');
  }

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.Label.viewClass = Smartgraphs.LabelView;
