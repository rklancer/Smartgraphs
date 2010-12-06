// ==========================================================================
// Project:   Smartgraphs.authorPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// This is a place to hold the authorView until it's appended to the document

Smartgraphs.authorPageDef = SC.Page.extend({

  authorView: SC.SplitView.design({
    defaultThickness: 200,
    topLeftMaxThickness: 300,
    layoutDirection: SC.LAYOUT_HORIZONTAL,

    topLeftView: SC.ScrollView.design({

      classNames: ['desk'],
      contentView: SC.SourceListView.design({
        classNames: ['desk'],
        contentBinding: 'Smartgraphs.activityOutlineController.arrangedObjects',
        contentValueKey: 'title',
        selectionBinding: 'Smartgraphs.activityOutlineController.selection',
        isSelectable: NO
      })
    }),
    dividerView: SC.SplitDividerView,
    bottomRightView: SC.View.design()
  })
    
});

Smartgraphs.authorPage = Smartgraphs.authorPageDef.design();
