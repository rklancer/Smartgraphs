// ==========================================================================
// Project:   Smartgraphs.AuthorView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your View Here)
 @extends SC.View
 */
Smartgraphs.AuthorView = SC.View.extend(
/** @scope Smartgraphs.AuthorView.prototype */{
  isVisible: YES,
  childViews: ["titleLabel", "indexViewLabel", "indexView", "titleViewLabel", "titleView", "introTextViewLabel", "introTextView", 
  "dialogTurnGuidViewLabel", "dialogTurnGuidView", "firstDialogTurnViewLabel", "firstDialogTurnView", 
  "dialogTurnBeforeTextViewLabel", "dialogTurnBeforeTextView", "responseTemplateGuidViewLabel", "responseTemplateGuidView", 
  "verifierDelegateNameViewLabel", "verifierDelegateNameView", "verifierConfigViewLabel", "verifierConfigView",
  "dialogTurnAfterTextViewLabel", "dialogTurnAfterTextView",
  "nextTurnForNominalResponseViewLabel","nextTurnForNominalResponseView","nextTurnForIncorrectResponseViewLabel","nextTurnForIncorrectResponseView",
  "isLastTurnView", "isLastTurnViewLabel"],
  
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
  
  introTextViewLabel: SC.LabelView.design({
    layout: {
      top: 100,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Introduction Text:"
  }),
  introTextView: SC.LabelView.design({
    layout: {
      top: 120,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: YES,
    backgroundColor: "darkblue",
    valueBinding: "*parentView.content.introText"
    // TODO: set CSS 
  }),
  
  firstDialogTurnViewLabel: SC.LabelView.design({
    layout: {
      top: 200,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "First Dialog Turn:"
  }),
  firstDialogTurnView: SC.LabelView.design({
    layout: {
      top: 220,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: NO, // TODO: show which dialog turn is first in a better way
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.firstDialogTurn"
  }),
  
  dialogTurnGuidViewLabel: SC.LabelView.design({
    layout: {
      top: 300,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's ID:"
  }),
  dialogTurnGuidView: SC.LabelView.design({
    layout: {
      top: 320,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: add buttons for adding, moving and removing dialogTurns
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.guid"
  }),
  
  dialogTurnBeforeTextViewLabel: SC.LabelView.design({
    layout: {
      top: 340,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Before Text:"
  }),
  dialogTurnBeforeTextView: SC.LabelView.design({
    layout: {
      top: 360,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: YES,
    backgroundColor: "darkblue",
    valueBinding: "*parentView.content.selectedDialogTurn.beforeText"
  }),
  
  responseTemplateGuidViewLabel: SC.LabelView.design({
    layout: {
      top: 440,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Response Template ID:"
  }),
  responseTemplateGuidView: SC.LabelView.design({
    layout: {
      top: 460,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make an editable control to dynamically change the template
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.responseTemplate.guid"
  }),
  
  verifierDelegateNameViewLabel: SC.LabelView.design({
    layout: {
      top: 480,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Response Verifier Type:"
  }),
  verifierDelegateNameView: SC.LabelView.design({
    layout: {
      top: 500,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make an editable control to dynamically change the responseVerifier
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.responseVerifier.verifierDelegateName"
  }),
  
  verifierConfigViewLabel: SC.LabelView.design({
    layout: {
      top: 520,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Correct Answer:"
  }),
  verifierConfigView: SC.LabelView.design({
    layout: {
      top: 540,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: FIX:When this is editable the behavior doesn't change
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.responseVerifier.configString"
  }),
  
  dialogTurnAfterTextViewLabel: SC.LabelView.design({
    layout: {
      top: 560,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's After Text:"
  }),
  dialogTurnAfterTextView: SC.LabelView.design({
    layout: {
      top: 580,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: YES,
    backgroundColor: "darkblue",
    valueBinding: "*parentView.content.selectedDialogTurn.afterText"
  }),
  
  nextTurnForNominalResponseViewLabel: SC.LabelView.design({
    layout: {
      top: 600,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Next Turn ID for Correct Response:"
  }),
  nextTurnForNominalResponseView: SC.LabelView.design({
    layout: {
      top: 620,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: NO, // TODO: Make a selector
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.nextTurnForNominalResponse.guid"
  }),
  
  nextTurnForIncorrectResponseViewLabel: SC.LabelView.design({
    layout: {
      top: 640,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Next Turn ID for Incorrect Response:"
  }),
  nextTurnForIncorrectResponseView: SC.LabelView.design({
    layout: {
      top: 660,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make a selector
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.nextTurnForIncorrectResponse.guid"
  }),
  
  isLastTurnViewLabel: SC.LabelView.design({
    layout: {
      top: 680,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Is This the Last Turn?:"
  }),
  isLastTurnView: SC.LabelView.design({
    layout: {
      top: 700,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make an editor
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "Smartgraphs.dialogTurnController.isLastTurn"
  })
});
