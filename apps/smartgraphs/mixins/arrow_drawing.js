// ==========================================================================
// Project:   Smartgraphs.ArrowDrawing
// Copyright: ©2010 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Noa Paessel  <knowuh@gmail.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Common functionality for Smartgraphs views which draw arrows with Raphael.

*/

Smartgraphs.ArrowDrawing = {

	/***
	*                   ^ <-------- angle
	*
	*                   *   <------ tip (x,y)    ---
	*                  * *                          |
	*                 *   *                         |- len
	*                *     *                        |
	* baseA(x,y)--> ********* <---- baseB (x,y)  ---
	*                   *
	*                   *
	*                   *
	*                   *
	*                   *
	*                   * <-------- start (x,y)
	*
    Returns a Raphael path string which draws an arrow.
    Parameters should be actual screen coordinates, not dataset coordinates.

    Original from Noah Paessel, https://gist.github.com/550233

    @params startx {Number} X-coordinate of the start point
    @params starty {Number} Y-coordinate of the start point
    @params endx {Number} X-coordinate of the end point
    @params endy {Number} Y-coordinate of the end point
    @params len {Number} Length of the "tip" of the arrowhead
    @params angle {Number} Angle in degrees
      between the line and each wing of the arrowhead.
      Should be less than 90.
  */
  arrowPath: function(startx,starty,endx,endy,len,angle) {
		return Smartgraphs.ArrowDrawing.arrowPathArray(startx,starty,endx,endy,len,angle).join(" ");
	},

	/**

	Returns an array representation of the path elements for an arrow

	@params startx {Number} X-coordinate of the start point
    @params starty {Number} Y-coordinate of the start point
    @params endx {Number} X-coordinate of the end point
    @params endy {Number} Y-coordinate of the end point
    @params len {Number} Length of the "tip" of the arrowhead
    @params angle {Number} Angle in degrees
      between the line and each wing of the arrowhead.
      Should be less than 90.

	**/
  arrowPathArray: function(startx,starty,endx,endy,len,angle) {
    var theta  = Math.atan2((endy-starty),(endx-startx)),
        baseAngleA = theta + angle * Math.PI/180,
        baseAngleB = theta - angle * Math.PI/180,
        tipX       = endx,
        tipY       = endy,
        baseAX     = endx - len * Math.cos(baseAngleA),
        baseAY     = endy - len * Math.sin(baseAngleA),
        baseBX     = endx - len * Math.cos(baseAngleB),
        baseBY     = endy - len * Math.sin(baseAngleB),
        pathData   = [];

    /*
    *   Limit precision of decimals for SVG rendering.
    *   otherwise we get really long SVG strings,
    *   and webkit error messsages like of this sort:
    *   "Error: Problem parsing d='<svg string with long dec>'"
    */
    startx = Math.round(startx * 1000)/1000;
    starty = Math.round(starty * 1000)/1000;
    tipX   = Math.round(tipX   * 1000)/1000;
    tipY   = Math.round(tipY   * 1000)/1000;
    baseAY = Math.round(baseAY * 1000)/1000;
    baseBX = Math.round(baseBX * 1000)/1000;
    baseBY = Math.round(baseBY * 1000)/1000;


    pathData.push("M", startx, starty);  // move to start of line
    pathData.push("L", tipX,   tipY  );  // line to the tip
    pathData.push("L", baseAX, baseAY);  // line to baseA
    pathData.push("L", baseBX, baseBY);  // line to baseB
    pathData.push("L", tipX,   tipY  );  // line back to the tip

    return pathData;
  }
};
