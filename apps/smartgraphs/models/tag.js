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

  datadefName: SC.Record.attr(String),

  x: SC.Record.attr(Number),

  y: SC.Record.attr(Number)

});


(function () {
  var i = 0;

  /**
    Returns a computed property that returns the x or y-value from this.<directProperty> or, failing that, from
    this.<tagProperty>.value

    @param directProperty {String}
    @param tagPropertyPath {String}
  */
  Smartgraphs.Tag.valueFrom = function (tagProperty, tagValueProperty, directProperty) {

    // valueFrom returns a computed property definition, but because it's called in the process of setting up a class,
    // it can't know what name it's being assigned to in the class being defined. In order to be able to notify
    // observers of the property we're defining (whose name we don't know) we notify the (nonexistent)
    // property _sgtag_<nnn> of the object we're a property of; _sgtag_<nnn> in turn invalidates the property we
    // return, courtesy of the .property() declaration below

    var notifierProperty = '_sgtag_'+(i++),   // used to pass notification to the property defined below
        tagPath = tagProperty + '.' + tagValueProperty;

    // we return a computed property definition, that has to be invalidated when this.tagProperty.value changes.
    // Because .property('x', 'xTag.value') doesn't work in this version of Sproutcore,
    // we set ourselves up as BOTH a computed property AND an observer of directProperty and *<tagProperty>.value
    // on the object we're a computed property of (we don't have access to that object when valueFrom() is called,
    // so we can't just setup an observer via addObserver)

    return function () {

      var directValue;

      // we can be called as an observer or as a computed property; if arguments.length > 3, we were called as an
      // observer of <directProperty> or *<tagPropertyPath>
      if (arguments.length > 3) {
        this.notifyPropertyChange(notifierProperty);
        return;
      }

      // we were called as a computed property, so return the value

      directValue = this.get(directProperty);
      if (SC.none(directValue)) return this.getPath(tagPath);
      return directValue;

    }.property(notifierProperty).cacheable().observes(directProperty, '*'+tagPath);

  };

}());
