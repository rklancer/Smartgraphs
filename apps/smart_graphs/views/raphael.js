// ==========================================================================
// Project:   SmartGraphs.RaphaelView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs Raphael*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.RaphaelView = SC.View.extend(
/** @scope SmartGraphs.RaphaelView.prototype */ {

  raphaelObject: null,
  _childViewForId: {},
  didCreateLayer: function () {
    console.log('didCreateLayer');
    
    var raphaelConstructor = Raphael;  // make jslint stop complaining that Raphael needs to be called with 'new' because of the initial cap
    var layout = this.get('layout');
    
    this.$().append("<div class='graph'></div>");
    var raphaelObject = raphaelConstructor(this.$('.graph')[0], layout.width, layout.height);
    this.set('raphaelObject', raphaelObject);
  },
  
  registerChildView: function (view, id) {
    this._childViewForId[id] = view;
  },
  
  _ID_MATCHER: /^(sc\d+)/,
  
  _childViewForEvent: function (e) {
    var id = e.target.id;
    var match = id.match(this._ID_MATCHER);
    console.log('id = ' + id);
    console.log('match = ' + match);
    
    return match ? this._childViewForId[match[1]] : null;
  },
  
  mouseMoved: function (e) {
    // var view = this._childViewForEvent(e);
    // if (view) {
    //   return view.mouseMoved(e);
    // }
  },
  
  mouseDown: function (e) {
    var view = this._childViewForEvent(e);
    if (view) {
      return view.mouseDown(e);
    }
  }
});
