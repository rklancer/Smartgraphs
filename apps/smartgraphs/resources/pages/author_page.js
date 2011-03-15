// ==========================================================================
// Project:   Smartgraphs.authorPage
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('resources/pages/main_page');

// This is a place to hold the authorView until it's appended to the document

Smartgraphs.authorPageDef = SC.Page.extend({

  authorView: SC.View.design({
    childViews: ['instructionsWrapper', 'jsonEditor'],
    
    theme: 'sc-ace',
    
    instructionsWrapper: SC.View.design({
      layout: { left: 0, width: 0.45 },       // need to specify 0.5 rather than '50%'
      childViews: 'instructionsView'.w(),
    
      instructionsView: SC.View.design({
        classNames: 'smartgraph-pane',
        childViews: 'textWrapper'.w(),

        // provide padding and style rules for the intro text and dialog
        textWrapper: SC.View.design({
          layout: {
            top: 20,
            right: 20,
            left: 20
          },

          classNames: 'text-wrapper'.w(),

          childViews: 'introTextView introTextHintView activityStepView'.w(),
          
          // If the introText contents < 100px in height, adjust to this height before inline editing
          minEditorHeight: 100,
          
          // The following just works; enables a hint with a hover style that can be single-clicked to edit.
          introTextView: SC.LabelView.design({
            valueBinding: 'Smartgraphs.activityPageController.introText',
            useStaticLayout: YES,
            escapeHTML: NO,
            isEditable: YES,
            isInlineEditorMultiline: YES,
            minEditorHeightBinding: '.parentView.minEditorHeight',            
            
            showEditor: NO,
            showEditorDidChange: function () {
              if (this.get('showEditor')) this.beginEditing();
            }.observes('showEditor'),
            
            beginEditing: function () {
              if (this.get('frame').height < this.get('minEditorHeight')) {
                SC.RunLoop.begin();
                this.adjust('height', this.get('minEditorHeight'));
                SC.RunLoop.end();
              }
              sc_super();
            },
            
            inlineEditorDidEndEditing: function () {
              sc_super();
              this.set('showEditor', NO);
              this.set('layout', {});            // be sure to unset any explicit height we may have set!
            },
            
            mouseEntered: function () {
              if (this.get('frame').height < this.get('minEditorHeight')) {
                this.adjust('height', this.get('minEditorHeight'));
              }
              this.$().addClass('hovered');     
            },
            
            mouseExited: function () {
              this.$().removeClass('hovered');
              this.set('layout', {});
            },
            
            mouseDown: function () {
              this.beginEditing();
            }
          }),//introTextView
          
          introTextHintView: SC.LabelView.design({
            value: "<p>Introduce Page Here...</p>",
            classNames: 'hint'.w(),
            escapeHTML: NO,

            showEditorBinding: SC.Binding.oneWay('.parentView.introTextView.showEditor'),
            introTextIsEmptyBinding: SC.Binding.not('Smartgraphs.activityPageController.introText'),
            isVisible: function () {
              return this.get('introTextIsEmpty') && !this.get('showEditor');
            }.property('introTextIsEmpty', 'showEditor').cacheable(),

            minEditorHeightBinding: '.parentView.minEditorHeight',
            
            didUpdateLayer: function () {
              this.invokeLast(function () {
                this.set('originalHeight', this.$('p').outerHeight(true));
                this.adjust('height', this.get('originalHeight'));
              });
            },
            
            mouseDown: function () {
              this.adjust('height', this.get('originalHeight'));                
              this.setPath('parentView.introTextView.showEditor', YES);
            },
            
            mouseEntered: function () {
              this.adjust('height', this.get('minEditorHeight'));
              this.$().addClass('hovered');
            },
            
            mouseExited: function () {
              this.$().removeClass('hovered');
              this.adjust('height', this.get('originalHeight'));
            }
          }),// introTextHintView
          
          activityStepView: SC.View.design({          
            useStaticLayout: YES,
            
            isVisibleBinding: 'Smartgraphs.activityStepController.dialogTextHasContent',

            childViews: 'beforeTextView afterTextView'.w(),
            classNames: 'dialog-text'.w(),

            beforeTextView: SC.StaticContentView.design({
              contentBinding: 'Smartgraphs.activityStepController.beforeText',
              isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.beforeText')
            }),

            afterTextView: SC.StaticContentView.design({
              contentBinding: 'Smartgraphs.activityStepController.afterText',
              isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.afterText')
            })
          }) // activityStepView
        }) // textWrapper
      })
    }),
    
    // ..........................................................
    // RIGHT PANE
    //
    // the right pane shows the data the user is manipulating
    jsonEditor: SC.View.design({
      layout: { right: 0, width: 0.55 },
    
      childViews: 'editorView attributePicker'.w(),

      showPopup: NO,
      showPopupDidChange: function () {
        if (this.get('showPopup')) {
          this.editorView.set('isVisible', NO);
          this.attributePicker.set('isVisible', YES);
        }
        else {
          this.editorView.set('isVisible', YES);
          this.attributePicker.set('isVisible', NO);
        }
      }.observes('showPopup'),

      editorView: SC.View.design({
        layout: { top: 2, right: 2, bottom: 2, left: 2 },
        
        childViews: 'currentlyEditing currentlyEditingAttribute jsonEditorValidationError jsonEditorView'.w(),
        classNames: 'json-editor smartgraph-pane'.w(),
        
        currentlyEditing: SC.LabelView.design({
          layout: { top: 15, left: 10, height: 24, width: 140 },
          value: 'editing attribute:',
          classNames: 'json-currently-editing'.w(),
          escapeHTML: NO
        }),

        currentlyEditingAttribute: SC.LabelView.design({
          layout: { top: 15, left: 150, height: 19, right: 10 },
          valueBinding: SC.Binding.from("Smartgraphs.activityStepController.jsonEditorCurrentConfig").transform(function(config) {
            return config.objectType + "." + config.attribute;
          }),
          classNames: 'json-currently-editing-attribute'.w(),
          fontWeight: 'bold',
          escapeHTML: NO,
          mouseDown: function () {
            this.setPath('parentView.parentView.showPopup', YES);
          }
        }),

        jsonEditorValidationError: SC.LabelView.design({
          layout: { top: 40, right: 0, bottom: 0, left: 0 },
          classNames: 'json-editor-feedback'.w(),
          value: '&nbsp;',
          escapeHTML: NO,
          showEditor: NO,
          isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.jsonEditingIsInvalid')
        }),

        jsonEditorView: SC.TextFieldView.design({
          layout: { top: 50, right: 10, bottom: 10, left: 10 },
          valueBinding: "Smartgraphs.activityStepController.jsonEditorAttributeAsString",
          escapeHTML: YES,
          isEditing: YES,
          isTextArea: YES,
          isEditable: YES,
          isInlineEditorMultiline: YES,
          classNames: 'json-editor-code'.w()
        })

      }),
      
      attributePicker: SC.View.design({
        layout: { top: 5, right: 10, bottom: 10, left: 5 },
        classNames: 'json-attribute-picker shadow roundedCorners'.w(),
        childViews: 'activityAttributeListLabel activityAttributeList pageAttributeListLabel pageAttributeList stepAttributeListLabel stepAttributeList cancelButton'.w(),
        isVisible: NO,

        activityAttributeListLabel: SC.LabelView.design({
          layout: { top: 10, left: 10, width: 170, height:20 },
          classNames: 'attributeListLabel'.w(),
          value: "Activity Attributes",
        }),
        
        activityAttributeList: SC.ListView.design({
          layout: { top: 35, left: 10, width: 170, height:250 },
          classNames: 'attributeList'.w(),
          content: [ 
            {"objectType":"activity", "attribute":"url"},
            {"objectType":"activity", "attribute":"title"},
            {"objectType":"activity", "attribute":"owner"},
            {"objectType":"activity", "attribute":"pages"},
            {"objectType":"activity", "attribute":"axes", "serialize":true},
            {"objectType":"activity", "attribute":"units", "serialize":true},
            {"objectType":"activity", "attribute":"graphs", "serialize":true},
            {"objectType":"activity", "attribute":"datasets", "serialize":true},
            //{"objectType":"activity", "attribute":"datapoints", "serialize":true},
            {"objectType":"activity", "attribute":"annotations", "serialize":true},
            {"objectType":"activity", "attribute":"tags", "serialize:":true},
            {"objectType":"activity", "attribute":"responseTemplates"}
          ],
          contentValueKey: "attribute",
          actOnSelect: YES,
          action: function(listItem, event) {
            if (listItem) {
              Smartgraphs.activityStepController.set("jsonEditorCurrentConfig", listItem.content);
              this.setPath('parentView.parentView.showPopup', NO);
            }
          }
        }),

        pageAttributeListLabel: SC.LabelView.design({
          layout: { top: 310, left: 10, width: 170, height:20 },
          classNames: 'attributeListLabel'.w(),
          value: "Page Attributes",
        }),
        
        pageAttributeList: SC.ListView.design({
          layout: { top: 335, left: 10, width: 170, bottom:50 },
          classNames: 'attributeList'.w(),
          content: [ 
            {"objectType":"page", "attribute":"url"},
            {"objectType":"page", "attribute":"activity"},
            {"objectType":"page", "attribute":"name"},
            {"objectType":"page", "attribute":"index"},
            {"objectType":"page", "attribute":"introText"},
            {"objectType":"page", "attribute":"steps"},
            {"objectType":"page", "attribute":"firstStep"},
            {"objectType":"page", "attribute":"contextVars"},
            {"objectType":"page", "attribute":"pageNumber"}
          ],
          contentValueKey: "attribute",
          actOnSelect: YES,
          action: function(listItem, event) {
            if (listItem) {
              Smartgraphs.activityStepController.set("jsonEditorCurrentConfig", listItem.content);
              this.setPath('parentView.parentView.showPopup', NO);
            }
          }
        }),

        stepAttributeListLabel: SC.LabelView.design({
          layout: { top: 10, left: 200, width: 170, height:20 },
          classNames: 'attributeListLabel'.w(),
          value: "Step Attributes",
        }),
        
        stepAttributeList: SC.ListView.design({
          layout: { top: 35, left: 200, width: 170, bottom:50 },
          classNames: 'attributeList'.w(),
          content: [ 
            {"objectType":"step", "attribute":"url"}, 
            {"objectType":"step", "attribute":"activityPage"}, 
            {"objectType":"step", "attribute":"paneConfig"}, 
            {"objectType":"step", "attribute":"panes"}, 
            {"objectType":"step", "attribute":"beforeText"}, 
            {"objectType":"step", "attribute":"afterText"}, 
            {"objectType":"step", "attribute":"substitutedExpressions"}, 
            {"objectType":"step", "attribute":"tools"}, 
            {"objectType":"step", "attribute":"startCommands"}, 
            {"objectType":"step", "attribute":"shouldFinishImmediately"}, 
            {"objectType":"step", "attribute":"submissibilityCriterion"}, 
            {"objectType":"step", "attribute":"afterSubmissionCommands"}, 
            {"objectType":"step", "attribute":"responseTemplate"}, 
            {"objectType":"step", "attribute":"responseBranches"}, 
            {"objectType":"step", "attribute":"defaultBranch"}, 
            {"objectType":"step", "attribute":"isFinalStep"}, 
            {"objectType":"step", "attribute":"hideSubmitButton"}, 
            {"objectType":"step", "attribute":"submitButtonTitle"}, 
            {"objectType":"step", "attribute":"nextButtonShouldSubmit"}, 
          ],
          contentValueKey: "attribute",
          actOnSelect: YES,
          action: function(listItem, event) {
            if (listItem) {
              Smartgraphs.activityStepController.set("jsonEditorCurrentConfig", listItem.content);
              this.setPath('parentView.parentView.showPopup', NO);
            }
          }
        }),

        cancelButton: SC.ButtonView.design({
          layout: { bottom: 10, right: 10, height: 24, width: 80 },
          title: 'Cancel',
          mouseDown: function () {
            this.setPath('parentView.parentView.showPopup', NO);
          }
        }),
      })
    })
  })

});

Smartgraphs.authorPage = Smartgraphs.authorPageDef.design();


