// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var mwChoiceView, responseTemplateViewRendered;
var pane = SC.MainPane.create({});
var CHOICES = "one two three four five".w();
var oldStore, view;

function setupFixtures() {
    Smartgraphs.ResponseTemplate.oldFixtures = Smartgraphs.ResponseTemplate.FIXTURES;
    Smartgraphs.ResponseTemplate.FIXTURES = [{
        url: '/backend/response-template/1/multiplechoice',
        templateString: '',
        fieldTypes: ['multiplechoice', 'multiplechoice', 'numeric', 'textarea'],
        prompt: 'Choose <b>one</b>.',
        fieldChoiceLists: [["a", "b", "c"], ["a2", "b2", "c2"], [], []],
        initialValues: ['', 'b2', '000', ''],
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
        setupFixtures();
    },

    teardown: function() {
        restoreFixtures();
        pane.remove();
        pane = mwChoiceView = responseTemplateViewRendered = responseTemplateViewRendered = null;
    }

});

test("multiple choice question should contain choice radio buttons ",
function() {
    var responseTemplate;

    SC.RunLoop.begin();
    // console.log("Smartgraphs.store.simulateRemoteResponse: ", Smartgraphs.store.simulateRemoteResponse);
    // console.log("Smartgraphs.store.latency: ", Smartgraphs.store.latency);
    // console.log("Smartgraphs.ResponseTemplate.FIXTURES: ", Smartgraphs.ResponseTemplate.FIXTURES);
    var responseTemplates = Smartgraphs.store.find(Smartgraphs.ResponseTemplate);
    // console.log("responseTemplates: ", responseTemplates);
    // console.log("responseTemplates.get('length') : ", responseTemplates.get('length'));
    responseTemplate = responseTemplates.objectAt(0);
    // console.log("responseTemplate: ", responseTemplate);
    SC.RunLoop.end();

    // console.log("responseTemplate:", responseTemplate);
    equals(responseTemplate.get('attributes'), Smartgraphs.ResponseTemplate.FIXTURES[0], "responseTemplate.get('attributes') should equal Smartgraphs.ResponseTemplate.FIXTURES[0]");
    // try {
    //     console.log("responseTemplate.get('attributes'):", responseTemplate.get('attributes'));
    //     console.log("responseTemplate.get('url'):", responseTemplate.get('url'));
    //     console.log("responseTemplate.get('fieldTypes'):", responseTemplate.get('fieldTypes'));
    //     console.log("responseTemplate.get('fieldTypes').get('length'):", responseTemplate.get('fieldTypes').get('length'));
    // } catch(exception) {
    //     console.warn(" Failed in writing responseTemplate attributes to the console due to exception:", exception);
    // }

    SC.RunLoop.begin();
    Smartgraphs.responseTemplateController.set('content', responseTemplate);

    // console.log("Smartgraphs.responseTemplateController.get('fieldTypes'):", Smartgraphs.responseTemplateController.get('fieldTypes'));
    // console.log("responseTemplate.get('fieldTypes'):", responseTemplate.get('fieldTypes'));

    var responseTemplateDesign = Smartgraphs.ResponseTemplateView.design({
        fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
        fieldChoiceListsBinding: 'Smartgraphs.responseTemplateController.fieldChoiceLists',
        valuesBinding: 'Smartgraphs.responseTemplateController.values',
        editingShouldBeEnabledBinding: 'Smartgraphs.responseTemplateController.editingShouldBeEnabled'
    });

    var responseTemplateView = responseTemplateDesign.create({});
    // console.log("responseTemplateView:", responseTemplateView);
    pane = SC.MainPane.create({
        childViews: [responseTemplateView]
    });
    pane.append();
    console.log("pane:", pane);
    console.log("pane.$('body'):", pane.$('body'));
    SC.RunLoop.end();

    responseTemplateViewRendered = pane.childViews[0];
    console.log("responseTemplateViewRendered:", responseTemplateViewRendered);
    console.log("responseTemplateViewRendered.get('childViews'):", responseTemplateViewRendered.get('childViews'));
    console.log("responseTemplateViewRendered.get('childViews').get('length'):", responseTemplateViewRendered.get('childViews').get('length'));
    console.log("responseTemplateViewRendered.get('childViews').objectAt(0):", responseTemplateViewRendered.get('childViews').objectAt(0));
    console.log("responseTemplateViewRendered.get('childViews').objectAt(0).get('childViews').objectAt(0):", 
		responseTemplateViewRendered.get('childViews').objectAt(0).get('childViews').objectAt(0));

    ok(responseTemplateViewRendered, "responseTemplateView should have been rendered");

    ok(responseTemplateViewRendered.get('childViews').objectAt(0), "responseTemplateView should have a childView");

    //TODO: fix testing code below that was mostly copied from CC framework
    var multipleChoiceQuestionView = responseTemplateViewRendered.get('childViews').objectAt(0).get('childViews').objectAt(0);
    console.log("multipleChoiceQuestionView:", multipleChoiceQuestionView);
    console.log("multipleChoiceQuestionView.get('childViews'):", multipleChoiceQuestionView.get('childViews'));
    console.log("multipleChoiceQuestionView.get('childViews').objectAt(1):", multipleChoiceQuestionView.get('childViews').objectAt(1));
    console.log("Don't know why responseTemplateViewRendered.$('.question-input') is not the rendered inputView div but is:", 
		responseTemplateViewRendered.$('.question-input'));
    console.log("multipleChoiceQuestionView.get('layerId'):", multipleChoiceQuestionView.get('layerId'));
    console.log("pane.$('*'):", pane.$('*'));
    console.log("pane.$('body'):", pane.$('body'));
    console.log("pane.$('.question-input'):", pane.$('.question-input'));
    console.log("pane.$(multipleChoiceQuestionView.get('layerId').toString()):", pane.$(multipleChoiceQuestionView.get('layerId').toString()));
    var input = responseTemplateViewRendered.$('.question-input');
    console.log("input:", input);

    ok(input.find('.sc-button-label').size() === 3, "There should be 3 choices, there were: " + input.find('.sc-button-label').size());

    var firstChoice = input.find('.sc-button-label').first().html();
    console.log("firstChoice:", firstChoice);
    equals(firstChoice, "a ", "first choice should be 'a'");

    var lastChoice = input.find('.sc-button-label').last().html();
    console.log("lastChoice:", lastChoice);
    equals(lastChoice, "c", "last choice should be 'c'");
});
