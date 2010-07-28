// ==========================================================================
// Project:   Smartgraphs.ResponseTemplateView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.StaticContentView
*/
Smartgraphs.ResponseTemplateView = SC.StaticContentView.extend(
/** @scope Smartgraphs.ResponseTemplateView.prototype */ {
  
  // Bind these properties
  fieldTypes: null,
  fieldChoiceLists: null,
  values: null,

  // hide if there is no response template; especially important because IE7 doesn't its height as 0 when empty.
  isVisibleBinding: SC.Binding.bool('.fieldTypes'),
      
  fieldsTypesDidChange: function () {
    this.invokeOnce(this._updateChildViews);
  }.observes('fieldTypes'),

  _updateChildViews: function () {
    this.get('childViews').invoke('destroy');

    var fieldTypes = this.get('fieldTypes');
    if (!fieldTypes) return;

    var fieldChoiceLists = this.get('fieldChoiceLists');
    var values = this.get('values');
  
    var fieldType, fieldChoiceList, value;
    var isTextArea, layout, hint;
    var inputFieldWrapperDesign;
  
    for (var i = 0, ii = fieldTypes.get('length'); i < ii; i++) {
      fieldType = fieldTypes.objectAt(i);
      fieldChoiceList = fieldChoiceLists.objectAt(i);
      value = values.objectAt(i);
    
      if (fieldType === 'textarea') {
        isTextArea = YES;
        hint = 'Enter you answer here...';
        layout = {
          height: 97
        };
      }
      else if (fieldType === 'numeric') {
        isTextArea = NO;
        layout = {
          height: 22,
          width: 100 
        };
      }
      else {
        throw "ResponseTemplateView received unexpected field type string '" + fieldType + "'.";
      }

      // note that SC.TextFieldViews don't display properly at all if they have useStaticLayout: YES
      inputFieldWrapperDesign = SC.View.design({
        useStaticLayout: YES,
        hasStaticLayout: YES,
        layout: layout,
        classNames: 'text-field-view-wrapper'.w(),
    
        childViews: [SC.TextFieldView.design({
          isTextArea: isTextArea,
          hint: hint,
          index: i,
          value: value,
          
          valueDidChange: function () {
            var values = this.getPath('parentView.parentView.values');
            values.replace(this.get('index'), 1, this.get('value'));
          }.observes('value')
        })]
      });
      
      var view = inputFieldWrapperDesign.create();
      if (i === 0) {
        this._firstInputFieldView = view.get('childViews').objectAt(0);
      }
      this.appendChild(view);
    }
    
    this.invokeLater(this._beginEditingFirstView);
  },
    
  _beginEditingFirstView: function () {
    if (this._firstInputFieldView) {
      this._firstInputFieldView.beginEditing();
    }
  } 
});
