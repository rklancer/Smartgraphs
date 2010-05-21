// ==========================================================================
// Project:   SmartGraphs.QuestionAuthorView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class
 (Document Your View Here)
 @extends SC.View
 */
SmartGraphs.QuestionAuthorView = SC.View.extend(/** @scope SmartGraphs.QuestionAuthorView.prototype */{

    childViews: 'titleLabel indexViewLabel indexView shortNameViewLabel shortNameView responseTypeViewLabel responseTypeView promptViewLabel promptView correctResponseViewLabel correctResponseView correctResponseFeedbackViewLabel correctResponseFeedbackView incorrectResponseFeedbackViewLabel incorrectResponseFeedbackView'.w(),
    
    titleLabel: SC.StaticContentView.design({
        backgroundColor: "black",
        content: "Selected Question's Data:"
    }),
    
    indexViewLabel: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "grey",
        content: "Question#:"
    }),
    indexView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.index",
        canEditContent: YES
    }),
    
    shortNameViewLabel: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "grey",
        content: "Short Name for navigation tabs:"
    }),
    shortNameView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.shortName"
    }),
    
    responseTypeViewLabel: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "grey",
        content: "Response Type:"
    }),
    responseTypeView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.responseType"
    }),
    
    promptViewLabel: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "grey",
        content: "Question Prompt:"
    }),
    promptView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.prompt"
        // TODO: set CSS 
    }),
    
    correctResponseViewLabel: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "grey",
        content: "Correct Response:"
    }),
    correctResponseView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.correctResponse"
    }),
    
    correctResponseFeedbackViewLabel: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "grey",
        content: "Correct Response Feedback:"
    }),
    correctResponseFeedbackView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.correctResponseFeedback"
    }),
    
    incorrectResponseFeedbackViewLabel: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "grey",
        content: "Incorrect Response Feedback:"
    }),
    incorrectResponseFeedbackView: SC.StaticContentView.design({
        displayProperties: 'isVisible'.w(),
        backgroundColor: "darkgrey",
        contentBinding: "*parentView.content.incorrectResponseFeedback"
    })

});