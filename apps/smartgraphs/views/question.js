// ==========================================================================
// Project:   Smartgraphs.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your View Here)
 @extends SC.View
 */
Smartgraphs.QuestionView = SC.View.extend(/** @scope Smartgraphs.QuestionView.prototype */{

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


