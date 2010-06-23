// ==========================================================================
// Project:   Smartgraphs.RaphaelContext
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

//  Actually, we don't really use much of the SC.Builder functionality here, or at least we build it ourselves...

// TODO this needs tests!

Smartgraphs.RaphaelContext = SC.Builder.create({
  
  // remember this isn't really an SC.Object. The semantics of this hash are different than if they were passed to SC.Extend
  // Notably, defining 'children' in the hash would result in all RaphaelContexts sharing the same 'children' array
   
  isRaphaelContext: YES,

  init: function (prevContext) {

    this.prevObject = prevContext;
    this.isTopLevel = !prevContext;
    this.children = [];

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
    var layerNode, 
        childNode,
        renderedNodes = [],
        childNodes = [];
    
    if (this._callback) {
      var raphaelObj = this._callback.apply(this._thisArg, [raphael].concat(this._arguments));
      renderedNodes = this.nodesForRaphaelObject(raphaelObj);
    }
    
    for (var i = 0, ii = this.children.length; i < ii; i++) {
      childNode = this.children[i].populateCanvas(raphael);
      if (childNode) childNodes.push(childNode);
    }

    if (renderedNodes.length === 0 && childNodes.length === 0) {
      return null;
    }
    if (renderedNodes.length === 1 && childNodes.length === 0) {
      layerNode = renderedNodes[0];
    }
    else {
      layerNode = this.wrap(renderedNodes, childNodes);
    }

    if (layerNode) layerNode.id = this._id;

    return layerNode;
  },
  
  wrap: function (nodes) {
  },
  
  nodesForRaphaelObject: function (raphaelObj) {
    //TODO
    
    //for now:
    
    return [raphaelObj.node];
  },
  
  id: function (id) {
    this._id = id;
    return this;
  }
});
