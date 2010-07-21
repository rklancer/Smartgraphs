// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphView = SC.View.extend(
/** @scope Smartgraphs.GraphView.prototype */ {

  classNames: ['smartgraph-pane'],
  childViews: 'label'.w(),
  
  label: SC.LabelView.design({
    value: 'Graph Goes Here!'
  })

});
