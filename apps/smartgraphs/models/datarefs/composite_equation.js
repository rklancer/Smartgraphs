/*globals Smartgraphs */

sc_require('models/dataref');

/** @class

  The CompositeEquation data definition class defines a dataset that is described by an unordered set of (x, y)
  pairs.

  @extends Smartgraphs.Dataref
*/
Smartgraphs.CompositeEquation = Smartgraphs.Dataref.extend({

  initialise: function () {
    sc_super();
    this.set('stepInterval', this.get('xInterval'));
    this.populatePoints();
  },

  populatePoints: function () {
    var sin = Math.sin, cos = Math.cos, tan = Math.tan,
        asin = Math.asin, acos = Math.acos, atan = Math.atan,
        log = Math.log, pow = Math.pow, sqrt = Math.sqrt,
        datarefPoints = this.get('points'),
        stepInterval = this.get('stepInterval'),
        graphBounds = this.get('graphBounds');
    var x, y;
    var expression = this.get('expression');
    try {
      var bFirstTime = true, xPrev, yPrev;
      for (x = graphBounds.xMin; x <= graphBounds.xMax; x += stepInterval) {
        eval(expression);  // expression looks something like 'y = 3 * x + 4'
        if (y <= graphBounds.yMin || y >= graphBounds.yMax) {
          xPrev = x;
          yPrev = y;
          if (bFirstTime) {
            continue;
          }
          break;
        }
        else {
          if (bFirstTime && x !== graphBounds.xMin) {
            if (!isNaN(xPrev) && !isNaN(yPrev)) {
              datarefPoints.pushObject([xPrev, yPrev]);
            }
          }
          bFirstTime = false;
        }
        if (!isNaN(x) && !isNaN(y)) {
          datarefPoints.pushObject([x, y]);
        }
      }
      eval(expression);
      if (!isNaN(x) && !isNaN(y)) {
        datarefPoints.pushObject([x, y]);
      }
    }
    catch (e) {
      throw "Invalid Expression";
    }
    this.setDatadefPoints(datarefPoints);
  }
});