// ==========================================================================
// Project:   Smartgraphs.activityPage
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('resources/pages/main_page');

// This is a place to hold the activityView until it's appended to the document

Smartgraphs.activityPageDef = SC.Page.extend({

  activityView: SC.View.design({
    childViews: 'instructionsWrapper dataWrapper'.w(),
  
    theme: 'sc-ace',
    loadingMessage: 'Loading Activity...',
  
    // ..........................................................
    // LEFT PANE
    //
    // the left pane shows the activity page intro and the instructions for the currently selected activity step
  
    instructionsWrapper: SC.View.design({
      layout: { left: 0, width: 0.45 },       // need to specify 0.5 rather than '50%'
      childViews: 'instructionsView'.w(),
    
      instructionsView: SC.View.design({
        classNames: 'smartgraph-pane',
        childViews: 'textWrapper'.w(),

        // provide padding and style rules for the intro text and dialog
        textWrapper: SC.View.design({
          layout: {
            top: 20,
            right: 20,
            left: 20
          },

          classNames: 'text-wrapper'.w(),

          childViews: 'introText activityStepWrapper'.w(),

          introText: SC.StaticContentView.design({            
            contentBinding: 'Smartgraphs.activityPageController.introText',
            isVisibleBinding: SC.Binding.bool('Smartgraphs.activityPageController.introText')
          }),
        
          activityStepWrapper: SC.View.design({
            useStaticLayout: YES,
          
            childViews: 'activityStepDialog buttonsView'.w(),
          
            activityStepDialog: SC.View.design({          
              useStaticLayout: YES,
              isVisibleBinding: 'Smartgraphs.activityStepController.dialogTextHasContent',
            
              childViews: 'beforeText responseTemplate afterText'.w(),
              classNames: 'dialog-text'.w(),

              beforeText: SC.StaticContentView.design({
                contentBinding: 'Smartgraphs.activityStepController.beforeText',
                isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.beforeText')
              }),
            
              responseTemplate: Smartgraphs.ResponseTemplateView.design({
                fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
                fieldChoicesListBinding: 'Smartgraphs.responseTemplateController.fieldChoicesList',
                valuesBinding: 'Smartgraphs.responseTemplateController.values',
                editingShouldBeEnabledBinding: 'Smartgraphs.responseTemplateController.editingShouldBeEnabled',
                viewShouldResetBinding: 'Smartgraphs.responseTemplateController.viewShouldReset'
              }),
            
              afterText: SC.StaticContentView.design({
                contentBinding: 'Smartgraphs.activityStepController.afterText',
                isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.afterText')
              })
            }),
        
            buttonsView: SC.View.design({
              useStaticLayout: YES,
          
              layout: {
                height: 24
              },

              childViews: 'submitButton'.w(),

              submitButton: SC.ButtonView.design({
                layout: {
                  width: 180,
                  right: 0
                },
                titleBinding: 'Smartgraphs.activityStepController.submitButtonTitle',
                isVisibleBinding: 'Smartgraphs.activityViewController.showSubmitButton',
                isEnabledBinding: 'Smartgraphs.activityViewController.enableSubmitButton',
                isDefaultBinding: 'Smartgraphs.activityViewController.enableSubmitButton',                
                action: 'submitStep',

                titleDidChange: function () {
                  var metrics = SC.metricsForString(this.get('title'), 'label', ['sc-button-label', 'text-wrapper']);
                  this.adjust('width', metrics.width + 48);     
                }.observes('title')
              
              })
            })
          })
        })
      })
    }),
  
  
    // ..........................................................
    // RIGHT PANE
    //
    // the right pane shows the data the user is manipulating
    dataWrapper: SC.View.design({
      layout: { right: 0, width: 0.55 },
    
      childViews: 'dataView'.w(),
    
      dataView: SC.ContainerView.design({
        layout: { top: 4, right: 4, bottom: 4, left: 4 },
        nowShowingBinding: 'Smartgraphs.activityViewController.dataViewNowShowing'
      })
    })
  }),
  
  singlePaneDataView: SC.ContainerView.design({
    classNames: 'smartgraph-pane',
    nowShowingBinding: 'Smartgraphs.activityViewController.singlePaneNowShowing'
  }),
  
  splitPaneDataView: SC.View.design({
    childViews: 'topPaneWrapper bottomPaneWrapper'.w(),
    
    topPaneWrapper: SC.View.design({
      layout: { top: 0, height: 0.5 },
      childViews: 'topPane'.w(),
      
      topPane: SC.ContainerView.design({
        layout: { bottom: 2 },
        classNames: 'smartgraph-pane',
        nowShowingBinding: 'Smartgraphs.activityViewController.topPaneNowShowing'
      })
    }),

    bottomPaneWrapper: SC.View.design({
      layout: { bottom: 0, height: 0.5 },
      childViews: 'bottomPane'.w(),
    
      bottomPane: SC.ContainerView.design({
        layout: { top: 2 },
        classNames: 'smartgraph-pane',//TEMP
        nowShowingBinding: 'Smartgraphs.activityViewController.bottomPaneNowShowing'
      })
    })
  }),
  
  firstImageView: SC.View.design({
    useStaticLayout: YES,    
    childViews: ['image', 'caption'],
    
    useStaticLayout: YES,

    caption: SC.LabelView.design({
      valueBinding: 'Smartgraphs.activityViewController.firstImageCaption',
      valueBindingDefault: SC.Binding.oneWay(),
      
      isVisible: function () {
        return !!this.get('value');
      }.property('value'),
      
      classNames: 'floating-caption',
      layout: { top: 10, left: 10, right: 10, height: 20 }
    }),
    
    image: SC.ImageView.design({
      valueBinding: 'Smartgraphs.activityViewController.firstImageValue',
      useStaticLayout: YES,
      
      // This is a hack.  At the moment SC.View.layoutStyle doesn't know how to set width or height to '100%',
      // but it does recognize numbers between 0 and 1, non-inclusive, as percentages; 0.9999999 appears to be about
      // the smallest number that gets recognized as a percentage and gets rounded up to 'height=100%' (rather than
      // 'height=99.9999%')
    
      layout: { width: 0.9999999 }
    })      
  }),
  
  secondImageView: SC.View.design({
    useStaticLayout: YES,
    childViews: ['image', 'caption'],

    caption: SC.LabelView.design({
      valueBinding: 'Smartgraphs.activityViewController.secondImageCaption',
      valueBindingDefault: SC.Binding.oneWay(),
       
      isVisible: function () {
        return !!this.get('value');
      }.property('value'),

      classNames: 'floating-caption',
      layout: { top: 10, left: 10, right: 10, height: 20 }
    }),
    
    image: SC.ImageView.design({
      valueBinding: 'Smartgraphs.activityViewController.secondImageValue',
      useStaticLayout: YES,
       
      // same hack described in firstImageView:
      layout: { width: 0.9999999 }
    })
  }),
  
  firstGraphPane: Smartgraphs.GraphPane.design({
    graphControllerBinding: 'Smartgraphs.firstGraphController',
    showAnimationBinding: 'Smartgraphs.activityViewController.firstPaneHasAnimation',
    controlsNowShowingBinding: 'Smartgraphs.activityViewController.firstGraphPaneControls'
  }),
  
  secondGraphPane: Smartgraphs.GraphPane.design({
    graphControllerBinding: 'Smartgraphs.secondGraphController',
    showAnimationBinding: 'Smartgraphs.activityViewController.secondPaneHasAnimation',
    controlsNowShowingBinding: 'Smartgraphs.activityViewController.secondGraphPaneControls'
  }),
  
  firstTableView: Smartgraphs.TableView.design({
    tableControllerBinding: 'Smartgraphs.firstTableController'
  }),
  
  secondTableView: Smartgraphs.TableView.design({
    tableControllerBinding: 'Smartgraphs.secondTableController'
  }),
  
  errorLoadingActivityView: SC.View.design({
    classNames: 'smartgraph-pane',
    childViews: 'errorMessage'.w(),
    
    errorMessage: SC.LabelView.design({
      layout: { height: 32, width: 500, centerX: 0, centerY: 0 },
      classNames: 'error',
      textAlign: SC.ALIGN_CENTER,
      value: 'There was an error loading that Activity.'
    })
  }),
  
  graphControlsView: SC.View.design({
    layout: { height: 35 },
    
    childViews: 'startControl stopControl clearControl'.w(),
    
    startControl: SC.ButtonView.design({
      layout: { centerX: -110, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: 'Smartgraphs.activityViewController.startControlIsVisible',
      isEnabledBinding: 'Smartgraphs.activityViewController.startControlIsEnabled',
      isDefaultBinding: 'Smartgraphs.activityViewController.startControlIsDefault',
      
      title: 'Start',
      action: 'startControlWasClicked',
      target: function() {
        return this.getPath('parentView.parentView.parentView.graphController.statechart');
      }.property()
    }),
    
    stopControl: SC.ButtonView.design({
      layout: { centerX: 0, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: 'Smartgraphs.activityViewController.stopControlIsVisible',
      isEnabledBinding: 'Smartgraphs.activityViewController.stopControlIsEnabled',
      isDefaultBinding: 'Smartgraphs.activityViewController.stopControlIsDefault',
      
      title: 'Stop',
      action: 'stopControlWasClicked',
      target: function() {
        return this.getPath('parentView.parentView.parentView.graphController.statechart');
      }.property()
    }),
    
    clearControl: SC.ButtonView.design({
      layout: { centerX: 110, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: 'Smartgraphs.activityViewController.clearControlIsVisible',
      isEnabledBinding: 'Smartgraphs.activityViewController.clearControlIsEnabled',
      isDefaultBinding: 'Smartgraphs.activityViewController.clearControlIsDefault',
      
      title: 'Reset',
      action: 'clearControlWasClicked',
      target: function() {
        return this.getPath('parentView.parentView.parentView.graphController.statechart');
      }.property()
    })
  }),
  
  sensorLoadingView: SC.LabelView.design({
    layout: { height: 35, width: 250, centerX: 0 },
    classNames: 'sensor-message'.w(),
    textAlign: SC.ALIGN_CENTER,
    value: 'Loading sensor...'
  })
  
});

Smartgraphs.activityPage = Smartgraphs.activityPageDef.design();