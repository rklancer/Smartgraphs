// ==========================================================================
// Project:   Smartgraphs.appletPage
// Copyright: ©2010 My Company, Inc.
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
      //isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),		  
      childViews: 'sensorApplet startButton stopButton resetButton'.w(),

      //shouldBeEnabledBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.sensorAppletShouldBeEnabled'),
      _shouldBeEnabledWasTrue: null,
      
      _stopAppletIfNeeded: function () {
        var shouldBeEnabled = this.get('shouldBeEnabled');
        
        // out of an abundance of caution: only stop applet on 'falling edge signal' of shouldBeEnabled
        if (!shouldBeEnabled && this._shouldBeEnabledWasTrue) {
          //console.log('sensorAppletView.shouldBeEnabled became falsy; stopping applet');

          // make sure to ignore the error thrown if the applet hasn't loaded at this point!
          try {
            this.get('sensorApplet').stop();
          } 
          catch (e) {
          }
        }
        this._shouldBeEnabledWasTrue = shouldBeEnabled;
      }.observes('shouldBeEnabled'),
    
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
        resultsBinding: "Smartgraphs.dataSeriesController",
        listenerPath: "Smartgraphs.appletPage.appletPane.contentView.sensorApplet", // absolute path to this instance...
        
        everyNth: 10,
        maxPoints: 30,
        _nsamples: 0,
        _npoints: 0,
        
        dataReceived: function(type, numPoints, data) {
          if (!this.getPath('parentView.shouldBeEnabled')) {
            // callback may be called while stoppage of the applet is pending
            //console.log('dataReceived called, but sensorAppletView.isEnabled = false');
            return;
          }
          
          // make sure timing issues don't change data series out from under our feet!
          if (this.get('dataSeriesBeingUpdated') !== Smartgraphs.dataSeriesController.get('series')) {
            //console.log(
            //  'dataReceived called, but sensorAppletView was updating a different series than the current '+
            //  'series managed by the dataSeriesController');
          }

          var content = this.getPath('results.content');

          var dt = this.get('dt');
          var size = content.length();
          
          var everyNth = this.get('everyNth');
          var maxPoints = this.get('maxPoints');
          
          for (var i = 0; i < numPoints; i++) {
            var yVal = data[i];      
            if (this._nsamples % everyNth === 0) {
              SC.RunLoop.begin();
              var record = Smartgraphs.dataSeriesController.addDataPoint(this._nsamples*dt, yVal);
              SC.RunLoop.end();
              if (Smartgraphs.dataSeriesController.get('length') >= maxPoints) {
                this.getPath('parentView.stopButton').action();
                return;
              }
            }
            this._nsamples++;
          }
        },
        
        dataStreamEvent: function(type, numPoints, data) {
          // ignore for now
          // SC.RunLoop.begin();
          // SC.RunLoop.end();
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
                
        isVisibleBinding: '.parentView.shouldBeEnabled',
        isEnabled: NO, // disabled until the sensor applet signals that it is ready
        title: "Start",
        appletBinding: ".parentView.sensorApplet",

        action: function() {
          this.set('isEnabled', NO);
          this.setPath('parentView.stopButton.isEnabled', YES);
          this.setPath('parentView.resetButton.isEnabled', YES);
          this.get('applet').start();
          this.set('dataSeriesBeingUpdated', Smartgraphs.dataSeriesController.get('series'));
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
        resultsBinding: "Smartgraphs.dataSeriesController",
       
        action: function() {
          this.set('isEnabled', NO);
          this.setPath('parentView.stopButton.isEnabled', NO);
          this.setPath('parentView.startButton.isEnabled', YES);
          this.get('applet').reset();
          var content = this.getPath('results.content');
          content.invoke('destroy');
          Smartgraphs.store.commitRecords();
          this.get('applet')._nsamples = 0;
        }
      })
		})
  })

});
