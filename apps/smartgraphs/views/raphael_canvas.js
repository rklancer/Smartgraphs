// ==========================================================================
// Project:   Smartgraphs.RaphaelCanvasView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs Raphael*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/

sc_require('system/raphael_context');

Smartgraphs.RaphaelCanvasView = SC.View.extend(
/** @scope Smartgraphs.RaphaelCanvasView.prototype */ {
  
  didAppendToDocument: function () {
    console.log('RaphaelCanvasView didAppendToDocument');

    var layer = this.get('layer');
    var frame = this.get('frame');
    var r = Raphael(layer, frame.width, frame.height);
    
    if (this._preparedRaphaelContext) this._preparedRaphaelContext.populateCanvas(r);
  },
  
  renderChildViews: function (context, firstTime) {
    console.log('RaphaelCanvasView renderChildViews()');
    
    var cv = this.get('childViews');
    var view;
    
    var raphaelContext = this.raphaelContext();
    
    for (var i=0, ii=cv.length; i<ii; ++i) {
      view = cv[i];
      if (!view) continue;

      raphaelContext.begin();
      view.prepareRaphaelContext(raphaelContext, firstTime);
      raphaelContext.end();
    }
    
    this._preparedRaphaelContext = raphaelContext;

    return context;
  },
  
  raphaelContext: function () {
    return Smartgraphs.RaphaelContext();
  }

});
