// ==========================================================================
// Project:   Smartgraphs.ResourceLoader Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start afterPropertyChange */

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
    load: function (thisArg) {
      thisArgPassed = thisArg;
      return obj; 
    }
  };
}

function newResourceWithStatus(status) {
  return newResource(newObjWithStatus(status)); 
}

module("Smartgraphs.ResourceLoader.loadResources() READY tests", {
  setup: function () {
    didLoadWasCalled = NO;
    cleanupWasCalled = NO;
    thisArgPassed = null;
    
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
  expect(4);
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');

  setTimeout(function () {
    master.set('status', SC.Record.READY);
    master.set('readyToTest', YES);
  }, 10);

  afterPropertyChange(master, 'readyToTest', YES, function () {
    ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after record transitioned to READY');
  });
});


test('resourcesDidLoad and cleanupLoading should be called after master transitions to READY if subordinate resources are READY', function () {
  expect(4);
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY), 
    newResourceWithStatus(SC.Record.READY)
  ];

  ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');
  ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');

  setTimeout(function () {
    master.set('status', SC.Record.READY);
    master.set('readyToTest', YES);
  }, 10);

  afterPropertyChange(master, 'readyToTest', YES, function () {
    ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after record transitioned to READY');
  });
});


test('resourcesDidLoad should be called after master transitions to READY and subordinate resources transition to READY', function () {
  expect(6);
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

  setTimeout(function () {
    master.set('status', SC.Record.READY);
    master.set('readyToTest', YES);
  }, 10);

  afterPropertyChange(master, 'readyToTest', YES, function () {
    ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after master record transitioned to READY');

    setTimeout(function () {
      sub1.set('status', SC.Record.READY);
      sub1.set('readyToTest', YES);
    }, 10);

    afterPropertyChange(sub1, 'readyToTest', YES, function () {
      ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after first subordinate record transitioned to READY');

      setTimeout(function () {
        sub2.set('status', SC.Record.READY);
        sub2.set('readyToTest', YES);
      }, 100);

      afterPropertyChange(sub2, 'readyToTest', YES, function () {
        ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after second subordinate resource transitioned to READY');
      });
    });
  });
});


test("load() method of master resource should have ResourceLoader instance as first argument", function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [];
  loader.loadResources();
  equals(thisArgPassed, loader, 'load() method was passed loader as first argument when loading master resource');
});


test("load() method of subordinate resources should have ResourceLoader instance as first argument", function () {
  expect(1);
  var master = newObjWithStatus(SC.Record.EMPTY);

  loader.masterResource = newResource(master);
  loader.subordinateResources = [newResourceWithStatus(SC.Record.READY)];

  loader.loadResources();

  setTimeout(function () {
    master.set('status', SC.Record.READY);
    master.set('readyToTest', YES);
  }, 10);

  thisArgPassed = null;
  console.log('set thisArgPassed to null');
  afterPropertyChange(master, 'readyToTest', YES, function () {
    equals(thisArgPassed, loader, 'load() method passed loader as first argment when loading subordinate resource after master');
  });
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
  expect(3);
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  loader.loadResources();

  setTimeout(function () {
    currentSub.set('status', SC.Record.READY);
    currentSub.set('readyToTest', YES);
  }, 10);
  
  afterPropertyChange(currentSub, 'readyToTest', YES, function () {
    ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after successful load of subordinate resource');
  
    didLoadWasCalled = NO;

    currentMaster = newObjWithStatus(SC.Record.READY);
    currentSub = newObjWithStatus(SC.Record.EMPTY);
    ok(loader.loadResources() === NO, 'loadResources returned NO after a new, not-READY subordinate was set');
      
    setTimeout(function () {
      currentSub.set('status', SC.Record.READY);
      currentSub.set('readyToTest', YES);
    }, 10);
      
    afterPropertyChange(currentSub, 'readyToTest', YES, function () {
      ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after new subordinate resource became READY');
    }); 
  });
});


