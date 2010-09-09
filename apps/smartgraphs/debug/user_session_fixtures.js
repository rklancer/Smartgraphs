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

