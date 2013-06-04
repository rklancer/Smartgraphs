// ==========================================================================
// Project:   Smartgraphs test setup/teardown helpers
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals SC Smartgraphs */

var setup = {};
var teardown = {};

(function (undefined) {
  var savedStore;
  var savedFixtures = {};
  var savedMethods = {};

  setup.fixtures = function (recordType, fixtures) {
    var recordTypeKey = SC.guidFor(recordType);

    savedFixtures[recordTypeKey] = {
      recordType: recordType,
      fixtures: recordType.FIXTURES
    };

    recordType.FIXTURES = fixtures;
  };

  setup.store = function () {
    savedStore = Smartgraphs.store;
    Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
  };

  teardown.store = function () {
    var recordType, fixtures;

    for (var key in savedFixtures) {
      if (!savedFixtures.hasOwnProperty(key)) continue;

      recordType = savedFixtures[key].recordType;
      recordType.FIXTURES = savedFixtures[key].fixtures;
    }

    if (savedStore) Smartgraphs.set('store', savedStore);
    savedStore = null;
    savedFixtures = {};
  };

  setup.mock = function (object, methodName, mock) {
    var objectKey = SC.guidFor(object);

    if (!savedMethods[objectKey]) savedMethods[objectKey] = {};

    savedMethods[objectKey][methodName] = {
      object: object,
      method: object[methodName]
    };

    if (mock !== undefined) object[methodName] = mock;
  };

  teardown.mocks = function () {
    var object, objectMethods;

    for (var objectKey in savedMethods) {
      if (!savedMethods.hasOwnProperty(objectKey)) continue;

      objectMethods = savedMethods[objectKey];

      for (var methodName in objectMethods) {
        if (!objectMethods.hasOwnProperty(methodName)) continue;

        object = objectMethods[methodName].object;
        object[methodName] = objectMethods[methodName].method;
      }
    }

    savedMethods = {};
  };

  teardown.all = function () {
    teardown.mocks();
    teardown.store();
  };

}());
