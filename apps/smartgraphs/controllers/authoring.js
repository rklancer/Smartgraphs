// ==========================================================================
// Project:   Smartgraphs.authoringController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 Controlls authoring mode and business logic
 @extends SC.Object
 */

sc_require('models/dialog_turn');
sc_require('models/guide_page');

Smartgraphs.authoringController = SC.ObjectController.create(
/** @scope Smartgraphs.authoringController.prototype */
{
    // TODO: add a (transient?) property representing the current authoring mode to an authoring data model
    //authorMode: NO,
    
    toggleAuthoring: function(){
		// TODO: Write a unit test instead of using a probe and observersForKey methods here
		Smartgraphs.mainPage.mainPane.authorView.addProbe('isVisible');
		// observersFor and observersForKey don't actually work!
		//Smartgraphs.mainPage.mainPane.authorView.observersForKey('isVisible');
        if (Smartgraphs.mainPage.mainPane.authorView.get('isVisible') == YES) {
            Smartgraphs.mainPage.mainPane.authorView.set('isVisible', NO); 
        }
        else {Smartgraphs.mainPage.mainPane.authorView.set('isVisible', YES);
        }
    }
    
});
