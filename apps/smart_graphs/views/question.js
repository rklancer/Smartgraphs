// ==========================================================================
// Project:   SmartGraphs.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class
 (Document Your View Here)
 @extends SC.View
 */
SmartGraphs.QuestionView = SC.View.extend(/** @scope SmartGraphs.QuestionView.prototype */{

    displayProperties: 'controller prompt feedback textInputShouldBeVisible'.w(),
    childViews: 'promptView inputView checkButton feedbackView'.w(),
    
    promptView: SC.StaticContentView.design({
        displayProperties: 'content'.w(),
        contentBinding: SC.Binding.oneWay('.parentView.prompt')
    }),
    
    inputView: SC.View.design({
        displayProperties: 'isVisible'.w(),
        layout: {
            height: 20,
            width: 150
        },
        useStaticLayout: YES,
        isVisibleBinding: '.parentView.textInputShouldBeVisible',
        childViews: 'textFieldView'.w(),
        textFieldView: SC.TextFieldView.design({
            isTextArea: YES,
            valueBinding: '.parentView.parentView.controller.textResponse'
        })
    }),
    
    checkButton: SC.ButtonView.design({
        useStaticLayout: YES,
        title: 'Check Answer',
        targetBinding: '.parentView.controller',
        action: 'checkResponse'
    }),
    
    feedbackView: SC.StaticContentView.design({
        displayProperties: 'content'.w(), // shouldn't this be default?
        contentBinding: SC.Binding.oneWay('.parentView.feedback'), // FIXME: aargh it go away if empty!
        // StaticContentView will refuse to render if its content is falsy.
        // Even if you want it to show an empty string. This is probably a bug.
        isVisibleBinding: SC.Binding.oneWay('.parentView.feedback').bool()
    })
});

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
