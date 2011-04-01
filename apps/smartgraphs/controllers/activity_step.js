// ==========================================================================
// Project:   Smartgraphs.activityStepController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// Author:    Eric Kattwinkel
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.activityStepController = SC.ObjectController.create(
/** @scope Smartgraphs.activityStepController.prototype */ {

  canSubmit: NO,
  showSubmitButton: NO,
  
  /**
    YES iff there is content (a response template or before/after text) to put in the 'dialog text' area
  */
  dialogTextHasContent: function () {
    return this.get('beforeText') || this.get('responseTemplate') || this.get('afterText');
  }.property('beforeText', 'responseTemplate', 'afterText').cacheable(),
  
  /**
    Clean up any stale controller state. Called when we leave ACTIVITY_STEP_SUBMITTED and/or ACTIVITY itself
  */  
  cleanup: function () {
    if (this._liveExpression) {
      this._liveExpression.die();
    }
  },
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
    this.setupPanes();
    Smartgraphs.responseTemplateController.setTemplate(this.get('responseTemplate'));
    // enableSubmission *before* executing startCommands -- they might disable submission
    Smartgraphs.statechart.sendAction('enableSubmission');
    
    this.startTools();
    this.executeCommands(this.get('startCommands'));
    this.processSubstitutions(this.get('substitutedExpressions'));
    
    // does the step goes "straight through"?
    if (this.get('shouldFinishImmediately')) {
      Smartgraphs.statechart.sendAction('submitStep');
    }
    else {
      this.waitForResponse();
    }
  },
  
  setupPanes: function () {
    Smartgraphs.activityViewController.setPaneConfig(this.get('paneConfig'));
    
    var panes = this.get('panes');
    for (var key in panes) {
      if ( !panes.hasOwnProperty(key) ) continue;
      this.setupPane(key, panes[key]);
    }
  },
  
  setupPane: function (pane, config) {
    var name, id, 
        allAnnotations = (config.annotations || []).concat(config.highlightedAnnotations || []);
    
    this._setAnnotationHighlights(config.annotations, config.highlightedAnnotations);

    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    if (!pane) return;
    
    if (config === null) {
      Smartgraphs.activityViewController.hidePane(pane);
      return;
    }
    
    switch (config.type) {
      case 'graph':
        // temporarily and somewhat hackily creates a Graph object to be opened in the graphController.
        // no existing activities use an 'graphN' as the graph name, and no new ones are going be created, so:
        id = Smartgraphs.getNextGuid();
        name = 'graph'+id;
        Smartgraphs.store.createRecord(Smartgraphs.Graph, {
          url: id,
          activity: Smartgraphs.activityController.get('id'),
          name: name,
          title: config.title,
          xAxis: config.xAxis,
          yAxis: config.yAxis,
          initialDatasets: config.datasets,
          initialAnnotations: allAnnotations
        });
        
        Smartgraphs.activityViewController.showGraph(pane, name);
        return;
      case 'table':
        Smartgraphs.activityViewController.showTable(pane, config.dataset, allAnnotations);
        return;
      case 'image':
        Smartgraphs.activityViewController.showImage(pane, config.path, config.caption);
        return;
    }
  },
  
  _setAnnotationHighlights: function (annotationNames, highlightedAnnotationNames) {
    annotationNames = annotationNames || [];
    highlightedAnnotationNames = highlightedAnnotationNames || [];

    annotationNames.forEach( function (name) {
      var annotation = Smartgraphs.activityObjectsController.findAnnotation(name);
      if (annotation) annotation.set('isHighlighted', NO);
    });
    
    highlightedAnnotationNames.forEach( function (name) {
      var annotation = Smartgraphs.activityObjectsController.findAnnotation(name);
      if (annotation) annotation.set('isHighlighted', YES);
    });
  },
  
  startTools: function () {
    var tools = this.get('tools') || [];
    tools.forEach( function (toolSpec) {
      Smartgraphs.Tool.start(toolSpec.name, toolSpec.setup);
    });
  },

  executeCommands: function (commands) {
    if (!commands) return;

    commands.forEach(function (command) {
      Smartgraphs.executor.execute(command.name, command.args);
    });
  },
  
  processSubstitutions: function (subs) {
    var fmtArgs = [],
        self = this;
        
    if (!subs) return;
    
    // build args for call to fmt method
    subs.forEach( function (sub) {
      fmtArgs.push( Smartgraphs.activityPageController.getFromContext(sub) );
    });

    // better yet, make beforeText & afterText computed properties
    var beforeText = this.get('beforeText');
    if (beforeText) {
      this.set('beforeText', beforeText.fmt.apply(beforeText, fmtArgs));
    }

    var afterText = this.get('afterText');
    if (afterText) {
      this.set('afterText', afterText.fmt.apply(afterText, fmtArgs));
    }

  },
  
  enableSubmission: function () {
    this.set('canSubmit', YES);
  },
  
  disableSubmission: function () {
    this.set('canSubmit', NO);    
  },
  
  waitForResponse: function () {
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);
    
    var criterion = this.get('submissibilityCriterion');
    if (criterion) {
      var self = this;
      this._liveExpression = Smartgraphs.evaluator.evaluateLive(criterion, function (isSubmissible) {
        var canSubmit = self.get('canSubmit');
        if (isSubmissible && !canSubmit) {
          Smartgraphs.statechart.sendAction('enableSubmission');
        }
        else if (canSubmit && !isSubmissible) {
          Smartgraphs.statechart.sendAction('disableSubmission');
        }
      }).evaluate();
    }
  },
  
  /**
    Called when the user clicks the 'done' or 'submit' button associated with this step.
        
    Generally this happens in concert with a transition to ACTIVITY_STEP_SUBMITTED. Any 'goto (next) step' commands,
    or any branching to other steps based on the user-submitted response ('answer checking') should be done 
    here. Step transitions are only allowed during ACTIVITY_STEP_SUBMITTED.
    
    Loops in order through the responseBranches associated with this step, evaluates the 'criterion' property of each 
    in turn and jumps to the step associated with the first branch whose 'criterion' evaluates to YES.
    
    If there are no responseBranches or none have criteria that evaluate to YES, jumps to the defaultBranch, if any.
    
    Does nothing if no responseBranch criteria evaluate to YES and there is no defaultBranch. In this case, it is 
    considered an error if the 'isFinalStep' property is NO.
  */
  handleSubmission: function () {
    if ( !this.get('canSubmit') ) return NO;
    
    var branches = this.get('responseBranches'),
        branch,
        i;
    
    this.executeCommands(this.get('afterSubmissionCommands'));
  
    if (branches && branches.length > 0) {
      for (i = 0; i < branches.length; i++) {
        branch = branches[i];
        if (Smartgraphs.evaluator.evaluate(branch.criterion)) {
          Smartgraphs.statechart.sendAction('gotoStep', this, { stepId: branch.step });
          return;
        }
      }
    }
    
    var defaultBranch = this.get('defaultBranch');
    
    if (defaultBranch) {
      Smartgraphs.statechart.sendAction('gotoStep', this, { stepId: defaultBranch.get('id') });
    }
  },
  
  /**** 
  
    JSON-editing stuff.
  
  ****/

  // TODO (possibly): Also observe changes to the focused property; what we have now works as long as nothing changes
  // the model objects "behind our backs"

  currentlyEditingPropertyOwnerConfig: { label:'current activity', propertyName:'currentActivity' },
  currentlyEditingPropertyName: 'url',

  _updateEditorInputValue: function() {
    var attribute     = this.getAttribute(),
        newEditorText = attribute ? JSON.stringify(attribute, null, 2) : ""; // pretty-printed
        
    this.setIfChanged('jsonEditorInput', newEditorText);
  }.observes('currentlyEditingPropertyOwnerConfig', 'currentlyEditingPropertyName', 'content'),

  _updateAttributeAfterEditorInput: function () {
    var jsonEditorInput = this.get('jsonEditorInput'),
        newAttributeValue,
        newAttributeJson,
        oldAttributeJson;
    
    if (jsonEditorInput) {
      // validate json
      try {
        newAttributeValue = SC.json.decode(jsonEditorInput);
        this.set('jsonEditingIsInvalid', false);
      } 
      catch (e) {
        this.set('jsonEditingIsInvalid', true);
        return;
      }

      // set attribute
      newAttributeJson = SC.json.encode(newAttributeValue);
      oldAttributeJson = SC.json.encode(this.getAttribute());

      if (newAttributeJson !== oldAttributeJson) {
        this.setAttribute(newAttributeValue);
      }
    }
  }.observes('jsonEditorInput'),
  
  getAttribute: function () {
    var owner        = this.getCurrentPropertyOwner(),
        propertyName = this.get('currentlyEditingPropertyName');
        
    if (owner && propertyName && SC.kindOf(owner[propertyName], SC.RecordAttribute)) { 
      return owner.readAttribute(propertyName);
    }

    return null;
  },
  
  setAttribute: function (newAttributeValue) {
    var owner        = this.getCurrentPropertyOwner(),
        propertyName = this.get('currentlyEditingPropertyName');
        
    if (owner && propertyName && SC.kindOf(owner[propertyName], SC.RecordAttribute)) { 
      owner.writeAttribute(propertyName, newAttributeValue);
    }
  },
  
  _owners : null,

  _addToOwners: function(label, propertyName, propertyKey) {
    this._owners.push({
      'title':label, 
      config:{ 
        'label':label, 
        'propertyName':propertyName, 
        'propertyKey':propertyKey 
      }
    });
  },
  
  jsonEditorMenuItemsOwners: function() {
    var activityStep = this.get('content'),
        activityPage = this.get("activityPage"),
        activity = this.get('activityPage').get('activity'),
        axes = activity.get('axes'),
        graphs = activity.get('graphs'),
        responseTemplates = activity.get('responseTemplates'),
        units = activity.get('units'),
        annotationNames = Smartgraphs.activityObjectsController.get('annotationNames'),
        datasetNames = Smartgraphs.activityObjectsController.get('datasetNames'),
        tagNames = Smartgraphs.activityObjectsController.get('tagNames'),
        variableNames = Smartgraphs.activityObjectsController.get('variableNames'),
        ind = 0;

    this._owners = [];
    this._addToOwners('current activity', 'currentActivity', '');
    this._addToOwners('current page', 'currentPage', '');
    this._addToOwners('current step', 'currentStep', '');
    
    // axes
    for (ind = 0; ind < axes.length(); ind++) {
      var axis = axes.objectAt(ind);
      this._addToOwners(this.getLabelFromUrl('axis', axis), 'axis', ind );
    }
    
    // graphs
    for (ind = 0; ind < graphs.length(); ind++) {
      var graph = graphs.objectAt(ind);
      this._addToOwners(this.getLabelFromUrl('graph', graph), 'graph', ind );
    }
    
    // responseTemplates
    for (ind = 0; ind < responseTemplates.length(); ind++) {
      var responseTemplate = responseTemplates.objectAt(ind);
      this._addToOwners(this.getLabelFromUrl('responseTemplate', responseTemplate), 'responseTemplate', ind );
    }
    
    // units
    for (ind = 0; ind < units.length(); ind++) {
      var unit = units.objectAt(ind);
      this._addToOwners(this.getLabelFromUrl('unit', unit), 'unit', ind );
    }
    
    // annotations
    for (ind = 0; ind < annotationNames.length; ind++) {
      var annotationName = annotationNames.objectAt(ind);
      this._addToOwners('annotation "' + annotationName + '"', 'annotation', annotationName );
    }
    
    // datasets
    for (ind = 0; ind < datasetNames.length; ind++) {
      var datasetName = datasetNames.objectAt(ind);
      this._addToOwners('dataset "' + datasetName + '"', 'dataset', datasetName );
    }
    
    // tags
    for (ind = 0; ind < tagNames.length; ind++) {
      var tagName = tagNames.objectAt(ind);
      this._addToOwners('tag "' + tagName + '"', 'tag', tagName );
    }
    
    // variables
    for (ind = 0; ind < variableNames.length; ind++) {
      var variableName = variableNames.objectAt(ind);
      this._addToOwners('variable "' + variableName + '"', 'variable', variableName );
    }
    
    return this._owners;
  }.property('content').cacheable(),
  
  jsonEditorMenuItemsProperties: function() {
    var owner = this.getCurrentPropertyOwner(),
        propertyNames = [],
        propertyName;
    
    for (propertyName in owner) { 
      if (SC.kindOf(owner[propertyName], SC.RecordAttribute)) { 
        propertyNames.push( { title:propertyName} );
        //console.log("%s: %s", propertyName, owner.readAttribute(propertyName)); 
      } 
    }
    return propertyNames;
  }.property('currentlyEditingPropertyOwnerConfig').cacheable(),
  
  
  getCurrentPropertyOwner: function () {
    var config = this.get('currentlyEditingPropertyOwnerConfig');
    switch(config.propertyName) {
      case 'currentActivity':
        return this.get('activityPage').get('activity');
      case 'currentPage':
        return this.get("activityPage");
      case 'currentStep':
        return this.get('content');
      case 'axis':
        var axes = this.get('activityPage').get('activity').get('axes');
        return axes.objectAt(config.propertyKey);
      case 'graph':
        var graphs = this.get('activityPage').get('activity').get('graphs');
        return graphs.objectAt(config.propertyKey);
      case 'responseTemplate':
        var responseTemplates = this.get('activityPage').get('activity').get('responseTemplates');
        return responseTemplates.objectAt(config.propertyKey);
      case 'unit':
        var units = this.get('activityPage').get('activity').get('units');
        return units.objectAt(config.propertyKey);
      case 'annotation':
        var annotationNames = Smartgraphs.activityObjectsController.get('annotationNames');
        return Smartgraphs.activityObjectsController.findAnnotation(config.propertyKey);
      case 'dataset':
        var datasetNames = Smartgraphs.activityObjectsController.get('datasetNames');
        return Smartgraphs.activityObjectsController.findDataset(config.propertyKey);
      case 'tag':
        var tagNames = Smartgraphs.activityObjectsController.get('tagNames');
        return Smartgraphs.activityObjectsController.findTag(config.propertyKey);
      case 'variable':
        var variableNames = Smartgraphs.activityObjectsController.get('variableNames');
        return Smartgraphs.activityObjectsController.findVariable(config.propertyKey);
      default:
        return null;
    }
  },
  
  getLabelFromUrl: function(propName, property) {
    var url = property.get('url');
    return propName + ' "' + url.substring(url.lastIndexOf('/') + 1) + '"';
  },
  
  currentlyEditingPropertyOwnerLabel: function() {
    var config = this.get('currentlyEditingPropertyOwnerConfig');
    return config.label;
  }.property('currentlyEditingPropertyOwnerConfig')

}) ;
