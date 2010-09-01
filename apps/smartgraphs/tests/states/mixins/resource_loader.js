// ==========================================================================
// Project:   Smartgraphs.ResourceLoader Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start afterPropertyChange */

function newObjWithStatus(status) {
  return SC.Object.create({ status: status });
}

function newResource(obj) {
  return {
    load: function () { return obj; }
  };
}

function newResourceWithStatus(status) {
  return newResource(newObjWithStatus(status)); 
}

var loader;
var didLoadWasCalled;
var loadingErrorWasCalled;

module("Smartgraphs.ResourceLoader.loadResources() READY tests", {
  setup: function () {
    didLoadWasCalled = NO;
    
    loader = SC.Object.create(Smartgraphs.ResourceLoader, {
      resourcesDidLoad: function () {
        didLoadWasCalled = YES;
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
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), YES, 'loadResources returned YES');
  equals(didLoadWasCalled, YES, 'resourcesDidLoad was called.');
});


test('loadResources should return YES and should call resourcesDidLoad if master & subordinate resources are READY', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY), 
    newResourceWithStatus(SC.Record.READY)
  ];
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), YES, 'loadResources returned YES');
  equals(didLoadWasCalled, YES, 'resourcesDidLoad was called.');
});


test('loadResources should return YES and should call resourcesDidLoad if master & subordinate resources are a combination of READY states', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY_DIRTY);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY_CLEAN),
    newResourceWithStatus(SC.Record.READY_NEW)
  ];
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), YES, 'loadResources returned YES');
  equals(didLoadWasCalled, YES, 'resourcesDidLoad was called.');
});


test('loadResources should return NO and should not call resourcesDidLoad if master resource is not READY', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.BUSY);
  loader.subordinateResources = [];
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), NO, 'loadResources returned NO');
  equals(didLoadWasCalled, NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');
});


test('loadResources should return NO and should not call resourcesDidLoad and if master resource is READY but some subordinate resource is not READY', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.BUSY),
    newResourceWithStatus(SC.Record.READY)
  ];
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), NO, 'loadResources returned NO');
  equals(didLoadWasCalled, NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO).');
});


test('resourcesDidLoad should be called after master resource transitions to READY state', function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [];
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), NO, 'loadResources returned NO');
  equals(didLoadWasCalled, NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO) after loadResources was called.');
  
  setTimeout(function () {
    master.set('status', SC.Record.READY);
    master.set('readyToTest', YES);
  }, 10);
  
  afterPropertyChange(master, 'readyToTest', YES, function () {
    equals(didLoadWasCalled, YES, 'resourcesDidLoad was called after record transitioned to READY');
  });
});


test('resourcesDidLoad should be called after master transitions to READY if subordinate resources are READY', function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY), 
    newResourceWithStatus(SC.Record.READY)
  ];
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), NO, 'loadResources returned NO');
  equals(didLoadWasCalled, NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO) after loadResources was called.');
  
  setTimeout(function () {
    master.set('status', SC.Record.READY);
    master.set('readyToTest', YES);
  }, 10);
  
  afterPropertyChange(master, 'readyToTest', YES, function () {
    equals(didLoadWasCalled, YES, 'resourcesDidLoad was called after record transitioned to READY');
  });
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
  
  equals(didLoadWasCalled, NO, 'didLoadWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), NO, 'loadResources returned NO');
  equals(didLoadWasCalled, NO, 'resourcesDidLoad was not called (didLoadWasCalled = NO) after loadResources was called.');
  
  setTimeout(function () {
    master.set('status', SC.Record.READY);
    master.set('readyToTest', YES);
  }, 10);
  
  afterPropertyChange(master, 'readyToTest', YES, function () {
    equals(didLoadWasCalled, NO, 'resourcesDidLoad was not called after master record transitioned to READY');
    
    setTimeout(function () {
      sub1.set('status', SC.Record.READY);
      sub1.set('readyToTest', YES);
    }, 10);
    
    afterPropertyChange(sub1, 'readyToTest', YES, function () {
      equals(didLoadWasCalled, NO, 'resourcesDidLoad was not called after first subordinate record transitioned to READY');
    
      setTimeout(function () {
        sub2.set('status', SC.Record.READY);
        sub2.set('readyToTest', YES);
      }, 100);
      
      afterPropertyChange(sub2, 'readyToTest', YES, function () {
        equals(didLoadWasCalled, YES, 'resourcesDidLoad was called after second subordinate resource transitioned to READY');
      });
    });
  });
});


