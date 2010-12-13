// ==========================================================================
// Project:   Smartgraphs.authorPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('resources/main_page');

// This is a place to hold the authorView until it's appended to the document

Smartgraphs.authorPageDef = SC.Page.extend({

  authorView: SC.View.design({
    childViews: ['instructionsWrapper', 'dataWrapper'],
    
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

          childViews: 'introTextView introTextHintView'.w(),
          
          introTextView: SC.LabelView.design({            
            valueBinding: 'Smartgraphs.activityPageController.introText',
            useStaticLayout: YES,
            escapeHTML: NO,
            isEditable: YES,
            isInlineEditorMultiline: YES,
            
            showEditor: NO,
            showEditorDidChange: function () {
              if (this.get('showEditor')) this.beginEditing();
            }.observes('showEditor'),
            
            beginEditing: function () {
              if (this.get('frame').height < 100) {
                SC.RunLoop.begin();
                this.adjust('height', 100);
                SC.RunLoop.end();
              }
              sc_super();
            },
            
            inlineEditorDidEndEditing: function () {
              sc_super();
              this.set('showEditor', NO);
              this.set('layout', {});            // be sure to unset any explicit height we may have set!
            }
          }),
          
          introTextHintView: SC.LabelView.design({
            useStaticLayout: YES,
            value: "<p>Introduce Page Here...</p>",
            classNames: 'hint'.w(),
            escapeHTML: NO,
            
            showEditorBinding: SC.Binding.oneWay('.parentView.introTextView.showEditor'),
            introTextIsEmptyBinding: SC.Binding.not('Smartgraphs.activityPageController.introText'),
            isVisible: function () {
              return this.get('introTextIsEmpty') && !this.get('showEditor');
            }.property('introTextIsEmpty', 'showEditor').cacheable(),

            doubleClick: function () {
              this.setPath('parentView.introTextView.showEditor', YES);
            }            
          })
          
        })
      })
    }),
    
    // ..........................................................
    // RIGHT PANE
    //
    // the right pane shows the data the user is manipulating
    dataWrapper: SC.View.design({
      layout: { right: 0, width: 0.55 },
    
      childViews: 'dataView'.w(),
    
      dataView: SC.View.design({
        layout: { top: 4, right: 4, bottom: 4, left: 4 }
      })
    })
  })

});

Smartgraphs.authorPage = Smartgraphs.authorPageDef.design();
