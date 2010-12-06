// ==========================================================================
// Project:   Smartgraphs.authorPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('resources/main_page');

// This is a place to hold the authorView until it's appended to the document

Smartgraphs.authorPageDef = SC.Page.extend({

  authorView: SC.View.design()

});

Smartgraphs.authorPage = Smartgraphs.authorPageDef.design();
