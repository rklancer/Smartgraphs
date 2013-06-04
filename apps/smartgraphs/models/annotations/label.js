// ==========================================================================
// Project:   Smartgraphs.Label
// Copyright: ©2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/label');

/** @class

  An annotation which displays a text label next to a data point.

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.Label = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.Label.prototype */ {

  /**
    The x-value of the point being labeled.

    @property {Number}
  */
  x: SC.Record.attr(Number),

  /**
    The y-value of the point being labeled.

    @property {Number}
  */
  y: SC.Record.attr(Number),

  /**
    The text of the label being applied.

    @property {String}
  */
  text: SC.Record.attr(String),

  /**
    x-position of the lower left corner of the label, relative to the point the label is annotating.
    Note that this is measured in pixels.

    @property {Number}
  */
  xOffset: SC.Record.attr(Number, { defaultValue: 30 }),

  /**
    y-position of the lower left corner of the label, relative to the point the label is annotating.
    Note that this is measured in pixels.

    @property {Number}
  */
  yOffset: SC.Record.attr(Number, { defaultValue: 30}),

  /**
    Whether to draw an 'x' (or other marker) at the target point. Should be NO if we are pointing right at a clearly
    marked data point, for example.

    @property {Boolean}
  */
  shouldMarkTargetPoint: SC.Record.attr(Boolean, { defaultValue: YES }),

  /**
    Transient property -- was the label added to the graph by the label tool? If NO, assume it was predefined in the
    activity.
    @property {Boolean}
  */
  createdByLabelTool: NO,

  /**
    Transient property -- has the label already automatically "selected all for editing"? If so, don't do so again,
    e.g., when we regain firstResponder.

    @property {Boolean}
  */
  hasEditedFirstTime: NO,

  /**
    Transient property that indicates whether the label is editable. In the future, there may be
    authorable support for telling Smartgraphs to set this property to true during certain activity
    steps and false during others. Right now, it's true by default.

    @property {Boolean}
  */
  isEditable: YES,

  /**
    Whether to display this annotation in front of all the annotations, axes, graph title and data views.

    @property {Boolean}
  */
  isTopAnnotation: true,

  labelSet: null,

  /**
    Minimum distance of the anchor from the target point.

    @property {Number}
  */
  minDistanceFromPoint: 50,
  /**
    Maximum characters allowed.

    @property {Number}
  */
  maxCharacters: 80,

  /**
    Maximum allowed width (in pixels) of the text area.

    @property {Number}
  */
  maxTextFieldWidth: 140,

  calculatedTextWidth: 0,
  calculatedTextHeight: 0,
  /**
   * Set this variable when automatic position of the label is to be decided.
   */
  isPositionUpdateRequired: null,

  /*
   * View associated with this annotation.
   */

  view: null,

  /**
    Whether to allow label arrowhead dragging.

    @property {Boolean}
  */
  allowCoordinatesChange: NO,

  isRemovalEnabled: function () {
    if (this.get('labelSet')) {
      return this.getPath('labelSet.isRemovalEnabled');
    }
    else {
      return this._isRemovalEnabled || NO;
    }
  }.property(),

  enableRemoval: function () {
    this._isRemovalEnabled = YES;
    this.notifyPropertyChange('isRemovalEnabled');
  },

  disableRemoval: function () {
    this._isRemovalEnabled = NO;
    this.notifyPropertyChange('isRemovalEnabled');
  }

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.Label.viewClass = Smartgraphs.LabelView;
