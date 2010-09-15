// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start afterPropertyChange */

var pane, responseTemplateView;
var oldActivityStepController, oldStore;

function setupFixtures() {
    Smartgraphs.ResponseTemplate.oldFixtures = Smartgraphs.ResponseTemplate.FIXTURES;
    Smartgraphs.ResponseTemplate.FIXTURES = [
        {
            url: 'test-template',
            templateString: '',
            fieldTypes: ['multiplechoice', 'multiplechoice', 'numeric', 'textarea'],
            prompt: 'Choose <b>one</b>.',
            fieldChoiceLists: [
                ["a", "b", "c"],
                ["a2", "b2", "c2"],
                [],
                []
            ],
            initialValues: ['', 'b2', '000', ''],
            values: []
        }
    ];

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

test("multiple choice question should contain choice radio buttons",
        function() {
            var responseTemplate = Smartgraphs.store.find(Smartgraphs.ResponseTemplate, 'test-template');

            Smartgraphs.responseTemplateController.set('content', responseTemplate);

            SC.RunLoop.begin();
            pane = SC.MainPane.create({
                childViews: [Smartgraphs.ResponseTemplateView.design({
                    fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
                    fieldChoiceListsBinding: 'Smartgraphs.responseTemplateController.fieldChoiceLists',
                    valuesBinding: 'Smartgraphs.responseTemplateController.values',
                    editingShouldBeEnabled: NO
                })]
            });
            pane.append();
            SC.RunLoop.end();

            responseTemplateView = pane.get('childViews').objectAt(0);

            ok(SC.kindOf(responseTemplateView, Smartgraphs.ResponseTemplateView), "first child of the pane should be a responseTemplateView");
            ok(responseTemplateView.get('childViews').objectAt(0), "responseTemplateView should have a childView");
            ok(responseTemplateView.get('isVisible') === YES, 'responseTemplateView should be visible');

            var multipleChoiceQuestionView = responseTemplateView.get('childViews').objectAt(0).get('childViews').objectAt(0);
            var $input = responseTemplateView.$('.question-input');
            // console.log('$input:', $input);

            // console.log("$input.find('.sc-button-label').size():", $input.find('.sc-button-label').size());
            equals($input.find('.sc-button-label').size(), 6, "There should be 6 choices");

            var firstChoice = $input.find('.sc-button-label').first().html().strip();
            // console.log('firstChoice:', firstChoice);
            equals(firstChoice, "a", "first choice should be 'a'");

            var lastChoice = $input.find('.sc-button-label').last().html().strip();
            // console.log('lastChoice:', lastChoice);
            equals(lastChoice, "c2", "last choice should be 'c2'");
            try {
                var scButtonLabelText = $input.find(".sel").find('.sc-button-label').text();
                equals(scButtonLabelText , "b2", "The only selected sc-radio-button should be 'b2'");
            } catch(ecptn) {
                console.error("Trouble getting scButtonLabelText:", ecptn);
            }
        });

test("show the view",
        function() {
            var responseTemplate = Smartgraphs.store.find(Smartgraphs.ResponseTemplate, 'test-template');

            Smartgraphs.responseTemplateController.set('content', responseTemplate);

            SC.RunLoop.begin();
            pane = SC.MainPane.create({
                childViews: [Smartgraphs.ResponseTemplateView.design({
                    fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
                    fieldChoiceListsBinding: 'Smartgraphs.responseTemplateController.fieldChoiceLists',
                    valuesBinding: 'Smartgraphs.responseTemplateController.values',
                    editingShouldBeEnabled: NO
                })]
            });
            pane.append();
            SC.RunLoop.end();

            var responseTemplateView = pane.get('childViews').objectAt(0);

            setTimeout(function() {
                responseTemplateView.set('doneShowing', YES);
            },
                    5000);

            afterPropertyChange(responseTemplateView, 'doneShowing', YES,
                    function() {
                    });
        });
