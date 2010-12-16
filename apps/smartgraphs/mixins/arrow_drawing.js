// ==========================================================================
// Project:   Smartgraphs.ArrowDrawing
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Common functionality for Smartgraphs views which draw arrows with Raphael.

*/

Smartgraphs.ArrowDrawing = {

  /**
    Returns a Raphael path string which draws an arrow. Parameters should be actual screen coordinates, not dataset coordinates.
    
    Original from Noah Paessel, https://gist.github.com/550233
    
    @params startx {Number} X-coordinate of the start point
    @params starty {Number} Y-coordinate of the start point
    @params endx {Number} X-coordinate of the end point
    @params endy {Number} Y-coordinate of the end point
    @params len {Number} Length of the "tip" of the arrowhead
    @params angle {Number} Angle in degrees between the line and each wing of the arrowhead. Should be less than 90.
  */
  arrowPath: function(startx,starty,endx,endy,len,angle) {    
    var theta = Math.atan2((endy-starty),(endx-startx));
    var baseAngleA = theta + angle * Math.PI/180;
    var baseAngleB = theta - angle * Math.PI/180;
    var tipX = endx;
    var tipY = endy;
    var baseAX = endx - len * Math.cos(baseAngleA);
    var baseAY = endy - len * Math.sin(baseAngleA);
    var baseBX = endx - len * Math.cos(baseAngleB);
    var baseBY = endy - len * Math.sin(baseAngleB);
    var pathData = " M " + startx  + " " + starty +
                   " L " + tipX      + " " + tipY +
                   " L " + baseAX  + " " + baseAY +
                   " L " + baseBX  + " " + baseBY +
                   " L " + tipX    + " " + tipY;
    return pathData;
  }

};