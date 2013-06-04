// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// This page describes the main user interface
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    theme: 'pig',

    defaultResponder: 'Smartgraphs.statechart',

    childViews: 'topToolbar container bottomToolbar'.w(),

    topToolbar: SC.ToolbarView.design({
      anchorLocation: SC.ANCHOR_TOP,

      childViews: ['title', 'editButton', 'runButton', 'creditsButton'],

      title: SC.LabelView.design({
        layout: { centerY: 0, height: 24, left: 8, width: 400 },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        valueBinding:   'Smartgraphs.activityController.title'
      }),

      creditsButton: SC.ButtonView.design({
        layout: { right: 20, centerY: 0, height: 24, width: 80 },
        isVisibleBinding: 'Smartgraphs.toolbarController.shouldShowCreditsButton',
        title: 'Credits',
        action: 'showCredits'
      }),
      
      editButton: SC.ButtonView.design({
        layout: { right: 120, centerY: 0, height: 24, width: 80 },
        shouldShowEditButtonBinding: 'Smartgraphs.toolbarController.shouldShowEditButton',
        isVisible: function () {
          return Smartgraphs.toolbarController.get('shouldShowEditButton') && Smartgraphs.get('showEditButton');
        }.property('shouldShowEditButton'),
        title: 'Edit',
        action: 'openAuthorView'
      }),

      runButton: SC.ButtonView.design({
        layout: { right: 120, centerY: 0, height: 24, width: 80 },
        isVisibleBinding: 'Smartgraphs.toolbarController.shouldShowRunButton',
        title: 'Run',
        action: 'runActivity'
      })
    }),

    container: SC.SplitView.design({
      // this minimum width & height should not overflow on a 1024x768 screen even in a browsing setup with lots of
      // extraneous on-screen chrome (say, in FF or IE running in Windows XP)

      layout: { top: 32, bottom: 33, minWidth: 960, minHeight: 502 },
      classNames: ['sg-overflow-fix'],      // fix the problem IE8 has with min-height and overflow: hidden
      defaultThickness: 200,
      topLeftMaxThickness: 300,
      layoutDirection: SC.LAYOUT_HORIZONTAL,

      topLeftView: SC.ScrollView.design({
        contentView: SC.SourceListView.design({
          classNames: ['outline'],
          contentBinding: 'Smartgraphs.activityOutlineController.arrangedObjects',
          contentValueKey: 'title',
          selectionBinding: 'Smartgraphs.activityOutlineController.selection',
          isSelectableBinding: 'Smartgraphs.activityOutlineController.isSelectable',
          exampleView: SC.ListItemView.extend({
            classNames: ['rk-test']
          })
        })
      }),

      dividerView: SC.SplitDividerView,

      bottomRightView: SC.ContainerView.design({
        nowShowingBinding: 'Smartgraphs.appWindowController.viewToShow'
      }),

      shouldShowOutlineBinding: 'Smartgraphs.appWindowController.shouldShowOutline',
      shouldShowOutlineDidChange: function () {
        if (this.get('shouldShowOutline')) {
          this.setPath('topLeftView.isVisible', YES);
          this.setPath('dividerView.isVisible', YES);
          this.updateChildLayout();
        }
        else {
          this.setPath('topLeftView.isVisible', NO);
          this.setPath('dividerView.isVisible', NO);
          this.get('bottomRightView').adjust('left', 0);
        }
      }.observes('shouldShowOutline')
    }),

    bottomToolbar: SC.ToolbarView.design({
      anchorLocation: SC.ANCHOR_BOTTOM,

      childViews: ['backButton', 'pageButtons', 'nextButton'],

      backButton: SC.ButtonView.design({
        layout: { left: 20, centerY: 0, height: 24, width: 80 },
        title: 'Back',
        // theme: 'point-left',
        theme: 'capsule',
        action: 'gotoPreviousPage',
        isSwipeLeft: YES,

        isEnabledBinding: 'Smartgraphs.activityViewController.enableBackPageButton'
      }),

      pageButtons: SC.SegmentedView.design({
        layout: { left: 120, right: 120, height: 24, centerY: 0 },
        classNames: ['sc-regular-size'],        // workaround for apparent bug in SC.SegmentedView
        itemsBinding: 'Smartgraphs.activityPagesController',
        itemTitleKey: 'pageNumberAsString',
        itemValueKey: 'pageNumber',
        valueBinding: 'Smartgraphs.activityPagesController.currentPageNumber'
      }),

      nextButton: SC.ButtonView.design({
        layout: { right: 20, centerY: 0, height: 24, width: 80 },
        title: 'Next',
        // theme: 'point-right',
        theme: 'capsule',
        action: 'gotoNextPage',
        isSwipeRight: YES,

        isVisibleBinding: 'Smartgraphs.activityViewController.showNextPageButton',
        isEnabledBinding: 'Smartgraphs.activityViewController.enableNextPageButton',
        isDefaultBinding: 'Smartgraphs.activityViewController.highlightNextPageButton'
      })
    })
  }),

  // a generic loading view for whatever is loading into mainPane.container
  loadingView: SC.View.design({
    classNames: 'smartgraph-pane'.w(),
    childViews: 'loadingIconView loadingMessageView'.w(),

    loadingIconView: SC.ImageView.design({
      layout: { width: 48, height: 48, centerX: 0, centerY: -39 },
      value: sc_static('resources/images/pane_loading.gif')
    }),

    loadingMessageView: SC.LabelView.design({
      classNames: 'loading'.w(),
      layout: { width: 200, height: 24, centerX: 0, centerY: 15 },
      textAlign: SC.ALIGN_CENTER,
      valueBinding: 'Smartgraphs.appWindowController.loadingMessage'
    })
  })

});
