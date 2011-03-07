// ==========================================================================
// Project:   Smartgraphs.appletPage
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// Author:    Aaron Unger <aunger@concord.org>
// ==========================================================================
/*globals Smartgraphs CC */

// This page holds the applet view definition until we ready to instantiate the applet.
// Be prepared to take a long coffee break when you start it up, though...

Smartgraphs.appletPage = SC.Page.design({

  sensorAppletView: CC.SensorAppletView.design({
    layout: { width: 1, height: 1 },
    listenerPath: 'Smartgraphs.sensorController'   // path to object that will receive applet callbacks
  })
  
});
