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
  
  // FIXME: this could go into its own view class.
  // responseFields could be a property on the responseTemplateController, bound to dialogTurnView
  // (responses do properly live with the DialogTurn...)
  
  responseFieldsView: SC.StaticContentView.design({
    
    fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
    fieldValuesBinding: 'Smartgraphs.responseTemplateController.fieldValues',
    
    fieldsTypesDidChange: function () {
      //console.log('fieldTypesDidChange');
      this.invokeOnce(this._updateChildViews);
    }.observes('fieldTypes'),
    
    fieldValuesDidChange: function () {
      //console.log('fieldValuesDidChange');      
      this.invokeOnce(this._updateChildViews);
    }.observes('fieldValues'),
    
    _updateChildViews: function () {
      //console.log('_updateChildViews');   
      this.removeAllChildren();
      this.contentLayoutDidChange();

      var fieldTypes = this.get('fieldTypes');
      var fieldValues = this.get('fieldValues');
      
      if (!fieldTypes) {
        return;
      }

      var type, viewDesign, isTextArea, layout;
      
      for (var i = 0, ii = fieldTypes.get('length'); i < ii; i++) {
        type = fieldTypes.objectAt(i);
        
        if (type === 'textarea') {
          isTextArea = YES;
          layout = {
            height: 110
          };
        }
        else if (type === 'numeric') {
          isTextArea = NO;
          layout = {
            height: 22,
            width: 100
          };          
        }
        else {
          throw "responseFieldsView received unexpected field type string '" + type + "'.";
        }

        viewDesign = SC.View.design({
          useStaticLayout: YES,
          layout: layout,

          childViews: [SC.TextFieldView.design({
            isTextArea: isTextArea,
            index: i,
            valueDidChange: function () {
              //console.log("responseFieldsView's child textFieldView observed value");
              var index = this.get('index');
              Smartgraphs.dialogTurnController.updateResponse(index, this.get('value'));
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
    
    childViews: 'nextTurnButton'.w(),
    
    nextTurnButton: SC.ButtonView.design({
      layout: {
        width: 160,
        right: 0
      },
      titleBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.nextTurnButtonTitle'),
      isVisibleBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.nextTurnButtonShouldBeVisible'),
      isEnabledBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.nextTurnButtonShouldBeEnabled'),
      target: 'Smartgraphs.dialogTurnController',
      action: 'gotoNextTurn'
    })
  })
});
