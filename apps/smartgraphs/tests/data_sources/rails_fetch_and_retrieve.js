// ==========================================================================
// you can run these tests directly here:
//
// http://localhost:4020/smartgraphs/en/current/tests/models/guide_page_sequence.html
//
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start statusEquals statusNotify statusQueue testAfterPropertyChange */

// { setup: store: SC.Store.create().from('Smartgraphs.RailsDataSource') }

module("Smartgraphs.RailsDataSource_fetch_and_retrieve", { 
  setup: function() {
    // SC.Logger.log("Calling sc_require('data_sources/rails');");
    // used to call sc re quire('data_sources/rails');
    SC.Logger.log('Loading this.store = SC.Application.create');
    this.store = SC.Store.create().from('Smartgraphs.RailsDataSource');
    SC.Logger.log('this.store:', this.store);
    SC.Logger.log("Smartgraphs.set('store', this.store); ");
    Smartgraphs.set('store', this.store); 
  }
});

// NOTE: 
test("does the source that core.js associates with Smartgraphs store exists", function() {
  // setup a spy
  var fetchCalled = false;
  var railsDataSource = this.store._getDataSource();
  ok(railsDataSource, 'Should have succeeded getting railsDataSource from store.');
  // reassign fetch prop to new function
  railsDataSource.fetch = function() {
    fetchCalled = true;
  };
  var guide_page_sequences = Smartgraphs.store.find(Smartgraphs.GUIDEPAGESEQUENCE_QUERY);
  ok(guide_page_sequences instanceof SC.RecordArray, 'guide_page_sequences should be a SC.RecordArray');
  ok(fetchCalled, 'the fetch method was called which means our Rails datasource is being called');
});

test("do we get guide_page_sequences back from rails", function() {
  var guide_page_sequences = Smartgraphs.store.find(Smartgraphs.GUIDEPAGESEQUENCE_QUERY);
  statusEquals(guide_page_sequences, SC.Record.BUSY_LOADING, 'guide_page_sequences should be loading');
  
  statusQueue([
    { target: guide_page_sequences,
      callback: function(){
        statusEquals(guide_page_sequences, SC.Record.READY_CLEAN, "Next state was clean");
        ok(guide_page_sequences.get('length') > 0, 'we should have at least one guide_page_sequence after the guide_page_sequences become "clean"');        
      }      
    }
  ]);
});

test("does the first guide_page_sequence returned have dialogTurns", function() {
  var guide_page_sequences = Smartgraphs.store.find(Smartgraphs.GUIDEPAGESEQUENCE_QUERY);
  
  statusQueue([
    { target: guide_page_sequences,
      callback: function(){
        var firstGuidePage = guide_page_sequences.objectAt(0);
        var firstDialogTurn = firstGuidePage.get('firstDialogTurn');
        ok(firstDialogTurn, 'we should have the firstDialogTurn');        
      }
    }
  ]);  
});

test("verify retrieveRecord is called when first related object is requested", function() {
  // setup a spy
   var retrieveCalledFor = null;
   var railsDataSource = this.store._getDataSource();
   // reassign fetch prop to new function
   railsDataSource.retrieveRecord = function(store, storeKey) {
     retrieveCalledFor = store.recordTypeFor(storeKey);
   };
  
  var guide_page_sequences = Smartgraphs.store.find(Smartgraphs.GUIDEPAGESEQUENCE_QUERY);
  
  statusQueue([
    { target: guide_page_sequences,
      callback: function(){
        var firstGuidePage = guide_page_sequences.objectAt(0);
        var dialogTurns = firstGuidePage.get('dialogTurns');
      
        SC.RunLoop.begin();
        SC.RunLoop.end();
        equals(retrieveCalledFor, null, "retrieve should still not have been called on the dialogTurns");
      
        var firstQuestion = dialogTurns.objectAt(0);
      
        equals(retrieveCalledFor, Smartgraphs.Question, "retrieve should have been called when we ask for the first dialogTurn, before the run loop");
      }
    }
  ]); 
});

test("does retrieveRecord work for dialogTurns", function() {
  var dialogTurn = Smartgraphs.store.find(Smartgraphs.DialogTurn, '/rails/dialog_turns/1');
  ok(dialogTurn !==  null, "dialogTurn should not be null");
  
  statusQueue([
    { target: dialogTurn,
      callback: function(){
          statusEquals(dialogTurn, SC.Record.READY_CLEAN, "dialogTurn's status is READY_CLEAN");

          var beforeText = dialogTurn.get('beforeText');
          ok(beforeText !== null, 'The first dialogTurn has a beforeText: '+beforeText);
      }
    }
  ]);
});


test("does the first guide_page_sequence returned have a valid firstDialogTurn with beforeText", function () {

  var guide_page_sequences = Smartgraphs.store.find(Smartgraphs.GUIDEPAGESEQUENCE_QUERY);
  var firstQuestion;
  
  testAfterPropertyChange(guide_page_sequences, 'status', function () {        
    statusEquals(guide_page_sequences, SC.Record.READY_CLEAN, "guide_page_sequences's status is READY_CLEAN");

    var firstGuidePage = guide_page_sequences.objectAt(0);
    ok(firstGuidePage !== null, "We have a first guide_page_sequence");

    var firstDialogTurn = firstGuidePage.get('firstDialogTurn');
    ok(firstDialogTurn, 'we should have the firstDialogTurn');        

    testAfterPropertyChange(firstQuestion, 'status', function () {
      statusEquals(firstQuestion, SC.Record.READY_CLEAN, "dialogTurn's status is READY_CLEAN");
      ok(firstDialogTurn.get('beforeText'), "first dialogTurn has a valid beforeText");
    });
  });
});
