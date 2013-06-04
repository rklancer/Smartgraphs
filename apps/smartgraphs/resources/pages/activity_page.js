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
                fieldTypesBinding:             'Smartgraphs.responseTemplateController.fieldTypes',
                fieldChoicesListBinding:       'Smartgraphs.responseTemplateController.fieldChoicesList',
                valuesBinding:                 'Smartgraphs.responseTemplateController.values',
                editingShouldBeEnabledBinding: 'Smartgraphs.responseTemplateController.editingShouldBeEnabled',
                viewShouldResetBinding:        'Smartgraphs.responseTemplateController.viewShouldReset'
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

                action: 'submitStep',

                titleBinding:     'Smartgraphs.activityStepController.submitButtonTitle',
                isVisibleBinding: 'Smartgraphs.activityViewController.showSubmitButton',
                isEnabledBinding: 'Smartgraphs.activityViewController.enableSubmitButton',
                isDefaultBinding: 'Smartgraphs.activityViewController.enableSubmitButton',

                titleDidChange: function () {
                  var metrics = SC.metricsForString(this.get('title'), 'label', ['sc-button-label', 'text-wrapper']);
                  this.adjust('width', metrics.width + 48);
                }.observes('title'),

                /** The default implementation of this private property does not correctly account for changes to the
                   vertical position of this button resulting from the growing/shrinking of the StaticContentView in
                   flow above us. This a problem because the parent class SC.Button's touchEnd uses _touchBoundaryFrame
                   to calculate whether the touch ended on this button or off of it (and therefore whether the touch
                   should be counted as a "click" on this button, or not.).

                   Attempting to notifyPropertyChange('_touchBoundaryFrame') in touchStart did not correct the
                   incorrect behavior; the fix here is to use jQuery's offset() function, although we lose the benefit
                   of caching by doing so.

                   Without this fix, whenever the activityStepDialog view grows or shrinks between steps by an amount
                   greater than (the button height + the 50px 'slop' specified by touchBoundary), then touches to the
                   button do not click it.
                */
                _touchBoundaryFrame: function () {
                  var frame  = this.get('frame'),
                      offset = this.$().offset();

                  frame.x = offset.left;
                  frame.y = offset.top;
                  return frame;
                }.property()

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

  firstImageView: Smartgraphs.ImageView.design({
    imageURLBinding: 'Smartgraphs.activityViewController.firstImageValue',
    captionBinding:  'Smartgraphs.activityViewController.firstImageCaption'
  }),

  secondImageView: Smartgraphs.ImageView.design({
    imageURLBinding: 'Smartgraphs.activityViewController.secondImageValue',
    captionBinding:  'Smartgraphs.activityViewController.secondImageCaption'
  }),

  firstGraphPane: Smartgraphs.GraphPane.design({
    graphControllerBinding: 'Smartgraphs.firstGraphController'
  }),

  secondGraphPane: Smartgraphs.GraphPane.design({
    graphControllerBinding: 'Smartgraphs.secondGraphController'
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

  sensorLoadingView: SC.LabelView.design({
    layout: { height: 35, width: 250, centerX: 0 },
    classNames: 'sensor-message'.w(),
    textAlign: SC.ALIGN_CENTER,
    value: 'Loading sensor...'
  })

});

Smartgraphs.activityPage = Smartgraphs.activityPageDef.design();
