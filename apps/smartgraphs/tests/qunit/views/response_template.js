// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start afterPropertyChange */

var pane, responseTemplateView;
var oldActivityStepController, oldStore;

function setupFixtures() {
  Smartgraphs.ResponseTemplate.oldFixtures = Smartgraphs.ResponseTemplate.FIXTURES;
  Smartgraphs.ResponseTemplate.FIXTURES = [{
    url: 'test-template',
    templateString: '',
    fieldTypes: ['multiplechoice', 'multiplechoice', 'numeric', 'textarea'],
    fieldChoicesList: [
      ['choice 1', 'choice 2', 'choice 3'], 
      ['choice A', 'choice B', 'choice C'], 
      [], 
      []
    ],
    initialValues: [null, null, null, null],
    values: []
  }];

  oldStore = Smartgraphs.store;

  // REMINDER: 'SC.Record.fixtures' is a singleton object; using it below would result in pollution of the data store
  // with data from prior tests.
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  Smartgraphs.ResponseTemplate.FIXTURES = Smartgraphs.ResponseTemplate.oldFixtures;
  Smartgraphs.set('store', oldStore);
}


module("Smartgraphs.ResponseTemplate", {
  setup: function() {
    oldActivityStepController = Smartgraphs.activityStepController;
    Smartgraphs.activityStepController = SC.Object.create({
      responseTemplate: null
    });
    setupFixtures();
  },

  teardown: function() {
    restoreFixtures();
    pane.remove();
    pane = responseTemplateView = null;
    Smartgraphs.activityStepController = oldActivityStepController;
  }
});



/** TODO:

 * test that setting responseTemplateController content to null causes all childViews to be removed from the screen.
 * test that setting responseTemplateController content to a different value causes appropriate childViews to be
   created
 * test that updating the value property of the different fields cause the responseTemplateController's values array
   to be correctly updated.
 * test that initial values are correctly set
 * test that button labels don't overlap
*/

test("show the view", function () {
  SC.RunLoop.begin();
  pane = SC.MainPane.create({
    childViews: [Smartgraphs.ResponseTemplateView.design({
      fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
      fieldChoicesListBinding: 'Smartgraphs.responseTemplateController.fieldChoicesList',
      valuesBinding: 'Smartgraphs.responseTemplateController.values',
      editingShouldBeEnabled: NO,
      viewShouldResetBinding: 'Smartgraphs.responseTemplateController.viewShouldReset'
    })]
  });
  pane.append();
  SC.RunLoop.end();
  
  SC.RunLoop.begin();
  var responseTemplate = Smartgraphs.store.find(Smartgraphs.ResponseTemplate, 'test-template');  
  Smartgraphs.responseTemplateController.setTemplate(responseTemplate);
  SC.RunLoop.end();

  var responseTemplateView = pane.get('childViews').objectAt(0);

  setTimeout(function () {
    responseTemplateView.set('doneShowing', YES);
  },
  5000);

  afterPropertyChange(responseTemplateView, 'doneShowing', YES,
  function() {});
});


test("first child of multiple choice question should contain appropriate child views", function() {
  SC.RunLoop.begin();
  pane = SC.MainPane.create({
    childViews: [Smartgraphs.ResponseTemplateView.design({
      fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
      fieldChoicesListBinding: 'Smartgraphs.responseTemplateController.fieldChoicesList',
      valuesBinding: 'Smartgraphs.responseTemplateController.values',
      editingShouldBeEnabled: NO,
      viewShouldResetBinding: 'Smartgraphs.responseTemplateController.viewShouldReset'
    })]
  });
  pane.append();
  SC.RunLoop.end();
  
  SC.RunLoop.begin();
  var responseTemplate = Smartgraphs.store.find(Smartgraphs.ResponseTemplate, 'test-template');  
  Smartgraphs.responseTemplateController.setTemplate(responseTemplate);
  SC.RunLoop.end();

  responseTemplateView = pane.get('childViews').objectAt(0);

  ok(SC.kindOf(responseTemplateView, Smartgraphs.ResponseTemplateView), "first child of the pane should be a responseTemplateView");
  equals(responseTemplateView.getPath('childViews.length'), 4, 'responseTemplateView should have 4 childViews');
  ok(responseTemplateView.get('isVisible') === YES, 'responseTemplateView should be visible');

  var firstQuestionView = responseTemplateView.get('childViews').objectAt(0);
  var $layer = firstQuestionView.$();
  
  equals($layer.find('.sc-button-label').size(), 3, "The first field have three labels with 3 choices.");

  var firstChoice = $layer.find('.sc-button-label').first().html().strip();
  equals(firstChoice, 'choice 1', "The first choice should be 'choice 1'");

  var lastChoice = $layer.find('.sc-button-label').last().html().strip();
  equals(lastChoice, 'choice 3', "last choice should be 'choice 3'");
});
