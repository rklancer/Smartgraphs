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
    fieldTypes: null,
    fieldChoiceLists: null,
    values: null,
    editingShouldBeEnabled: null,

    // hide if there is no response template; especially important because IE7 doesn't its height as 0 when empty.
    isVisibleBinding: SC.Binding.bool('.fieldTypes'),

    fieldsTypesDidChange: function() {
        this.invokeOnce(this._updateChildViews);
    }.observes('fieldTypes'),

    // TODO: DRY/refactor this function
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
                    height: 100,
                    width: 400
                };
                prompt = this.get('prompt');
            } else {
                throw "ResponseTemplateView received unexpected field type string '" + fieldType + "'.";
            }

            var view;
            if (fieldType === 'multiplechoice') {
                var multipleChoiceQuestionWrapperDesign = SC.View.design({
                    useStaticLayout: YES,
                    layout: layout,
                    classNames: 'text-field-view-wrapper'.w(),

                    childViews: [Smartgraphs.MultipleChoiceQuestionView.design({
                        classNames: 'question2View',
                        prompt: prompt,
                        choices: fieldChoiceList,
                        index: i,
                        // value: value,
                        // isEnabledBinding: '.parentView.parentView.editingShouldBeEnabled',
                        valueDidChange: function() {
                            var values = this.getPath('parentView.parentView.values');
                            values.replace(this.get('index'), 1, this.get('value'));
                        }.observes('value')
                    })]
                });
                view = multipleChoiceQuestionWrapperDesign.create();
                if (i === 0) {
                    this._firstInputFieldView = view.get('childViews').objectAt(0);
                }
                this.appendChild(view);
            } else {
                // note that SC.TextFieldViews don't display properly at all if they have useStaticLayout: YES
                var inputFieldWrapperDesign = SC.View.design({
                    useStaticLayout: YES,
                    layout: layout,
                    classNames: 'text-field-view-wrapper'.w(),

                    childViews: [SC.TextFieldView.design({
                        isTextArea: isTextArea,
                        hint: hint,
                        index: i,
                        value: value,
                        isEnabledBinding: '.parentView.parentView.editingShouldBeEnabled',

                        valueDidChange: function() {
                            var values = this.getPath('parentView.parentView.values');
                            values.replace(this.get('index'), 1, this.get('value'));
                        }.observes('value')
                    })]
                });
                view = inputFieldWrapperDesign.create();
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
