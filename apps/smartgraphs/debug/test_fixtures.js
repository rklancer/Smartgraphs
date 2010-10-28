/*globals Smartgraphs */

function setupUserAndSessionFixtures() {
  Smartgraphs.User.oldFixtures = Smartgraphs.User.FIXTURES;
  Smartgraphs.User.FIXTURES = [
    { guid: 'default',
      userId: 'anonymous',
      name: 'Anonymous User',
      sessions: []
    }
  ];

  Smartgraphs.Session.oldFixtures = Smartgraphs.Session.FIXTURES;  
  Smartgraphs.Session.FIXTURES = [
    { guid: 'empty-session',
      user: null,
      steps: []
    }
  ];
}

function restoreUserAndSessionFixtures() {
  Smartgraphs.User.FIXTURES = Smartgraphs.User.oldFixtures;
  Smartgraphs.Session.FIXTURES = Smartgraphs.Session.oldFixtures;
}

function newSession() {
  Smartgraphs.userController.set('content', Smartgraphs.store.find(Smartgraphs.User, 'default'));
  Smartgraphs.sessionController.newSession();
}

function setupDatapointFixtures() {
  Smartgraphs.DataSeries.oldFixtures = Smartgraphs.DataSeries.FIXTURES;
  Smartgraphs.DataSeries.FIXTURES = [{url: 'dataset-1'}];
  Smartgraphs.DataPoint.oldFixtures = Smartgraphs.DataPoint.FIXTURES;
  Smartgraphs.DataPoint.FIXTURES = [{url: 'datapoint-1'}];
}

function restoreDatapointFixtures() {
  Smartgraphs.DataSeries.FIXTURES = Smartgraphs.DataSeries.oldFixtures;
  Smartgraphs.DataPoint.FIXTURES = Smartgraphs.DataPoint.oldFixtures;
}