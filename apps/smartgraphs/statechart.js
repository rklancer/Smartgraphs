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

        subordinateResources: [
          { load: function () { return Smartgraphs.store.find(Smartgraphs.activityController.get('pagesQuery')); } }
        ],

        enterState: function () {
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
          Smartgraphs.sessionController.newSession();

          var pages = Smartgraphs.activityController.get('pages');
          Smartgraphs.activityPagesController.set('content', pages);

          if (pages.get('length') > 0) {
            Smartgraphs.activityPagesController.selectFirstPage();
          }

          Smartgraphs.activityPageController.set('content', Smartgraphs.activityPagesController.get('selection').firstObject());    
          this.gotoState('ACTIVITY');
        },

        resourceLoadingError: function () {
          this.gotoState('ERROR_LOADING_ACTIVITY');
        },

        // Handle opening a activity while we're still waiting for another activity to load by ignoring repeat
        // request to load the same activity, or kicking the request back to the parent state otherwise.
        openActivity: function (context, args) {
          return (args.id === Smartgraphs.activityController.getPath('content.id')) ? YES : NO;
        }
      }),
      

      ERROR_LOADING_ACTIVITY: SC.State.design({
        enterState: function () {
          Smartgraphs.appWindowController.showErrorLoadingActivityView();          
        }
      }),
      
      
      ACTIVITY: SC.State.design({

        initialSubstate: 'ACTIVITY_PAGE_START',
        
        enterState: function() {
          Smartgraphs.appWindowController.showActivityView();
        },

        exitState: function () {
          Smartgraphs.activityController.cleanup();
        },
        
        
        ACTIVITY_PAGE_START: SC.State.design({
          enterState: function () {
            Smartgraphs.activityStepController.set('content', Smartgraphs.activityPageController.get('firstStep'));
            this.gotoState('ACTIVITY_STEP_START');
          }
        }),
        
        
        ACTIVITY_STEP_START: SC.State.design({
          enterState: function () {
            this.gotoState('ACTIVITY_STEP');
          }
        }),
        
        
        ACTIVITY_STEP: SC.State.plugin('Smartgraphs.ACTIVITY_STEP'),
        
        
        ACTIVITY_STEP_SUBMITTED: SC.State.plugin('Smartgraphs.ACTIVITY_STEP_SUBMITTED'),
        
        
        ACTIVITY_PAGE_DONE: SC.State.design({
          
          enterState: function() {    
            if (Smartgraphs.activityPagesController.get('isLastPage')) {
              this.gotoState('ACTIVITY_DONE');
            }
            else {
              Smartgraphs.activityController.set('canGotoNextPage', YES);
            }
          },

          exitState: function() {
            Smartgraphs.activityController.set('canGotoNextPage', NO);
            Smartgraphs.activityPageController.cleanup();
          },

          gotoNextPage: function () {
            Smartgraphs.activityPagesController.selectNextPage();
            Smartgraphs.activityPageController.set('content', Smartgraphs.activityPagesController.get('selection').firstObject());
            this.gotoState('ACTIVITY_PAGE_START');
          }
        })
      }),
      
      
      ACTIVITY_DONE: SC.State.design({
      })
      
    })
  })
});
