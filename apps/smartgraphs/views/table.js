// ==========================================================================
// Project:   Smartgraphs.TableView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.TableView = SC.View.extend(
/** @scope Smartgraphs.TableView.prototype */ {
 
  // TODO update this stuff that was copied from the old smartgraphs app.
  // important properties of the current table view:
  // tableController (content is a DataSeries atm)
  // tableController.graphController (for getting axes)
  
  layout: {
    left: 20,
    bottom: 10,
    width: 188
  },

  childViews: ['labelsView', 'scrollerView'],

  labelsView: SC.View.design({
    layout: {
      left: 0,
      top: 0,
      width: 190,
      height: 30
    },
    childViews: ['xsLabel', 'ysLabel'],

    xsLabel: SC.LabelView.design({    
      layout: {
        right: 10,
        width: 80,
        top: 7,
        height: 20
      },

      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.graphController.axes.xLabelAbbreviated')
    }),

    ysLabel: SC.LabelView.design({
      layout: {
        left: 10,
        width: 80,
        top: 7,
        height: 20
      },
      valueBinding: SC.Binding.oneWay('.parentView.parentView*tableController.graphController.axes.yLabelAbbreviated')
    })
  }),

  scrollerView: SC.ScrollView.design({
    layout: {
      left: 0,
      top: 30,
      width: 190,
      bottom: 15
    },

    borderStyle: SC.BORDER_NONE,

    contentView: SC.View.design({
      childViews: ['xsView', 'ysView'],

      // look at SC.ContentDisplay for this too
      xHeightBinding: SC.Binding.from('.xsView.height').oneWay(),
      yHeightBinding: SC.Binding.from('.ysView.height').oneWay(),

      height: function(){
        return Math.max(this.get('xHeight'), this.get('yHeight'));
      }.property('xHeight', 'yHeight').cacheable(),

      _heightDidChange: function(){
        this.adjust('height', this.get('height'));
      }.observes('height'),

      xsView: SC.ListView.design({        
        height: function () {
          var layout = this.get('layout');
          return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
        }.property('calculatedHeight', 'layout').cacheable(),

        layout: {
          left: 100,
          top: 0,
          width: 70
        },

        canEditContent: NO,
        contentValueKey: 'x',
        contentBinding: '.parentView.parentView.parentView.parentView*tableController.points',
        selectionBinding: '.parentView.parentView*tableController.selection',
        rowHeight: 18
      }),

      ysView: SC.ListView.design({
        height: function(){
          var layout = this.get('layout');
          return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
        }.property('calculatedHeight', 'layout').cacheable(),

        layout: {
          left: 10,
          top: 0,
          width: 70
        },

        canEditContent: NO,
        contentValueKey: 'y',
        contentBinding: '.parentView.parentView.parentView.parentView*tableController.points',
        selectionBinding: '.parentView.parentView*tableController.selection',
        rowHeight: 18
      })
    })
  })
    
});
