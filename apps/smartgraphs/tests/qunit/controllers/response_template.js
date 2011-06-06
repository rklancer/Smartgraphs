// ==========================================================================
// Project:   Smartgraphs.responseTemplate Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.responseTemplate", {
  setup: function () {
    // clean up any stray state possibly set by other tests
    Smartgraphs.responseTemplateController.setTemplate(null);
    Smartgraphs.responseTemplateController.set('viewShouldReset', NO);
    Smartgraphs.responseTemplateController.set('initialValues', null);
  }
});

test("Set a template", function() {
  expect(6);
  
  // preconditions
  equals( Smartgraphs.responseTemplateController.get('viewShouldReset'), NO, "Initial value of viewShouldReset is NO");
  equals( Smartgraphs.responseTemplateController.get('content'), null, "Initial controller content is null");
  equals( Smartgraphs.responseTemplateController.get('initialValues'), null, "Initial controller initialValues is falsy");
  
  // what we're actually testing
  Smartgraphs.responseTemplateController.set('initialValues', "Lorem ipsum"); // To test assignment within method
  Smartgraphs.responseTemplateController.setTemplate("/components/response-template/open"); 
  // The above template doesn't necessarily exist, but needn't for the test
  
  equals( Smartgraphs.responseTemplateController.get('content'), '/components/response-template/open', "New controller content is an url of a response template");
  equals( Smartgraphs.responseTemplateController.get('viewShouldReset'), YES, "viewShouldReset is now YES");
  equals( Smartgraphs.responseTemplateController.get('values'), Smartgraphs.responseTemplateController.get('initialValues'), "Controller values now match initialValues");
  
});

