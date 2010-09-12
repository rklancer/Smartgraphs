// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var mwChoiceView, pane, mwChoiceViewRendered, responseTemplateViewRendered;
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
        initialValues: ['', 'b2', '000', '']
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
        pane = mwChoiceView = mwChoiceViewRendered = responseTemplateViewRendered = null;
    }

});

function testResponseTemplateRecordNow(responseTemplate) {
    console.log("testResponseTemplateRecordNow called:");
    try {
        console.log("responseTemplate:", responseTemplate);
        equals(responseTemplate.get('status'), SC.Record.READY_CLEAN, "responseTemplate.get('status') should be SC.Record.READY_CLEAN");
        equals(responseTemplate.attributes(), Smartgraphs.ResponseTemplate.FIXTURES, "responseTemplate.attributes() should equal Smartgraphs.ResponseTemplate.FIXTURES");
        try {
            console.log("responseTemplate.attributes():", responseTemplate.attributes());
            console.log("responseTemplate.url:", responseTemplate.url);
            console.log("responseTemplate.url.toString():", responseTemplate.url.toString());
            console.log("responseTemplate.fieldTypes:", responseTemplate.fieldTypes);
            console.log("responseTemplate.fieldTypes.get('length'):", responseTemplate.fieldTypes.get('length'));
        } catch(exception) {
            console.warn(" Failed in testResponseTemplateRecordLater due to exception:", exception);
        }

        SC.RunLoop.begin();
        // Smartgraphs.activityStepController.set('responseTemplate', responseTemplate);
        // var responseTemplateDesign = Smartgraphs.ResponseTemplateView.design({
        //     fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
        //     fieldChoiceListsBinding: 'Smartgraphs.responseTemplateController.fieldChoiceLists',
        //     valuesBinding: 'Smartgraphs.responseTemplateController.values',
        //     editingShouldBeEnabledBinding: 'Smartgraphs.responseTemplateController.editingShouldBeEnabled'
        // });
        var responseTemplateDesign = Smartgraphs.ResponseTemplateView.design({
            fieldTypesBinding: 'responseTemplate.fieldTypes',
            fieldChoiceListsBinding: 'responseTemplate.fieldChoiceLists',
            valuesBinding: 'responseTemplate.values',
            editingShouldBeEnabledBinding: 'responseTemplate.editingShouldBeEnabled'
        });
        var responseTemplateView = responseTemplateDesign.create();
        // {
        //             fieldTypes: responseTemplate.fieldTypes,
        //             fieldChoiceLists: responseTemplate.fieldChoiceLists,
        //             values: responseTemplate.values,
        //             editingShouldBeEnabled: responseTemplate.editingShouldBeEnabled
        // 		});
        pane = SC.MainPane.create({
            childViews: [responseTemplateView]
        });
        pane.append();
        responseTemplateView._updateChildViews();
        SC.RunLoop.end();
        try {
            console.log("responseTemplateView.fieldTypes:", responseTemplateView.fieldTypes);
            console.log("responseTemplateView.fieldTypes.get('length'):", responseTemplateView.fieldTypes.get('length'));
        } catch(responseTemplateViewException) {
            console.warn(" Failed in testResponseTemplateRecordLater due to exception:", responseTemplateViewException);
        }

        responseTemplateViewRendered = pane.childViews[0];
        console.log("responseTemplateViewRendered:", responseTemplateViewRendered);
        console.log("responseTemplateViewRendered.get('childViews'):", responseTemplateViewRendered.get('childViews'));

        ok(responseTemplateViewRendered, "responseTemplateView should have been rendered");

        ok(responseTemplateViewRendered.get('childViews')[0], "responseTemplateView should have a childView");
        //TODO: make more assertions similar to code below from CC framework
        // var input = mwChoiceViewRendered.$('.question-input');
        // 
        // ok(input.find('.sc-button-label').size() === 5, "There should be five choices, there were:" + input.find('.sc-button-label').size());
        // 
        // var firstChoice = input.find('.sc-button-label').first().html();
        // equals(firstChoice, "one", "first choice should be 'one'");
        // 
        // var lastChoice = input.find('.sc-button-label').last().html();
        // equals(lastChoice, "five", "last choice should be 'five'");
    } catch(e) {
        console.error(" Failed in testResponseTemplateRecordNow due to error:", e);
    }
}

function testResponseTemplateRecordLater(responseTemplate) {
    console.log("testResponseTemplateRecordLater called:");
    try {
        var status = responseTemplate.get('status');
        console.log(" responseTemplate.status", status);
        if (status === SC.Record.READY_CLEAN) {
            testResponseTemplateRecordNow(responseTemplate);
        }
    } catch(e) {
        console.error(" Failed in testResponseTemplateRecordLater due to error:", e);
    }
}

function testResponseTemplateRecord(responseTemplate) {
    SC.RunLoop.begin();
    console.log("Smartgraphs.store.simulateRemoteResponse:", Smartgraphs.store.simulateRemoteResponse);
    console.log("Smartgraphs.store.latency:", Smartgraphs.store.latency);
    console.log("Smartgraphs.ResponseTemplate.FIXTURES:", Smartgraphs.ResponseTemplate.FIXTURES);
    responseTemplate = Smartgraphs.store.createRecord(Smartgraphs.ResponseTemplate, Smartgraphs.ResponseTemplate.FIXTURES);
    Smartgraphs.store.commitRecords();
    SC.RunLoop.end();
    // If responseTemplate status is immediately READY_CLEAN, then we are loading from fixtures,
    // so we can begin immediately. Otherwise, wait for responseTemplate to be loaded from a
    // remote data source
    if (responseTemplate.get('status') === SC.Record.READY_CLEAN) {
        console.log("responseTemplate status is immediately READY_CLEAN");
        testResponseTemplateRecordNow(responseTemplate);
    } else {
        // Register an observer of status to set this.sequence when the record is READY_CLEAN
        responseTemplate.addObserver('status', this, testResponseTemplateRecordLater, responseTemplate);
    }
}

test("multiple choice question should contain choice radio buttons",
function() {
    var responseTemplate;
    testResponseTemplateRecord(responseTemplate);
});
