// ==========================================================================
// Project:   Unit test of Smartgraphs test setup/teardown helpers
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same setup teardown*/

var namespace, innerMethodWasCalled, outerMethodWasCalled, siblingMethodWasCalled;

module("Test-setup and teardown mocking helpers", {
  setup: function () {
    innerMethodWasCalled = NO;
    outerMethodWasCalled = NO;
    siblingMethodWasCalled = NO;
    
    namespace = SC.Object.create({

      inner: SC.Object.create({
        innerMethod: function () {
          innerMethodWasCalled = YES;
        }
      }),
      
      outerMethod: function () {
        outerMethodWasCalled = YES;
      },
      
      siblingMethod: function () {
        siblingMethodWasCalled = YES;
      }
    });
  }
});
   
test("setup.mock() should replace the method, if specified, and it should be restored by teardown.mocks()", function () {
  
  var mockInnerMethodWasCalled = NO,
      mockOuterMethodWasCalled = NO;
  
  setup.mock(namespace.inner, 'innerMethod', function () {
    mockInnerMethodWasCalled = YES;
  });
  
  namespace.inner.innerMethod();
  namespace.outerMethod();
  
  ok( mockInnerMethodWasCalled, "namespace.inner.innerMethod() should have called the mocked inner method");
  ok( !innerMethodWasCalled, "namespace.inner.innerMethod() should not have called the real inner method");
  ok( outerMethodWasCalled, "setup.mock() should not have interfered with outer method");
  
  outerMethodWasCalled = NO;

  setup.mock(namespace, 'outerMethod', function () {
    mockOuterMethodWasCalled = YES;
  });
  
  mockInnerMethodWasCalled = NO;
  
  namespace.inner.innerMethod();
  namespace.outerMethod();
  namespace.siblingMethod();
  
  ok( mockOuterMethodWasCalled, "namespace.outerMethod() should have called the mocked outer method");
  ok( !outerMethodWasCalled, "namespace.outerMethod() should not have called the real outer method");
  ok( mockInnerMethodWasCalled, "setup.mock() should not have interfered with mocked inner method");
  ok( siblingMethodWasCalled, "mocking of namespace.outerMethod() should not interfere with sibling method");
  
  teardown.mocks();
  
  mockInnerMethodWasCalled = NO;
  innerMethodWasCalled = NO;
  outerMethodWasCalled = NO;
  namespace.inner.innerMethod();
  
  ok( !mockInnerMethodWasCalled, "after teardown.mocks(), namespace.inner.innerMethod() should not have called the mocked inner method");
  ok( innerMethodWasCalled, "after teardown.mocks(), namespace.inner.innerMethod() should have called the original inner method");
  ok( !outerMethodWasCalled, "after teardown.mocks(), namespace.inner.innerMethod() should not accidentally call outer method");
  
  mockInnerMethodWasCalled = NO;
  mockOuterMethodWasCalled = NO;
  innerMethodWasCalled = NO;
  outerMethodWasCalled = NO;
  siblingMethodWasCalled = NO;
  
  namespace.outerMethod();
  
  ok( !mockOuterMethodWasCalled, "after teardown.mocks(), namespace.outerMethod() should not have called the mocked outer method");
  ok( outerMethodWasCalled, "after teardown.mocks(), namespace.outerMethod() should have called the original outer method");
  ok( !innerMethodWasCalled, "after teardown.mocks(), namespace.outerMethod() should not accidentally call inner method");
  ok( !siblingMethodWasCalled, "unmocking of namespace.outerMethod() should not accidentally replace sibling method");
  
  namespace.siblingMethod();
  
  ok( siblingMethodWasCalled, "unmocking of namespace.outerMethod() should not interfere with sibling method");
});


test("setup.mock() should simply back up the specified method if no substitute is passed", function () {
  
  var mockInnerMethodWasCalled;
  
  setup.mock(namespace.inner, 'innerMethod');
  namespace.inner.innerMethod();
  ok( innerMethodWasCalled, "namespace.inner.innerMethod() should have called the original inner method since no substitute was provided");
  
  namespace.inner.innerMethod = function () {
    mockInnerMethodWasCalled = YES;
  };
  
  innerMethodWasCalled = NO;
  
  namespace.inner.innerMethod();
  ok( mockInnerMethodWasCalled && !innerMethodWasCalled, "namespace.inner.innerMethod() should have called hand-mocked inner method");
  
  teardown.mocks();
  
  mockInnerMethodWasCalled = NO;
  innerMethodWasCalled = NO;
  
  namespace.inner.innerMethod();
  ok( innerMethodWasCalled && !mockInnerMethodWasCalled, "after teardown.mocks() namespace.inner.innerMethod() should have called the original inner method");
});


