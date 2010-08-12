// ==========================================================================
// Project:   Smartgraphs.appletPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Aaron Unger <aunger@concord.org>
// ==========================================================================
/*globals Smartgraphs CC */

// This page holds the applet view definition off-DOM until we need to start it up.
// (Executing Smartgraphs.appletPage.get('appletPane').append() from anywhere in the code 
// will instantiate the applet element and insert it into the DOM)

// Be prepared to take a long coffee break when you do, though.

// TODO fix up this mess and potentially make the applet itself 1x1
Smartgraphs.appletPage = SC.Page.design({

  appletPane: SC.PalettePane.design({
    layout: {
      left: 0,
      top: 0,
      width: 255,
      height: 285
    },
    
    contentView: SC.View.design({
		  // don't actually hide the applet - it doesn't like it very much. 
      childViews: 'sensorApplet startButton stopButton resetButton'.w(),
    
      sensorApplet: CC.SensorAppletView.design({
        layout: {
          left: 0, 
          top: 0, 
          width: 1, 
          height: 1
        },

        safariSensorStatePath: 'Smartgraphs.appletPage.appletPane.contentView.sensorApplet.sensorState',
        hideButtons: YES,
        dt: 0.1,
        resultsBinding: "Smartgraphs.selectedPointsController",
        listenerPath: "Smartgraphs.appletPage.appletPane.contentView.sensorApplet", // absolute path to this instance...
        
        // old hardwired hacks
        everyNth: 2,
        maxPoints: 75,
        _nsamples: 0,
        _npoints: 0,
        
        dataReceived: function (type, numPoints, data) {
          var content = this.getPath('results');

          var dt = this.get('dt');
          var size = content.get('length');
          
          var everyNth = this.get('everyNth');
          var maxPoints = this.get('maxPoints');
          
          for (var i = 0; i < numPoints; i++) {
            var yVal = data[i];      
            if (this._nsamples % everyNth === 0) {

              SC.RunLoop.begin();
              Smartgraphs.sendAction('sensorDataReceived', this, {x: this._nsamples*dt, y: yVal });
              SC.RunLoop.end();
              
              // this will migrate to sensorController and SENSOR_* states
            }
            this._nsamples++;
          }
        },
        
        sensorsReady: function() {
          SC.RunLoop.begin();
          // enable the start button
          this.setPath('parentView.startButton.isEnabled', YES);
          this.getPath('parentView.resetButton').action();
          SC.RunLoop.end();
        }
      }),
       
      startButton: SC.ButtonView.design({
        layout: {
          centerX: 0, 
          centerY: -60,          
          height: 24, 
          width: 160
        },

        isEnabled: NO, // disabled until the sensor applet signals that it is ready
        title: "Start",
        appletBinding: ".parentView.sensorApplet",

        action: function() {
          this.set('isEnabled', NO);
          this.setPath('parentView.stopButton.isEnabled', YES);
          this.setPath('parentView.resetButton.isEnabled', YES);
          this.get('applet').start();
          this.get('applet')._nsamples = 0;
        }
      }),
      
      stopButton: SC.ButtonView.design({
        layout: {
          centerX: 0, 
          centerY: 0, 
          height: 24, 
          width: 160
        },

        isVisibleBinding: '.parentView.shouldBeEnabled',    
        isEnabled: NO, // disabled until the sensor applet signals that it is ready
        title: "Stop",
        appletBinding: ".parentView.sensorApplet",

        action: function() {
          this.set('isEnabled', NO);
          this.get('applet').stop();
        }
      }),
      
      resetButton: SC.ButtonView.design({        
        layout: { 
          centerX: 0, 
          centerY: 60, 
          height: 24, 
          width: 160
        },
        
        isVisibleBinding: '.parentView.shouldBeEnabled', 
        isEnabled: NO, // disabled until the sensor applet signals that it is ready
        title: "Reset",
        appletBinding: ".parentView.sensorApplet",
        resultsBinding: "Smartgraphs.selectedPointsController",
       
        action: function() {
          this.set('isEnabled', NO);
          this.setPath('parentView.stopButton.isEnabled', NO);
          this.setPath('parentView.startButton.isEnabled', YES);
          this.get('applet').reset();
          var content = this.getPath('results');
          content.invoke('destroy');
          Smartgraphs.store.commitRecords();
          this.get('applet')._nsamples = 0;
        }
      })
		})
  })

});
