// ==========================================================================
// Project:   Smartgraphs.AuthorView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your View Here)
 @extends SC.View
 */
Smartgraphs.AuthorView = SC.View.extend(/** @scope Smartgraphs.AuthorView.prototype */{
    isVisible: NO,
    childViews: 'titleLabel indexViewLabel indexView titleViewLabel titleView promptViewLabel promptView correctResponseViewLabel correctResponseView correctResponseFeedbackViewLabel correctResponseFeedbackView incorrectResponseFeedbackViewLabel incorrectResponseFeedbackView'.w(),
    
    titleLabel: SC.LabelView.design({
        layout: {
            top: 0,
            height: 20,
            width: 300
        },
		textAlign: "center",
        backgroundColor: "black",
        value: "Author's Controls:"
    }),
    
    indexViewLabel: SC.LabelView.design({
        layout: {
            top: 20,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Guide Page index #:"
    }),
    indexView: SC.LabelView.design({
        layout: {
            top: 40,
            height: 20,
            width: 300
        },
		isEditable: NO, // TODO: Add controls for adding, removing, and moving questions in the question sequence
        backgroundColor: "darkgrey",
        valueBinding: "*parentView.content.index"
    }),
    
    titleViewLabel: SC.LabelView.design({
        layout: {
            top: 60,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Title for Guide Page tabs:"
    }),
    titleView: SC.LabelView.design({
        layout: {
            top: 80,
            height: 20,
            width: 300
        },
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.title"
    }),
    
    promptViewLabel: SC.LabelView.design({
        layout: {
            top: 100,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Introduction Text:"
    }),
    promptView: SC.LabelView.design({
        layout: {
            top: 120,
            height: 80,
            width: 300
        },
		isInlineEditorMultiline:YES,
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.introText"
        // TODO: set CSS 
    }),
    
    correctResponseViewLabel: SC.LabelView.design({
        layout: {
            top: 200,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "First Dialog Turn:"
    }),
    correctResponseView: SC.LabelView.design({
        layout: {
            top: 220,
            height: 80,
            width: 300
        },
		isInlineEditorMultiline: YES,
		isEditable: NO, // TODO: show which dialog turn is first in a better way
		//YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.firstDialogTurn"
    }),
    
    correctResponseFeedbackViewLabel: SC.LabelView.design({
        layout: {
            top: 300,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Selected Dialog Turn's Before Text:"
    }),
    correctResponseFeedbackView: SC.LabelView.design({
        layout: {
            top: 320,
            height: 80,
            width: 300
        },
		isInlineEditorMultiline: YES,
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.selectedDialogTurn.beforeText"
    }),
    
    incorrectResponseFeedbackViewLabel: SC.LabelView.design({
        layout: {
            top: 400,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Selected Dialog Turn's Response Type:"
    }),
    incorrectResponseFeedbackView: SC.LabelView.design({
        layout: {
            top: 420,
            height: 80,
            width: 300
        },
		isInlineEditorMultiline: YES,
		isEditable: NO, // TODO: Make a editable control to dynamically change the template
    //YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.selectedDialogTurn.responseTemplate.guid"
    })

});
