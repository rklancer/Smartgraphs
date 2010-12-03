// ==========================================================================
// Project:   Smartgraphs.Inspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.Inspector = SC.Object.extend({
  
  init: function () {
    var config = this.get('config'); 
    if (this.configure) this.configure(config || {});
    sc_super();
  },
  
  watch: function () {},
  
  stopWatching: function () {}
  
});