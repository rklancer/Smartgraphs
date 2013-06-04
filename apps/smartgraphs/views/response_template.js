// ==========================================================================
// Project:   Smartgraphs.ResponseTemplateView
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// Author:    Dr. Baba Kofi Weusijana <kofi@edutek.net>
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
  fieldChoicesList: [],
  values: [],
  editingShouldBeEnabled: null,
  viewShouldReset: NO,

  // hide if there is no response template; especially important because IE7 doesn't its height as 0 when empty.
  isVisibleBinding: SC.Binding.bool('.fieldTypes'),

  viewShouldResetDidChange: function () {
    if (this.get('viewShouldReset')) this.invokeOnce(this.resetView);
  }.observes('viewShouldReset'),

  resetView: function () {
    this.clearChildViews();
    this.addChildViews();
    this.set('viewShouldReset', NO);
  },

  clearChildViews: function () {
    this._firstInputFieldView = null;
    this.get('childViews').invoke('destroy');
  },

  addChildViews: function () {
    var fieldTypes = this.get('fieldTypes');
    if (!fieldTypes) return;

    var fieldChoicesList = this.get('fieldChoicesList');
    var values = this.get('values');

    var fieldType;

    for (var i = 0, ii = fieldTypes.get('length'); i < ii; i++) {
      fieldType = fieldTypes.objectAt(i);
      this.addChildView(fieldType, fieldChoicesList.objectAt(i), values.objectAt(i), i);

      if (i === 0 && (fieldType === 'numeric' || fieldType === 'textarea')) {
        this._firstInputFieldView = this.get('childViews').objectAt(0).get('childViews').objectAt(0);
        this.invokeLater(this._beginEditingFirstView);
      }
    }
  },

  addChildView: function (fieldType, fieldChoices, initialValue, fieldIndex) {
    var view;

    switch (fieldType) {
      case 'textarea':
        view = this.wrap(this.makeTextAreaDesign(initialValue, fieldIndex), {
          height: 97
        });
        break;
      case 'numeric':
        view = this.wrap(this.makeNumericFieldDesign(initialValue, fieldIndex), {
          height: 22,
          width: 100
        });
        break;
      case 'multiplechoice':
        view = this.makeMultipleChoiceView(fieldChoices, initialValue, fieldIndex);
        break;
      default:
        throw "ResponseTemplateView received unexpected field type string '" + fieldType + "'.";
    }

    this.appendChild(view);
  },

  wrap: function (subViewDesign, layout) {
    return SC.View.design({
      useStaticLayout: YES,
      layout: layout,
      classNames: 'text-field-view-wrapper'.w(),

      childViews: [subViewDesign]
    }).create();
  },

  makeTextAreaDesign: function (initialValue, fieldIndex) {
    return SC.TextFieldView.design({
      isTextArea: YES,
      hint: 'Enter your answer here...',
      fieldIndex: fieldIndex,
      value: initialValue,
      isEnabledBinding: '.parentView.parentView.editingShouldBeEnabled',

      valueDidChange: function () {
        var values = this.getPath('parentView.parentView.values');
        if (values) values.replace(this.get('fieldIndex'), 1, this.get('value'));
      }.observes('value'),

      /**
        SC.TextFieldView sets this property to NO to work around an (old?) WebKit bug, but not having a placeholder
        attribute confuses Mobile Safari, at least in iOS5. (Symptom is that, if you tap to edit the textarea, then
        the hint text becomes part of your response.)

        It's important to feature-detect placeholder support because IE does not respect the 'placeholder' attribute.
        SC.TextFieldView therefore makes the textarea *content* equal to the hint text, and removes it when the user
        starts typing.
      */
      _supportsPlaceHolder: Smartgraphs.support.placeholder
    });
  },

  makeNumericFieldDesign: function (initialValue, fieldIndex) {
    return SC.TextFieldView.design({
      isTextArea: NO,
      fieldIndex: fieldIndex,
      value: initialValue,
      isEnabledBinding: '.parentView.parentView.editingShouldBeEnabled',

      valueDidChange: function () {
        var values = this.getPath('parentView.parentView.values');
        if (values) values.replace(this.get('fieldIndex'), 1, this.get('value'));
      }.observes('value')
    });
  },

  makeMultipleChoiceView: function (fieldChoices, initialValue, fieldIndex) {
    var items = [];

    // transform ['Choice 1', 'Choice 2'] -> [ {title: 'Choice 1', index: 1}, {title: 'Choice 2', index: 2} ]
    items = fieldChoices.reduce(function (prev, item, index) {
      return prev.concat({ title: item, index: index+1 });
    }, []);

    return SC.RadioView.design({
      items: items,
      itemTitleKey: 'title',
      itemValueKey: 'index',

      fieldIndex: fieldIndex,
      value: initialValue,
      isEnabledBinding: '.parentView.editingShouldBeEnabled',
      useStaticLayout: YES,

      valueDidChange: function () {
        var values = this.getPath('parentView.values');
        if (values) values.replace(this.get('fieldIndex'), 1, this.get('value'));
      }.observes('value')
    }).create();
  },

  _beginEditingFirstView: function () {
    if (this._firstInputFieldView) {
      this._firstInputFieldView.beginEditing();
    }
  }
});
