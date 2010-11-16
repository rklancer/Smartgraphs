// ==========================================================================
// Project:   Smartgraphs.responseTemplate Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.responseTemplate");

test("Set a template", function() {
  expect(6);
  equals( Smartgraphs.responseTemplateController.get('viewShouldReset'), NO, "Initial value of viewShouldReset is NO");
  same( Smartgraphs.responseTemplateController.get('content'), null, "Initial controller content is null");
  same( Smartgraphs.responseTemplateController.get('initialValues'), undefined, "Initial controller initialValues is undefined");
  
  Smartgraphs.responseTemplateController.set('initialValues', "Lorem ipsum"); // To test assignment within method
  Smartgraphs.responseTemplateController.setTemplate("/components/response-template/open"); 
  // The above template doesn't necessarily exist, but needn't for the test
  
  equals( Smartgraphs.responseTemplateController.get('content'), '/components/response-template/open', "New controller content is an url of a response template");
  equals( Smartgraphs.responseTemplateController.get('viewShouldReset'), YES, "viewShouldReset is now YES");
  equals( Smartgraphs.responseTemplateController.get('values'), Smartgraphs.responseTemplateController.get('initialValues'), "Controller values now match initialValues");
  
});

