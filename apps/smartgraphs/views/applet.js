// ==========================================================================
// Project:   Cc.AppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  A simple view for embedding applets

  @extends SC.View
*/
CC.AppletView = SC.View.extend(
/** @scope Cc.AppletView.prototype */ {
  
  jarUrls: '',    // e.g. 'http://mw2.concord.org/public/lib/mwapplet.jar'. If more than one jar, they can be comma-separated
  
  code: '',       // main class. e.g. 'org.concord.modeler.MwApplet'
  
  params: '',     // any params, as html. e.g. '<param name="script" value="..."/>'
  
  width: 600,
  
  height: 400,

	appletInstance: function() {
		return this.$('#' + this.get('appletId'))[0];
	},

  render: function(context, firstTime) {
			this.renderAppletHtml(context);
  },
  
  renderAppletHtml: function(context) {
	  var appletContext = context.begin('applet');
	  appletContext.attr('id', this.get('appletId'));
	  appletContext.attr('codebase', this.get('codebase'));	
	  appletContext.attr('archive', this.get('jarUrls'));
	  appletContext.attr('code', this.get('code'));
	  appletContext.attr('width', '100%');
	  appletContext.attr('height', this.get('height'));
	  appletContext.attr('MAYSCRIPT', 'true');
		appletContext.push(this.get('params'));
		appletContext.end();
  },
  
  classNames: "applet",
  
  layout: { centerX: 0, centerY: 0, width: 600, height: 400 },     // defaults

	appletId: function() {
		return this.get('layerId') + '-applet';
	}.property('layerId').cacheable(),
	
	run: function(func) {
		func(this.appletInstance());
	}
});
