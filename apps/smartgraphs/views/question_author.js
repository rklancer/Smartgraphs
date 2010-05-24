// ==========================================================================
// Project:   Smartgraphs.QuestionAuthorView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your View Here)
 @extends SC.View
 */
Smartgraphs.QuestionAuthorView = SC.View.extend(/** @scope Smartgraphs.QuestionAuthorView.prototype */{
	isVisible: NO,

    childViews: 'titleLabel indexViewLabel indexView shortNameViewLabel shortNameView responseTypeViewLabel responseTypeView promptViewLabel promptView correctResponseViewLabel correctResponseView correctResponseFeedbackViewLabel correctResponseFeedbackView incorrectResponseFeedbackViewLabel incorrectResponseFeedbackView'.w(),
    
    titleLabel: SC.StaticContentView.design({
        backgroundColor: "black",
        content: "Selected Question's Data:"
    }),
    
    indexViewLabel: SC.StaticContentView.design({
        backgroundColor: "grey",
        content: "Question#:"
    }),
    indexView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.index"
    }),
    
    shortNameViewLabel: SC.StaticContentView.design({
        backgroundColor: "grey",
        content: "Short Name for navigation tabs:"
    }),
    shortNameView: SC.StaticContentView.design({
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.shortName"
    }),
    
    responseTypeViewLabel: SC.StaticContentView.design({
        backgroundColor: "grey",
        content: "Response Type:"
    }),
    responseTypeView: SC.StaticContentView.design({
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.responseType"
    }),
    
    promptViewLabel: SC.StaticContentView.design({
        backgroundColor: "grey",
        content: "Question Prompt:"
    }),
    promptView: SC.StaticContentView.design({
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.prompt"
        // TODO: set CSS 
    }),
    
    correctResponseViewLabel: SC.StaticContentView.design({
        backgroundColor: "grey",
        content: "Correct Response:"
    }),
    correctResponseView: SC.StaticContentView.design({
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.correctResponse"
    }),
    
    correctResponseFeedbackViewLabel: SC.StaticContentView.design({
        backgroundColor: "grey",
        content: "Correct Response Feedback:"
    }),
    correctResponseFeedbackView: SC.StaticContentView.design({
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.correctResponseFeedback"
    }),
    
    incorrectResponseFeedbackViewLabel: SC.StaticContentView.design({
        backgroundColor: "grey",
        content: "Incorrect Response Feedback:"
    }),
    incorrectResponseFeedbackView: SC.StaticContentView.design({
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.incorrectResponseFeedback"
    })

});