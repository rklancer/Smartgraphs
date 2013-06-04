/*globals Smartgraphs */

sc_require('models/dataref');
sc_require('models/datarefs/continuous_equation');

/** @class

  The sinusoidalEquation data definition class defines a dataset that is described by an unordered set of (x,y)
  pairs.

  @extends Smartgraphs.Dataref
*/
Smartgraphs.SinusoidalEquation = Smartgraphs.ContinuousEquation.extend(
/** @scope Smartgraphs.SinusoidalEquation.prototype */ {

  initialise: function () {
    sc_super();
  },

  getExpressionFunction: function () {
    var expressionForm = this.get('expressionForm');
    var angularFunction = this.get('angularFunction');
    var params = this.get('params');
    switch (expressionForm) {
    case 'sine-cosine':
      if (angularFunction === 'sine') {
        return function (x) {
          var y = params.amplitude * Math.sin(params.frequency * x + params.phase) + params.centerAmplitude;
          return y;
        };
      }
      break;
      
    case 'general':
      return null;    // Not implemented
    default:
      return null;
    }
  },
  
  getInverseExpressionFunction: function () {
    var expressionForm = this.get('expressionForm');
    var angularFunction = this.get('angularFunction');
    var params = this.get('params');
    switch (expressionForm) {
    case 'sine-cosine':
      if (angularFunction === 'sine') {
        return function (y) {
          var x = ((Math.asin((y - params.centerAmplitude) / params.amplitude)) - params.phase) / params.frequency;
          return x;
        };
      }
      break;
      
    case 'general':
      return null;    // Not implemented
    default:
      return null;
    }
  }
});
