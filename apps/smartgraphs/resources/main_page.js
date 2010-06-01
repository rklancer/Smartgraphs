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

    childViews: 'dialogView graphView tableView'.w(), // TODO put back 'authoringModeButton authorView'
    
    dialogView: SC.View.design({
      layout: {
        left: 20,
        top: 10,
        width: 455,
        height: 580
      },

      classNames: 'smartgraph-pane'.w(),

      childViews: 'navButtons textView nextButton backButton'.w(),

      navButtons: SC.SegmentedView.design({
        layout: {
          top: 25
        },

        // in order to enable the button for the next question when it becomes selectable:
        displayProperties: 'nextPageIsSelectable'.w(),

        itemsBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController'),
        itemTitleKey: 'title',
        itemIsEnabledKey: 'isSelectable',
        valueBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',
        nextPageIsSelectableBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController*nextPage.isSelectable')
      }),

      // provide padding and style rules for the intro text and dialog
      textView: SC.View.design({
        layout: {
          top: 60,
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

      nextButton: SC.ButtonView.design({
        displayProperties: ['isEnabled'],
        layout: {
          bottom: 36,
          height: 24,
          right: 50,
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
          left: 50,
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
      layout: {
        left: 485,
        top: 10,
        width: 455,
        height: 285
      },
      childViews: 'axesView series1View'.w(),
      classNames: ['smartgraph-pane'],

      axesView: Smartgraphs.AxesView.design({
        xMinBinding: 'Smartgraphs.axesController.xMin',
        xMaxBinding: 'Smartgraphs.axesController.xMax',
        yMinBinding: 'Smartgraphs.axesController.yMin',
        yMaxBinding: 'Smartgraphs.axesController.yMax',
        xStepsBinding: 'Smartgraphs.axesController.xSteps',
        yStepsBinding: 'Smartgraphs.axesController.ySteps',
        paddingBinding: 'Smartgraphs.axesController.padding'
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
      })

    }),

    tableView: SC.View.design({
      layout: {
        left: 485,
        bottom: 10,
        width: 455,
        height: 285
      },
      classNames: ['smartgraph-pane'],

      childViews: ['labelsView', 'scrollerView', 'sensorAppletView'],

			sensorAppletView: SC.View.design({
				childViews: 'sensorApplet startButton stopButton resetButton'.w(),
				layout: {right: 0, top: 0, width: 250, height: 40},
				sensorApplet: CC.SensorAppletView.design({
					layout: {left: 0, top: 0, width: 1, height: 1},
					hideButtons: YES,
					dt: 0.1,
					resultsBinding: "Smartgraphs.dataSeriesController",
			    listenerPath: "Smartgraphs.mainPage.mainPane.tableView.sensorAppletView.sensorApplet", // absolute path to this instance...
				  dataReceived: function(type, numPoints, data) {
						SC.RunLoop.begin();
						var content = this.getPath('results.content');
						var dt = this.get('dt');
						var size = content.length();
				    for (var i = 0; i < numPoints; i++) {
							var yVal = data[i];
							var xVal = (size * dt) + ((i+1) * dt);
							var record = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, {x: xVal, y: yVal*1000, series: 'series-1'});
						}
						Smartgraphs.store.commitRecords();
						SC.RunLoop.end();
				  },
				  dataStreamEvent: function(type, numPoints, data) {
						// ignore for now
						// SC.RunLoop.begin();
						// SC.RunLoop.end();
				  }
		  	}),
		
				startButton: SC.ButtonView.design({
					layout: { centerY: 0, centerX: -85, height: 40, width: 80},
					title: "Start",
					appletBinding: "*parentView.sensorApplet",
					action: function() {
						this.get('applet').run(this.appletAction);
					},
					appletAction: function(applet) {
						applet.startCollecting();
					}
				}),

				stopButton: SC.ButtonView.design({
					layout: { centerY: 0, centerX: 0, height: 40, width: 80},
					title: "Stop",
					appletBinding: "*parentView.sensorApplet",
					action: function() {
						this.get('applet').run(this.appletAction);
					},
					appletAction: function(applet) {
						applet.stopCollecting();
					}
				}),

				resetButton: SC.ButtonView.design({
					layout: { centerY: 0, centerX: 85, height: 40, width: 80},
					title: "Reset",
					appletBinding: "*parentView.resultsList",
					resultsBinding: "Smartgraphs.dataSeriesController",
					action: function() {
						var content = this.getPath('results.content');
						content.invoke('destroy');
						Smartgraphs.store.commitRecords();
					}
				})
				
			}),

      labelsView: SC.View.design({
        layout: {
          left: 0,
          top: 0,
          width: 455,
          height: 30
        },
        childViews: ['xsLabel', 'ysLabel'],

        xsLabel: SC.LabelView.design({
          layout: {
            left: 10,
            width: 40,
            top: 7,
            height: 20
          },
          displayValue: 'time'
        }),

        ysLabel: SC.LabelView.design({
          layout: {
            left: 70,
            width: 50,
            top: 7,
            height: 20
          },
          displayValue: 'distance'
        })
      }),

      scrollerView: SC.ScrollView.design({
        layout: {
          left: 0,
          top: 30,
          width: 455,
          height: 255
        },

        borderStyle: SC.BORDER_NONE,

        contentView: SC.View.design({
          childViews: ['xsView', 'ysView'],

          // look at SC.ContentDisplay for this too
          xHeightBinding: SC.Binding.from('.xsView.height').oneWay(),
          yHeightBinding: SC.Binding.from('.ysView.height').oneWay(),

          height: function(){
            return Math.max(this.get('xHeight'), this.get('yHeight'));
          }.property('xHeight', 'yHeight').cacheable()          ,

          _heightDidChange: function(){
            this.adjust('height', this.get('height'));
          }.observes('height')          ,

          xsView: SC.ListView.design({
            height: function(){
              var layout = this.get('layout');
              return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
            }.property('calculatedHeight', 'layout').cacheable()            ,

            layout: {
              left: 10,
              top: 0,
              bottom: 15,
              width: 50
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
            }.property('calculatedHeight', 'layout').cacheable()            ,

            layout: {
              left: 70,
              top: 0,
              bottom: 15,
              width: 50
            },
            isEditable: YES,
            canEditContent: YES,
            // as per http://groups.google.com/group/sproutcore/browse_thread/thread/6564941be2b51276/fcf4eb11a1ea268f?#fcf4eb11a1ea268f
            exampleView: Smartgraphs.EditableListItemView,
            contentValueKey: 'y',
            contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'Smartgraphs.dataSeriesController.selection',
            rowHeight: 18
          })
        })
      })
    }) //,

    // authoringModeButton: SC.ButtonView.design({
    //   layout: {
    //     left: 20,
    //     top: 710
    //   },
    //   useStaticLayout: YES,
    //   title: 'Toggle Authoring Mode',
    //   targetBinding: 'Smartgraphs.authoringController',
    //   action: 'toggleAuthoring'
    // }),
    // 
    // authorView: Smartgraphs.QuestionAuthorView.design({
    //   layout: {
    //     left: 965,
    //     top: 5,
    //     bottom: 20,
    //     width: 300
    //   },
    //   contentBinding: "Smartgraphs.questionSequenceController.selectedQuestion",
    //   canEditContent: YES // TODO: Make authoring actually work
    // })
  })
});
