// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs CC*/

sc_require('main');

// This page describes the main user interface for your application.
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    layout: {
      width: 960,
      height: 600
    },

    childViews: 'dialogView graphView tableView sensorAppletView imageView'.w(), // TODO put back 'authoringModeButton authorView'
    
    imageView: SC.ImageView.design({
      isVisibleBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.shouldShowImage'),
      layout: {
        right: 20,
        top: 10,
        width: 453,
        height: 578
      },
      
      //classNames: 'smartgraph-pane'.w()
      value: sc_static('resources/walking_path.jpg')
    }),
    
    dialogView: SC.View.design({
      layout: {
        left: 20,
        top: 10,
        width: 453,
        height: 578
      },

      classNames: 'smartgraph-pane'.w(),

      childViews: 'textView navButtons nextButton backButton'.w(),

      // provide padding and style rules for the intro text and dialog
      textView: SC.View.design({
        layout: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 80
        },

        classNames: 'text-view'.w(),

        childViews: 'introTextView dialogTurnView'.w(),

        introTextView: SC.StaticContentView.design({
          contentBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.introText'),
          isVisibleBinding: SC.Binding.bool('Smartgraphs.guidePageController.introText')
        }),
          
        dialogTurnView: Smartgraphs.DialogTurnView.design({
        })
      }),

      navButtons: SC.SegmentedView.design({
        layout: {
          bottom: 36,
          height: 24
        },

        // in order to enable the button for the next question when it becomes selectable:
        displayProperties: 'nextPageIsSelectable'.w(),

        itemsBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController'),
        itemTitleKey: 'title',
        itemIsEnabledKey: 'isSelectable',
        valueBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',
        nextPageIsSelectableBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController*nextPage.isSelectable')
      }),
      
      nextButton: SC.ButtonView.design({
        displayProperties: ['isEnabled'],
        layout: {
          bottom: 36,
          height: 24,
          right: 30,
          width: 80
        },
        title: "Next >>",
        target: 'Smartgraphs.guidePageSequenceController',
        action: 'selectNextPage',
        isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController.canSelectNextPage'),
        isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageSequenceController.isLastPage').oneWay()
      }),

      backButton: SC.ButtonView.design({
        displayProperties: ['isEnabled'],
        layout: {
          bottom: 36,
          height: 24,
          left: 30,
          width: 80
        },
        title: "<< Back",
        target: 'Smartgraphs.guidePageSequenceController',
        action: 'selectPreviousPage',
        isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController.canSelectPreviousPage'),
        isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageSequenceController.isFirstPage').oneWay()
      })
    }),


    graphView: Smartgraphs.RaphaelView.design({
      isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),
      layout: {
        right: 20,
        top: 10,
        width: 453,
        height: 283
      },
      childViews: 'axesView series1View annotationsView'.w(),
      classNames: ['smartgraph-pane'],

      axesView: Smartgraphs.AxesView.design({
        axesBinding: 'Smartgraphs.axesController'
      }),

      series1View: Smartgraphs.SeriesView.design({
        xMinBinding: 'Smartgraphs.axesController.xMin',
        xMaxBinding: 'Smartgraphs.axesController.xMax',
        yMinBinding: 'Smartgraphs.axesController.yMin',
        yMaxBinding: 'Smartgraphs.axesController.yMax',
        xScaleBinding: 'Smartgraphs.axesController.xScale',
        yScaleBinding: 'Smartgraphs.axesController.yScale',
        paddingBinding: 'Smartgraphs.axesController.padding',
        controllerBinding: 'Smartgraphs.dataSeriesController',
        contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
        selectionBinding: 'Smartgraphs.dataSeriesController.selection'
      }),
      
      annotationsView: Smartgraphs.StaticAnnotationsView.design({
        annotationsBinding: 'Smartgraphs.staticAnnotationsController',
        axesBinding: 'Smartgraphs.axesController'
      })

    }),

    tableView: SC.View.design({
      isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),      
      layout: {
        right: 285,
        bottom: 10,
        width: 188,
        height: 283
      },
      classNames: ['smartgraph-pane'],

      childViews: ['labelsView', 'scrollerView'],

      labelsView: SC.View.design({
        layout: {
          left: 0,
          top: 0,
          width: 190,
          height: 30
        },
        childViews: ['xsLabel', 'ysLabel'],

        xsLabel: SC.LabelView.design({
          layout: {
            right: 10,
            width: 80,
            top: 7,
            height: 20
          },

          valueBinding: SC.Binding.oneWay('Smartgraphs.axesController.xLabelAbbreviated')
        }),

        ysLabel: SC.LabelView.design({
          layout: {
            left: 10,
            width: 80,
            top: 7,
            height: 20
          },
          valueBinding: SC.Binding.oneWay('Smartgraphs.axesController.yLabelAbbreviated')
        })
      }),

      scrollerView: SC.ScrollView.design({
        layout: {
          left: 0,
          top: 30,
          width: 190,
          bottom: 15
        },

        borderStyle: SC.BORDER_NONE,

        contentView: SC.View.design({
          childViews: ['xsView', 'ysView'],

          // look at SC.ContentDisplay for this too
          xHeightBinding: SC.Binding.from('.xsView.height').oneWay(),
          yHeightBinding: SC.Binding.from('.ysView.height').oneWay(),

          height: function(){
            return Math.max(this.get('xHeight'), this.get('yHeight'));
          }.property('xHeight', 'yHeight').cacheable(),

          _heightDidChange: function(){
            this.adjust('height', this.get('height'));
          }.observes('height'),

          xsView: SC.ListView.design({
            height: function(){
              var layout = this.get('layout');
              return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
            }.property('calculatedHeight', 'layout').cacheable(),

            layout: {
              left: 100,
              top: 0,
              width: 70
            },

            canEditContent: NO,
            contentValueKey: 'x',
            contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'Smartgraphs.dataSeriesController.selection',
            rowHeight: 18
          }),

          ysView: SC.ListView.design({
            height: function(){
              var layout = this.get('layout');
              return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
            }.property('calculatedHeight', 'layout').cacheable(),

            layout: {
              left: 10,
              top: 0,
              width: 70
            },

            canEditContent: NO,
            // as per http://groups.google.com/group/sproutcore/browse_thread/thread/6564941be2b51276/fcf4eb11a1ea268f?#fcf4eb11a1ea268f
            exampleView: Smartgraphs.EditableListItemView,
            contentValueKey: 'y',
            contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'Smartgraphs.dataSeriesController.selection',
            rowHeight: 18
          })
        })
      })
    }),


		sensorAppletView: SC.View.design({
		  // don't actually hide the applet - it doesn't like it very much.
      //isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),		  
      childViews: 'sensorApplet startButton stopButton resetButton'.w(),
      classNames: 'smartgraph-pane'.w(),     
      layout: {
        right: 20, 
        bottom: 10, 
        width: 253, 
        height: 283
      },

      shouldBeEnabledBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.sensorAppletShouldBeEnabled'),
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

        safariSensorStatePath: 'Smartgraphs.mainPage.mainPane.sensorAppletView.sensorApplet.sensorState',
        hideButtons: YES,
        dt: 0.1,
        resultsBinding: "Smartgraphs.dataSeriesController",
        listenerPath: "Smartgraphs.mainPage.mainPane.sensorAppletView.sensorApplet", // absolute path to this instance...
        
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
              var record = Smartgraphs.dataSeriesController.addDataPoint(this._nsamples*dt, yVal);
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
