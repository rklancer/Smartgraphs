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
  
  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  activity: SC.Record.toOne('Smartgraphs.Activity'),
  
  name: SC.Record.attr(String),
  
  point: SC.Record.toOne('Smartgraphs.DataPoint')

});


(function () {
  var i = 0;
  
  /**
    Returns a computed property that returns the datapoint from this.<directProperty> or, failing that, from 
    this.<tagProperty>.point.
  
    @param directProperty {String}
    @param tagProperty {String}
  */
  Smartgraphs.Tag.pointFromTag = function (directProperty, tagProperty) {

    // pointFromTag returns a computed property definition, but because it's called in the process of settin up a class,
    // it can't know what name it's being assigned to in the class being defined. In order to be able to notify 
    // observers of the property we're defining (whose name we don't know) we notify the (nonexistent) 
    // property _sgtag_<nnn> of the object we're a property of; _sgtag_<nnn> in turn invalidates the property we
    // return, courtesy of the .property() declaration below

    var notifierProperty = '_sgtag_'+(i++),    // used to pass notification to the property defined below
        tagPath = tagProperty + '.point';
    
    // we return a computed property definition, that has to be invalidated when this.tagProperty.point changes.
    // Because .property(directProperty, tagProperty+'.point') doesn't work in this version of Sproutcore, 
    // we set ourselves up as BOTH a computed property AND an observer of directProperty and *<tagProperty>.point
    // on the object we're a computed property of (we don't have access to that object when pointFromTag() is called,
    // so we can't just setup an observer via addObserver)
    
    return function () {

      // we can be called as an observer or as a computed property; if arguments.length > 3, we were called as an
      // observer of <directProperty> or *<tagProperty>.point
      if (arguments.length > 3) {
        this.notifyPropertyChange(notifierProperty);
        return;
      }
    
      // we were called as a computed property, so return the value
      return this.get(directProperty) || this.getPath(tagPath);
      
    }.property(notifierProperty).cacheable().observes(directProperty, '*'+tagPath);

  };

}());
