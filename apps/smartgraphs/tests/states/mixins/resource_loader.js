// ==========================================================================
// Project:   Smartgraphs.ResourceLoader Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.ResourceLoader");

// TODO write these tests:

// loadResources should return YES if master & subordinate resources are READY
// resourceDidLoad should be called if all resources are READY when loadResources is called

// loadResources should return NO if master resource is not READY
// loadResources should return NO if any subordinate resource is not READY
// resourceDidLoad should not be called if some resources are not ready when loadResources is called

// resourceLoadingError should be called if the master resource has an ERROR
// resourceLoadingError should be called if at least one subordinate resource has an ERROR

// checkResourceStatuses should return YES if resourceLoadingError or resourceDidLoad is called
// checkResourceStatuses should return NO if neither resourceLoadingError nor resourceDidLoad is called

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
//   the new masterResource can result in success (calling resourceDidLoad);

// after one masterResource is loaded and cancelLoading is called while it is still BUSY:
//   no callbacks are called!
//   while the record is still BUSY: 
//     calling loadResources after setting a new masterResource that is already loaded returns YES and resourceDidLoad is called
//  while the record is still BUSY:
//     calling loadResources after setting a new masterResource that is already in ERROR returns YES and resourceLoadingError is called
//  after the record has loaded:
//    calling loadResources after setting a new masterResource that isn't loaded returns NO
//    the new record can successfully load after a time (calling resourceDidLoad)
