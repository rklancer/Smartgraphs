// ==========================================================================
// Project:   Smartgraphs.authoring
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 Controlls authoring mode and business logic
 @extends SC.Object
 */
sc_require('models/question');

Smartgraphs.authoringController = SC.ObjectController.create(
/** @scope Smartgraphs.authoringController.prototype */
{
    // TODO: add a property representing the current authoring mode?
    //authorMode: NO,
    
    toggleAuthoring: function(){
        console.log("Smartgraphs.mainPage.mainPane.authorView.isVisible was:" + Smartgraphs.mainPage.mainPane.authorView.isVisible);
        if (Smartgraphs.mainPage.mainPane.authorView.get('isVisible') == YES) {
            Smartgraphs.mainPage.mainPane.authorView.set('isVisible', NO); 
        }
        else {Smartgraphs.mainPage.mainPane.authorView.set('isVisible', YES);
        }
        console.log("Smartgraphs.mainPage.mainPane.authorView.isVisible is:" + Smartgraphs.mainPage.mainPane.authorView.isVisible);
    }
    
});
