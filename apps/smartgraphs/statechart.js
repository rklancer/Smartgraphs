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
      enterState: function () {
        // temporarily switch back to the rest of the SC.Responders
        Smartgraphs.mainPage.mainPane.set('defaultResponder', 'Smartgraphs');
        Smartgraphs.makeFirstResponder(Smartgraphs.READY);
      }
    })
  })
});
