/*globals Smartgraphs */

sc_require('models/dataref');
sc_require('models/datarefs/continuous_equation');

/** @class

  The LinearEquation data definition class defines a dataset that is described by an unordered set of (x, y)
  pairs.

  @extends Smartgraphs.ContinuousEquation
*/
Smartgraphs.LinearEquation = Smartgraphs.ContinuousEquation.extend(
/** @scope Smartgraphs.LinearEquation.prototype */ {

  initialise: function () {
    sc_super();
  },

  getExpressionFunction: function () {
    var expressionForm = this.get('expressionForm');
    var params = this.get('params');
    switch (expressionForm) {
    case 'slope-intercept':
      return function (x) {
        var y = params.slope * x + params.yIntercept;
        return y;
      };
    case 'general':
      return null;    // Not implemented
    default:
      return null;
    }
  },
  
  getInverseExpressionFunction: function () {
    var expressionForm = this.get('expressionForm');
    var params = this.get('params');
    switch (expressionForm) {
    case 'slope-intercept':
      return function (y) {
        var x = (y - params.yIntercept) / params.slope;
        return x;
      };
    case 'general':
      return null;    // Not implemented
    default:
      return null;
    }
  }
});
