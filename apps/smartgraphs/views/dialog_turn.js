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
  
  childViews: 'textView buttonsView'.w(),
  
  textView: SC.View.extend( {
    useStaticLayout: YES,
    
    childViews: 'beforeTextView responseFieldsView afterTextView'.w(),
    
    classNames: 'dialog-text'.w(),
  
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
    
      // hide if there is no response template; especially important because IE7 doesn't its height as 0 when empty.
      isVisibleBinding: SC.Binding.bool('Smartgraphs.responseTemplateController.content'),
          
      fieldsTypesDidChange: function () {
        //SC.Logger.log('fieldTypesDidChange');
        this.invokeOnce(this._updateChildViews);
      }.observes('fieldTypes'),
    
      fieldValuesDidChange: function () {
        //SC.Logger.log('fieldValuesDidChange');      
        this.invokeOnce(this._updateChildViews);
      }.observes('fieldValues'),
    
      _updateChildViews: function () {
        //SC.Logger.log('_updateChildViews');   
        this.removeAllChildren();
        this.contentLayoutDidChange();

        var fieldTypes = this.get('fieldTypes');
        var fieldValues = this.get('fieldValues');
        var childViews = [];
      
        if (!fieldTypes) {
          return;
        }

        var type, textFieldWrapperDesign, isTextArea, layout, hint = '';
      
        for (var i = 0, ii = fieldTypes.get('length'); i < ii; i++) {
          type = fieldTypes.objectAt(i);
        
          if (type === 'textarea') {
            isTextArea = YES;
            hint = 'Enter you answer here...';
            layout = {
              height: 97
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
 
          // note that SC.TextFieldViews don't display properly at all if they have useStaticLayout: YES
          textFieldWrapperDesign = SC.View.design({
            useStaticLayout: YES,
            layout: layout,
            classNames: 'text-field-view-wrapper'.w(),
        
            childViews: [SC.TextFieldView.design({
              isTextArea: isTextArea,
              hint: hint,
              index: i,
              oldGuid: null,
              
              // note that this seeming cruft is caused by our inability (?) to bind to a particular model object.
              // but maybe this could be refactored to bind to a model object.
              
              valueDidChange: function () {
                //SC.Logger.log("responseFieldsView's child textFieldView observed value");
                var index = this.get('index');
                Smartgraphs.dialogTurnController.updateResponse(index, this.get('value'));
              }.observes('value')
            })]
          });
          
          var view = textFieldWrapperDesign.create();
          if (i === 0) {
            this._firstTextFieldView = view.get('childViews').objectAt(0);
          }
          this.appendChild(view);
          childViews.push(view);
        }
        this.contentLayoutDidChange();
        this.invokeOnce(this._beginEditingFirstView);         
        this.set('childViews', childViews);
      },
      
      
      dialogTurnDidChange: function () {
        var guid = Smartgraphs.dialogTurnController.get('guid');
        if (guid !== this._oldGuid) {
          this.invokeOnce(this._clearValuesAndResetEditing);
        }
        this._oldGuid = guid;
      }.observes('Smartgraphs.dialogTurnController.guid'),
            
      _clearValuesAndResetEditing: function () {
        var childViews = this.get('childViews');
        
        if (childViews) { 
          childViews.forEach(function (view) {
            var textfield = view.get('childViews').objectAt(0);
            //textfield.discardEditing();
            textfield.set('value', null);
          });
          this.invokeLater(this._beginEditingFirstView);
        }
      },
        
      _beginEditingFirstView: function () {
        if (this._firstTextFieldView) {
          this._firstTextFieldView.beginEditing();
        }
      } 
    }),
  
    afterTextView: SC.StaticContentView.design({
      contentBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.afterText'),
      isVisibleBinding: SC.Binding.bool('Smartgraphs.dialogTurnController.afterText')
    })
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
