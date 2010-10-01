// round to the nearest 0.001
function rnd(x) {
  return (Math.round(x*1000)/1000);
}  

// disconnect all bindings of a view hierarchy. Invaluable for test.
function disconnectBindings(view) {
  view.bindings.forEach(function (b) { b.disconnect(); });
  var cvs = view.get('childViews');
  for (var i = 0, len = cvs.get('length'); i < len; i++) {
    disconnectBindings(cvs.objectAt(i));
  }
}