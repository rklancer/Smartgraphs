// ==========================================================================
// Project:   Smartgraphs Statechart
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/mixins/resource_loader');

/** @namespace

  Statechart for the Smartgraphs application.
  
  @extends SC.Statechart
*/
Smartgraphs.statechart = SC.Statechart.create(
  /** @scope Smartgraphs.statechart.prototype */ {
  
  trace: YES,
  
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
  
  rootState: SC.State.design({
    initialSubstate: 'LOGIN',
    
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
        }
      }),

      openActivity: function (context, args) {
        var activityContent = Smartgraphs.activityController.get('content');
        if (activityContent && activityContent.get('id') === args.id) {
          return YES; // nothing to do!
        }
        Smartgraphs.activityController.set('content', Smartgraphs.store.find(Smartgraphs.Activity, args.id));
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
          var pages = Smartgraphs.activityController.get('pages');
          Smartgraphs.activityPagesController.set('content', pages);

          if (pages.get('length') > 0) {
            Smartgraphs.activityPagesController.selectFirstPage();
          }

          var openAuthorView = Smartgraphs.loadingActivityController.get('openAuthorViewAfterLoading');
          this.gotoState(openAuthorView ? 'AUTHOR' : 'ACTIVITY');
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
      
      
      ACTIVITY: SC.State.plugin('Smartgraphs.ACTIVITY'),
      
      ACTIVITY_DONE: SC.State.design(),
      
      AUTHOR: SC.State.plugin('Smartgraphs.AUTHOR')
      
    })
  })
});