module("Smartgraphs.ResourceLoader.loadResources() ERROR tests", {
  setup: function () {
    loadingErrorWasCalled = NO;
    
    loader = SC.Object.create(Smartgraphs.ResourceLoader, {
      resourcesDidLoad: function () {
        ok(false, "resourcesDidLoad was called when it shouldn't have been.");
      },
      
      resourceLoadingError: function () {
        loadingErrorWasCalled = YES;
      }
    });
  }
});


test('loadResources should return YES and should call resourceLoadingError if the master resource is in the ERROR state', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.ERROR);
  loader.subordinateResources = [];
  
  equals(loadingErrorWasCalled, NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), YES, 'loadResources returned YES');
  equals(loadingErrorWasCalled, YES, 'resourceLoadingError was called');
});


test('loadResources should return YES and should call resourceLoadingError if the master resource is READY but some subordinate resource is in the ERROR state', function () {
  loader.masterResource = newResourceWithStatus(SC.Record.READY_CLEAN);
  loader.subordinateResources = [
    newResourceWithStatus(SC.Record.READY_CLEAN),
    newResourceWithStatus(SC.Record.ERROR)
  ];
  
  equals(loadingErrorWasCalled, NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), YES, 'loadResources returned YES');
  equals(loadingErrorWasCalled, YES, 'resourceLoadingError was called');
});


test('resourceLoadingError should be be called if the master resource transitions to an ERROR state while loading', function () {
  var master = newObjWithStatus(SC.Record.EMPTY);
  loader.masterResource = newResource(master);
  loader.subordinateResources = [];
  
  equals(loadingErrorWasCalled, NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), NO, 'loadResources returned NO');
  
  setTimeout(function () {
    master.set('status', SC.Record.ERROR);
    master.set('readyToTest', YES);
  }, 10);
  
  afterPropertyChange(master, 'readyToTest', YES, function () {
    equals(loadingErrorWasCalled, YES, 'resourceLoadingError was called.');
  });
});


test('resourceLoadingError should be be called if a subordinate resource transitions to an ERROR state while loading', function () {
  var sub1 = newObjWithStatus(SC.Record.EMPTY);
  var sub2 = newObjWithStatus(SC.Record.EMPTY);
  
  loader.masterResource = newResourceWithStatus(SC.Record.READY);
  loader.subordinateResources = [newResource(sub1), newResource(sub2)];
  
  equals(loadingErrorWasCalled, NO, 'loadingErrorWasCalled was NO before loadResources was called.');
  equals(loader.loadResources(), NO, 'loadResources returned NO');
  
  setTimeout(function () {
    sub1.set('status', SC.Record.READY);
    sub1.set('readyToTest', YES);        // make sure to run the afterPropertyChange test *after* status observers finish firing
  }, 10);
  
  afterPropertyChange(sub1, 'readyToTest', YES, function () {
    equals(loadingErrorWasCalled, NO, 'resourceLoadingError was not called after the first subordinate resource transitioned to READY');
    
    setTimeout(function () {
      sub2.set('status', SC.Record.ERROR);
      sub2.set('readyToTest', YES);
    }, 10);
    
    afterPropertyChange(sub2, 'readyToTest', YES, function () {
      equals(loadingErrorWasCalled, YES, 'resourceLoadingError was called after the second subordinate resource transitioned to ERROR.');
    });
  });
});


// checkResourceStatuses should return YES if resourceLoadingError or resourcedidLoadWasCalled is called
// checkResourceStatuses should return NO if neither resourceLoadingError nor resourcedidLoadWasCalled is called

// load method of resource hashes should be passed the correct 'this' value
// when cleanupLoading is called, removeObserver should be called once for every addObserver that was called

// cleanupLoading is called whenever checkResourceStatuses returns YES

// (note offer cancelLoading for use by willLoseFirstResponder.)

// after cleanupLoading is called, 'record' value of masterResource is null
// after cleanupLoading is called, 'record' value of subordinateResources is null

// after one masterResource is laoded and results in success:
//   calling loadResources after setting a new masterResource returns NO
//   the new masterResource can error on load (calling resourceLoadingError);

// after one masterResource is loaded and results in an error:
//   calling loadResources after setting a new masterResource returns NO
//   the new masterResource can result in success (calling resourcedidLoadWasCalled);

// after one masterResource is loaded and cancelLoading is called while it is still BUSY:
//   no callbacks are called!
//   while the record is still BUSY: 
//     calling loadResources after setting a new masterResource that is already loaded returns YES and resourcedidLoadWasCalled is called
//  while the record is still BUSY:
//     calling loadResources after setting a new masterResource that is already in ERROR returns YES and resourceLoadingError is called
//  after the record has loaded:
//    calling loadResources after setting a new masterResource that isn't loaded returns NO
//    the new record can successfully load after a time (calling resourcedidLoadWasCalled)
