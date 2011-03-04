// ==========================================================================
// Project:   Smartgraphs.Tag
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Tag = SC.Record.extend(
/** @scope Smartgraphs.Tag.prototype */ {
  
  name: SC.Record.attr(String),
  
  point: SC.Record.attr('Smartgraphs.DataPoint')

});


(function () {
  var i = 0;
  
  Smartgraphs.Tag.taggedObject = function (directProperty, tagProperty) {
    var notifierProperty = '_sgtag_'+(i++);
    
    return function () {
      if (arguments.length > 3) {
        // we were called as an observer
        this.notifyPropertyChange(notifierProperty);
        return;
      }
    
      // we were called as a computed property
      return this.get(directProperty) || this.getPath(tagProperty+'.point');
    
    }.property(notifierProperty).cacheable().observes(directProperty, '*'+tagProperty+'.point');
  };
}());
