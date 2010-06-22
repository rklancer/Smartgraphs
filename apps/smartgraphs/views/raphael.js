// ==========================================================================
// Project:   Smartgraphs.RaphaelView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs Raphael*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.RaphaelView = SC.View.extend(
/** @scope Smartgraphs.RaphaelView.prototype */ {

  raphaelObject: null,
  _childViewForId: {},
  _lastViewForMouseMove: null,
  
  
  
  renderChildViews: function(context, firstTime) {
    
    console.log('RaphaelView renderChildViews');
    
    var cv = this.get('childViews'), len = cv.length, idx, view ;
    for (idx=0; idx<len; ++idx) {
      view = cv[idx] ;
      if (!view) continue;
      
      // we'll try this:
      
      //view.createLayer();
      
    }
    return context ;  
  },
  

  
  didCreateLayer: function () {

    console.log('RaphaelView didCreateLayer; layerId = ' + this.get('layerId'));    
    var raphaelConstructor = Raphael;  // make jslint stop complaining that Raphael needs to be called with 'new' because of the initial cap
    var oldLayer = this.get('layer');
    var frame = this.get('frame');
    var raphaelObject = raphaelConstructor(oldLayer, frame.width, frame.height);
    


    
    // cache a reference to the raphaelObject in the top level dom element ('canvas') created by Raphael
    // note that all the *other* dom nodes created by Raphael are already given a 'raphael' property by Raphael itself
    raphaelObject.canvas.raphael = raphaelObject;    
    this.set('raphaelObject', raphaelObject);


  },
  
  registerChildView: function (view, id) {
    this._childViewForId[id] = view;
  },
  
  _ID_MATCHER: /^(sc\d+)/,
  
  _childViewForEvent: function (e) {
    var id = e.target.id;
    var match = id.match(this._ID_MATCHER);
    
    return match ? this._childViewForId[match[1]] : null;
  },
  
  mouseMoved: function (e) {
    var view = this._childViewForEvent(e);
    
    if (view && view.mouseMoved) view.mouseMoved(e);

    var lastView = this._lastViewForMouseMove;
    
    if (view !== lastView) {
      if (lastView && lastView.mouseExited) lastView.mouseExited(e);
      if (view && view.mouseEntered) view.mouseEntered(e);
    }
    
    this._lastViewForMouseMove = view;  
  },
  
  mouseDown: function (e) {
    var view = this._childViewForEvent(e);
    if (view) {
      return view.mouseDown(e);
    }
  }
});