test('after failed load, loading of a new resource correctly waits for all new resources to be READY', function () {
  expect(5);
  currentMaster = newObjWithStatus(SC.Record.EMPTY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  loader.loadResources();

  setTimeout(function () {
    currentMaster.set('status', SC.Record.READY);
    currentMaster.set('readyToTest', YES);
  }, 10);
  
  afterPropertyChange(currentMaster, 'readyToTest', YES, function () {
    setTimeout(function () {
      currentSub.set('status', SC.Record.ERROR);
      currentSub.set('readyToTest', YES);
    }, 10);
    
    afterPropertyChange(currentSub, 'readyToTest', YES, function () {
      ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called after subordinate resource ERROR');
      ok(didLoadWasCalled === NO, 'didLoadWasCalled was NO after subordinate resource ERROR');

      loadingErrorWasCalled = NO;
      currentMaster = newObjWithStatus(SC.Record.READY);
      currentSub = newObjWithStatus(SC.Record.EMPTY);
      ok(loader.loadResources() === NO, 'loadResources returned NO after a new, not-READY master was set');
      
      setTimeout(function () {
        currentSub.set('status', SC.Record.READY);
        currentSub.set('readyToTest', YES);
      }, 10);
      
      afterPropertyChange(currentSub, 'readyToTest', YES, function () {
        ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after new subordinate resource became READY');
        ok(loadingErrorWasCalled === NO, 'resourceLoadingError was not called after new subordinate resource became READY');
      });
    });  
  });
});


test('completion of a canceled load should not notify loader', function () {
  expect(1);
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  
  loader.loadResources();

  setTimeout(function () {
    loader.cancelLoading();
    setTimeout(function () {
      currentSub.set('status', SC.Record.READY);
      currentSub.set('readyToTest', YES);
    }, 10);
  }, 10);
  
  afterPropertyChange(currentSub, 'readyToTest', YES, function () {
    ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after cancelled resource became READY');
  });
});


test('failure of a canceled load should not notify loader', function () {
  expect(1);
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  
  loader.loadResources();

  setTimeout(function () {
    loader.cancelLoading();
    setTimeout(function () {
      currentSub.set('status', SC.Record.ERROR);
      currentSub.set('readyToTest', YES);
    }, 10);
  }, 10);
  
  afterPropertyChange(currentSub, 'readyToTest', YES, function () {
    ok(loadingErrorWasCalled === NO, 'resourceLoadingError was not called after cancelled resource went into ERROR state');
  });
});


test('completion of a canceled load should not interfere with subsequent load', function () {
  expect(2);
  currentMaster = newObjWithStatus(SC.Record.READY);
  currentSub = newObjWithStatus(SC.Record.EMPTY);
  var oldSub = currentSub;
  
  loader.loadResources();

  setTimeout(function () {
    loader.cancelLoading();
    
    currentMaster = newObjWithStatus(SC.Record.READY);
    currentSub = newObjWithStatus(SC.Record.EMPTY);
    
    loader.loadResources();

    setTimeout(function () {
      oldSub.set('status', SC.Record.READY);
      oldSub.set('readyToTest', YES);
    }, 10);
  }, 10);
  
  afterPropertyChange(oldSub, 'readyToTest', YES, function () {
    ok(didLoadWasCalled === NO, 'resourcesDidLoad was not called after old resource became READY');
    
    setTimeout( function () {
      currentSub.set('status', SC.Record.READY);
      currentSub.set('readyToTest', YES);
    }, 10);
    
    afterPropertyChange(currentSub, 'readyToTest', YES, function () {
      ok(didLoadWasCalled === YES, 'resourcesDidLoad was called after new resource became READY');
    });
  });
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
  expect(3);
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [];

  ok(loadingErrorWasCalled === NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');

  setTimeout(function () {
    master.set('status', SC.Record.ERROR);
    master.set('readyToTest', YES);
  }, 10);

  afterPropertyChange(master, 'readyToTest', YES, function () {
    ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called after master resource transitioned to ERROR.');
  });
});


test('resourceLoadingError should be be called if a subordinate resource transitions to an ERROR state while loading', function () {
  expect(4);
  var sub1 = newObjWithStatus(SC.Record.EMPTY);
  var sub2 = newObjWithStatus(SC.Record.EMPTY);

  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [newResource(sub1), newResource(sub2)];

  ok(loadingErrorWasCalled === NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  ok(loader.loadResources() === NO, 'loadResources returned NO');

  setTimeout(function () {
    sub1.set('status', SC.Record.READY);
    sub1.set('readyToTest', YES);        // make sure to run the afterPropertyChange test *after* status observers finish firing
  }, 10);

  afterPropertyChange(sub1, 'readyToTest', YES, function () {
    ok(loadingErrorWasCalled === NO, 'resourceLoadingError was not called after the first subordinate resource transitioned to READY');

    setTimeout(function () {
      sub2.set('status', SC.Record.ERROR);
      sub2.set('readyToTest', YES);
    }, 10);

    afterPropertyChange(sub2, 'readyToTest', YES, function () {
      ok(loadingErrorWasCalled === YES, 'resourceLoadingError was called after the second subordinate resource transitioned to ERROR.');
    });
  });
});
