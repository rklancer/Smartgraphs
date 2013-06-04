// ==========================================================================
// Project:   Smartgraphs.LabelView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

sc_require('views/editable_label');

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.LabelView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LabelView.prototype */ {

  // The 'item', 'graphView', and 'controller' will be set for us (overwriting the below) if we are added directly
  // to the graphView. If we are the exampleView of a LabelSet collection view, on the other hand, we need to find the
  // properties as shown below. Note that these values, once set, should be cached.
  item: function () {
    return this.get('content');
  }.property().cacheable(),

  graphView: function () {
    return this.getPath('parentView.graphView');
  }.property().cacheable(),

  controller: function () {
    return this.getPath('parentView.controller');
  }.property().cacheable(),

  textBinding:       '*item.text',
  textColor:         '#333333',
  stroke:            '#000000',
  highlightedStroke: '#6699ff',
  fill:              '#ffffff',

  shouldMarkTargetPointBinding: '*item.shouldMarkTargetPoint',
  shouldMarkTargetPointBindingDefault: SC.Binding.oneWay(),

  isBodyDragging: NO,
  isArrowDragging: NO,

  isHighlighted: function () {
    return this.get('isBodyDragging') || this.get('isArrowDragging');
  }.property('isBodyDragging', 'isArrowDragging'),

  markerStyle: 'arrow', // 'arrow', 'x', or 'none'
  markerSize:  10,

  xBinding:       '*item.x',
  yBinding:       '*item.y',

  xOffsetBinding: '*item.xOffset',
  yOffsetBinding: '*item.yOffset',

  minDistanceFromPointBinding: '*item.minDistanceFromPoint',

  isPositionUpdateRequiredBinding: '*item.isPositionUpdateRequired',
  allowCoordinatesChangeBinding: '*item.allowCoordinatesChange',

  isRemovalEnabledBinding: '*item.isRemovalEnabled',
  isEditableBinding: '*item.isEditable',

  calculatedTextWidthBinding: '*item.calculatedTextWidth',
  calculatedTextHeightBinding: '*item.calculatedTextHeight',

  maxTextFieldWidthBinding: '*item.maxTextFieldWidth',
  maxCharactersBinding: '*item.maxCharacters',

  moveToTopPending:         NO,   // Set this property to move label to top in the labelSet. Label is moved to top on mouse-up

  // graphScale isn't a real property, just a token we use to invalidate (xCoord, yCoord)
  xCoord: function () {
    return this.get('graphView').coordinatesForPoint(this.get('x'), 0).x;
  }.property('x', 'graphScale'),

  yCoord: function () {
    return this.get('graphView').coordinatesForPoint(0, this.get('y')).y;
  }.property('y', 'graphScale'),

  defaultWidth: 100,
  defaultHeight: 45,

  labelBodyWidthBinding:  '.labelBodyView.width',
  labelBodyHeightBinding: '.labelBodyView.height',
  cornerRadius: 4,

  bodyXCoord: null,
  bodyYCoord: null,

  anchorXCoord: null,
  anchorYCoord: null,

  // Possible directions for fetching new positions based on label positions
  LEFT: 1,                   // 1
  RIGHT: 2,                  // 10
  TOP: 4,                    // 100
  TOP_LEFT: 5,               // 101
  TOP_RIGHT: 6,              // 110
  BOTTOM: 8,                 // 1000
  BOTTOM_LEFT: 9,            // 1001
  BOTTOM_RIGHT: 10,          // 1010

  priorityPositionList: [2, 8, 10, 9, 6, 1, 4, 5],

  labelTextView: SC.outlet('labelBodyView.labelTextView'),

  isEditingBinding: '.labelTextView.isEditing',

  didRemoveFromGraphView: function () {
    this.get('labelTextView').didRemoveFromGraphView();
  },

  coordsDidChange: function () {
    var xCoord  = this.get('xCoord'),
        yCoord  = this.get('yCoord'),
        xOffset = this.get('xOffset'),
        yOffset = this.get('yOffset'),
        height  = this.get('labelBodyHeight'),
        width   = this.get('labelBodyWidth');

    // If width is 100 and height is 30 then it is still not the right time to proceed.
    // For now taking this values to determine whether label is rendered with the text or not,
    // we need to add proper condition over here.
    if ((width && width === 100) && (height && height === 30)) {
      return;
    }

    var bodyXCoord = xCoord + xOffset;
    var bodyYCoord = yCoord + yOffset - height;

    this.set('bodyXCoord', bodyXCoord);
    this.set('bodyYCoord', bodyYCoord);

    var point = { x: xCoord, y: yCoord },
        centreOfLabel = { x: bodyXCoord + width / 2, y: bodyYCoord + height / 2 };
    var newAnchorPosition = this.getAnchorPosition(point, centreOfLabel);
    var anchorPos = this.getAnchorCoords(newAnchorPosition, centreOfLabel, width, height);
    this.set('anchorXCoord', anchorPos.x);
    this.set('anchorYCoord', anchorPos.y);

    var graphView = this.get('graphView');

    if (graphView) {
      var originalX = this.get('bodyXCoord');
      var originalY = this.get('bodyYCoord');
      var item = this.get('item');
      var arrLabelsLayout = graphView.get('arrLabelsLayout');
      var obj = this.checkLabelInArray(item);
      if (!obj) {
        obj = {};
        arrLabelsLayout.push(obj);
      }
      obj.item = item;
      obj.right = originalX + width;
      obj.bottom = originalY + height;
      obj.left = originalX;
      obj.top = originalY;
      obj.width = width;
      obj.height = height;

      if (!(xCoord && isNaN(xCoord) && yCoord && isNaN(yCoord) && xOffset && isNaN(xOffset) && yOffset && isNaN(yOffset))) {
        if (this.get('isPositionUpdateRequired') === null || this.get('isPositionUpdateRequired') === undefined) {
          this.set('isPositionUpdateRequired', YES);
        }
      }
    }
  }.observes('xCoord', 'yCoord', 'xOffset', 'yOffset', 'labelBodyWidth', 'labelBodyHeight'),

  // Get anchor coordinates based on the side of label where line has to be attached.
  getAnchorCoords: function (anchorPosition, centreOfLabel, width, height) {
    var anchorPos = {};
    switch (anchorPosition) {
    case 'left':
      anchorPos.x = centreOfLabel.x - width / 2;
      anchorPos.y = centreOfLabel.y;
      break;
    case 'right':
      anchorPos.x = centreOfLabel.x + width / 2;
      anchorPos.y = centreOfLabel.y;
      break;
    case 'top':
      anchorPos.x = centreOfLabel.x;
      anchorPos.y = centreOfLabel.y - height / 2;
      break;
    case 'bottom':
      anchorPos.x = centreOfLabel.x;
      anchorPos.y = centreOfLabel.y + height / 2;
      break;
    }
    return anchorPos;
  },

  getAnchorPosition: function (point, centreOfLabel) {
    var height  = this.get('labelBodyHeight'),
        width   = this.get('labelBodyWidth'),
        anchorX = 0, anchorY = 0;

    var slope = (point.y - centreOfLabel.y) / (point.x - centreOfLabel.x);

    var height_Bound = slope * width / 2;
    var width_Bound = (height / 2) / slope;
    if ((- height / 2) <= height_Bound && height_Bound <= (height / 2)) {
      if (point.x > centreOfLabel.x) {
        return "right";
      }
      if (point.x < centreOfLabel.x) {
        return "left";
      }
    }

    if ((- width / 2) <= width_Bound && width_Bound <= (width / 2)) {
      if (point.y < centreOfLabel.y) {
        return "top";
      }
      if (point.y > centreOfLabel.y) {
        return "bottom";
      }
    }
    console.error("Cannot find label anchor position");
    // Returning a default value
    return "bottom";
  },

  // Do all the position calculation in here.
  updateLabelPosition: function () {
    var isPositionUpdateRequired = this.get('isPositionUpdateRequired');

    if (isPositionUpdateRequired) {
      this.beginPropertyChanges();

      // Update position based on constraints
      this.updatePosition();

      this.endPropertyChanges();

      this.set('isPositionUpdateRequired', NO);
    }
  }.observes('isPositionUpdateRequired'),

  // Check overlapping with other labels
  updatePosition: function () {
    this.beginPropertyChanges();
    var graphView = this.get('graphView');

    if (graphView) {
      var xCoord  = this.get('xCoord');
      var yCoord  = this.get('yCoord');
      var item = this.get('item');
      var arrLabelsLayout = graphView.get('arrLabelsLayout');
      var obj = this.checkLabelInArray(item);
      arrLabelsLayout = this.fetchSortedOtherPositions(arrLabelsLayout, xCoord, yCoord);
      var newPositionedObj = this.checkConstraintsAndGiveNewPosition(arrLabelsLayout, obj);
      if (newPositionedObj) {
        this.set('xOffset', newPositionedObj.left - xCoord);
        this.set('yOffset', newPositionedObj.bottom - yCoord);
      }
    }
    this.endPropertyChanges();
  },

  // Sort the array based on the distance of the point.
  fetchSortedOtherPositions: function (arrLabelsLayout, xCoord, yCoord) {
    var item = this.get('item');
    var arrSortedLayout = [];
    var distObj = {};
    for (var i = 0; i < arrLabelsLayout.length; i++) {
      var position = arrLabelsLayout[i];
      if (item === position.item) {
        continue;
      }
      var dx = xCoord - (position.left + position.width / 2);
      var dy = yCoord - (position.top + position.height / 2);
      var distance = Math.sqrt(dx * dx + dy * dy);
      distObj[position] = distance;
      
      for (var j = 0; j < arrSortedLayout.length; j++) {
        if (distObj[arrSortedLayout] > distance) {
          arrSortedLayout = arrSortedLayout.splice(j, 0, position);
          break;
        }
      }
      if (j === arrSortedLayout.length) {
        arrSortedLayout.push(position);
      }
    }
    return arrSortedLayout;
  },

  checkConstraintsAndGiveNewPosition: function (arrLabelsLayout, objPos) {
    var i, j;
    var priorityPositionList = this.get('priorityPositionList');
    // Taking a copy of the position after pulling it in graph bounds.
    this.getLabelBodyWithinGraphBounds(objPos);
    var originalPos = jQuery.extend({}, objPos);

    this.checkConnectingLineLength(objPos);
    this.getLabelBodyWithinGraphBounds(objPos);
    if (!this.checkOverlapWithOtherLabels(arrLabelsLayout, objPos) && this.giveScore(arrLabelsLayout, objPos) === 0) {
      return objPos;
    }
    var labelPosRelative = originalPos;
    // Loop around all labels to fetch nearby vacant positions
    for (i = -1; i < arrLabelsLayout.length; i++) {
      // Start with the default position of the label
      if (i > -1) {
        labelPosRelative = arrLabelsLayout[i];
      }
      for (j = 0; j < priorityPositionList.length; j++) {
        objPos = this.getNewPostionLayout(labelPosRelative, objPos, priorityPositionList[j]);
        this.checkConnectingLineLength(objPos);
        this.getLabelBodyWithinGraphBounds(objPos);
        if (!this.checkOverlapWithOtherLabels(arrLabelsLayout, objPos) && this.giveScore(arrLabelsLayout, objPos) === 0) {
          return objPos;
        }
      }
    }

    // If still score is greater then zero than no vacant position was detected, start again to find a position w/o checking certain criterias
    var score = this.giveScore(arrLabelsLayout, originalPos, true);
    var goodPos = jQuery.extend({}, originalPos);
    if (score > 0) {
      objPos = jQuery.extend({}, originalPos);
      this.getLabelBodyWithinGraphBounds(objPos);
      // If no overlap then return directly
      if (!this.checkOverlapWithOtherLabels(arrLabelsLayout, objPos)) {
        return objPos;
      }

      // Threshold is based on allowing some criterias. 14 => Allow small length of line, allow axis overlap and allow 1/4th area overlap.
      var threshold = 6;
      var nDirectionChange = 0;
      var prevScore = score;
      var step = 3;
      var dx = step;
      var dy = step;
      while (score > threshold) {
        var bExitLoop = false;
        // If score is getting worse then change direction
        if (score > prevScore) {
          nDirectionChange++;
          objPos = jQuery.extend({}, goodPos);
          switch (nDirectionChange) {
          case 1:
            dx = -step;
            dy = step;
            break;
          case 2:
            dx = -step;
            dy = -step;
            break;
          case 3:
            dx = step;
            dy = -step;
            break;
          case 4:
            dx = 0;
            dy = step;
            break;
          case 5:
            dx = 0;
            dy = -step;
            break;
          case 6:
            dx = step;
            dy = 0;
            break;
          case 7:
            dx = 0;
            dy = -step;
            break;
          default:
            // More step logics can be added here if required.
            bExitLoop = true;
          }
        }

        // Didn't get good position, continue with the one in hand.
        if (bExitLoop) {
          break;
        }
        // Update the new position to check
        objPos.left += dx;
        objPos.right += dx;
        objPos.top += dy;
        objPos.bottom += dy;
        score = this.giveScore(arrLabelsLayout, objPos, true);
        // Store new position which has better score.
        if (prevScore > score) {
          goodPos = jQuery.extend({}, objPos);
          prevScore = score;
        }
      }
    }
    return goodPos;
  },

  // Giving score based on the priority of the criterias, bDetailed is used to give score based on amount of overlap.
  giveScore: function (arrLabelsLayout, position, bDetailed) {
    var score = 0;
    var minDistance = this.get('minDistanceFromPoint');

    if (!this.isLabelWithinGraph(position)) {
      score += 64;
    }
    if (bDetailed) {
      var overlapArea = this.getOverlapArea(arrLabelsLayout, position);
      var labelArea = position.width * position.height;
      if (overlapArea > labelArea * 3 / 4) {
        score += 32;
      }
      else if (overlapArea > labelArea / 2) {
        score += 16;
      }
      else if (overlapArea > labelArea / 4) {
        score += 8;
      }
      else if (overlapArea > 0) {
        score += 4;
      }
    }
    else {
      if (this.checkOverlapWithOtherLabels(arrLabelsLayout, position)) {
        score += 4;
      }
    }
    if (Math.round(this.getConnectingLineLength(position)) < minDistance) {
      score += 2;
    }
    return score;
  },

  checkOverlapWithOtherLabels: function (arrLabelsLayout, newPos) {
    for (var i = 0; i < arrLabelsLayout.length; i++) {
      if (this.checkOverlap(arrLabelsLayout[i], newPos)) {
        return true;
      }
    }
    return false;
  },

  getOverlapArea: function (arrLabelsLayout, newPos) {
    var area = 0;
    for (var i = 0; i < arrLabelsLayout.length; i++) {
      area += this.intersectRect(arrLabelsLayout[i], newPos);
    }
    return area;
  },

  // Check connecting line's length
  checkConnectingLineLength: function (rect) {
    var xCoord  = this.get('xCoord'),
        yCoord  = this.get('yCoord'),
        xOffset = rect.left - xCoord,
        yOffset = rect.bottom - yCoord,
        centreOfLabel = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    var newAnchorPosition = this.getAnchorPosition({ x: xCoord, y: yCoord }, centreOfLabel);
    var anchorPos = this.getAnchorCoords(newAnchorPosition, centreOfLabel, rect.width, rect.height);
    var connectorDistanceX = anchorPos.x - xCoord,
        connectorDistanceY = anchorPos.y - yCoord;

    var xDiff = anchorPos.x - xOffset;
    var yDiff = anchorPos.y - yOffset;
    // Calculating length of line
    var length = Math.sqrt(connectorDistanceX * connectorDistanceX + connectorDistanceY * connectorDistanceY);
    var minDistance = this.get('minDistanceFromPoint');
    if (length < minDistance) {
      var multiplyFactor = minDistance / length;
      var newXOffset  = (multiplyFactor *  connectorDistanceX) + xCoord - xDiff;
      var newYOffset = (connectorDistanceY * multiplyFactor) + yCoord - yDiff;

      rect.left = newXOffset + xCoord;
      rect.right = rect.left + rect.width;
      rect.bottom = newYOffset + yCoord;
      rect.top = rect.bottom - rect.height;
    }
  },

  getConnectingLineLength: function (rect) {
    var xCoord  = this.get('xCoord'),
        yCoord  = this.get('yCoord'),
        xOffset = rect.left - xCoord,
        yOffset = rect.bottom - yCoord,
        centreOfLabel = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    var newAnchorPosition = this.getAnchorPosition({ x: xCoord, y: yCoord }, centreOfLabel);
    var anchorPos = this.getAnchorCoords(newAnchorPosition, centreOfLabel, rect.width, rect.height),
        connectorDistanceX = anchorPos.x - xCoord,
        connectorDistanceY = anchorPos.y - yCoord;

    // Calculating length of line
    return Math.sqrt(connectorDistanceX * connectorDistanceX + connectorDistanceY * connectorDistanceY);
  },

  getLabelBodyWithinGraphBounds: function (rect) {
    var graphView = this.get('graphView');
    var xAxis = graphView.get('xAxis');
    var yAxis = graphView.get('yAxis');

    var topLeft = graphView.coordinatesForPoint(xAxis.get('min'), yAxis.get('max'));
    var bottomRight = graphView.coordinatesForPoint(xAxis.get('max'), yAxis.get('min'));

    var bounds = {};
    bounds.left = topLeft.x;
    bounds.right = bottomRight.x;
    bounds.top = topLeft.y;
    bounds.bottom = bottomRight.y;

    if (rect.left < bounds.left) {
      rect.left = bounds.left;
      rect.right = rect.left + rect.width;
    }
    else if (rect.right > bounds.right) {
      rect.right = bounds.right;
      rect.left = rect.right - rect.width;
    }

    if (rect.top < bounds.top) {
      rect.top = bounds.top;
      rect.bottom = rect.top + rect.height;
    }
    else if (rect.bottom > bounds.bottom) {
      rect.bottom = bounds.bottom;
      rect.top = rect.bottom - rect.height;
    }
  },
  // Checks and limits the label within bounds while in edit mode. 
  limitWithinBounds: function () {
    var left = this.get('bodyXCoord'),
        top = this.get('bodyYCoord'),
        width = this.get('labelBodyWidth'),
        height = this.get('labelBodyHeight'),
        objPos = { left: left, right: left + width, top: top, bottom: top + height, width: width, height: height };
    if (left && top && width && height) {
      if (!this.isLabelWithinGraph(objPos)) {
        this.getLabelBodyWithinGraphBounds(objPos);
        this.beginPropertyChanges();
        this.set('xOffset', objPos.left - this.get('xCoord'));
        this.set('yOffset', objPos.bottom - this.get('yCoord'));
        this.endPropertyChanges();
      }
    }
  }.observes('labelBodyWidth', 'labelBodyHeight'),

  isLabelWithinGraph: function (rect) {
    var graphView = this.get('graphView');
    var xAxis = graphView.get('xAxis');
    var yAxis = graphView.get('yAxis');

    var topLeft = graphView.coordinatesForPoint(xAxis.get('min'), yAxis.get('max'));
    var bottomRight = graphView.coordinatesForPoint(xAxis.get('max'), yAxis.get('min'));

    var bounds = {};
    bounds.left = topLeft.x;
    bounds.right = bottomRight.x;
    bounds.top = topLeft.y;
    bounds.bottom = bottomRight.y;

    if ((rect.left < bounds.left) || (rect.right > bounds.right) || (rect.top < bounds.top) || (rect.bottom > bounds.bottom)) {
      return false;
    }

    return true;
  },

  checkLabelInArray: function (item) {
    var graphView = this.get('graphView');
    var arrObjects = graphView.get('arrLabelsLayout');

    for (var i = 0; i < arrObjects.length; i++) {
      if (arrObjects[i].item === item) {
        return arrObjects[i];
      }
    }
    return null;
  },

  getNewPostionLayout: function (rectA, rectB, position) {
    var newRect = {
      top: rectB.top,
      bottom: rectB.bottom,
      left: rectB.left,
      right: rectB.right,
      width: rectB.width,
      height: rectB.height
    };
    var strokeWidth = this.get('labelBodyView').strokeWidth();
    var gap = 5;

    if (position & this.get('RIGHT')) {
      newRect.left = rectA.right + gap + 2 * strokeWidth;
      newRect.right = newRect.left + rectB.width;
    }
    else if (position & this.get('LEFT')) {
      newRect.left = rectA.left - rectB.width - gap - 2 * strokeWidth;
      newRect.right = newRect.left + rectB.width;
    }
    if (position & this.get('BOTTOM')) {
      newRect.top = rectA.bottom + gap + 2 * strokeWidth;
      newRect.bottom = newRect.top + rectB.height;
    }
    else if (position & this.get('TOP')) {
      newRect.top = rectA.top - rectB.height - gap - 2 * strokeWidth;
      newRect.bottom = newRect.top + rectB.height;
    }
    return newRect;
  },

  checkOverlap: function (rectA, rectB) {
    var nOverlapArea = this.intersectRect(rectA, rectB);
    return nOverlapArea > 0;
  },

  intersectRect: function (r1, r2) {
    if (!(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top)) {
      var area = (Math.max(r1.left, r2.left) - Math.min(r1.right, r2.right)) * (Math.max(r1.top, r2.top) - Math.min(r1.bottom, r2.bottom));
      return area;
    }
    return 0;
  },

  didCreateLayer: function () {
    sc_super();
    this.$().css('cursor', 'default');
    this.get('item').set('view', this);
    var labelElement = this.get('layer');
    if (labelElement.getAttribute('class')) {
      labelElement.setAttribute('class', labelElement.getAttribute('class') + ' labelView');
    }
    else {
      labelElement.setAttribute('class', 'labelView');
    }
  },

  viewDidResize: function () {
    this.invokeLast(this.notifyGraphScaleChange);
  },

  notifyGraphScaleChange: function () {
    this.notifyPropertyChange('graphScale');
  },

  bringLabelOnTop: function () {
    var parentOfLabel = this.get('parentView');
    // If the label is child of LabelSet, bring LabelSet on the top.
    if (parentOfLabel.kindOf(Smartgraphs.LabelSetView)) {
      var topAnnotationsHolder = parentOfLabel.get('parentView');
      topAnnotationsHolder.appendChild(parentOfLabel);
      var labels = parentOfLabel.getPath('item.labels');
      for (var i = 0; i < labels.length(); i++) {
        var label = labels.objectAt(i);
        if (this.getPath('item.url') === label.get('url')) {
          // If label is already at top then no need to move it
          if (i != labels.length() - 1) {
            this.set('moveToTopPending', YES);
          }
          break;
        }
      }
    }
  // To temporarily bring the label on top. Actual moving on top is deferred until mouse-up
  // is encountered to avoid highlighting issues
    parentOfLabel.appendChild(this);
  },

  updateLabelPositionInRecords: function () {
    // Bring label on top if it was pending
    if (this.get('moveToTopPending')) {
      this.set('moveToTopPending', NO);
      var parentOfLabel = this.get('parentView');
      // If the label is child of LabelSet, bring LabelSet on the top.
      if (parentOfLabel.kindOf(Smartgraphs.LabelSetView)) {
        var labels = parentOfLabel.getPath('item.labels');
        var label = this.get('item');
        labels.removeObject(label);
        labels.pushObject(label);
      }
    }
  },

  mouseEntered: function (evt) {
    var bArrowDragging = false;
    if (this.get('isArrowDragging')) {
      bArrowDragging = true;
    }
    else {
      var labelInArrowDragMode = this.getPath('graphView.topAnnotationsHolder').getLabelInArrowDragMode();
      if (labelInArrowDragMode) {
        bArrowDragging = true;
      }
    }
    if (bArrowDragging) {
      this.$().css('cursor', 'move');
    }
    else {
      this.$().css('cursor', 'default');
    }
  },

  childViews: 'targetPointView connectingLineView labelBodyView'.w(),

  targetPointView: RaphaelViews.RaphaelView.design(Smartgraphs.ArrowDrawing, {

    labelView: SC.outlet('parentView'),

    xCoordBinding:       '.labelView.xCoord',
    yCoordBinding:       '.labelView.yCoord',
    anchorXCoordBinding: '.labelView.anchorXCoord',
    anchorYCoordBinding: '.labelView.anchorYCoord',
    strokeBinding:       '.labelView.stroke',
    markerStyleBinding:  '.labelView.markerStyle',
    markerSizeBinding:   '.labelView.markerSize',
    didCreateLayer: function () {
      sc_super();
      var allowCoordinatesChange = this.getPath('labelView.allowCoordinatesChange');
      if (allowCoordinatesChange) {
        this.$().css('cursor', 'move');
      }
      else {
        this.$().css('cursor', 'default');
      }
    },

    // Using a computed property for 'isVisible' here
    // because the following locks up the jasmine test for some reason:
    // isVisibleBinding: '.labelView.shouldMarkTargetPoint',
    // isVisibleBindingDefault: SC.Binding.oneWay(),

    shouldMarkTargetPointBinding: '.labelView.shouldMarkTargetPoint',
    defaultFillBinding:           '.labelView.stroke',
    highlightedFillBinding:       '.labelView.highlightedStroke',
    isHighlightedBinding:         '.labelView.isHighlighted',

    fill: function () {
      return this.get('isHighlighted') ? this.get('highlightedFill') : this.get('defaultFill');
    }.property('isHighlighted', 'highlightedFill', 'defaultFill').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),

    displayProperties: 'xCoord yCoord anchorXCoord isHighlighted anchorYCoord stroke startRadius'.w(),

    isVisible: function () {
      return this.get('shouldMarkTargetPoint');
    }.property('shouldMarkTargetPoint').cacheable(),

    renderCallback: function (raphaelCanvas, pathString, stroke) {
      return raphaelCanvas.path(pathString).attr({ stroke: stroke });
    },

    render: function (context, firstTime) {
      var xCoord     = this.get('xCoord'),
          yCoord     = this.get('yCoord'),
          fill       = this.get('fill'),
          pathString,
          raphaelPath;

      pathString = this.markPath();
      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, fill);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({
          path: pathString,
          fill: fill,
          stroke: fill
        });
      }
    },

    /*
    *  Render the marker at this.xCoord, this.yCoord.
    */
    markPath: function() {
      if( this.get('markerStyle') == 'arrow') {
        return this.arrowMark();
      }
      if (this.get('markerStyle') == 'x') {
        return this.xMark();
      }
      // TODO: should we note that no marker was specified?
      return this.emptyPath();
    },

    /*
    *  Render an empty path for no marker.
    */
    emptyPath: function() {
      return "M 0 0";
    },

    /*
    *  Render an arrow -> mark at  this.xCoord, this.yCoord.
    */
    arrowMark: function() {
      var startx = this.get('anchorXCoord'),
        starty   = this.get('anchorYCoord'),
        endx     = this.get('xCoord'),
        endy     = this.get('yCoord'),
        len      = this.get('markerSize'),
        angle    = 20;
      if (SC.none(startx) || SC.none(starty) || SC.none(endx) || SC.none(endy) || SC.none(angle)) {
        return this.emptyPath();
      }
      return this.arrowPath(startx,starty,endx,endy,len,angle);
    },

    /*
    *  Render an "x" mark at  this.xCoord, this.yCoord.
    */
    xMark: function () {
      var elements = [],
          xCoord   = this.get('xCoord'),
          yCoord   = this.get('yCoord'),
          diameter = this.get('markerSize'),
          radius   = diameter / 2,
          x        = xCoord - radius,
          y        = yCoord + radius;

      if (SC.none(xCoord) || SC.none(yCoord)) return this.emptyPath();
      elements.push('M', x, y);
      elements.push('L', x + diameter, y - diameter);

      x = xCoord - radius;
      y = yCoord - radius;

      elements.push('M', x , y);
      elements.push('L', x + diameter, y + diameter);
      return elements.join(' ');
    },
    mouseDown: function (evt) {
      this.startDrag(evt);
      return YES;
    },

    touchStart: function (evt) {
      this.startDrag(evt);
      return YES;
    },

    mouseUp: function (evt)  { return this._mouseUpOrTouchEnd(evt); },
    touchEnd: function (evt) { return this._mouseUpOrTouchEnd(evt); },

    _mouseUpOrTouchEnd: function (evt) {
      var allowCoordinatesChange = this.getPath('labelView.allowCoordinatesChange');
      if (allowCoordinatesChange === undefined || !allowCoordinatesChange) {
        return YES;
      }
      this.endDrag(evt);
      return NO;
    },

    mouseDragged: function (evt) {
      this.drag(evt);
      return YES;
    },

    touchesDragged: function (evt) {
      this.drag(evt);
      return YES;
    },
    
    startDrag: function (evt) {
      var allowCoordinatesChange = this.getPath('labelView.allowCoordinatesChange');
      if (allowCoordinatesChange === undefined || !allowCoordinatesChange) {
        return YES;
      }
      this.setPath('labelView.isArrowDragging', YES);

      var labelView = this.get('labelView');
      labelView.bringLabelOnTop();

      this._initialLabelPosition = {
        offsetPointX: labelView.get('bodyXCoord'),
        offsetPointY: labelView.get('bodyYCoord') + labelView.get('labelBodyHeight')
      };
      return YES;
    },

    setCursorStyle: function (cursorStyle) {
      var previousCursorStyle = this.getPath('labelView.graphView.requestedCursorStyle');
      if (previousCursorStyle !== cursorStyle) {
        this.setPath('labelView.graphView.requestedCursorStyle', cursorStyle);
      }
    },

    drag: function (evt) {
      var allowCoordinatesChange = this.getPath('labelView.allowCoordinatesChange');
      if (allowCoordinatesChange === undefined || !allowCoordinatesChange) {
        return YES;
      }
      var previousCursorStyle = this.getPath('labelView.graphView.requestedCursorStyle');
      if (previousCursorStyle != 'move') {
        this.set('previousCursorStyle', previousCursorStyle);
      }
      this.setCursorStyle('move');
      this.setPath('labelView.isArrowDragging', YES);
      /* Making coordsForEvent of graph view to work here ..... */
      var graphView = this.getPath('labelView.graphView');
      var graphOffset = graphView.$().offset(),
          xAxis = graphView.get('xAxis'),
          yAxis = graphView.get('yAxis'),
          inputAreaTopLeft = graphView.coordinatesForPoint(xAxis.get('min'), yAxis.get('max')),
          inputAreaBottomRight = graphView.coordinatesForPoint(xAxis.get('max'), yAxis.get('min')),
          bounds = {xLeft: inputAreaTopLeft.x, yTop: inputAreaTopLeft.y, xRight: inputAreaBottomRight.x, yBottom: inputAreaBottomRight.y},
          x           = evt.pageX - graphOffset.left,
          y           = evt.pageY - graphOffset.top,
          fraction;

          // clip the event to the inputArea boundaries. Simple clipping seems to work fine
      x = (x < bounds.xLeft) ? bounds.xLeft : (x > bounds.xRight)  ? bounds.xRight  : x;
      y = (y < bounds.yTop)  ? bounds.yTop  : (y > bounds.yBottom) ? bounds.yBottom : y;
      var logicalPoint = graphView.pointForCoordinates(x, y);

      var labelView = this.get('labelView');
      var initialPos = this._initialLabelPosition;

      labelView.beginPropertyChanges();
      labelView.set('x', logicalPoint.x);
      labelView.set('y', logicalPoint.y);
      labelView.set('xOffset', initialPos.offsetPointX - labelView.get('xCoord'));
      labelView.set('yOffset', initialPos.offsetPointY - labelView.get('yCoord'));
      labelView.endPropertyChanges();
    },

    mouseEntered: function () {
      var allowCoordinatesChange = this.getPath('labelView.allowCoordinatesChange');
      if (allowCoordinatesChange === undefined || !allowCoordinatesChange) {
        return YES;
      }
      var previousCursorStyle = this.getPath('labelView.graphView.requestedCursorStyle');
      if (!this.getPath('labelView.isArrowDragging') && previousCursorStyle != 'move') {
        this.set('previousCursorStyle', previousCursorStyle);
      }
      this.setCursorStyle('move');
    },

    mouseExited: function () {
      var allowCoordinatesChange = this.getPath('labelView.allowCoordinatesChange');
      if (allowCoordinatesChange === undefined || !allowCoordinatesChange) {
        return YES;
      }
      if (!this.getPath('labelView.isArrowDragging')) {
        var previousCursorStyle = this.get('previousCursorStyle');
        if (previousCursorStyle) {
          this.setCursorStyle(this.get('previousCursorStyle'));
        }
      }
    },
    endDrag: function (evt) {
      if (this.getPath('labelView.isArrowDragging')) {
        var previousCursorStyle = this.get('previousCursorStyle');
        if (previousCursorStyle) {
          this.setCursorStyle(this.get('previousCursorStyle'));
        }
      }
      this.get('labelView').updateLabelPositionInRecords();
      this.setPath('labelView.isArrowDragging', NO);
      return YES;
    }
  }),

  connectingLineView: RaphaelViews.RaphaelView.design({

    displayProperties: 'xCoord yCoord anchorXCoord anchorYCoord stroke startRadius'.w(),

    labelView: SC.outlet('parentView'),

    defaultStrokeWidth:       1,
    highlightedStrokeWidth:   2,

    defaultStrokeBinding:     '.labelView.stroke',
    highlightedStrokeBinding: '.labelView.highlightedStroke',
    isHighlightedBinding:     '.labelView.isHighlighted',
    xCoordBinding:            '.labelView.xCoord',
    yCoordBinding:            '.labelView.yCoord',
    anchorXCoordBinding:      '.labelView.anchorXCoord',
    anchorYCoordBinding:      '.labelView.anchorYCoord',

    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),

    // How far from the targetPointView's center to start drawing the connecting line
    startRadius: 9,

    renderCallback: function (raphaelCanvas, pathString, stroke, strokeWidth) {
      return raphaelCanvas.path(pathString).attr({stroke: stroke, 'stroke-width': strokeWidth});
    },

    render: function (context, firstTime) {
      var xCoord       = this.get('xCoord'),
          yCoord       = this.get('yCoord'),
          anchorXCoord = this.get('anchorXCoord'),
          anchorYCoord = this.get('anchorYCoord'),
          stroke       = this.get('stroke'),
          strokeWidth  = this.get('strokeWidth'),
          startRadius  = this.get('startRadius'),
          dx           = anchorXCoord - xCoord,
          dy           = anchorYCoord - yCoord,

          // dist. between (xCoord, yCoord) and (anchorXCoord, anchorYCoord)
          length       = Math.sqrt( dx*dx + dy*dy ),
          startX,
          startY,
          pathString,
          raphaelPath,
          arrowP;

      if (length < startRadius || SC.none(xCoord) || SC.none(yCoord) || SC.none(anchorXCoord) || SC.none(anchorYCoord)) {
        pathString = 'M 0 0';
      }
      else {
        startX     = xCoord + (startRadius / length) * dx;
        startY     = yCoord  + (startRadius / length) * dy;
        pathString = ['M', startX, startY, 'L', anchorXCoord, anchorYCoord].join(' ');
      }

      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, stroke, strokeWidth);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({ path: pathString, stroke: stroke, 'stroke-width': strokeWidth });
      }
    }

  }),

  labelBodyView: RaphaelViews.RaphaelView.design({

    childViews: 'labelTextView removeButtonView'.w(),

    parentLabelView: SC.outlet('parentView'),
    labelView:     SC.outlet('parentLabelView'),
    graphView:     SC.outlet('labelView.graphView'),
    topAnnotationHolder: SC.outlet('graphView.topAnnotationHolder'),

    displayProperties:   'bodyXCoord bodyYCoord width height stroke strokeWidth fill cornerRadius'.w(),

    itemBinding:         '.parentLabelView.item',
    textBinding:         '.parentLabelView.text',
    textColorBinding:    '.parentLabelView.textColor',

    bodyXCoordBinding:   '.parentLabelView.bodyXCoord',
    bodyYCoordBinding:   '.parentLabelView.bodyYCoord',
    xOffsetBinding:      '.parentLabelView.xOffset',
    yOffsetBinding:      '.parentLabelView.yOffset',

    textWidthBinding:    '.labelTextView.width',
    textHeightBinding:   '.labelTextView.height',

    fillBinding:         '.parentLabelView.fill',
    cornerRadiusBinding: '.parentLabelView.cornerRadius',

    defaultStrokeBinding:     '.parentLabelView.stroke',
    highlightedStrokeBinding: '.parentLabelView.highlightedStroke',
    defaultStrokeWidth:       1,
    highlightedStrokeWidth:   2,
    leftMargin:               12,
    topMargin:                12,
    rightMargin:              SC.platform.touch ? 30 : 20,
    bottomMargin:             12,
    isHighlightedBinding:     '.parentLabelView.isHighlighted',

    width: function () {
      var textWidth = this.get('textWidth');
      if (textWidth) {
        return this.get('textWidth') + this.get('leftMargin') + this.get('rightMargin');
      }
      return 100;
    }.property('textWidth').cacheable(),

    height: function () {
      var textHeight = this.get('textHeight');
      if (textHeight) {
        return this.get('textHeight') + this.get('bottomMargin') + this.get('topMargin');
      }
      return 30;
    }.property('textHeight').cacheable(),

    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),


    renderCallback: function (raphaelCanvas, attrs) {
      return raphaelCanvas.rect().attr(attrs);
    },

    render: function (context, firstTime) {
      var attrs = {
            x:              this.get('bodyXCoord')   || 0,
            y:              this.get('bodyYCoord')   || 0,
            width:          this.get('width')        || 0,
            height:         this.get('height')       || 0,
            r:              this.get('cornerRadius') || 0,
            stroke:         this.get('stroke'),
            'stroke-width': this.get('strokeWidth')  || 1,
            fill:           this.get('fill'),
            'fill-opacity': 1.0
          },

          raphaelRect;

      if (firstTime) {
        context.callback(this, this.renderCallback, attrs);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelRect = this.get('raphaelObject');
        raphaelRect.attr(attrs);
      }
    },

    // Dragging. Note that dragging is 'stateless' in the sense that you can always drag a label view. So we won't hook
    // into states or the controller layer. We also assume until proven otherwise that we can modify our own cursor
    // without consequence.
    mouseDown: function (evt) {
      this.startDrag(evt);
      return YES;
    },

    touchStart: function (evt) {
      this.startDrag(evt);
      return YES;
    },

    mouseUp: function (evt)  { return this._mouseUpOrTouchEnd(evt); },
    touchEnd: function (evt) { return this._mouseUpOrTouchEnd(evt); },

    _mouseUpOrTouchEnd: function (evt) {
      this.endDrag(evt);
      var now      = new Date().getTime(),// ms
          interval = 202,                 // ms
          maxTime  = 200;                 // ms

      if (typeof this.lastUp != 'undefined' && this.lastUp) {
        interval  = now - this.lastUp;
        if (interval < maxTime) {
          // reset 'lastUp' after detecting a doubleClick
          this.lastUp = 0;
          return this.doubleClick(evt);
        }
      }
      this.lastUp = now;
      return NO;
    },

    doubleClick: function (evt) {
      if (!this.getPath('labelTextView.isEditing')) {
        this.labelTextView.beginEditing();
      }
      return YES;
    },

    mouseDragged: function (evt) {
      this.drag(evt);
      return YES;
    },

    touchesDragged: function (evt) {
      this.drag(evt);
      return YES;
    },

    startDrag: function (evt) {
      var labelView = this.get('labelView');
      labelView.bringLabelOnTop();
      this.setPath('parentLabelView.isBodyDragging', YES);

      this._isDragging = YES;
      this._dragX = evt.pageX;
      this._dragY = evt.pageY;
      var graphView = this.getPath('graphView');
      var xAxis = graphView.get('xAxis');
      var yAxis = graphView.get('yAxis');
      var inputAreaTopLeft = graphView.coordinatesForPoint(xAxis.get('min'), yAxis.get('max'));
      var inputAreaBottomRight = graphView.coordinatesForPoint(xAxis.get('max'), yAxis.get('min'));
      var frameWidth = inputAreaBottomRight.x - inputAreaTopLeft.x;
      var frameHeight = inputAreaBottomRight.y - inputAreaTopLeft.y;

      var labelTop = this.get('bodyYCoord') - inputAreaTopLeft.y;
      var labelLeft = this.get('bodyXCoord') - inputAreaTopLeft.x;
      var labelWidth = this.width();
      var labelHeight = this.height();

      var xOffset = this.get('xOffset');
      var yOffset = this.get('yOffset');
      var widthBound = frameWidth - labelWidth;
      var heightBound = frameHeight - labelHeight;

      this._mouseDownInfo = {
        minXOffset: xOffset - labelLeft,
        maxXOffset: widthBound - labelLeft + xOffset,
        minYOffset: yOffset - labelTop,
        maxYOffset: heightBound - labelTop + yOffset,
        xMIN: evt.pageX - labelLeft,
        xMAX: evt.pageX - labelLeft + widthBound,
        yMIN: evt.pageY - labelTop,
        yMAX: evt.pageY - labelTop + heightBound
      };

      // our layer doesn't respect SC.Cursor, so set the cursors manually
      this.$().css('cursor', 'move');
      return YES;
    },

    drag: function (evt) {
      var xOffset = this.get('xOffset'),
          yOffset = this.get('yOffset');

      if (!this._isDragging) {
        return;
      }

      var info = this._mouseDownInfo,
          currXOffset, currYOffset;

      currXOffset = xOffset + evt.pageX - this._dragX;
      if (evt.pageX < info.xMIN || currXOffset < info.minXOffset) {
        currXOffset = info.minXOffset;
      }
      if (evt.pageX > info.xMAX || currXOffset > info.maxXOffset) {
        currXOffset = info.maxXOffset;
      }
      

      currYOffset = yOffset + evt.pageY - this._dragY;
      if (evt.pageY < info.yMIN || currYOffset < info.minYOffset) {
        currYOffset = info.minYOffset;
      }
      if (evt.pageY > info.yMAX || currYOffset > info.maxYOffset) {
        currYOffset = info.maxYOffset;
      }

      this._dragX = evt.pageX;
      this._dragY = evt.pageY;

      this.parentLabelView.beginPropertyChanges();
      this.set('xOffset', currXOffset);
      this.set('yOffset', currYOffset);
      this.parentLabelView.endPropertyChanges();
    },

    endDrag: function (evt) {
      this.drag(evt);
      this.setPath('parentLabelView.isBodyDragging', NO);
      this._isDragging = NO;
      this.get('labelView').updateLabelPositionInRecords();
      this.$().css('cursor', ''); // Parent's cursor style will be inherited.

      return YES;
    },

    labelTextView: Smartgraphs.EditableLabelView.design({
      labelView:     SC.outlet('parentView.parentLabelView'),
      isEditableBinding: '.labelView.isEditable',
      fontSize: 14
    }),

    removeButtonView: RaphaelViews.RaphaelView.design({

      displayProperties: 'bodyXCoord bodyYCoord width isHighlighted'.w(),

      labelBodyView: SC.outlet('parentView'),
      labelView:     SC.outlet('parentView.parentLabelView'),
      graphView:     SC.outlet('labelView.graphView'),
      graphCanvasView: SC.outlet('graphView.graphCanvasView'),

      widthBinding:      '.labelBodyView.width',
      bodyXCoordBinding: '.labelBodyView.bodyXCoord',
      bodyYCoordBinding: '.labelBodyView.bodyYCoord',

      isRemovalEnabledBinding: '.labelView.isRemovalEnabled',
      
      radius: SC.platform.touch ? 10 : 6,

      centerX: function () {
        return this.get('bodyXCoord') + this.get('width') - 4 - this.get('radius') || 0;
      }.property(),
      
      centerY: function () {
        return this.get('bodyYCoord') + 4 + this.get('radius') || 0;
      }.property(),
      
      isVisible: function () {
        return this.get('isRemovalEnabled');
      }.property('isRemovalEnabled'),

      isHighlighted: NO,

      highlightedCircleColor:    '#999999',
      notHighlightedCircleColor: '#ffffff',
      highlightedXStroke:        '#ffffff',
      notHighlightedXStroke:     '#999999',

      circleColor: function () {
        return this.get('isHighlighted') ? this.get('highlightedCircleColor') : this.get('notHighlightedCircleColor');
      }.property('isHighlighted', 'highlightedCircleColor', 'notHighlightedCircleColor').cacheable(),

      xStroke: function () {
        return this.get('isHighlighted') ? this.get('highlightedXStroke') : this.get('notHighlightedXStroke');
      }.property('isHighlighted', 'highlightedXStroke', 'notHighlightedXStroke').cacheable(),
      
      xStrokeWidth: SC.platform.touch ? 3 : 2,

      renderCallback: function (raphaelCanvas, circleAttrs, xAttrs) {
        return raphaelCanvas.set().push(
          raphaelCanvas.circle().attr(circleAttrs),
          raphaelCanvas.path().attr(xAttrs)
        );
      },

      render: function (context, firstTime) {
        var radius  = this.get('radius'),
            t       = radius / 2,
            centerX = this.get('centerX'),
            centerY = this.get('centerY'),

            circleAttrs = {
              r:      radius,
              cx:     centerX,
              cy:     centerY,
              stroke: this.get('circleColor'),
              fill:   this.get('circleColor')
            },

            xPath = ['M', centerX - t, centerY - t, 'L', centerX + t, centerY + t,
                     'M', centerX - t, centerY + t, 'L', centerX + t, centerY - t].join(' '),

            xAttrs = {
              path:           xPath,
              'stroke-width': this.get('xStrokeWidth'),
              stroke:         this.get('xStroke')
            },

            raphaelObj,
            raphaelCircle,
            raphaelX;

        this.set('centerX', centerX);
        this.set('centerY', centerY);
        
        if (firstTime) {
          context.callback(this, this.renderCallback, circleAttrs, xAttrs);
        }
        else {
          raphaelObj    = this.get('raphaelObject');
          raphaelCircle = raphaelObj.items[0];
          raphaelX      = raphaelObj.items[1];

          raphaelCircle.attr(circleAttrs);
          raphaelX.attr(xAttrs);
        }
      },

      touchStart: function () {
        this.set('isHighlighted', YES);
        return YES;
      },
      
      touchEnd: function (evt) {
        var offset = this.get('graphCanvasView').$().offset();

        this.set('isHighlighted', NO);
        
        if (   Math.abs(evt.pageX - this.get('centerX') - offset.left) < 50 &&
               Math.abs(evt.pageY - this.get('centerY') - offset.top)  < 50)
        {
          this.get('labelView').remove();
        }
        return YES;
      },

      mouseDown: function () {
        this.get('labelView').remove();
      },

      mouseEntered: function () {
        this.set('isHighlighted', YES);
      },

      mouseExited: function () {
        this.set('isHighlighted', NO);
      }
    })
  }),

  remove: function () {
    this.removeLabelFromArray();
    if (this.get('isRemovalEnabled')) {
      this.get('controller').labelViewRemoveLabel(this.get('item'));
    }
  },

  removeLabelFromArray: function () {
    var graphView = this.get('graphView');
    var item = this.get('item');
    if (graphView) {
      var arrTemp = graphView.get('arrLabelsLayout');
      var newArray = [];
      for (var i = 0; i < arrTemp.length; i++) {
        if (arrTemp[i].item !== item) {
          newArray.push(arrTemp[i]);
        }
      }
      graphView.set('arrLabelsLayout', newArray);
    }
  },

  commitEditing: function () {
    var labelTextView = this.get('labelTextView');
    if (this.get('isEditing')) {
      labelTextView.commitEditing();
    }
  }
});
