// ==========================================================================
// Project:   afterPropertyChange
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals ok equals stop start pushStop popStart */

/*
  afterPropertyChange:

  Use this global function to test asynchronous behavior in Sproutcore by waiting to execute tests until some property
  of a target object reaches a particular value (optionally, simply wait until the first time the property's value
  changes.)

  Use within a QUnit (testRunner) test() function like so:

  test('after myObject.isLoaded becomes YES, myObject.data is defined', function () {
    myObject.load();        // kick off asynchronous load

    afterPropertyChange(myObject, 'isLoaded', YES, function () {
      // this assertion is not tested until myObject.isLoaded becomes YES
      ok(myObject.get('data'), 'myObject.data exists');
    }
  });

  Optionally, you can skip the third ('value') parameter and run the test callback whenever target.property changes
  (or is notified):

  test('after myObject.load is called, myObject.state should transition from LOADING to LOADED', function () {
    myObject.load();       // kick off anychronous load
    equals(myObject.get('state'), 'LOADING', "myObject.state was 'LOADING' immediately after myObject.load()");

    afterPropertyChange(myObject, 'state', function () {       // note the lack of the 'value' parameter
      // this assertion is tested as soon as isLoaded changes, as via set(), or is notified via notifyPropertyChange()
      equals(myObject.get('state'), 'LOADED', "when myObject.state changed, it changed to 'LOADED'");
    }
  });

  You can use this latter pattern to verify 'state transitions' as per the LOADING->LOADED transition above. If
  the asynchronous callback changed myObject.state to anything but LOADED, the test would fail.

  NOTE: If you need to use stop() or start() to run asynchronous tests *within* the afterPropertyChange test
  callback itself, replace these with pushStop() popStart() respectively. afterPropertyChange uses stop() and
  start() internally and QUnit does not like nested calls to stop() and start().

  NOTE: afterPropertyChange() always has to be called from within a test()

*/

(function (undefined) {

  var nStops = 0;

  function pushStop(t) {
    if (nStops === 0) stop(t);
    nStops++;
  }

  function popStart() {
    --nStops;
    if (nStops === 0) start();
    if (nStops < 0) throw 'afterPropertyChange: popped too many starts';
  }

  function afterPropertyChange(target, property, value, testFn) {
    if (target && target.addObserver) {
      // give a healthy 10s timeout to discourage anyone from depending on a timeout to signal failure
      pushStop(10000);
    }
    else {
      ok(false, 'afterPropertyChange: target is empty or does not have addObserver method.');
      throw 'afterPropertyChange: target is empty or does not have addObserver method';
    }

    // Allow alternate usage where the test proceeds as soon as the target.property changes to anything
    // For the sake of the readability of test cases, testFn should always be the last argument.

    if (testFn === undefined) {
      testFn = value;
      value = undefined;
    }
    if (!testFn) ok(false, 'afterPropertyChange: testFn is undefined.');

    function observer() {
      // if a value is specified, do not proceed until the property attains that value
      if (value !== undefined && target.get(property) !== value) return;

      target.removeObserver(property, observer);
      try {
        testFn();
      }
      catch (e) {
        CoreTest.plan.error('Error during afterPropertyChange! See console log for details: ', e);
        console.error(e);
        popStart();
        return;
      }
      popStart();
    }
    target.addObserver(property, observer);

    // If a value is specified, check immediately to see if the property already has the specified value
    if (value !== undefined) observer();
  }

  // publish the functions above to the global namespace (this is acceptable in test runner)
  window.pushStop = pushStop;
  window.popStart = popStart;
  window.afterPropertyChange = afterPropertyChange;
}());
