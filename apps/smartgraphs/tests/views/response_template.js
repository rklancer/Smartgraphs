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

test("multiple choice question should contain choice radio buttons ", function () {

    var responseTemplates = Smartgraphs.store.find(Smartgraphs.ResponseTemplate);
    var responseTemplate = responseTemplates.objectAt(0);
    
    equals(responseTemplate.get('attributes'), Smartgraphs.ResponseTemplate.FIXTURES[0], "responseTemplate.get('attributes') should equal Smartgraphs.ResponseTemplate.FIXTURES[0]");

    Smartgraphs.responseTemplateController.set('content', responseTemplate);

    var responseTemplateDesign = Smartgraphs.ResponseTemplateView.design({
        fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
        fieldChoiceListsBinding: 'Smartgraphs.responseTemplateController.fieldChoiceLists',
        valuesBinding: 'Smartgraphs.responseTemplateController.values',
        editingShouldBeEnabledBinding: 'Smartgraphs.responseTemplateController.editingShouldBeEnabled'
    });

    // this is not what you want; the view will be created implicitly when pane.append() is called:
    // var responseTemplateView = responseTemplateDesign.create({});
    
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
        // childViews arrays should contain classes (i.e., the result of [viewClass].design() or [viewClass].extend())
        // NOT view instances; if you do *create* a view, you need to use [parentView].appendChild() to give the 
        // created view a parent.
        childViews: [responseTemplateDesign]      // changed to responseTemplateDesign from responseTemplateView
    });
    pane.append();
    console.log("pane:", pane);
    SC.RunLoop.end();

    // after pane.append(), you can get the view this way:
    responseTemplateViewRendered = pane.get('childViews').objectAt(0);
    
    // console.log("responseTemplateViewRendered:", responseTemplateViewRendered.toString());
    // console.log("responseTemplateViewRendered.get('childViews'):", responseTemplateViewRendered.get('childViews'));
    // console.log("responseTemplateViewRendered.get('childViews').get('length'):", responseTemplateViewRendered.get('childViews').get('length'));
    // console.log("responseTemplateViewRendered.get('childViews').objectAt(0):", responseTemplateViewRendered.get('childViews').objectAt(0));
    // console.log("responseTemplateViewRendered.get('childViews').objectAt(0).get('childViews').objectAt(0):", 
	
		// instead of logging so much (which makes the test impossible to read), just check that the view is what you want:
    ok(SC.kindOf(responseTemplateViewRendered, Smartgraphs.ResponseTemplateView), "responseTemplateView should have been rendered");
    ok(responseTemplateViewRendered.get('childViews').objectAt(0), "responseTemplateView should have a childView");

    //TODO: fix testing code below that was mostly copied from CC framework
    var multipleChoiceQuestionView = responseTemplateViewRendered.get('childViews').objectAt(0).get('childViews').objectAt(0);

    // again, these console.logs interrupt the flow of the test; try just using asserting that the things you're 
    // logging "equals()" the things you expect them to be. (If they're not, equals() will show their actual value.)

    // console.log("multipleChoiceQuestionView:", multipleChoiceQuestionView);
    // console.log("multipleChoiceQuestionView.get('childViews'):", multipleChoiceQuestionView.get('childViews'));
    // console.log("multipleChoiceQuestionView.get('childViews').objectAt(1):", multipleChoiceQuestionView.get('childViews').objectAt(1));
    // console.log("Don't know why responseTemplateViewRendered.$('.question-input') is not the rendered inputView div but is:", responseTemplateViewRendered.$('.question-input'));

    // '$input' below is a jQuery object wrapping the selected DOM elements (those with class 'question-input');
    // I like the convention of prefixing jQuery objects with '$'
    var $input = responseTemplateViewRendered.$('.question-input');

    // to get the DOM element selected by $() (which is more amenable to console.log than is the jQuery object)
    // use array notation:
    
    console.log("$input[0]: ", $input[0]);

    // equals will tell you the actual value
    equals($input.find('.sc-button-label').size(), 3, "There should be 3 choices");

    var firstChoice = $input.find('.sc-button-label').first().html().strip();
    console.log("firstChoice: ", firstChoice);
    equals(firstChoice, "a", "first choice should be 'a'");

    var lastChoice = $input.find('.sc-button-label').last().html().strip();
    console.log("lastChoice: ", lastChoice);
    equals(lastChoice, "c", "last choice should be 'c'");
});
