// ==========================================================================
// Project:   Smartgraphs.ResourceLoader Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var loader;
var cleanupWasCalled;
var didLoadWasCalled;
var loadingErrorWasCalled;
var thisArgPassed;

function newObjWithStatus(status) {
  return SC.Object.create({ status: status });
}

function newResource(obj) {
  return {
    load: function (thisArg) { return obj; }
  };
}

function newResourceWithStatus(status) {
  return newResource(newObjWithStatus(status)); 
}

module("Smartgraphs.ResourceLoader.loadResources() READY tests", {
  setup: function () {
    didLoadWasCalled = NO;
    cleanupWasCalled = NO;
    
    loader = SC.Object.create(Smartgraphs.ResourceLoader, {
      resourcesDidLoad: function () {
        if (!cleanupWasCalled) {
          ok(false, 'resourcesDidLoad was called without cleanupLoading having been called first!');
        }
        didLoadWasCalled = YES;
      },
      
      cleanupLoading: function () {  
        cleanupWasCalled = YES;
      },
      
      resourceLoadingError: function () {
        ok(false, "resourceLoadingError was called when it shouldn't have been!");
      }
    });
  }
});


test('loadResources should return YES and should call resourcesDidLoad if master resource is READY and there are no subordinate resources', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === YES, 'loadResources returned YES');
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called.');
});


test('loadResources should return YES and should call resourcesDidLoad if master & subordinate resources are READY', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY), 
    newResourceWithStatus(SC.Record.READY)
  ];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === YES, 'loadResources returned YES');
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called.');
});


test('loadResources should return YES and should call resourcesDidLoad if master & subordinate resources are a combination of READY states', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY_DIRTY);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY_CLEAN),
    newResourceWithStatus(SC.Record.READY_NEW)
  ];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === YES, 'loadResources returned YES');
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called.');
});


test('loadResources should return NO and should not call resourcesDidLoad if master resource is not READY', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.BUSY);
  loader.subordinateResources = [];

  ok(loader.loadResources() === NO, 'loadResources returned NO');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');
});


test('loadResources should return NO and should not call resourcesDidLoad and if master resource is READY but some subordinate resource is not READY', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.BUSY),
    newResourceWithStatus(SC.Record.READY)
  ];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');
});


test('resourcesDidLoad should be called after master resource transitions to READY state and there are no subordinate resources', function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');
  
  master.set('status', SC.Record.READY);
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after record transitioned to READY');  
});


test('resourcesDidLoad and cleanupLoading should be called after master transitions to READY if subordinate resources are READY', function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY), 
    newResourceWithStatus(SC.Record.READY)
  ];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');

  master.set('status', SC.Record.READY);
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after record transitioned to READY');
});


test('resourcesDidLoad should be called after master transitions to READY and subordinate resources transition to READY', function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);

  var sub1 = newObjWithStatus(SC.Record.EMPTY);
  var sub2 = newObjWithStatus(SC.Record.EMPTY);

  loader.subordinateResources = [
    newResource(sub1), 
    newResource(sub2)
  ];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');

  master.set('status', SC.Record.READY);
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after master record transitioned to READY');

  sub1.set('status', SC.Record.READY);
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after first subordinate record transitioned to READY');  
  
  sub2.set('status', SC.Record.READY);  
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after second subordinate resource transitioned to READY');  
});


test("load() method of master and subordinate resources should have ResourceLoader instance as first argument", function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  var firstArgToMaster = null;
  var firstArgToSub = null;
  
  loader.masterResource = { 
    load: function (arg) {
      firstArgToMaster = arg;
      return master;
    }
  };
    
  loader.subordinateResources = [{
    load: function (arg) {
      firstArgToSub = arg;
      return newObjWithStatus(SC.Record.READY);
    }
  }];

  loader.loadResources();
  equals(firstArgToMaster, loader, 'load() method was passed loader as first argument when loading master resource');
  master.set('status', SC.Record.READY);
  equals(firstArgToSub, loader, 'load() method was passed loader as first argment when loading subordinate resource');
});
  

var currentMaster;
var currentSub;

module("Smartgraphs.ResourceLoader.loadResources after partial or cancelled load", {
  setup: function () {
    didLoadWasCalled = NO;
    loadingErrorWasCalled = NO;
    
    loader = SC.Object.create(Smartgraphs.ResourceLoader, {
      masterResource: { load: function () { return currentMaster; } },

      subordinateResources: [
        { load: function () { return currentSub; } }
      ],

      resourcesDidLoad: function () {
        didLoadWasCalled = YES;
      },
      
      resourceLoadingError: function () {
        loadingErrorWasCalled = YES;
      }
    });
  }
});


