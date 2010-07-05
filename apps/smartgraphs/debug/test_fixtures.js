/*globals Raclette */      // make jslint happy
var setupFixtures = function () {
  
    Raclette.Activity.FIXTURES = [
      { guid: 1,
        title: 'Wheels of Cheese',
        questions: [1,2]
      },
      
      { guid: 2,
        title: 'Better than Fondue?',
        questions: []
      }
    ];
    
    Raclette.Activity.nextGuid = 3;
    
    Raclette.Question.FIXTURES = [{
        guid: 1,
        prompt: "What color is the sky?",
        activity: 1
      },
      {
        guid: 2,
        prompt: "What color is dirt?",
        activity: 1
    }];

    Raclette.Question.nextGuid = 3;

    // SC.Record.fixtures is a singleton FixturesDataSource. Even if we create a new store from SC.Record.fixtures
    // we see stale fixture data in the store from previous tests which modified the data cache in SC.Record.fixtures.
    // We can avoid that problem by creating a wholly new data source begind the store, which must read the FIXTURE 
    // hashes defined above to satisfy fetches for those record types.
    
    Raclette.set("store",SC.Store.create().from(SC.FixturesDataSource.create()));
};
