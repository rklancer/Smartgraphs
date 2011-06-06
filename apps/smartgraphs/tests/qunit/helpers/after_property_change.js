// ==========================================================================
// Project:   afterPropertyChange unit test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals module test ok equals same afterPropertyChange*/

var obj;

module("afterPropertyChange", {
  setup: function () {
    obj = SC.Object.create({testProp: 0});
  }
});


test('afterPropertyChange should call the test function once after setting the test property to a new value.', function () {
  expect(1);    // expect 1 assertion, i.e., fail the test unless the afterPropertyChange really does call ok()

  setTimeout(function () {
    obj.set('testProp', 1);
  }, 100);

  afterPropertyChange(obj, 'testProp', function () {
    ok(true, 'afterPropertyChange called the test function');
  });
});


test("afterPropertyChange should indicate the error when the callback throws an exception", function () {
  expect(1);
  var oldError = CoreTest.plan.error;
  var errorWasCalled = false;

  CoreTest.plan.error = function () {
    errorWasCalled = true;
  };

  afterPropertyChange(obj, 'testProp', function () {
    null.get("this won't work!");
  });

  setTimeout(function () {
    obj.set('testProp', 1);
    CoreTest.plan.error = oldError;
    ok(errorWasCalled, "The error in the afterPropertyChange resulted in a call CoreTest.plan.error()");
  }, 100);
});


test("afterPropertyChange should handle afterPropertyChange calls nested within the test callback", function () {
  expect(4);

  setTimeout(function () {
    ok(true, 'afterPropertyChange called the first test function');
    obj.set('testProp', 1);
  }, 100);

  afterPropertyChange(obj, 'testProp', function () {
    ok(true, 'the test function called the nested afterPropertyChange definition');

    setTimeout(function () {
      ok(true, 'the nested afterPropertyChange timeout fired');
      obj.set('testProp', 2);
    }, 100);

    afterPropertyChange(obj, 'testProp', function () {
      ok(true, 'the nested afterPropertyChange test function was called');
    });
  });
});


test("afterPropertyChange should handle exceptions without failing to call nested afterPropertyChange", function () {
  expect(7);

  var oldError, errorWasCalled;

  var getNumObservers = function () {
    return obj._kvo_observers_testProp ? obj._kvo_observers_testProp.getMembers().length : 0;
  };
  var nObservers = getNumObservers();

  setTimeout(function () {
    ok(true, 'outer timeout was called');       // 1
    obj.set('testProp', 1);

    CoreTest.plan.error = oldError;

    ok(errorWasCalled,                          // 2
      "The fake exception in the callback of the outer afterPropertyChange should result in a call to " +
      "CoreTest.plan.error()");
  }, 100);

  afterPropertyChange(obj, 'testProp', function () {
    ok(true, 'outer afterPropertyChange callback was called');          // 3

    // the nested afterPropertyChange follows:
    setTimeout(function () {
      ok(true, 'inner timeout was called');     // 4
      obj.set('testProp', 2);

      equals(getNumObservers(), nObservers,     // 5
        "after the inner afterPropertyChange callback, 'obj' should have no net change in the number of " +
        "observers (even though the outer callback threw an exception)");
    }, 100);

    afterPropertyChange(obj, 'testProp', function () {
      ok(true,                                  // 6
        'inner afterPropertyChange callback was called despite exception in outer afterPropertyChange callback');
    });

    // once the nested callbacks are defined, throw an exception to see how afterPropertyChange handles it
    throw 'fake exception for testing purposes';
  });

  // remember that the following executes before the callbacks above:
  equals(getNumObservers(), nObservers + 1,     // 7
    "'obj' should have one more observer immediately after the outer afterPropertyChange() is called to set " +
    "the callback");

  oldError = CoreTest.plan.error;
  errorWasCalled = false;
  CoreTest.plan.error = function () {     // you really want to rewrite this LAST
    errorWasCalled = true;
  };
});


test('afterPropertyChange should not call the test function after the first time it is called', function () {
  expect(1);    // expect 1 assertion, i.e., fail the test if the test function (which calls ok()) is called twice

  setTimeout(function () {
    obj.set('testProp', 1);
    obj.notifyPropertyChange('testProp');
  }, 100);

  afterPropertyChange(obj, 'testProp', function () {
    ok(true, 'afterPropertyChange called the test function');
  });
});


test('afterPropertyChange should not call the test function until the specified value is reached', function () {
  expect(1);

  obj.set('testProp', 0);
  setTimeout(function () {
    obj.set('testProp', 1);
    setTimeout(function () {
      obj.set('testProp', 2);
    }, 100);
  }, 100);

  afterPropertyChange(obj, 'testProp', 2, function () {
    equals(obj.get('testProp'), 2, 'afterPropertyChange called the test function when the testProp == 2');
  });
});


test('afterPropertyChange should call the test function immediately if the property already has the specified value', function () {
  obj.set('testProp', 3);

  afterPropertyChange(obj, 'testProp', 3, function () {
    ok(true, 'afterPropertyChange called the test function without waiting');
  });
});

// TODO: explicit tests for using popStart and pushStop within an afterPropertyChange callback?
