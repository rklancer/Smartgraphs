/*globals module test ok equals same statusQueue*/

var obj;

module("stausQueue", { 
  setup: function() {
    obj = SC.Object.create({status: 0}); 
  }
});

test("statusQueue calls callback", function(){
  expect(1);

  setTimeout(function(){
    obj.set('status', 1);
  }, 100);

  statusQueue([{
    target: obj,
    callback: function(){
      ok(true, 'callback was called');
    }
  }]);
  
});

test("statusQueue fails when callback throws exception", function(){
  expect(1);
  var oldOk = ok;
  var okCalledWithFalse = false;
  ok = function(condition){
    if(!!!condition){
      okCalledWithFalse = true;
    }
  };
  
  var wasCalled = false;
  statusQueue([{
    target: obj,
    callback: function(){
      var bad = null;
      bad.get('something');
    }
  }]);
  
  setTimeout(function(){
    obj.set('status', 1);
    // reset oldOk
    ok = oldOk;
    equals(true, okCalledWithFalse, "The ok method was called with a false condition after an exception was thrown");
  }, 100);
});

test("statusQueue handles multiple changes", function(){
  expect(4);
  
  setTimeout(function(){
    ok(true, 'first timeout was called');
    obj.set('status', 1);
  }, 100);  
  
  statusQueue([{
    target: obj,
    callback: function(){
      ok(true, 'callback was called first time');      
      setTimeout(function(){
        ok(true, 'second timeout was called');
        obj.set('status', 2);
      }, 100);
    }
  },
  { target: obj,
    callback: function(){
      ok(true, 'callback was called second time');
    }
  }]);
});

test("statusQueue handles referencing items", function(){
  expect(4);
  
  setTimeout(function(){
    ok(true, 'first timeout was called');
    obj.set('status', 1);
  }, 100);  
  
  statusQueue([{
    target: obj,
    callback: function(queue){
      ok(true, 'callback was called first time');
      var obj2 = SC.Object.create({status: 0});
      queue[0].target = obj2;
      setTimeout(function(){
        ok(true, 'second timeout was called');
        obj2.set('status', 2);
      }, 100);
    }
  },
  { callback: function(){
      ok(true, 'callback was called second time');
    }
  }]);
});