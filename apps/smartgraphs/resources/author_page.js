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

          childViews: 'introText'.w(),

          introText: SC.LabelView.design({            
            valueBinding: 'Smartgraphs.activityPageController.introText',
            isVisibleBinding: SC.Binding.bool('Smartgraphs.activityPageController.introText'),
            useStaticLayout: YES,
            escapeHTML: NO,
            isEditable: YES,
            isInlineEditorMultiline: YES
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
