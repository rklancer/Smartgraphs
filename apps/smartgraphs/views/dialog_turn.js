// ==========================================================================
// Project:   Smartgraphs.DialogTurnView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.DialogTurnView = SC.View.extend(
/** @scope Smartgraphs.DialogTurnView.prototype */ {
  
  useStaticLayout: YES,
  
  childViews: 'beforeTextView responseFieldsView afterTextView buttonsView'.w(),
  
  beforeTextView: SC.StaticContentView.design({
    contentBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.beforeText'),
    isVisibleBinding: SC.Binding.bool('Smartgraphs.dialogTurnController.beforeText')
  }),
  
  responseFieldsView: SC.StaticContentView.design({
    
    fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
    fieldValuesBinding: 'Smartgraphs.responseTemplateController.fieldValues',
    
    fieldsTypesDidChange: function () {
      console.log('fieldTypesDidChange');
      this.invokeOnce(this._updateChildViews);
    }.observes('fieldTypes'),
    
    fieldValuesDidChange: function () {
      console.log('fieldValuesDidChange');      
      this.invokeOnce(this._updateChildViews);
    }.observes('fieldValues'),
    
    _updateChildViews: function () {
      console.log('_updateChildViews');   
      this.removeAllChildren();
      this.contentLayoutDidChange();

      var fieldTypes = this.get('fieldTypes');
      var fieldValues = this.get('fieldValues');
      
      if (!fieldTypes) {
        return;
      }

      for (var i = 0, ii = fieldTypes.get('length'); i < ii; i++) {
        var viewDesign = SC.View.design({
          useStaticLayout: YES,
          layout: {
            top: 0,
            height: 22,
            left: 0,
            width: 150
          },
          childViews: [SC.TextFieldView.design({
            index: i,
            valueDidChange: function () {
              console.log("responseFieldsView's child textFieldView observed value");
              var index = this.get('index');
              Smartgraphs.responseTemplateController.updateResponse(index, this.get('value'));
            }.observes('value')
          })]
        });
        this.appendChild(viewDesign.create());
      }
      
      this.contentLayoutDidChange();
    }
  }),
  
  afterTextView: SC.StaticContentView.design({
    contentBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.afterText'),
    isVisibleBinding: SC.Binding.bool('Smartgraphs.dialogTurnController.afterText')
  }),
  
  buttonsView: SC.View.design({
    useStaticLayout: YES,
    layout: {
      height: 24
    },
    
    childViews: 'checkResponseButton'.w(),
    
    checkResponseButton: SC.ButtonView.design({
      layout: {
        width: 140,
        right: 0
      },
      title: 'Check My Answer',
      isVisibleBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.checkResponseShouldBeVisible'),
      isEnabledBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.checkResponseShouldBeEnabled'),
      target: 'Smartgraphs.responseVerifierController',
      action: 'checkResponse'
    })
  })
});
