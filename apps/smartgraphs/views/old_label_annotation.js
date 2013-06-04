// ==========================================================================
// Project:   Smartgraphs.LabelAnnotationView
// Copyright: ©2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Displaying text labels for DataPoints on the graph.

  @extends RaphaelViews.RaphaelView
*/
Smartgraphs.OldLabelAnnotationView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LabelAnnotationView.prototype */ {

  /**
    SproutCore will call render(context, firstTime == NO) if these properties change
  */
  displayProperties: 'item.label stroke size item.xOffset item.yOffset isHighlighted strokeWidth'.w(),

  canShowInTable: NO, // TODO: Maybe eventually yes?

  /* Properties and methods controlling display */

  selectedColor: '#aa0000',
  notSelectedColorBinding: '.item.color',
  isHighlightedBinding: '.item.isHighlighted',
  highlightedStrokeWidth: 2,
  notHighlightedStrokeWidth: 1,
  isSelected: NO,

  ox: null,
  oy: null,

  strokeWidth: function () {
    return (this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('notHighlightedStrokeWidth'));
  }.property('isHighlighted', 'highlightedStrokeWidth', 'notHighlightedStrokeWidth').cacheable(),

  stroke: function() {
    return (this.get('isSelected') ? this.get('selectedColor') : this.get('notSelectedColor'));
  }.property('isSelected', 'selectedColor', 'notSelectedColor').cacheable(),

  /* Properties and methods for inline editing */

  exampleInlineTextFieldView: SC.InlineTextFieldView,
  isInlineEditorMultiline: NO,
  isEditable: YES,
  isEditing: NO,
  editorWidth: 80,

  /**
    Event dispatcher callback.
    If isEditable is set to true, opens the inline text editor view.

    @param {DOMMouseEvent} evt DOM event

  */
  doubleClick: function( evt ) { return this.beginEditing(); },

  /**
    Opens the inline text editor (closing it if it was already open for
    another view).

    @return {Boolean} YES if did begin editing
  */
  beginEditing: function() {
    if (this.get('isEditing')) return YES ;
    if (!this.get('isEditable')) return NO ;

    var el = this.$(),
        f = SC.viewportOffset(el[0]) ;
    var labelCoords = this.graphCoordinates(); // within the SVG
    var activityWidth = Smartgraphs.mainPage.mainPane.container.get('bottomRightThickness');
    var graphLeftEdge = activityWidth * Smartgraphs.mainPage.mainPane.container.bottomRightView.childViews[0].instructionsWrapper.get('layout').width;
    // This "frame" positions the InlineTextFieldView
    f.width= 80; // Magic number, but more effective than the clever way
    f.height= this.get('item').get('size') + 8;
    f.x = labelCoords.x - (f.width/2) +
          Smartgraphs.mainPage.mainPane.container.dividerView.get('layout').left +
          graphLeftEdge;
    f.y = labelCoords.y - (f.height/2) + 32; // Default height of a SC.ToolbarView

    SC.InlineTextFieldView.beginEditing({
      frame: f,
      delegate: this,
      exampleElement: el,
      value: this.get('item').get('label'),
      multiline: this.get('isInlineEditorMultiline'),
      isCollection: NO,
      validator: this.get('validator'),
      exampleInlineTextFieldView: this.get('exampleInlineTextFieldView')
    });
  },

  /**
    Cancels the current inline editor and then exits editor.

    @return {Boolean} NO if the editor could not exit.
  */
  discardEditing: function() {
    if (!this.get('isEditing')) return YES ;
    return SC.InlineTextFieldView.discardEditing() ;
  },

  /**
    Commits current inline editor and then exits editor.

    @return {Boolean} NO if the editor could not exit
  */
  commitEditing: function() {
    if (!this.get('isEditing')) return YES ;
    return SC.InlineTextFieldView.commitEditing() ;
    // This doesn't seem to get called
  },

  /** @private
    Set editing to true so edits will no longer be allowed.
  */
  inlineEditorWillBeginEditing: function(inlineEditor) {
    this.set('isEditing', YES);
  },

  /** @private
    Hide the label view while the inline editor covers it.
  */
  inlineEditorDidBeginEditing: function(inlineEditor) {
    var layer = this.$();
    this._oldOpacity = layer.css('opacity') ;
    layer.css('opacity', 0.0);
  },

  /** @private
    Delegate method defaults to the isEditable property
  */
  inlineEditorShouldBeginEditing: function(){
    return this.get('isEditable');
  },

  /** @private
    Could check with a validator someday...
  */
  inlineEditorShouldEndEditing: function(inlineEditor, finalValue) {
    return YES ;
  },

  /** @private
    Update the field value and make it visible again.
  */
  inlineEditorDidEndEditing: function(inlineEditor, finalValue) {
    this.get('item').setIfChanged('label', finalValue) ;
    this.$().css('opacity', this._oldOpacity);
    this._oldOpacity = null ;
    this.set('isEditing', NO) ;
  },

  /* False-trail methods for drag-and-drop positioning */

  // mouseEntered: function () {
  // },
  //
  // mouseExited: function () {
  // },
  //

  // Raphael offers a drag and drop functionality, using a drag(start,
  // move, end) method (see http://raphaeljs.com/reference.html#drag-n-drop
  // ). The start, move, and end parameters are themselves functions - event
  // handlers - which Raphael expects the developer to make available;
  // the idea is that the start method is an opportunity to preserve starting
  // state (i.e. remember the start position), move is a method which accepts
  // dy and dx as movement vectors, and end does cleanup from the move.
  //
  // In the case of the LabelAnnotations, which now have xOffset and
  // yOffset parameters to describe where they appear in the SVG space,
  // essentially start would preserve the starting xOffset and yOffset from
  // the SproutCore object (or perhaps the starting cx and cy from the
  // view's positioning), move would modify the cx/cy, and end would figure
  // the cumulative dx/dy of the move, using the values saved in start, and
  // write that new value back to the SproutCore object.
  //
  // The thing I *haven't* figured out yet is the scoping, i.e. where to
  // define those event handlers to make them available to Raphael while
  // also knowing enough about both the SproutCore object and the Raphael
  // object to do their jobs.

  // The following three methods were a pass at providing the relevant event
  // handlers; this might not be the place for them, nor do I claim that they
  // do all the jobs those event handlers are expected to do.

  // startDrag: function (labelObject) {
  //   // I have a hunch we're not going to get that labelObject argument
  //   this.set('ox', labelObject.attr("cx"));
  //   this.set('oy', labelObject.attr("cy"));
  // },
  //
  // moveDrag: function (dx, dy) {
  //   // move will be called with dx and dy
  //   this.attr({cx: this.ox + dx, cy: this.oy + dy});
  // },
  //
  // upDrag: function () {
  //     // restoring state
  // },
  //
  // mouseDown: function(eventID) {
  //   this.toggleSelection();
  //
  //   // get the Raphael path object from the context
  //   // Need the context...
  //   var labelObject = context.raphael();
  //
  //   labelObject.drag(this.moveDrag, this.startDrag(labelObject), this.upDrag);
  //   // 'tee' the event, but don't consider the mouseDown handled; let the parent collection view
  //   // also handle it
  //   return NO;
  // },

  toggleSelection: function () {
    if (this.get('isSelected')) {
      this.set('isSelected', NO);
    }
    else {
      this.set('isSelected', YES);
    }
  },

  /* Methods for actual rendering of the view */

  graphCoordinates: function () {
    var graphView = this.get('graphView');
    var point = this.getPath('item.point');
    var xOffset = this.getPath('item.xOffset');
    var yOffset = this.getPath('item.yOffset');
    var labelCoords = graphView.coordinatesForPoint(point.get('x'), point.get('y'));

    if (xOffset) {
      labelCoords.x += xOffset;
    }

    if (yOffset) {
      labelCoords.y += yOffset;
    }

    return labelCoords;
  },

  /**
    We are using renderCallback in views to call non-SC render methods like
    RaphaelCanvas.segmentPath with the correct attributes.
    This is done this way because Raphael methods shouldn't be called unless
    its tags are already in the DOM.
  */
  renderCallback: function(raphaelCanvas, attrs) {
    var label = raphaelCanvas.text().attr(attrs);
    return label;
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {
    var label = this.getPath('item.label');
    var size = this.getPath('item.size');

    var labelCoords = this.graphCoordinates();

    var attrs = {
      text: label,
      x: labelCoords.x,
      y: labelCoords.y,
      'font-size': size,
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth')
    };

    // boolean firstTime: Does this view start from scratch and create HTML in a context object or does it just need
    // to update properties of a context object?

    if (firstTime) {
       // Queue up the callback with will create the Raphael path object on the SVG canvas, once it is created.
       // In non-Raphael views, context is not a SC object but SC expects it (it was created by SC.Pane.append() ) This
       // call creates a tag and CSS and stores it in the context. for rendering later (by by SC.Pane.append() using
       // innerHTML()
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      // get the Raphael path object from the context
      var labelObject = context.raphael();
      // and update it
      labelObject.attr(attrs);
    }
  }

});
