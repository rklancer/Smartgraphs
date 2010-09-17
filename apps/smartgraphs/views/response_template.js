// ==========================================================================
// Project:   Smartgraphs.ResponseTemplateView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.StaticContentView
*/
Smartgraphs.ResponseTemplateView = SC.StaticContentView.extend(
/** @scope Smartgraphs.ResponseTemplateView.prototype */
{

    // Bind these properties
    fieldTypes: [],
    fieldChoiceLists: [],
    values: [],
    editingShouldBeEnabled: null,

    // hide if there is no response template; especially important because IE7 doesn't its height as 0 when empty.
    isVisibleBinding: SC.Binding.bool('.fieldTypes'),

    fieldsTypesDidChange: function() {
        this.invokeOnce(this._updateChildViews);
    }.observes('fieldTypes'),

    // TODO: Extend view classes from CC framework instead of just copying the code
    _updateChildViews: function() {
        this.get('childViews').invoke('destroy');
        var fieldTypes = this.get('fieldTypes');
        if (!fieldTypes) return;

        var fieldChoiceLists = this.get('fieldChoiceLists');
        var values = this.get('values');

        var fieldType, fieldChoiceList, value, prompt;
        var isTextArea, layout, hint;

        for (var i = 0,
        fieldTypesLength = fieldTypes.get('length'); i < fieldTypesLength; i++) {
            fieldType = fieldTypes.objectAt(i);
            value = values.objectAt(i);
            fieldChoiceList = fieldChoiceLists.objectAt(i);

            if (fieldType === 'textarea') {
                isTextArea = YES;
                hint = 'Enter your answer here...';
                layout = {
                    height: 97
                };
            } else if (fieldType === 'numeric') {
                isTextArea = NO;
                layout = {
                    height: 22,
                    width: 100
                };
            } else if (fieldType === 'multiplechoice') {
                isTextArea = NO;
                layout = {
                    left: 0,
                    height: 200,
                    width: 350
                };
                prompt = this.get('prompt');
            } else {
                throw "ResponseTemplateView received unexpected field type string '" + fieldType + "'.";
            }

            var view;
            var subViewDesign;
            if (fieldType === 'multiplechoice') {
                subViewDesign = Smartgraphs.MultipleChoiceQuestionView.design({
                    classNames: 'question2View'.w(),
                    prompt: prompt,
                    choices: fieldChoiceList,
                    index: i,
                    value: value,
                    valueDidChange: function() {
                        var values = this.getPath('parentView.parentView.values');
                        values.replace(this.get('index'), 1, this.get('value'));
                    }.observes('value')
                });
            } else {
                subViewDesign = SC.TextFieldView.design({
                    isTextArea: isTextArea,
                    hint: hint,
                    index: i,
                    value: value,
                    isEnabledBinding: '.parentView.parentView.editingShouldBeEnabled',

                    valueDidChange: function() {
                        var values = this.getPath('parentView.parentView.values');
                        values.replace(this.get('index'), 1, this.get('value'));
                    }.observes('value')
                });
            }

            var wrapperDesign = SC.View.design({
                useStaticLayout: YES,
                layout: layout,
                classNames: 'text-field-view-wrapper'.w(),

                childViews: [subViewDesign]
            });
            view = wrapperDesign.create();

            if (fieldType === 'multiplechoice') {
                // Make sure initial value is rendered
                view.childViews[0].inputView.set('value', value);
                this.appendChild(view);
            } else {
                // note that SC.TextFieldViews don't display properly at all if they have useStaticLayout: YES
                if (i === 0) {
                    this._firstInputFieldView = view.get('childViews').objectAt(0);
                }
                this.appendChild(view);
                this.invokeLater(this._beginEditingFirstView);
            }
        }
    },

    _beginEditingFirstView: function() {
        if (this._firstInputFieldView) {
            this._firstInputFieldView.beginEditing();
        }
    }
});
