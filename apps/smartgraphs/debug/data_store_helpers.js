/*globals statusEquals statusNotify statusQueue*/      // make jslint happy

// Helper function to convert status number to a string
// this was taken from SC.Record#statusString
SC.Record.mixin({
  statusString: function(status) {
    var ret = [];

    for(var prop in SC.Record) {
      if(prop.match(/[A-Z_]$/) && SC.Record[prop]===status) {
        ret.push(prop);
      }
    }

    return ret.join(" ");  
  }
});

// Helper function to make it easier to track down status errors
statusEquals = function(obj, status, message){
  equals(SC.Record.statusString(obj.get('status')), SC.Record.statusString(status), message);	
};


// Helper function to notify for a particular status
// it will call func immediately if the status matches
statusNotify = function(obj, status, func){
  if(obj.get('status') & status){
    console.log('statusNotify firing synchronously');
    func.call();
    
    // resume property change notifications
    obj.endPropertyChanges();	
    return;
  }
  
  var checkingFunc = function(){
    if(obj.get('status') & status){
      // remove the observer incase the passed func causes it to fire again
      obj.removeObserver('status', checkingFunc);
      func.call();
    }
  };
  obj.addObserver('status', checkingFunc);
};


// expects an array of {target: <some object to check the status on>,
//    callback: <some function to call when the status changes>}
statusQueue = function(statusArray){
  stop(5000 + statusArray.get('length') * 1000);
  
  var iterate = function(statusArray){
    var item = statusArray.shiftObject();
    
    var observerFunc = function(){
      // remove the observer incase the passed func causes it to fire again
      item.target.removeObserver('status', observerFunc);
      var failed = false;
      var length = statusArray.get('length');
      try {
        item.callback(statusArray);
        if(length > 0){
          iterate(statusArray);
        } 
      } catch(e) {
        console.error("statusNotify died, exception and callback follows");
        console.error(e);
        console.warn(item.callback.toString());

        ok(false, "statusNotify died: " + e.message);
        failed = true;
      } finally {
        // If an exception was thrown or we've reached the end of the queue
        // startup QUnit again
        if(failed || length === 0){
          start();
        }
      }
    };
    item.target.addObserver('status', observerFunc);  
  };
  
  iterate(statusArray);
};



/** some globals needed by testAfterPropertyChange() */

var nStops = 0;

function pushStop(t) {  
  if (nStops === 0) stop(t);
  nStops++;
}

function popStart() {
  if (nStops < 1) throw 'popped too many starts';
  nStops--;
  if (nStops === 0) start();
}
  
function testAfterPropertyChange(target, property, testFn) {
  if (target && target.addObserver) { 
    // give a healthy 10s timeout to discourage anyone from depending on a timeout to signal failure
    pushStop(10000);   
  }
  else {
    ok(false, 'testAfterPropertyChange: target is empty or does not have addObserver property.');
    throw 'testAfterPropertyChange: target is empty or does not have addObserver property';
  }
  
  function observer() {
    target.removeObserver(property, observer);
    try {
      testFn();
    }
    catch (e) {
      CoreTest.plan.error('Error during testAfterPropertyChange! See console log for details.', e);
      console.error(e);
      popStart();
      // it is better not to throw the exception here
      // exceptions thrown in observers cause hard to find problems, the observed object won't send out
      // future notifications because its notification code will be left in a bad state. 
      // (see the 'level' variable used in observable)
      return;
    }
    popStart();
  }
  target.addObserver(property, observer);
}

function getSync(url){
  return SC.Request.getUrl(url)
  .header({
    'Accept': 'application/json'
  })
  .set('isAsynchronous', NO)
  .json()
  .send();
}

function getIndexSync(modelsName){
  var models_json = getSync('/rails/' + modelsName + '.json');
  ok(SC.ok(models_json), 'Synchronous raw request for ' + modelsName);

  return models_json.get('body').content;
}