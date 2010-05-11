// ==========================================================================
// Project:   SmartGraphs - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs CC*/

sc_require('main');

// This page describes the main user interface for your application.
SmartGraphs.mainPage = SC.Page.design({

  // obviously, these non-mainPane views could be controlled by a controller.
  introView: SmartGraphs.QuestionView.design({
    // TODO: Need to hide the inputView field
    
    //childViews: 'readyButton'.w(),

    // readyButton: SC.ButtonView.design({
    //       layout: {
    //         top: 400,
    //         left: 20,
    //         width: 120
    //       },
    //       title: "My Answer is Ready",
    //       answerBinding: 'SmartGraphs.dataSeriesController.selection',
    //       action: function() {
    //         // Match student response to question and determine if the corect answer was given
    //         // For now: x=4, y=800 is the correct answer
    //         if ((1 == this.get("answer").get("length")) && (4 == this.get("answer").toArray().objectAt(0).get("x"))) {
    //           SC.AlertPane.info('Correct');
    //         } else {
    //           SC.AlertPane.info('Incorrect');
    //         }
    //       }
    //     }),

    classNames: 'sg-question'.w(),
    inputType: SmartGraphs.GRAPH_ANNOTATION_RESPONSE,
    prompt: "Maria ran practice laps around the track. Her coach wrote the distance she ran after each minute. " + "These data are shown in the scatterplot and the table at right." + "<br><br>Click on a point in the scatterplot where Maria stopped to talk with her coach."
  }),


  followupView: SmartGraphs.QuestionView.design({
    classNames: 'sg-question'.w(),
    inputType: SmartGraphs.TEXT_RESPONSE,
    prompt: 'For how long did Maria talk with her coach?'
  }),

  topperView: SC.StaticContentView.design({
    classNames: 'sg-question'.w(),
    content: "Did you notice that Maria's coach must have written down her position three times while they were talking?" + "<br><br>About how long did it take Maria to start running again after the third time?"
  }),

  mainPane: SC.MainPane.design({
    layout: {
      width: 960,
      height: 720
    },

    childViews: 'promptView graphView tableView'.w(),

    promptView: SC.View.design({
      layout: {
        left: 20,
        top: 20,
        width: 455,
        height: 680
      },
      classNames: ['smartgraph-pane'],

      childViews: 'tabView nextButton backButton'.w(),

      tabView: SC.TabView.design({
        layout: {
          top: 30,
          bottom: 5,
          left: 5,
          right: 5
        },
        items: [{
          title: "Maria's Run",
          value: 'SmartGraphs.mainPage.introView'
        },
        {
          title: 'A Pep Talk',
          value: 'SmartGraphs.mainPage.followupView'
        },
        {
          title: 'Back to Running',
          value: 'SmartGraphs.mainPage.topperView'
        }],
        itemTitleKey: 'title',
        itemValueKey: 'value',
        nowShowing: 'SmartGraphs.mainPage.introView'
      }),

      nextButton: SC.ButtonView.design({
        layout: {
          top: 620,
          left: 325,
          width: 80
        },
        title: "Next",
        target: 'SmartGraphs.mainPage.mainPane.promptView',
        action: 'nextTab',
        nowShowingBinding: 'SmartGraphs.mainPage.mainPane.promptView.tabView.nowShowing',
        isEnabled: function() {
          var nowShowing = this.get('nowShowing');
          return (nowShowing !== 'SmartGraphs.mainPage.topperView');
        }.property('nowShowing')
      }),

      backButton: SC.ButtonView.design({
        layout: {
          top: 620,
          left: 50,
          width: 80
        },
        title: "Back",
        target: 'SmartGraphs.mainPage.mainPane.promptView',
        action: 'backTab',
        nowShowingBinding: 'SmartGraphs.mainPage.mainPane.promptView.tabView.nowShowing',
        isEnabled: function() {
          var nowShowing = this.get('nowShowing');
          return (nowShowing !== 'SmartGraphs.mainPage.introView');
        }.property('nowShowing')
      }),

      // a really, really ugly way to go to the next tab. (refactor to use a more-generic tab *controller*...)
      nextTab: function() {
        var tabs = this.get('tabView');
        var showing = tabs.get('nowShowing');

        switch (showing) {
        case 'SmartGraphs.mainPage.introView':
          tabs.set('nowShowing', 'SmartGraphs.mainPage.followupView');
          break;
        case 'SmartGraphs.mainPage.followupView':
          tabs.set('nowShowing', 'SmartGraphs.mainPage.topperView');
          break;
        }
      },
      // a similarly ugly way to go to the previous tab.
      backTab: function() {
        var tabs = this.get('tabView');
        var showing = tabs.get('nowShowing');

        switch (showing) {
        case 'SmartGraphs.mainPage.topperView':
          tabs.set('nowShowing', 'SmartGraphs.mainPage.followupView');
          break;
        case 'SmartGraphs.mainPage.followupView':
          tabs.set('nowShowing', 'SmartGraphs.mainPage.introView');
          break;
        }
      }

    }),

    // bottomLeftView: SC.LabelView.design({
    //   layout: { left: 20, top: 365, width: 455, height: 335 },
    //   classNames: ['smartgraph-pane']
    // }),
    graphView: SmartGraphs.RaphaelView.design({
      layout: {
        left: 485,
        top: 20,
        width: 455,
        height: 335
      },
      childViews: 'axesView series1View'.w(),
      classNames: ['smartgraph-pane'],

      axesView: SmartGraphs.AxesView.design({
        xMinBinding: 'SmartGraphs.axesController.xMin',
        xMaxBinding: 'SmartGraphs.axesController.xMax',
        yMinBinding: 'SmartGraphs.axesController.yMin',
        yMaxBinding: 'SmartGraphs.axesController.yMax',
        xStepsBinding: 'SmartGraphs.axesController.xSteps',
        yStepsBinding: 'SmartGraphs.axesController.ySteps',
        paddingBinding: 'SmartGraphs.axesController.padding'
      }),

      series1View: SmartGraphs.SeriesView.design({
        xMinBinding: 'SmartGraphs.axesController.xMin',
        xMaxBinding: 'SmartGraphs.axesController.xMax',
        yMinBinding: 'SmartGraphs.axesController.yMin',
        yMaxBinding: 'SmartGraphs.axesController.yMax',
        xScaleBinding: 'SmartGraphs.axesController.xScale',
        yScaleBinding: 'SmartGraphs.axesController.yScale',
        paddingBinding: 'SmartGraphs.axesController.padding',
        controllerBinding: 'SmartGraphs.dataSeriesController',
        contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
        selectionBinding: 'SmartGraphs.dataSeriesController.selection'
      })

    }),

    tableView: SC.View.design({
      layout: {
        left: 485,
        top: 365,
        width: 455,
        height: 335
      },
      classNames: ['smartgraph-pane'],

      childViews: ['labelsView', 'scrollerView'],

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
          height: 305
        },

        borderStyle: SC.BORDER_NONE,

        contentView: SC.View.design({
          childViews: ['xsView', 'ysView'],

          // look at SC.ContentDisplay for this too
          xHeightBinding: SC.Binding.from('.xsView.height').oneWay(),
          yHeightBinding: SC.Binding.from('.ysView.height').oneWay(),

          height: function() {
            return Math.max(this.get('xHeight'), this.get('yHeight'));
          }.property('xHeight', 'yHeight').cacheable(),

          _heightDidChange: function() {
            this.adjust('height', this.get('height'));
          }.observes('height'),

          xsView: SC.ListView.design({
            height: function() {
              var layout = this.get('layout');
              return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
            }.property('calculatedHeight', 'layout').cacheable(),

            layout: {
              left: 10,
              top: 0,
              bottom: 15,
              width: 50
            },
            canEditContent: NO,
            contentValueKey: 'x',
            contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'SmartGraphs.dataSeriesController.selection',
            rowHeight: 18
          }),

          ysView: SC.ListView.design({
            height: function() {
              var layout = this.get('layout');
              return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
            }.property('calculatedHeight', 'layout').cacheable(),

            layout: {
              left: 70,
              top: 0,
              bottom: 15,
              width: 50
            },
            isEditable: YES,
            canEditContent: YES,
            // as per http://groups.google.com/group/sproutcore/browse_thread/thread/6564941be2b51276/fcf4eb11a1ea268f?#fcf4eb11a1ea268f
            exampleView: SmartGraphs.EditableListItemView,
            contentValueKey: 'y',
            contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'SmartGraphs.dataSeriesController.selection',
            rowHeight: 18
          })
        })
      })
    })
  })
});