test("repeated calls to teardown.mocks() should only reset the mocked methods once", function () {
  
  var officialMockWasCalled = NO;
  var adHocMockWasCalled = NO;
  
  setup.mock(namespace, 'outerMethod', function () {
    officialMockWasCalled = YES;
  });

  namespace.outerMethod();
  
  ok( officialMockWasCalled, "after mock, namespace.outerMethod should have called the mocked outer method");
  
  teardown.mocks();
  
  officialMockWasCalled = NO;
  
  namespace.outerMethod();
  
  ok( outerMethodWasCalled, "after unmocking, namespace.outerMethod should have called the original outer method");
  
  namespace.outerMethod = function () {
    adHocMockWasCalled = YES;
  };
  
  teardown.mocks();
  
  outerMethodWasCalled = NO;
  
  namespace.outerMethod();
  
  ok( adHocMockWasCalled, "repeated call to teardown.mocks() should not replace subsequent, ad-hoc mock of outerMethod");
  ok( !outerMethodWasCalled, "repeated call to teardown.mocks() should not result in namespace.outerMethod() callng restored, original outerMethod");
});


var firstRecordType, secondRecordType;
var savedStore;

module("Test-setup and teardown fixtures and store helpers", {
  setup: function () {
    firstRecordType = SC.Record.extend({
      source: SC.Record.attr(String)    
    });

    firstRecordType.FIXTURES = [
      { guid: 'record1',
        source: 'original' }
    ];
    
    secondRecordType = SC.Record.extend({
      source: SC.Record.attr(String)    
    });
    
    secondRecordType.FIXTURES = [
      { guid: 'record2',
        source: 'original' }
    ];

    savedStore = Smartgraphs.store;
    Smartgraphs.store = SC.Store.create().from(SC.FixturesDataSource.create());
  },
  
  teardown: function () {
    Smartgraphs.store = savedStore;
  }
});


test("setup.fixtures() followed by setup.store() should create alternate datastore, which should be restored by teardown.store()", function () {

  var rec = Smartgraphs.store.find(firstRecordType, 'record1');
  equals(rec.get('source'), 'original', "Store should return original record before fixtures or store are replaced");

  setup.fixtures(firstRecordType, [
    { guid: 'record1',
      source: 'test fixtures' }
  ]);
  
  setup.store();
  
  rec = Smartgraphs.store.find(firstRecordType, 'record1');
  equals(rec.get('source'), 'test fixtures', "Store should return test-fixtures record for firstRecordType request after firstRecordType fixtures & store are replaced");
  
  rec = Smartgraphs.store.find(secondRecordType, 'record2');
  equals(rec.get('source'), 'original', "Store should return original record for secondRecordType request after store is replaced");
  
  teardown.store();

  rec = Smartgraphs.store.find(firstRecordType, 'record1');
  equals(rec.get('source'), 'original', "Store should return original record for firstRecordType request after teardown.store()");
});


test("setup.fixtures() should restore the record type's original FIXTURES property after mocking it", function () {

  var originalFixtures = SC.copy(firstRecordType.FIXTURES, true);  // deep copy to confirm FIXTURES wasn't messed with
  var newFixtures = [
    { guid: 'record1',
      source: 'test fixtures' }
  ];
  
  setup.fixtures(firstRecordType, newFixtures);
  setup.store();
  equals(firstRecordType.FIXTURES, newFixtures, "firstRecordType.FIXTURES are the newFixtures after setup.store");

  teardown.store();
  equals( firstRecordType.FIXTURES.length, 1, "firstRecordType.FIXTURES should have 1 element after teardown.store()");
  same( firstRecordType.FIXTURES[0], originalFixtures[0], "firstRecordType.FIXTURES[0] should be exactly as it was before setup.fixtures()");
});


test("repeated calls to teardown.store() should not overwrite store", function () {
  var originalStore = Smartgraphs.store;
  
  setup.store();
  
  ok( Smartgraphs.store !== originalStore, "After setup.store(), original store should have been replaced with a new store");
  
  teardown.store();
  
  ok( Smartgraphs.store === originalStore, "After teardown.store(), original store should have been restored");
  
  teardown.store();
  
  ok( Smartgraphs.store === originalStore, "After repeated call to teardown.store(), application store should still be the original store");
});


test("teardown.all() tears down store and mocks", function () {
  
  var savedTeardownMocks = teardown.mocks;
  var teardownMocksWasCalled = NO;
  
  teardown.mocks = function () {
    teardownMocksWasCalled = YES;
  };
  
  var savedTeardownStore = teardown.store;
  var teardownStoreWasCalled = NO;
  
  teardown.store = function () {
    teardownStoreWasCalled = YES;
  };
  
  teardown.all();
  
  ok( teardownMocksWasCalled, "teardown.all() should have called teardown.mocks()");
  ok( teardownStoreWasCalled, "teardown.all() should have called teardown.store()");
});
