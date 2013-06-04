// ==========================================================================
// Project:   Smartgraphs.sensorAppletController
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// =========================================================================
/*globals Smartgraphs */

/** @class

  This is adapted from Aaron Unger's sensorAppletView in the CC framework.

  However, we found that, on *some* computers, instantiating an applet by appending an SC.View that renders to an
  <applet> tag fails mysteriously in IE8. Appending the <applet> tag via jQuery appears to work on those machines, so
  that is what is done here. This may have to do with the fact that <applet> tags really represent "host objects", not
  native objects, and apparently-normal access or modification of certain of their properties create problems. jQuery
  may handle this more carefully than SC.View.

  (Sensor applets aren't really a view concern, anyway.)

  @extends SC.Object
*/
Smartgraphs.sensorAppletController = SC.Object.create(
/** @scope Smartgraphs.sensorAppletController.prototype */ {

  sensorState:  'not loaded',
  isAppended:   false,

  // Before appending the applet, set this value with the path to an object that will receive applet callbacks.
  listenerPath: 'Smartgraphs.sensorAppletController',

  appletId:     'sg-applet',
  classNames:   'applet sensor-applet',

  jarUrls:     ['org/concord/sensor-native/sensor-native.jar',
                'org/concord/otrunk/otrunk.jar',
                'org/concord/framework/framework.jar',
                'org/concord/frameworkview/frameworkview.jar',
                'jug/jug/jug.jar',
                'jdom/jdom/jdom.jar',
                'org/concord/sensor/sensor.jar',
                'org/concord/data/data.jar',
                'org/concord/sensor/sensor-applets/sensor-applets.jar'],

  code:         'org.concord.sensor.applet.OTSensorApplet',
  codebase:     '/jnlp',
  resourcePath: '/distance.otml',

  html: function() {
    return [
     '<applet ',
       'id="',       this.get('appletId'),           '" ',
       'class="',    this.get('classNames'),         '" ',
       'archive="',  this.get('jarUrls').join(', '), '" ',
       'code="',     this.get('code'),               '" ',
       'codebase="', this.get('codebase'),           '" ',
       'width="1px" ',
       'height="1px" ',
       'MAYSCRIPT="true" ',
     '>',
        '<param name="resource" value="',      this.get('resourcePath'), '" />',
        '<param name="listenerPath" value="',  this.get('listenerPath'), '" />',
        '<param name="name" value="',          this.get('appletId'),     '" />',
      '</applet>'
    ].join('');
  }.property(),

	appletInstance: function() {
		return $('#' + this.get('appletId'))[0];
	}.property(),

  _sensorAppletTimer: null,

  /**
    Append the applet tag to the DOM, if it hasn't been appended already.
    Accepts an optional hash argument, 'listenerPath', that will be used to update the listenerPath property before
    appending the applet.
  */
  append: function(args) {
    if (this.get('isAppended')) return;

    if (args && args.listenerPath) {
      this.set('listenerPath', args.listenerPath);
    }

    $('body').append( this.get('html') );
    this.startSensorAppletInitialization();
    this.set('isAppended', true);
  },

  startSensorAppletInitialization: function() {
    var self = this;
    window.setTimeout(function() { self.initializeSensorInterface(); }, 250);
  },

  initializeSensorInterface: function() {
    var listenerPath   = this.get('listenerPath'),
        appletInstance = this.get('appletInstance'),
        appletIsReady  = false,
        self           = this;

    // Try to call initSensorInterface, but note
    //  (1) appletInstance may not have initialized yet
    //  (2) 'probing' for initialization via the js idiom:
    //        appletInstance.initSensorInterface && appletInstance.initSensorInterface();
    //      actually throws an error in IE even AFTER appletInstance.initSensorInterface is ready to call, because
    //      IE thinks that it's an error to access a java method as a property instead of calling it.

    try {
      appletIsReady = appletInstance.initSensorInterface(listenerPath);
    } catch (e) {
      // Do nothing--we'll try again in the next timer interval.
    }

    if (appletIsReady) {
      if (this._sensorAppletTimer) {
        window.clearInterval(this._sensorAppletTimer);
        this._sensorAppletTimer = null;
      }
      this.set('sensorState', 'ready');
    }
    else {
      if (!this._sensorAppletTimer) {
        this._sensorAppletTimer = window.setInterval(function() { self.initializeSensorInterface(); }, 250);
      }
    }
  },

  start: function() {
    var appletInstance = this.get('appletInstance');
    try {
      appletInstance.startCollecting();
      this.set('sensorState', 'running');      
    } catch (e) {

    }
  },

  stop: function() {
    var appletInstance = this.get('appletInstance');    
    try {
      appletInstance.stopCollecting();
      this.set('sensorState', 'stopped');
    } catch (e) {

    }
  },

  reset: function() {
    var appletInstance = this.get('appletInstance');    
    try {
      appletInstance.stopCollecting();
      this.set('sensorState', 'ready');      
    } catch (e) {
      
    }
  },

  /**
    Dummy applet callback. Implement a method with this signature in the object pointed to by 'listenerPath'.
  */
  sensorsReady: function () {
    this.throwListenerPathError();
  },

  /**
    Dummy applet callback. Implement a method with this signature in the object pointed to by 'listenerPath'.
  */
  dataReceived: function(type, numPoints, data) {
    this.throwListenerPathError();
  },

  /**
    Dummy applet callback. Implement a method with this signature in the object pointed to by 'listenerPath'.
    (However, note that the applet does not send useful information to this callback yet.)
  */
  dataStreamEvent: function () {
    this.throwListenerPathError();
  },

  throwListenerPathError: function() {
    throw new Error("The sensor applet was appended without setting listenerPath to point to the object that will receive applet callbacks.");
  }

});
