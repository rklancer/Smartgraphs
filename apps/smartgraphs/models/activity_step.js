// ==========================================================================
// Project:   Smartgraphs.ActivityStep
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  An ActivityStep record specifies what is shown, and what interactions may occur, during a given step on an
  ActivityPage. It also specifies what step, if any, should be visited in response to the interaction that occurred
  during the step. As such ActivityStep is the most complex model in the Smartgraphs codebase.
  
  Bear in mind that ActivitySteps branch. The ActivitySteps in an ActivityPage are not necessarily visited in order;
  nor are they necessarily all visited at all.
  
  Furthermore, the currently loaded ActivityStep is considered to have substates. When a step loads, the system enters
  the ACTIVITY_STEP state. ACTIVITY_STEP (or one of its substates, i.e., a state like SENSOR_RECORDING that has
  ACTIVITY_STEP in its nextResponder chain) remains the current state while the user interacts with the Smartgraph
  application. When the user is done interacting with that step -- perhaps they have chosen an answer, or entered data
  to their satisfaction -- they can click a button to "submit" the step for consideration by the system. Submission
  is performed by the submitStep action defined in the ACTIVITY_STEP.
  
  Submission is only allowed when the step is in a "submissible" state. (The "submissible" state is not an 
  SC.Responder like ACTIVITY_STEP; when Smartgraphs transitions to using the new SC.Statechart framework it will be
  possible to fix this.) The rules for enablement/disablement of submission are as follows:
  
    - if 'shouldFinishImmediately' is true, the step is automatically submitted, unless one of the startCommands turns submissibility off. This would likely be considered an error.
    - if one of the startCommands disables submission as a side effect, submissibility will remain off untilsubmission is explicitly turned on again. Turning submission back on might happen as a side effect of a tool that is turned on or by the submissibility criterion
    - if, regardless of the startCommands, the submissibility criterion evaluates to YES, submissibility is turned on
    - otherwise, submissibility is turned on
  
  Steps also specify how to inspect the system state and choose the next step to load once the step is submitted.
  
  h3. What is specified in an ActivityStep record
  
   - the configuration of the panes on the right (split or single)

   - what graph, table, or image to display in each pane, and what datasets or annotations they should show.

   - any commands to be executed when the step starts, before user interaction is allowed

   - the "student's response" form to be included in the pane on the left

   - any text (such as question prompt or hints) to be displayed before and after the response form
   
   - whether this automatically move to the submitted state when it loads (this could be used to create a step whose only purpose is to execute some commands)
   
   - an "live" submissibility criterion that is evaluated whenever its input values change, and that is used to enable submission only when its value is YES

   - a set of commands to be executed immediately after the user submits the step
  
   - a set of expressions that evaluate to YES or NO values in order to determine which step to load next
     
   - whether this is a 'terminal' step; ie., whether failure to branch away from this step should be taken to mean that we have finished the ActivityPage itself
     
   - whether the UI should or should not show a button that submits this step;
   
   - the title of that button
   
   - whether the 'Next Page' button should be enabled, and should both submit the step and move on to the next page, when this step is submissible. (This is a shortcut so that, on the last step in a page, users don't have to click Submit and then immediately click Next Page)
     
  h3. Serializing an ActivityStep
  
  When editing the serialized form of an ActivityStep, bear in mind that value of many of the properties are expected
  to be Javascript hashes. Where possible the expected content of these hashes is described.
  
  Generally, those hashes reference Activity objects by name, rather than by url (or id), but exceptions are noted
  below.
  
  Where properties of the ActivityPage are explicitly documented to be record types rather than strings, then the
  associated property must be specified in the serialized format via the url or id of the relevant object, rather than
  by name.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ActivityStep = SC.Record.extend(
/** @scope Smartgraphs.ActivityStep.prototype */ {

  /**
    The primary key of an ActivityStep record is its url. The usual format is /<username>/<activityname>/page/nnn/step/nnn
    
    @property {String}
  */
  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /** 
    The ActivityPage this ActivityStep is a part of.
    
    @property {Smartgraphs.ActivityPage}
  */
  activityPage: SC.Record.toOne('Smartgraphs.ActivityPage', { inverse: 'steps', isMaster: YES, aggregate: YES }),
  
  /**
    Whether to show a split or single pane on the right hand side of the screen. Acceptable values are "split" or 
    "single".
    
    @property {String}
  */  
  paneConfig: SC.Record.toOne(String),
  
  /**
    A hash that represents how to configure the panes being shown on the right hand side. If a split pane is showing,
    expects two keys, "top" and "bottom"; if a single pane is showing, expects the single key "single".
    
    The object at those keys specifies what is to be shown in the associated pane. The value at key "type" specifies
    whether a graph, table, or image is shown. The other keys in the object specify configuration, as shown below:
    
    {{{
      {
        "top": {
          "type": "graph",
          "name": "sensor-playing"
        },
        "bottom": {
          "type": "table",
          "graphName": "sensor-playing",
          "datasetName": "sensor-play"
        }
      }
    }}}
    
    or 
    
    
    {{{
      {
        "single": { 
          "type": "image", 
          "path": sc_static("resources/arrow.jpg")
      }
    }}}   
    
    @property {Object}
  */
  panes: SC.Record.attr(Object),
  
  /**
    HTML-formatted text to display above the response template. Text here should be wrapped within html elements such
    as &lt;h1&gt; or &lt;p&gt; in order to be correctly styled.
    
    @property {String}
  */
  beforeText: SC.Record.attr(String),                                           
  
  /**
    The responseTemplate. If null, none is shown. If set to a ResponseTemplate, it displays an 'input form' between
    the beforeText and the afterText.
     
    @property {Smartgraphs.ResponseTemplate}
  */
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate'),
  
  /**
    Text to display below the response template. Text here should be wrapped within html elements such as &lt;h1&gt; 
    or &lt;p&gt; in order to be correctly styled.
    
    @property {String}    
  */
  afterText: SC.Record.attr(String),
  
  /**
    Expressions used in text substitutions with beforeText and afterText.
    
    @property {Array}
  */
  substitutedExpressions: SC.Record.attr(Array),
  
  /** 
    Tool(s) to start when the step opens.
  */
  tools: SC.Record.attr(Array, { defaultValue: [] }),
  
  /** 
    A list of commands (and their arguments) to be run when this ActivityStep is loaded. Each item in the list should
    be an object with an 'action' property and a 'literalArgs' property. The arguments in the literalArgs will be 
    passed to the action. The actions available here are specified in the ACTIVITY_STEP, ACTIVITY, and READY states.
   
    {{{
      [
        {
          "action": "startFreehandInput",
          "literalArgs": {
             "graphName": "prediction-away",
             "annotationName": "prediction-away"
          }
        }
      ]
     }}}
   
     @property {Array}
  */
  startCommands: SC.Record.attr(Array),
  
  /**
    If YES, the activity step will automatically be submitted immediately after the startCommands execute. Otherwise,
    the user must explicitly click the submit button, or submission must occur as a side effect of a command that
    executes during the step.
    
    This is useful for pages that contain a single step that non-interactively displays information. By automatically
    finishing the step, the "Next Page" becomes enabled, and the user can advance to the next page at will.
    
    @property {Boolean}
  */
  shouldFinishImmediately: SC.Record.attr(Boolean),
  

  /** 
    An expression that is evaluated "live" and turns on submissiblity when its value is YES
    
    @property {Object}
  */
  submissibilityCriterion: SC.Record.attr(Object),
  
  /**
    The list of commands (and their arguments) to be immediately after this ActivityStep is submitted, before the
    response expressions are evaluated and before branching to another step.
    
    The format of this list is the same as for the startCommands <i>(q.v.)</i>. However, these commands execute while 
    the system is in the ACTIVITY_STEP_SUBMITTED state. Therefore only the commands defined in ACTIVITY_STEP_SUBMITTED
    and its nextResponders (ACTIVITY, READY) are available in this context.
    
    @property {Array}
  */
  afterSubmissionCommands: SC.Record.attr(Array),
  
  /**
    An ordered list of criterion -> ActivityStep pairs that is used to choose the next ActivityStep to load after
    the student has submitted the step.
    
    After response is submitted, each criterion is evaluated in order. The system jumps to the ActivityStep associated 
    with the first criterion that evaluates to YES. Think of an if-else chain.
    
    If no expression evaluates to YES, the ActivityStep specified by the <code>defaultBranch</code> property is
    jumped to, if one is specified.

    @property {Object[]}
  */
  responseBranches: SC.Record.attr(Array),
  
  /**
    The ActivityStep that will be loaded after the step is submitted, if no responseBranch is chosen.

    @property {Smartgraphs.ActivityStep}
  */
  defaultBranch: SC.Record.toOne('Smartgraphs.ActivityStep'),
  
  /** 
    If this value is YES, this step is a 'terminal step', indicating that, if this step completes without branching
    to a new ActivityStep, then the user has finished the ActivityPage.
    
    If, after the step is submitted, the system has not jumped to new step and isFinalStep === NO for the current,
    there was an error in the activity definition.
    
    @property {Boolean}
  */
  isFinalStep: SC.Record.attr(Boolean),
  
  /**
    If YES, the submit button should be hidden.
    Might be YES for steps that submit automatically when the student's responses acquires certain characteristics
    
    @property {Boolean}
  */
  hideSubmitButton: SC.Record.attr(Boolean),

  /**
    The title of the submit button, if it is displayed. 
    
    The button will be enabled or not according to whether step submission is currently enabled.
    
    @property {String}
  */
  submitButtonTitle: SC.Record.attr(String),
  
  /**
    Whether the 'Next Page' button should do double duty and also submit the step. Only valid if this is a terminal
    step on the page.
    
    If NO, the Next Page button will not be enabled until the user submits the step and no new step is branched to. If
    YES, the submit button will be hidden, and the 'Next Page' button will be enabled or not according to whether step
    submission is enabled.
    
    @property {Boolean}
  */
  nextButtonShouldSubmit: SC.Record.attr(Boolean),
  
  
  // make 'current config' belong to the step controller
  // make 'attribute as string' and 'editing is invalid' transient properties

  /**
    JSON representation of the panes property. 
    
    @property {String}
  */
  jsonEditorInput: null,

  /**
    Flag indicating whether the JSON editor contains invalid JSON.
    
    @property {Boolean}
  */
  jsonEditingIsInvalid: null,

  /**
    Not currently implemented. 
    
    If we are the last step, whether to automatically skip to the next page when this step finishes. Different from
    nextButtonShouldSubmit because (nominally) it leaves the submit button visible and the next button hidden; unsure
    if we want to implement both this and nextButtonShouldSubmit
  */
  // shouldAutoAdvancePage: SC.Record.attr(Boolean)

}) ;
