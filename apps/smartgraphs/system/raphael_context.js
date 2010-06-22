// ==========================================================================
// Project:   Smartgraphs.RaphaelContext
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

//  Actually, we don't really use much of the SC.Builder functionality here, or at least we build it ourselves...

Smartgraphs.RaphaelContext = SC.Builder.create({
  
  isRaphaelContext: YES,

  children: [],
  
  init: function (prevContext) {
    this.prevObject = prevContext;
    return this;
  },
  
  push: function (thisArg, callback) {
    this._thisArg = thisArg;
    this._callback = callback;
    this._arguments = Array.prototype.slice.call(arguments, 2);           // store the arguments 2...n
        
    return this;
  },

  begin: function() {
    console.log('beginning raphael context');

    var ret = Smartgraphs.RaphaelContext(this);
    this.children.push(ret);
    
    return ret;
  },
  
  end: function () {
    console.log('ending raphael context');
    return this.prevObject || this;
  },
  
  populateCanvas: function (raphael) {
    // given a raphael canvas, actually call the callbacks that will create dom nodes using raphael.
    // use our own special sauce here to insert grouping nodes with the appropriate layer ids whenever a view has child views
    
    var node;
    
    if (this._callback) {
      var raphaelObj = this._callback.apply(this._thisArg, [raphael].concat(this._arguments));
    
      // raphaelObj may be a set... handle that case
      
      // call child context populateCanvas methods
      // wrap all with a group element, if necessary
      
      // bless the right node with the id    
      
      
      // just for now...
      
      raphaelObj.node.id = this._id;
    }
    
    return node;
  },
  
  id: function (id) {
    this._id = id;
    return this;
  }
});
