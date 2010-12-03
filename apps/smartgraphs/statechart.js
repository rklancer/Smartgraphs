// ==========================================================================
// Project:   Smartgraphs Statechart
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  Statechart for the Smartgraphs application.
  
  @extends SC.Statechart
*/
Smartgraphs.statechart = SC.Statechart.create(
  /** @scope Smartgraphs.statechart.prototype */ {
  
  trace: YES,
  
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
      
      initialSubstate: 'READY_START', 
      
      READY_START: SC.State.design({
        
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
        console.log('setting content; id = %s', args.id);
        
        Smartgraphs.activityController.set('content', Smartgraphs.store.find(Smartgraphs.Activity, args.id));

        this.gotoState('LOADING_ACTIVITY');
        return YES;
      },
      
      LOADING_ACTIVITY: SC.State.design({

        enterState: function () {
          Smartgraphs.mainPage.mainPane.set('defaultResponder', 'Smartgraphs');
          Smartgraphs.makeFirstResponder(Smartgraphs.LOADING_ACTIVITY);
        },

        // Handle 're-entrance' (opening a activity while we're still waiting for another activity to load)
        openActivity: function (context, args) {
          if (args.id === Smartgraphs.activityController.getPath('content.id')) {
            // do nothing if it's a repeat request to load the same id
            return YES;
          }

          // return NO so READY handles opening the new activity, but first make sure that the didBecomeFirstResponder
          // method of the LOADING_ACTIVITY responder is called again
          this.invokeLast(Smartgraphs.resetFirstResponder);
          return NO;
        }
      })
    })
  })
});
