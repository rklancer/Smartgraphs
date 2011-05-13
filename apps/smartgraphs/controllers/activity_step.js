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
  jsonEditorCurrentConfig: { objectType: 'activity', attribute: 'title' },
  
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
    var allAnnotations = (config.annotations || []).concat(config.highlightedAnnotations || []);
    
    this._setAnnotationHighlights(config.annotations, config.highlightedAnnotations);

    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    if (!pane) return;
    
    if (config === null) {
      Smartgraphs.activityViewController.hidePane(pane);
      return;
    }
    
    switch (config.type) {
      case 'graph':
        Smartgraphs.activityViewController.showGraph(pane, {
          title: config.title,
          xAxis: config.xAxis,
          yAxis: config.yAxis,
          data: config.data,
          annotations: allAnnotations
        });
        return;
      case 'table':
        Smartgraphs.activityViewController.showTable(pane, {
          data: config.data, 
          annotations: allAnnotations
        });
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

  _updateEditorInputValue: function() {
    var config        = this.get('jsonEditorCurrentConfig'),
        attribute     = this.getAttribute(config),
        newEditorText = attribute ? JSON.stringify(attribute, null, 2) : ""; // pretty-printed
        
    this.setIfChanged('jsonEditorInput', newEditorText);
  }.observes('jsonEditorCurrentConfig', 'content'),


  _updateAttributeAfterEditorInput: function () {
    var jsonEditorInput = this.get('jsonEditorInput'),
        config          = this.get('jsonEditorCurrentConfig'),
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
      oldAttributeJson = SC.json.encode(this.getAttribute(config));

      if (newAttributeJson !== oldAttributeJson) {
        this.setAttribute(config, newAttributeValue);
      }
    }
  }.observes('jsonEditorInput'),
  
  
  getAttributeOwner: function (jsonEditorConfig) {
    switch(jsonEditorConfig.objectType) {
      case 'step':
        return this.get('content');
      case 'page':
        return this.get("activityPage");
      case 'activity':
        return this.get('activityPage').get('activity');
      default:
        return null;
    }
  },
  
  
  getAttribute: function (jsonEditorConfig) {
    var owner = this.getAttributeOwner(jsonEditorConfig);
    if (!owner) return "";
    
    if (jsonEditorConfig.serialize) {
        var obj = owner.get(jsonEditorConfig.attribute);
        var serialized =  obj.map( function (o) { return o.serialize(); } );
        return serialized;
    }
    else {
      return owner.readAttribute(jsonEditorConfig.attribute);
    }
  },
  
  
  setAttribute: function (jsonEditorConfig, jsonObj) {
    var owner = this.getAttributeOwner(jsonEditorConfig);
    if (!owner) return;

    if (jsonEditorConfig.serialize) {
      // TODO: deserialize the json into something that can be passed to owner.set()
    }
    else {
      owner.writeAttribute(jsonEditorConfig.attribute, jsonObj);
    }
  }

}) ;
