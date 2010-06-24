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
  
  begin: function() {
    var ret = Smartgraphs.RaphaelContext(this);
    this.children.push(ret);
    
    return ret;
  },
  
  end: function () {
    return this.prevObject || this;
  },
  
  // For now the only way for render method to draw a graph is to pass a callback that calls the raphael methods itself. 
  // Eventually I'll probably add methods to RaphaelContext with the same names as Raphael methods
  // and that allow you to *find* and set attributes on pre-existing Raphael objects 
  // (this would be useful during render when firstTime = NO)
  callback: function (thisArg, callback) {
    this._thisArg = thisArg;
    this._callback = callback;
    this._arguments = Array.prototype.slice.call(arguments, 2);           // store the arguments 2...n
        
    return this;
  },

  id: function (id) {
    this._id = id;
    return this;
  },
  
  // TODO fix naming confusion between raphael 'paper' and raphael objects returned by shape methods
  populateCanvas: function (raphael) {
    // given a raphael canvas, actually call the callbacks that will create dom nodes using raphael.
    // use our own special sauce here to insert grouping nodes with the appropriate layer ids whenever a view has child views
    
    var raphaelObjects = [],
        childNode,
        childNodes = [],
        layerNode;
    
    if (this._callback) {
      var raphaelObj = this._callback.apply(this._thisArg, [raphael].concat(this._arguments));
      raphaelObjects = this.flattenRaphaelSets(raphaelObj);
    }
    
    for (var i = 0, ii = this.children.length; i < ii; i++) {
      childNode = this.children[i].populateCanvas(raphael);
      if (childNode) childNodes.push(childNode);
    }

    if (raphaelObjects.length === 0 && childNodes.length === 0) {
      return null;
    }
    if (raphaelObjects.length === 1 && childNodes.length === 0) {
      layerNode = this.nodeForRaphaelObject(raphaelObjects[0]);
    }
    else if(!this.isTopLevel) {
      // except for the top level context, each raphaeLContext corresponds to one view instance and must get a DOM node
      layerNode = this.wrap( raphaelObjects.map( this.nodeForRaphaelObject ).concat(childNodes), raphael);
    }

    if (layerNode) {
      layerNode.id = this._id;
      if (!layerNode.raphael) {
        layerNode.raphael = raphaelObj;
      }
    }

    return layerNode;
  },
  
  wrap: function (nodes, raphael) {

    // see http://smartgraph-demos.dev.concord.org/test-raphael-group.html
    var wrapper = raphael.constructor.vml ?
      document.createElement("group") :
      document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    var $wrapper = SC.$(wrapper);

    // we know nodes.length > 0 or we wouldn't have been called.
    $wrapper.insertBefore(SC.$(nodes[0]));

    for (var i=0, ii=nodes.length; i < ii; i++) {
      $wrapper.append(nodes[i]);
    }
    return $wrapper[0];
  },
   
  flattenRaphaelSets: function (raphaelObj) {
    // convert nested Raphael sets into a flattened list of Raphael shape objects

    var objs = [];
    if (raphaelObj.type === 'set') {
      for (var i = 0, ii = raphaelObj.items.length; i < ii; i++) {
        objs = objs.concat(this.flattenRaphaelSets(raphaelObj.items[i]));
      }
      return objs;
    }
    else {
      return [raphaelObj];
    }
  },
  
  nodeForRaphaelObject: function (raphaelObj) {
    var groupNode;
    
    if (!(raphaelObj.paper.constructor.vml || raphaelObj.paper.constructor.svg)) {
      throw "RaphaelContext can't figure out from raphaelObj whether mode is SVG or VML";
    }
    
    if (raphaelObj.paper.constructor.vml && (groupNode = SC.$(raphaelObj.node).parent('group')[0])) {
      return groupNode;
    }
    else {
      return raphaelObj.node;
    }
  }
});
