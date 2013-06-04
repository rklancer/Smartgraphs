// ==========================================================================
// Project:   Smartgraphs Statechart
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/mixins/resource_loader');

/** @namespace

  Statechart for the Smartgraphs application.

  @extends SC.Statechart
*/
Smartgraphs.statechartDef = SC.Statechart.extend(
  /** @scope Smartgraphs.statechartDef.prototype */ {

  trace: Smartgraphs.trace,

  init: function () {
    sc_super();
    this.invokeLast( function () {
      this.sendAction = function (event, sender, context) {
        var trace = this.get('trace');

        if (trace) console.log('BEGIN sendAction %s', event);
        this.sendEvent(event, sender, context);
        if (trace) console.log('END sendAction %s', event);
      };
      if (this.get('trace')) console.log("BEGIN LOGGING ACTIONS:");
    });
  },

  /**
    set this to NO to allow initStatechart() to run (facilitating inspection of the statechart for testing purposes)
    without attempting to enter all the substates
  */
  shouldEnterSubstatesAfterInit: YES,

  rootState: SC.State.design({
    initialSubstate: 'START',

    START: SC.State.design({
      enterState: function () {
        if (this.getPath('statechart.shouldEnterSubstatesAfterInit')) this.gotoState('LOGIN');
      }
    }),

    LOGIN: SC.State.design({

      enterState: function () {
        // for now we use just a default user and assume the user record loads in synchronously from fixtures
        Smartgraphs.userController.set('content', Smartgraphs.store.find(Smartgraphs.User, 'default'));
        this.gotoState('READY');
      }
    }),

    READY: SC.State.design({

      initialSubstate: 'READY_DEFAULT',


      READY_DEFAULT: SC.State.design({

        enterState: function () {
          SC.routes.add('*activityId', this, 'route');
        },

        route: function (route) {
          if (route.activityId) Smartgraphs.statechart.sendAction('openActivity', this, { id: route.activityId });
          // if we have no route try loading from window.authoredActivityJSON
          else Smartgraphs.statechart.sendAction('loadWindowsAuthoredActivityJSON', this);
        }
      }),

      openActivity: function (context, args) {
        var activityContent = Smartgraphs.activityController.get('content');
        if (activityContent && activityContent.get('id') === args.id) {
          return YES; // nothing to do!
        }

        // need to do this so we don't load the activity into the session store which gets destroyed when we exit the
        // ACTIVITY state.
        Smartgraphs.activityController.set('content', Smartgraphs.get('rootStore').find(Smartgraphs.Activity, args.id));
        this.gotoState('LOADING_ACTIVITY');
        return YES;
      },


      loadWindowsAuthoredActivityJSON: function (context) {
        // TODO: handle missing value:
        var activityJSON = window.authoredActivityJSON,
            id           = activityJSON.activity.url;

        // 1: add it to our existing collection of activities:
        Smartgraphs.activityDocs[id] = activityJSON;
        // 2 load that activity into the controller
        Smartgraphs.activityController.set('content', Smartgraphs.get('rootStore').find(Smartgraphs.Activity, id));
        this.gotoState('LOADING_ACTIVITY');
        return YES;
      },

      LOADING_ACTIVITY: SC.State.design(Smartgraphs.ResourceLoader, {

        masterResource: {
          load: function () { return Smartgraphs.activityController.get('content'); }
        },

        subordinateResources: [],

        enterState: function () {
          if (Smartgraphs.loadingActivityController.get('openAuthorViewAfterLoading')) {
            Smartgraphs.toolbarController.showRunButton();
          }
          else {
            Smartgraphs.toolbarController.showEditButton();
          }

          if (this.loadResources()) {
            return;
          }
          else {
            Smartgraphs.appWindowController.showActivityLoadingView();
          }
        },

        exitState: function () {
          this.cancelLoading();
        },

        resourcesDidLoad: function () {
          this.gotoState('ACTIVITY_LOADED');
        },

        resourceLoadingError: function () {
          this.gotoState('ERROR_LOADING_ACTIVITY');
        },

        // Handle opening a activity while we're still waiting for another activity to load by ignoring repeat
        // request to load the same activity, or kicking the request back to the parent state otherwise.
        openActivity: function (context, args) {
          return (args.id === Smartgraphs.activityController.getPath('content.id')) ? YES : NO;
        },

        // handle edit/run button while still loading

        openAuthorView: function () {
          Smartgraphs.loadingActivityController.set('openAuthorViewAfterLoading', YES);
          return YES;
        },

        runActivity: function () {
          Smartgraphs.loadingActivityController.set('openAuthorViewAfterLoading', NO);
          return YES;
        }

      }),


      ERROR_LOADING_ACTIVITY: SC.State.design({
        enterState: function () {
          Smartgraphs.appWindowController.showErrorLoadingActivityView();
        }
      }),

      ACTIVITY_LOADED: SC.State.design({

        initialSubstate: 'DEFAULT',

        enterState: function () {
          if (Smartgraphs.loadingActivityController.get('openAuthorViewAfterLoading')) {
            Smartgraphs.activityPagesController.set('content', Smartgraphs.activityController.get('pages'));
            Smartgraphs.activityPagesController.selectFirstPage();
            this.gotoState('AUTHOR');
          }
          else {
            this.gotoState('ACTIVITY');
          }
        },

        DEFAULT: SC.State.design(),

        ACTIVITY: SC.State.plugin('Smartgraphs.ACTIVITY'),

        ACTIVITY_DONE: SC.State.design(),

        AUTHOR: SC.State.plugin('Smartgraphs.AUTHOR'),
        
        showCredits: function () {
          Smartgraphs.creditsController.showCredits();
        }

      })
    })
  })
});

Smartgraphs.statechart = Smartgraphs.statechartDef.create();