test('after successful load, loading of a new resource correctly waits for all new resources to be READY', function () {
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  loader.loadResources();
  currentSub.set('status', SC.Record.READY);
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after successful load of subordinate resource');

  didLoadWasCalled = NO;
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  
  ok(loader.loadResources() === NO, 'loadResources returned NO after a new, not-READY subordinate was set');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after new, not-READY subordinate was set.');

  currentSub.set('status', SC.Record.READY);
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after new subordinate resource became READY');  
});


test('after failed load, loading of a new resource correctly waits for all new resources to be READY', function () {
  currentMaster = newObjWithStatus(SC.Record.EMPTY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  loader.loadResources();

  currentMaster.set('status', SC.Record.READY);
  currentSub.set('status', SC.Record.ERROR);
  
  ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called after subordinate resource ERROR');
  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO after subordinate resource ERROR');

  loadingErrorWasCalled = NO;
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  
  ok(loader.loadResources() === NO, 'loadResources returned NO after a new, not-READY master was set');
  
  currentSub.set('status', SC.Record.READY);  
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after new subordinate resource became READY');
  ok(loadingErrorWasCalled === NO, 'resourceLoadingError was not called after new subordinate resource became READY');
});


test('completion of a canceled load should not notify loader', function () {
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  
  loader.loadResources();
  loader.cancelLoading();
  
  currentSub.set('status', SC.Record.READY);
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after cancelled resource became READY');
});


test('failure of a canceled load should not notify loader', function () {
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  
  loader.loadResources();
  loader.cancelLoading();
  currentSub.set('status', SC.Record.ERROR);
  
  ok(loadingErrorWasCalled === NO, 'resourceLoadingError was not called after cancelled resource went into ERROR state');  
});


test('completion of a canceled load should not interfere with subsequent load', function () {
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  var oldSub = currentSub;
  
  loader.loadResources();
  loader.cancelLoading();
    
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);

  loader.loadResources();
  
  oldSub.set('status', SC.Record.READY);
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after old resource became READY');
    
  currentSub.set('status', SC.Record.READY);
  ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after new resource became READY');
});


module("Smartgraphs.ResourceLoader.loadResources() ERROR tests", {
  setup: function () {
    loadingErrorWasCalled = NO;
    cleanupWasCalled = NO;
    
    loader = SC.Object.create(Smartgraphs.ResourceLoader, {
      resourcesDidLoad: function () {
        ok(false, "resourcesDidLoad was called when it shouldn't have been.");
      },
      
      resourceLoadingError: function () {
        if (!cleanupWasCalled) {
          ok(false, 'resourceLoadingError was called without cleanupLoading having been called first.');
        }
        loadingErrorWasCalled = YES;
      },
      
      cleanupLoading: function () {
        cleanupWasCalled = YES;
      }
    });
  }
});


test('loadResources should return YES and should call resourceLoadingError if the master resource is in the ERROR state', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.ERROR);
  loader.subordinateResources = [];

  ok(loadingErrorWasCalled === NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === YES, 'loadResources returned YES');
  ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called');
});


test('loadResources should return YES and should call resourceLoadingError if the master resource is READY but some subordinate resource is in the ERROR state', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY_CLEAN);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY_CLEAN),
    newResourceWithStatus(SC.Record.ERROR)
  ];

  ok(loadingErrorWasCalled === NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === YES, 'loadResources returned YES');
  ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called');
});


test('resourceLoadingError should be be called if the master resource transitions to an ERROR state while loading', function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [];

  ok(loadingErrorWasCalled === NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');

  master.set('status', SC.Record.ERROR);
  
  ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called after master resource transitioned to ERROR.');
});


test('resourceLoadingError should be be called if a subordinate resource transitions to an ERROR state while loading', function () {
  var sub1 = newObjWithStatus(SC.Record.EMPTY);
  var sub2 = newObjWithStatus(SC.Record.EMPTY);

  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [newResource(sub1), newResource(sub2)];

  ok(loadingErrorWasCalled === NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');

  sub1.set('status', SC.Record.READY);
  ok(loadingErrorWasCalled === NO, 'resourceLoadingError was not called after the first subordinate resource transitioned to READY');

  sub2.set('status', SC.Record.ERROR);
  ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called after the second subordinate resource transitioned to ERROR.');
});
