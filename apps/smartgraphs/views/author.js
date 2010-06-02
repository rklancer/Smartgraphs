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
    childViews: 'titleLabel indexViewLabel indexView shortNameViewLabel shortNameView responseTypeViewLabel responseTypeView promptViewLabel promptView correctResponseViewLabel correctResponseView correctResponseFeedbackViewLabel correctResponseFeedbackView incorrectResponseFeedbackViewLabel incorrectResponseFeedbackView'.w(),
    
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
    
    shortNameViewLabel: SC.LabelView.design({
        layout: {
            top: 60,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Title for Guide Page tabs:"
    }),
    shortNameView: SC.LabelView.design({
        layout: {
            top: 80,
            height: 20,
            width: 300
        },
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.title"
    }),
    
    responseTypeViewLabel: SC.LabelView.design({
        layout: {
            top: 100,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Response Type:"
    }),
    responseTypeView: SC.LabelView.design({
        layout: {
            top: 120,
            height: 20,
            width: 300
        },
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.responseType"
    }),
    
    promptViewLabel: SC.LabelView.design({
        layout: {
            top: 140,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Introduction Text:"
    }),
    promptView: SC.LabelView.design({
        layout: {
            top: 160,
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
            top: 240,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Correct Response:"
    }),
    correctResponseView: SC.LabelView.design({
        layout: {
            top: 260,
            height: 80,
            width: 300
        },
		isInlineEditorMultiline: YES,
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.correctResponse"
    }),
    
    correctResponseFeedbackViewLabel: SC.LabelView.design({
        layout: {
            top: 340,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Correct Response Feedback:"
    }),
    correctResponseFeedbackView: SC.LabelView.design({
        layout: {
            top: 360,
            height: 80,
            width: 300
        },
		isInlineEditorMultiline: YES,
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.correctResponseFeedback"
    }),
    
    incorrectResponseFeedbackViewLabel: SC.LabelView.design({
        layout: {
            top: 440,
            height: 20,
            width: 300
        },
        backgroundColor: "grey",
        value: "Incorrect Response Feedback:"
    }),
    incorrectResponseFeedbackView: SC.LabelView.design({
        layout: {
            top: 460,
            height: 80,
            width: 300
        },
		isInlineEditorMultiline: YES,
		isEditable: YES,
        backgroundColor: "darkblue",
        valueBinding: "*parentView.content.incorrectResponseFeedback"
    })

});
