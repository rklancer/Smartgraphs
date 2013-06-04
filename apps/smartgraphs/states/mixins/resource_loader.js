// ==========================================================================
// Project:   Smartgraphs.ResourceLoader
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// Common functionality for application states that need to load a resource and its subordinate resources
// before proceeding.

Smartgraphs.ResourceLoader = {

  loadResources: function () {
    var subs = this.get('subordinateResources');
    for (var i = 0, ii = subs.get('length'); i < ii; i++) {
      subs[i].record = null;
    }

    var master = this.get('masterResource');
    master.record = master.load(this);

    this._watchedRecords = [];
    this.watch(master.record);

    return this.checkResourceStatuses();
  },

  watch: function (recordOrRecordArray) {
    this._watchedRecords.push(recordOrRecordArray);
    recordOrRecordArray.addObserver('status', this, this.checkResourceStatuses);
  },

  checkResourceStatuses: function () {
    var masterStatus = this.get('masterResource').record.get('status');

    if (masterStatus & SC.Record.READY) {
      return this.checkSubordinateResources();
    }
    else {
      if (masterStatus & SC.Record.ERROR) {
        this.cleanupLoading();
        if (this.resourceLoadingError) this.resourceLoadingError();
        return YES;
      }
      return NO; // not ready and not in error -> need to keep checking
    }
  },

  checkSubordinateResources: function () {
    var resource, subs = this.get('subordinateResources');

    for (var i = 0, ii = subs.get('length'); i < ii; i++) {
      resource = subs[i];
      if (resource.record === null) {
        resource.record = resource.load(this);
        this.watch(resource.record);
      }
    }

    if (this.subordinateResourcesAreReady()) {
      this.cleanupLoading();
      this.resourcesDidLoad();
      return YES;
    }

    if (this.subordinateResourcesHaveErrors()) {
      this.cleanupLoading();
      if (this.resourceLoadingError) this.resourceLoadingError();
      return YES;
    }

    return NO;
  },

  cleanupLoading: function () {
    this._watchedRecords.forEach( function (recordOrRecordArray) {
      recordOrRecordArray.removeObserver('status', this, this.checkResourceStatuses);
    }, this);
    this._watchedRecords = [];
  },

  subordinateResourcesAreReady: function () {
    var resources = this.get('subordinateResources');

    for (var i = 0, ii = resources.get('length'); i < ii; i++) {
      if (resources[i].record === null || !(resources[i].record.get('status') & SC.Record.READY)) {
        return NO;
      }
    }
    return YES;
  },

  subordinateResourcesHaveErrors: function () {
    var resources = this.get('subordinateResources');

    for (var i = 0, ii = resources.get('length'); i < ii; i++) {
      if (resources[i].record && (resources[i].record.get('status') & SC.Record.ERROR)) {
        return YES;
      }
    }
    return NO;
  },

  cancelLoading: function () {
    this.cleanupLoading();
  }
};
