/* @license
==========================================================================
SproutCore Costello -- Property Observing Library
Copyright ©2006-2009, Sprout Systems, Inc. and contributors.
Portions copyright ©2008-2009 Apple Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com

==========================================================================
@license */
var require=require||function require(){};
var sc_require=sc_require||require;var sc_resource=sc_resource||function sc_resource(){};
sc_require("license");var YES=true;var NO=false;if(typeof console==="undefined"){window.console={};
console.log=console.info=console.warn=console.error=function(){}}var SC=SC||{};var SproutCore=SproutCore||SC;
SC._baseMixin=function(c){var g=Array.prototype.slice.call(arguments,1),a,f=g[0]||{},h=1,e=g.length,k,b,j;
if(e===1){f=this||{};h=0}for(;h<e;h++){if(!(k=g[h])){continue}for(j in k){if(!k.hasOwnProperty(j)){continue
}b=k[j];if(f===b){continue}if(b!==undefined&&(c||(f[j]===undefined))){f[j]=b}}}return f
};SC.mixin=function(){var a=Array.prototype.slice.call(arguments);a.unshift(true);
return SC._baseMixin.apply(this,a)};SC.supplement=function(){var a=Array.prototype.slice.call(arguments);
a.unshift(false);return SC._baseMixin.apply(this,a)};SC.extend=SC.mixin;SC.mixin({T_ERROR:"error",T_OBJECT:"object",T_NULL:"null",T_CLASS:"class",T_HASH:"hash",T_FUNCTION:"function",T_UNDEFINED:"undefined",T_NUMBER:"number",T_BOOL:"boolean",T_ARRAY:"array",T_STRING:"string",typeOf:function(b){if(b===undefined){return SC.T_UNDEFINED
}if(b===null){return SC.T_NULL}var a=typeof(b);if(a=="object"){if(b instanceof Array){a=SC.T_ARRAY
}else{if(b instanceof Function){a=b.isClass?SC.T_CLASS:SC.T_FUNCTION}else{if(SC.Error&&(b instanceof SC.Error)){a=SC.T_ERROR
}else{if(b.isObject===true){a=SC.T_OBJECT}else{a=SC.T_HASH}}}}}else{if(a===SC.T_FUNCTION){a=(b.isClass)?SC.T_CLASS:SC.T_FUNCTION
}}return a},none:function(a){return a===null||a===undefined},empty:function(a){return a===null||a===undefined||a===""
},isArray:function(c){if(c&&c.objectAt){return YES}var a=(c?c.length:null),b=SC.typeOf(c);
return !(SC.none(a)||(b===SC.T_FUNCTION)||(b===SC.T_STRING)||c.setInterval)},makeArray:function(a){return SC.isArray(a)?a:SC.A(a)
},A:function(c){if(SC.none(c)){return[]}if(c.slice instanceof Function){if(typeof(c)==="string"){return[c]
}else{return c.slice()}}if(c.toArray){return c.toArray()}if(!SC.isArray(c)){return[c]
}var b=[],a=c.length;while(--a>=0){b[a]=c[a]}return b},guidKey:"_sc_guid_"+new Date().getTime(),_nextGUID:0,_numberGuids:[],_stringGuids:{},_keyCache:{},guidFor:function(b){if(b===undefined){return"(undefined)"
}if(b===null){return"(null)"}if(b===Object){return"(Object)"}if(b===Array){return"(Array)"
}var a=this.guidKey;if(b[a]){return b[a]}switch(typeof b){case SC.T_NUMBER:return(this._numberGuids[b]=this._numberGuids[b]||("nu"+b));
case SC.T_STRING:return(this._stringGuids[b]=this._stringGuids[b]||("st"+b));case SC.T_BOOL:return(b)?"(true)":"(false)";
default:return SC.generateGuid(b)}},keyFor:function(e,c){var b,a=this._keyCache[e];
if(!a){a=this._keyCache[e]={}}b=a[c];if(!b){b=a[c]=e+"_"+c}return b},generateGuid:function(b){var a=("sc"+(this._nextGUID++));
if(b){b[this.guidKey]=a}return a},hashFor:function(a){return(a&&a.hash&&(typeof a.hash===SC.T_FUNCTION))?a.hash():this.guidFor(a)
},isEqual:function(e,c){if(e===null){return c===null}else{if(e===undefined){return c===undefined
}else{return this.hashFor(e)===this.hashFor(c)}}},compare:function(t,q){if(t===q){return 0
}var k=SC.typeOf(t);var h=SC.typeOf(q);var b=SC.ORDER_DEFINITION_MAPPING;if(!b){var e=SC.ORDER_DEFINITION;
b=SC.ORDER_DEFINITION_MAPPING={};var s,o;for(s=0,o=e.length;s<o;++s){b[e[s]]=s}delete SC.ORDER_DEFINITION
}var u=b[k];var c=b[h];if(u<c){return -1}if(u>c){return 1}switch(k){case SC.T_BOOL:case SC.T_NUMBER:if(t<q){return -1
}if(t>q){return 1}return 0;case SC.T_STRING:var m=t.localeCompare(q);if(m<0){return -1
}if(m>0){return 1}return 0;case SC.T_ARRAY:var p=t.length;var n=q.length;var f=Math.min(p,n);
var a=0;var j=0;var g=arguments.callee;while(a===0&&j<f){a=g(t[j],q[j]);j++}if(a!==0){return a
}if(p<n){return -1}if(p>n){return 1}return 0;case SC.T_OBJECT:if(t.constructor.isComparable===YES){return t.constructor.compare(t,q)
}return 0;default:return 0}},K:function(){return this},EMPTY_ARRAY:[],EMPTY_HASH:{},EMPTY_RANGE:{start:0,length:0},beget:function(c){if(SC.none(c)){return null
}var a=SC.K;a.prototype=c;var b=new a();a.prototype=null;if(SC.typeOf(c.didBeget)===SC.T_FUNCTION){b=c.didBeget(b)
}return b},copy:function(b){var a=b;if(b&&b.isCopyable){return b.copy()}switch(SC.typeOf(b)){case SC.T_ARRAY:if(b.clone&&SC.typeOf(b.clone)===SC.T_FUNCTION){a=b.clone()
}else{a=b.slice()}break;case SC.T_HASH:case SC.T_OBJECT:if(b.clone&&SC.typeOf(b.clone)===SC.T_FUNCTION){a=b.clone()
}else{a={};for(var c in b){a[c]=b[c]}}}return a},merge:function(){var c={},b=arguments.length,a;
for(a=0;a<b;a++){SC.mixin(c,arguments[a])}return c},keys:function(c){var a=[];for(var b in c){a.push(b)
}return a},inspect:function(e){var a,b=[];for(var c in e){a=e[c];if(a==="toString"){continue
}if(SC.typeOf(a)===SC.T_FUNCTION){a="function() { ... }"}b.push(c+": "+a)}return"{"+b.join(" , ")+"}"
},tupleForPropertyPath:function(f,a){if(SC.typeOf(f)===SC.T_ARRAY){return f}var c;
var b=f.indexOf("*");if(b<0){b=f.lastIndexOf(".")}c=(b>=0)?f.slice(b+1):f;var e=this.objectForPropertyPath(f,a,b);
return(e&&c)?[e,c]:null},objectForPropertyPath:function(g,c,e){var h,b,f,a;if(!c){c=window
}if(SC.typeOf(g)===SC.T_STRING){if(e===undefined){e=g.length}h=0;while((c)&&(h<e)){b=g.indexOf(".",h);
if((b<0)||(b>e)){b=e}f=g.slice(h,b);c=c.get?c.get(f):c[f];h=b+1}if(h<e){c=undefined
}}else{h=0;a=g.length;f=null;while((h<a)&&c){f=g[h++];if(f){c=(c.get)?c.get(f):c[f]
}}if(h<a){c=undefined}}return c},STRINGS:{},stringsFor:function(b,a){SC.mixin(SC.STRINGS,a);
return this}});SC.clone=SC.copy;SC.$A=SC.A;SC.didLoad=SC.K;SC.ORDER_DEFINITION=[SC.T_ERROR,SC.T_UNDEFINED,SC.T_NULL,SC.T_BOOL,SC.T_NUMBER,SC.T_STRING,SC.T_ARRAY,SC.T_HASH,SC.T_OBJECT,SC.T_FUNCTION,SC.T_CLASS];
SC.mixin(Function.prototype,{property:function(){this.dependentKeys=SC.$A(arguments);
var a=SC.guidFor(this);this.cacheKey="__cache__"+a;this.lastSetValueKey="__lastValue__"+a;
this.isProperty=YES;return this},cacheable:function(a){this.isProperty=YES;if(!this.dependentKeys){this.dependentKeys=[]
}this.isCacheable=(a===undefined)?YES:a;return this},idempotent:function(a){this.isProperty=YES;
if(!this.dependentKeys){this.dependentKeys=[]}this.isVolatile=(a===undefined)?YES:a;
return this},observes:function(a){var f=arguments.length,b=null,e=null;while(--f>=0){var c=arguments[f];
if((c.indexOf(".")<0)&&(c.indexOf("*")<0)){if(!b){b=this.localPropertyPaths=[]}b.push(c)
}else{if(!e){e=this.propertyPaths=[]}e.push(c)}}return this}});String.prototype.fmt=function(){var b=arguments,a=0;
return this.replace(/%@([0-9]+)?/g,function(c,e){e=(e)?parseInt(e,0)-1:a++;c=b[e];
return((c===null)?"(null)":(c===undefined)?"":c).toString()})};String.prototype.loc=function(){var a=SC.STRINGS[this]||this;
return a.fmt.apply(a,arguments)};String.prototype.w=function(){var c=[],e=this.split(" "),b=e.length,f,a=0;
for(a=0;a<b;++a){f=e[a];if(f.length!==0){c.push(f)}}return c};if(!Date.now){Date.now=function(){return new Date().getTime()
}}SC.ObserverSet={targets:0,_membersCacheIsValid:NO,add:function(e,g,b){var c=(e)?SC.guidFor(e):"__this__";
var a=this[c];if(!a){a=this[c]=SC.CoreSet.create();a.target=e;a.isTargetSet=YES;this.targets++
}a.add(g);if(b!==undefined){var f=a.contexts;if(!f){f=a.contexts={}}f[SC.guidFor(g)]=b
}this._membersCacheIsValid=NO},remove:function(c,e){var b=(c)?SC.guidFor(c):"__this__";
var a=this[b];if(!a){return NO}a.remove(e);if(a.length<=0){a.target=null;a.isTargetSet=NO;
a.contexts=null;delete this[b];this.targets--}else{if(a.contexts){delete a.contexts[SC.guidFor(e)]
}}this._membersCacheIsValid=NO;return YES},invokeMethods:function(){var b,c,a,e,f;
for(b in this){if(!this.hasOwnProperty(b)){continue}c=this[b];if(c&&c.isTargetSet){a=c.length;
e=c.target;while(--a>=0){f=c[a];if(f){f.call(e)}}}}},getMembers:function(){if(this._membersCacheIsValid){return this._members
}if(!this._members){this._members=[]}else{this._members.length=0}var b=this._members;
for(var c in this){if(!this.hasOwnProperty(c)){continue}var e=this[c];if(e&&e.isTargetSet){var a=e.length;
var f=e.target;var h=e.contexts;if(h){while(--a>=0){var g=e[a];b.push([f,g,h[SC.guidFor(g)]])
}}else{while(--a>=0){b.push([f,e[a]])}}}}this._membersCacheIsValid=YES;return b},clone:function(){var b,e,c,a=SC.ObserverSet.create();
for(c in this){if(!this.hasOwnProperty(c)){continue}b=this[c];if(b&&b.isTargetSet){e=b.clone();
e.target=b.target;if(b.contexts){e.contexts=SC.clone(b.contexts)}a[c]=e}}a.targets=this.targets;
a._membersCacheIsValid=NO;return a},create:function(){return SC.beget(this)}};SC.ObserverSet.slice=SC.ObserverSet.clone;
require("private/observer_set");SC.LOG_OBSERVERS=NO;SC.Observable={isObservable:YES,automaticallyNotifiesObserversFor:function(a){return YES
},get:function(c){var b=this[c],a;if(b===undefined){return this.unknownProperty(c)
}else{if(b&&b.isProperty){if(b.isCacheable){a=this._kvo_cache;if(!a){a=this._kvo_cache={}
}return(a[b.cacheKey]!==undefined)?a[b.cacheKey]:(a[b.cacheKey]=b.call(this,c))}else{return b.call(this,c)
}}else{return b}}},set:function(j,g){var b=this[j],k=this.automaticallyNotifiesObserversFor(j),f=g,c,a,h,e;
if(!k&&this._kvo_cacheable&&(a=this._kvo_cache)){c=this._kvo_cachedep;if(!c||(c=c[j])===undefined){c=this._kvo_computeCachedDependentsFor(j)
}if(c){h=c.length;while(--h>=0){e=c[h];a[e.cacheKey]=a[e.lastSetValueKey]=undefined
}}}if(b&&b.isProperty){a=this._kvo_cache;if(b.isVolatile||!a||(a[b.lastSetValueKey]!==g)){if(!a){a=this._kvo_cache={}
}a[b.lastSetValueKey]=g;if(k){this.propertyWillChange(j)}f=b.call(this,j,g);if(b.isCacheable){a[b.cacheKey]=f
}if(k){this.propertyDidChange(j,f,YES)}}}else{if(b===undefined){if(k){this.propertyWillChange(j)
}this.unknownProperty(j,g);if(k){this.propertyDidChange(j,f)}}else{if(this[j]!==g){if(k){this.propertyWillChange(j)
}f=this[j]=g;if(k){this.propertyDidChange(j,f)}}}}return this},unknownProperty:function(a,b){if(!(b===undefined)){this[a]=b
}return b},beginPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
return this},endPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
var b=this._kvo_changeLevel,a=this._kvo_changes;if((b<=0)&&a&&(a.length>0)&&!SC.Observers.isObservingSuspended){this._notifyPropertyObservers()
}return this},propertyWillChange:function(a){return this},propertyDidChange:function(n,l,c){this._kvo_revision=(this._kvo_revision||0)+1;
var b=this._kvo_changeLevel||0,h,m,j,a,e,g=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO);
if(a=this._kvo_cache){if(!c){e=this[n];if(e&&e.isProperty){a[e.cacheKey]=a[e.lastSetValueKey]=undefined
}}if(this._kvo_cacheable){h=this._kvo_cachedep;if(!h||(h=h[n])===undefined){h=this._kvo_computeCachedDependentsFor(n)
}if(h){m=h.length;while(--m>=0){j=h[m];a[j.cacheKey]=a[j.lastSetValueKey]=undefined
}}}}var f=SC.Observers.isObservingSuspended;if((b>0)||f){var k=this._kvo_changes;
if(!k){k=this._kvo_changes=SC.CoreSet.create()}k.add(n);if(f){if(g){console.log("%@%@: will not notify observers because observing is suspended".fmt(SC.KVO_SPACES,this))
}SC.Observers.objectHasPendingChanges(this)}}else{this._notifyPropertyObservers(n)
}return this},registerDependentKey:function(j,c){var f=this._kvo_dependents,b=this[j],k,h,a,g,e;
if(SC.typeOf(c)===SC.T_ARRAY){k=c;a=0}else{k=arguments;a=1}h=k.length;if(!f){this._kvo_dependents=f={}
}while(--h>=a){g=k[h];e=f[g];if(!e){e=f[g]=[]}e.push(j)}},_kvo_addCachedDependents:function(b,g,j,c){var a=g.length,f,e,h;
while(--a>=0){e=g[a];c.add(e);f=this[e];if(f&&(f instanceof Function)&&f.isProperty){if(f.isCacheable){b.push(f)
}if((h=j[e])&&h.length>0){this._kvo_addCachedDependents(b,h,j,c)}}}},_kvo_computeCachedDependentsFor:function(c){var e=this._kvo_cachedep,g=this._kvo_dependents,f=g?g[c]:null,a,b;
if(!e){e=this._kvo_cachedep={}}if(!f||f.length===0){return e[c]=null}a=e[c]=[];b=SC._TMP_SEEN_SET=(SC._TMP_SEEN_SET||SC.CoreSet.create());
b.add(c);this._kvo_addCachedDependents(a,f,g,b);b.clear();if(a.length===0){a=e[c]=null
}return a},_kvo_for:function(c,b){var a=this[c];if(!this._kvo_cloned){this._kvo_cloned={}
}if(!a){a=this[c]=(b===undefined)?[]:b.create();this._kvo_cloned[c]=YES}else{if(!this._kvo_cloned[c]){a=this[c]=a.copy();
this._kvo_cloned[c]=YES}}return a},addObserver:function(c,g,j,b){var e,a,f,h;if(j===undefined){j=g;
g=this}if(!g){g=this}if(SC.typeOf(j)===SC.T_STRING){j=g[j]}if(!j){throw"You must pass a method to addObserver()"
}c=c.toString();if(c.indexOf(".")>=0){a=SC._ChainObserver.createChain(this,c,g,j,b);
a.masterTarget=g;a.masterMethod=j;this._kvo_for(SC.keyFor("_kvo_chains",c)).push(a)
}else{if((this[c]===undefined)&&(c.indexOf("@")===0)){this.get(c)}if(g===this){g=null
}e=SC.keyFor("_kvo_observers",c);this._kvo_for(e,SC.ObserverSet).add(g,j,b);this._kvo_for("_kvo_observed_keys",SC.CoreSet).add(c)
}if(this.didAddObserver){this.didAddObserver(c,g,j)}return this},removeObserver:function(c,g,j){var e,f,b,h,a;
if(j===undefined){j=g;g=this}if(!g){g=this}if(SC.typeOf(j)===SC.T_STRING){j=g[j]}if(!j){throw"You must pass a method to removeObserver()"
}c=c.toString();if(c.indexOf(".")>=0){e=SC.keyFor("_kvo_chains",c);if(f=this[e]){f=this._kvo_for(e);
a=f.length;while(--a>=0){b=f[a];if(b&&(b.masterTarget===g)&&(b.masterMethod===j)){f[a]=b.destroyChain()
}}}}else{if(g===this){g=null}e=SC.keyFor("_kvo_observers",c);if(h=this[e]){h=this._kvo_for(e);
h.remove(g,j);if(h.targets<=0){this._kvo_for("_kvo_observed_keys",SC.CoreSet).remove(c)
}}}if(this.didRemoveObserver){this.didRemoveObserver(c,g,j)}return this},hasObserverFor:function(b){SC.Observers.flush(this);
var e=this[SC.keyFor("_kvo_observers",b)],c=this[SC.keyFor("_kvo_local",b)],a;if(c&&c.length>0){return YES
}if(e&&e.getMembers().length>0){return YES}return NO},initObservable:function(){if(this._observableInited){return
}this._observableInited=YES;var g,o,m,l,j,f,n,h,c,p,b,k,e,a;if(o=this._observers){h=o.length;
for(g=0;g<h;g++){m=o[g];j=this[m];f=j.propertyPaths;n=(f)?f.length:0;for(c=0;c<n;
c++){p=f[c];b=p.indexOf(".");if(b<0){this.addObserver(p,this,j)}else{if(p.indexOf("*")===0){this.addObserver(p.slice(1),this,j)
}else{k=null;if(b===0){k=this;p=p.slice(1)}else{if(b===4&&p.slice(0,5)==="this."){k=this;
p=p.slice(5)}else{if(b<0&&p.length===4&&p==="this"){k=this;p=""}}}SC.Observers.addObserver(p,this,j,k)
}}}}}this.bindings=[];if(o=this._bindings){for(g=0,a=o.length;g<a;g++){m=o[g];l=this[m];
e=m.slice(0,-7);this[m]=this.bind(e,l)}}if(o=this._properties){for(g=0,a=o.length;
g<a;g++){m=o[g];if(l=this[m]){if(l.isCacheable){this._kvo_cacheable=YES}if(l.dependentKeys&&(l.dependentKeys.length>0)){this.registerDependentKey(m,l.dependentKeys)
}}}}},observersForKey:function(a){var b=this._kvo_for("_kvo_observers",a);return b.getMembers()||[]
},_notifyPropertyObservers:function(w){if(!this._observableInited){this.initObservable()
}SC.Observers.flush(this);var h=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO),q,u,o,e,p,n,t,s,l,a,g,v,c,k,f,b,j,m;
if(h){j=SC.KVO_SPACES=(SC.KVO_SPACES||"")+"  ";console.log('%@%@: notifying observers after change to key "%@"'.fmt(j,this,w))
}e=this["_kvo_observers_*"];this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;while(((u=this._kvo_changes)&&(u.length>0))||w){t=++this.propertyRevision;
if(!u){u=SC.CoreSet.create()}this._kvo_changes=null;if(w==="*"){u.add("*");u.addEach(this._kvo_for("_kvo_observed_keys",SC.CoreSet))
}else{if(w){u.add(w)}}if(o=this._kvo_dependents){for(p=0;p<u.length;p++){w=u[p];n=o[w];
if(n&&(k=n.length)){if(h){console.log("%@...including dependent keys for %@: %@".fmt(j,w,n))
}m=this._kvo_cache;if(!m){m=this._kvo_cache={}}while(--k>=0){u.add(w=n[k]);if(f=this[w]){this[f.cacheKey]=undefined;
m[f.cacheKey]=m[f.lastSetValueKey]=undefined}}}}}while(u.length>0){w=u.pop();q=this[SC.keyFor("_kvo_observers",w)];
if(q){s=q.getMembers();l=s.length;for(g=0;g<l;g++){a=s[g];if(a[3]===t){continue}v=a[0]||this;
c=a[1];b=a[2];a[3]=t;if(h){console.log('%@...firing observer on %@ for key "%@"'.fmt(j,v,w))
}if(b!==undefined){c.call(v,this,w,null,b,t)}else{c.call(v,this,w,null,t)}}}s=this[SC.keyFor("_kvo_local",w)];
if(s){l=s.length;for(g=0;g<l;g++){a=s[g];c=this[a];if(c){if(h){console.log('%@...firing local observer %@.%@ for key "%@"'.fmt(j,this,a,w))
}c.call(this,this,w,null,t)}}}if(e&&w!=="*"){s=e.getMembers();l=s.length;for(g=0;
g<l;g++){a=s[g];v=a[0]||this;c=a[1];b=a[2];if(h){console.log('%@...firing * observer on %@ for key "%@"'.fmt(j,v,w))
}if(b!==undefined){c.call(v,this,w,null,b,t)}else{c.call(v,this,w,null,t)}}}if(this.propertyObserver){if(h){console.log('%@...firing %@.propertyObserver for key "%@"'.fmt(j,this,w))
}this.propertyObserver(this,w,null,t)}}if(u){u.destroy()}w=null}this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
if(h){SC.KVO_SPACES=j.slice(0,-2)}return YES},bind:function(a,c,f){var e,b;if(f!==undefined){c=[c,f]
}b=SC.typeOf(c);if(b===SC.T_STRING||b===SC.T_ARRAY){e=this[a+"BindingDefault"]||SC.Binding;
e=e.beget().from(c)}else{e=c}e=e.to(a,this).connect();this.bindings.push(e);return e
},didChangeFor:function(a){var b,g,f,l,e,c,j,k,h;a=SC.hashFor(a);b=this._kvo_didChange_valueCache;
if(!b){b=this._kvo_didChange_valueCache={}}g=this._kvo_didChange_revisionCache;if(!g){g=this._kvo_didChange_revisionCache={}
}f=b[a]||{};l=g[a]||{};e=false;c=this._kvo_revision||0;j=arguments.length;while(--j>=1){k=arguments[j];
if(l[k]!=c){h=this.get(k);if(f[k]!==h){e=true;f[k]=h}}l[k]=c}b[a]=f;g[a]=l;return e
},setIfChanged:function(a,b){return(this.get(a)!==b)?this.set(a,b):this},getPath:function(b){var a=SC.tupleForPropertyPath(b,this);
if(a===null||a[0]===null){return undefined}return a[0].get(a[1])},setPath:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}a[0].set(a[1],b)}else{this.set(c,b)}return this},setPathIfChanged:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}if(a[0].get(a[1])!==b){a[0].set(a[1],b)}}else{this.setIfChanged(c,b)
}return this},getEach:function(){var e=SC.A(arguments),c=[],a,b;for(a=0,b=e.length;
a<b;a++){c[c.length]=this.getPath(e[a])}return c},incrementProperty:function(b,a){if(!a){a=1
}this.set(b,(this.get(b)||0)+a);return this.get(b)},decrementProperty:function(b,a){if(!a){a=1
}this.set(b,(this.get(b)||0)-a);return this.get(b)},toggleProperty:function(a,b,c){if(b===undefined){b=true
}if(c===undefined){c=false}b=(this.get(a)==b)?c:b;this.set(a,b);return this.get(a)
},notifyPropertyChange:function(a,b){this.propertyWillChange(a);this.propertyDidChange(a,b);
return this},allPropertiesDidChange:function(){this._kvo_cache=null;this._notifyPropertyObservers("*");
return this},addProbe:function(a){this.addObserver(a,SC.logChange)},removeProbe:function(a){this.removeObserver(a,SC.logChange)
},logProperty:function(){var b=SC.$A(arguments),e,c,a;for(a=0,c=b.length;a<c;a++){e=b[a];
console.log("%@:%@: ".fmt(SC.guidFor(this),e),this.get(e))}},propertyRevision:1};
SC.logChange=function logChange(c,a,b){console.log("CHANGE: %@[%@] =>".fmt(c,a),c.get(a))
};SC.mixin(SC,{get:function(a,b){if(!a){return undefined}if(b===undefined){return this[a]
}if(a.get){return a.get(b)}return a[b]}});SC.mixin(Array.prototype,SC.Observable);
SC.Enumerator=function(a){this.enumerable=a;this.reset();return this};SC.Enumerator.prototype={nextObject:function(){var c=this._index;
var a=this._length;if(c>=a){return undefined}var b=this.enumerable.nextObject(c,this._previousObject,this._context);
this._previousObject=b;this._index=c+1;if(c>=a){this._context=SC.Enumerator._pushContext(this._context)
}return b},reset:function(){var b=this.enumerable;if(!b){throw SC.$error("Enumerator has been destroyed")
}this._length=b.get?b.get("length"):b.length;var a=this._length;this._index=0;this._previousObject=null;
this._context=(a>0)?SC.Enumerator._popContext():null},destroy:function(){this.enumerable=this._length=this._index=this._previousObject=this._context=null
}};SC.Enumerator.create=function(a){return new SC.Enumerator(a)};SC.Enumerator._popContext=function(){var a=this._contextCache?this._contextCache.pop():null;
return a||{}};SC.Enumerator._pushContext=function(b){this._contextCache=this._contextCache||[];
var a=this._contextCache;a.push(b);return null};require("core");require("system/enumerator");
SC.Enumerable={isEnumerable:YES,nextObject:function(a,c,b){return this.objectAt?this.objectAt(a):this[a]
},firstObject:function(){if(this.get("length")===0){return undefined}if(this.objectAt){return this.objectAt(0)
}var b=SC.Enumerator._popContext(),a;a=this.nextObject(0,null,b);b=SC.Enumerator._pushContext(b);
return a}.property(),lastObject:function(){var a=this.get("length");if(a===0){return undefined
}if(this.objectAt){return this.objectAt(a-1)}}.property(),enumerator:function(){return SC.Enumerator.create(this)
},forEach:function(h,g){if(typeof h!=="function"){throw new TypeError()}var b=this.get?this.get("length"):this.length;
if(g===undefined){g=null}var f=null;var c=SC.Enumerator._popContext();for(var a=0;
a<b;a++){var e=this.nextObject(a,f,c);h.call(g,e,a,this);f=e}f=null;c=SC.Enumerator._pushContext(c);
return this},getEach:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
},this)},setEach:function(a,b){this.forEach(function(c){if(c){if(c.set){c.set(a,b)
}else{c[a]=b}}},this);return this},map:function(j,h){if(typeof j!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=[];
var g=null;var e=SC.Enumerator._popContext();for(var a=0;a<b;a++){var f=this.nextObject(a,g,e);
c[a]=j.call(h,f,a,this);g=f}g=null;e=SC.Enumerator._pushContext(e);return c},mapProperty:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
})},filter:function(j,h){if(typeof j!=="function"){throw new TypeError()}var b=this.get?this.get("length"):this.length;
if(h===undefined){h=null}var c=[];var g=null;var e=SC.Enumerator._popContext();for(var a=0;
a<b;a++){var f=this.nextObject(a,g,e);if(j.call(h,f,a,this)){c.push(f)}g=f}g=null;
e=SC.Enumerator._pushContext(e);return c},sortProperty:function(b){var c=(typeof b===SC.T_STRING)?arguments:b,a=c.length,e;
if(this instanceof Array){e=this}else{e=[];this.forEach(function(f){e.push(f)})}if(!e){return[]
}return e.sort(function(h,g){var f,k,m,l,j=0;for(f=0;j===0&&f<a;f++){k=c[f];m=h?(h.get?h.get(k):h[k]):null;
l=g?(g.get?g.get(k):g[k]):null;j=SC.compare(m,l)}return j})},filterProperty:function(l,g){var e=this.get?this.get("length"):this.length;
var f=[];var k=null;var b=SC.Enumerator._popContext();for(var h=0;h<e;h++){var c=this.nextObject(h,k,b);
var j=c?(c.get?c.get(l):c[l]):null;var a=(g===undefined)?!!j:SC.isEqual(j,g);if(a){f.push(c)
}k=c}k=null;b=SC.Enumerator._pushContext(b);return f},find:function(j,e){var c=this.get?this.get("length"):this.length;
if(e===undefined){e=null}var h=null,b,k=NO,f=null;var a=SC.Enumerator._popContext();
for(var g=0;g<c&&!k;g++){b=this.nextObject(g,h,a);if(k=j.call(e,b,g,this)){f=b}h=b
}b=h=null;a=SC.Enumerator._pushContext(a);return f},findProperty:function(k,g){var c=this.get?this.get("length"):this.length;
var l=NO,e=null,j=null,b,h;var a=SC.Enumerator._popContext();for(var f=0;f<c&&!l;
f++){b=this.nextObject(f,j,a);h=b?(b.get?b.get(k):b[k]):null;l=(g===undefined)?!!h:SC.isEqual(h,g);
if(l){e=b}j=b}j=b=null;a=SC.Enumerator._pushContext(a);return e},every:function(j,h){if(typeof j!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=YES;
var g=null;var e=SC.Enumerator._popContext();for(var a=0;c&&(a<b);a++){var f=this.nextObject(a,g,e);
if(!j.call(h,f,a,this)){c=NO}g=f}g=null;e=SC.Enumerator._pushContext(e);return c},everyProperty:function(k,f){var c=this.get?this.get("length"):this.length;
var e=YES;var j=null;var a=SC.Enumerator._popContext();for(var g=0;e&&(g<c);g++){var b=this.nextObject(g,j,a);
var h=b?(b.get?b.get(k):b[k]):null;e=(f===undefined)?!!h:SC.isEqual(h,f);j=b}j=null;
a=SC.Enumerator._pushContext(a);return e},some:function(j,h){if(typeof j!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=NO;
var g=null;var e=SC.Enumerator._popContext();for(var a=0;(!c)&&(a<b);a++){var f=this.nextObject(a,g,e);
if(j.call(h,f,a,this)){c=YES}g=f}g=null;e=SC.Enumerator._pushContext(e);return c},someProperty:function(k,f){var c=this.get?this.get("length"):this.length;
var e=NO;var j=null;var a=SC.Enumerator._popContext();for(var g=0;!e&&(g<c);g++){var b=this.nextObject(g,j,a);
var h=b?(b.get?b.get(k):b[k]):null;e=(f===undefined)?!!h:SC.isEqual(h,f);j=b}j=null;
a=SC.Enumerator._pushContext(a);return e},reduce:function(h,j,k){if(typeof h!=="function"){throw new TypeError()
}var c=this.get?this.get("length"):this.length;if(c===0&&j===undefined){throw new TypeError()
}var e=j;var g=null;var a=SC.Enumerator._popContext();for(var f=0;f<c;f++){var b=this.nextObject(f,g,a);
if(b!==null){if(e===undefined){e=b}else{e=h.call(null,e,b,f,this,k)}}g=b}g=null;a=SC.Enumerator._pushContext(a);
if(e===undefined){throw new TypeError()}return e},invoke:function(j){var f=this.get?this.get("length"):this.length;
if(f<=0){return[]}var k;var h=[];var c=arguments.length;if(c>1){for(k=1;k<c;k++){h.push(arguments[k])
}}var g=[];var l=null;var b=SC.Enumerator._popContext();for(k=0;k<f;k++){var e=this.nextObject(k,l,b);
var a=e?e[j]:null;if(a){g[k]=a.apply(e,h)}l=e}l=null;b=SC.Enumerator._pushContext(b);
return g},invokeWhile:function(e,k){var g=this.get?this.get("length"):this.length;
if(g<=0){return null}var l;var j=[];var c=arguments.length;if(c>2){for(l=2;l<c;l++){j.push(arguments[l])
}}var h=e;var m=null;var b=SC.Enumerator._popContext();for(l=0;(h===e)&&(l<g);l++){var f=this.nextObject(l,m,b);
var a=f?f[k]:null;if(a){h=a.apply(f,j)}m=f}m=null;b=SC.Enumerator._pushContext(b);
return h},toArray:function(){var a=[];this.forEach(function(b){a.push(b)},this);return a
},groupBy:function(l){var e=this.get?this.get("length"):this.length,f=[],k=null,a=SC.Enumerator._popContext(),g=[],m=[];
for(var h=0;h<e;h++){var c=this.nextObject(h,k,a);var j=c?(c.get?c.get(l):c[l]):null;
if(SC.none(g[j])){g[j]=[];m.push(j)}g[j].push(c);k=c}k=null;a=SC.Enumerator._pushContext(a);
for(var h=0,b=m.length;h<b;h++){f.push(g[m[h]])}return f}};SC._buildReducerFor=function(a,b){return function(e,f){var g=this[a];
if(SC.typeOf(g)!==SC.T_FUNCTION){return this.unknownProperty?this.unknownProperty(e,f):null
}else{var c=SC.Enumerable.reduce.call(this,g,null,b);return c}}.property("[]")};SC.Reducers={"[]":function(a,b){return this
}.property(),enumerableContentDidChange:function(b,a){this.notifyPropertyChange("[]");
return this},reducedProperty:function(k,h,g){if(!k||k.charAt(0)!=="@"){return undefined
}var e=k.match(/^@([^(]*)(\(([^)]*)\))?$/);if(!e||e.length<2){return undefined}var j=e[1];
var l=e[3];j="reduce"+j.slice(0,1).toUpperCase()+j.slice(1);var a=this[j];if(SC.typeOf(a)!==SC.T_FUNCTION){return undefined
}if(g===NO){return SC.Enumerable.reduce.call(this,a,null,l)}var c=SC._buildReducerFor(j,l);
var b=this.constructor.prototype;if(b){b[k]=c;var f=b._properties||[];f.push(k);b._properties=f;
this.registerDependentKey(k,"[]")}return SC.Enumerable.reduce.call(this,a,null,l)
},reduceMax:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]}if(a===null){return f
}return(f>a)?f:a},reduceMaxObject:function(b,g,c,h,f){var a=b,j=g;if(f){if(g){j=g.get?g.get(f):g[f]
}if(b){a=b.get?b.get(f):b[f]}}if(a===null){return g}return(j>a)?g:b},reduceMin:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]
}if(a===null){return f}return(f<a)?f:a},reduceMinObject:function(b,g,c,h,f){var a=b,j=g;
if(f){if(g){j=g.get?g.get(f):g[f]}if(b){a=b.get?b.get(f):b[f]}}if(a===null){return g
}return(j<a)?g:b},reduceAverage:function(b,h,f,j,g){if(g&&h){h=h.get?h.get(g):h[g]
}var c=(b||0)+h;var a=j.get?j.get("length"):j.length;if(f>=a-1){c=c/a}return c},reduceSum:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]
}return(a===null)?f:a+f}};SC.mixin(SC.Enumerable,SC.Reducers);SC.mixin(Array.prototype,SC.Reducers);
Array.prototype.isEnumerable=YES;(function(){var a={nextObject:SC.Enumerable.nextObject,enumerator:SC.Enumerable.enumerator,firstObject:SC.Enumerable.firstObject,lastObject:SC.Enumerable.lastObject,sortProperty:SC.Enumerable.sortProperty,mapProperty:function(h){var f=this.length;
var g=[];for(var e=0;e<f;e++){var j=this[e];g[e]=j?(j.get?j.get(h):j[h]):null}return g
},filterProperty:function(j,l){var g=this.length;var h=[];for(var f=0;f<g;f++){var k=this[f];
var m=k?(k.get?k.get(j):k[j]):null;var e=(l===undefined)?!!m:SC.isEqual(m,l);if(e){h.push(k)
}}return h},groupBy:function(m){var g=this.length,h=[],j=[],n=[];for(var k=0;k<g;
k++){var f=this[k];var l=f?(f.get?f.get(m):f[m]):null;if(SC.none(j[l])){j[l]=[];n.push(l)
}j[l].push(f)}for(var k=0,e=n.length;k<e;k++){h.push(j[n[k]])}return h},find:function(l,k){if(typeof l!=="function"){throw new TypeError()
}var f=this.length;if(k===undefined){k=null}var h,g=null,j=NO;for(var e=0;e<f&&!j;
e++){h=this[e];if(j=l.call(k,h,e,this)){g=h}}h=null;return g},findProperty:function(h,l){var f=this.length;
var j,m,k=NO,g=null;for(var e=0;e<f&&!k;e++){m=(j=this[e])?(j.get?j.get(h):j[h]):null;
k=(l===undefined)?!!m:SC.isEqual(m,l);if(k){g=j}}j=null;return g},everyProperty:function(h,k){var f=this.length;
var g=YES;for(var e=0;g&&(e<f);e++){var j=this[e];var l=j?(j.get?j.get(h):j[h]):null;
g=(k===undefined)?!!l:SC.isEqual(l,k)}return g},someProperty:function(h,k){var f=this.length;
var g=NO;for(var e=0;!g&&(e<f);e++){var j=this[e];var l=j?(j.get?j.get(h):j[h]):null;
g=(k===undefined)?!!l:SC.isEqual(l,k)}return g},invoke:function(g){var f=this.length;
if(f<=0){return[]}var e;var j=[];var l=arguments.length;if(l>1){for(e=1;e<l;e++){j.push(arguments[e])
}}var h=[];for(e=0;e<f;e++){var k=this[e];var m=k?k[g]:null;if(m){h[e]=m.apply(k,j)
}}return h},invokeWhile:function(g,m){var j=this.length;if(j<=0){return null}var n;
var l=[];var f=arguments.length;if(f>2){for(n=2;n<f;n++){l.push(arguments[n])}}var k=g;
for(n=0;(k===g)&&(n<j);n++){var h=this[n];var e=h?h[m]:null;if(e){k=e.apply(h,l)}}return k
},toArray:function(){var f=this.length;if(f<=0){return[]}var g=[];for(var e=0;e<f;
e++){var h=this[e];g.push(h)}return g},getEach:function(h){var g=[];var f=this.length;
for(var e=0;e<f;e++){var j=this[e];g[e]=j?(j.get?j.get(h):j[h]):null}return g},setEach:function(g,h){var f=this.length;
for(var e=0;e<f;e++){var j=this[e];if(j){if(j.set){j.set(g,h)}else{j[g]=h}}}return this
}};var c={forEach:function(j,h){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(h===undefined){h=null}for(var e=0;e<f;e++){var g=this[e];j.call(h,g,e,this)}return this
},map:function(k,j){if(typeof k!=="function"){throw new TypeError()}var f=this.length;
if(j===undefined){j=null}var g=[];for(var e=0;e<f;e++){var h=this[e];g[e]=k.call(j,h,e,this)
}return g},filter:function(k,j){if(typeof k!=="function"){throw new TypeError()}var f=this.length;
if(j===undefined){j=null}var g=[];for(var e=0;e<f;e++){var h=this[e];if(k.call(j,h,e,this)){g.push(h)
}}return g},every:function(k,j){if(typeof k!=="function"){throw new TypeError()}var f=this.length;
if(j===undefined){j=null}var g=YES;for(var e=0;g&&(e<f);e++){var h=this[e];if(!k.call(j,h,e,this)){g=NO
}}return g},some:function(k,j){if(typeof k!=="function"){throw new TypeError()}var f=this.length;
if(j===undefined){j=null}var g=NO;for(var e=0;(!g)&&(e<f);e++){var h=this[e];if(k.call(j,h,e,this)){g=YES
}}return g},reduce:function(l,g,k){if(typeof l!=="function"){throw new TypeError()
}var f=this.length;if(f===0&&g===undefined){throw new TypeError()}var h=g;for(var e=0;
e<f;e++){var j=this[e];if(j!==null){if(h===undefined){h=j}else{h=l.call(null,h,j,e,this,k)
}}}if(h===undefined){throw new TypeError()}return h}};for(var b in c){if(!c.hasOwnProperty(b)){continue
}if(!Array.prototype[b]||((typeof Prototype==="object")&&Prototype.Version.match(/^1\.6/))){Array.prototype[b]=c[b]
}}SC.mixin(Array.prototype,a)})();SC.RangeObserver={isRangeObserver:YES,toString:function(){var a=this.indexes?this.indexes.toString():"SC.IndexSet<..>";
return a.replace("IndexSet","RangeObserver(%@)".fmt(SC.guidFor(this)))},create:function(e,g,f,h,c,a){var b=SC.beget(this);
b.source=e;b.indexes=g?g.frozenCopy():null;b.target=f;b.method=h;b.context=c;b.isDeep=a||NO;
b.beginObserving();return b},extend:function(f){var e=SC.beget(this),c=arguments,b=c.length,a;
for(a=0;a<b;a++){SC.mixin(e,c[a])}return e},destroy:function(a){this.endObserving();
return this},update:function(a,b){if(this.indexes&&this.indexes.isEqual(b)){return this
}this.indexes=b?b.frozenCopy():null;this.endObserving().beginObserving();return this
},beginObserving:function(){if(!this.isDeep){return this}var b=this.observing;if(!b){b=this.observing=SC.CoreSet.create()
}var a=this._beginObservingForEach;if(!a){a=this._beginObservingForEach=function(c){var e=this.source.objectAt(c);
if(e&&e.addObserver){b.push(e);e._kvo_needsRangeObserver=YES}}}this.indexes.forEach(a,this);
this.isObserving=NO;SC.Observers.addPendingRangeObserver(this);return this},setupPending:function(a){var e=this.observing;
if(this.isObserving||!e||(e.get("length")===0)){return YES}if(e.contains(a)){this.isObserving=YES;
var b=this._setupPendingForEach;if(!b){var c=this.source,f=this.objectPropertyDidChange;
b=this._setupPendingForEach=function(g){var k=this.source.objectAt(g),h=SC.guidFor(k),j;
if(k&&k.addObserver){e.push(k);k.addObserver("*",this,f);j=this[h];if(j===undefined||j===null){this[h]=g
}else{if(j.isIndexSet){j.add(g)}else{j=this[h]=SC.IndexSet.create(j).add(g)}}}}}this.indexes.forEach(b,this);
return YES}else{return NO}},endObserving:function(){if(!this.isDeep){return this}var f=this.observing;
if(this.isObserving){var b=this.objectPropertyDidChange,c=this.source,a,g,e;if(f){g=f.length;
for(a=0;a<g;a++){e=f[a];e.removeObserver("*",this,b);this[SC.guidFor(e)]=null}f.length=0
}this.isObserving=NO}if(f){f.clear()}return this},rangeDidChange:function(b){var a=this.indexes;
if(!b||!a||a.intersects(b)){this.endObserving();this.method.call(this.target,this.source,null,"[]",b,this.context);
this.beginObserving()}return this},objectPropertyDidChange:function(e,g,h,a){var f=this.context,j=this.method,c=SC.guidFor(e),b=this[c];
if(b&&!b.isIndexSet){b=this[c]=SC.IndexSet.create(b).freeze()}if(f){j.call(this.target,this.source,e,g,b,f,a)
}else{j.call(this.target,this.source,e,g,b,a)}}};sc_require("mixins/observable");
sc_require("mixins/enumerable");sc_require("system/range_observer");SC.OUT_OF_RANGE_EXCEPTION="Index out of range";
SC.Array={isSCArray:YES,replace:function(a,c,b){throw"replace() must be implemented to support SC.Array"
},objectAt:function(a){if(a<0){return undefined}if(a>=this.get("length")){return undefined
}return this.get(a)},"[]":function(a,b){if(b!==undefined){this.replace(0,this.get("length"),b)
}return this}.property(),insertAt:function(a,b){if(a>this.get("length")){throw SC.OUT_OF_RANGE_EXCEPTION
}this.replace(a,0,[b]);return this},removeAt:function(e,a){var c=0,b=[];if(typeof e===SC.T_NUMBER){if((e<0)||(e>=this.get("length"))){throw SC.OUT_OF_RANGE_EXCEPTION
}if(a===undefined){this.replace(e,1,b);return this}else{e=SC.IndexSet.create(e,a)
}}this.beginPropertyChanges();e.forEachRange(function(g,f){g-=c;c+=f;this.replace(g,f,b)
},this);this.endPropertyChanges();return this},removeObject:function(b){var c=this.get("length")||0;
while(--c>=0){var a=this.objectAt(c);if(a==b){this.removeAt(c)}}return this},removeObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.removeObject(b)},this);this.endPropertyChanges();return this
},pushObject:function(a){this.insertAt(this.get("length"),a);return a},pushObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.pushObject(b)},this);this.endPropertyChanges();return this
},popObject:function(){var a=this.get("length");if(a===0){return null}var b=this.objectAt(a-1);
this.removeAt(a-1);return b},shiftObject:function(){if(this.get("length")===0){return null
}var a=this.objectAt(0);this.removeAt(0);return a},unshiftObject:function(a){this.insertAt(0,a);
return a},unshiftObjects:function(a){this.beginPropertyChanges();a.forEach(function(b){this.unshiftObject(b)
},this);this.endPropertyChanges();return this},isEqual:function(a){if(!a){return false
}if(a==this){return true}var b=a.get("length");if(b!=this.get("length")){return false
}while(--b>=0){if(!SC.isEqual(a.objectAt(b),this.objectAt(b))){return false}}return true
},compact:function(){return this.without(null)},without:function(b){if(this.indexOf(b)<0){return this
}var a=[];this.forEach(function(c){if(c!==b){a[a.length]=c}});return a},uniq:function(){var a=[];
this.forEach(function(b){if(a.indexOf(b)<0){a[a.length]=b}});return a},max:function(){return Math.max.apply(Math,this)
},min:function(){return Math.min.apply(Math,this)},rangeObserverClass:SC.RangeObserver,addRangeObserver:function(e,g,j,f){var a=this._array_rangeObservers;
if(!a){a=this._array_rangeObservers=SC.CoreSet.create()}if(this._array_oldLength===undefined){this._array_oldLength=this.get("length")
}var h=this.rangeObserverClass;var b=NO;var c=h.create(this,e,g,j,f,b);a.add(c);if(!this._array_isNotifyingRangeObservers){this._array_isNotifyingRangeObservers=YES;
this.addObserver("[]",this,this._array_notifyRangeObservers)}return c},updateRangeObserver:function(b,a){return b.update(this,a)
},removeRangeObserver:function(c){var b=c.destroy(this);var a=this._array_rangeObservers;
if(a){a.remove(c)}return b},enumerableContentDidChange:function(j,h,g){var a=this._array_rangeObservers,e=this._array_oldLength,f,c,b;
this.beginPropertyChanges();this.notifyPropertyChange("length");if(a&&a.length>0){if(e===undefined){e=0
}this._array_oldLength=f=this.get("length");if(j===undefined){j=0}if(g===undefined){g=f-e
}if(g!==0||h===undefined){c=f-j;if(g<0){c-=g}}else{c=h}b=this._array_rangeChanges;
if(!b){b=this._array_rangeChanges=SC.IndexSet.create()}b.add(j,c)}this.notifyPropertyChange("[]");
this.endPropertyChanges();return this},_array_notifyRangeObservers:function(){var c=this._array_rangeObservers,e=this._array_rangeChanges,b=c?c.length:0,a,f;
if(b>0&&e&&e.length>0){for(a=0;a<b;a++){c[a].rangeDidChange(e)}e.clear()}}};SC.mixin(Array.prototype,SC.Array);
SC.Array=SC.mixin({},SC.Enumerable,SC.Array);SC.Array.slice=function(b,e){var a=[];
var c=this.get("length");if(SC.none(b)){b=0}if(SC.none(e)||(e>c)){e=c}while(b<e){a[a.length]=this.objectAt(b++)
}return a};SC.Array.indexOf=function(e,c){var b,a=this.get("length");if(c===undefined){c=0
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b<a;b++){if(this.objectAt(b)===e){return b
}}return -1};if(!Array.prototype.indexOf){Array.prototype.indexOf=SC.Array.indexOf
}SC.Array.lastIndexOf=function(e,c){var b,a=this.get("length");if(c===undefined){c=a-1
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b>=0;b--){if(this.objectAt(b)===e){return b
}}return -1};if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=SC.Array.lastIndexOf
}(function(){SC.mixin(Array.prototype,{replace:function(e,h,g){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!g||g.length===0){this.splice(e,h)}else{var f=[e,h].concat(g);this.splice.apply(this,f)
}var c=g?(g.get?g.get("length"):g.length):0;this.enumerableContentDidChange(e,h,c-h);
return this},unknownProperty:function(e,f){var c=this.reducedProperty(e,f);if((f!==undefined)&&c===undefined){c=this[e]=f
}return c}});var b=Array.prototype.indexOf;if(!b||(b===SC.Array.indexOf)){Array.prototype.indexOf=function(g,f){var e,c=this.length;
if(f===undefined){f=0}else{f=(f<0)?Math.ceil(f):Math.floor(f)}if(f<0){f+=c}for(e=f;
e<c;e++){if(this[e]===g){return e}}return -1}}var a=Array.prototype.lastIndexOf;if(!a||(a===SC.Array.lastIndexOf)){Array.prototype.lastIndexOf=function(g,f){var e,c=this.length;
if(f===undefined){f=c-1}else{f=(f<0)?Math.ceil(f):Math.floor(f)}if(f<0){f+=c}for(e=f;
e>=0;e--){if(this[e]===g){return e}}return -1}}})();SC.Comparable={isComparable:YES,compare:function(e,c){throw"%@.compare() is not implemented".fmt(this.toString())
}};SC.Copyable={isCopyable:YES,copy:function(){throw"%@.copy() is not implemented"
},frozenCopy:function(){var a=this.get?this.get("isFrozen"):this.isFrozen;if(a===YES){return this
}else{if(a===undefined){throw"%@ does not support freezing".fmt(this)}else{return this.copy().freeze()
}}}};SC.mixin(Array.prototype,SC.Copyable);Array.prototype.copy=Array.prototype.slice;
SC.DelegateSupport={delegateFor:function(c){var b=1,a=arguments.length,e;while(b<a){e=arguments[b];
if(e&&e[c]!==undefined){return e}b++}return(this[c]!==undefined)?this:null},invokeDelegateMethod:function(c,a,b){b=SC.A(arguments);
b=b.slice(2,b.length);if(!c||!c[a]){c=this}var e=c[a];return e?e.apply(c,b):null},getDelegateProperty:function(e,f){var b=1,a=arguments.length,c;
while(b<a){c=arguments[b++];if(c&&c[e]!==undefined){return c.get?c.get(e):c[e]}}return(this[e]!==undefined)?this.get(e):undefined
}};SC.FROZEN_ERROR=new Error("Cannot modify a frozen object");SC.Freezable={isFreezable:YES,isFrozen:NO,freeze:function(){if(this.set){this.set("isFrozen",YES)
}else{this.isFrozen=YES}return this}};SC.mixin(Array.prototype,SC.Freezable);sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.Set=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,{create:function(b){var c,a,e=SC.Set._pool,f=this.isObservable;
if(!f&&b===undefined&&e.length>0){c=e.pop()}else{c=SC.beget(this);if(f){c.initObservable()
}if(b&&b.isEnumerable&&b.get("length")>0){c.isObservable=NO;if(b.isSCArray){a=b.get?b.get("length"):b.length;
while(--a>=0){c.add(b.objectAt(a))}}else{if(b.isSet){a=b.length;while(--a>=0){c.add(b[a])
}}else{b.forEach(function(g){c.add(g)},this)}}c.isObservable=f}}return c},isSet:YES,length:0,firstObject:function(){return(this.length>0)?this[0]:undefined
}.property(),clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}this.length=0;
return this},contains:function(b){if(b===null){return NO}var a=this[SC.hashFor(b)];
return(!SC.none(a)&&(a<this.length)&&(this[a]===b))},isEqual:function(a){if(!a||!a.isSet||(a.get("length")!==this.get("length"))){return NO
}var b=this.get("length");while(--b>=0){if(!a.contains(this[b])){return NO}}return YES
},add:function(e){if(this.isFrozen){throw SC.FROZEN_ERROR}if(e===null||e===undefined){return this
}var c=SC.hashFor(e);var b=this[c];var a=this.length;if((b===null||b===undefined)||(b>=a)||(this[b]!==e)){this[a]=e;
this[c]=a;this.length=a+1}if(this.isObservable){this.enumerableContentDidChange()
}return this},addEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var a,b=this.isObservable;if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");
while(--a>=0){this.add(c.objectAt(a))}}else{if(c.isSet){a=c.length;while(--a>=0){this.add(c[a])
}}else{c.forEach(function(e){this.add(e)},this)}}if(b){this.endPropertyChanges()}return this
},remove:function(e){if(this.isFrozen){throw SC.FROZEN_ERROR}if(SC.none(e)){return this
}var c=SC.hashFor(e);var b=this[c];var a=this.length;if(SC.none(b)||(b>=a)||(this[b]!==e)){return this
}delete this[c];if(b<(a-1)){e=this[b]=this[a-1];this[SC.hashFor(e)]=b}this.length=a-1;
if(this.isObservable){this.enumerableContentDidChange()}return this},pop:function(){if(this.isFrozen){throw SC.FROZEN_ERROR
}var a=(this.length>0)?this[this.length-1]:null;if(a){this.remove(a)}return a},removeEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)}var a,b=this.isObservable;
if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");while(--a>=0){this.remove(c.objectAt(a))
}}else{if(c.isSet){a=c.length;while(--a>=0){this.remove(c[a])}}else{c.forEach(function(e){this.remove(e)
},this)}}if(b){this.endPropertyChanges()}return this},copy:function(){return this.constructor.create(this)
},destroy:function(){this.isFrozen=NO;if(!this.isObservable){SC.Set._pool.push(this.clear())
}return this},forEach:function(c,e){var b=this.length;if(!e){e=this}for(var a=0;a<b;
a++){c.call(e,this[a],a,this)}return this},toString:function(){var b=this.length,a,c=[];
for(a=0;a<b;a++){c[a]=this[a]}return"SC.Set<%@>".fmt(c.join(","))},_pool:[],isObservable:YES});
SC.Set.constructor=SC.Set;SC.Set.clone=SC.Set.copy;SC.Set.push=SC.Set.unshift=SC.Set.add;
SC.Set.shift=SC.Set.pop;SC.Set.addObject=SC.Set.add;SC.Set.removeObject=SC.Set.remove;
SC.Set._pool=[];SC.CoreSet=SC.beget(SC.Set);SC.CoreSet.isObservable=NO;SC.CoreSet.constructor=SC.CoreSet;
sc_require("core");sc_require("mixins/observable");sc_require("mixins/array");sc_require("system/set");
SC.BENCHMARK_OBJECTS=NO;SC._object_extend=function _object_extend(h,g){if(!g){throw"SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"
}h._kvo_cloned=null;var z,o,v,f,j=h.concatenatedProperties,m=SC.K;var c,b;o=(j)?j.length:0;
var a=(o>0)?{}:null;while(--o>=0){z=j[o];c=h[z];b=g[z];if(c){if(!(c instanceof Array)){c=SC.$A(c)
}a[z]=(b)?c.concat(b):b}else{if(!(b instanceof Array)){b=SC.$A(b)}a[z]=b}}var y=h._bindings,n=NO;
var w=h._observers,x=NO;var k=h._properties,e=NO;var s,l,p;var u=h.outlets,t=NO;if(g.outlets){u=(u||SC.EMPTY_ARRAY).concat(g.outlets);
t=YES}for(z in g){if(z==="_kvo_cloned"){continue}if(!g.hasOwnProperty(z)){continue
}var q=(a.hasOwnProperty(z)?a[z]:null)||g[z];if(z.slice(-7)==="Binding"){if(!n){y=(y||SC.EMPTY_ARRAY).slice();
n=YES}if(y===null){y=(h._bindings||SC.EMPTY_ARRAY).slice()}y[y.length]=z}else{if(q&&(q instanceof Function)){if(!q.superclass&&(q!==(f=h[z]))){q.superclass=q.base=f||m
}if(q.propertyPaths){if(!x){w=(w||SC.EMPTY_ARRAY).slice();x=YES}w[w.length]=z}else{if(s=q.localPropertyPaths){l=s.length;
while(--l>=0){p=h._kvo_for(SC.keyFor("_kvo_local",s[l]),SC.Set);p.add(z);h._kvo_for("_kvo_observed_keys",SC.CoreSet).add(s[l])
}}else{if(q.dependentKeys){if(!e){k=(k||SC.EMPTY_ARRAY).slice();e=YES}k[k.length]=z
}else{if(q.autoconfiguredOutlet){if(!t){u=(u||SC.EMPTY_ARRAY).slice();t=YES}u[u.length]=z
}}}}}}h[z]=q}if(g.hasOwnProperty("toString")){z="toString";q=(a.hasOwnProperty(z)?a[z]:null)||g[z];
if(!q.superclass&&(q!==(f=h[z]))){q.superclass=q.base=f||m}h[z]=q}h._bindings=y||[];
h._observers=w||[];h._properties=k||[];h.outlets=u||[];return h};SC.Object=function(a){return this._object_init(a)
};SC.mixin(SC.Object,{mixin:function(b){var a=arguments.length,c;for(c=0;c<a;c++){SC.mixin(this,arguments[c])
}return this},superclass:null,extend:function(f){var e=SC.BENCHMARK_OBJECTS;if(e){SC.Benchmark.start("SC.Object.extend")
}var h,c=function(j){return this._object_init(j)};for(h in this){if(!this.hasOwnProperty(h)){continue
}c[h]=this[h]}if(this.hasOwnProperty("toString")){c.toString=this.toString}c.superclass=this;
SC.generateGuid(c);c.subclasses=SC.Set.create();this.subclasses.add(c);var g=(c.prototype=SC.beget(this.prototype));
var b,a=arguments.length;for(b=0;b<a;b++){SC._object_extend(g,arguments[b])}g.constructor=c;
if(e){SC.Benchmark.end("SC.Object.extend")}return c},create:function(){var b=this,a=new b(arguments);
if(SC.ObjectDesigner){SC.ObjectDesigner.didCreateObject(a,SC.$A(arguments))}return a
},isClass:YES,subclasses:SC.Set.create(),toString:function(){return SC._object_className(this)
},subclassOf:function(b){if(this===b){return NO}var a=this;while(a=a.superclass){if(a===b){return YES
}}return NO},hasSubclass:function(a){return(a&&a.subclassOf)?a.subclassOf(this):NO
},kindOf:function(a){return(this===a)||this.subclassOf(a)},design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ObjectDesigner){SC.ObjectDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a}});SC.Object.prototype={_kvo_enabled:YES,_object_init:function(c){var b,a=(c)?c.length:0;
for(b=0;b<a;b++){SC._object_extend(this,c[b])}SC.generateGuid(this);this.init();var e=this.initMixin;
a=(e)?e.length:0;for(b=0;b<a;b++){e[b].call(this)}return this},mixin:function(){var b,a=arguments.length;
for(b=0;b<a;b++){SC.mixin(this,arguments[b])}for(b=0;b<a;b++){var c=arguments[b].initMixin;
if(c){c.call(this)}}return this},init:function(){this.initObservable();return this
},isDestroyed:NO,destroy:function(){if(this.get("isDestroyed")){return this}this.set("isDestroyed",YES);
var b,c=this.destroyMixin,a=(c)?c.length:0;for(b=0;b<a;b++){c[b].call(this)}return this
},isObject:true,respondsTo:function(a){return !!(SC.typeOf(this[a])===SC.T_FUNCTION)
},tryToPerform:function(b,c,a){return this.respondsTo(b)&&(this[b](c,a)!==NO)},superclass:function(b){var a=arguments.callee.caller;
if(!a){throw"superclass cannot determine the caller method"}return a.superclass?a.superclass.apply(this,arguments):null
},instanceOf:function(a){return this.constructor===a},kindOf:function(a){return this.constructor.kindOf(a)
},toString:function(){if(!this._object_toString){var a=SC._object_className(this.constructor);
var b="%@:%@".fmt(a,SC.guidFor(this));if(a){this._object_toString=b}else{return b
}}return this._object_toString},awake:function(c){var f=this.outlets,b,a,e;for(b=0,a=f.length;
b<a;++b){e=f[b];this.get(e)}this.bindings.invoke("sync")},invokeOnce:function(a){SC.RunLoop.currentRunLoop.invokeOnce(this,a);
return this},invokeLast:function(a){SC.RunLoop.currentRunLoop.invokeLast(this,a);
return this},concatenatedProperties:["concatenatedProperties","initMixin","destroyMixin"]};
SC.Object.prototype.constructor=SC.Object;SC.mixin(SC.Object.prototype,SC.Observable);
function findClassNames(){if(SC._object_foundObjectClassNames){return}SC._object_foundObjectClassNames=true;
var b=[];var a=function(c,e,h){h--;if(b.indexOf(e)>=0){return}b.push(e);for(var f in e){if(f=="__scope__"){continue
}if(f=="superclass"){continue}if(!f.match(/^[A-Z0-9]/)){continue}var j=(c)?[c,f].join("."):f;
var g=e[f];switch(SC.typeOf(g)){case SC.T_CLASS:if(!g._object_className){g._object_className=j
}if(h>=0){a(j,g,h)}break;case SC.T_OBJECT:if(h>=0){a(j,g,h)}break;case SC.T_HASH:if(((c)||(j==="SC"))&&(h>=0)){a(j,g,h)
}break;default:break}}};a(null,window,2)}SC.instanceOf=function(a,b){return !!(a&&a.constructor===b)
};SC.kindOf=function(a,b){if(a&&!a.isClass){a=a.constructor}return !!(a&&a.kindOf&&a.kindOf(b))
};SC._object_className=function(b){if(!SC.isReady){return""}if(!b._object_className){findClassNames()
}if(b._object_className){return b._object_className}var a=b;while(a&&!a._object_className){a=a.superclass
}return(a&&a._object_className)?a._object_className:"Anonymous"};require("system/object");
SC._ChainObserver=function(a){this.property=a};SC._ChainObserver.createChain=function(e,l,g,a,b){var c=l.split("."),j=new SC._ChainObserver(c[0]),h=j,f=c.length;
for(var k=1;k<f;k++){h=h.next=new SC._ChainObserver(c[k])}j.objectDidChange(e);h.target=g;
h.method=a;h.context=b;return j};SC._ChainObserver.prototype={isChainObserver:true,object:null,property:null,next:null,target:null,method:null,objectDidChange:function(a){if(a===this.object){return
}if(this.object&&this.object.removeObserver){this.object.removeObserver(this.property,this,this.propertyDidChange)
}this.object=a;if(this.object&&this.object.addObserver){this.object.addObserver(this.property,this,this.propertyDidChange)
}this.propertyDidChange()},propertyDidChange:function(){var b=this.object;var f=this.property;
var e=(b&&b.get)?b.get(f):null;if(this.next){this.next.objectDidChange(e)}var g=this.target,h=this.method,c=this.context;
if(g&&h){var a=b?b.propertyRevision:null;if(c){h.call(g,b,f,e,c,a)}else{h.call(g,b,f,e,a)
}}},destroyChain:function(){var a=this.object;if(a&&a.removeObserver){a.removeObserver(this.property,this,this.propertyDidChange)
}if(this.next){this.next.destroyChain()}this.next=this.target=this.method=this.object=this.context=null;
return null}};sc_require("mixins/observable");sc_require("system/set");SC.Observers={queue:[],addObserver:function(c,e,f,b){var a;
if(SC.typeOf(c)===SC.T_STRING){a=SC.tupleForPropertyPath(c,b)}else{a=c}if(a){a[0].addObserver(a[1],e,f)
}else{this.queue.push([c,e,f,b])}},removeObserver:function(g,h,j,e){var c,b,a,f;a=SC.tupleForPropertyPath(g,e);
if(a){a[0].removeObserver(a[1],h,j)}c=this.queue.length;b=this.queue;while(--c>=0){f=b[c];
if((f[0]===g)&&(f[1]===h)&&(f[2]==j)&&(f[3]===e)){b[c]=null}}},addPendingRangeObserver:function(a){var b=this.rangeObservers;
if(!b){b=this.rangeObservers=SC.CoreSet.create()}b.add(a);return this},_TMP_OUT:[],flush:function(a){var f=this.queue;
if(f&&f.length>0){var j=(this.queue=[]);var k=f.length;while(--k>=0){var l=f[k];if(!l){continue
}var g=SC.tupleForPropertyPath(l[0],l[3]);if(g){g[0].addObserver(g[1],l[1],l[2])}else{j.push(l)
}}}if(a._kvo_needsRangeObserver){var h=this.rangeObservers,e=h?h.get("length"):0,b=this._TMP_OUT,c;
for(k=0;k<e;k++){c=h[k];if(c.setupPending(a)){b.push(c)}}if(b.length>0){h.removeEach(b)
}b.length=0;a._kvo_needsRangeObserver=NO}},isObservingSuspended:0,_pending:SC.CoreSet.create(),objectHasPendingChanges:function(a){this._pending.add(a)
},suspendPropertyObserving:function(){this.isObservingSuspended++},resumePropertyObserving:function(){var c;
if(--this.isObservingSuspended<=0){c=this._pending;this._pending=SC.CoreSet.create();
var b,a=c.length;for(b=0;b<a;b++){c[b]._notifyPropertyObservers()}c.clear();c=null
}}};sc_require("system/object");SC.LOG_BINDINGS=NO;SC.BENCHMARK_BINDING_NOTIFICATIONS=NO;
SC.BENCHMARK_BINDING_SETUP=NO;SC.MULTIPLE_PLACEHOLDER="@@MULT@@";SC.NULL_PLACEHOLDER="@@NULL@@";
SC.EMPTY_PLACEHOLDER="@@EMPTY@@";SC.Binding={beget:function(b){var a=SC.beget(this);
a.parentBinding=this;if(b!==undefined){a=a.from(b)}return a},builder:function(){var b=this,a=function(c){return b.beget().from(c)
};a.beget=function(){return b.beget()};return a},from:function(b,a){if(!b){return this
}var c=(this===SC.Binding)?this.beget():this;c._fromPropertyPath=b;c._fromRoot=a;
c._fromTuple=null;return c},to:function(b,a){var c=(this===SC.Binding)?this.beget():this;
c._toPropertyPath=b;c._toRoot=a;c._toTuple=null;return c},connect:function(){if(this.isConnected){return this
}this.isConnected=YES;this._connectionPending=YES;this._syncOnConnect=YES;SC.Binding._connectQueue.add(this);
return this},_connect:function(){if(!this._connectionPending){return}this._connectionPending=NO;
var c,a,b=SC.BENCHMARK_BINDING_SETUP;if(b){SC.Benchmark.start("SC.Binding.connect()")
}c=this._fromPropertyPath;a=this._fromRoot;if(SC.typeOf(c)===SC.T_STRING){if(c.indexOf(".")===0){c=c.slice(1);
if(!a){a=this._toRoot}}else{if(c.indexOf("*")===0){c=[this._fromRoot||this._toRoot,c.slice(1)];
a=null}}}SC.Observers.addObserver(c,this,this.fromPropertyDidChange,a);if(!this._oneWay){c=this._toPropertyPath;
a=this._toRoot;SC.Observers.addObserver(c,this,this.toPropertyDidChange,a)}if(b){SC.Benchmark.end("SC.Binding.connect()")
}if(this._syncOnConnect){this._syncOnConnect=NO;if(b){SC.Benchmark.start("SC.Binding.connect().sync")
}this.sync();if(b){SC.Benchmark.end("SC.Binding.connect().sync")}}},disconnect:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._connectionPending=NO}else{SC.Observers.removeObserver(this._fromPropertyPath,this,this.fromPropertyDidChange,(this._fromRoot||this._toRoot));
if(!this._oneWay){SC.Observers.removeObserver(this._toPropertyPath,this,this.toPropertyDidChange,this._toRoot)
}}this.isConnected=NO;return this},fromPropertyDidChange:function(c,b){var a=c?c.get(b):null;
if(a!==this._bindingValue||b==="[]"){this._setBindingValue(c,b);this._changePending=YES;
SC.Binding._changeQueue.add(this)}},toPropertyDidChange:function(c,b){if(this._oneWay){return
}var a=c.get(b);if(a!==this._transformedBindingValue){this._setBindingValue(c,b);
this._changePending=YES;SC.Binding._changeQueue.add(this)}},_setBindingValue:function(b,a){this._bindingSource=b;
this._bindingKey=a},_computeBindingValue:function(){var h=this._bindingSource,f=this._bindingKey,c,b;
this._bindingValue=c=(h?h.getPath(f):null);var g=this._transforms;if(g){var a=g.length,e;
for(b=0;b<a;b++){e=g[b];c=e(c,this)}}if(this._noError&&SC.typeOf(c)===SC.T_ERROR){c=null
}this._transformedBindingValue=c},_connectQueue:SC.CoreSet.create(),_alternateConnectQueue:SC.CoreSet.create(),_changeQueue:SC.CoreSet.create(),_alternateChangeQueue:SC.CoreSet.create(),_changePending:NO,flushPendingChanges:function(){if(this._isFlushing){return NO
}this._isFlushing=YES;SC.Observers.suspendPropertyObserving();var b=NO,c=SC.LOG_BINDINGS,a,e;
while((a=this._connectQueue).length>0){this._connectQueue=this._alternateConnectQueue;
this._alternateConnectQueue=a;while(e=a.pop()){e._connect()}}while((a=this._changeQueue).length>0){if(c){console.log("Begin: Trigger changed bindings")
}b=YES;this._changeQueue=this._alternateChangeQueue;this._alternateChangeQueue=a;
while(e=a.pop()){e.applyBindingValue()}if(c){console.log("End: Trigger changed bindings")
}}this._isFlushing=NO;SC.Observers.resumePropertyObserving();return b},applyBindingValue:function(){this._changePending=NO;
this._computeBindingTargets();this._computeBindingValue();var a=this._bindingValue,b=this._transformedBindingValue,c=SC.BENCHMARK_BINDING_NOTIFICATIONS,e=SC.LOG_BINDINGS;
if(!this._oneWay&&this._fromTarget){if(e){console.log("%@: %@ -> %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"->")}this._fromTarget.setPathIfChanged(this._fromPropertyKey,a);
if(c){SC.Benchmark.end(this.toString()+"->")}}if(this._toTarget){if(e){console.log("%@: %@ <- %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"<-")}this._toTarget.setPathIfChanged(this._toPropertyKey,b);
if(c){SC.Benchmark.start(this.toString()+"<-")}}},sync:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._syncOnConnect=YES}else{this._computeBindingTargets();
var c=this._fromTarget,b=this._fromPropertyKey;if(!c||!b){return this}var a=c.getPath(b);
if(a!==this._bindingValue||b==="[]"){this._setBindingValue(c,b);this._changePending=YES;
SC.Binding._changeQueue.add(this)}}return this},_syncOnConnect:NO,_computeBindingTargets:function(){if(!this._fromTarget){var c,b,a;
c=this._fromPropertyPath;b=this._fromRoot;if(SC.typeOf(c)===SC.T_STRING){if(c.indexOf(".")===0){c=c.slice(1);
if(!b){b=this._toRoot}}else{if(c.indexOf("*")===0){c=[b||this._toRoot,c.slice(1)];
b=null}}}a=SC.tupleForPropertyPath(c,b);if(a){this._fromTarget=a[0];this._fromPropertyKey=a[1]
}}if(!this._toTarget){c=this._toPropertyPath;b=this._toRoot;a=SC.tupleForPropertyPath(c,b);
if(a){this._toTarget=a[0];this._toPropertyKey=a[1]}}},oneWay:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._oneWay=(a===undefined)?YES:a;
return b},transform:function(b){var c=(this===SC.Binding)?this.beget():this;var a=c._transforms;
if(a&&(a===c.parentBinding._transform)){a=c._transforms=a.slice()}if(!a){a=c._transforms=[]
}a.push(b);return c},resetTransforms:function(){var a=(this===SC.Binding)?this.beget():this;
a._transforms=null;return a},noError:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._noError=(a===undefined)?YES:a;
return b},single:function(b,a){if(a===undefined){a=SC.MULTIPLE_PLACEHOLDER}return this.from(b).transform(function(f,e){if(f&&f.isEnumerable){var c=f.get("length");
f=(c>1)?a:(c<=0)?null:f.firstObject()}return f})},notEmpty:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER
}return this.from(b).transform(function(e,c){if(SC.none(e)||(e==="")||(SC.isArray(e)&&e.length===0)){e=a
}return e})},notNull:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER}return this.from(b).transform(function(e,c){if(SC.none(e)){e=a
}return e})},multiple:function(a){return this.from(a).transform(function(b){if(!SC.isArray(b)){b=(b==null)?[]:[b]
}return b})},bool:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return(c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b})},and:function(b,a){var c=SC.Object.create({valueABinding:b,valueBBinding:a,and:function(){return(this.get("valueA")&&this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("and",c).oneWay()},or:function(b,a){var c=SC.Object.create({valueABinding:b,valueBBinding:a,or:function(){return(this.get("valueA")||this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("or",c).oneWay()},not:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return !((c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b)
})},isNull:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
return(c===SC.T_ERROR)?b:SC.none(b)})},toString:function(){var c=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var b=this._toRoot?"<%@>:%@".fmt(this._toRoot,this._toPropertyPath):this._toPropertyPath;
var a=this._oneWay?"[oneWay]":"";return"SC.Binding%@(%@ -> %@)%@".fmt(SC.guidFor(this),c,b,a)
}};SC.binding=function(b,a){return SC.Binding.from(b,a)};SC.Cookie=SC.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:NO,isCookie:YES,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var b=this.get("name"),k=this.get("value"),c=this.get("expires"),m=this.get("path"),f=this.get("domain"),a=this.get("secure");
var j="";if(c&&(SC.typeOf(c)===SC.T_NUMBER||(SC.DateTime&&c.get&&c.get("milliseconds"))||SC.typeOf(c.toUTCString)===SC.T_FUNCTION)){var e;
if(SC.typeOf(c)===SC.T_NUMBER){e=new Date();e.setTime(e.getTime()+(c*24*60*60*1000))
}else{if(SC.DateTime&&c.get&&c.get("milliseconds")){e=new Date(c.get("milliseconds"))
}else{if(SC.typeOf(c.toUTCString)===SC.T_FUNCTION){e=c}}}if(e){j="; expires="+e.toUTCString()
}}var l=m?"; path="+m:"";var h=f?"; domain="+f:"";var g=a?"; secure":"";document.cookie=[b,"=",encodeURIComponent(k),j,l,h,g].join("");
return this}});SC.Cookie.mixin({find:function(a){if(document.cookie&&document.cookie!=""){var e=document.cookie.split(";");
for(var c=0;c<e.length;c++){var b=String(e[c]).trim();if(b.substring(0,a.length+1)===(a+"=")){return SC.Cookie.create({name:a,value:decodeURIComponent(b.substring(a.length+1))})
}}}return null}});SC.Error=SC.Object.extend({code:-1,message:"",errorValue:null,errorObject:function(){return this
}.property().cacheable(),label:null,toString:function(){return"SC.Error:%@:%@ (%@)".fmt(SC.guidFor(this),this.get("message"),this.get("code"))
},isError:YES});SC.Error.desc=function(e,a,f,c){var b={message:e};if(a!==undefined){b.label=a
}if(c!==undefined){b.code=c}if(f!==undefined){b.errorValue=f}return this.create(b)
};SC.$error=function(b,a,e,f){return SC.Error.desc(b,a,e,f)};SC.ok=function(a){return(a!==false)&&!(a&&a.isError)
};SC.$ok=SC.ok;SC.val=function(a){if(a&&a.isError){return a.get?a.get("errorValue"):null
}else{return a}};SC.$val=SC.val;SC.Error.HAS_MULTIPLE_VALUES=-100;sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.IndexSet=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,SC.Copyable,{_sc_sliceContent:function(f){if(f.length<1000){return f.slice()
}var e=0,a=[],b=f[0];while(b!==0){a[e]=b;e=(b<0)?(0-b):b;b=f[e]}a[e]=0;this._hint(0,e,a);
return a},create:function(c,b){var a=SC.beget(this);a.initObservable();a.registerDependentKey("min","[]");
if(c&&c.isIndexSet){a._content=this._sc_sliceContent(c._content);a.max=c.max;a.length=c.length;
a.source=c.source}else{a._content=[0];if(c!==undefined){a.add(c,b)}}return a},isIndexSet:YES,HINT_SIZE:256,length:0,max:0,min:function(){var a=this._content,b=a[0];
return(b===0)?-1:(b>0)?0:Math.abs(b)}.property("[]").cacheable(),firstObject:function(){return(this.get("length")>0)?this.get("min"):undefined
}.property(),rangeStartForIndex:function(c){var g=this._content,a=this.get("max"),b,f,e;
if(c>=a){return a}if(Math.abs(g[c])>c){return c}e=c-(c%SC.IndexSet.HINT_SIZE);b=g[e];
if(b<0||b>c){b=e}f=Math.abs(g[b]);while(f<c){b=f;f=Math.abs(g[b])}return b},isEqual:function(c){if(c===this){return YES
}if(!c||!c.isIndexSet||(c.max!==this.max)||(c.length!==this.length)){return NO}var f=this._content,b=c._content,e=0,a=f[e];
do{if(b[e]!==a){return NO}e=Math.abs(a);a=f[e]}while(e!==0);return YES},indexBefore:function(b){if(b===0){return -1
}b--;var c=this._content,a=this.get("max"),e=this.rangeStartForIndex(b);if(!c){return null
}while((e===a)||(c[e]<0)){if(e===0){return -1}b=e-1;e=this.rangeStartForIndex(b)}return b
},indexAfter:function(b){var e=this._content,a=this.get("max"),f,c;if(!e||(b>=a)){return -1
}b++;f=this.rangeStartForIndex(b);c=e[f];while(c<0){if(c===0){return -1}b=f=Math.abs(c);
c=e[f]}return b},contains:function(h,c){var b,g,a,f,e;if(c===undefined){if(h===null||h===undefined){return NO
}if(typeof h===SC.T_NUMBER){c=1}else{if(h&&h.isIndexSet){if(h===this){return YES}b=h._content;
g=0;a=b[g];while(a!==0){if((a>0)&&!this.contains(g,a-g)){return NO}g=Math.abs(a);
a=b[g]}return YES}else{c=h.length;h=h.start}}}f=this.rangeStartForIndex(h);e=this._content[f];
return(e>0)&&(f<=h)&&(e>=(h+c))},intersects:function(g,c){var b,f,a,e;if(c===undefined){if(typeof g===SC.T_NUMBER){c=1
}else{if(g&&g.isIndexSet){if(g===this){return YES}b=g._content;f=0;a=b[f];while(a!==0){if((a>0)&&this.intersects(f,a-f)){return YES
}f=Math.abs(a);a=b[f]}return NO}else{c=g.length;g=g.start}}}f=this.rangeStartForIndex(g);
b=this._content;a=b[f];e=g+c;while(f<e){if(a===0){return NO}if((a>0)&&(a>g)){return YES
}f=Math.abs(a);a=b[f]}return NO},without:function(b,a){if(b===this){return SC.IndexSet.create()
}return this.clone().remove(b,a)},replace:function(c,a){if(a===undefined){if(typeof c===SC.T_NUMBER){a=1
}else{if(c&&c.isIndexSet){this._content=this._sc_sliceContent(c._content);this.beginPropertyChanges().set("max",c.max).set("length",c.length).set("source",c.source).enumerableContentDidChange().endPropertyChanges();
return this}else{a=c.length;c=c.start}}}var b=this.length;this._content.length=1;
this._content[0]=0;this.length=this.max=0;return this.add(c,a)},add:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}var f,k,e;if(a&&a.isIndexSet){f=a._content;if(!f){return this}k=0;e=f[0];while(e!==0){if(e>0){this.add(k,e-k)
}k=e<0?0-e:e;e=f[k]}return this}else{if(b===undefined){if(a===null||a===undefined){return this
}else{if(typeof a===SC.T_NUMBER){b=1}else{b=a.length;a=a.start}}}else{if(b===null){b=1
}}}if(b<=0){return this}var g=this.get("max"),c=g,j,h;f=this._content;if(a===g){if(a>0){k=this.rangeStartForIndex(a-1);
e=f[k];if(e>0){delete f[g];f[k]=g=a+b;a=k}else{f[g]=g=a+b}}else{f[a]=g=b}f[g]=0;this.set("max",g);
this.set("length",this.length+b);b=g-a}else{if(a>g){f[g]=0-a;f[a]=a+b;f[a+b]=0;this.set("max",a+b);
this.set("length",this.length+b);b=a+b-g;a=g}else{k=this.rangeStartForIndex(a);e=f[k];
g=a+b;j=0;if((a>0)&&(k===a)&&(e<=0)){k=this.rangeStartForIndex(a-1);e=f[k]}if(e<0){f[k]=0-a;
if(Math.abs(e)>g){f[a]=0-g;f[g]=e}else{f[a]=e}}else{a=k;if(e>g){g=e}}k=a;while(k<g){h=f[k];
if(h===0){f[g]=0;e=g;j+=g-k}else{e=Math.abs(h);if(e>g){f[g]=h;e=g}if(h<0){j+=e-k}}delete f[k];
k=e}if((k=f[g])>0){delete f[g];g=k}f[a]=g;if(g>c){this.set("max",g)}this.set("length",this.get("length")+j);
b=g-a}}this._hint(a,b);if(j!==0){this.enumerableContentDidChange()}return this},remove:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(b===undefined){if(a===null||a===undefined){return this}else{if(typeof a===SC.T_NUMBER){b=1
}else{if(a.isIndexSet){a.forEachRange(this.remove,this);return this}else{b=a.length;
a=a.start}}}}if(b<=0){return this}var g=this.get("max"),c=g,f=this._content,l,e,k,h,j;
if(a>=g){return this}l=this.rangeStartForIndex(a);e=f[l];j=a+b;k=0;if((a>0)&&(l===a)&&(e>0)){l=this.rangeStartForIndex(a-1);
e=f[l]}if(e>0){f[l]=a;if(e>j){f[a]=j;f[j]=e}else{f[a]=e}}else{a=l;e=Math.abs(e);if(e>j){j=e
}}l=a;while(l<j){h=f[l];if(h===0){f[j]=0;e=j}else{e=Math.abs(h);if(e>j){f[j]=h;e=j
}if(h>0){k+=e-l}}delete f[l];l=e}if((l=f[j])<0){delete f[j];j=Math.abs(l)}if(f[j]===0){delete f[j];
f[a]=0;this.set("max",a)}else{f[a]=0-j}this.set("length",this.get("length")-k);b=j-a;
this._hint(a,b);if(k!==0){this.enumerableContentDidChange()}return this},_hint:function(h,e,c){if(c===undefined){c=this._content
}var b=SC.IndexSet.HINT_SIZE,a=Math.abs(c[h]),g=h-(h%b)+b,f=h+e;while(g<f){while((a!==0)&&(a<=g)){h=a;
a=Math.abs(c[h])}if(a===0){delete c[g]}else{if(g!==h){c[g]=h}}g+=b}},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR
}var a=this.length;this._content.length=1;this._content[0]=0;this.set("length",0).set("max",0);
if(a>0){this.enumerableContentDidChange()}},addEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR
}this.beginPropertyChanges();var a=b.get("length");if(b.isSCArray){while(--a>=0){this.add(b.objectAt(a))
}}else{if(b.isEnumerable){b.forEach(function(c){this.add(c)},this)}}this.endPropertyChanges();
return this},removeEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR}this.beginPropertyChanges();
var a=b.get("length");if(b.isSCArray){while(--a>=0){this.remove(b.objectAt(a))}}else{if(b.isEnumerable){b.forEach(function(c){this.remove(c)
},this)}}this.endPropertyChanges();return this},clone:function(){return SC.IndexSet.create(this)
},inspect:function(){var f=this._content,b=f.length,a=0,c=[],e;for(a=0;a<b;a++){e=f[a];
if(e!==undefined){c.push("%@:%@".fmt(a,e))}}return"SC.IndexSet<%@>".fmt(c.join(" , "))
},forEachRange:function(g,e){var b=this._content,f=0,a=b[f],c=this.source;if(e===undefined){e=null
}while(a!==0){if(a>0){g.call(e,f,a-f,this,c)}f=Math.abs(a);a=b[f]}return this},forEachIn:function(b,c,l,g){var h=this._content,k=0,j=0,e=b+c,a=this.source,f=h[k];
if(g===undefined){g=null}while(f!==0){if(k<b){k=b}while((k<f)&&(k<e)){l.call(g,k++,j++,this,a)
}if(k>=e){k=f=0}else{k=Math.abs(f);f=h[k]}}return this},lengthIn:function(h,e){var a=0;
if(e===undefined){if(h===null||h===undefined){return 0}else{if(typeof h===SC.T_NUMBER){e=1
}else{if(h.isIndexSet){h.forEachRange(function(k,j){a+=this.lengthIn(k,j)},this);
return a}else{e=h.length;h=h.start}}}}if(this.get("length")===0){return 0}var c=this._content,g=0,b=c[g],f=h+e;
while(g<f&&b!==0){if(b>0){a+=(b>f)?f-g:b-g}g=Math.abs(b);b=c[g]}return a},source:null,indexOf:function(e,c){var g=this.source;
if(!g){throw"%@.indexOf() requires source".fmt(this)}var b=g.get("length"),f=this._content,h=f[0]<0?Math.abs(f[0]):0,a;
while(h>=0&&h<b){a=g.indexOf(e,h);if(a<0){return -1}if(this.contains(a)){return a
}h=a+1}return -1},lastIndexOf:function(e,c){var f=this.source;if(!f){throw"%@.lastIndexOf() requires source".fmt(this)
}var b=f.get("length"),g=this.max-1,a;if(g>=b){g=b-1}while(g>=0){a=f.lastIndexOf(e,g);
if(a<0){return -1}if(this.contains(a)){return a}g=a+1}return -1},forEachObject:function(h,f){var e=this.source;
if(!e){throw"%@.forEachObject() requires source".fmt(this)}var c=this._content,g=0,a=0,b=c[g];
if(f===undefined){f=null}while(b!==0){while(g<b){h.call(f,e.objectAt(g),g,e,this);
g++}g=Math.abs(b);b=c[g]}return this},addObject:function(c,e){var f=this.source;if(!f){throw"%@.addObject() requires source".fmt(this)
}var b=f.get("length"),g=0,a;while(g>=0&&g<b){a=f.indexOf(c,g);if(a>=0){this.add(a);
if(e){return this}g=a++}else{return this}}return this},addObjects:function(b,a){b.forEach(function(c){this.addObject(c,a)
},this);return this},removeObject:function(c,e){var f=this.source;if(!f){throw"%@.removeObject() requires source".fmt(this)
}var b=f.get("length"),g=0,a;while(g>=0&&g<b){a=f.indexOf(c,g);if(a>=0){this.remove(a);
if(e){return this}g=a+1}else{return this}}return this},removeObjects:function(b,a){b.forEach(function(c){this.removeObject(c,a)
},this);return this},LOG_OBSERVING:NO,forEach:function(h,f){var c=this._content,g=0,a=0,e=this.source,b=c[g];
if(f===undefined){f=null}while(b!==0){while(g<b){h.call(f,g++,a++,this,e)}g=Math.abs(b);
b=c[g]}return this},nextObject:function(g,b,c){var f=this._content,e=c.next,a=this.get("max");
if(b===null){b=e=0}else{if(b>=a){delete c.next;return null}else{b++}}if(b===e){do{b=Math.abs(e);
e=f[b]}while(e<0);c.next=e}return b},toString:function(){var a=[];this.forEachRange(function(c,b){a.push(b===1?c:"%@..%@".fmt(c,c+b-1))
},this);return"SC.IndexSet<%@>".fmt(a.join(","))},max:0});SC.IndexSet.slice=SC.IndexSet.copy=SC.IndexSet.clone;
SC.IndexSet.EMPTY=SC.IndexSet.create().freeze();SC.LOGGER_LOG_DELIMITER=", ";SC.LOGGER_LOG_ERROR="ERROR: ";
SC.LOGGER_LOG_INFO="INFO: ";SC.LOGGER_LOG_WARN="WARNING: ";SC.LOGGER_LOG_DEBUG="DEBUG: ";
SC.Logger=SC.Object.create({debugEnabled:NO,exists:function(){return typeof(this.get("reporter"))!=="undefined"&&this.get("reporter")!=null
}.property("reporter").cacheable(),fallBackOnAlert:NO,fallBackOnLog:YES,format:YES,reporter:console,log:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.log)==="function"){if(this.get("format")){a.log(this._argumentsToString.apply(this,arguments))
}else{a.log.apply(a,arguments)}return true}else{if(this.fallBackOnAlert){var b=this.get("format")?this._argumentsToString.apply(this,arguments):arguments;
if(this.get("exists")&&typeof(a.alert)==="function"){a.alert(b)}else{alert(b)}return true
}}return false},debug:function(){var c=this.get("reporter");if(this.get("debugEnabled")!==YES){return false
}if(this.get("exists")&&(typeof c.debug==="function")){c.debug.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_DEBUG)
}return this.log.apply(this,b)}}return false},dir:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dir)==="function"){a.dir.apply(a,arguments);return true
}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},dirxml:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dirxml)==="function"){a.dirxml.apply(a,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},error:function(){var c=this.get("reporter");
if(this.get("exists")&&typeof(c.error)==="function"){c.error.apply(c,arguments);return true
}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_ERROR)
}return this.log.apply(this,b)}}return false},group:function(b){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.group)==="function"){a.group(b);return true}return false
},groupEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.groupEnd)==="function"){a.groupEnd();
return true}return false},info:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.info)==="function"){c.info.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_INFO)
}return this.log.apply(this,b)}}return false},profile:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.profile)==="function"){a.profile();return true}return false
},profileEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.profileEnd)==="function"){a.profileEnd();
return true}return false},time:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.time)==="function"){a.time(b);
return true}return false},timeEnd:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.timeEnd)==="function"){a.timeEnd(b);
return true}return false},trace:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.trace)==="function"){a.trace();
return true}return false},warn:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.warn)==="function"){c.warn.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_WARN)
}return this.log.apply(this,b)}}return false},_argumentsToArray:function(e){if(!e){return[]
}var b=[];for(var c=0;c<e.length;c++){b[c]=e[c]}return b},_argumentsToString:function(){var b="";
for(var a=0;a<arguments.length-1;a++){b+=arguments[a]+SC.LOGGER_LOG_DELIMITER}b+=arguments[arguments.length-1];
return b}});sc_require("private/observer_set");SC.RunLoop=SC.Object.extend({beginRunLoop:function(){this._start=new Date().getTime();
if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start))
}this._runLoopInProgress=YES;return this},isRunLoopInProgress:function(){return this._runLoopInProgress
}.property(),endRunLoop:function(){var a;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ flushing application queues")
}do{a=this.flushApplicationQueues();if(!a){a=this._flushinvokeLastQueue()}}while(a);
this._start=null;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ End")
}SC.RunLoop.lastRunLoopEnd=Date.now();this._runLoopInProgress=NO;return this},invokeOnce:function(a,b){if(b===undefined){b=a;
a=this}if(SC.typeOf(b)===SC.T_STRING){b=a[b]}if(!this._invokeQueue){this._invokeQueue=SC.ObserverSet.create()
}this._invokeQueue.add(a,b);return this},invokeLast:function(a,b){if(b===undefined){b=a;
a=this}if(SC.typeOf(b)===SC.T_STRING){b=a[b]}if(!this._invokeLastQueue){this._invokeLastQueue=SC.ObserverSet.create()
}this._invokeLastQueue.add(a,b);return this},flushApplicationQueues:function(){var b=NO,a=this._invokeQueue;
if(a&&a.targets>0){this._invokeQueue=null;b=YES;a.invokeMethods()}return SC.Binding.flushPendingChanges()||b
},_flushinvokeLastQueue:function(){var a=this._invokeLastQueue,b=NO;if(a&&a.targets>0){this._invokeLastQueue=null;
b=YES;if(b){a.invokeMethods()}}return b}});SC.RunLoop.currentRunLoop=null;SC.RunLoop.runLoopClass=SC.RunLoop;
SC.RunLoop.begin=function(){var a=this.currentRunLoop;if(!a){a=this.currentRunLoop=this.runLoopClass.create()
}a.beginRunLoop();return this};SC.RunLoop.end=function(){var a=this.currentRunLoop;
if(!a){throw"SC.RunLoop.end() called outside of a runloop!"}a.endRunLoop();return this
};SC.RunLoop.isRunLoopInProgress=function(){if(this.currentRunLoop){return this.currentRunLoop.get("isRunLoopInProgress")
}return NO};SC.run=function(e,c,b){if(b){var a=SC.RunLoop.isRunLoopInProgress();if(!a){SC.RunLoop.begin()
}e.call(c);if(!a){SC.RunLoop.end()}}else{SC.RunLoop.begin();e.call(c);SC.RunLoop.end()
}};sc_require("system/object");sc_require("mixins/enumerable");sc_require("mixins/copyable");
sc_require("mixins/freezable");SC.SelectionSet=SC.Object.extend(SC.Enumerable,SC.Freezable,SC.Copyable,{isSelectionSet:YES,length:function(){var a=0,b=this._sets,c=this._objects;
if(c){a+=c.get("length")}if(b){b.forEach(function(e){a+=e.get("length")})}return a
}.property().cacheable(),sources:function(){var c=[],e=this._sets,b=e?e.length:0,a,g,f;
for(a=0;a<b;a++){g=e[a];if(g&&g.get("length")>0&&g.source){c.push(g.source)}}return c
}.property().cacheable(),indexSetForSource:function(f){if(!f||!f.isSCArray){return null
}var b=this._indexSetCache,e=this._objects,c,a;if(!b){b=this._indexSetCache={}}c=b[SC.guidFor(f)];
if(c&&c._sourceRevision&&(c._sourceRevision!==f.propertyRevision)){c=null}if(!c){c=this._indexSetForSource(f,NO);
if(c&&c.get("length")===0){c=null}if(e){if(c){c=c.copy()}e.forEach(function(g){if((a=f.indexOf(g))>=0){if(!c){c=SC.IndexSet.create()
}c.add(a)}},this)}if(c){c=b[SC.guidFor(f)]=c.frozenCopy();c._sourceRevision=f.propertyRevision
}}return c},_indexSetForSource:function(g,h){if(h===undefined){h=YES}var e=SC.guidFor(g),c=this[e],f=this._sets,a=f?f.length:0,b=null;
if(c>=a){c=null}if(SC.none(c)){if(h&&!this.isFrozen){this.propertyWillChange("sources");
if(!f){f=this._sets=[]}b=f[a]=SC.IndexSet.create();b.source=g;this[e]=a;this.propertyDidChange("sources")
}}else{b=f?f[c]:null}return b},add:function(a,b,e){if(this.isFrozen){throw SC.FROZEN_ERROR
}var h,g,l,k,c,f,j,m;if(b===undefined&&e===undefined){if(!a){throw"Must pass params to SC.SelectionSet.add()"
}if(a.isIndexSet){return this.add(a.source,a)}if(a.isSelectionSet){h=a._sets;m=a._objects;
g=h?h.length:0;this.beginPropertyChanges();for(l=0;l<g;l++){k=h[l];if(k&&k.get("length")>0){this.add(k.source,k)
}}if(m){this.addObjects(m)}this.endPropertyChanges();return this}}k=this._indexSetForSource(a,YES);
c=this.get("length");j=k.get("length");f=c-j;k.add(b,e);this._indexSetCache=null;
f+=k.get("length");if(f!==c){this.propertyDidChange("length");this.enumerableContentDidChange();
if(j===0){this.notifyPropertyChange("sources")}}return this},remove:function(a,b,e){if(this.isFrozen){throw SC.FROZEN_ERROR
}var h,g,l,k,c,f,j,m;if(b===undefined&&e===undefined){if(!a){throw"Must pass params to SC.SelectionSet.remove()"
}if(a.isIndexSet){return this.remove(a.source,a)}if(a.isSelectionSet){h=a._sets;m=a._objects;
g=h?h.length:0;this.beginPropertyChanges();for(l=0;l<g;l++){k=h[l];if(k&&k.get("length")>0){this.remove(k.source,k)
}}if(m){this.removeObjects(m)}this.endPropertyChanges();return this}}k=this._indexSetForSource(a,YES);
c=this.get("length");f=c-k.get("length");if(k&&(m=this._objects)){if(e!==undefined){b=SC.IndexSet.create(b,e);
e=undefined}m.forEach(function(n){l=a.indexOf(n);if(b.contains(l)){m.remove(n);f--
}},this)}k.remove(b,e);j=k.get("length");f+=j;this._indexSetCache=null;if(f!==c){this.propertyDidChange("length");
this.enumerableContentDidChange();if(j===0){this.notifyPropertyChange("sources")}}return this
},contains:function(b,e,a){if(e===undefined&&a===undefined){return this.containsObject(b)
}var c=this.indexSetForSource(b);if(!c){return NO}return c.contains(e,a)},intersects:function(b,e,a){var c=this.indexSetForSource(b,NO);
if(!c){return NO}return c.intersects(e,a)},_TMP_ARY:[],addObject:function(b){var c=this._TMP_ARY,a;
c[0]=b;a=this.addObjects(c);c.length=0;return a},addObjects:function(a){var e=this._objects,b,c;
if(!e){e=this._objects=SC.CoreSet.create()}b=e.get("length");e.addEach(a);c=e.get("length");
this._indexSetCache=null;if(c!==b){this.propertyDidChange("length");this.enumerableContentDidChange()
}return this},removeObject:function(b){var c=this._TMP_ARY,a;c[0]=b;a=this.removeObjects(c);
c.length=0;return a},removeObjects:function(b){var f=this._objects,c,e,a;if(!f){return this
}c=f.get("length");f.removeEach(b);e=f.get("length");if(a=this._sets){a.forEach(function(g){c+=g.get("length");
g.removeObjects(b);e+=g.get("length")},this)}this._indexSetCache=null;if(e!==c){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(c){var f=this._objects;
if(f&&f.contains(c)){return YES}var e=this._sets,b=e?e.length:0,a,g;for(a=0;a<b;a++){g=e[a];
if(g&&g.indexOf(c)>=0){return YES}}return NO},constrain:function(e){var f,b,a,c;this.beginPropertyChanges();
this.get("sources").forEach(function(g){if(g===e){return}var h=this._indexSetForSource(e,NO);
if(h){this.remove(e,h)}},this);f=this._indexSetForSource(e,NO);if(f&&((a=f.get("max"))>(b=e.get("length")))){this.remove(e,b,a-b)
}if(c=this._objects){c.forEach(function(g){if(e.indexOf(g)<0){this.removeObject(g)
}},this)}this.endPropertyChanges();return this},isEqual:function(h){var g,e,b,a,c,f;
if(!h||!h.isSelectionSet){return NO}if(h===this){return YES}if((this._sets===h._sets)&&(this._objects===h._objects)){return YES
}if(this.get("length")!==h.get("length")){return NO}g=this._objects;e=h._objects;
if(g||e){if((g?g.get("length"):0)!==(e?e.get("length"):0)){return NO}if(g&&!g.isEqual(e)){return NO
}}c=this.get("sources");a=c.get("length");for(b=0;b<a;b++){f=c.objectAt(b);g=this._indexSetForSource(f,NO);
e=this._indexSetForSource(f,NO);if(!!e!==!!g){return NO}if(g&&!g.isEqual(e)){return NO
}}return YES},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}if(this._sets){this._sets.length=0
}if(this._objects){this._objects=null}this._indexSetCache=null;this.propertyDidChange("length");
this.enumerableContentDidChange();this.notifyPropertyChange("sources");return this
},copy:function(){var c=this.constructor.create(),e=this._sets,b=e?e.length:0,a,f;
if(e&&b>0){e=c._sets=e.slice();for(a=0;a<b;a++){if(!(f=e[a])){continue}f=e[a]=f.copy();
c[SC.guidFor(f.source)]=a}}if(this._objects){c._objects=this._objects.copy()}return c
},freeze:function(){if(this.isFrozen){return this}var a=this._sets,b=a?a.length:0,c;
while(--b>=0){if(c=a[b]){c.freeze()}}if(this._objects){this._objects.freeze()}return arguments.callee.base.apply(this,arguments)
},toString:function(){var a=this._sets||[];a=a.map(function(b){return b.toString().replace("SC.IndexSet",SC.guidFor(b.source))
},this);if(this._objects){a.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(SC.guidFor(this),a.join(","))
},firstObject:function(){var b=this._sets,c=this._objects;if(b&&b.get("length")>0){var f=b?b[0]:null,e=f?f.source:null,a=f?f.firstObject():-1;
if(e&&a>=0){return e.objectAt(a)}}return c?c.firstObject():undefined}.property(),nextObject:function(c,f,b){var e,a;
if(c===0){e=b.objects=[];this.forEach(function(g){e.push(g)},this);b.max=e.length
}e=b.objects;a=e[c];if(c+1>=b.max){b.objects=b.max=null}return a},forEach:function(h,f){var c=this._sets,e=this._objects,b=c?c.length:0,g,a;
for(a=0;a<b;a++){g=c[a];if(g){g.forEachObject(h,f)}}if(e){e.forEach(h,f)}return this
}});SC.SelectionSet.prototype.clone=SC.SelectionSet.prototype.copy;SC.SelectionSet.EMPTY=SC.SelectionSet.create().freeze();
sc_require("mixins/enumerable");sc_require("mixins/array");sc_require("mixins/observable");
sc_require("mixins/delegate_support");SC.SparseArray=SC.Object.extend(SC.Observable,SC.Enumerable,SC.Array,SC.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var a=this.delegate;
if(a&&SC.none(this._length)&&a.sparseArrayDidRequestLength){this._requestingLength++;
a.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(a){if(SC.none(a)){this._sa_content=null
}if(a!==this._length){this._length=a;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:[],objectAt:function(a){var c=this._sa_content,b;
if(!c){c=this._sa_content=[]}if((b=c[a])===undefined){this.requestIndex(a);b=c[a]
}return b},definedIndexes:function(e){var c=SC.IndexSet.create(),f=this._sa_content,b,a;
if(!f){return c.freeze()}if(e){e.forEach(function(g){if(f[g]!==undefined){c.add(g)
}})}else{a=f.length;for(b=0;b<a;b++){if(f[b]!==undefined){c.add(b)}}}return c.freeze()
},_TMP_RANGE:{},requestIndex:function(b){var c=this.delegate;if(!c){return this}var a=this.get("rangeWindowSize"),f=b;
if(a>1){f=f-Math.floor(f%a)}if(a<1){a=1}this._requestingIndex++;if(c.sparseArrayDidRequestRange){var e=this._TMP_RANGE;
if(this.wasRangeRequested(f)===-1){e.start=f;e.length=a;c.sparseArrayDidRequestRange(this,e);
this.requestedRangeIndex.push(f)}}else{if(c.sparseArrayDidRequestIndex){while(--a>=0){c.sparseArrayDidRequestIndex(this,f+a)
}}}this._requestingIndex--;return this},wasRangeRequested:function(c){var b,a;for(b=0,a=this.requestedRangeIndex.length;
b<a;b++){if(this.requestedRangeIndex[b]===c){return b}}return -1},rangeRequestCompleted:function(b){var a=this.wasRangeRequested(b);
if(a>=0){this.requestedRangeIndex.removeAt(a,1);return YES}return NO},provideObjectsInRange:function(b,f){var c=this._sa_content;
if(!c){c=this._sa_content=[]}var e=b.start,a=b.length;while(--a>=0){c[e+a]=f[a]}if(this._requestingIndex<=0){this.enumerableContentDidChange()
}return this},_TMP_PROVIDE_ARRAY:[],_TMP_PROVIDE_RANGE:{length:1},provideObjectAtIndex:function(c,b){var e=this._TMP_PROVIDE_ARRAY,a=this._TMP_PROVIDE_RANGE;
e[0]=b;a.start=c;return this.provideObjectsInRange(a,e)},objectsDidChangeInRange:function(a){var b=this._sa_content;
if(b){if(a.start===0&&SC.maxRange(a)>=b.length){this._sa_content=null}else{var e=a.start,c=Math.min(e+a.length,b.length);
while(--c>=e){b[c]=undefined}}}this.enumerableContentDidChange(a);return this},indexOf:function(c){var a=this.delegate;
if(a&&a.sparseArrayDidRequestIndexOf){return a.sparseArrayDidRequestIndexOf(this,c)
}else{var b=this._sa_content;if(!b){b=this._sa_content=[]}return b.indexOf(c)}},replace:function(b,h,f){f=f||[];
var c=this.delegate;if(c){if(!c.sparseArrayShouldReplace||!c.sparseArrayShouldReplace(this,b,h,f)){return this
}}var e=this._sa_content;if(!e){e=this._sa_content=[]}e.replace(b,h,f);var a=f?(f.get?f.get("length"):f.length):0;
var g=a-h;if(!SC.none(this._length)){this.propertyWillChange("length");this._length+=g;
this.propertyDidChange("length")}this.enumerableContentDidChange(b,h,g);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
SC.SparseArray.array=function(a){return this.create({_length:a||0})};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/runtime")
}SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var c=this._deprecatedLanguageCodes||[];c.push(this.language);
var b=c.length;var a=null;while(!a&&--b>=0){a=String[c[b]]}if(a){this.hasStrings=YES;
this.strings=a}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(b,c){var a=this.strings[b];
if(SC.typeOf(a)===SC.T_STRING){return a}else{if(SC.typeOf(c)===SC.T_STRING){return c
}}return b}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var c=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var b=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var e=((c)?SC.browser.language:null)||b||SC.browser.language||"en";e=SC.Locale.normalizeLanguage(e);
var a=this.localeClassFor(e);if(e!=this.currentLanguage){this.currentLanguage=e;this.currentLocale=a.create()
}return this.currentLocale},localeClassFor:function(c){c=SC.Locale.normalizeLanguage(c);
var b,a=this.locales[c];if(!a&&((b=c.split("-")[0])!==c)&&(a=this.locales[b])){a=this.locales[c]=a.extend()
}if(!a){a=this.locales[c]=this.locales.en.extend()}return a},define:function(b,c){var a;
if(c===undefined&&(SC.typeOf(b)!==SC.T_STRING)){a=this;c=b}else{a=SC.Locale.localeClassFor(b)
}SC.mixin(a.prototype,c);return a},options:function(){return this.prototype},addStrings:function(b){var a=this.prototype.strings;
if(a){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(a)
}}else{a=this.prototype.strings={}}if(b){this.prototype.strings=SC.mixin(a,b)}this.prototype.hasStrings=YES;
return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(a){if(!a){return"en"
}return SC.Locale._map[a.toLowerCase()]||a},_assignLocales:function(){for(var a in this.locales){this.locales[a].prototype.language=a
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var a=SC.Object.extend.apply(this,arguments);a.addStrings=SC.Locale.addStrings;
a.define=SC.Locale.define;a.options=SC.Locale.options;a.toString=SC.Locale.toString;
return a}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(c,b){var a=SC.Locale.localeClassFor(c);a.addStrings(b);return this
};sc_require("system/locale");SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.SAFARI_FOCUS_BEHAVIOR=YES;
SC.mixin({data:function(c,b,e){c=(c===window)?"@window":c;var f=SC.hashFor(c);var a=SC._data_cache;
if(!a){SC._data_cache=a={}}var g=a[f];if(b&&!g){a[f]=g={}}if(g&&(e!==undefined)){g[b]=e
}return(b)?g[b]:g},removeData:function(e,c){e=(e===window)?"@window":e;var f=SC.hashFor(e);
var a=SC._data_cache;if(!a){return undefined}var g=a[f];if(!g){return undefined}var b=(c)?g[c]:g;
if(c){delete g[c]}else{delete a[f]}return b}});SC.mixin(Function.prototype,{invokeLater:function(h,a){if(a===undefined){a=1
}var g=this;if(arguments.length>2){var b=SC.$A(arguments).slice(2,arguments.length);
b.unshift(h);var e=this,c=g;g=function(){return c.apply(e,b.slice(1))}}return SC.Timer.schedule({target:h,action:g,interval:a})
}});SC.Controller=SC.Object.extend({isEditable:YES});SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(c,g){var b=this._scsel_selection,h=b?b.get("length"):0,e,f,a;
if((g===undefined)||!this.get("allowsSelection")){g=b}a=(g&&g.isEnumerable)?g.get("length"):0;
if((a>1)&&!this.get("allowsMultipleSelection")){if(h>1){g=SC.SelectionSet.create().addObject(b.get("firstObject")).freeze();
a=1}else{g=b;a=h}}if((a===0)&&!this.get("allowsEmptySelection")){if(h===0){g=this.get("firstSelectableObject");
if(g){g=SC.SelectionSet.create().addObject(g).freeze()}else{g=SC.SelectionSet.EMPTY
}a=g.get("length")}else{g=b;a=h}}if(a===0){g=SC.SelectionSet.EMPTY}g=g.frozenCopy();
this._scsel_selection=g;return g}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var a=this.get("selection");
return !!a&&(a.get("length")>0)}.property("selection").cacheable(),selectObjects:function(b,c){if(!b||b.get("length")===0){if(!c){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var a=this.get("selection");if(c&&a){a=a.copy()}else{a=SC.SelectionSet.create()
}a.addObjects(b).freeze();this.set("selection",a);return this},selectObject:function(a,b){if(a===null){if(!b){this.set("selection",null)
}return this}else{return this.selectObjects([a],b)}},deselectObjects:function(b){if(!b||b.get("length")===0){return this
}var a=this.get("selection");if(!a||a.get("length")===0){return this}a=a.copy().removeObjects(b).freeze();
this.set("selection",a.freeze());return this},deselectObject:function(a){if(!a){return this
}else{return this.deselectObjects([a])}},updateSelectionAfterContentChange:function(){var a=this.get("arrangedObjects");
var b=this.get("selection");var e=this.get("allowsEmptySelection");var c;c=b.indexSetForSource(a);
if((c&&(c.get("length")!==b.get("length")))||(!c&&(b.get("length")>0))){b=b.copy().constrain(a).freeze();
this.set("selection",b)}if((b.get("length")===0)&&(a.get("length")>0)&&!e){this.selectObject(this.get("firstSelectableObject"),NO)
}return this}};sc_require("controllers/controller");sc_require("mixins/selection_support");
SC.ArrayController=SC.Controller.extend(SC.Array,SC.SelectionSupport,{content:null,isEditable:YES,orderBy:null,allowsSingleContent:YES,destroyOnRemoval:NO,arrangedObjects:function(){return this
}.property().cacheable(),canRemoveContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&this.get("hasContent");if(a){return !b.isEnumerable||(SC.typeOf(b.removeObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable","hasContent"),canReorderContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&!this.get("orderBy");return a&&!!b.isSCArray}.property("content","isEditable","orderBy"),canAddContent:function(){var b=this.get("content"),a;
a=b&&this.get("isEditable")&&b.isEnumerable;if(a){return(SC.typeOf(b.addObject)===SC.T_FUNCTION)||(SC.typeOf(b.pushObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable"),hasContent:function(){var a=this.get("content");
return !!a&&(!!a.isEnumerable||!!this.get("allowsSingleContent"))}.property("content","allowSingleContent"),status:function(){var b=this.get("content"),a=b?b.get("status"):null;
return a?a:SC.Record.READY}.property().cacheable(),addObject:function(a){if(!this.get("canAddContent")){throw"%@ cannot add content".fmt(this)
}var b=this.get("content");if(b.isSCArray){b.pushObject(a)}else{if(b.addObject){b.addObject(a)
}else{throw"%@.content does not support addObject".fmt(this)}}return this},removeObject:function(a){if(!this.get("canRemoveContent")){throw"%@ cannot remove content".fmt(this)
}var b=this.get("content");if(b.isEnumerable){b.removeObject(a)}else{this.set("content",null)
}if(this.get("destroyOnRemoval")&&a.destroy){a.destroy()}return this},length:function(){var a=this._scac_observableContent();
return a?a.get("length"):0}.property().cacheable(),objectAt:function(a){var b=this._scac_observableContent();
return b?b.objectAt(a):undefined},replace:function(h,g,e){if(!e||e.get("length")===0){if(!this.get("canRemoveContent")){throw"%@ cannot remove objects from the current content".fmt(this)
}}else{if(!this.get("canReorderContent")){throw"%@ cannot add or reorder the current content".fmt(this)
}}var c=this.get("content");var b=[],a,f;if(this.get("destroyOnRemoval")){for(a=0;
a<g;a++){b.push(c.objectAt(a+h))}}if(c){c.replace(h,g,e)}for(a=0,f=b.length;a<f;a++){b[a].destroy()
}b=null;return this},indexOf:function(b,a){var c=this._scac_observableContent();return c?c.indexOf(b,a):-1
},init:function(){arguments.callee.base.apply(this,arguments);this._scac_contentDidChange()
},_scac_cached:NO,_scac_observableContent:function(){var b=this._scac_cached;if(b!==NO){return b
}var f=this.get("content"),g,e,c,a;if(SC.none(f)){return this._scac_cached=[]}if(!f.isEnumerable){b=this.get("allowsSingleContent")?[f]:[];
return(this._scac_cached=b)}g=this.get("orderBy");if(!g){if(f.isSCArray){return(this._scac_cached=f)
}else{throw"%@.orderBy is required for unordered content".fmt(this)}}switch(SC.typeOf(g)){case SC.T_STRING:g=[g];
break;case SC.T_FUNCTION:e=g;break;case SC.T_ARRAY:break;default:throw"%@.orderBy must be Array, String, or Function".fmt(this)
}if(!e){a=g.get("length");e=function(l,j){var h=0,k=0,m,o,n,p;for(h=0;(h<a)&&(k===0);
h++){m=g.objectAt(h);p=NO;if(m.indexOf("ASC")>-1){m=m.split("ASC ")[1]}else{if(m.indexOf("DESC")>-1){m=m.split("DESC ")[1];
p=YES}}if(!l){o=l}else{if(l.isObservable){o=l.get(m)}else{o=l[m]}}if(!j){n=j}else{if(j.isObservable){n=j.get(m)
}else{n=j[m]}}k=SC.compare(o,n);if(p){k=(-1)*k}}return k}}b=[];f.forEach(function(h){b.push(h)
});b.sort(e);e=null;return(this._scac_cached=b)},_scac_contentDidChange:function(){this._scac_cached=NO;
var j=this.get("content"),e=!!this.get("orderBy"),k=this._scac_content,a=this._scac_length||0,h=this._scac_rangeObserver,b=this._scac_rangeDidChange,g=this._scac_enumerableDidChange,c=this._scac_contentStatusDidChange,f;
if(k===j){return this}if(k){if(h&&k.isSCArray){k.removeRangeObserver(h)}else{if(k.isEnumerable){k.removeObserver("[]",this,g)
}}k.removeObserver("status",this,c)}h=null;this._scac_cached=NO;this._scac_content=j;
if(j){if(!e&&j.isSCArray){h=j.addRangeObserver(null,this,b)}else{if(j.isEnumerable){j.addObserver("[]",this,g)
}}f=j.isEnumerable?j.get("length"):1;j.addObserver("status",this,c)}else{f=SC.none(j)?0:1
}this._scac_rangeObserver=h;this._scac_length=f;this._scac_contentStatusDidChange();
this.enumerableContentDidChange(0,f,f-a);this.updateSelectionAfterContentChange()
}.observes("content"),_scac_enumerableDidChange:function(){var a=this.get("content"),c=a?a.get("length"):0,b=this._scac_length;
this._scac_length=c;this.beginPropertyChanges();this._scac_cached=NO;this.enumerableContentDidChange(0,c,c-b);
this.endPropertyChanges();this.updateSelectionAfterContentChange()}.observes("orderBy"),_scac_rangeDidChange:function(f,e,b,a){if(b!=="[]"){return
}var c=this.get("content");this._scac_length=c.get("length");this._scac_cached=NO;
if(a){this.beginPropertyChanges();a.forEachRange(function(h,g){this.enumerableContentDidChange(h,g,0)
},this);this.endPropertyChanges();this.updateSelectionAfterContentChange()}},_scac_contentStatusDidChange:function(){this.notifyPropertyChange("status")
}});require("controllers/controller");SC.ObjectController=SC.Controller.extend({content:null,allowsMultipleContent:NO,hasContent:function(){return !SC.none(this.get("observableContent"))
}.property("observableContent"),isEditable:YES,observableContent:function(){var b=this.get("content"),a,c;
if(b&&b.isEnumerable){a=b.get("length");c=this.get("allowsMultipleContent");if(a===1){b=b.firstObject()
}else{if(a===0||!c){b=null}}if(b&&!c&&b.isEnumerable){b=null}}return b}.property("content","allowsMultipleContent").cacheable(),destroy:function(){var a=this.get("observableContent");
if(a&&SC.typeOf(a.destroy)===SC.T_FUNCTION){a.destroy()}this.set("content",null);
return this},contentPropertyDidChange:function(b,a){if(a==="*"){this.allPropertiesDidChange()
}else{this.notifyPropertyChange(a)}},unknownProperty:function(b,e){if(b==="content"){if(e!==undefined){this.content=e
}return this.content}var c=this.get("observableContent"),g,f,a;if(c===null||c===undefined){return undefined
}if(e===undefined){if(c.isEnumerable){e=c.getEach(b);g=e.get("length");if(g>0){a=YES;
f=e.objectAt(0);while((--g>0)&&a){if(f!==e.objectAt(g)){a=NO}}if(a){e=f}}else{e=undefined
}}else{e=(c.isObservable)?c.get(b):c[b]}}else{if(!this.get("isEditable")){throw"%@.%@ is not editable".fmt(this,b)
}if(c.isEnumerable){c.setEach(b,e)}else{if(c.isObservable){c.set(b,e)}else{c[b]=e
}}}return e},init:function(){arguments.callee.base.apply(this,arguments);if(this.get("content")){this._scoc_contentDidChange()
}if(this.get("observableContent")){this._scoc_observableContentDidChange()}},_scoc_contentDidChange:function(){var b=this._scoc_content,c=this.get("content");
if(b!==c){this._scoc_content=c;var a=this._scoc_enumerableContentDidChange;if(b&&b.isEnumerable){b.removeObserver("[]",this,a)
}if(c&&c.isEnumerable){c.addObserver("[]",this,a)}}}.observes("content"),_scoc_observableContentDidChange:function(){var b=this._scoc_observableContent,e=this.get("observableContent"),a=this.contentPropertyDidChange,c=this._scoc_enumerableContentDidChange;
if(b===e){return this}this._scoc_observableContent=e;if(b){if(b.isEnumerable){b.removeObserver("[]",this,c)
}else{if(b.isObservable){b.removeObserver("*",this,a)}}}if(e){if(e.isEnumerable){e.addObserver("[]",this,c)
}else{if(e.isObservable){e.addObserver("*",this,a)}}}if((b&&b.isEnumerable)||(e&&e.isEnumerable)){this._scoc_enumerableContentDidChange()
}else{this.contentPropertyDidChange(e,"*")}}.observes("observableContent"),_scoc_enumerableContentDidChange:function(){var b=this.get("observableContent"),c=this._scoc_observableContentItems,a=this.contentPropertyDidChange;
if(c){c.forEach(function(e){if(e.isObservable){e.removeObserver("*",this,a)}},this);
c.clear()}if(b&&b.isEnumerable){if(!c){c=SC.Set.create()}b.forEach(function(e){if(c.contains(e)){return
}c.add(e);if(e.isObservable){e.addObserver("*",this,a)}},this)}else{c=null}this._scoc_observableContentItems=c;
this.contentPropertyDidChange(b,"*");return this}});SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(b,a){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(b,a){this.setIfChanged("treeItemIsExpanded",NO)},treeItemExpand:function(b,a){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(f,c){var e=this.get("treeItemChildren"),b,h,a,g;
if(!e){return null}b=SC.IndexSet.create();h=e.get("length");for(a=0;a<h;a++){if(!(g=e.objectAt(a))){continue
}if(!g.get("treeItemChildren")){continue}if(g.treeItemDisclosureState(this,a)!==SC.LEAF_NODE){b.add(a)
}}return b.get("length")>0?b:null}};SC.BRANCH_OPEN=17;SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;
SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(b,c,a){var e=b.get("selection");
return e?e.contains(c,a):NO},contentIndexIsEnabled:function(b,c,a){return b.get("isEnabled")
},contentGroupIndexes:function(a,b){return null},contentIndexIsGroup:function(b,c,a){return NO
},contentIndexOutlineLevel:function(b,c,a){return -1},contentIndexDisclosureState:function(b,c,a){return SC.LEAF_NODE
},contentIndexExpand:function(b,c,a){console.log("contentIndexExpand(%@, %@, %@)".fmt(b,c,a))
},contentIndexCollapse:function(b,c,a){console.log("contentIndexCollapse(%@, %@, %@)".fmt(b,c,a))
}};sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");
SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var a=this.get("parentObserver");
return a?a.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var f=this.get("item"),b,g,a,e,c;
if(!f){return SC.IndexSet.EMPTY}else{if(f.isTreeItemContent){g=this.get("parentItem");
a=this.get("index");return f.treeItemBranchIndexes(g,a)}else{e=this.get("children");
if(!e){return null}c=SC.IndexSet.create();b=e.get("length");g=f;for(a=0;a<b;a++){if(!(f=e.objectAt(a))){continue
}if(!this._computeChildren(f,g,a)){continue}if(this._computeDisclosureState(f,g,a)!==SC.LEAF_NODE){c.add(a)
}}return c.get("length")>0?c:null}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(e){var a=this.get("length"),g=this.get("item"),b=this._objectAtCache,j=e,h=0,c,f;
if(e>=a){return undefined}if(this.get("isHeaderVisible")){if(e===0){return g}else{j--
}}g=null;if(!b){b=this._objectAtCache=[]}if((g=b[e])!==undefined){return g}f=this.get("children");
if(!f){return undefined}if(c=this.get("branchIndexes")){c.forEach(function(m){if(g||(m>j)){return
}var l=this.branchObserverAt(m),k;if(!l){return}k=l.get("length");if(m+k>j){g=l.objectAt(j-m);
j=-1}else{j-=k-1}},this)}if(j>=0){g=f.objectAt(j)}b[e]=g;return g},replace:function(a,b,l,e){var k=a,h=null,f,g,j;
if(e===undefined){e=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){k--}if(k<0){throw"Tree Item cannot replace itself"
}if(f=this.get("branchIndexes")){f.forEach(function(m){if(h||(m>=k)){return}if(!(h=this.branchObserverAt(m))){return
}g=h.get("length");if((m+g===k)&&e===SC.DROP_AFTER){k-=m}else{if(m+g>k){k-=m}else{k-=g-1;
h=null}}},this)}if(h){h.replace(k,b,l,e);return this}j=k+b;if(b>1&&f){f.forEachIn(k,f.get("max")-k,function(m){if(m>j){return
}if(!(h=this.branchObserverAt(m))){return}g=h.get("length");j-=g-1},this)}b=j-k;var c=this.get("children");
if(!c){throw"cannot replace() tree item with no children"}if((b<0)||(j>c.get("length"))){throw"replace() range must lie within a single tree item"
}c.replace(k,b,l,e);return this},observerContentDidChange:function(h,g,f){this.invalidateBranchObserversAt(h);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var b=this.get("length"),c=this._computeLength(),a=this.get("parentObserver"),e;
if(b!==c){this.set("length",c)}if(!this._notifyParent){return this}if(a){e=SC.IndexSet.create(this.get("index"));
a._childrenRangeDidChange(a.get("children"),null,"[]",e)}else{if(b===c){g=this.expandChildIndex(h+g);
h=this.expandChildIndex(h);g=g-h;f=0}else{h=this.expandChildIndex(h);g=c-h;f=c-b}this.enumerableContentDidChange(h,g,f)
}},expandChildIndex:function(c){var b=c;if(this.get("isHeaderVisible")){c++}var a=this.get("branchIndexes");
if(!a||a.get("length")===0){return b}a.forEachIn(0,c,function(e){b+=this.branchObserverAt(e).get("length")-1
},this);return b},_contentGroupIndexes:NO,contentGroupIndexes:function(h,f){if(f!==this){return null
}var g=this._contentGroupIndexes;if(g!==NO){return g}if(this.get("parentObserver")){return null
}var l=this.get("item"),k,b,e,j,c,a;if(l&&l.isTreeItemContent){k=l.get("treeItemIsGrouped")
}else{k=!!this.delegate.get("treeItemIsGrouped")}if(k){g=SC.IndexSet.create();b=this.get("branchIndexes");
a=this.get("children");e=a?a.get("length"):0;j=c=0;if(b){b.forEach(function(n){g.add(j,(n+1)-c);
j+=(n+1)-c;c=n+1;var m=this.branchObserverAt(n);if(m){j+=m.get("length")-1}},this)
}if(c<e){g.add(j,e-c)}}else{g=null}this._contentGroupIndexes=g;return g},contentIndexIsGroup:function(b,e,a){var c=this.contentGroupIndexes(b,e);
return c?c.contains(a):NO},contentIndexOutlineLevel:function(l,h,f){if(h!==this){return -1
}var a=this._outlineLevelCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._outlineLevelCache=[]
}var g=this.get("length"),m=f,e=0,j=null,c,b,k;if(f>=g){return -1}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("outlineLevel")-1
}else{m--}}if(c=this.get("branchIndexes")){c.forEach(function(p){if((j!==null)||(p>m)){return
}var o=this.branchObserverAt(p),n;if(!o){return}n=o.get("length");if(p+n>m){j=o.contentIndexOutlineLevel(l,o,m-p);
m=-1}else{m-=n-1}},this)}if(m>=0){j=this.get("outlineLevel")}a[f]=j;return j},contentIndexDisclosureState:function(l,h,f){if(h!==this){return -1
}var a=this._disclosureStateCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._disclosureStateCache=[]
}var g=this.get("length"),m=f,e=0,j=null,c,b,k;if(f>=g){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("disclosureState")
}else{m--}}if(c=this.get("branchIndexes")){c.forEach(function(p){if((j!==null)||(p>m)){return
}var o=this.branchObserverAt(p),n;if(!o){return}n=o.get("length");if(p+n>m){j=o.contentIndexDisclosureState(l,o,m-p);
m=-1}else{m-=n-1}},this)}if(m>=0){j=SC.LEAF_NODE}a[f]=j;return j},contentIndexExpand:function(b,g,a){var c,h=a,e,f;
if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._expand(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=h){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){k.contentIndexExpand(b,k,h-l);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._expand(f,this.get("item"),h)
}}},contentIndexCollapse:function(b,g,a){var c,e,f,h=a;if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._collapse(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=h){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){k.contentIndexCollapse(b,k,h-l);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._collapse(f,this.get("item"),h)
}}},branchObserverAt:function(e){var h=this._branchObserversByIndex,c=this._branchObserverIndexes,f,j,b,l,a,g,k;
if(!h){h=this._branchObserversByIndex=[]}if(!c){c=this._branchObserverIndexes=SC.IndexSet.create()
}if(f=h[e]){return f}a=this.get("children");l=a?a.objectAt(e):null;if(!l){return null
}h[e]=f=SC.TreeItemObserver.create({item:l,delegate:this.get("delegate"),parentObserver:this,index:e,outlineLevel:this.get("outlineLevel")+1});
c.add(e);return f},invalidateBranchObserversAt:function(c){var b=this._branchObserversByIndex,a=this._branchObserverIndexes;
if(!b||b.length<=c){return this}if(c<0){c=0}a.forEachIn(c,a.get("max")-c,function(f){var e=b[f];
if(e){e.destroy()}},this);b.length=c;return this},init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("item");if(!a){throw"SC.TreeItemObserver.item cannot be null"}a.addObserver("*",this,this._itemPropertyDidChange);
this._itemPropertyDidChange(a,"*");this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);
this._objectAtCache=null;var c=this.get("item");if(c){c.removeObserver("*",this,this._itemPropertyDidChange)
}var a=this._children,b=this._childrenRangeObserver;if(a&&b){a.removeRangeObserver(b)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(g,b){var a=this.get("children"),f=this.get("disclosureState"),e=this.get("item"),c;
this.beginPropertyChanges();c=this._computeDisclosureState(e);if(f!==c){this.set("disclosureState",c)
}c=this._computeChildren(e);if(a!==c){this.set("children",c)}this.endPropertyChanges()
},_childrenDidChange:function(){var c=this.get("disclosureState"),e=c===SC.BRANCH_OPEN?this.get("children"):null,b=this._children,a=this._childrenRangeObserver;
if(b===e){return this}if(a){b.removeRangeObserver(a)}if(e){this._childrenRangeObserver=e.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=e;this._childrenRangeDidChange(e,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(g,k,j,e){var a=this.get("children"),f=a?a.get("length"):0,c=e?e.get("min"):0,h=e?e.get("max"):f,b=this._childrenLen||0;
this._childrenLen=f;this.observerContentDidChange(c,h-c,f-b)},_computeDisclosureState:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return SC.LEAF_NODE}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}return e.treeItemDisclosureState(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}return e.get(c)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED}}},_collapse:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemCollapse(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,NO)}}return this},_expand:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemExpand(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,YES)}}return this},_computeChildren:function(c){var a,b;
if(!c){return null}else{if(c.isTreeItemContent){return c.get("treeItemChildren")}else{b=this._treeItemChildrenKey;
if(!b){a=this.get("delegate");b=a?a.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=b}return c.get(b)}}},_computeLength:function(){var b=this.get("isHeaderVisible")?1:0,e=this.get("disclosureState"),c=this.get("children"),a;
if((e===SC.BRANCH_OPEN)&&c){b+=c.get("length");if(a=this.get("branchIndexes")){a.forEach(function(f){var g=this.branchObserverAt(f);
b+=g.get("length")-1},this)}}return b}});sc_require("controllers/object");sc_require("mixins/selection_support");
sc_require("private/tree_item_observer");SC.TreeController=SC.ObjectController.extend(SC.SelectionSupport,{treeItemIsGrouped:NO,treeItemIsExpandedKey:"treeItemIsExpanded",treeItemChildrenKey:"treeItemChildren",arrangedObjects:function(){var a,b=this.get("content");
if(b){a=SC.TreeItemObserver.create({item:b,delegate:this})}else{a=null}this._sctc_arrangedObjects=a;
return a}.property().cacheable(),_sctc_invalidateArrangedObjects:function(){this.propertyWillChange("arrangedObjects");
var a=this._sctc_arrangedObjects;if(a){a.destroy()}this._sctc_arrangedObjects=null;
this.propertyDidChange("arrangedObjects")}.observes("content","treeItemIsExpandedKey","treeItemChildrenKey","treeItemIsGrouped"),_sctc_arrangedObjectsContentDidChange:function(){this.updateSelectionAfterContentChange()
}.observes("*arrangedObjects.[]"),firstSelectableObject:function(){var e=this.get("arrangedObjects"),c,b,a=0;
if(!e){return null}c=e.contentGroupIndexes(null,e);b=e.get("length");while(c.contains(a)&&(a<b)){a++
}return a>=b?null:e.objectAt(a)}.property()});SC.mixin(SC.Object.prototype,{invokeLater:function(b,a){if(a===undefined){a=1
}var g=b,c,e;if(arguments.length>2){c=SC.$A(arguments).slice(2);if(SC.typeOf(g)===SC.T_STRING){g=this[b]
}e=g;g=function(){return e.apply(this,c)}}return SC.Timer.schedule({target:this,action:g,interval:a})
},invokeWith:function(b,c,e){if(e===undefined){e=c;c=this}if(!c){c=this}if(SC.typeOf(e)===SC.T_STRING){e=c[e]
}var a=this.getPath(b);e.call(c,a,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var a=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return a},scheduleTimer:function(b,a){this._timerQueue=b.removeFromTimerQueue(this._timerQueue);
this._timerQueue=b.scheduleInTimerQueue(this._timerQueue,a);return this},cancelTimer:function(a){this._timerQueue=a.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var e=this.get("startTime"),f=this.TIMER_ARRAY,c,b,a;this._firing=YES;this._timerQueue=this._timerQueue.collectExpiredTimers(f,e);
b=f.length;for(c=0;c<b;c++){f[c].fire()}a=f.length>0;f.length=0;this._firing=NO;return a
},scheduleNextTimeout:function(){var e=this._timerQueue;var b=NO;if(!e){if(this._timeout){clearTimeout(this._timeout)
}}else{var c=e._timerQueueRunTime;if(this._timeoutAt!==c){if(this._timeout){clearTimeout(this._timeout)
}var a=Math.max(0,c-Date.now());this._timeout=setTimeout(this._timeoutDidFire,a);
this._timeoutAt=c}b=YES}return b},_timeoutDidFire:function(){var a=SC.RunLoop.currentRunLoop;
a._timeout=a._timeoutAt=null;SC.RunLoop.begin().end()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
/* @license

Portions of this software are copyright Yahoo, Inc, used under the following license:

Software License Agreement (BSD License)
Copyright (c) 2009, Yahoo! Inc.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the
following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Sources of Intellectual Property Included in the YUI Library
Where not otherwise indicated, all YUI content is authored by Yahoo! engineers and consists of Yahoo!-owned intellectual property. YUI is issued by Yahoo! under the BSD license above. In some specific instances, YUI will incorporate work done by developers outside of Yahoo! with their express permission.

*/
SC.Button={value:null,toggleOnValue:YES,toggleOffValue:NO,localize:NO,localizeBindingDefault:SC.Binding.bool(),title:"",contentTitleKey:null,icon:null,contentIconKey:null,needsEllipsis:YES,displayTitle:function(){var a=this.get("title");
return(a&&this.get("localize"))?a.loc():(a||"")}.property("title","localize").cacheable(),keyEquivalent:null,renderTitle:function(b,a){var h=this.get("icon"),e="",j=this.get("displayTitle"),k=(!SC.none(j)&&j.length>0),c,l,f;
if(this.get("escapeHTML")){j=SC.RenderContext.escapeHTML(j)}if(h){var g=SC.BLANK_IMAGE_URL;
if(h.indexOf("/")>=0){e='<img src="'+h+'" alt="" class="icon" />'}else{e='<img src="'+g+'" alt="" class="'+h+'" />'
}k=YES}f=e+j;if(a){if(this.get("needsEllipsis")){b.push('<label class="sc-button-label ellipsis">'+f+"</label>")
}else{b.push('<label class="sc-button-label">'+f+"</label>")}this._ImageTitleCached=f
}else{c=this.$("label");if((l=c[0])){if(k){if(this.get("needsEllipsis")){c.addClass("ellipsis");
if(this._ImageTitleCached!==f){this._ImageTitleCached=f;l.innerHTML=f}}else{c.removeClass("ellipsis");
if(this._ImageTitleCached!==f){this._ImageTitleCached=f;l.innerHTML=f}}}else{l.innerHTML=""
}}}return b},contentPropertyDidChange:function(j,c){var b=this.get("displayDelegate"),f=this.get("content"),h;
var e=this.getDelegateProperty("contentValueKey",b);if(e&&(c===e||c==="*")){this.set("value",f?f.get(e):null)
}var a=this.getDelegateProperty("contentTitleKey",b);if(a&&(c===a||c==="*")){this.set("title",f?f.get(a):null)
}var g=this.getDelegateProperty("contentIconKey",b);if(g&&(c===g||c==="*")){this.set("icon",f?f.get(g):null)
}return this},_button_displayObserver:function(){this.displayDidChange()}.observes("title","icon","value"),performKeyEquivalent:function(c,b){if(!this.get("isEnabled")){return NO
}var a=this.get("keyEquivalent");if(a){if(a===c){return this.triggerAction(b)}}else{if((this.get("isDefault")&&(c==="return"))||(this.get("isCancel")&&(c==="escape"))){return this.triggerAction(b)
}}return NO},triggerAction:function(a){throw"SC.Button.triggerAction() is not defined in %@".fmt(this)
},computeIsSelectedForValue:function(e){var b=this.get("toggleOnValue"),c,a;if(SC.typeOf(e)===SC.T_ARRAY){if(e.length===1){c=(e[0]==b)
}else{c=null;e.find(function(f){a=(f==b);if(c===null){c=a}else{if(a!==c){c=SC.MIXED_STATE
}}return c===SC.MIXED_STATE})}}else{if(e===SC.MIXED_STATE){c=SC.MIXED_STATE}else{c=(e===b)
}}return c},initMixin:function(){if(!SC.none(this.get("value"))){this._button_valueDidChange()
}},_button_valueDidChange:function(){var b=this.get("value"),a=this.computeIsSelectedForValue(b);
this.set("isSelected",a)}.observes("value"),_button_isSelectedDidChange:function(){var c=this.get("isSelected"),b=this.computeIsSelectedForValue(this.get("value"));
if((c!==SC.MIXED_STATE)&&(b!==c)){var a=(c)?"toggleOnValue":"toggleOffValue";this.set("value",this.get(a))
}}.observes("isSelected")};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],_display_contentDidChange:function(g,a,e){if((e=this.get("content"))!=this._display_content){var c=this._display_contentPropertyDidChange;
var b=this._display_content;if(b){if(SC.isArray(b)){b.invoke("removeObserver","*",this,c)
}else{if(b.removeObserver){b.removeObserver("*",this,c)}}}b=this._display_content=e;
if(b){if(SC.isArray(b)){b.invoke("addObserver","*",this,c)}else{if(b.addObserver){b.addObserver("*",this,c)
}}}this.allPropertiesDidChange();this.endPropertyChanges()}}.observes("content","contentDisplayProperties"),_display_contentPropertyDidChange:function(f,c,e,b){if(c==="*"){this.displayDidChange()
}else{var a=this.get("contentDisplayProperties");if(a&&a.indexOf(c)>=0){this.displayDidChange()
}}}};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.STRING_DECAMELIZE_REGEXP=(/([a-z])([A-Z])/g);SC.STRING_DASHERIZE_REGEXP=(/[ _]/g);
SC.STRING_HUMANIZE_REGEXP=(/[\-_]/g);SC.STRING_TRIM_REGEXP=(/^\s+|\s+$/g);SC.STRING_TRIM_LEFT_REGEXP=(/^\s+/g);
SC.STRING_TRIM_RIGHT_REGEXP=(/\s+$/g);SC.STRING_REGEXP_ESCAPED_REGEXP=(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g);
SC.STRING_DASHERIZE_CACHE={top:"top",left:"left",right:"right",bottom:"bottom",width:"width",height:"height",minWidth:"min-width",maxWidth:"max-width"};
SC.INFLECTION_CONSTANTS={PLURAL:[[/(quiz)$/i,"$1zes"],[/^(ox)$/i,"$1en"],[/([m|l])ouse$/i,"$1ice"],[/(matr|vert|ind)ix|ex$/i,"$1ices"],[/(x|ch|ss|sh)$/i,"$1es"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(hive)$/i,"$1s"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/sis$/i,"ses"],[/([ti])um$/i,"$1a"],[/(buffal|tomat)o$/i,"$1oes"],[/(bu)s$/i,"$1ses"],[/(alias|status)$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(ax|test)is$/i,"$1es"],[/s$/i,"s"],[/$/,"s"]],SINGULAR:[[/(quiz)zes$/i,"$1"],[/(matr)ices$/i,"$1ix"],[/(vert|ind)ices$/i,"$1ex"],[/^(ox)en/i,"$1"],[/(alias|status)es$/i,"$1"],[/(octop|vir)i$/i,"$1us"],[/(cris|ax|test)es$/i,"$1is"],[/(shoe)s$/i,"$1"],[/(o)es$/i,"$1"],[/(bus)es$/i,"$1"],[/([m|l])ice$/i,"$1ouse"],[/(x|ch|ss|sh)es$/i,"$1"],[/(m)ovies$/i,"$1ovie"],[/(s)eries$/i,"$1eries"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/([lr])ves$/i,"$1f"],[/(tive)s$/i,"$1"],[/(hive)s$/i,"$1"],[/([^f])ves$/i,"$1fe"],[/(^analy)ses$/i,"$1sis"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,"$1$2sis"],[/([ti])a$/i,"$1um"],[/(n)ews$/i,"$1ews"],[/s$/i,""]],IRREGULAR:[["move","moves"],["sex","sexes"],["child","children"],["man","men"],["person","people"]],UNCOUNTABLE:["sheep","fish","series","species","money","rice","information","info","equipment"]};
SC.String={loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var a=SC.Locale.currentLocale.locWithDefault(this);if(SC.typeOf(a)!==SC.T_STRING){a=this
}return a.fmt.apply(a,arguments)},locWithDefault:function(b){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var c=SC.Locale.currentLocale.locWithDefault(this,b);if(SC.typeOf(c)!==SC.T_STRING){c=this
}var a=SC.$A(arguments);a.shift();return c.fmt.apply(c,a)},capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(c,a,b){return(b)?(a+b.toUpperCase()):a
}).capitalize()},titleize:function(){var a=this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2");
return a.replace(SC.STRING_TITLEIZE_REGEXP,function(c,e,b){return(b)?(" "+b.toUpperCase()):" "
}).capitalize()},camelize:function(){var b=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=b.charAt(0),a=c.toLowerCase();return(c!==a)?(a+b.slice(1)):b},classify:function(){var a=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=a.charAt(0),b=c.toUpperCase();return(c!==b)?(b+a.slice(1)):a},decamelize:function(){return this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2").toLowerCase()
},dasherize:function(){var a=SC.STRING_DASHERIZE_CACHE,b=a[this];if(b){return b}else{b=this.decamelize().replace(SC.STRING_DASHERIZE_REGEXP,"-");
a[this]=b}return b},humanize:function(){return this.decamelize().replace(SC.STRING_HUMANIZE_REGEXP," ")
},escapeForRegExp:function(){return this.replace(SC.STRING_REGEXP_ESCAPED_REGEXP,"\\$1")
},removeDiacritics:function(){var a=SC.diacriticMappingTable;if(!a){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
a=SC.diacriticMappingTable}var e,f,b="",g=this.length;for(var c=0;c<=g;++c){e=this.charAt(c);
f=a[e];if(f){b+=f}else{b+=e}}return b},trim:function(){return this.replace(SC.STRING_TRIM_REGEXP,"")
},trimLeft:function(){return this.replace(SC.STRING_TRIM_LEFT_REGEXP,"")},trimRight:function(){return this.replace(SC.STRING_TRIM_RIGHT_REGEXP,"")
},pluralize:function(){var l,f,b=this.split(/\s/).pop(),h=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(l=0,f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;l<f;l++){var g=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[l];
if(b==g){return this.toString()}}for(l=0,f=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
l<f;l++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[l][0],k=SC.INFLECTION_CONSTANTS.IRREGULAR[l][1];
if((b==c)||(b==k)){if(a){k=k.capitalize()}return h+k}}for(l=0,f=SC.INFLECTION_CONSTANTS.PLURAL.length;
l<f;l++){var j=SC.INFLECTION_CONSTANTS.PLURAL[l][0],e=SC.INFLECTION_CONSTANTS.PLURAL[l][1];
if(j.test(b)){return this.replace(j,e)}}},singularize:function(){var l,f,b=this.split(/\s/).pop(),h=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(l=0,f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;l<f;l++){var g=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[l];
if(b==g){return this.toString()}}for(l=0,f=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
l<f;l++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[l][0],k=SC.INFLECTION_CONSTANTS.IRREGULAR[l][1];
if((b==c)||(b==k)){if(a){c=c.capitalize()}return h+c}}for(l=0,f=SC.INFLECTION_CONSTANTS.SINGULAR.length;
l<f;l++){var j=SC.INFLECTION_CONSTANTS.SINGULAR[l][0],e=SC.INFLECTION_CONSTANTS.SINGULAR[l][1];
if(j.test(b)){return this.replace(j,e)}}}};SC.String.strip=SC.String.trim;SC.supplement(String.prototype,SC.String);
String.prototype.loc=SC.String.loc;SC.String.fmt=String.prototype.fmt;sc_require("mixins/string");
SC.MIXED_STATE="__MIXED__";SC.HUGE_CONTROL_SIZE="sc-huge-size";SC.LARGE_CONTROL_SIZE="sc-large-size";
SC.REGULAR_CONTROL_SIZE="sc-regular-size";SC.SMALL_CONTROL_SIZE="sc-small-size";SC.TINY_CONTROL_SIZE="sc-tiny-size";
SC.Control={initMixin:function(){this._control_contentDidChange()},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(b,a){return this.updatePropertyFromContent("value",a,"contentValueKey")
},updatePropertyFromContent:function(g,b,f,e){var c=b==="*";if(f===undefined){f="content"+g.capitalize()+"Key"
}if(e===undefined){e=this.get("content")}f=this[f]?this.get(f):this.getDelegateProperty(f,this.displayDelegate);
if(f&&(c||b===f)){var a=(e)?(e.get?e.get(f):e[f]):null;this.set(g,a)}return this},updateContentWithValueObserver:function(){var a=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate),b=this.get("content");
if(!a||!b){return}var c=this.get("value");if(typeof b.setIfChanged===SC.T_FUNCTION){b.setIfChanged(a,c)
}else{if(b[a]!==c){b[a]=c}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var a,c,b;
if(a=this.get("fieldLabel")){return a}c=this.get("fieldKey")||this.constructor.toString();
b=(c||"").humanize().capitalize();return"ErrorLabel."+c.locWithDefault(("FieldKey."+c).locWithDefault(b))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(a,f){var c=this.get("isSelected"),b=!this.get("isEnabled"),e=this._CONTROL_TMP_CLASSNAMES;
e.mixed=c===SC.MIXED_STATE;e.sel=c&&(c!==SC.MIXED_STATE);e.active=this.get("isActive");
a.setClass(e).addClass(this.get("controlSize"))},_control_content:null,_control_contentDidChange:function(){var b=this.get("content");
if(this._control_content===b){return}var c=this.contentPropertyDidChange,a=this._control_content;
if(a&&a.removeObserver){a.removeObserver("*",this,c)}this._control_content=b;if(b&&b.addObserver){b.addObserver("*",this,c)
}this.contentPropertyDidChange(b,"*")}.observes("content")};SC.Editable={isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.beginPropertyChanges();this.set("isEditing",YES);
this.becomeFirstResponder();this.endPropertyChanges();return YES},discardEditing:function(){return !this.get("isEditing")
},commitEditing:function(){if(!this.get("isEditing")){return YES}this.set("isEditing",NO);
this.resignFirstResponder();return YES}};SC.mixin(SC.browser,(function(){var a=window.innerWidth,c=SC.browser,b=navigator.standalone;
SC.extend(c,{isOpera:!!c.opera,isIe:!!c.msie,isIE:!!c.msie,isSafari:!!c.safari,isMobileSafari:(!!c.mobileSafari||!!c.standalone),isMozilla:!!c.mozilla,isWindows:!!c.windows,isMac:!!c.mac,isiPhone:((!!c.mobileSafari||!!c.standalone)&&(a==320||a==480)),current:c.msie?"msie":c.mozilla?"mozilla":c.safari?"safari":c.opera?"opera":"unknown",compareVersion:function(){if(this._versionSplit===undefined){var h=function(j){return Number(j.match(/^[0-9]+/))
};this._versionSplit=SC.A(this.version.split(".")).map(h)}var g=SC.A(arguments).map(Number);
for(var f=0;f<g.length;f++){var e=this._versionSplit[f]-g[f];if(isNaN(e)){return 0
}if(e!==0){return e}}return 0}});return c})());SC.Builder=function(a){return SC.Builder.create(a)
};SC.Builder.create=function create(c){var b=SC.mixin(SC.beget(this.fn),c||{});if(c.hasOwnProperty("toString")){b.toString=c.toString
}var a=function(){var e=SC.beget(b);e.defaultClass=this;e.constructor=a;return e.init.apply(e,arguments)
};a.fn=a.prototype=b;a.extend=SC.Builder.create;a.mixin=SC.Builder.mixin;return a
};SC.Builder.mixin=function(){var b=arguments.length,a;for(a=0;a<b;a++){SC.mixin(this,arguments[a])
}return this};SC.Builder.fn={init:function(a){if(a!==undefined){if(SC.typeOf(a)===SC.T_ARRAY){var b=a.length;
while(--b>=0){this[b]=a.objectAt?a.objectAt(b):a[b]}this.length=a.length}else{this[0]=a;
this.length=1}}return this},size:function(){return this.length},pushStack:function(){var a=this.constructor.apply(this,arguments);
a.prevObject=this;return a},end:function(){return this.prevObject||this.constructor()
},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var a=SC.Enumerable,c=SC.Builder.fn,b,e;for(b in a){if(!a.hasOwnProperty(b)){continue
}e=Array.prototype[b]||a[b];c[b]=e}})();require("system/builder");SC.CoreQuery=(function(){var G=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,k=/^.[^:#\[\.]*$/;
var y=/ CQ\d+="(?:\d+|null)"/g,f=/(<(\w+)[^>]*?)\/>/g,s=/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i,b=/\s+/,g=/^\s+/,j=/^body|html$/i,E=/href|src|style/,l=/(button|input|object|select|textarea)/i,z=/alpha\([^)]*\)/,u=/opacity=([^)]*)/;
var D=SC.browser.msie?"styleFloat":"cssFloat";var v=(SC.browser.safari&&parseInt(SC.browser.version,0)<417)?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var A=new RegExp("^("+v+"+)(#)("+v+"+)");var p=new RegExp("^([#.]?)("+v+"*)");var h=new RegExp("([#.]?)("+v+"*)","g");
var o=["Left","Right"];var e=["Top","Bottom"];var q={position:"absolute",visibility:"hidden",display:"block"};
var C=function C(J,I,O){var N=I==="width"?J.offsetWidth:J.offsetHeight;var L=0,H=0,M=O.length,K;
while(--M>=0){K=O[M];L+=parseFloat(c.curCSS(J,"padding"+K,true))||0;H+=parseFloat(c.curCSS(J,"border"+K+"Width",true))||0
}N-=Math.round(L+H);return N};var m=SC.guidKey,B=0,F={},a=/z-?index|font-?weight|opacity|zoom|line-?height/i,w=document.defaultView||{};
var t=function t(I){if(!SC.browser.safari){return false}var H=w.getComputedStyle(I,null);
return !H||H.getPropertyValue("color")===""};function n(H,I){return H[0]&&parseInt(c.curCSS(H[0],I,true),10)||0
}var x,c;c=x=SC.Builder.create({jquery:"SC.CoreQuery",init:function(H,J){H=H||document;
if(H.nodeType){this[0]=H;this.length=1;return this}else{if(typeof H==="string"){var I=G.exec(H);
if(I&&(I[1]||!J)){if(I[1]){H=c.clean([I[1]],J)}else{var K=document.getElementById(I[3]);
if(K){if(K.id!=I[3]){return c().find(H)}return c(K)}H=[]}}else{return c(J).find(H)
}}else{if(SC.typeOf(H)===SC.T_FUNCTION){return SC.ready(H)}}}return this.setArray(c.makeArray(H))
},size:function(){return this.length},get:function(H){return H===undefined?c.makeArray(this):this[H]
},find:function(H){var I=c.map(this,function(J){return c.find(H,J)});return this.pushStack(I)
},filter:function(H){return this.pushStack((SC.typeOf(H)===SC.T_FUNCTION)&&c.grep(this,function(J,I){return H.call(J,I)
})||c.multiFilter(H,this))},not:function(H){if(typeof H==="string"){if(k.test(H)){return this.pushStack(c.multiFilter(H,this,true))
}else{H=c.multiFilter(H,this)}}var I=H.length&&H[H.length-1]!==undefined&&!H.nodeType;
return this.filter(function(){return I?c.inArray(this,H)<0:this!=H})},setArray:function(H){this.length=0;
Array.prototype.push.apply(this,H);return this},map:function(H){return this.pushStack(c.map(this,function(J,I){return H.call(J,I,J)
}))},each:function(I,H){return c.each(this,I,H)},index:function(H){if(H&&H.jquery){H=H[0]
}return Array.prototype.indexOf.call(this,H)},eq:function(H){return this.slice(H,+H+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},add:function(H){return this.pushStack(c.merge(this.get(),typeof H==="string"?c(H):c.makeArray(H)).uniq())
},attr:function(I,K,J){var H=I;if(typeof I==="string"){if(K===undefined){return this[0]&&c[J||"attr"](this[0],I)
}else{H={};H[I]=K}}return this.each(function(L){for(I in H){c.attr((J)?this.style:this,I,c.prop(this,H[I],J,L,I))
}})},html:function(H){return H===undefined?(this[0]?this[0].innerHTML.replace(y,""):null):this.empty().append(H)
},andSelf:function(){return this.add(this.prevObject)},is:function(H){return !!H&&c.multiFilter(H,this).length>0
},hasClass:function(H){return Array.prototype.every.call(this,function(I){return(I.nodeType===1)&&c.className.has(I,H)
})},val:function(N){if(N===undefined){var H=this[0];if(H){if(c.nodeName(H,"option")){return(H.attributes.value||{}).specified?H.value:H.text
}if(c.nodeName(H,"select")){var L=H.selectedIndex,O=[],P=H.options,K=H.type==="select-one",J;
if(L<0){return null}var I,M=K?L+1:P.length;for(I=K?L:0;I<M;I++){J=P[I];if(J.selected){N=c(J).val();
if(K){return N}O.push(N)}}return O}return(H.value||"").replace(/\r/g,"")}return undefined
}else{if(typeof N==="number"){N+=""}this.each(function(){if(this.nodeType!==1){return
}if(SC.typeOf(N)===SC.T_ARRAY&&(/radio|checkbox/).test(this.type)){this.checked=(c.inArray(this.value,N)>=0||c.inArray(this.name,N)>=0)
}else{if(c.nodeName(this,"select")){var Q=c.makeArray(N);c("option",this).each(function(){this.selected=(c.inArray(this.value,Q)>=0||c.inArray(this.text,Q)>=0)
});if(!Q.length){this.selectedIndex=-1}}else{this.value=N}}})}return this},clone:function(){var H=this.map(function(){if(SC.browser.msie&&!c.isXMLDoc(this)){var K=this.cloneNode(true),J=document.createElement("div");
J.appendChild(K);return c.clean([J.innerHTML])[0]}else{return this.cloneNode(true)
}});var I=H.find("*").andSelf().each(function(){if(this[SC.guidKey]!==undefined){this[SC.guidKey]=null
}});return H},css:function(H,I){if((H==="width"||H==="height")&&parseFloat(I,0)<0){I=undefined
}return this.attr(H,I,"curCSS")},text:function(I){if(I!==undefined&&typeof I!=="object"&&I!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(I))
}var H="";c.each(I||this,function(){c.each(this.childNodes,function(){if(this.nodeType!==8){H+=this.nodeType!==1?this.nodeValue:c.fn.text([this])
}})});return H},show:function(){var H=SC.$.isVisible;this.each(function(){if(!H(this)){this.style.display=this.oldblock||"";
if(c.css(this,"display")==="none"){var I=c("<"+this.tagName+"/>");c("body").append(I);
this.style.display=I.css("display");if(this.style.display==="none"){this.style.display="block"
}I.remove();I=null}}});return this},hide:function(){var H=SC.$.isVisible;this.each(function(){if(H(this)){this.oldblock=this.oldblock||c.css(this,"display");
this.style.display="none"}});return this},domManip:function(J,K,I,M){var L=this.length>1,H;
return this.each(function(){if(!H){H=c.clean(J,this.ownerDocument);if(I){H.reverse()
}}var N=this;if(K&&c.nodeName(this,"table")&&c.nodeName(H[0],"tr")){N=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}c.each(H,function(){var O=L?c(this).clone(true)[0]:this;M.call(N,O)})})},append:function(){return this.domManip(arguments,true,false,function(H){if(this.nodeType===1){this.appendChild(H)
}})},prepend:function(){return this.domManip(arguments,true,true,function(H){if(this.nodeType===1){this.insertBefore(H,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(H){this.parentNode.insertBefore(H,this)
})},after:function(){return this.domManip(arguments,false,true,function(H){this.parentNode.insertBefore(H,this.nextSibling)
})},replaceWith:function(H){return this.after(H).remove()},removeData:function(H){return this.each(function(){SC.removeData(this,H)
})}});x.mixin({nodeName:function(I,H){return I.nodeName&&I.nodeName.toUpperCase()===H.toUpperCase()
},map:function(H,M){var I=[],L,J,K;for(J=0,K=H.length;J<K;J++){L=M(H[J],J);if(L!=null){I[I.length]=L
}}return I.concat.apply([],I)},each:function(J,N,I){var H,K=0,L=J.length;if(I){if(L===undefined){for(H in J){if(N.apply(J[H],I)===false){break
}}}else{for(;K<L;){if(N.apply(J[K++],I)===false){break}}}}else{if(L===undefined){for(H in J){if(N.call(J[H],H,J[H])===false){break
}}}else{for(var M=J[0];K<L&&N.call(M,K,M)!==false;M=J[++K]){}}}return J},isXMLDoc:function(H){return H.documentElement&&!H.body||H.tagName&&H.ownerDocument&&!H.ownerDocument.body
},clean:function(H,J){var I=[];J=J||document;if(typeof J.createElement=="undefined"){J=J.ownerDocument||J[0]&&J[0].ownerDocument||document
}c.each(H,function(N,P){if(typeof P==="number"){P+=""}if(!P){return}if(typeof P==="string"){P=P.replace(f,function(S,T,R){return R.match(s)?S:T+"></"+R+">"
});var M=P.replace(g,"").substring(0,10).toLowerCase(),Q=J.createElement("div");var O=!M.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!M.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||M.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!M.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!M.indexOf("<td")||!M.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!M.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||SC.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
Q.innerHTML=O[1]+P+O[2];while(O[0]--){Q=Q.lastChild}if(SC.browser.msie){var L=!M.indexOf("<table")&&M.indexOf("<tbody")<0?Q.firstChild&&Q.firstChild.childNodes:O[1]==="<table>"&&M.indexOf("<tbody")<0?Q.childNodes:[];
for(var K=L.length-1;K>=0;--K){if(c.nodeName(L[K],"tbody")&&!L[K].childNodes.length){L[K].parentNode.removeChild(L[K])
}}if(/^\s/.test(P)){Q.insertBefore(J.createTextNode(P.match(/^\s*/)[0]),Q.firstChild)
}}P=c.makeArray(Q.childNodes)}if(P.length===0&&(!c.nodeName(P,"form")&&!c.nodeName(P,"select"))){return
}if(P[0]===undefined||c.nodeName(P,"form")||P.options){I.push(P)}else{I=c.merge(I,P)
}});return I},find:function(U,I){var P;if(typeof U!=="string"){return[U]}if(U.indexOf(",")>=0){P=U.split(",").map(function(W){return c.find(W,I)
});return P.concat.apply([],P).uniq()}if(I&&I.nodeType!==1&&I.nodeType!==9){return[]
}I=I||document;P=[I];var R,H=YES,L=U.match(h),O=L.length,K;for(var S=0;S<O;S++){U=L[S];
if(U===" "||U===""){H=YES}else{if(H){K=p.exec(U);if((K[1]==="")&&(S<(O-1))&&(L[S+1].charAt(0)==="#")){U=L[S+1];
L[S+1]=L[S];K=p.exec(U)}var N=[],M=P.length,Q,T,J=K[2],V;for(Q=0;Q<M;Q++){T=P[Q];
switch(K[1]){case"":if(!J){J="*"}if(J==="*"&&T.nodeName.toLowerCase()==="object"){J="param"
}N=c.merge(N,T.getElementsByTagName(J));break;case"#":if(T===document){V=document.getElementById(J);
if(SC.browser.msie&&V&&V.getAttribute("id")!==J){V=NO}else{if(V){N.push(V)}V=YES}}else{V=NO
}if(!V){V=T.getElementsByTagName("*");V=Array.prototype.find.call(V,function(W){return W.getAttribute&&(W.getAttribute("id")===J)
});if(V){N.push(V)}}break;case".":if(T.getElementsByClassName){N=c.merge(N,T.getElementsByClassName(J))
}else{N=c.merge(N,c.classFilter(T.getElementsByTagName("*"),J))}break;default:}}delete P;
P=N;H=NO}else{P=c.filter(U,P)}}}if(P&&P[0]==I){P.shift()}return P.uniq()},classFilter:function(M,H,L){H=" "+H+" ";
var J=[],K;for(var I=0;M[I];I++){K=(" "+M[I].className+" ").indexOf(H)>=0;if(!L&&K||L&&!K){J.push(M[I])
}}return J},filter:function(I,M,L){var H=p.exec(I),N=H[2],K=H[1],J;if(K==="."){return c.classFilter(c.makeArray(M),N,L)
}else{if(K==="#"){J=function(P){var O=P&&P.getAttribute&&(P.getAttribute("id")===N);
return(L)?!O:O}}else{J=function(P){var O=c.nodeName(P,N);return(L)?!O:O}}return Array.prototype.filter.call(c.makeArray(M),J)
}},multiFilter:function(K,H,J){K=K.indexOf(",")?K.split(","):[K];var M=K.length,L,I=[];
while(--M>=0){L=c.filter(K[M].trim(),H,J);I=J?H=L:c.merge(L,I)}return I},merge:function(K,H){var I=0,J,L=K.length;
if(SC.browser.msie){while(J=H[I++]){if(J.nodeType!==8){K[L++]=J}}}else{while(J=H[I++]){K[L++]=J
}}return K},makeArray:function(J){var H=[];if(!SC.none(J)){var I=J.length;if(I==null||typeof J==="string"||J.setInterval){H[0]=J
}else{while(I){H[--I]=J[I]}}}return H},inArray:function(H,I){return I.indexOf?I.indexOf(H):Array.prototype.indexOf.call(I,H)
},boxModel:!SC.browser.msie||document.compatMode==="CSS1Compat",props:{"for":"htmlFor","class":"className","float":D,cssFloat:D,styleFloat:D,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan"},prop:function(K,L,J,I,H){if(SC.typeOf(L)===SC.T_FUNCTION){L=L.call(K,I)
}return L&&(typeof L==="number")&&J==="curCSS"&&!a.test(H)?L+"px":L},grep:function(I,M,H){var J=[];
for(var K=0,L=I.length;K<L;K++){if(!H!=!M(I[K],K)){J.push(I[K])}}return J},className:{add:function(I,J){var H=c.className.has;
c.each((J||"").split(b),function(K,L){if(I.nodeType===1&&!H(I.className,L)){I.className+=(I.className?" ":"")+L
}})},remove:function(H,I){if(H.nodeType===1){H.className=I!==undefined?c.grep(H.className.split(b),function(J){return !c.className.has(I,J)
}).join(" "):""}},has:function(I,H){return I&&c.inArray(H,(I.className||I).toString().split(b))>-1
}},swap:function(M,L,O,N,H){var I={},K;for(K in L){I[K]=M.style[K];M.style[K]=L[K]
}var J=O(M,N,H);for(K in L){M.style[K]=I[K]}return J},css:function(J,H,K){if(H==="width"||H==="height"){var M,L=(H==="width")?o:e,I=q;
M=SC.$.isVisible(J)?C(J,H,L):c.swap(J,I,C,H,L);return Math.max(0,M)}return c.curCSS(J,H,K)
},curCSS:function(N,I,J){var S,H=N.style;if(I==="opacity"&&SC.browser.msie){S=c.attr(H,"opacity");
return S===""?"1":S}if(SC.browser.opera&&I==="display"){var T=H.outline;H.outline="0 solid black";
H.outline=T}var K=I.match(/float/i);if(K){I=D}if(!J&&H&&H[I]){S=H[I]}else{if(w.getComputedStyle){if(K){I="float"
}I=I.replace(/([A-Z])/g,"-$1").toLowerCase();var U=w.getComputedStyle(N,null);if(U&&!t(N,w)){S=U.getPropertyValue(I)
}else{var M=[],V=[],W=N,P=0,R,O;for(;W&&t(W);W=W.parentNode){V.unshift(W)}for(O=V.length;
P<O;P++){if(t(V[P])){M[P]=V[P].style.display;V[P].style.display="block"}}S=(I==="display"&&M[V.length-1]!==null)?"none":(U&&U.getPropertyValue(I))||"";
for(P=0,R=M.length;P<R;P++){if(M[P]!==null){V[P].style.display=M[P]}}}if(I==="opacity"&&S===""){S="1"
}}else{if(N.currentStyle){S=N.currentStyle[I]||N.currentStyle[I.camelize()];if(!(/^\d+(px)?$/i).test(S)&&(/^\d/).test(S)){var L=H.left,Q=N.runtimeStyle.left;
N.runtimeStyle.left=N.currentStyle.left;H.left=S||0;S=H.pixelLeft+"px";H.left=L;N.runtimeStyle.left=Q
}}}}return S},dir:function(J,I){var H=[],K=J[I];while(K&&K!=document){if(K.nodeType===1){H.push(K)
}K=K[I]}return H},nth:function(L,H,J,K){H=H||1;var I=0;for(;L;L=L[J]){if(L.nodeType===1&&++I==H){break
}}return L},sibling:function(J,I){var H=[];for(;J;J=J.nextSibling){if(J.nodeType===1&&J!=I){H.push(J)
}}return H},attr:function(I,H,O){if(!I||I.nodeType===3||I.nodeType===8){return undefined
}var J=!c.isXMLDoc(I),N=O!==undefined,L=SC.browser.msie;H=J&&c.props[H]||H;if(I.tagName){var M=E.test(H);
if(H==="selected"&&I.parentNode){I.parentNode.selectedIndex}if(H in I&&J&&!M){if(N){if(H==="type"&&c.nodeName(I,"input")&&I.parentNode){throw"type property can't be changed"
}I[H]=O}if(c.nodeName(I,"form")&&I.getAttributeNode(H)){return I.getAttributeNode(H).nodeValue
}if(H==="tabIndex"){var P=I.getAttributeNode("tabIndex");return P&&P.specified?P.value:I.nodeName.match(l)?0:I.nodeName.match(/^(a|area)$/i)&&I.href?0:undefined
}return I[H]}if(L&&J&&H==="style"){return c.attr(I.style,"cssText",O)}if(N){I.setAttribute(H,""+O)
}var K=(L&&J&&M)?I.getAttribute(H,2):I.getAttribute(H);return K===null?undefined:K
}if(L&&H==="opacity"){if(N){I.zoom=1;I.filter=(I.filter||"").replace(z,"")+(parseInt(O,0)+""=="NaN"?"":"alpha(opacity="+O*100+")")
}return I.filter&&I.filter.indexOf("opacity=")>=0?(parseFloat(I.filter.match(u)[1])/100)+"":""
}H=H.camelize();if(N){I[H]=O}return I[H]}});c.fn.init.prototype=c.fn;c.each({parent:function(H){return H.parentNode
},parents:function(H){return c.dir(H,"parentNode")},next:function(H){return c.nth(H,2,"nextSibling")
},prev:function(H){return c.nth(H,2,"previousSibling")},nextAll:function(H){return c.dir(H,"nextSibling")
},prevAll:function(H){return c.dir(H,"previousSibling")},siblings:function(H){return c.sibling(H.parentNode.firstChild,H)
},children:function(H){return c.sibling(H.firstChild)},contents:function(H){return c.nodeName(H,"iframe")?H.contentDocument||H.contentWindow.document:c.makeArray(H.childNodes)
}},function(H,I){c.fn[H]=function(J){var K=c.map(this,I);if(J&&typeof J==="string"){K=c.multiFilter(J,K)
}return this.pushStack(K.uniq())}});c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(H,I){c.fn[H]=function(){var J=arguments;
return this.each(function(){for(var K=0,L=J.length;K<L;K++){c(J[K])[I](this)}})}});
c.each({removeAttr:function(H){c.attr(this,H,"");if(this.nodeType===1){this.removeAttribute(H)
}},addClass:function(H){c.className.add(this,H)},removeClass:function(H){c.className.remove(this,H)
},toggleClass:function(H){c.className[c.className.has(this,H)?"remove":"add"](this,H)
},remove:function(H){if(!H||c.filter(H,[this]).length){if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){while(this.firstChild){this.removeChild(this.firstChild)}}},function(H,I){c.fn[H]=function(){return this.each(I,arguments)
}});c.each(["Height","Width"],function(L,J){var M=J.toLowerCase(),I;c.fn[M]=function(N){if(this[0]===window){if(SC.browser.opera){I=document.body["client"+J]
}else{if(SC.browser.safari){I=window["inner"+J]}else{if(document.compatMode){I=documentElement["client"+J]
}else{I=document.body["client"+J]}}}}else{if(this[0]===document){I=Math.max(Math.max(document.body["scroll"+J],document.documentElement["scroll"+J]),Math.max(document.body["offset"+J],document.documentElement["offset"+J]))
}else{if(N===undefined){return this.length?c.css(this[0],M):null}else{return this.css(M,(typeof N==="string")?N:N+"px")
}}}return I};var H=L?"Left":"Top",K=L?"Right":"Bottom";c.fn["inner"+J]=function(){return this[J.toLowerCase()]()+n(this,"padding"+H)+n(this,"padding"+K)
};c.fn["outer"+J]=function(N){return this["inner"+J]()+n(this,"border"+H+"Width")+n(this,"border"+K+"Width")+(N?n(this,"margin"+H)+n(this,"margin"+K):0)
}});x.fn.offset=function(){var I=0,Q=0,J=this[0],V=SC.browser,M;if(!J){return undefined
}function L(W){U(c.curCSS(W,"borderLeftWidth",true),c.curCSS(W,"borderTopWidth",true))
}function U(W,X){I+=parseInt(W,10)||0;Q+=parseInt(X,10)||0}var S=J.parentNode,P=J,H=J.offsetParent,R=J.ownerDocument,T=V.safari&&parseInt(V.version,0)<522&&!(/adobeair/i).test(V.userAgent),O=c.curCSS,K=c.css(J,"position")==="fixed";
if(!(V.mozilla&&J==document.body)&&J.getBoundingClientRect){var N=J.getBoundingClientRect();
U(N.left+Math.max(R.documentElement.scrollLeft,R.body.scrollLeft),N.top+Math.max(R.documentElement.scrollTop,R.body.scrollTop));
U(-R.documentElement.clientLeft,-R.documentElement.clientTop)}else{U(J.offsetLeft,J.offsetTop);
while(H){U(H.offsetLeft,H.offsetTop);if(V.mozilla&&!(/^t(able|d|h)$/i).test(H.tagName)||V.safari&&!T){L(H)
}if(!K&&O(H,"position")==="fixed"){K=true}P=(/^body$/i).test(H.tagName)?P:H;H=H.offsetParent
}while(S&&S.tagName&&!(j).test(S.tagName)){if(!(/^inline|table.*$/i).test(O(S,"display"))){U(-S.scrollLeft,-S.scrollTop)
}if(V.mozilla&&O(S,"overflow")!=="visible"){L(S)}S=S.parentNode}if((T&&(K||O(P,"position")==="absolute"))||(V.mozilla&&O(P,"position")!=="absolute")){U(-R.body.offsetLeft,-R.body.offsetTop)
}if(K){U(Math.max(R.documentElement.scrollLeft,R.body.scrollLeft),Math.max(R.documentElement.scrollTop,R.body.scrollTop))
}}M={top:Q,left:I};return M};x.fn.mixin({position:function(){var L=0,K=0,I;if(this[0]){var J=this.offsetParent(),M=this.offset(),H=j.test(J[0].tagName)?{top:0,left:0}:J.offset();
M.top-=n(this,"marginTop");M.left-=n(this,"marginLeft");H.top+=n(J,"borderTopWidth");
H.left+=n(J,"borderLeftWidth");I={top:M.top-H.top,left:M.left-H.left}}return I},offsetParent:function(){var H=this[0].offsetParent||document.body;
while(H&&(!(j).test(H.tagName)&&c.css(H,"position")==="static")){H=H.offsetParent
}return c(H)}});c.each(["Left","Top"],function(I,H){var J="scroll"+H;c.fn[J]=function(K){if(!this[0]){return
}return K!==undefined?this.each(function(){this==window||this==document?window.scrollTo(!I?K:c(window).scrollLeft(),I?K:c(window).scrollTop()):this[J]=K
}):this[0]==window||this[0]==document?self[I?"pageYOffset":"pageXOffset"]||c.boxModel&&document.documentElement[J]||document.body[J]:this[0][J]
}});return x}());SC.$=(typeof jQuery=="undefined")?SC.CoreQuery:jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var c=[],b=this.length,a=0;
for(a=0;a<b;a++){c[a]="%@: %@".fmt(a,this[a]?this[a].toString():"(null)")}return"<$:%@>(%@)".fmt(SC.guidFor(this),c.join(" , "))
},isVisible:function(){return Array.prototype.every.call(this,function(a){return SC.$.isVisible(a)
})},first:function(){return this.pushStack([this[0]])},last:function(){return this.pushStack([this[this.length-1]])
},view:function(){return this.map(function(){var b=null,a=SC.viewKey,e=this,c;while(!b&&e&&(e!==document)){if(e.nodeType===1&&(c=e.getAttribute("id"))){b=SC.View.views[c]
}e=e.parentNode}e=null;return b})},setClass:function(e,c){if(SC.none(e)){return this
}var f=SC.typeOf(e)!==SC.T_STRING,a=this._fixupClass,b;this.each(function(){if(this.nodeType!==1){return
}var j=this.className.split(/\s+/),h=NO;if(f){for(var g in e){if(!e.hasOwnProperty(g)){continue
}h=a(j,g,e[g])||h}}else{h=a(j,e,c)}if(h){this.className=j.join(" ")}});return this
},_fixupClass:function(e,a,c){var b=e.indexOf(a);if(c){if(b<0){e.push(a);return YES
}}else{if(b>=0){e[b]=null;return YES}}return NO},within:function(f){f=SC.$(f);var e,c,h,b,a=f.length,g=this.length;
while(!e&&(--g>=0)){h=this[g];for(b=0;!e&&(b<a);b++){c=f[b];while(c&&(c!==h)){c=c.parentNode
}e=c===h}}h=c=null;return e}});(function(){var c={},g={find:function(k,j){return(j!==undefined)?SC.Enumerable.find.call(this,k,j):c.find.call(this,k)
},filter:function(k,j){return(j!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,k,j)):c.filter.call(this,k)
},filterProperty:function(j,k){return this.pushStack(SC.Enumerable.filterProperty.call(this,j,k))
},indexOf:SC.$.index,map:function(k,j){return(j!==undefined)?SC.Enumerable.map.call(this,k,j):c.map.call(this,k)
}};var h=SC.$.jquery==="SC.CoreQuery",e=SC.$.fn,a=h?g:SC.Enumerable,f;for(var b in a){if(!a.hasOwnProperty(b)){continue
}f=a[b];if(b in g){c[b]=e[b];f=g[b]}e[b]=f}})();SC.mixin(SC.$,{isVisible:function(a){var b=SC.$;
return("hidden"!=a.type)&&(b.css(a,"display")!="none")&&(b.css(a,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(e){if(e){this.originalEvent=e;
var h=SC.Event._props,c=h.length,b=c,f;while(--b>=0){f=h[b];this[f]=e[f]}}this.timeStamp=this.timeStamp||Date.now();
if(!this.target){this.target=this.srcElement||document}if(this.target.nodeType===3){this.target=this.target.parentNode
}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var j=document.documentElement,a=document.body;
this.pageX=this.clientX+(j&&j.scrollLeft||a&&a.scrollLeft||0)-(j.clientLeft||0);this.pageY=this.clientY+(j&&j.scrollTop||a&&a.scrollTop||0)-(j.clientTop||0)
}if(!this.which&&((this.charCode||e.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(SC.browser.safari&&e.wheelDelta!==undefined){this.wheelDelta=0-(e.wheelDeltaY||e.wheelDeltaX);
this.wheelDeltaY=0-(e.wheelDeltaY||0);this.wheelDeltaX=0-(e.wheelDeltaX||0)}else{if(!SC.none(e.detail)){var g=Math.floor(e.detail*40);
if(e.axis&&(e.axis===e.HORIZONTAL_AXIS)){this.wheelDeltaX=g;this.wheelDeltaY=this.wheelDelta=0
}else{this.wheelDeltaY=this.wheelDelta=g;this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-e.wheelDelta:e.wheelDelta;
this.wheelDeltaX=0}}return this};SC.mixin(SC.Event,{create:function(a){return new SC.Event(a)
},add:function(f,e,g,h,c){if(f&&f.isCoreQuery){if(f.length>0){f.forEach(function(j){this.add(j,e,g,h,c)
},this);return this}else{f=f[0]}}if(!f){return this}if(f.nodeType===3||f.nodeType===8){return SC.Event
}if(SC.browser.msie&&f.setInterval){f=window}if(SC.typeOf(g)===SC.T_FUNCTION){c=h;
h=g;g=null}else{if(g&&SC.typeOf(h)===SC.T_STRING){h=g[h]}}var b=SC.data(f,"events")||SC.data(f,"events",{}),a=b[e];
if(!a){a=b[e]={};this._addEventListener(f,e)}a[SC.guidFor(h)]=[g,h,c];SC.Event._global[e]=YES;
f=b=a=null;return this},remove:function(g,f,h,j){if(g&&g.isCoreQuery){if(g.length>0){g.forEach(function(k){this.remove(k,f,h,j)
},this);return this}else{g=g[0]}}if(!g){return this}if(g.nodeType===3||g.nodeType===8){return SC.Event
}if(SC.browser.msie&&g.setInterval){g=window}var a,e,c=SC.data(g,"events");if(!c){return this
}if(f===undefined){for(f in c){this.remove(g,f)}}else{if(a=c[f]){var b=NO;if(h||j){if(SC.typeOf(h)===SC.T_FUNCTION){j=h;
h=null}else{if(SC.typeOf(j)===SC.T_STRING){j=h[j]}}delete a[SC.guidFor(j)];e=null;
for(e in a){break}if(e===null){b=YES}}else{b=YES}if(b){delete c[f];this._removeEventListener(g,f)
}e=null;for(e in c){break}if(!e){SC.removeData(g,"events");delete this._elements[SC.guidFor(g)]
}}}g=c=a=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(e,c,b){var a=SC.Event.create({type:c,target:e,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(c)<0),cancelled:NO,normalized:YES});
if(b){SC.mixin(a,b)}return a},trigger:function(c,b,k,l){if(c&&c.isCoreQuery){if(c.length>0){c.forEach(function(o){this.trigger(o,b,k,l)
},this);return this}else{c=c[0]}}if(!c){return this}if(c.nodeType===3||c.nodeType===8){return undefined
}k=SC.A(k);var j,m=SC.typeOf(c[b]||null)===SC.T_FUNCTION,a,h,f,n;a=k[0];if(!a||!a.preventDefault){a=this.simulateEvent(c,b);
k.unshift(a)}a.type=b;h=c;do{j=SC.Event.handle.apply(h,k);h=(h===document)?null:(h.parentNode||document)
}while(!j&&a.bubbles&&h);h=null;f=c["on"+b];n=SC.CoreQuery.nodeName(c,"a")&&b==="click";
if((!m||n)&&f&&f.apply(c,k)===NO){j=NO}if(m&&l!==NO&&j!==NO&&!n){this.triggered=YES;
try{c[b]()}catch(g){}}this.triggered=NO;return j},handle:function(b){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var c,h,f,k,e,j,l,m,a,g;j=SC.A(arguments);j[0]=b=SC.Event.normalizeEvent(b||window.event);
e=(SC.data(this,"events")||{})[b.type];if(!e){return NO}for(l in e){m=e[l];a=m[1];
b.handler=a;b.data=b.context=m[2];g=m[0]||this;h=a.apply(g,j);if(c!==NO){c=h}if(h===NO){b.preventDefault();
b.stopPropagation()}}return c},unload:function(){var a,b=this._elements;for(a in b){this.remove(b[a])
}for(a in b){delete b[a]}delete this._elements},special:{ready:{setup:function(){SC._bindReady();
return},teardown:function(){return}},mouseenter:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseover",SC.Event.special.mouseenter.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseover",SC.Event.special.mouseenter.handler);return YES
},handler:function(a){if(SC.Event._withinElement(a,this)){return YES}a.type="mouseenter";
return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(e,c){var b=e.relatedTarget;
while(b&&b!=c){try{b=b.parentNode}catch(a){b=c}}return b===c},_addEventListener:function(e,c){var f,b=this.special[c];
if(!b||b.setup.call(e)===NO){var a=SC.guidFor(e);this._elements[a]=e;f=SC.data(e,"listener")||SC.data(e,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[a],arguments)
});if(e.addEventListener){e.addEventListener(c,f,NO)}else{if(e.attachEvent){e.attachEvent("on"+c,f)
}}}e=b=f=null},_removeEventListener:function(c,b){var e,a=SC.Event.special[b];if(!a||(a.teardown.call(c)===NO)){e=SC.data(c,"listener");
if(e){if(c.removeEventListener){c.removeEventListener(b,e,NO)}else{if(c.detachEvent){c.detachEvent("on"+b,e)
}}}}c=a=e=null},_elements:{},normalizeEvent:function(a){if(a===window.event){return SC.Event.create(a)
}else{return a.normalized?a:SC.Event.create(a)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches animationName elapsedTime".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,touchesForView:function(a){if(this.touchContext){return this.touchContext.touchesForView(a)
}},averagedTouchesForView:function(a){if(this.touchContext){return this.touchContext.averagedTouchesForView(a)
}return null},allowDefault:function(){this.hasCustomEventHandling=YES;return this
},preventDefault:function(){var a=this.originalEvent;if(a){if(a.preventDefault){a.preventDefault()
}a.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var a=this.originalEvent;
if(a){if(a.stopPropagation){a.stopPropagation()}a.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){if(SC.browser.msie){if(this.keyCode==8||this.keyCode==9||(this.keyCode>=37&&this.keyCode<=40)){return String.fromCharCode(0)
}else{return(this.keyCode>0)?String.fromCharCode(this.keyCode):null}}else{return(this.charCode>0)?String.fromCharCode(this.charCode):null
}},commandCodes:function(){var f=this.keyCode,b=null,c=null,a="",e;if(f){b=SC.FUNCTION_KEYS[f];
if(!b&&(this.altKey||this.ctrlKey||this.metaKey)){b=SC.PRINTABLE_KEYS[f]}if(b){if(this.altKey){a+="alt_"
}if(this.ctrlKey||this.metaKey){a+="ctrl_"}if(this.shiftKey){a+="shift_"}}}if(!b){f=this.which;
c=b=String.fromCharCode(f);e=b.toLowerCase();if(this.metaKey){a="meta_";b=e}else{b=null
}}if(b){b=a+b}return[b,c]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;if(SC.browser.msie){SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload)
}SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("cursorStyle")||SC.DEFAULT_CURSOR,c=this.constructor.sharedStyleSheet(),b=SC.guidFor(this);
if(c.insertRule){c.insertRule("."+b+" {cursor: "+a+";}",c.cssRules?c.cssRules.length:0)
}else{if(c.addRule){c.addRule("."+b,"cursor: "+a)}}this.cursorStyle=a;this.className=b;
return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var e,g,c,f,h,b,a;
e=this.get("cursorStyle")||SC.DEFAULT_CURSOR;g=this._rule;if(g){g.style.cursor=e;
return}c="."+this.get("className");f=this.constructor.sharedStyleSheet();h=(f.cssRules?f.cssRules:f.rules)||[];
for(b=0,a=h.length;b<a;++b){g=h[b];if(g.selectorText===c){this._rule=g;g.style.cursor=e;
break}}}.observes("cursorStyle")});SC.Cursor.sharedStyleSheet=function(){var b,a=this._styleSheet;
if(!a){a=document.createElement("style");a.type="text/css";b=document.getElementsByTagName("head")[0];
if(!b){b=document.documentElement}b.appendChild(a);a=document.styleSheets[document.styleSheets.length-1];
this._styleSheet=a}return a};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomingFirstResponder:NO,becomeFirstResponder:function(){var a=this.get("pane")||this.get("responderContext")||this.pane();
if(a&&this.get("acceptsFirstResponder")){if(a.get("firstResponder")!==this){a.makeFirstResponder(this)
}}return this},resignFirstResponder:function(a){var b=this.get("pane")||this.get("responderContext");
if(b&&(b.get("firstResponder")===this)){b.makeFirstResponder(null,a)}return YES},willLoseFirstResponder:function(a){},didBecomeFirstResponder:function(a){}});
sc_require("system/browser");sc_require("system/event");sc_require("system/cursor");
sc_require("system/responder");sc_require("mixins/string");SC.viewKey=SC.guidKey+"_view";
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.ANCHOR_TOP={top:0};SC.ANCHOR_LEFT={left:0};
SC.ANCHOR_TOP_LEFT={top:0,left:0};SC.ANCHOR_BOTTOM={bottom:0};SC.ANCHOR_RIGHT={right:0};
SC.ANCHOR_BOTTOM_RIGHT={bottom:0,right:0};SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.CONTEXT_MENU_ENABLED=NO;
SC.TABBING_ONLY_INSIDE_DOCUMENT=YES;SC.EMPTY_CHILD_VIEWS_ARRAY=[];SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;
SC.View=SC.Responder.extend(SC.DelegateSupport,{concatenatedProperties:"outlets displayProperties layoutProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var a=this;
while(a&&!a.isPane){a=a.get("parentView")}return a}.property("parentView").cacheable(),page:null,splitView:function(){var a=this;
while(a&&!a.isSplitView){a=a.get("parentView")}return a}.property("parentView").cacheable(),parentView:null,backgroundColor:null,useStaticLayout:NO,isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var a=this.get("isEnabled"),b;
if(a&&(b=this.get("parentView"))){a=b.get("isEnabledInPane")}return a}.property("parentView","isEnabled"),_sc_view_isEnabledDidChange:function(){if(!this.get("isEnabled")&&this.get("isFirstResponder")){this.resignFirstResponder()
}}.observes("isEnabled"),isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:NO,isContextMenuEnabled:function(){return SC.CONTEXT_MENU_ENABLED
}.property(),recomputeIsVisibleInWindow:function(c){var f=this.get("isVisibleInWindow"),h=this.get("isVisible"),e;
if(h){if(c===undefined){e=this.get("parentView");c=e?e.get("isVisibleInWindow"):NO
}h=h&&c}this.set("isVisibleInWindow",h);var g=this.get("childViews"),b=g.length,a;
for(a=0;a<b;a++){g[a].recomputeIsVisibleInWindow(h)}if(h){this.displayDidChange();
if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{this._forceLayerUpdateDueToVisibilityChange=YES;this.displayDidChange();if(this.get("isFirstResponder")){this.resignFirstResponder()
}}return this},_sc_isVisibleDidChange:function(){this.recomputeIsVisibleInWindow()
}.observes("isVisible"),childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,insertBefore:function(b,e){b.beginPropertyChanges();
if(b.get("parentView")){b.removeFromParent()}if(this.willAddChild){this.willAddChild(b,e)
}if(b.willAddToParent){b.willAddToParent(this,e)}b.set("parentView",this);var a,c=this.get("childViews");
if(c.needsClone){this.set(c=[])}a=(e)?c.indexOf(e):c.length;if(a<0){a=c.length}c.insertAt(a,b);
b.parentViewDidChange();b.layoutDidChange();var f=b.get("pane");if(f&&f.get("isPaneAttached")){b._notifyDidAppendToDocument()
}if(this.didAddChild){this.didAddChild(b,e)}if(b.didAddToParent){b.didAddToParent(this,e)
}b.endPropertyChanges();return this},removeChild:function(b){if(!b){return this}if(b.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,b)
}if(b.willRemoveFromParent){b.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(b)
}b.set("parentView",null);var c=this.get("childViews"),a=c.indexOf(b);if(a>=0){c.removeAt(a)
}b.parentViewDidChange();if(this.didRemoveChild){this.didRemoveChild(b)}if(b.didRemoveFromParent){b.didRemoveFromParent(this)
}return this},removeAllChildren:function(){var b=this.get("childViews"),a;while(a=b.objectAt(b.get("length")-1)){this.removeChild(a)
}return this},removeFromParent:function(){var a=this.get("parentView");if(a){a.removeChild(this)
}return this},replaceChild:function(a,b){a.beginPropertyChanges();b.beginPropertyChanges();
this.beginPropertyChanges();this.insertBefore(a,b).removeChild(b);this.endPropertyChanges();
b.endPropertyChanges();a.endPropertyChanges();return this},replaceAllChildren:function(c){var b=c.get("length"),a;
this.beginPropertyChanges();this.destroyLayer().removeAllChildren();for(a=0;a<b;a++){this.appendChild(c.objectAt(a))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(a){return this.insertBefore(a,null)
},parentViewDidChange:function(){this.recomputeIsVisibleInWindow();this.set("layerLocationNeedsUpdate",YES);
this.invokeOnce(this.updateLayerLocationIfNeeded);this._invalidatePaneCacheForSelfAndAllChildViews();
return this},_invalidatePaneCacheForSelfAndAllChildViews:function(){var e,c=this.get("childViews"),b=c.length,a;
this.notifyPropertyChange("pane");for(a=0;a<b;++a){e=c[a];if(e._invalidatePaneCacheForSelfAndAllChildViews){e._invalidatePaneCacheForSelfAndAllChildViews()
}}},layer:function(a,c){if(c!==undefined){this._view_layer=c}else{c=this._view_layer;
if(!c){var b=this.get("parentView");if(b){b=b.get("layer")}if(b){this._view_layer=c=this.findLayerInParentLayer(b)
}b=null}}return c}.property("isVisibleInWindow").cacheable(),$:function(c){var a,b=this.get("layer");
a=!b?SC.$([]):(c===undefined)?SC.$(b):SC.$(c,b);b=null;return a},containerLayer:function(){return this.get("layer")
}.property("layer").cacheable(),layerId:function(){return SC.guidFor(this)}.property().cacheable(),_lastLayerId:null,layerIdDidChange:function(){var a=this.get("layer");
if(a&&this.get("layerId")!==this._lastLayerId){if(this._lastLayerId){delete SC.View.views[this._lastLayerId]
}this._lastLayerId=this.get("layerId");SC.View.views[this.get("layerId")]=this;a.id=this.get("layerId")
}}.observes("layerId"),findLayerInParentLayer:function(e){var a=this.get("layerId"),g,c,b,j,f;
if(e.getElementById){f=e.getElementById(a)}else{f=document.getElementById(a)}if(SC.browser.msie&&f&&f.id!==a){f=null
}if(!f&&e.querySelector){f=e.querySelector("#"+a)}if(!f){f=e.firstChild;var h=[];
h.push(e);while(h.length!==0){g=h[0];h.shift();if(g.id===a){j=true;f=g;break}for(c=0,b=g.childNodes.length;
c<b;c++){h.push(g.childNodes[c])}}if(!j){f=null}}return f},isDescendantOf:function(a){var b=this.get("parentView");
if(this===a){return YES}else{if(b){return b.isDescendantOf(a)}else{return NO}}},displayDidChange:function(){this.set("layerNeedsUpdate",YES);
return this},layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(){var b=this._forceLayerUpdateDueToVisibilityChange,a=(b||this.get("isVisibleInWindow"))&&this.get("layerNeedsUpdate");
if(a){if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}else{this.set("layerNeedsUpdate",NO)
}this._forceLayerUpdateDueToVisibilityChange=NO;return this},updateLayer:function(){var a=this.renderContext(this.get("layer"));
this.prepareContext(a,NO);a.update();if(a._innerHTMLReplaced){var b=this.get("pane");
if(b&&b.get("isPaneAttached")){this._notifyDidAppendToDocument()}}if(this.useStaticLayout){this.viewDidResize()
}if(this.didUpdateLayer){this.didUpdateLayer()}if(this.designer&&this.designer.viewDidUpdateLayer){this.designer.viewDidUpdateLayer()
}return this},renderContext:function(a){return SC.RenderContext(a)},createLayer:function(){if(this.get("layer")){return this
}var a=this.renderContext(this.get("tagName"));this.prepareContext(a,YES);this.set("layer",a.element());
this._notifyDidCreateLayer();return this},_notifyDidCreateLayer:function(){if(this.didCreateLayer){this.didCreateLayer()
}var c=this.didCreateLayerMixin,b,a,e=this.get("childViews");if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=e.length;for(a=0;a<b;++a){if(!e[a]){continue}e[a]._notifyDidCreateLayer()
}},destroyLayer:function(){var a=this.get("layer");if(a){this._notifyWillDestroyLayer();
if(a.parentNode){a.parentNode.removeChild(a)}a=null}return this},replaceLayer:function(){this.destroyLayer();
this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded)
},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var c=this.willDestroyLayerMixin,b,a,e=this.get("childViews");if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=e.length;for(a=0;a<b;++a){e[a]._notifyWillDestroyLayer()
}this.set("layer",null)},prepareContext:function(c,b){var f,g,h,e,k,j,a;if(b){e=this.layerId?this.get("layerId"):SC.guidFor(this);
c.id(e).classNames(this.get("classNames"),YES);this.renderLayout(c,b)}else{c.resetClassNames();
c.classNames(this.get("classNames"),YES)}a=[];if(this.get("isTextSelectable")){a.push("allow-select")
}if(!this.get("isEnabled")){a.push("disabled")}if(!this.get("isVisible")){a.push("hidden")
}if(this.get("isFirstResponder")){a.push("focus")}if(this.get("useStaticLayout")){a.push("sc-static-layout")
}k=this.get("backgroundColor");if(k){c.addStyle("backgroundColor",k)}j=this.get("cursor");
if(!j&&this.get("shouldInheritCursor")){j=this.getPath("parentView.cursor")}if(SC.typeOf(j)===SC.T_STRING){j=SC.objectForPropertyPath(j)
}if(j instanceof SC.Cursor){a.push(j.get("className"))}c.addClass(a);this.beginPropertyChanges();
this.set("layerNeedsUpdate",NO);this.render(c,b);if(f=this.renderMixin){g=f.length;
for(h=0;h<g;++h){f[h].call(this,c,b)}}this.endPropertyChanges()},renderChildViews:function(f,g){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c){continue}f=f.begin(c.get("tagName"));c.prepareContext(f,g);
f=f.end()}return f},render:function(a,b){if(b){this.renderChildViews(a,b)}},_notifyDidAppendToDocument:function(){if(this.didAppendToDocument){this.didAppendToDocument()
}var c=0,e,a,b=this.get("childViews");for(c=0,a=b.length;c<a;c++){e=b[c];if(e._notifyDidAppendToDocument){e._notifyDidAppendToDocument()
}}},tagName:"div",classNames:["sc-view"],toolTip:null,isTextSelectable:NO,displayProperties:["isFirstResponder","isVisible"],cursor:null,shouldInheritCursor:YES,layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(a){if(this.get("layerLocationNeedsUpdate")){this.set("layerLocationNeedsUpdate",NO);
this.updateLayerLocation()}return this},updateLayerLocation:function(){var f=this.get("layer"),e=this.get("parentView"),b=e?e.get("containerLayer"):null;
if(f&&f.parentNode&&f.parentNode!==b){f.parentNode.removeChild(f)}if(!e){if(f&&f.parentNode){f.parentNode.removeChild(f)
}}else{if(!b){if(f){if(f.parentNode){f.parentNode.removeChild(f)}this.destroyLayer()
}}else{if(!f){this.createLayer();f=this.get("layer");if(!f){return}}var g=e.get("childViews"),c=g.objectAt(g.indexOf(this)+1),a=(c)?c.get("layer"):null;
if(c&&(!a||a.parentNode!==b)){c.updateLayerLocationIfNeeded();a=c.get("layer")}if((f.parentNode!==b)||(f.nextSibling!==a)){b.insertBefore(f,a)
}}}b=e=f=a=null;return this},nextResponder:function(){return this.get("parentView")
}.property("parentView").cacheable(),acceptsFirstResponder:NO,isKeyResponder:NO,willLoseKeyResponderTo:function(a){},willBecomeKeyResponderFrom:function(a){},didLoseKeyResponderTo:function(a){},didBecomeKeyResponderFrom:function(a){},interpretKeyEvents:function(b){var a=b.commandCodes(),e=a[0],f=a[1],h;
if(!e&&!f){return null}if(e){var j=SC.MODIFIED_KEY_BINDINGS[e]||SC.BASE_KEY_BINDINGS[e.match(/[^_]+$/)[0]];
if(j){var g=this,c=this.get("pane"),k=null;while(g&&!(k=g.tryToPerform(j,b))){g=(g===c)?null:g.get("nextResponder")
}return k}}if(f&&this.respondsTo("insertText")){h=this.insertText(f,b);return h?(h===YES?this:h):null
}return null},insertText:function(a){return NO},performKeyEquivalent:function(f,c){var e=NO,g=this.get("childViews"),b=g.length,a=-1;
while(!e&&(++a<b)){e=g[a].performKeyEquivalent(f,c)}return e},nextKeyView:null,nextValidKeyView:function(){var a=[],c=this.pane(),b=this.get("nextKeyView");
if(!b){b=c._computeNextValidKeyView(this,a)}if(SC.TABBING_ONLY_INSIDE_DOCUMENT&&!b){b=c._computeNextValidKeyView(c,a)
}return b}.property("nextKeyView"),_computeNextValidKeyView:function(h,b){var c=this.get("nextKeyView"),f,e,a,g;
if(this!==h&&b.indexOf(h)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}b.push(this);if(!c){f=this.get("childViews");for(e=0,a=f.length;e<a;e++){g=f[e];
if(g.get("isVisibleInWindow")&&g.get("isVisible")){c=g._computeNextValidKeyView(h,b)
}if(c){return c}}c=null}return c},previousKeyView:null,previousValidKeyView:function(){var a=[],c=this.pane(),b=this.get("previousKeyView");
if(!b){b=c._computePreviousValidKeyView(this,a)}return b}.property("previousKeyView"),_computePreviousValidKeyView:function(g,a){var b=this.get("previousKeyView"),e,c,f;
if(this!==g&&a.indexOf(g)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}a.push(this);if(!b){e=this.get("childViews");for(c=e.length-1;0<=c;c--){f=e[c];if(f.get("isVisibleInWindow")&&f.get("isVisible")){b=f._computePreviousValidKeyView(g,a)
}if(b){return b}}b=null}return b},init:function(){var f,h,c,b,a,e,j;arguments.callee.base.apply(this,arguments);
if(!this.get("isMaterialized")){SC.View.views[this.get("layerId")]=this}var g=this.get("childViews");
this.childViews=g?g.slice():[];this.createChildViews();j=this.get("displayProperties");
b=j.length;while(--b>=0){this.addObserver(j[b],this,this.displayDidChange)}if(this.get("isDropTarget")){SC.Drag.addDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.addScrollableView(this)}},awake:function(){arguments.callee.base.apply(this,arguments);
var c=this.get("childViews"),b=c.length,a;for(a=0;a<b;++a){if(!c[a]){continue}c[a].awake()
}},destroy:function(){if(this.get("isDestroyed")){return this}this._destroy();this.removeFromParent();
if(this.get("isDropTarget")){SC.Drag.removeDropTarget(this)}if(this.get("isScrollable")){SC.Drag.removeScrollableView(this)
}arguments.callee.base.apply(this,arguments);return this},_destroy:function(){if(this.get("isDestroyed")){return this
}this.destroyLayer();var c=this.get("childViews"),b=c.length,a;if(b){c=c.slice();
for(a=0;a<b;++a){c[a].destroy()}}delete SC.View.views[this.get("layerId")];delete this._CQ;
delete this.page;return this},createChildViews:function(){var g=this.get("childViews"),b=g.length,a,f,e,c;
this.beginPropertyChanges();for(a=0;a<b;++a){if(f=(c=g[a])){if(typeof f===SC.T_STRING){c=this[f]
}else{f=null}if(!c){console.error("No view with name "+f+" has been found in "+this.toString());
continue}if(c.isClass){c=this.createChildView(c);if(f){this[f]=c}}}g[a]=c}this.endPropertyChanges();
return this},createChildView:function(a,b){if(!b){b={}}b.owner=b.parentView=this;
b.isVisibleInWindow=this.get("isVisibleInWindow");if(!b.page){b.page=this.page}a=a.create(b);
return a},propertyDidChange:function(a,c,b){if(a==="layout"){this.layoutDidChange()
}arguments.callee.base.apply(this,arguments)},adjust:function(a,e){var b=SC.clone(this.get("layout")),c=NO,g;
if(a===undefined){return this}if(SC.typeOf(a)===SC.T_STRING){g=b[a];if(SC.none(e)){if(g!==undefined){c=YES
}delete b[a]}else{if(g!==e){c=YES}b[a]=e}}else{var f=a;for(a in f){if(!f.hasOwnProperty(a)){continue
}e=f[a];g=b[a];if(e===null){if(g!==undefined){c=YES}delete b[a]}else{if(e!==undefined){if(g!==e){c=YES
}b[a]=e}}}}if(c){this.set("layout",b)}return this},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(k,e){var c=0,b=0,h=0,g=0,a=this,j;
while(a){j=a.get("frame");c+=j.x;b+=j.y;a=a.get("layoutView")}if(e){a=e;while(a){j=a.get("frame");
h+=j.x;g+=j.y;a=a.get("layoutView")}}c=k.x+c-h;b=k.y+b-g;return{x:c,y:b,width:k.width,height:k.height}
},convertFrameFromView:function(k,e){var c=0,b=0,h=0,g=0,a=this,j;while(a&&(j=a.get("frame"))){c+=j.x;
b+=j.y;a=a.get("parentView")}if(e){a=e;while(a){j=a.get("frame");h+=j.x;g+=j.y;a=a.get("parentView")
}}c=k.x-c+h;b=k.y-b+g;return{x:c,y:b,width:k.width,height:k.height}},scrollToVisible:function(){var a=this.get("parentView");
while(a&&!a.get("isScrollable")){a=a.get("parentView")}if(a){a.scrollToVisible();
return a.scrollToVisible(this)}else{return NO}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("useStaticLayout").cacheable(),computeFrameWithParentFrame:function(j){var u=this.get("layout"),t={},q,x,p=SC.LAYOUT_AUTO,s=this.get("useStaticLayout"),o=this.get("parentView"),k,e,n,b,a=u.right,c=u.left,w=u.top,h=u.bottom,v=u.width,g=u.height,m=u.centerX,l=u.centerY;
if(v!==undefined&&v===SC.LAYOUT_AUTO&&s!==undefined&&!s){q=SC.Error.desc(("%@.layout() cannot use width:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
console.error(q.toString());throw q}if(g!==undefined&&g===SC.LAYOUT_AUTO&&s!==undefined&&!s){q=SC.Error.desc(("%@.layout() cannot use height:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
console.error(q.toString());throw q}if(s){if(x=this.get("layer")){t=SC.viewportOffset(x);
if(o){t=o.convertFrameFromView(t,null)}t.width=x.offsetWidth;t.height=x.offsetHeight;
return t}return null}if(!j){j=this.computeParentDimensions(u)}k=j.height;e=j.width;
if(!SC.none(c)){if(SC.isPercentage(c)){t.x=e*c}else{t.x=c}if(v!==undefined){if(v===p){t.width=p
}else{if(SC.isPercentage(v)){t.width=e*v}else{t.width=v}}}else{t.width=e-t.x;if(a&&SC.isPercentage(a)){t.width=t.width-(a*e)
}else{t.width=t.width-(a||0)}}}else{if(!SC.none(a)){if(SC.none(v)){if(SC.isPercentage(c)){t.width=e-(e*a)
}else{t.width=e-a}t.x=0}else{if(v===p){t.width=p}else{if(SC.isPercentage(v)){t.width=e*v
}else{t.width=(v||0)}}if(SC.isPercentage(v)){t.x=e-(a*e)-t.width}else{t.x=e-a-t.width
}}}else{if(!SC.none(m)){if(v===p){t.width=p}else{if(SC.isPercentage(v)){t.width=v*e
}else{t.width=(v||0)}}if(SC.isPercentage(m)){t.x=(e-t.width)/2+(m*e)}else{t.x=(e-t.width)/2+m
}}else{t.x=0;if(SC.none(v)){t.width=e}else{if(v===p){t.width=p}if(SC.isPercentage(v)){t.width=v*e
}else{t.width=(v||0)}}}}}if(!SC.none(w)){if(SC.isPercentage(w)){t.y=w*k}else{t.y=w
}if(g!==undefined){if(g===p){t.height=p}else{if(SC.isPercentage(g)){t.height=g*k}else{t.height=g
}}}else{if(h&&SC.isPercentage(h)){t.height=k-t.y-(h*k)}else{t.height=k-t.y-(h||0)
}}}else{if(!SC.none(h)){if(SC.none(g)){if(SC.isPercentage(h)){t.height=k-(h*k)}else{t.height=k-h
}t.y=0}else{if(g===p){t.height=p}if(g&&SC.isPercentage(g)){t.height=g*k}else{t.height=(g||0)
}if(SC.isPercentage(h)){t.y=k-(h*k)-t.height}else{t.y=k-h-t.height}}}else{if(!SC.none(l)){if(g===p){t.height=p
}if(g&&SC.isPercentage(g)){t.height=g*k}else{t.height=(g||0)}if(SC.isPercentage(l)){t.y=(k-t.height)/2+(l*k)
}else{t.y=(k-t.height)/2+l}}else{t.y=0;if(SC.none(g)){t.height=k}else{if(g===p){t.height=p
}if(SC.isPercentage(g)){t.height=g*k}else{t.height=g||0}}}}}t.x=Math.floor(t.x);t.y=Math.floor(t.y);
if(t.height!==p){t.height=Math.floor(t.height)}if(t.width!==p){t.width=Math.floor(t.width)
}if(t.height===p||t.width===p){x=this.get("layer");if(t.height===p){t.height=x?x.clientHeight:0
}if(t.width===p){t.width=x?x.clientWidth:0}}if(this.get("hasBorder")){n=this.get("borderTop");
b=this.get("borderLeft");t.height-=n+this.get("borderBottom");t.y+=n;t.width-=b+this.get("borderRight");
t.x+=b}if(o&&o.isScrollContainer){o=o.get("parentView");t.x-=o.get("horizontalScrollOffset");
t.y-=o.get("verticalScrollOffset")}if(!SC.none(u.maxHeight)&&(t.height>u.maxHeight)){t.height=u.maxHeight
}if(!SC.none(u.minHeight)&&(t.height<u.minHeight)){t.height=u.minHeight}if(!SC.none(u.maxWidth)&&(t.width>u.maxWidth)){t.width=u.maxWidth
}if(!SC.none(u.minWidth)&&(t.width<u.minWidth)){t.width=u.minWidth}if(t.height<0){t.height=0
}if(t.width<0){t.width=0}return t},computeParentDimensions:function(g){var b,c=this.get("parentView"),a=(c)?c.get("frame"):null;
if(a){b={width:a.width,height:a.height}}else{var e=g;b={width:(e.left||0)+(e.width||0)+(e.right||0),height:(e.top||0)+(e.height||0)+(e.bottom||0)}
}return b},clippingFrame:function(){var e=this.get("frame"),a=e,b,c;if(!e){return null
}b=this.get("parentView");if(b){c=b.get("contentClippingFrame");if(!c){return e}a=SC.intersectRects(c,e)
}a.x-=e.x;a.y-=e.y;return a}.property("parentView","frame").cacheable(),contentClippingFrame:function(){return this.get("clippingFrame")
}.property("clippingFrame").cacheable(),_sc_view_clippingFrameDidChange:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c.hasStaticLayout){c.notifyPropertyChange("clippingFrame");
c._sc_view_clippingFrameDidChange()}}},parentViewDidResize:function(){var b=this.get("layout"),a,e,c;
c=((b.left!==undefined)&&(b.top!==undefined)&&(b.width!==undefined)&&(b.height!==undefined));
a=SC.isPercentage;e=(a(b.left)||a(b.top)||a(b.width)||a(b.right)||a(b.centerX)||a(b.centerY));
if(!c||e){this.viewDidResize()}},viewDidResize:function(){this._viewFrameDidChange();
var e=this.childViews,b=e.length,a,c;for(a=0;a<b;++a){c=e[a];c.parentViewDidResize()
}},_viewFrameDidChange:function(){this.notifyPropertyChange("frame");this._sc_view_clippingFrameDidChange()
},beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var e=this.get("childViews"),b=e.length,a,c;for(a=0;a<b;++a){c=e[a];if(c.beginLiveResize){c.beginLiveResize()
}}return this},endLiveResize:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=b-1;a>=0;--a){c=e[a];if(c.endLiveResize){c.endLiveResize()}}if(this.didEndLiveResize){this.didEndLiveResize()
}return this},wantsAcceleratedLayer:NO,hasAcceleratedLayer:function(){return this.get("wantsAcceleratedLayer")&&SC.platform.supportsCSSTransforms
}.property("wantsAcceleratedLayer").cacheable(),layoutStyle:function(){var y=this.get("layout"),B={},l=null,u,q=SC.LAYOUT_AUTO,s=SC._VIEW_DEFAULT_DIMS,k=s.length,m,t,C,v=this.get("useStaticLayout"),a=y.right,f=y.left,A=y.top,h=y.bottom,z=y.width,g=y.height,c=y.maxWidth,j=y.maxHeight,p=y.centerX,o=y.centerY,e=this.get("hasAcceleratedLayer"),b=0,w=0;
if(z!==undefined&&z===SC.LAYOUT_AUTO&&!v){u=SC.Error.desc("%@.layout() you cannot use width:auto if "+"staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(u.toString());throw u}if(g!==undefined&&g===SC.LAYOUT_AUTO&&!v){u=SC.Error.desc("%@.layout() you cannot use height:auto if "+"staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(u.toString());throw u}if(!SC.none(f)){if(SC.isPercentage(f)){B.left=(f*100)+"%"
}else{if(e&&SC.empty(a)){w=Math.floor(f);B.left=0}else{B.left=Math.floor(f)}}B.marginLeft=0;
if(z!==undefined){if(z===SC.LAYOUT_AUTO){B.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(z)){B.width=(z*100)+"%"
}else{B.width=Math.floor(z)}}B.right=null}else{B.width=null;if(a&&SC.isPercentage(a)){B.right=(a*100)+"%"
}else{B.right=Math.floor(a||0)}}}else{if(!SC.none(a)){if(SC.isPercentage(a)){B.right=Math.floor(a*100)+"%"
}else{B.right=Math.floor(a)}B.marginLeft=0;if(SC.none(z)){if(SC.none(c)){B.left=0
}B.width=null}else{B.left=null;if(z===SC.LAYOUT_AUTO){B.width=SC.LAYOUT_AUTO}else{if(z&&SC.isPercentage(z)){B.width=(z*100)+"%"
}else{B.width=Math.floor(z||0)}}}}else{if(!SC.none(p)){B.left="50%";if(z&&SC.isPercentage(z)){B.width=(z*100)+"%"
}else{B.width=Math.floor(z||0)}if(z&&SC.isPercentage(z)&&(SC.isPercentage(p)||SC.isPercentage(p*-1))){B.marginLeft=Math.floor((p-z/2)*100)+"%"
}else{if(z&&z>=1&&!SC.isPercentage(p)){B.marginLeft=Math.floor(p-B.width/2)}else{console.warn("You have to set width and centerX usign both percentages or pixels");
B.marginLeft="50%"}}B.right=null}else{if(!SC.none(z)){B.left=0;B.right=null;if(z===SC.LAYOUT_AUTO){B.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(z)){B.width=(z*100)+"%"}else{B.width=Math.floor(z)}}B.marginLeft=0
}else{B.left=0;B.right=0;B.width=null;B.marginLeft=0}}}}B.minWidth=(y.minWidth===undefined)?null:y.minWidth;
B.maxWidth=(y.maxWidth===undefined)?null:y.maxWidth;if(!SC.none(A)){if(SC.isPercentage(A)){B.top=(A*100)+"%"
}else{if(e&&SC.empty(h)){b=Math.floor(A);B.top=0}else{B.top=Math.floor(A)}}if(g!==undefined){if(g===SC.LAYOUT_AUTO){B.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(g)){B.height=(g*100)+"%"}else{B.height=Math.floor(g)}}B.bottom=null
}else{B.height=null;if(h&&SC.isPercentage(h)){B.bottom=(h*100)+"%"}else{B.bottom=Math.floor(h||0)
}}B.marginTop=0}else{if(!SC.none(h)){B.marginTop=0;if(SC.isPercentage(h)){B.bottom=(h*100)+"%"
}else{B.bottom=Math.floor(h)}if(SC.none(g)){if(SC.none(j)){B.top=0}B.height=null}else{B.top=null;
if(g===SC.LAYOUT_AUTO){B.height=SC.LAYOUT_AUTO}else{if(g&&SC.isPercentage(g)){B.height=(g*100)+"%"
}else{B.height=Math.floor(g||0)}}}}else{if(!SC.none(o)){B.top="50%";B.bottom=null;
if(g&&SC.isPercentage(g)){B.height=(g*100)+"%"}else{B.height=Math.floor(g||0)}if(g&&SC.isPercentage(g)&&(SC.isPercentage(o)||SC.isPercentage(o*-1))){B.marginTop=Math.floor((o-g/2)*100)+"%"
}else{if(g&&g>=1&&!SC.isPercentage(o)){B.marginTop=Math.floor(o-B.height/2)}else{console.warn("You have to set height and centerY to use both percentages or pixels");
B.marginTop="50%"}}}else{if(!SC.none(g)){B.top=0;B.bottom=null;if(g===SC.LAYOUT_AUTO){B.height=SC.LAYOUT_AUTO
}else{if(g&&SC.isPercentage(g)){B.height=(g*100)+"%"}else{B.height=Math.floor(g||0)
}}B.marginTop=0}else{B.top=0;B.bottom=0;B.height=null;B.marginTop=0}}}}B.minHeight=(y.minHeight===undefined)?null:y.minHeight;
B.maxHeight=(y.maxHeight===undefined)?null:y.maxHeight;B.zIndex=SC.none(y.zIndex)?null:y.zIndex.toString();
B.backgroundPosition=SC.none(y.backgroundPosition)?null:y.backgroundPosition.toString();
while(--k>=0){m=s[k];if(B[m]===0){B[m]=null}}if(e){var n="translateX("+w+"px) translateY("+b+"px)";
if(SC.platform.supportsCSS3DTransforms){n+=" translateZ(0px)"}B[SC.platform.domCSSPrefix+"Transform"]=n
}for(C in B){t=B[C];if(typeof t===SC.T_NUMBER){B[C]=(t+"px")}}return B}.property().cacheable(),layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){var c=this._previousLayout,f=this.get("layout"),a=YES,j,g,e,h;
if(c&&c!==f){j=c.width;if(j!==undefined){e=f.width;if(j===e){g=c.height;if(c!==undefined){h=f.height;
if(g===h){a=NO}}}}}this.beginPropertyChanges();this.notifyPropertyChange("layoutStyle");
if(a){this.viewDidResize()}else{this._viewFrameDidChange()}this.endPropertyChanges();
var b=this.get("layoutView");if(b){b.set("childViewsNeedLayout",YES);b.layoutDidChangeFor(this);
if(b.get("childViewsNeedLayout")){b.invokeOnce(b.layoutChildViewsIfNeeded)}}return this
},childViewsNeedLayout:NO,layoutDidChangeFor:function(b){var a=this._needLayoutViews;
if(!a){a=this._needLayoutViews=SC.CoreSet.create()}a.add(b)},layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);this.layoutChildViews()
}return this},layoutChildViews:function(){var c=this._needLayoutViews,a=c?c.length:0,b;
for(b=0;b<a;++b){c[b].updateLayout()}c.clear()},updateLayout:function(){var b=this.get("layer"),a;
if(b){a=this.renderContext(b);this.renderLayout(a);a.update();if(this.useStaticLayout){this.viewDidResize()
}}b=null;return this},renderLayout:function(a,b){a.addStyle(this.get("layoutStyle"))
},isView:YES,selectStart:function(a){return this.get("isTextSelectable")},contextMenu:function(a){if(!this.get("isContextMenuEnabled")){a.stop()
}return true},touchBoundary:{left:50,right:50,top:50,bottom:50},_touchBoundaryFrame:function(){return this.get("parentView").convertFrameToView(this.get("frame"),null)
}.property("frame","parentView").cacheable(),touchIsInBoundary:function(j){var c=this.get("_touchBoundaryFrame"),e=0,b=0,h=this.get("touchBoundary");
var a=j.pageX,g=j.pageY;if(a<c.x){a=c.x-a;e=h.left}else{if(a>c.x+c.width){a=a-(c.x+c.width);
e=h.right}else{a=0;e=1}}if(g<c.y){g=c.y-g;b=h.top}else{if(g>c.y+c.height){g=g-(c.y+c.height);
b=h.bottom}else{g=0;b=1}}if(a>100||g>100){return NO}return YES}});SC.View.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a},layout:function(a){this.prototype.layout=a;return this},convertLayoutToAnchoredLayout:function(g,o){var j={top:0,left:0,width:o.width,height:o.height},e=o.width,m=o.height,n=g.right,a=g.left,l=g.top,h=g.bottom,k=g.width,f=g.height,c=g.centerX,b=g.centerY;
if(!SC.none(a)){if(SC.isPercentage(a)){j.left=a*e}else{j.left=a}if(k!==undefined){if(k===SC.LAYOUT_AUTO){j.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(k)){j.width=k*e}else{j.width=k}}}else{if(n&&SC.isPercentage(n)){j.width=e-j.left-(n*e)
}else{j.width=e-j.left-(n||0)}}}else{if(!SC.none(n)){if(SC.none(k)){j.left=0;if(n&&SC.isPercentage(n)){j.width=e-(n*e)
}else{j.width=e-(n||0)}}else{if(k===SC.LAYOUT_AUTO){j.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(k)){j.width=k*e
}else{j.width=k}if(SC.isPercentage(n)){j.left=e-(j.width+n)}else{j.left=e-(j.width+n)
}}}}else{if(!SC.none(c)){if(k&&SC.isPercentage(k)){j.width=(k*e)}else{j.width=(k||0)
}j.left=((e-j.width)/2);if(SC.isPercentage(c)){j.left=j.left+c*e}else{j.left=j.left+c
}}else{if(!SC.none(k)){j.left=0;if(k===SC.LAYOUT_AUTO){j.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(k)){j.width=k*e
}else{j.width=k}}}else{j.left=0;j.width=0}}}}if(g.minWidth!==undefined){j.minWidth=g.minWidth
}if(g.maxWidth!==undefined){j.maxWidth=g.maxWidth}if(!SC.none(l)){if(SC.isPercentage(l)){j.top=l*m
}else{j.top=l}if(f!==undefined){if(f===SC.LAYOUT_AUTO){j.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(f)){j.height=f*m
}else{j.height=f}}}else{j.height=m-j.top;if(h&&SC.isPercentage(h)){j.height=j.height-(h*m)
}else{j.height=j.height-(h||0)}}}else{if(!SC.none(h)){if(SC.none(f)){j.top=0;if(h&&SC.isPercentage(h)){j.height=m-(h*m)
}else{j.height=m-(h||0)}}else{if(f===SC.LAYOUT_AUTO){j.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(f)){j.height=f*m
}else{j.height=f}j.top=m-j.height;if(SC.isPercentage(h)){j.top=j.top-(h*m)}else{j.top=j.top-h
}}}}else{if(!SC.none(b)){if(f&&SC.isPercentage(f)){j.height=(f*m)}else{j.height=(f||0)
}j.top=((m-j.height)/2);if(SC.isPercentage(b)){j.top=j.top+b*m}else{j.top=j.top+b
}}else{if(!SC.none(f)){j.top=0;if(f===SC.LAYOUT_AUTO){j.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(f)){j.height=f*m
}else{j.height=f}}}else{j.top=0;j.height=0}}}}if(j.top){j.top=Math.floor(j.top)}if(j.bottom){j.bottom=Math.floor(j.bottom)
}if(j.left){j.left=Math.floor(j.left)}if(j.right){j.right=Math.floor(j.right)}if(j.width!==SC.LAYOUT_AUTO){j.width=Math.floor(j.width)
}if(j.height!==SC.LAYOUT_AUTO){j.height=Math.floor(j.height)}if(g.minHeight!==undefined){j.minHeight=g.minHeight
}if(g.maxHeight!==undefined){j.maxHeight=g.maxHeight}return j},convertLayoutToCustomLayout:function(b,a,c){},classNames:function(a){a=(this.prototype.classNames||[]).concat(a);
this.prototype.classNames=a;return this},tagName:function(a){this.prototype.tagName=a;
return this},childView:function(a){var b=this.prototype.childViews||[];if(b===this.superclass.prototype.childViews){b=b.slice()
}b.push(a);this.prototype.childViews=b;return this},bind:function(b,e){var c=this.prototype,a=this.superclass.prototype;
var f=c._bindings;if(!f||f===a._bindings){f=c._bindings=(f||[]).slice()}b=b+"Binding";
c[b]=e;f.push(b);return this},prop:function(a,b){this.prototype[a]=b;return this},localization:function(b,a){if(a){b.rootElement=SC.$(a)[0]
}return b},viewFor:function(e,c){var b=SC.$A(arguments);if(SC.none(e)){b.shift()}else{b[0]={rootElement:SC.$(e)[0]}
}var a=this.create.apply(this,arguments);b=b[0]=null;return a},create:function(){var b=this,a=new b(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(a,SC.$A(arguments))}return a},loc:function(f){var b=f.childViews;
delete f.childViews;this.applyLocalizedAttributes(f);if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))
}var e=this.prototype.childViews,a=e.length,c;while(--a>=0){c=e[a];f=b[a];if(f&&c&&c.loc){c.loc(f)
}}return this},applyLocalizedAttributes:function(a){SC.mixin(this.prototype,a)},views:{}});
SC.outlet=function(b,a){return function(c){return(this[c]=SC.objectForPropertyPath(b,(a!==undefined)?a:this))
}.property()};SC.View.unload=function(){var a=SC.View.views;if(a){for(var b in a){if(!a.hasOwnProperty(b)){continue
}delete a[b]}}};if(SC.browser.msie){SC.Event.add(window,"unload",SC.View,SC.View.unload)
}SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(c){var a=SC.VALIDATE_OK;
if(this._validator){var b=this.get("ownerForm");if(c){a=this._validator.validatePartial(b,this);
if((a==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(b,this)==SC.VALIDATE_OK)){a=SC.VALIDATE_OK
}}else{a=this._validator.validateChange(b,this)}}return a},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(a){var b=a.getCharString();if(!b){return YES}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,b):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(b,a){return this._validator?this._validator.objectForFieldValue(b,this.get("ownerForm"),this):b
},fieldValueForObject:function(a){return this._validator?this._validator.fieldValueForObject(a,this.get("ownerForm"),this):a
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),renderMixin:function(a){a.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var a=this.get("ownerForm");var b=SC.Validator.findFor(a,this,this.get("validator"));
if(b!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(a,this)
}this._validator=b;if(this._validator){this._validator.attachTo(a,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};sc_require("views/view");sc_require("mixins/control");
sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,_field_isMouseDown:NO,fieldValue:function(){var a=this.get("value");
if(SC.typeOf(a)===SC.T_ERROR){a=a.get("errorValue")}return this.fieldValueForObject(a)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(b){if(SC.none(b)){b=""
}var a=this.$input();if(a.val()!==b){a.val(b)}return this},getFieldValue:function(){return this.$input().val()
},_field_fieldValueDidChange:function(a){SC.RunLoop.begin();this.fieldValueDidChange(NO);
SC.RunLoop.end()},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
this.setIfChanged("value",b)},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))
}.observes("fieldValue"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},didAppendToDocument:function(){if(this.get("isTextArea")){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)}},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},mouseDown:function(a){this._field_isMouseDown=YES;a.allowDefault();return YES},mouseOut:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}a.allowDefault();return YES},mouseOver:function(a){this.set("isActive",this._field_isMouseDown);
a.allowDefault();return YES},mouseUp:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;a.allowDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},_field_setFieldValue:function(b){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){b=this.fieldValueForObject(b)}var a=this.setFieldValue(b);
this.propertyDidChange("fieldValue");return a},_field_getFieldValue:function(){var a=this.getFieldValue();
if(this.objectForFieldValue){a=this.objectForFieldValue(a)}return a}});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var b=this.get("start");
var a=this.get("end");if((b)===-1||(a===-1)){return -1}else{return a-b}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var a=this.get("length");if(a&&a>0){if(a===1){return"[%@ character selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.StaticLayout={hasStaticLayout:YES};
sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],applyImmediately:YES,isPassword:NO,isTextArea:NO,hint:"",isEditing:NO,hintON:YES,defaultTabbingEnabled:YES,isContextMenuEnabled:YES,leftAccessoryView:null,rightAccessoryView:null,spellCheckEnabled:YES,maxLength:5096,_isFocused:NO,init:function(){var a=this.get("hintON"),b=this.get("value");
if(!b||b&&b.length===0){this.set("hintON",YES)}else{this.set("hintON",NO)}return arguments.callee.base.apply(this,arguments)
},isEditable:function(){return this.get("isEnabled")}.property("isEnabled").cacheable(),selection:function(l,j){var e=this.$input()[0],f,a,c;
if(j===undefined){if(e){a=null;c=null;if(!e.value){a=c=0}else{if("selectionStart" in e){a=e.selectionStart
}if("selectionEnd" in e){c=e.selectionEnd}if(a===null||c===null){var k=document.selection;
if(k){var h=k.type;if(h&&(h==="None"||h==="Text")){f=k.createRange();if(!this.get("isTextArea")){var b=f.text.length;
a=Math.abs(f.moveStart("character",0-(e.value.length+1)));c=a+b}else{var g=f.duplicate();
g.moveToElementText(e);g.setEndPoint("EndToStart",f);a=g.text.length;c=a+f.text.length
}}}}}return SC.TextSelection.create({start:a,end:c})}else{return null}}else{if(!j||!j.kindOf||!j.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(e){if(e.setSelectionRange){e.setSelectionRange(j.get("start"),j.get("end"))}else{f=e.createTextRange();
a=j.get("start");f.move("character",a);f.moveEnd("character",j.get("end")-a);f.select()
}}return j}}.property("fieldValue").cacheable(),displayProperties:"hint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){arguments.callee.base.apply(this,arguments);
this.accessoryViewObserver()},acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),accessoryViewObserver:function(){var g,j=["leftAccessoryView","rightAccessoryView"],a=j.length,b,f,e,h;
for(b=0;b<a;b++){f=j[b];e=this["_"+f];h=this.get(f);if(!(e&&h&&(e===h))){if(e){g=e.get("classNames");
g=g.without("sc-text-field-accessory-view");e.set("classNames",g);this.removeChild(e);
e=null;this["_"+f]=null}if(h){if(h.isClass){h=h.create({layoutView:this})}g=h.get("classNames");
var c="sc-text-field-accessory-view";if(g.indexOf(c)<0){g=SC.clone(g);g.push(c);h.set("classNames",g)
}this.appendChild(h);this["_"+f]=h}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){var b=this.get("rightAccessoryView");if(b&&b.get){var c=b.get("layout");
if(c){c.left=null;if(!c.right){c.right=0}b.adjust({layout:c})}}}arguments.callee.base.apply(this,arguments)
},render:function(f,g){arguments.callee.base.apply(this,arguments);var a,e,c,b;a=this.get("fieldValue");
if(SC.none(a)){a=""}a=String(a);f.setClass("not-empty",a.length>0);e=this._getAccessoryViewWidths();
c=e.left;b=e.right;if(c){c+="px"}if(b){b+="px"}this._renderField(f,g,a,c,b);if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),_renderField:function(b,j,o,g,l){var m=this.get("hint"),e,u,p,c,q,a,k,f,n=this.get("spellCheckEnabled"),t,h=this.get("maxLength");
b.setClass("text-area",this.get("isTextArea"));t=n?' spellcheck="true"':' spellcheck="false"';
if(j||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;e=this.get("isEnabled")?"":'disabled="disabled"';
u=this.get("layerId");b.push('<span class="border"></span>');p="";if(g||l){p='style="';
if(g){p+="left: "+g+"; "}if(l){p+="right: "+l+";"}p+='"'}b.push('<span class="padding" '+p+">");
o=this.get("escapeHTML")?SC.RenderContext.escapeHTML(o):o;if(!this.get("_supportsPlaceHolder")&&(!o||(o&&o.length===0))){o=this.get("hint");
b.setClass("sc-hint",YES)}f=(SC.browser.mozilla&&(parseFloat(SC.browser.mozilla)<1.9||SC.browser.mozilla.match(/1\.9\.0|1\.9\.1/)))?"field oldGecko":"field";
if(this.get("isTextArea")){b.push('<textarea class="',f,'" name="',u,'" ',e,' placeholder="',m,'"',t,' maxlength="',h,'">',o,"</textarea></span>")
}else{c=this.get("isPassword")?"password":"text";b.push('<input class="',f,'" type="',c,'" name="',u,'" ',e,' value="',o,'" placeholder="',m,'"',t,' maxlength="',h,'" /></span>')
}}else{if(!this.get("_supportsPlaceHolder")){var s=this.get("value");if((!s||(s&&s.length===0))){if(this.get("hintON")&&!this.get("isFirstResponder")){b.setClass("sc-hint",YES);
this.$input().val(m)}else{b.setClass("sc-hint",NO);this.$input().val("")}}}a=this.$input()[0];
if(a){if(!this.get("isEnabled")){a.disabled="true"}else{a.disabled=null}k=a.parentNode.style;
if(g){if(k.left!==g){k.left=g}}else{k.left=null}if(l){if(k.right!==l){k.right=l}}else{k.right=null
}}}},_getAccessoryViewWidths:function(){var c={},l=["left","right"],e=l.length,g,h,m,k,a,j,f,b;
for(g=0;g<e;g++){h=l[g];m=this.get(h+"AccessoryView");if(m){if(m.isClass){m=m.create({layoutView:this})
}if(m.get){b=m.get("frame");if(b){a=b.width;if(a){j=m.get("layout");if(j){f=j[h];
a+=f}c[h]=a}}}}}return c},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);
if(!this.get("_supportsPlaceHolder")&&this.get("hintON")){var b=this.$input().val();
if(!b||(b&&b.length===0)){this.$input().val(this.get("hint"))}}if(this.get("isTextArea")){this.invokeLast(this._addTextAreaEvents)
}else{this._addTextAreaEvents();if(SC.browser.mozilla){var a=this.$input();SC.Event.add(a,"keypress",this,this._firefox_dispatch_keypress)
}}},_addTextAreaEvents:function(){var a=this.$input();SC.Event.add(a,"focus",this,this._textField_fieldDidFocus);
SC.Event.add(a,"blur",this,this._textField_fieldDidBlur);SC.Event.add(a,"select",this,this._textField_selectionDidChange);
if(SC.browser.mozilla){this._cacheInputElement=this.$input();this._cachePaddingElement=this.$(".padding")
}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);var a=this.$input();
SC.Event.remove(a,"focus",this,this._textField_fieldDidFocus);SC.Event.remove(a,"blur",this,this._textField_fieldDidBlur);
SC.Event.remove(a,"select",this,this._textField_selectionDidChange);SC.Event.remove(a,"focus",this,this._firefox_dispatch_keypress)
},_textField_fieldDidFocus:function(a){SC.RunLoop.begin();this.set("focused",YES);
this.fieldDidFocus(a);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",NO)
}SC.RunLoop.end()},_textField_fieldDidBlur:function(a){SC.RunLoop.begin();this.set("focused",NO);
this.fieldDidBlur(this._origEvent);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",YES)
}SC.RunLoop.end()},fieldDidFocus:function(a){this.beginEditing(a);if(this.getPath("pane.usingTouchIntercept")){this.get("pane").hideTouchIntercept()
}},fieldDidBlur:function(a){this.commitEditing(a);if(this.getPath("pane.usingTouchIntercept")){this.get("pane").showTouchIntercept()
}},_field_fieldValueDidChange:function(a){if(this.get("focused")){SC.RunLoop.begin();
this.fieldValueDidChange(NO);SC.RunLoop.end()}},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(parseFloat(SC.browser.mozilla)<1.9&&!this.get("useStaticLayout")){var j,e,c,k,b,h,f,g;
f=this._cacheInputElement;g=this._cachePaddingElement;if(g&&g[0]){h=g[0];b=SC.$(h).offset();
if(SC.browser.compareVersion(1,9,2)<0&&f[0].tagName.toLowerCase()==="input"){j=b.top+this._topOffsetForFirefoxCursorFix
}else{j=b.top}e=b.left;c=h.offsetWidth;k=h.offsetHeight;var a="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(j,e,c,k);
if(!this._prevStyle||this._prevStyle!=a){f.attr("style",a)}this._prevStyle=a}}return this
},_firefox_dispatch_keypress:function(a){var e=this.get("selection"),f=this.get("value"),c=f?f.length:0,b;
if(!e||((e.get("length")===0&&(e.get("start")===0)||e.get("end")===c))){b=SC.RootResponder.responder;
b.keypress.call(b,a);a.stopPropagation()}},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(a){if(this.get("isVisibleInWindow")){var b=this.$input()[0];
try{if(b){b.focus()}}catch(c){}if(!this._txtFieldMouseDown){this.invokeLast(this._selectRootElement)
}}},willLoseKeyResponderTo:function(a){},_selectRootElement:function(){var a=this.$input()[0];
if(a){a.select()}else{this._textField_selectionDidChange()}},didLoseKeyResponderTo:function(a){var b=this.$input()[0];
if(b){b.blur()}},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(b){var c=b.which;if((c===13&&!b.isIMEInput)&&!this.get("isTextArea")){return NO
}if(c===27){return NO}if(c===9&&this.get("defaultTabbingEnabled")){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}if(this.get("applyImmediately")){this.invokeLater(this.fieldValueDidChange,1)
}return YES},keyUp:function(a){if(SC.browser.mozilla&&a.keyCode===13){this.fieldValueDidChange()
}this.notifyPropertyChange("selection");this._isKeyDown=NO;a.allowDefault();return YES
},mouseDown:function(a){var b=this.get("fieldValue");this._txtFieldMouseDown=YES;
if(!this.get("isEnabled")){a.stop();return YES}else{return arguments.callee.base.apply(this,arguments)
}},mouseUp:function(a){this._txtFieldMouseDown=NO;this.notifyPropertyChange("selection");
if(!this.get("isEnabled")){a.stop();return YES}return arguments.callee.base.apply(this,arguments)
},mouseWheel:function(a){a.allowDefault();return YES},selectStart:function(a){return YES
},_supportsPlaceHolder:function(){return SC.browser.safari&&!this.get("isTextArea")
}.property("isTextArea").cacheable(),valueObserver:function(){var a=this.get("value");
if(a&&a.length>0){this.set("hintON",NO)}else{this.set("hintON",YES)}}.observes("value")});
sc_require("views/text_field");SC.InlineTextFieldView=SC.TextFieldView.extend(SC.DelegateSupport,{_topOffsetForFirefoxCursorFix:0,beginEditing:function(b){if(!b){throw"InlineTextField.beginEditing() requires options"
}if(this.get("isEditing")){return NO}var e={},g,c,f,a;a=this._delegate=b.delegate;
this.set("delegate",this._delegate);if(!this.invokeDelegateMethod(a,"inlineEditorShouldBeginEditing",this)){SC.Logger.warn("InlineTextField.beginEditing() cannot begin without inlineEditorShouldBeginEditing() on the delegate.");
return NO}this.beginPropertyChanges();this.set("isEditing",YES);this.set("escapeHTML",b.escapeHTML);
this._optframe=b.frame;this._optIsCollection=b.isCollection;this._exampleElement=b.exampleElement;
if(!this._optframe||!this._delegate){throw"At least frame and delegate options are required for inline editor"
}this._originalValue=b.value||"";this._multiline=(b.multiline!==undefined)?b.multiline:NO;
if(this._multiline){this.set("isTextArea",YES)}else{this.set("isTextArea",NO)}this._commitOnBlur=(b.commitOnBlur!==undefined)?b.commitOnBlur:YES;
this.set("validator",b.validator);this.set("value",this._originalValue);g=this._delegate.pane();
e.height=this._optframe.height;e.width=this._optframe.width;c=this._delegate.get("layout");
f=g.$()[0];if(this._optIsCollection&&c.left){e.left=this._optframe.x-c.left-f.offsetLeft-1;
if(SC.browser.msie==7){e.left--}}else{e.left=this._optframe.x-f.offsetLeft-1;if(SC.browser.msie==7){e.left--
}}if(this._optIsCollection&&c.top){e.top=this._optframe.y-c.top-f.offsetTop;if(SC.browser.msie==7){e.top=e.top-2
}}else{e.top=this._optframe.y-f.offsetTop;if(SC.browser.msie==7){e.top=e.top-2}}this.set("layout",e);
this.set("parentNode",g);g.appendChild(this);a=this._delegate;this._className=this.getDelegateProperty(a,"inlineEditorClassName");
if(this._className&&!this.hasClassName(this._className)){this.setClassName(this._className,true)
}this.invokeDelegateMethod(a,"inlineEditorWillBeginEditing",this);this._previousFirstResponder=g?g.get("firstResponder"):null;
this.becomeFirstResponder();this.endPropertyChanges();this.invokeLast(function(){this.invokeDelegateMethod(a,"inlineEditorDidBeginEditing",this)
})},commitEditing:function(a){if(!SC.$ok(this.validateSubmit())){return NO}return this._endEditing(this.get("value"),a)
},discardEditing:function(){return this._endEditing(this._originalValue,null,YES)
},blurEditor:function(a){if(!this.get("isEditing")){return YES}return this._commitOnBlur?this.commitEditing(a):this.discardEditing(a)
},_endEditing:function(e,b,c){if(!this.get("isEditing")){return YES}var a=this._delegate;
if(!this.invokeDelegateMethod(a,"inlineEditorShouldEndEditing",this,e,b,c)){SC.Logger.warn("InlineTextField._endEditing() cannot end without inlineEditorShouldEndEditing() on the delegate.");
return NO}this.invokeDelegateMethod(a,"inlineEditorDidEndEditing",this,e,b,c);if(this._className){this.setClassName(this._className,false)
}this._originalValue=this._delegate=this._exampleElement=this._optframe=this._className=null;
this.set("isEditing",NO);if(this.get("isFirstResponder")){var f=this.get("pane");
if(f&&this._previousFirstResponder){f.makeFirstResponder(this._previousFirstResponder)
}else{this.resignFirstResponder()}}this._previousFirstResponder=null;if(this.get("parentNode")){this.removeFromParent()
}return YES},isEditing:NO,mouseDown:function(a){arguments.callee.base.call(this,a);
return this.get("isEditing")},touchStart:function(a){this.mouseDown(a)},keyDown:function(a){var b=this.interpretKeyEvents(a);
this.fieldValueDidChange(true);return !b?NO:b},insertText:null,_scitf_blurInput:function(){var a=this.$input()[0];
if(a){a.blur()}a=null},willRemoveFromParent:function(){return this._scitf_blurInput()
},willLoseFirstResponder:function(b,a){if(b!==this){return}this._previousFirstResponder=null;
this._origEvent=a;this._scitf_blurInput();return this.blurEditor(a)},cancel:function(){this.discardEditing();
return YES},fieldValueDidChange:function(a){arguments.callee.base.call(this,a)},insertNewline:function(a){if(this._multiline){a.allowDefault();
return arguments.callee.base.call(this,a)}else{if(this.get("value")!=this.$input().val()){this.set("value",this.$input().val())
}this.commitEditing();return YES}},insertTab:function(a){this.resignFirstResponder();
this.commitEditing();if(this._delegate){var b=this._delegate.nextValidKeyView();if(b&&b.beginEditing){b.beginEditing()
}}return YES},insertBacktab:function(a){this.commitEditing();if(this._delegate){var b=this._delegate.previousValidKeyView();
if(b){b.beginEditing()}}return YES},deleteForward:function(a){a.allowDefault();return YES
},deleteBackward:function(a){a.allowDefault();return YES}});SC.InlineTextFieldView.mixin({beginEditing:function(b){this._exampleElement=b.exampleElement;
var a=b.exampleInlineTextFieldView?b.exampleInlineTextFieldView:this,g=b.delegate.get("layout"),f=this.updateViewStyle(),h=this.updateViewPaddingStyle();
var j=".inline-editor input{"+f+"} ";j=j+".inline-editor textarea{"+f+"} .inline-editor .padding{"+h+"}";
var e=document.getElementsByTagName("head")[0],c=document.createElement("style");
c.type="text/css";c.media="screen";if(c.styleSheet){c.styleSheet.cssText=j}else{c.appendChild(document.createTextNode(j))
}e.appendChild(c);this.editor=a.create({classNames:"inline-editor",layout:g});return this.editor.beginEditing(b)
},commitEditing:function(){return this.editor?this.editor.commitEditing():YES},discardEditing:function(){return this.editor?this.editor.discardEditing():YES
},updateViewStyle:function(){var b=this._exampleElement[0],c="",a=SC.getStyle(b,"font-size");
if(a&&a.length>0){c=c+"font-size: "+a+" !important; "}a=SC.getStyle(b,"font-family");
if(a&&a.length>0){c=c+"font-family: "+a+" !important; "}a=SC.getStyle(b,"font-weight");
if(a&&a.length>0){c=c+"font-weight: "+a+" !important; "}a=SC.getStyle(b,"z-index");
if(a&&a.length>0){c=c+"z-index: "+a+" !important; "}a=SC.getStyle(b,"line-height");
if(a&&a.length>0){c=c+"line-height: "+a+" !important; "}a=SC.getStyle(b,"text-align");
if(a&&a.length>0){c=c+"text-align: "+a+" !important; "}a=SC.getStyle(b,"top-margin");
if(a&&a.length>0){c=c+"top-margin: "+a+" !important; "}a=SC.getStyle(b,"bottom-margin");
if(a&&a.length>0){c=c+"bottom-margin: "+a+" !important; "}a=SC.getStyle(b,"left-margin");
if(a&&a.length>0){c=c+"left-margin: "+a+" !important; "}a=SC.getStyle(b,"right-margin");
if(a&&a.length>0){c=c+"right-margin: "+a+" !important; "}return c},updateViewPaddingStyle:function(){var b=this._exampleElement[0];
var c="";var a=SC.getStyle(b,"padding-top");if(a&&a.length>0){c=c+"top: "+a+" !important; "
}a=SC.getStyle(b,"padding-bottom");if(a&&a.length>0){c=c+"bottom: "+a+" !important; "
}a=SC.getStyle(b,"padding-left");if(a&&a.length>0){c=c+"left: "+a+" !important; "
}a=SC.getStyle(b,"padding-right");if(a&&a.length>0){c=c+"right: "+a+" !important; "
}return c},editor:null});sc_require("system/responder");SC.ResponderContext={isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(a){var b=a.get("nextResponder");
if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b,this)}else{if(!b&&(a!==this)){b=this
}}return b},responderNameFor:function(a){if(!a){return"(No Responder)"}else{if(a._scrc_name){return a._scrc_name
}}var b=this.NAMESPACE;this._findResponderNamesFor(this,3,b?[this.NAMESPACE]:[]);
return a._scrc_name||a.toString()},_findResponderNamesFor:function(a,f,e){var b,c;
for(b in a){if(b==="nextResponder"){continue}c=a[b];if(c&&c.isResponder){if(c._scrc_name){continue
}e.push(b);c._scrc_name=e.join(".");if(f>0){this._findResponderNamesFor(c,f-1,e)}e.pop()
}}},makeFirstResponder:function(b,a){var g=this.get("firstResponder"),e=this.get("nextResponder"),f=this.get("trace"),c;
if(this._locked){if(f){console.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(b)))
}this._pendingResponder=b;return}if(f){console.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(b)))
}if(b){b.set("becomingFirstResponder",YES)}this._locked=YES;this._pendingResponder=null;
c=b?b:null;while(c){if(c.get("hasFirstResponder")){break}c=(c===e)?null:this.nextResponderFor(c)
}if(!c){c=e}this._notifyWillLoseFirstResponder(g,g,c,a);if(g){g.set("isFirstResponder",NO)
}this.beginPropertyChanges();this.set("firstResponder",b);if(b){b.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(b,b,c);this.endPropertyChanges();this._locked=NO;
if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);this._pendingResponder=null
}if(b){b.set("becomingFirstResponder",NO)}return this},_notifyWillLoseFirstResponder:function(c,f,b,a){if(f===b){return
}f.willLoseFirstResponder(c,a);f.set("hasFirstResponder",NO);var e=this.nextResponderFor(f);
if(e){this._notifyWillLoseFirstResponder(c,e,b)}},_notifyDidBecomeFirstResponder:function(b,e,a){if(e===a){return
}var c=this.nextResponderFor(e);if(c){this._notifyDidBecomeFirstResponder(b,c,a)}e.set("hasFirstResponder",YES);
e.didBecomeFirstResponder(b)},resetFirstResponder:function(){var a=this.get("firstResponder");
if(!a){return}a.willLoseFirstResponder();a.didBecomeFirstResponder()},sendAction:function(h,e,c){var a=this.get("firstResponder"),f=this.get("nextResponder"),g=this.get("trace"),j=NO,b;
this._locked=YES;if(g){console.log("%@: begin action '%@' (%@, %@)".fmt(this,h,e,c))
}if(!j&&!a&&this.tryToPerform){j=this.tryToPerform(h,e,c)}while(!j&&a){if(a.tryToPerform){j=a.tryToPerform(h,e,c)
}if(!j){a=(a===f)?null:this.nextResponderFor(a)}}if(g){if(!j){console.log("%@:  action '%@' NOT HANDLED".fmt(this,h))
}else{console.log("%@: action '%@' handled by %@".fmt(this,h,this.responderNameFor(a)))
}}this._locked=NO;if(b=this._pendingResponder){this._pendingResponder=null;this.makeFirstResponder(b)
}return a}};sc_require("views/view");sc_require("mixins/responder_context");SC.Pane=SC.View.extend(SC.ResponderContext,{isPane:YES,page:null,rootResponder:null,currentWindowSize:null,computeParentDimensions:function(c){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var b=this.get("currentWindowSize");var e={x:0,y:0,width:1000,height:1000};if(b){e.width=b.width;
e.height=b.height}else{if(SC.RootResponder.responder){var a=SC.RootResponder.responder.get("currentWindowSize");
if(a){e.width=a.width;e.height=a.height}}else{if(window.innerHeight){e.width=window.innerWidth;
e.height=window.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){e.width=document.documentElement.clientWidth;
e.height=document.documentElement.clientHeight}else{if(document.body){e.width=document.body.clientWidth;
e.height=document.body.clientHeight}}}this.windowSizeDidChange(null,e)}}return e},frame:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this.computeFrameWithParentFrame(null)}.property(),windowSizeDidChange:function(b,a){this.set("currentWindowSize",a);
this.parentViewDidResize();return this},paneLayoutDidChange:function(){this.invokeOnce(this.updateLayout)
}.observes("layout"),sendEvent:function(c,a,e){var b;if(!e){e=this.get("firstResponder")
}while(e&&!e.tryToPerform(c,a)){e=(e===this)?null:e.get("nextResponder")}if(!e&&(e=this.get("defaultResponder"))){if(typeof e===SC.T_STRING){e=SC.objectForPropertyPath(e)
}if(!e){e=null}e=e.tryToPerform(c,a)?e:null}return a.mouseHandler||e},performKeyEquivalent:function(c,a){var b=arguments.callee.base.apply(this,arguments);
if(!b){var e=this.get("defaultResponder");if(e){if(e.performKeyEquivalent){b=e.performKeyEquivalent(c,a)
}if(!b&&e.tryToPerform){b=e.tryToPerform(c,a)}}}return b},nextResponder:function(){return null
}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(b,a){var e=this.get("firstResponder"),c=this.get("isKeyPane");
if(e===b){return this}if(SC.platform.touch&&b&&b.kindOf(SC.TextFieldView)&&!b.get("focused")){return this
}if(e){e.willLoseFirstResponder(e,a)}if(c){if(e){e.willLoseKeyResponderTo(b)}if(b){b.willBecomeKeyResponderFrom(e)
}}if(e){e.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",b);if(b){b.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",c).endPropertyChanges()
}if(c){if(b){b.didBecomeKeyResponderFrom(e)}if(e){e.didLoseKeyResponderTo(b)}}if(b){b.didBecomeFirstResponder(b)
}return this},_forwardKeyChange:function(e,b,h,g){var c,a,f;if(e&&(a=this.get("firstResponder"))){f=(h)?h.get("firstResponder"):null;
c=this.get("firstResponder");if(c){c[b](f)}if((g!==undefined)&&a){a.set("isKeyResponder",g)
}}},willLoseKeyPaneTo:function(a){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",a,NO);
return this},willBecomeKeyPaneFrom:function(a){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",a,YES);
return this},didLoseKeyPaneTo:function(b){var a=this.get("isKeyPane");this.set("isKeyPane",NO);
this._forwardKeyChange(a,"didLoseKeyResponderTo",b);return this},didBecomeKeyPaneFrom:function(b){var a=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!a,"didBecomeKeyResponderFrom",b,YES);
return this},isMainPane:NO,focusFrom:function(a){},blurTo:function(a){},blurMainTo:function(a){this.set("isMainPane",NO)
},focusMainFrom:function(a){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}this.set("isVisibleInWindow",NO);var b=this.get("layer");if(b&&b.parentNode){b.parentNode.removeChild(b)
}b=null;this._removeIntercept();this.resignKeyPane();var a=this.rootResponder;if(this.get("isMainPane")){a.makeMainPane(null)
}a.panes.remove(this);this.rootResponder=null;this.set("isPaneAttached",NO);return this
},appendTo:function(b){var a=this.get("layer");if(!a){a=this.createLayer().get("layer")
}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,null);
b=a=null;return this.paneDidAttach()},prependTo:function(b){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,b.firstChild);b=a=null;return this.paneDidAttach()},before:function(c){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;
if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,c);
b=c=a=null;return this.paneDidAttach()},after:function(c){var a=this.get("layer");
if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,c.nextSibling);b=c=a=null;return this.paneDidAttach()},removeFromParent:function(){},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();this._notifyDidAppendToDocument();this._addIntercept();
return this},isPaneAttached:NO,hasTouchIntercept:NO,zIndex:0,touchZ:99,_addIntercept:function(){if(this.get("hasTouchIntercept")&&SC.platform.touch){this.set("usingTouchIntercept",YES);
var a=document.createElement("div");a.style.position="absolute";a.style.left="0px";
a.style.top="0px";a.style.right="0px";a.style.bottom="0px";a.style.webkitTransform="translateZ(0px)";
a.style.zIndex=this.get("zIndex")+this.get("touchZ");a.className="touch-intercept";
a.id="touch-intercept-"+SC.guidFor(this);this._touchIntercept=a;document.body.appendChild(a)
}},_removeIntercept:function(){if(this._touchIntercept){document.body.removeChild(this._touchIntercept);
this._touchIntercept=null}},hideTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="none"
}},showTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="block"
}},recomputeIsVisibleInWindow:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var c=this.get("isVisibleInWindow"),f=this.get("isVisible");if(c!==f){this.set("isVisibleInWindow",f);
var e=this.get("childViews"),b=e.length,a;for(a=0;a<b;a++){e[a].recomputeIsVisibleInWindow(f)
}if(f){this.displayDidChange();if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{this._forceLayerUpdateDueToVisibilityChange=YES;this.displayDidChange();if(this.get("isFirstResponder")){this.resignFirstResponder()
}}}return this},updateLayerLocation:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this},init:function(){var a=!!this.get("layer");arguments.callee.base.apply(this,arguments);
if(a){this.paneDidAttach()}},classNames:"sc-pane".w()});sc_require("mixins/responder_context");
SC.Application=SC.Responder.extend(SC.ResponderContext,{});sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,stats:{},globalStartTime:null,start:function(b,a,f,e){if(!this.enabled){return
}var g=(f||Date.now()),c;if(a){c=this._subStatFor(b,a)}else{c=this._statFor(b)}if(e&&c._starts.length>0){c._starts.push("ignore")
}else{c._starts.push(g)}c._times.push({start:g,_subStats:{}});return b},end:function(c,b,g){var f;
if(!this.enabled){return}if(b){f=this._subStatFor(c,b)}else{f=this._statFor(c)}var h=f._starts.pop();
if(!h){console.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(c));
return}if(h=="ignore"){return}var a=(g||Date.now());var e=a-h;f._times[f._times.length-1].end=a;
f._times[f._times.length-1].dur=e;f.amt+=e;f.runs++;if(this.verbose){this.log(c)}},setGlobalStartTime:function(a){this.globalStartTime=a
},bench:function(f,e,a){if(!e){e="bench%@".fmt(this._benchCount++)}if(!a){a=1}var b;
while(--a>=0){var c=SC.Benchmark.start(e);b=f();SC.Benchmark.end(c)}return b},install:function(a,e,b){a["b__"+e]=a[e];
var c=a["b__"+e];a[e]=function(){var g="%@(%@)".fmt(e,$A(arguments).join(", "));SC.Benchmark.start(g,b);
var f=c.apply(this,arguments);SC.Benchmark.end(g);return f}},restore:function(a,b){a[b]=a["b__"+b]
},report:function(c){if(c){return this._genReport(c)}var b=[];for(var a in this.stats){if(!this.stats.hasOwnProperty(a)){continue
}b.push(this._genReport(a))}return b.join("\n")},timelineReport:function(a){a=(a)?"SproutCore Application":a;
var b=[a,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var e=this._compileChartData(true);for(var c=0;c<e.length;c++){if(e[c][4]){b.push(this._timelineGenSubReport(e[c]))
}else{b.push(this._timelineGenReport(e[c]))}}return b.join("\n")},timelineChart:function(u){var p=0;
this.hideChart();var n=this._compileChartData(false);var k=n.length;if(k===0){return
}var b=this.globalStartTime?this.globalStartTime:n[0][1];var e=n[k-1][2]-b;var o=50+k*30;
var q=Math.ceil(e/200)+1;var t=q*50;var c=document.createElement("div");c.className="sc-benchmark-graph";
document.body.appendChild(c);var v=document.createElement("div");v.innerHTML=((u)?u:"SproutCore Application")+(" - Total Captured Time: "+e+" ms - Points Captured: "+k)+' [<a href="javascript:SC.Benchmark.hideChart();">Hide Chart</a>]';
v.className="sc-benchmark-title";c.appendChild(v);var g=document.createElement("div");
g.className="sc-benchmark-top";g.style.width=t+"px";c.appendChild(g);for(p=0;p<q;
p++){var s=document.createElement("div");s.className="sc-benchmark-tick";s.style.left=(p*50)+"px";
s.style.height=o+"px";var f=document.createElement("div");f.className="sc-benchmark-tick-label";
f.style.left=(p*50)+"px";f.innerHTML=p*200+" ms";c.appendChild(s);c.appendChild(f)
}for(p=0;p<k;p++){var l=document.createElement("div");l.style.top=(75+(p*30))+"px";
l.style.width=t+"px";l.className=(p%2===0)?"sc-benchmark-row even":"sc-benchmark-row";
c.appendChild(l);var m=document.createElement("div");var j=n[p][1];var h=n[p][2];
var a=n[p][3];m.innerHTML="&nbsp;"+(n[p][0]+" <span class='sc-benchmark-emphasis'>"+a+"ms</span>");
m.className="sc-benchmark-bar";m.style.cssText="left:"+(((j-b)/4))+"px; width: "+((a/4))+"px; top: "+(53+(p*30))+"px;";
m.title="start: "+(j-b)+" ms, end: "+(h-b)+" ms, duration: "+a+" ms";c.appendChild(m)
}this._graph=c},hideChart:function(){if(this._graph){try{document.body.removeChild(this._graph)
}catch(a){}}},log:function(e){var c=this.report(e).split("\n"),b=c.length,a;for(a=0;
a<b;a++){console.log(c[a])}},startProfile:function(a){if(!this.enabled){return}if(console&&console.profile){console.profile(a)
}},endProfile:function(a){if(!this.enabled){return}if(console&&console.profileEnd){console.profileEnd(a)
}},_compileChartData:function(h){var m=[],a;for(var n in this.stats){var f=this.stats[n];
for(var g=0;g<f._times.length;g++){var o=f._times[g];a=(f._times.length>1)?(g+1)+" - "+n:n;
m.push([a,o.start,o.end,o.dur,false]);if(h){var b=o._subStats;for(var c in b){var l=b[c];
for(var e=0;e<l._times.length;e++){var p=l._times[e];a=(l._times.length>1)?(e+1)+" - "+c:c;
m.push([a,p.start,p.end,p.dur,true])}}}}}m.sort(function(k,j){if(k[1]<j[1]){return -1
}else{if(k[1]==j[1]){if(k[3]&&!j[3]){return -1}if(!k[3]&&j[3]){return 1}return 0}}return 1
});return m},_genReport:function(a){var b=this._statFor(a);var c=(b.runs>0)?(Math.floor(b.amt*1000/b.runs)/1000):0;
return"BENCH %@ msec: %@ (%@x)".fmt(c,(b.name||a),b.runs)},_timelineGenReport:function(a){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_timelineGenSubReport:function(a){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_subStatFor:function(e,c){var f=this.stats[c]._times.length;
if(f===0){return}var a=this.stats[c]._times[this.stats[c]._times.length-1]._subStats;
var b=a[e];if(!b){a[e]={runs:0,amt:0,name:e,_starts:[],_times:[]};b=a[e]}return b
},_statFor:function(b){var a=this.stats[b];if(!a){a=this.stats[b]={runs:0,amt:0,name:b,_starts:[],_times:[]};
a=this.stats[b]}return a},reset:function(){this.stats={}},_bench:function(b,a){SC.Benchmark.bench(b,a,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.mixin({logBundleLoading:NO,bundleIsLoaded:function(a){var b=SC.BUNDLE_INFO[a];
return b?!!b.loaded:NO},_scb_bundleDidLoad:function(b,j,a,k){var f=a,o=j;if(SC.typeOf(j)===SC.T_STRING){o=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,o)}if(!f){if(SC.LAZY_INSTANTIATION[b]){var n=SC.LAZY_INSTANTIATION[b];
if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is marked for lazy instantiation, instantiating it now…".fmt(b))
}for(var g=0,c=n.length;g<c;g++){try{n[g]()}catch(h){console.log("SC.loadBundle(): Failted to lazily instatiate entry for  '%@'".fmt(b))
}}delete SC.LAZY_INSTANTIATION[b];if(SC.typeOf(j)===SC.T_STRING){o=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,o)}if(!a){throw"SC.loadBundle(): could not find callback for lazily instantiated bundle '%@'".fmt(b)
}}else{throw"SC.loadBundle(): could not find callback for '%@'".fmt(b)}}if(!k){k=[]
}k.push(b);var l=!!SC.RunLoop.currentRunLoop;if(l){SC.RunLoop.begin()}f.apply(o,k);
if(l){SC.RunLoop.end()}},tryToLoadBundle:function(e,f,g,b){var a,c;if(SC.typeOf(f)===SC.T_STRING){c=SC.objectForPropertyPath(f)
}if(SC.typeOf(g)===SC.T_STRING){a=SC.objectForPropertyPath(g,c)}if(a||SC.LAZY_INSTANTIATION[e]){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' found through other means, will attempt to load…".fmt(e))
}SC.BUNDLE_INFO[e]={loaded:YES};return SC.BUNDLE_INFO[e]}return NO},loadBundle:function(w,A,e){var u,x;
if(e===undefined&&SC.typeOf(A)===SC.T_FUNCTION){e=A;A=null}var p=SC.BUNDLE_INFO[w],z,y,c=SC.A(arguments).slice(3),l=SC.logBundleLoading;
if(l){console.log("SC.loadBundle(): Attempting to load '%@'".fmt(w))}if(!p){if(l){console.log("SC.loadBundle(): Attemping to load %@ without SC.BUNDLE_INFO entry… could be loaded through other means.".fmt(w))
}p=this.tryToLoadBundle(w,A,e,c)}if(!p){throw"SC.loadBundle(): could not find bundle '%@'".fmt(w)
}else{if(p.loaded){if(l){console.log("SC.loadBundle(): Bundle '%@' already loaded, skipping.".fmt(w))
}if(e){if(SC.isReady){SC._scb_bundleDidLoad(w,A,e,c)}else{SC.ready(SC,function(){SC._scb_bundleDidLoad(w,A,e,c)
})}}}else{if(l){console.log("SC.loadBundle(): Bundle '%@' is not loaded, loading now.".fmt(w))
}z=p.callbacks||[];if(e){z.push(function(){SC._scb_bundleDidLoad(w,A,e,c)});p.callbacks=z
}if(!p.loading){var b=p.requires||[];var h=YES;for(u=0,x=b.length;u<x;++u){var s=b[u];
var m=SC.BUNDLE_INFO[s];if(!m){throw"SC.loadBundle(): could not find required bundle '%@' for bundle '%@'".fmt(s,w)
}else{if(m.loading){h=NO;break}else{if(m.loaded){continue}else{h=NO;var t=m.dependents;
if(!t){m.dependents=t=[]}t.push(w);if(l){console.log("SC.loadBundle(): '%@' depends on '%@', loading dependency…".fmt(w,s))
}SC.loadBundle(s);break}}}}if(h){var n,f,g,a,j,o;j=document.getElementsByTagName("head")[0];
if(!j){j=document.documentElement}n=p.styles||[];for(u=0,x=n.length;u<x;++u){g=n[u];
if(g.length>0){a=document.createElement("link");a.setAttribute("href",g);a.setAttribute("rel","stylesheet");
a.setAttribute("type","text/css");j.appendChild(a)}}var k=this._jsBundleLoadQueue;
if(!k){this._jsBundleLoadQueue=k={}}k[w]=[];var v=k[w];f=p.scripts||[];for(u=0,x=f.length;
u<x;++u){g=f[u];if(g.length>0){v.push(g)}}p.loading=YES;this.scriptDidLoad(w)}}}}},scriptDidLoad:function(c){var a=this._jsBundleLoadQueue;
if(a){var f=a[c];if(f){var b=f.shift();if(SC.logBundleLoading){console.log("SC.scriptDidLoad(): Loading next file in '%@' -> '%@'".fmt(c,b))
}var e=document.createElement("script");e.setAttribute("type","text/javascript");
e.setAttribute("src",b);document.body.appendChild(e)}}},bundleDidLoad:function(e){var h=SC.BUNDLE_INFO[e],f=SC.logBundleLoading,g,c;
if(!h){h=SC.BUNDLE_INFO[e]={loaded:YES};return}if(h.loaded&&f){console.log("SC.bundleDidLoad() called more than once for bundle '%@'. Skipping.".fmt(e));
return}delete h.loading;h.loaded=YES;if(SC.isReady){SC._invokeCallbacksForBundle(e)
}else{SC.ready(SC,function(){SC._invokeCallbacksForBundle(e)})}var j=h.dependents||[];
for(var b=0,a=j.length;b<a;++b){if(f){console.log("SC.loadBundle(): Bundle '%@' has completed loading, loading '%@' that depended on it.".fmt(e,j[b]))
}SC.loadBundle(j[b])}},_invokeCallbacksForBundle:function(c){var f=SC.BUNDLE_INFO[c],e;
if(!f){return}if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, invoking callbacks.".fmt(c))
}e=f.callbacks||[];SC.RunLoop.begin();for(var b=0,a=e.length;b<a;++b){e[b]()}SC.RunLoop.end()
}});SC.SCANNER_OUT_OF_BOUNDS_ERROR=new Error("Out of bounds.");SC.SCANNER_INT_ERROR=new Error("Not an int.");
SC.SCANNER_SKIP_ERROR=new Error("Did not find the string to skip.");SC.SCANNER_SCAN_ARRAY_ERROR=new Error("Did not find any string of the given array to scan.");
SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR=new Error("Can't compare the dates of two DateTimes that don't have the same timezone.");
SC.DATETIME_ISO8601="%Y-%m-%dT%H:%M:%S%Z";SC.Scanner=SC.Object.extend({string:null,scanLocation:0,scan:function(a){if(this.scanLocation+a>this.length){throw SC.SCANNER_OUT_OF_BOUNDS_ERROR
}var b=this.string.substr(this.scanLocation,a);this.scanLocation+=a;return b},scanInt:function(a){var c=this.scan(a);
var b=new RegExp("\\d{"+a+"}");if(!c.match(b)){throw SC.SCANNER_INT_ERROR}return parseInt(c,10)
},skipString:function(a){if(this.scan(a.length)!==a){throw SC.SCANNER_SKIP_ERROR}return YES
},scanArray:function(c){for(var b=0,a=c.length;b<a;b++){if(this.scan(c[b].length)===c[b]){return b
}this.scanLocation-=c[b].length}throw SC.SCANNER_SCAN_ARRAY_ERROR}});SC.DateTime=SC.Object.extend(SC.Freezable,SC.Copyable,{_ms:0,timezone:0,isFrozen:YES,adjust:function(b,a){var c;
b=b?SC.clone(b):{};c=(b.timezone!==undefined)?b.timezone:(this.timezone!==undefined)?this.timezone:0;
return this.constructor._adjust(b,this._ms,c,a)._createFromCurrentState()},advance:function(a){return this.constructor._advance(a,this._ms,this.timezone)._createFromCurrentState()
},unknownProperty:function(a){return this.constructor._get(a,this._ms,this.timezone)
},toFormattedString:function(a){return this.constructor._toFormattedString(a,this._ms,this.timezone)
},toISO8601:function(){return this.constructor._toFormattedString(SC.DATETIME_ISO8601,this._ms,this.timezone)
},toString:function(){return"UTC: "+new Date(this._ms).toUTCString()+", timezone: "+this.timezone
},isEqual:function(a){return SC.DateTime.compare(this,a)===0},copy:function(){return this
},toTimezone:function(a){if(a===undefined){a=0}return this.advance({timezone:a-this.timezone})
}});SC.DateTime.mixin(SC.Comparable,{recordFormat:SC.DATETIME_ISO8601,dayNames:"_SC.DateTime.dayNames".loc().w(),_englishDayNames:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".w(),abbreviatedDayNames:"_SC.DateTime.abbreviatedDayNames".loc().w(),monthNames:"_SC.DateTime.monthNames".loc().w(),abbreviatedMonthNames:"_SC.DateTime.abbreviatedMonthNames".loc().w(),_date:new Date(),_tz:0,timezone:new Date().getTimezoneOffset(),_dt_cache:{},_dt_cache_index:-1,_DT_CACHE_MAX_LENGTH:1000,_setCalcState:function(a,c){var b={milliseconds:this._date.getTime(),timezone:this._tz};
if(a!==undefined){this._date.setTime(a)}if(c!==undefined){this._tz=c}return b},_setCalcStateFromHash:function(c,b){var e=(b!==undefined)?b:this._tz;
var a=this._toMilliseconds(c,this._ms,e);return this._setCalcState(a,e)},_get:function(x,b,o){var n,u,h,p,e,k,l,f,q,a;
var c,j;var t=this._date;var s,g=null;s=this._setCalcState(b,o);if(x==="milliseconds"){g=t.getTime()
}else{if(x==="timezone"){g=this._tz}}if(g===null){q=x.slice(0,4);a=x.slice(4);if(q==="last"||q==="next"){c=this._get("dayOfWeek");
j=this._englishDayNames.indexOf(a);if(j>=0){var w=j-c;if(q==="last"&&w>=0){w-=7}if(q==="next"&&w<0){w+=7
}this._advance({day:w},b,o);g=this._createFromCurrentState()}}}if(g===null){if(o!==undefined){this._setCalcState(t.getTime()-(o*60000),0)
}switch(x){case"year":g=t.getUTCFullYear();break;case"month":g=t.getUTCMonth()+1;
break;case"day":g=t.getUTCDate();break;case"dayOfWeek":g=t.getUTCDay();break;case"hour":g=t.getUTCHours();
break;case"minute":g=t.getUTCMinutes();break;case"second":g=t.getUTCSeconds();break;
case"millisecond":g=t.getUTCMilliseconds();break}if((g===null)&&(x==="isLeapYear")){e=this._get("year");
g=(e%4===0&&e%100!==0)||e%400===0}if((g===null)&&(x==="daysInMonth")){switch(this._get("month")){case 4:case 6:case 9:case 11:g=30;
break;case 2:g=this._get("isLeapYear")?29:28;break;default:g=31;break}}if((g===null)&&(x==="dayOfYear")){n=t.getTime();
h=this._get("day");this._setCalcStateFromHash({day:1});for(p=this._get("month")-1;
p>0;p--){this._setCalcStateFromHash({month:p});h+=this._get("daysInMonth")}t.setTime(n);
g=h}if((g===null)&&(x.slice(0,4)==="week")){k=x.length===4?1:parseInt(x.slice("4"),10);
l=this._get("dayOfWeek");f=this._get("dayOfYear")-1;if(k===0){g=parseInt((f-l+7)/7,10)
}else{g=parseInt((f-(l-1+7)%7+7)/7,10)}}}this._setCalcState(s.milliseconds,s.timezone);
return g},_adjust:function(c,g,f,a){var e=c?SC.clone(c):{};var b=this._toMilliseconds(c,g,f,a);
this._setCalcState(b,f);return this},_advance:function(a,g,e){var c=a?SC.clone(a):{};
var f;for(var b in c){c[b]+=this._get(b,g,e)}f=(c.timezone!==undefined)?c.timezone:e;
return this._adjust(c,g,f,NO)},_toMilliseconds:function(k,c,h,f){var a=k?SC.clone(k):{};
var j=this._date;var g=j.getTime();var b,e;if(!SC.none(c)){j.setTime(c)}e=(h!==undefined)?h:(this.timezone!==undefined)?this.timezone:0;
j.setTime(j.getTime()-(e*60000));if(f===undefined||f===YES){if(!SC.none(a.hour)&&SC.none(a.minute)){a.minute=0
}if(!(SC.none(a.hour)&&SC.none(a.minute))&&SC.none(a.second)){a.second=0}if(!(SC.none(a.hour)&&SC.none(a.minute)&&SC.none(a.second))&&SC.none(a.millisecond)){a.millisecond=0
}}if(SC.none(a.year)){a.year=j.getUTCFullYear()}if(SC.none(a.month)){a.month=j.getUTCMonth()+1
}if(SC.none(a.day)){a.day=j.getUTCDate()}if(SC.none(a.hour)){a.hour=j.getUTCHours()
}if(SC.none(a.minute)){a.minute=j.getUTCMinutes()}if(SC.none(a.second)){a.second=j.getUTCSeconds()
}if(SC.none(a.millisecond)){a.millisecond=j.getUTCMilliseconds()}b=Date.UTC(a.year,a.month-1,a.day,a.hour,a.minute,a.second,a.millisecond);
j.setTime(b+(e*60000));b=j.getTime();j.setTime(g);return b},create:function(){var k=arguments.length===0?{}:arguments[0];
var e;if(SC.typeOf(k)===SC.T_NUMBER){k={milliseconds:k}}e=(k.timezone!==undefined)?k.timezone:this.timezone;
if(e===undefined){e=0}if(!SC.none(k.milliseconds)){var j="nu"+k.milliseconds+e,a=this._dt_cache;
var f=a[j];if(!f){var g,h=this._dt_cache_index,b=this;f=a[j]=new b([{_ms:k.milliseconds,timezone:e}]);
h=this._dt_cache_index=(h+1)%this._DT_CACHE_MAX_LENGTH;g=a[h];if(g!==undefined&&a[g]){delete a[g]
}a[h]=j}return f}else{var c=new Date();return this.create({milliseconds:this._toMilliseconds(k,c.getTime(),e,k.resetCascadingly),timezone:e})
}},_createFromCurrentState:function(){return this.create({milliseconds:this._date.getTime(),timezone:this._tz})
},parse:function(p,c){var q=/(?:\%([aAbBcdHIjmMpSUWwxXyYZ\%])|(.))/g;var o,k,a={},b={},j=SC.Scanner.create({string:p});
try{while((k=q.exec(c))!==null){switch(k[1]){case"a":b.dayOfWeek=j.scanArray(this.abbreviatedDayNames);
break;case"A":b.dayOfWeek=j.scanArray(this.dayNames);break;case"b":a.month=j.scanArray(this.abbreviatedMonthNames)+1;
break;case"B":a.month=j.scanArray(this.monthNames)+1;break;case"c":throw"%c is not implemented";
case"d":a.day=j.scanInt(2);break;case"H":a.hour=j.scanInt(2);break;case"I":a.hour=j.scanInt(2);
break;case"j":throw"%j is not implemented";case"m":a.month=j.scanInt(2);break;case"M":a.minute=j.scanInt(2);
break;case"p":a.meridian=j.scanArray(["AM","PM"]);break;case"S":a.second=j.scanInt(2);
break;case"U":throw"%U is not implemented";case"W":throw"%W is not implemented";case"w":throw"%w is not implemented";
case"x":throw"%x is not implemented";case"X":throw"%X is not implemented";case"y":a.year=j.scanInt(2);
a.year+=(a.year>70?1900:2000);break;case"Y":a.year=j.scanInt(4);break;case"Z":var g=j.scan(1);
if(g==="Z"){a.timezone=0}else{if(g==="+"||g==="-"){var l=j.scanInt(2);if(j.scan(1)!==":"){j.scan(-1)
}var f=j.scanInt(2);a.timezone=(g==="+"?-1:1)*(l*60+f)}}break;case"%":j.skipString("%");
break;default:j.skipString(k[0]);break}}}catch(n){console.log("SC.DateTime.createFromString "+n.toString());
return null}if(!SC.none(a.meridian)&&!SC.none(a.hour)){if(a.meridian===1){a.hour=(a.hour+12)%24
}delete a.meridian}o=SC.DateTime.create(a);if(!SC.none(b.dayOfWeek)&&o.get("dayOfWeek")!==b.dayOfWeek){return null
}return o},_pad:function(b,a){var c=""+b;if(a===undefined){a=2}while(c.length<a){c="0"+c
}return c},__toFormattedString:function(b,f,c){var a,e;switch(b[1]){case"a":return this.abbreviatedDayNames[this._get("dayOfWeek")];
case"A":return this.dayNames[this._get("dayOfWeek")];case"b":return this.abbreviatedMonthNames[this._get("month")-1];
case"B":return this.monthNames[this._get("month")-1];case"c":return this._date.toString();
case"d":return this._pad(this._get("day"));case"D":return this._get("day");case"h":return this._get("hour");
case"H":return this._pad(this._get("hour"));case"i":a=this._get("hour");return(a===12||a===0)?12:(a+12)%12;
case"I":a=this._get("hour");return this._pad((a===12||a===0)?12:(a+12)%12);case"j":return this._pad(this._get("dayOfYear"),3);
case"m":return this._pad(this._get("month"));case"M":return this._pad(this._get("minute"));
case"p":return this._get("hour")>11?"PM":"AM";case"S":return this._pad(this._get("second"));
case"u":return this._pad(this._get("utc"));case"U":return this._pad(this._get("week0"));
case"W":return this._pad(this._get("week1"));case"w":return this._get("dayOfWeek");
case"x":return this._date.toDateString();case"X":return this._date.toTimeString();
case"y":return this._pad(this._get("year")%100);case"Y":return this._get("year");
case"Z":e=-1*c;return(e>=0?"+":"-")+this._pad(parseInt(Math.abs(e)/60,10))+":"+this._pad(Math.abs(e)%60);
case"%":return"%"}},_toFormattedString:function(c,f,b){var a=this;var e=(b!==undefined)?b:(this.timezone!==undefined)?this.timezone:0;
this._setCalcState(f-(b*60000),0);return c.replace(/\%([aAbBcdDHiIjmMpSUWwxXyYZ\%])/g,function(){var g=a.__toFormattedString.call(a,arguments,f,b);
return g})},compare:function(e,c){var g=e.get("milliseconds");var f=c.get("milliseconds");
return g<f?-1:g===f?0:1},compareDate:function(e,c){if(e.get("timezone")!==c.get("timezone")){throw SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR
}var g=e.adjust({hour:0}).get("milliseconds");var f=c.adjust({hour:0}).get("milliseconds");
return g<f?-1:g===f?0:1}});SC.Binding.dateTime=function(a){return this.transform(function(b,c){return b?b.toFormattedString(a):null
})};if(SC.RecordAttribute&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}sc_require("system/event");SC.mixin({_isReadyBound:NO,_bindReady:function(){if(this._isReadyBound){return
}this._isReadyBound=YES;if(document.addEventListener&&!SC.browser.opera){document.addEventListener("DOMContentLoaded",SC._didBecomeReady,NO)
}if(SC.browser.msie&&(window===top)){(function(){if(SC.isReady){return}try{document.documentElement.doScroll("left")
}catch(a){setTimeout(arguments.callee,0);return}SC._didBecomeReady()})()}if(SC.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(SC.isReady){return
}for(var a=0;a<document.styleSheets.length;a++){if(document.styleSheets[a].disabled){setTimeout(arguments.callee,0);
return}}SC._didBecomeReady()},NO)}if(SC.browser.safari&&SC.browser.safari<530){console.error("ready() is not yet supported on Safari 3.1 and earlier")
}SC.Event.add(window,"load",SC._didBecomeReady)},_readyQueue:[],_afterReadyQueue:[],isReady:NO,_didBecomeReady:function(){if(SC.isReady){return
}if(typeof SC.mapDisplayNames===SC.T_FUNCTION){SC.mapDisplayNames()}if(typeof SC.addInvokeOnceLastDebuggingInfo===SC.T_FUNCTION){SC.addInvokeOnceLastDebuggingInfo()
}SC.Locale.createCurrentLocale();if(document&&document.getElementsByTagName){var e=document.getElementsByTagName("body")[0];
if(e){var h=e.className;var c=SC.Locale.currentLanguage.toLowerCase();e.className=(h&&h.length>0)?[h,c].join(" "):c
}}SC.Benchmark.start("ready");SC.RunLoop.begin();var k,b,j,f;do{b=SC._readyQueue;
SC._readyQueue=[];for(j=0,f=b.length;j<f;j++){k=b[j];var g=k[0]||document;var a=k[1];
if(a){a.call(g)}}}while(SC._readyQueue.length>0);SC.isReady=YES;SC._readyQueue=null;
SC.Event.trigger(document,"ready",null,NO);if(SC.removeLoading){SC.$("#loading").remove()
}if(SC.userDefaults.get("ready")){if((SC.mode===SC.APP_MODE)&&(typeof main!="undefined")&&(main instanceof Function)&&!SC.suppressMain){main()
}}else{SC.userDefaults.readyCallback(window,main)}SC.RunLoop.end();SC.Benchmark.end("ready");
SC.Benchmark.log()},ready:function(b,c){var a=this._readyQueue;if(c===undefined){c=b;
b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!c){return this}if(this.isReady){return c.call(b||document)
}a.push([b,c]);return this}});SC._bindReady();SC.removeLoading=YES;SC.APP_MODE="APP_MODE";
SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;require("system/ready");SC.CAPTURE_BACKSPACE_KEY=NO;
SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create()},mainPane:null,makeMainPane:function(b){var a=this.get("mainPane");
if(a===b){return this}this.beginPropertyChanges();if(this.get("keyPane")===a){this.makeKeyPane(b)
}this.set("mainPane",b);if(a){a.blurMainTo(b)}if(b){b.focusMainFrom(a)}this.endPropertyChanges();
return this},menuPane:null,makeMenuPane:function(b){if(b&&!b.get("acceptsMenuPane")){return this
}else{var a=this.get("menuPane");if(a===b){return this}this.set("menuPane",b)}return this
},keyPane:null,previousKeyPanes:[],makeKeyPane:function(g){var f,a,e;if(g){if(!g.get("acceptsKeyPane")){return this
}else{a=this.get("keyPane");if(a===g){return this}else{if(a){e=this.get("previousKeyPanes");
e.push(a)}f=g}}}else{a=this.get("keyPane");e=this.get("previousKeyPanes");f=null;
while(e.length>0){var c=e.pop();if(c.get("isPaneAttached")&&c.get("acceptsKeyPane")){f=c;
break}}}if(!f){var b=this.get("mainPane");if(b&&b.get("acceptsKeyPane")){f=b}}if(a){a.willLoseKeyPaneTo(f)
}if(f){f.willBecomeKeyPaneFrom(a)}this.set("keyPane",f);if(f){f.didBecomeKeyPaneFrom(a)
}if(a){a.didLoseKeyPaneTo(f)}return this},currentWindowSize:null,computeWindowSize:function(){var a;
if(window.innerHeight){a={width:window.innerWidth,height:window.innerHeight}}else{if(document.documentElement&&document.documentElement.clientHeight){a={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}
}else{if(document.body){a={width:document.body.clientWidth,height:document.body.clientHeight}
}}}return a},resize:function(){this._resize();return YES},_resize:function(){var b=this.computeWindowSize(),c=this.get("currentWindowSize");
this.set("currentWindowSize",b);if(!SC.rectsEqual(b,c)){if(SC.platform.touch){var a=SC.$(document.body);
if(b.height>=b.width){SC.device.set("orientation","portrait")}else{SC.device.set("orientation","landscape")
}}if(this.panes){SC.RunLoop.begin();this.panes.invoke("windowSizeDidChange",c,b);
SC.RunLoop.end()}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.RunLoop.begin();this.set("hasFocus",YES);SC.RunLoop.end()}return YES},focusin:function(){this.focus()
},focusout:function(){this.blur()},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.RunLoop.begin();this.set("hasFocus",NO);SC.RunLoop.end()}return YES},dragDidStart:function(a){this._mouseDownView=a;
this._drag=a},defaultResponder:null,sendAction:function(c,e,b,f,a){e=this.targetForAction(c,e,b,f);
if(e&&e.isResponderContext){return !!e.sendAction(c,b,a)}else{return e&&e.tryToPerform(c,b)
}},_responderFor:function(c,a){var b=c?c.get("defaultResponder"):null;if(c){c=c.get("firstResponder")||c;
do{if(c.respondsTo(a)){return c}}while((c=c.get("nextResponder")))}if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if(!b){return null}else{if(b.isResponderContext){return b}else{if(b.respondsTo(a)){return b
}else{return null}}}},targetForAction:function(b,f,e,g){if(!b||(SC.typeOf(b)!==SC.T_STRING)){return null
}if(f){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f)||SC.objectForPropertyPath(f,e)
}if(f){if(f.respondsTo&&!f.respondsTo(b)){f=null}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null
}}}return f}if(g){return this._responderFor(g,b)}var a=this.get("keyPane"),c=this.get("mainPane");
if(a&&(a!==g)){f=this._responderFor(a,b)}if(!f&&c&&(c!==a)){f=this._responderFor(c,b)
}if(!f&&(f=this.get("defaultResponder"))){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f);
if(f){this.set("defaultResponder",f)}}if(f){if(f.respondsTo&&!f.respondsTo(b)){f=null
}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null}}}}return f},targetViewForEvent:function(a){return a.target?SC.$(a.target).view()[0]:null
},sendEvent:function(c,a,e){var f,b;SC.RunLoop.begin();if(e){f=e.get("pane")}else{f=this.get("menuPane")||this.get("keyPane")||this.get("mainPane")
}b=(f)?f.sendEvent(c,a,e):null;SC.RunLoop.end();return b},listenFor:function(c,b,a){a=a?a:this;
c.forEach(function(e){var f=a[e];if(f){SC.Event.add(b,e,a,f)}},this);b=null;return a
},setup:function(){this.listenFor("touchstart touchmove touchend touchcancel".w(),document);
this.listenFor("keydown keyup beforedeactivate mousedown mouseup click dblclick mouseout mouseover mousemove selectstart contextmenu".w(),document).listenFor("resize".w(),window);
if(SC.browser.msie){this.listenFor("focusin focusout".w(),document)}else{this.listenFor("focus blur".w(),window)
}this.listenFor("webkitAnimationStart webkitAnimationIteration webkitAnimationEnd".w(),document);
if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var b=this;document.onkeypress=function(f){f=SC.Event.normalizeEvent(f);
return b.keypress.call(b,f)}}else{SC.Event.add(document,"keypress",this,this.keypress)
}}"drag selectstart".w().forEach(function(g){var h=this[g];if(h){if(SC.browser.msie){var f=this;
document.body["on"+g]=function(j){return h.call(f,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+g]=null})}else{SC.Event.add(document,g,this,h)
}}},this);var a=SC.browser.mozilla?"DOMMouseScroll":"mousewheel";SC.Event.add(document,a,this,this.mousewheel);
this.set("currentWindowSize",this.computeWindowSize());this.focus();if(SC.browser.mobileSafari){var c=SC.RunLoop.prototype.endRunLoop,e;
e=function(){if(c){c.apply(this,arguments)}var k=SC.RootResponder.responder._touches,j,f,l,g,n,o=NO;
if(k){for(j in k){if(k[j]._rescuedElement){continue}l=f=k[j].target;while(f&&(f=f.parentNode)&&!o){o=(f===document.body)
}if(!o&&l){if(l.parentNode&&l.cloneNode){var m=l.cloneNode(true);l.parentNode.replaceChild(m,l);
l.swapNode=m}var h=SC.touchHoldingPen;if(!h){h=SC.touchHoldingPen=document.createElement("div");
h.style.display="none";document.body.appendChild(h)}h.appendChild(l);k[j]._rescuedElement=l
}}}};SC.RunLoop.prototype.endRunLoop=e}},_touchedViews:{},_touches:{},touchesForView:function(a){if(this._touchedViews[SC.guidFor(a)]){return this._touchedViews[SC.guidFor(a)].touches
}},averagedTouchesForView:function(g,f){var l=this.touchesForView(g);if((!l||l.length===0)&&!f){return{x:0,y:0,d:0,touchCount:0}
}var c;if(l){c=l.toArray()}else{c=[]}if(f){c.push(f)}var h,e=c.length,b,a=0,n=0,m,k,j=0;
for(h=0;h<e;h++){b=c[h];a+=b.pageX;n+=b.pageY}a/=e;n/=e;for(h=0;h<e;h++){b=c[h];m=Math.abs(b.pageX-a);
k=Math.abs(b.pageY-n);j+=Math.pow(m*m+k*k,0.5)}j/=e;return{x:a,y:n,d:j,touchCount:e}
},assignTouch:function(b,a){if(!this._touchedViews[SC.guidFor(a)]){this._touchedViews[SC.guidFor(a)]={view:a,touches:SC.CoreSet.create([]),touchCount:0};
a.set("hasTouch",YES)}b.view=a;this._touchedViews[SC.guidFor(a)].touches.add(b);this._touchedViews[SC.guidFor(a)].touchCount++
},unassignTouch:function(c){var a,b;if(!c.view){return}a=c.view;b=this._touchedViews[SC.guidFor(a)];
b.touches.remove(c);b.touchCount--;if(b.touchCount<1){a.set("hasTouch",NO);b.view=null;
delete this._touchedViews[SC.guidFor(a)]}c.view=undefined},makeTouchResponder:function(j,e,h){var b=j.touchResponders,c;
if(j.touchResponder===e){return}var g;if(e){g=e.get("pane")}else{g=this.get("keyPane")||this.get("mainPane")
}if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("     -- Sending touchStart to "+e.toString())
}e=(g)?g.sendEvent("touchStart",j,e):null;this.unassignTouch(j);if(!h||(b.indexOf(e)>-1&&b[b.length-1]!==e)){var a=b.length-1,f=b[a];
while(f&&f!==e){c=this.touchesForView(f);if(f.get("acceptsMultitouch")||!c){f.tryToPerform("touchCancelled",j)
}a--;f=b[a];b.pop();j.touchResponder=b[a];j.nextTouchResponder=b[a-1]}}if(e){this.assignTouch(j,e);
if(e!==j.touchResponder){b.push(e);j.touchResponder=e;j.nextTouchResponder=b[b.length-2]
}}},captureTouch:function(j,f,h){if(!f){f=this}var g=j.targetView,c=g,e=[],b,a;if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Received one touch on %@".fmt(g.toString()))
}while(c&&(c!==f)){e.unshift(c);c=c.get("nextResponder")}for(a=e.length,b=0;b<a;b++){c=e[b];
if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Checking %@ for captureTouch response…".fmt(c.toString()))
}if(c.tryToPerform("captureTouch",j)){if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Making %@ touch responder because it returns YES to captureTouch".fmt(c.toString()))
}this.makeTouchResponder(j,c,h);return}}if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Didn't find a view that returned YES to captureTouch, so we're calling touchStart")
}this.makeTouchResponder(j,g,h)},touchstart:function(l){SC.RunLoop.begin();try{var k,b=l.changedTouches,f=b.length,h,j,a,m,c=NO;
l.touchContext=this;for(k=0;k<f;k++){a=b[k];m=SC.Touch.create(a,this);if(m.hidesTouchIntercept){c=YES
}m.timeStamp=l.timeStamp;this._touches[a.identifier]=m;a.event=l;this.captureTouch(m,this);
a.event=null}}catch(g){SC.Logger.warn("Exception during touchStart: %@".fmt(g));SC.RunLoop.end();
return NO}SC.RunLoop.end();if(c){l.allowDefault();return YES}return NO},touchmove:function(p){SC.RunLoop.begin();
try{var b=p.changedTouches,a,s,o,g=b.length,n,m,l,q,j={},f,k,c=NO;if(this._drag){a=SC.Touch.create(p.changedTouches[0],this);
this._drag.tryToPerform("mouseDragged",a)}for(o=0;o<g;o++){a=b[o];s=this._touches[a.identifier];
if(s.hidesTouchIntercept){c=YES}if(!s){console.warn("Received a touchmove for a touch we don't know about. This is bad.");
continue}s.pageX=a.pageX;s.pageY=a.pageY;s.timeStamp=p.timeStamp;s.event=p;if(s.touchResponder){n=s.touchResponder;
k=SC.guidFor(n);if(!j[k]){j[k]={view:n,touches:[]}}j[k].touches.push(s)}}if(c){p.allowDefault();
return YES}for(o in j){n=j[o].view;m=j[o].touches;p.viewChangedTouches=m;l=this.touchesForView(n);
q=l.firstObject();p.pageX=q.pageX;p.pageY=q.pageY;p.touchContext=this;n.tryToPerform("touchesDragged",p,l)
}b=p.changedTouches;g=b.length;for(o=0;o<g;o++){a=b[o];s=this._touches[a.identifier];
s.event=null}}catch(h){SC.Logger.warn("Exception during touchMove: %@".fmt(h))}SC.RunLoop.end();
return NO},touchend:function(q){SC.RunLoop.begin();try{var j=q.changedTouches,h,t,p,l=j.length,n,b,g=q.isCancel?"touchCancelled":"touchEnd",o,s,c,f,k=NO;
for(p=0;p<l;p++){h=j[p];h.type="touchend";t=this._touches[h.identifier];t.timeStamp=q.timeStamp;
t.pageX=h.pageX;t.pageY=h.pageY;t.type="touchend";if(t.hidesTouchIntercept){t.unhideTouchIntercept();
k=YES}if(this._drag){this._drag.tryToPerform("mouseUp",h);this._drag=null}this.unassignTouch(t);
if(t.touchResponder){c=t.touchResponders;s=c.length-1;f=c[s];o=g;while(f){f.tryToPerform(o,t,q);
s--;f=c[s];o="touchCancelled"}}t.touchResponders=null;t.touchResponder=null;t.nextTouchResponder=null;
if(b=t._rescuedElement){if(b.swapNode&&b.swapNode.parentNode){b.swapNode.parentNode.replaceChild(b,b.swapNode)
}else{if(b.parentNode===SC.touchHoldingPen){SC.touchHoldingPen.removeChild(b)}}delete t._rescuedElement;
b.swapNode=null;b=null}delete this._touches[t.identifier]}}catch(m){SC.Logger.warn("Exception during touchEnd: %@".fmt(m));
SC.RunLoop.end();return NO}SC.RunLoop.end();if(k){q.allowDefault();return YES}return NO
},touchcancel:function(a){a.isCancel=YES;this.touchend(a)},attemptKeyEquivalent:function(b){var e=null;
var c=b.commandCodes()[0];if(!c){return NO}var g=this.get("menuPane"),a=this.get("keyPane"),f=this.get("mainPane");
if(g){e=g.performKeyEquivalent(c,b);if(e){return e}}if(a){e=a.performKeyEquivalent(c,b);
if(e||a.get("isModal")){return e}}if(!e&&f&&(f!==a)){e=f.performKeyEquivalent(c,b);
if(e||f.get("isModal")){return e}}return e},_lastModifiers:null,_handleModifierChanges:function(b){var a;
a=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});var c=false;
if(b.altKey!==a.alt){a.alt=b.altKey;c=true}if(b.ctrlKey!==a.ctrl){a.ctrl=b.ctrlKey;
c=true}if(b.shiftKey!==a.shift){a.shift=b.shiftKey;c=true}b.modifiers=a;return(c)?(this.sendEvent("flagsChanged",b)?b.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(a){return !!(a.altKey||a.ctrlKey||a.metaKey||((a.charCode!==a.which)&&SC.FUNCTION_KEYS[a.which]))
},_isModifierKey:function(a){return !!SC.MODIFIER_KEYS[a.charCode]},keydown:function(a){if(SC.none(a)){return YES
}if(a.keyCode===229){this._IMEInputON=YES;return this.sendEvent("keyDown",a)}if(SC.browser.mozilla&&(a.which===8)){return true
}var b=this._handleModifierChanges(a),e=a.target||a.srcElement,c=(a.which===8)&&!SC.allowsBackspaceToPreviousPage&&(e===document.body);
if(this._isModifierKey(a)){return(c?NO:b)}b=YES;if(this._isFunctionOrNonPrintableKey(a)){if(a.keyCode>=37&&a.keyCode<=40&&SC.browser.mozilla){return YES
}b=this.sendEvent("keyDown",a);if(!b){b=!this.attemptKeyEquivalent(a)}else{b=a.hasCustomEventHandling;
if(b){c=NO}}}return c?NO:b},keypress:function(b){var c,f=b.keyCode,g=!!SC.browser.mozilla;
if(g&&(b.which===8)){b.which=f;c=this.sendEvent("keyDown",b);return c?(SC.allowsBackspaceToPreviousPage||b.hasCustomEventHandling):YES
}else{var e=(f>=37&&f<=40&&g),a=b.charCode;if((a!==undefined&&a===0)&&!e){return YES
}if(e){b.which=f}return this.sendEvent("keyDown",b)?b.hasCustomEventHandling:YES}},keyup:function(a){if(this._ffevt){this._ffevt=null
}var b=this._handleModifierChanges(a);if(this._isModifierKey(a)){return b}if(this._IMEInputON&&a.keyCode===13){a.isIMEInput=YES;
this.sendEvent("keyDown",a);this._IMEInputON=NO}return this.sendEvent("keyUp",a)?a.hasCustomEventHandling:YES
},beforedeactivate:function(c){var b=c.toElement;if(b&&b.tagName&&b.tagName!=="IFRAME"){var a=SC.$(b).view()[0];
if(a&&a.get("blocksIEDeactivate")){return NO}}return YES},mousedown:function(g){try{if(!SC.browser.msie){window.focus()
}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>200)){this._clickCount=1
}else{var f=this._lastMouseDownX-g.clientX,a=this._lastMouseDownY-g.clientY,j=Math.sqrt(f*f+a*a);
if(j>8){this._clickCount=1}}g.clickCount=this._clickCount;this._lastMouseDownX=g.clientX;
this._lastMouseDownY=g.clientY;var c,b=this.targetViewForEvent(g);if(b){c=b.getPath("pane.firstResponder")
}if(c&&c.kindOf(SC.InlineTextFieldView)&&c!==b){c.resignFirstResponder()}b=this._mouseDownView=this.sendEvent("mouseDown",g,b);
if(b&&b.respondsTo("mouseDragged")){this._mouseCanDrag=YES}}catch(h){console.warn("Exception during mousedown: %@".fmt(h));
this._mouseDownView=null;this._mouseCanDrag=NO;throw h}return b?g.hasCustomEventHandling:YES
},mouseup:function(b){this.targetViewForEvent(b);try{if(this._drag){this._drag.tryToPerform("mouseUp",b);
this._drag=null}var f=null,a=this._mouseDownView,c=this.targetViewForEvent(b);this._lastMouseUpAt=Date.now();
b.clickCount=this._clickCount;if(a){f=this.sendEvent("mouseUp",b,a);if(!f&&(this._clickCount===2)){f=this.sendEvent("doubleClick",b,a)
}if(!f){f=this.sendEvent("click",b,a)}}if(!f){if(this._clickCount===2){f=this.sendEvent("doubleClick",b,c)
}if(!f){f=this.sendEvent("click",b,c)}}this._mouseCanDrag=NO;this._mouseDownView=null
}catch(g){this._drag=null;this._mouseCanDrag=NO;this._mouseDownView=null;throw g}return(f)?b.hasCustomEventHandling:YES
},dblclick:function(a){if(SC.browser.isIE){this._clickCount=2;this.mouseup(a)}},mousewheel:function(b){try{var a=this.targetViewForEvent(b),c=this.sendEvent("mouseWheel",b,a)
}catch(f){throw f}return(c)?b.hasCustomEventHandling:YES},_lastHovered:null,mousemove:function(f){if(SC.browser.msie){if(this._lastMoveX===f.clientX&&this._lastMoveY===f.clientY){return
}}this._lastMoveX=f.clientX;this._lastMoveY=f.clientY;SC.RunLoop.begin();try{if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==f.clientX||this._lastMouseDownY!==f.clientY){this._drag.tryToPerform("mouseDragged",f)
}}else{this._drag.tryToPerform("mouseDragged",f)}}else{var c=this._lastHovered||[],g=[],k,j,a,b=this.targetViewForEvent(f);
while(b&&(b!==this)){if(c.indexOf(b)!==-1){b.tryToPerform("mouseMoved",f);g.push(b)
}else{b.tryToPerform("mouseEntered",f);g.push(b)}b=b.get("nextResponder")}for(j=0,a=c.length;
j<a;j++){b=c[j];k=b.respondsTo("mouseExited");if(k&&!(g.indexOf(b)!==-1)){b.tryToPerform("mouseExited",f)
}}this._lastHovered=g;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==f.clientX&&this._lastMouseDownY!==f.clientY){this._mouseDownView.tryToPerform("mouseDragged",f)
}}else{this._mouseDownView.tryToPerform("mouseDragged",f)}}}}catch(h){throw h}SC.RunLoop.end()
},_mouseCanDrag:YES,selectstart:function(b){var c=this.targetViewForEvent(b),a=this.sendEvent("selectStart",b,c);
if(c&&c.respondsTo("mouseDragged")){return(a!==null?YES:NO)&&!this._mouseCanDrag}else{return(a!==null?YES:NO)
}},drag:function(){return false},contextmenu:function(b){var a=this.targetViewForEvent(b);
return this.sendEvent("contextMenu",b,a)},webkitAnimationStart:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidStart",b,a)}catch(c){console.warn("Exception during animationDidStart: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES},webkitAnimationIteration:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidIterate",b,a)}catch(c){console.warn("Exception during animationDidIterate: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES},webkitAnimationEnd:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidEnd",b,a)}catch(c){console.warn("Exception during animationDidEnd: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES}});SC.Touch=function(e,a){this.touchContext=a;
this.identifier=e.identifier;var c=e.target,b;if(c&&SC.$(c).hasClass("touch-intercept")){e.target.style.webkitTransform="translate3d(0px,-5000px,0px)";
c=document.elementFromPoint(e.pageX,e.pageY);if(c){b=SC.$(c).view()[0]}this.hidesTouchIntercept=NO;
if(c.tagName==="INPUT"){this.hidesTouchIntercept=e.target}else{e.target.style.webkitTransform="translate3d(0px,0px,0px)"
}}else{b=e.target?SC.$(e.target).view()[0]:null}this.targetView=b;this.target=c;this.type=e.type;
this.clickCount=1;this.view=undefined;this.touchResponder=this.nextTouchResponder=undefined;
this.touchResponders=[];this.startX=this.pageX=e.pageX;this.startY=this.pageY=e.pageY
};SC.Touch.prototype={unhideTouchIntercept:function(){var a=this.hidesTouchIntercept;
if(a){setTimeout(function(){a.style.webkitTransform="translate3d(0px,0px,0px)"},500)
}},allowDefault:function(){this.hasCustomEventHandling=YES},preventDefault:function(){if(this.event){this.event.preventDefault()
}},stopPropagation:function(){if(this.event){this.event.stopPropagation()}},stop:function(){if(this.event){this.event.stop()
}},makeTouchResponder:function(a,b){this.touchContext.makeTouchResponder(this,a,b)
},captureTouch:function(a,b){this.touchContext.captureTouch(this,a,b)},touchesForView:function(a){return this.touchContext.touchesForView(a)
},averagedTouchesForView:function(a,b){return this.touchContext.averagedTouchesForView(a,(b?this:null))
}};SC.mixin(SC.Touch,{create:function(b,a){return new SC.Touch(b,a)}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var a;
a=SC.RootResponder.responder=SC.RootResponder.create();a.setup()});SC.platform={touch:("createTouch" in document),bounceOnScroll:(/iPhone|iPad|iPod/).test(navigator.platform),pinchToZoom:(/iPhone|iPad|iPod/).test(navigator.platform),input:function(e){var f={},c=e.length,g=document.createElement("input"),b,a;
for(a=0;a<c;a++){b=e[a];f[b]=!!(b in g)}return f}(("autocomplete readonly list size required multiple maxlength pattern min max step placeholder").w()),standalone:navigator.standalone,cssPrefix:null,domCSSPrefix:null,removeEvents:function(e){var b,a=e.length,c;
for(b=0;b<a;b++){c=e[b];SC.Event.remove(document,c,SC.RootResponder.responder,SC.RootResponder.responder[c])
}},replaceEvent:function(a,b){SC.Event.remove(document,a,SC.RootResponder.responder,SC.RootResponder.responder[a]);
SC.Event.add(document,a,this,b)},supportsCSSTransitions:NO,supportsCSSTransforms:NO,understandsCSS3DTransforms:NO,supportsCSS3DTransforms:NO,supportsHashChange:function(){return("onhashchange" in window)&&(document.documentMode===undefined||document.documentMode>7)
}()};(function(){var a=navigator.userAgent.toLowerCase();if((/webkit/).test(a)){SC.platform.cssPrefix="webkit";
SC.platform.domCSSPrefix="Webkit"}else{if((/opera/).test(a)){SC.platform.cssPrefix="opera";
SC.platform.domCSSPrefix="O"}else{if((/msie/).test(a)&&!(/opera/).test(a)){SC.platform.cssPrefix="ms";
SC.platform.domCSSPrefix="ms"}else{if((/mozilla/).test(a)&&!(/(compatible|webkit)/).test(a)){SC.platform.cssPrefix="moz";
SC.platform.domCSSPrefix="Moz"}}}}})();(function(){var e=document.createElement("div");
var f=["-moz-","-moz-","-o-","-ms-","-webkit-"];var a=["moz","Moz","o","ms","webkit"];
var c="",b=null;for(b=0;b<f.length;b++){c+=f[b]+"transition:all 1s linear;";c+=f[b]+"transform: translate(1px, 1px);";
c+=f[b]+"perspective: 500px;"}e.style.cssText=c;for(b=0;b<a.length;b++){if(e.style[a[b]+"TransitionProperty"]!==undefined){SC.platform.supportsCSSTransitions=YES
}if(e.style[a[b]+"Transform"]!==undefined){SC.platform.supportsCSSTransforms=YES}if(e.style[a[b]+"Perspective"]!==undefined||e.style[a[b]+"PerspectiveProperty"]!==undefined){SC.platform.understandsCSS3DTransforms=YES;
SC.platform.supportsCSS3DTransforms=YES}}if(window.media&&window.media.matchMedium){if(!window.media.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}else{if(window.styleMedia&&window.styleMedia.matchMedium){if(!window.styleMedia.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}}})();require("system/ready");require("system/root_responder");require("system/platform");
SC.device=SC.Object.create({orientation:"desktop",isOffline:NO,mouseLocation:function(){var a=SC.RootResponder.responder,c=a._lastMoveX,b=a._lastMoveY;
if(SC.empty(c)||SC.empty(b)){return null}return{x:c,y:b}}.property(),init:function(){arguments.callee.base.apply(this,arguments);
if(SC.platform.touch){this.orientationchange()}if(navigator&&navigator.onLine===false){this.set("isOffline",YES)
}this.panes=SC.Set.create()},setup:function(){var a=SC.RootResponder.responder;a.listenFor("orientationchange".w(),window,this);
a.listenFor("online offline".w(),document,this)},orientationchange:function(a){if(window.orientation===0||window.orientation===180){this.set("orientation","portrait")
}else{this.set("orientation","landscape")}},orientationObserver:function(){var a=SC.$(document.body),b=this.get("orientation");
if(b==="portrait"){a.setClass("portrait",YES);a.setClass("landscape",NO)}if(b==="landscape"){a.setClass("portrait",NO);
a.setClass("landscape",YES)}}.observes("orientation"),online:function(a){this.set("isOffline",NO)
},offline:function(a){this.set("isOffline",YES)}});SC.ready(function(){SC.device.setup()
});sc_require("system/locale");SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageCache=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(a,f,g,e){var b=SC.typeOf(f);
if(SC.none(g)&&SC.typeOf(f)===SC.T_FUNCTION){f=null;g=f}if(SC.typeOf(g)===SC.T_STRING){g=f[g]
}if(SC.none(e)){e=SC.none(f)&&SC.none(g)}var c=this._imageEntryFor(a);if(c.status===this.IMAGE_LOADED){if(g){g.call(f||c.image,c.url,c.image)
}}else{if(f||g){this._addCallback(c,f,g)}c.retainCount++;this._scheduleImageEntry(c,e)
}},releaseImage:function(a,e,f){var c=this._imageEntryFor(a,NO);if(!c){return this
}if(--c.retainCount<=0){this._deleteEntry(c)}else{if(e||f){var b=SC.typeOf(e);if(SC.none(f)&&SC.typeOf(e)===SC.T_FUNCTION){e=null;
f=e}if(SC.typeOf(f)===SC.T_STRING){f=e[f]}this._removeCallback(c,e,f)}}},reloadImage:function(a){var b=this._imageEntryFor(a,NO);
if(b&&b.status===this.IMAGE_LOADED){b.status=this.IMAGE_WAITING}},loadNextImage:function(){var c=null,a;
if(this.get("activeRequests")>=this.get("loadLimit")){return}a=this._foregroundQueue;
while(a.length>0&&!c){c=a.shift()}if(!c){a=this._backgroundQueue;while(a.length>0&&!c){c=a.shift()
}}this.set("isLoading",!!c);if(c){var b=c.image;b.onabort=this._imageDidAbort;b.onerror=this._imageDidError;
b.onload=this._imageDidLoad;b.src=c.url;this._loading.push(c);this.incrementProperty("activeRequests");
this.loadNextImage()}},_imageEntryFor:function(c,a){if(a===undefined){a=YES}var e=this._images[c];
if(!e&&a){var b=new Image();e=this._images[c]={url:c,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:b};
b.entry=e}return e},_deleteEntry:function(a){this._unscheduleImageEntry(a);delete this._images[a.url]
},_addCallback:function(c,e,f){var b=c.callbacks;var a=b.find(function(g){return g[0]===e&&g[1]===f
},this);if(!a){b.push([e,f])}b=null;return this},_removeCallback:function(b,c,e){var a=b.callbacks;
a.forEach(function(g,f){if(g[0]===c&&g[1]===e){a[f]=null}},this);a=null;return this
},_scheduleImageEntry:function(e,c){var b=this._backgroundQueue;var f=this._foregroundQueue;
if(e.status===this.IMAGE_LOADED){return this}if((e.status===this.IMAGE_QUEUED)&&!c&&e.isBackground){b[b.indexOf(e)]=null;
e.status=this.IMAGE_WAITING}if(e.status!==this.IMAGE_QUEUED){var a=(c)?b:f;a.push(e);
e.status=this.IMAGE_QUEUED;e.isBackground=c}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)
}this.set("isLoading",YES);return this},_unscheduleImageEntry:function(b){if(b.status!==this.IMAGE_QUEUED){return this
}var a=b.isBackground?this._backgroundQueue:this._foregroundQueue;a[a.indexOf(b)]=null;
if(this._loading.indexOf(b)>=0){a.image.abort();this.imageStatusDidChange(b,this.ABORTED)
}return this},_imageDidAbort:function(){SC.RunLoop.begin();SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ABORTED);
SC.RunLoop.end()},_imageDidError:function(){SC.RunLoop.begin();SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ERROR);
SC.RunLoop.end()},_imageDidLoad:function(){SC.RunLoop.begin();SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.LOADED);
SC.RunLoop.end()},imageStatusDidChange:function(c,a){if(!c){return}var b=c.url;var e;
switch(a){case this.LOADED:e=c.image;break;case this.ABORTED:e=SC.IMAGE_ABORTED_ERROR;
break;case this.ERROR:e=SC.IMAGE_FAILED_ERROR;break;default:e=SC.IMAGE_FAILED_ERROR;
break}c.callbacks.forEach(function(g){var h=g[0],j=g[1];j.call(h,b,e)},this);c.callbacks=[];
c.status=(a===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;var f=c.image;if(f){f.onload=f.onerror=f.onabort=null;
if(a!==this.LOADED){c.image=null}}this._loading[this._loading.indexOf(c)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.json={encode:function(a){return JSON.stringify(a)},decode:function(a){return JSON.parse(a)
}};if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}());SC.Math=SC.Object.create({near:function(c,b,a){if(!a){a=0.00001}return Math.abs(c-b)<=a
},round:function(e,a){if(!a){a=0}var b=Math.pow(10,a);if(a<0){var c=b.toString();
b=c.substring(0,c.indexOf("1")+1)}e=e.valueOf();return Math.round(e*b)/b}});SC.Page=SC.Object.extend({owner:null,get:function(a){var b=this[a];
if(b&&b.isClass){this[a]=b=b.create({page:this});if(!this.get("inDesignMode")){b.awake()
}return b}else{return arguments.callee.base.apply(this,arguments)}},awake:function(){var b,a;
for(a in this){if(!this.hasOwnProperty(a)){continue}b=this[a];if(b&&b.isViewClass){this[a]=b=b.create({page:this})
}}return this},getIfConfigured:function(b){var a=this[b];return(a&&a.isViewClass)?null:this.get(b)
},loc:function(c){var a,b;for(b in c){if(!c.hasOwnProperty(b)){continue}a=this[b];
if(!a||!a.isViewClass){continue}a.loc(c[b])}return this}});SC.Page.design=SC.Page.create;
SC.Page.localization=function(a){return a};sc_require("system/builder");SC.MODE_REPLACE="replace";
SC.MODE_APPEND="append";SC.MODE_PREPEND="prepend";SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(f,e){var b,a;
if(e){this.prevObject=e;this.strings=e.strings;this.offset=e.length+e.offset}if(!this.strings){this.strings=[]
}if(f===undefined){f="div";a=YES}else{if(f==="div"||f==="label"||f==="a"){a=YES}else{if(SC.typeOf(f)===SC.T_STRING){f=f.toLowerCase();
a=YES}}}if(a){this._tagName=f;this._needsTag=YES;this.needsContent=YES;var g=this;
while(g){g.length++;g=g.prevObject}this.strings.push(null);this._selfClosing=this.SELF_CLOSING.contains(f)
}else{this._elem=f;this._needsTag=NO;this.length=0;this.needsContent=NO}return this
},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(b){var a=this.strings||[];
return(b===undefined)?a.slice(this.offset,this.length):a[b+this.offset]},push:function(e){var b=this.strings,a=arguments.length;
if(!b){this.strings=b=[]}if(a>1){b.push.apply(b,arguments)}else{b.push(e)}var f=this;
while(f){f.length+=a;f=f.prevObject}this.needsContent=YES;return this},text:function(c){var b=arguments.length,a=0;
for(a=0;a<b;a++){this.push(SC.RenderContext.escapeHTML(arguments[a]))}return this
},join:function(b){if(this._needsTag){this.end()}var a=this.strings;return a?a.join(b||""):""
},begin:function(a){return SC.RenderContext(a,this)},element:function(){if(this._elem){return this._elem
}var a=SC.RenderContext,b=a.factory,c,e;if(!b){b=a.factory=document.createElement("div")
}b.innerHTML=this.join();if(SC.browser.msie){if(b.innerHTML.length>0){e=b.firstChild.cloneNode(true);
b.innerHTML=""}else{e=null}}else{e=b.firstChild}return e},remove:function(a){if(!a){return
}var b,c=this._elem;if(!c||!c.removeChild){return}b=document.getElementById(a);if(b){b=c.removeChild(b);
b=null}},update:function(){var a=this._elem,f=this.updateMode,h,m,k,g,o,c,l,e,j;this._innerHTMLReplaced=NO;
if(!a){return}h=SC.$(a);if(this.length>0){this._innerHTMLReplaced=YES;if(f===SC.MODE_REPLACE){a.innerHTML=this.join()
}else{c=a.cloneNode(false);c.innerHTML=this.join();j=(f===SC.MODE_APPEND)?null:a.firstChild;
l=c.firstChild;while(l){e=l.nextSibling;a.insertBefore(l,e);l=e}l=e=c=j=null}}if(this._attrsDidChange&&(k=this._attrs)){for(m in k){if(!k.hasOwnProperty(m)){continue
}g=k[m];if(g===null){a.removeAttribute(m)}else{h.attr(m,g)}}}if(this._classNamesDidChange&&(k=this._classNames)){h.attr("class",k.join(" "))
}if(this._idDidChange&&(k=this._id)){h.attr("id",k)}if(this._stylesDidChange&&(o=this._styles)){var b=this._STYLE_PAIR_ARRAY,n=this._JOIN_ARRAY;
for(m in o){if(!o.hasOwnProperty(m)){continue}k=o[m];if(k===null){continue}if(!isNaN(k)&&!(m==="zIndex"||m==="font-weight")){k+="px"
}b[0]=this._dasherizeStyleName(m);b[1]=k;n.push(b.join(": "))}h.attr("style",n.join("; "));
n.length=0}a=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var o=this._TAG_ARRAY,b,m,k,h,l=this._attrs,e=this._classNames,a=this._id,n=this._styles;
o[0]="<";o[1]=this._tagName;if(l||e||n||a){if(!l){l=this._DEFAULT_ATTRS}if(a){l.id=a
}if(e){l["class"]=e.join(" ")}if(n){m=this._JOIN_ARRAY;b=this._STYLE_PAIR_ARRAY;for(k in n){if(!n.hasOwnProperty(k)){continue
}h=n[k];if(h===null){continue}if(!isNaN(h)&&!(k==="zIndex"||k==="font-weight")){h+="px"
}b[0]=this._dasherizeStyleName(k);b[1]=h;m.push(b.join(": "))}l.style=m.join("; ");
m.length=0}o.push(" ");for(k in l){if(!l.hasOwnProperty(k)){continue}h=l[k];if(h===null){continue
}o.push(k,'="',h,'" ')}if(l===this._DEFAULT_ATTRS){delete l.style;delete l["class"];
delete l.id}}var j=this.strings;var g=(this._selfClosing===NO)?NO:(this.length===1);
o.push(g?" />":">");j[this.offset]=o.join("");o.length=0;if(!g){o[0]="</";o[1]=this._tagName;
o[2]=">";j.push(o.join(""));var f=this;while(f){f.length++;f=f.prevObject}o.length=0
}this._elem=null;return this.prevObject||this},tag:function(a,b){return this.begin(a,b).end()
},tagName:function(a){if(a===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=a;this._tagNameDidChange=YES;return this
}},id:function(a){if(a===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=a;this._idDidChange=YES;return this}},classNames:function(b,a){if(b===undefined){if(!this._classNames&&this._elem){this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();this._cloneClassNames=NO
}if(!this._classNames){this._classNames=[]}return this._classNames}else{this._classNames=b;
this._cloneClassNames=a||NO;this._classNamesDidChange=YES;return this}},hasClass:function(a){return this.classNames().indexOf(a)>=0
},addClass:function(e){if(e===undefined||e===null){console.warn("You are adding an undefined or empty class"+this.toString());
return this}var f=this.classNames();if(SC.typeOf(e)===SC.T_STRING){if(f.indexOf(e)<0){f.push(e);
this._classNamesDidChange=YES}}else{for(var c=0,a=e.length;c<a;c++){var b=e[c];if(f.indexOf(b)<0){f.push(b);
this._classNamesDidChange=YES}}}return this},removeClass:function(b){var c=this._classNames,a;
if(!c&&this._elem){c=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(c&&(a=c.indexOf(b))>=0){if(this._cloneClassNames){c=this._classNames=c.slice();
this._cloneClassNames=NO}c[a]=null;this._classNamesDidChange=YES}return this},resetClassNames:function(){this._classNames=[];
this._classNamesDidChange=YES;return this},setClass:function(e,c){var g,a,b,f;if(c!==undefined){return c?this.addClass(e):this.removeClass(e)
}else{g=this._classNames;if(!g&&this._elem){g=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(!g){g=this._classNames=[]}if(this._cloneClassNames){g=this._classNames=g.slice();
this._cloneClassNames=NO}f=NO;for(b in e){if(!e.hasOwnProperty(b)){continue}a=g.indexOf(b);
if(e[b]){if(a<0){g.push(b);f=YES}}else{if(a>=0){g[a]=null;f=YES}}}if(f){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g,styles:function(e,f){var a,c,b;
if(e===undefined){if(!this._styles&&this._elem){a=SC.$(this._elem).attr("style");
if(a&&(a=a.toString()).length>0){if(SC.browser.msie){a=a.toLowerCase()}e={};c=this._STYLE_REGEX;
c.lastIndex=0;while(b=c.exec(a)){e[this._camelizeStyleName(b[1])]=b[2]}this._styles=e;
this._cloneStyles=NO}else{this._styles={}}}else{if(!this._styles){this._styles={}
}else{if(this._cloneStyles){this._styles=SC.beget(this._styles);this._cloneStyles=NO
}}}return this._styles}else{this._styles=e;this._cloneStyles=f||NO;this._stylesDidChange=YES;
return this}},addStyle:function(a,f){var b,e=NO,c=this.styles();if(typeof a===SC.T_STRING){if(f===undefined){return c[a]
}else{if(c[a]!==f){c[a]=f;this._stylesDidChange=YES}}}else{for(b in a){if(!a.hasOwnProperty(b)){continue
}f=a[b];if(c[b]!==f){c[b]=f;e=YES}}if(e){this._stylesDidChange=YES}}return this},removeStyle:function(a){if(!this._styles&&!this._elem){return this
}var b=this.styles();if(b[a]){b[a]=null;this._stylesDidChange=YES}},attr:function(a,f){var c,b=this._attrs,e=NO;
if(!b){this._attrs=b={}}if(typeof a===SC.T_STRING){if(f===undefined){return b[a]}else{if(b[a]!==f){b[a]=f;
this._attrsDidChange=YES}}}else{for(c in a){if(!a.hasOwnProperty(c)){continue}f=a[c];
if(b[c]!==f){b[c]=f;e=YES}}if(e){this._attrsDidChange=YES}}return this},_camelizeStyleName:function(a){var b=a.match(/^-(webkit|moz|o)-/),c=a.camelize();
if(b){return c.substr(0,1).toUpperCase()+c.substr(1)}else{return c}},_dasherizeStyleName:function(a){var b=a.dasherize();
if(b.match(/^(webkit|moz|ms|o)-/)){b="-"+b}return b}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;
SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(e){var c,b,a;if(SC.none(e)){return e}c=this.escapeHTMLElement;
if(!c){c=this.escapeHTMLElement=document.createElement("div")}b=this.escapeTextNode;
if(!b){b=this.escapeTextNode=document.createTextNode("");c.appendChild(b)}b.data=e;
a=c.innerHTML;if(SC.RenderContext._safari3){a=a.replace(/>/g,"&gt;")}b=c=null;return a
};SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var a=this.get("request");
while(a.get("source")){a=a.get("source")}return a}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,encodedBody:null,body:function(){var a=this.get("encodedBody");
if(a&&this.get("isJSON")){try{a=SC.json.decode(a)}catch(b){return SC.Error.create({message:b.name+": "+b.message,label:"Response",errorValue:this})
}}return a}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,timedOut:null,timeoutTimer:null,fire:function(){var a=this.get("request"),c=a?a.get("source"):null;
if(c&&c.willSend){c.willSend(a,this)}a.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}var b=a.get("timeout");if(b){var e=SC.Timer.schedule({target:this,action:"timeoutReached",interval:b,repeats:NO});
this.set("timeoutTimer",e)}if(!this.get("isCancelled")&&c&&c.didSend){c.didSend(a,this)
}},invokeTransport:function(){this.receive(function(a){this.set("status",200)},this)
},receive:function(f,a){if(!this.get("timedOut")){var e=this.get("timeoutTimer");
if(e){e.invalidate()}this.set("timedOut",NO);var b=this.get("request");var c=b?b.get("source"):null;
SC.RunLoop.begin();if(c&&c.willReceive){c.willReceive(b,this)}f.call(a,!this.get("isCancelled"));
if(!this.get("isCancelled")&&c&&c.didReceive){c.didReceive(b,this)}if(!this.get("isCancelled")){this.notify()
}SC.RunLoop.end()}SC.Request.manager.transportDidClose(this);return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},timeoutReached:function(){if(this.get("timedOut")===null){this.set("timedOut",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this);var a=SC.$error("HTTP Request timed out","Request",408);
a.set("errorValue",this);this.set("isError",YES);this.set("errorObject",a);var b=this.get("request");
var c=b?b.get("source"):null;if(!this.get("isCancelled")&&c&&c.didTimeout){c.didTimeout(b,this)
}}},cancelTransport:function(){},_notifyListener:function(b,a){var f=b[a],g,e,c;if(!f){return NO
}g=(f.params||[]).copy();g.unshift(this);e=f.target;c=f.action;if(SC.typeOf(c)===SC.T_STRING){c=e[c]
}return c.apply(e,g)},notify:function(){var b=this.get("listeners"),a=this.get("status"),c=Math.floor(a/100)*100,e=NO;
if(!b){return this}e=this._notifyListener(b,a);if(!e){e=this._notifyListener(b,c)
}if(!e){e=this._notifyListener(b,0)}return this},toString:function(){var a=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(a,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var c=this.get("rawRequest"),b=c?c.getAllResponseHeaders():null,a={};
if(!b){return a}b.split("\n").forEach(function(h){var e=h.indexOf(":"),f,g;if(e>=0){f=h.slice(0,e);
g=h.slice(e+1).trim();a[f]=g}},this);return a}.property("status").cacheable(),header:function(a){var b=this.get("rawRequest");
return b?b.getResponseHeader(a):null},encodedBody:function(){var b=this.get("rawRequest"),a;
if(!b){a=null}else{if(this.get("isXML")){a=b.responseXML}else{a=b.responseText}}return a
}.property("status").cacheable(),cancelTransport:function(){var a=this.get("rawRequest");
if(a){a.abort()}this.set("rawRequest",null)},invokeTransport:function(){var e,h,b,c,g;
function f(){for(var j=0;j<arguments.length;j++){try{var k=arguments[j]();return k
}catch(l){}}return NO}e=f(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")});this.set("rawRequest",e);
c=!!this.getPath("request.isAsynchronous");if(c){if(!SC.browser.msie){SC.Event.add(e,"readystatechange",this,this.finishRequest,e)
}else{h=this;b=function(){if(!h){return null}var j=h.finishRequest();if(j){h=null
}return j};e.onreadystatechange=b}}e.open(this.get("type"),this.get("address"),c);
g=this.getPath("request.headers");for(var a in g){e.setRequestHeader(a,g[a])}e.send(this.getPath("request.encodedBody"));
if(!c){this.finishRequest()}return e},finishRequest:function(c){var f=this.get("rawRequest"),a=f.readyState,e,b,g;
if(a===4){this.receive(function(h){if(!h){return}b=-1;try{b=f.status||0}catch(k){}if((b<200)||(b>=300)){try{g=f.statusText||""
}catch(j){g=""}e=SC.$error(g||"HTTP Request failed","Request",b);e.set("errorValue",this);
this.set("isError",YES);this.set("errorObject",e)}this.set("status",b)},this);f.onreadystatechange=function(){};
return YES}return NO}});sc_require("system/response");SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,init:function(){arguments.callee.base.apply(this,arguments);
this.header("X-Requested-With","XMLHttpRequest");this.header("X-SproutCore-Version","1.0")
},headers:function(){var a=this._headers;if(!a){a=this._headers={}}return a}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",timeout:null,body:null,encodedBody:function(){var a=this.get("body");
if(a&&this.get("isJSON")){a=SC.json.encode(a)}return a}.property("isJSON","isXML","body").cacheable(),willSend:function(b,a){},didSend:function(b,a){},willReceive:function(b,a){},didReceive:function(b,a){},didTimeout:function(b,a){},COPY_KEYS:"isAsynchronous isJSON isXML address type timeout body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var a={},e=this.COPY_KEYS,g=e.length,b,c,f;
while(--g>=0){b=e[g];if(this.hasOwnProperty(b)){a[b]=this.get(b)}}if(this.hasOwnProperty("listeners")){a.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){a._headers=SC.copy(this._headers)}a.source=this.get("source")||this;
return this.constructor.create(a)},header:function(a,b){var c;if(SC.typeOf(a)===SC.T_STRING){c=this._headers;
if(arguments.length===1){return c?c[a]:null}else{this.propertyWillChange("headers");
if(!c){c=this._headers={}}c[a]=b;this.propertyDidChange("headers");return this}}else{if(b===undefined){c=a;
this.beginPropertyChanges();for(a in c){if(!c.hasOwnProperty(a)){continue}this.header(a,c[a])
}this.endPropertyChanges();return this}}return this},async:function(a){if(a===undefined){a=YES
}return this.set("isAsynchronous",a)},json:function(a){if(a===undefined){a=YES}if(a){this.set("isXML",NO)
}return this.set("isJSON",a)},xml:function(a){if(a===undefined){a=YES}if(a){this.set("isJSON",NO)
}return this.set("isXML",a)},_prep:function(){var a=!!this.header("Content-Type");
if(this.get("isJSON")&&!a){this.header("Content-Type","application/json")}else{if(this.get("isXML")&&!a){this.header("Content-Type","text/xml")
}}return this},send:function(a){var b=this.get("timeout");if(b){if(!this.get("isAsynchronous")){throw"Timeout values cannot be used with synchronous requests"
}}else{if(b===0){throw"The timeout value must either not be specified or must be greater than 0"
}}if(a){this.set("body",a)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var a=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(a)
},notify:function(a,f,e,g){var c=YES;if(SC.typeOf(a)!==SC.T_NUMBER){g=SC.A(arguments).slice(2);
e=f;f=a;a=0;c=NO}else{g=SC.A(arguments).slice(3)}var b=this.get("listeners");if(!b){this.set("listeners",b={})
}b[a]={target:f,action:e,params:g};return this}});SC.Request.mixin({getUrl:function(a){return this.create().set("address",a).set("type","GET")
},postUrl:function(b,a){var c=this.create().set("address",b).set("type","POST");if(a){c.set("body",a)
}return c},deleteUrl:function(a){return this.create().set("address",a).set("type","DELETE")
},putUrl:function(b,a){var c=this.create().set("address",b).set("type","PUT");if(a){c.set("body",a)
}return c}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(b){if(!b){return null
}var a=b.get("responseClass").create({request:b});this.get("pending").pushObject(a);
this.fireRequestIfNeeded();return a},cancel:function(b){var e=this.get("pending"),c=this.get("inflight"),a;
if(e.indexOf(b)>=0){this.propertyWillChange("pending");e.removeObject(b);this.propertyDidChange("pending");
return YES}else{if(c.indexOf(b)>=0){b.cancel();c.removeObject(b);this.fireRequestIfNeeded();
return YES}else{return NO}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(a){a.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var e=this.get("pending"),c=this.get("inflight"),a=this.get("maxRequests"),b;
if((e.length>0)&&(c.length<a)){b=e.shiftObject();c.pushObject(b);b.fire()}},transportDidClose:function(a){this.get("inflight").removeObject(a);
this.fireRequestIfNeeded()}});require("system/platform");SC.routes=SC.Object.create({_didSetup:NO,_location:null,_firstRoute:null,_extractParametersAndRoute:function(c){var a={},j=c.route||"",f,b,e,h,g,k;
f=(j.indexOf("?")<0&&j.indexOf("&")>=0)?"&":"?";b=j.split(f);j=b[0];if(b.length===1){b=[]
}else{if(b.length===2){b=b[1].split("&")}else{if(b.length>2){b.shift()}}}h=b.length;
for(e=0;e<h;++e){g=b[e].split("=");a[g[0]]=g[1]}for(k in c){if(c.hasOwnProperty(k)&&k!=="route"){a[k]=""+c[k]
}}b=[];for(k in a){b.push([k,a[k]].join("="))}a.params=f+b.join("&");a.route=j;return a
},location:function(b,c){var a;if(c!==undefined){if(c===null){c=""}if(typeof(c)==="object"){a=this._extractParametersAndRoute(c);
c=a.route+a.params}if(!SC.empty(c)||(this._location&&this._location!==c)){window.location.hash=encodeURI(c)
}this._location=c;return this}return this._location}.property(),ping:function(){var a;
if(!this._didSetup){this._didSetup=YES;if(SC.platform.supportsHashChange){this.hashChange();
SC.Event.add(window,"hashchange",this,this.hashChange)}else{a=this;this._invokeHashChange=function(){a.hashChange();
setTimeout(a._invokeHashChange,100)};this._invokeHashChange()}}},hashChange:function(a){var b=window.location.hash;
b=(b&&b.length>0)?b.slice(1,b.length):"";if(!SC.browser.isMozilla){b=decodeURI(b)
}if(this.get("location")!==b){SC.RunLoop.begin();this.set("location",b);SC.RunLoop.end()
}},add:function(a,b,c){if(!this._didSetup){this.invokeLast(this.ping)}if(c===undefined&&SC.typeOf(b)===SC.T_FUNCTION){c=b;
b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!this._firstRoute){this._firstRoute=this._Route.create()
}this._firstRoute.add(a.split("/"),b,c);return this},locationDidChange:function(){this.trigger()
}.observes("location"),trigger:function(){var a=this._firstRoute,b=this.get("location"),e,c;
if(a){e=this._extractParametersAndRoute({route:b});b=e.route;delete e.route;delete e.params;
c=a.routeForParts(b.split("/"),e);if(c&&c.target&&c.method){c.method.call(c.target,e)
}}},_Route:SC.Object.extend({target:null,method:null,staticRoutes:null,dynamicRoutes:null,wildcardRoutes:null,add:function(c,b,f){var a,e;
c=SC.clone(c);if(!c||c.length===0){this.target=b;this.method=f}else{a=c.shift();switch(a.slice(0,1)){case":":a=a.slice(1,a.length);
if(!this.dynamicRoutes){this.dynamicRoutes={}}if(!this.dynamicRoutes[a]){this.dynamicRoutes[a]=this.constructor.create()
}e=this.dynamicRoutes[a];break;case"*":a=a.slice(1,a.length);if(!this.wildcardRoutes){this.wildcardRoutes={}
}e=this.wildcardRoutes[a]=this.constructor.create();break;default:if(!this.staticRoutes){this.staticRoutes={}
}if(!this.staticRoutes[a]){this.staticRoutes[a]=this.constructor.create()}e=this.staticRoutes[a]
}if(e){e.add(c,b,f)}}},routeForParts:function(e,f){var b,c,a;e=SC.clone(e);if(!e||e.length===0){return this.method?this:null
}else{b=e.shift();if(this.staticRoutes&&this.staticRoutes[b]){return this.staticRoutes[b].routeForParts(e,f)
}else{for(c in this.dynamicRoutes){a=this.dynamicRoutes[c].routeForParts(e,f);if(a){f[c]=b;
return a}}for(c in this.wildcardRoutes){e.unshift(b);f[c]=e.join("/");return this.wildcardRoutes[c].routeForParts(null,f)
}return null}}}})});SC.Task=SC.Object.extend({run:function(a){}});sc_require("tasks/task");
SC.TaskQueue=SC.Task.extend({runWhenIdle:NO,runLimit:50,interval:50,isRunning:NO,minimumIdleDuration:500,_tasks:[],hasTasks:function(){return this._tasks.length>0
}.property("taskCount").cacheable(),taskCount:function(){return this._tasks.length
}.property().cacheable(),push:function(a){this._tasks.push(a);this.notifyPropertyChange("taskCount")
},next:function(){if(this._tasks.length<1){return null}var a=this._tasks.shift();
this.notifyPropertyChange("taskCount");return a},_taskCountDidChange:function(){this._setupIdle()
}.observes("taskCount"),_setupIdle:function(){if(this.get("runWhenIdle")&&!this._idleIsScheduled&&this.get("taskCount")>0){var a=this;
setTimeout(function(){a._idleEntry()},this.get("interval"));this._idleIsScheduled=YES
}},_idleEntry:function(){this._idleIsScheduled=NO;var a=SC.RunLoop.lastRunLoopEnd;
if(Date.now()-a>this.get("minimumIdleDuration")){this.run()}else{SC.RunLoop.begin();
this._setupIdle();SC.RunLoop.end();SC.RunLoop.lastRunLoopEnd=a}},run:function(a){this.set("isRunning",YES);
if(!a){a=this.get("runLimit")}var b,c=Date.now();while(b=this.next()){b.run(this);
if(Date.now()-c>a){break}}this._setupIdle();this.set("isRunning",NO)}});SC.backgroundTaskQueue=SC.TaskQueue.create({runWhenIdle:YES});
SC.time=function(a){var b=SC.beget(fn);b.value=timeOffset;return b};(function(){var a=new Date();
SC.mixin(SC.time,{month:function(c,b){a.setTime(c);if(b===undefined){return a.getMonth()
}a.setMonth(b);return a.getTime()},utc:function(b){a.setTime(b);return b+(a.getTimezoneOffset()*60*1000)
},local:function(b){a.setTime(b);return b-(a.getTimezoneOffset()*60*1000)},parse:function(b){},format:function(b){}})
})();SC.time.fmt=SC.time.format;SC.time.fn={done:function(){return this.value}};"month day year".split(" ").forEach(function(a){SC.time.fn[a]=function(b){if(b===undefined){return SC.time[a](this.value)
}else{this.value=SC.time[a](this.value,b);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(a){return(a<0||a>9?"":"0")+a}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{isDate:function(c,b){var a=Date.getDateFromFormat(c,b);if(a==0){return false
}return true},compareDates:function(f,g,c,e){var b=Date.getDateFromFormat(f,g);var a=Date.getDateFromFormat(c,e);
if(b==0||a==0){return -1}else{if(b>a){return 1}}return 0},getDateFromFormat:function(B,s){B=B+"";
s=s+"";var A=0;var m=0;var u="";var g="";var z="";var j,h;var b=new Date();var k=b.getFullYear();
var w=b.getMonth()+1;var v=1;var e=b.getHours();var t=b.getMinutes();var o=b.getSeconds();
var l="";var p=SC.Locale.currentLocale;while(m<s.length){u=s.charAt(m);g="";while((s.charAt(m)==u)&&(m<s.length)){g+=s.charAt(m++)
}if(g=="yyyy"||g=="yy"||g=="y"){if(g=="yyyy"){j=4;h=4}if(g=="yy"){j=2;h=2}if(g=="y"){j=2;
h=4}k=Date._getInt(B,A,j,h);if(k==null){return 0}A+=k.length;if(k.length==2){if(k>70){k=1900+(k-0)
}else{k=2000+(k-0)}}}else{if(g=="MMM"||g=="NNN"){w=0;for(var q=0;q<MONTH_NAMES.length;
q++){var f=MONTH_NAMES[q];if(B.substring(A,A+f.length).toLowerCase()==f.toLowerCase()){if(g=="MMM"||(g=="NNN"&&q>11)){w=q+1;
if(w>12){w-=12}A+=f.length;break}}}if((w<1)||(w>12)){return 0}}else{if(g=="EE"||g=="E"){for(var q=0;
q<DAY_NAMES.length;q++){var n=DAY_NAMES[q];if(B.substring(A,A+n.length).toLowerCase()==n.toLowerCase()){A+=n.length;
break}}}else{if(g=="MM"||g=="M"){w=Date._getInt(B,A,g.length,2);if(w==null||(w<1)||(w>12)){return 0
}A+=w.length}else{if(g=="dd"||g=="d"){v=Date._getInt(B,A,g.length,2);if(v==null||(v<1)||(v>31)){return 0
}A+=v.length}else{if(g=="hh"||g=="h"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<1)||(e>12)){return 0
}A+=e.length}else{if(g=="HH"||g=="H"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<0)||(e>23)){return 0
}A+=e.length}else{if(g=="KK"||g=="K"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<0)||(e>11)){return 0
}A+=e.length}else{if(g=="kk"||g=="k"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<1)||(e>24)){return 0
}A+=e.length;e--}else{if(g=="mm"||g=="m"){t=Date._getInt(B,A,g.length,2);if(t==null||(t<0)||(t>59)){return 0
}A+=t.length}else{if(g=="ss"||g=="s"){o=Date._getInt(B,A,g.length,2);if(o==null||(o<0)||(o>59)){return 0
}A+=o.length}else{if(g=="a"){if(B.substring(A,A+2).toLowerCase()=="am"){l="AM"}else{if(B.substring(A,A+2).toLowerCase()=="pm"){l="PM"
}else{return 0}}A+=2}else{if(B.substring(A,A+g.length)!=g){return 0}else{A+=g.length
}}}}}}}}}}}}}}if(A!=B.length){return 0}if(w==2){if(((k%4==0)&&(k%100!=0))||(k%400==0)){if(v>29){return 0
}}else{if(v>28){return 0}}}if((w==4)||(w==6)||(w==9)||(w==11)){if(v>30){return 0}}if(e<12&&l=="PM"){e=e-0+12
}else{if(e>11&&l=="AM"){e-=12}}var a=new Date(k,w-1,v,e,t,o);return a.getTime()},parseDate:function(k){var g=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var b=new Array("generalFormats",g?"dateFirst":"monthFirst",g?"monthFirst":"dateFirst");
var h=null;h=0;var e=new Date().getTime();switch(k.toLowerCase()){case"yesterday".loc():h=e-(24*60*60*1000);
break;case"today".loc():case"now".loc():h=e;break;case"tomorrow".loc():h=e+(24*60*60*1000);
break}if(h>0){return new Date(h)}for(var f=0;f<b.length;f++){var a=window[b[f]];for(var c=0;
c<a.length;c++){h=Date.getDateFromFormat(k,a[c]);if(h==0){h=Date.getDateFromFormat(k,a[c]+" H:m:s")
}if(h==0){h=Date.getDateFromFormat(k,a[c]+" h:m:s a")}if(h!=0){return new Date(h)
}}}return null},_isInteger:function(c){var b="1234567890";for(var a=0;a<c.length;
a++){if(b.indexOf(c.charAt(a))==-1){return false}}return true},_getInt:function(g,e,f,c){for(var a=c;
a>=f;a--){var b=g.substring(e,e+a);if(b.length<f){return null}if(Date._isInteger(b)){return b
}}return null}});SC.mixin(Date.prototype,{format:function(G){G=G+"";var L=this;var n="";
var x=0;var J="";var f="";var l=L.getFullYear()+"";var g=L.getMonth()+1;var I=L.getDate();
var p=L.getDay();var o=L.getHours();var A=L.getMinutes();var t=L.getSeconds();var v,w,b,u,N,e,F,D,B,q,P,o,O,j,a,C;
var z=new Object();if(l.length<4){l=""+(l-0+1900)}z.y=""+l;z.yyyy=l;z.yy=l.substring(2,4);
z.M=g;z.MM=LZ(g);z.MMM=MONTH_NAMES[g-1];z.NNN=MONTH_NAMES[g+11];z.d=I;z.dd=LZ(I);
z.E=DAY_NAMES[p+7];z.EE=DAY_NAMES[p];z.H=o;z.HH=LZ(o);if(o==0){z.h=12}else{if(o>12){z.h=o-12
}else{z.h=o}}z.hh=LZ(z.h);if(o>11){z.K=o-12}else{z.K=o}z.k=o+1;z.KK=LZ(z.K);z.kk=LZ(z.k);
if(o>11){z.a="PM"}else{z.a="AM"}z.m=A;z.mm=LZ(A);z.s=t;z.ss=LZ(t);while(x<G.length){J=G.charAt(x);
f="";while((G.charAt(x)==J)&&(x<G.length)){f+=G.charAt(x++)}if(z[f]!=null){n=n+z[f]
}else{n=n+f}}return n},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.Timer=SC.Object.extend({target:null,action:null,isPooled:NO,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var f=this.get("startTime");if(!f||f===0){return -1}var a=this.get("interval"),c=this.get("lastFireTime");
if(c<f){c=f}var b;if(this.get("repeats")){if(a===0){b=c}else{b=f+(Math.floor((c-f)/a)+1)*a
}}else{b=f+a}var e=this.get("until");if(e&&e>0&&b>e){b=e}return b}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var a=this.get("fireTime"),b=this.get("lastFireTime");if(a>=b){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,a)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var b=Date.now();this.set("lastFireTime",b);var a=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(a>b){this.schedule()}else{this.invalidate()
}},performAction:function(){var a=SC.typeOf(this.action);if(a==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(a===SC.T_STRING){if(this.action.indexOf(".")>=0){var f=this.action.split(".");
var c=f.pop();var e=SC.objectForPropertyPath(f,window);var b=e.get?e.get(c):e[c];
if(b&&SC.typeOf(b)==SC.T_FUNCTION){b.call(e,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:NO,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(b){if(!b){b=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var c=this.RESET_DEFAULTS;for(var a in c){if(!c.hasOwnProperty(a)){continue
}this[a]=SC.none(b[a])?c[a]:b[a]}this.propertyDidChange("fireTime");return this},removeFromTimerQueue:function(c){var b=this._timerQueuePrevious,a=this._timerQueueNext;
if(!b&&!a&&c!==this){return c}if(b){b._timerQueueNext=a}if(a){a._timerQueuePrevious=b
}this._timerQueuePrevious=this._timerQueueNext=null;return(c===this)?a:c},scheduleInTimerQueue:function(c,b){this._timerQueueRunTime=b;
var a=c;var e=null;while(a&&a._timerQueueRunTime<b){e=a;a=a._timerQueueNext}if(e){e._timerQueueNext=this;
this._timerQueuePrevious=e}if(a){a._timerQueuePrevious=this;this._timerQueueNext=a
}return(a===c)?this:c},collectExpiredTimers:function(c,a){if(this._timerQueueRunTime>a){return this
}c.push(this);var b=this._timerQueueNext;this._timerQueueNext=null;if(b){b._timerQueuePrevious=null
}return b?b.collectExpiredTimers(c,a):null}});SC.Timer.schedule=function(a){var b;
if(!a||SC.none(a.isPooled)||a.isPooled){b=this.timerFromPool(a)}else{b=this.create(a)
}return b.schedule()};SC.Timer.timerFromPool=function(a){var b=this._timerPool;if(!b){b=this._timerPool=[]
}var c=b.pop();if(!c){c=this.create()}return c.reset(a)};SC.Timer.returnTimerToPool=function(a){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(a);return this};SC.UserDefaults=SC.Object.extend({ready:NO,userDomain:null,appDomain:null,_defaults:null,_safari3DB:null,defaults:function(a){this._defaults=a;
this.allPropertiesDidChange()},readDefault:function(j){var c=undefined,a,k,h,l,g;
j=this._normalizeKeyName(j);a=this._userKeyName(j);if(this._written){c=this._written[a]
}if(SC.browser.msie=="7.0"){k=document.body;try{k.load("SC.UserDefaults")}catch(b){console.err("Couldn't load userDefaults in IE7: "+b.description)
}}else{if(this.HTML5DB_noLocalStorage){g=this._safari3DB}else{k=window.localStorage;
if(!k&&window.globalStorage){k=window.globalStorage[window.location.hostname]}}}if(k||g){h=["SC.UserDefaults",a].join("-at-");
if(SC.browser.msie=="7.0"){c=k.getAttribute(h.replace(/\W/gi,""))}else{if(g){c=this.dataHash[h]
}else{c=k[h]}}if(!SC.none(c)){try{c=SC.json.decode(c)}catch(f){c=undefined}}else{c=undefined
}}l=this.delegate;if(l&&l.userDefaultsNeedsDefault){c=l.userDefaultsNeedsDefault(this,j,a)
}if((c===undefined)&&this._defaults){c=this._defaults[a]||this._defaults[j]}return c
},writeDefault:function(l,j){var f,b,m,k,n,h;l=this._normalizeKeyName(l);f=this._userKeyName(l);
b=this._written;if(!b){b=this._written={}}b[f]=j;if(SC.browser.msie=="7.0"){m=document.body
}else{if(this.HTML5DB_noLocalStorage){h=this._safari3DB}else{m=window.localStorage;
if(!m&&window.globalStorage){m=window.globalStorage[window.location.hostname]}}}k=["SC.UserDefaults",f].join("-at-");
if(m||h){var a=SC.json.encode(j);if(SC.browser.msie=="7.0"){m.setAttribute(k.replace(/\W/gi,""),a);
m.save("SC.UserDefaults")}else{if(h){var c=this;h.transaction(function(e){e.executeSql("delete from SCLocalStorage where key = ?",[k],function(){e.executeSql("insert into SCLocalStorage(key, value) VALUES ('"+k+"', '"+a+"');",[],c._nullDataHandler,c.killTransaction)
})});this.dataHash[k]=a}else{try{m[k]=a}catch(g){console.error("Failed using localStorage. "+g)
}}}}n=this.delegate;if(n&&n.userDefaultsDidChange){n.userDefaultsDidChange(this,l,j,f)
}return this},resetDefault:function(h){var g,a,b,e,f,c;g=this._normalizeKeyName(h);
a=this._userKeyName(g);this.propertyWillChange(h);this.propertyWillChange(g);b=this._written;
if(b){delete b[a]}if(SC.browser.msie=="7.0"){e=document.body}else{if(this.HTML5DB_noLocalStorage){c=this._safari3DB
}else{e=window.localStorage;if(!e&&window.globalStorage){e=window.globalStorage[window.location.hostname]
}}}f=["SC.UserDefaults",a].join("-at-");if(e){if(SC.browser.msie=="7.0"){e.setAttribute(f.replace(/\W/gi,""),null);
e.save("SC.UserDefaults")}else{if(c){var j=this;c.transaction(function(k){k.executeSql("delete from SCLocalStorage where key = ?",[f],null)
});delete this.dataHash[f]}else{delete e[f]}}}this.propertyDidChange(h);this.propertyDidChange(g);
return this},unknownProperty:function(a,b){if(b===undefined){return this.readDefault(a)
}else{this.writeDefault(a,b);return b}},_normalizeKeyName:function(a){if(a.indexOf(":")<0){var b=this.get("appDomain")||"app";
a=[b,a].join(":")}return a},_userKeyName:function(b){var a=this.get("userDomain")||"(anonymous)";
return[a,b].join("-at-")},_domainDidChange:function(){var a=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
a=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
a=YES}if(a){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
if(SC.userDefaults&&SC.userDefaults.get("dataHash")){var g=SC.userDefaults.get("dataHash");
if(g){this.dataHash=SC.userDefaults.get("dataHash")}}this._scud_userDomain=this.get("userDomain");
this._scud_appDomain=this.get("appDomain");if(SC.browser.msie=="7.0"){document.body.addBehavior("#default#userData")
}this.HTML5DB_noLocalStorage=((parseInt(SC.browser.safari,0)>523)&&(parseInt(SC.browser.safari,0)<528));
if(this.HTML5DB_noLocalStorage){var f;try{if(!window.openDatabase){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}else{var a="scdb",c="1.0",b="SproutCore database",k=65536;f=openDatabase(a,c,b,k)
}}catch(j){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}if(f){var h=this;f.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS SCLocalStorage(key TEXT NOT NULL PRIMARY KEY, value TEXT NOT NULL);",[],h._nullDataHandler,h.killTransaction)
});f.transaction(function(e){e.parent=h;e.executeSql("SELECT * from SCLocalStorage;",[],function(q,n){var o={},p;
for(var m=0,l=n.rows.length;m<l;m++){p=n.rows.item(m);o[p.key]=p.value}q.parent.dataHash=o;
SC.run(function(){SC.userDefaults.set("ready",YES)})},h.killTransaction)});this._safari3DB=f
}}else{this.set("ready",YES)}},_killTransaction:function(b,a){return true},_nullDataHandler:function(b,a){},readyCallback:function(a,b){this.func=b;
this.ob=a},readyChanged:function(){if(this.ready===YES){var a=this.func;if(a){a.apply(this.ob)
}}}.observes("ready")});SC.userDefaults=SC.UserDefaults.create();sc_require("system/browser");
SC.mixin({_downloadFrames:0,_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight","fontVariant","lineHeight","whiteSpace"],download:function(f){var a=document.createElement("iframe"),e="DownloadFrame_"+this._downloadFrames;
SC.$(a).attr("id",e);a.style.border="10px";a.style.width="0px";a.style.height="0px";
a.style.position="absolute";a.style.top="-10000px";a.style.left="-10000px";if(!SC.browser.isSafari){SC.$(a).attr("src",f)
}document.getElementsByTagName("body")[0].appendChild(a);if(SC.browser.isSafari){SC.$(a).attr("src",f)
}this._downloadFrames=this._downloadFrames+1;if(!SC.browser.isSafari){var c=function(){document.body.removeChild(document.getElementById(e));
e=null};var b=c.invokeLater(null,2000)}a=null},normalizeURL:function(a){if(a.slice(0,1)=="/"){a=window.location.protocol+"//"+window.location.host+a
}else{if((a.slice(0,5)=="http:")||(a.slice(0,6)=="https:")){}else{a=window.location.href+"/"+a
}}return a},isPercentage:function(a){return(a<1&&a>0)},minX:function(a){return a.x||0
},maxX:function(a){return(a.x||0)+(a.width||0)},midX:function(a){return(a.x||0)+((a.width||0)/2)
},minY:function(a){return a.y||0},maxY:function(a){return(a.y||0)+(a.height||0)},midY:function(a){return(a.y||0)+((a.height||0)/2)
},centerX:function(b,a){return(a.width-b.width)/2},centerY:function(b,a){return(a.height-b.height)/2
},pointInRect:function(a,b){return(a.x>=SC.minX(b))&&(a.y>=SC.minY(b))&&(a.x<=SC.maxX(b))&&(a.y<=SC.maxY(b))
},rectsEqual:function(b,a,c){if(!b||!a){return(b==a)}if(!c&&c!==0){c=0.1}if((b.y!=a.y)&&(Math.abs(b.y-a.y)>c)){return NO
}if((b.x!=a.x)&&(Math.abs(b.x-a.x)>c)){return NO}if((b.width!=a.width)&&(Math.abs(b.width-a.width)>c)){return NO
}if((b.height!=a.height)&&(Math.abs(b.height-a.height)>c)){return NO}return YES},intersectRects:function(b,a){var c={x:Math.max(SC.minX(b),SC.minX(a)),y:Math.max(SC.minY(b),SC.minY(a)),width:Math.min(SC.maxX(b),SC.maxX(a)),height:Math.min(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},unionRects:function(b,a){var c={x:Math.min(SC.minX(b),SC.minX(a)),y:Math.min(SC.minY(b),SC.minY(a)),width:Math.max(SC.maxX(b),SC.maxX(a)),height:Math.max(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},cloneRect:function(a){return{x:a.x,y:a.y,width:a.width,height:a.height}
},stringFromRect:function(a){if(!a){return"(null)"}else{return"{x:"+a.x+", y:"+a.y+", width:"+a.width+", height:"+a.height+"}"
}},stringFromLayout:function(f){var e=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"],a=[],c,b=e.length;
while(--b>=0){c=e[b];if(f.hasOwnProperty(c)){a.push(c+":"+f[c])}}return"{"+a.join(", ")+"}"
},heightForString:function(j,f,e,h){var g=this._heightCalcElement,c,a;c=(h&&SC.typeOf(h)===SC.T_ARRAY)?h.join(" "):"";
if(!f){f=100}if(!g){g=this._heightCalcElement=document.createElement("div");document.body.insertBefore(g,null)
}e=e+"; width: "+f+"px; left: "+(-1*f)+"px; position: absolute";var b=SC.$(g);b.attr("style",e);
if(c!==""){b.attr("class",c)}g.innerHTML=j;a=g.clientHeight;g=null;return a},prepareStringMeasurement:function(n,a){var k=this._metricsCalculationElement,h,o,c;
h=SC.A(a).join(" ");if(!k){k=this._metricsCalculationElement=document.createElement("div");
document.body.insertBefore(k,null)}if(SC.typeOf(n)!=SC.T_STRING){var g=null;if(document.defaultView&&document.defaultView.getComputedStyle){g=document.defaultView.getComputedStyle(n,null)
}else{g=n.currentStyle}c=g.cssText;if(!c||c.trim()===""){var m=this._copy_computed_props;
for(var j=0;j<m.length;j++){var b=m[j],f=g[b];k.style[b]=f}var l=k.style;if(l.font===""){var e="";
if(l.fontStyle){e+=l.fontStyle+" "}if(l.fontVariant){e+=l.fontVariant+" "}if(l.fontWeight){e+=l.fontWeight+" "
}if(l.fontSize){e+=l.fontSize}else{e+="10px"}if(l.lineHeight){e+="/"+l.lineHeight
}e+=" ";if(l.fontFamily){e+=l.fontFamily}else{l+="sans-serif"}k.style.font=e}SC.mixin(k.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"})
}else{k.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}g=null}else{c=n;k.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}k.className=h;k=null},teardownStringMeasurement:function(){var a=this._metricsCalculationElement;
a.innerHTML="";a.className="";a.setAttribute("style","");a=null},measureString:function(b){var c=this._metricsCalculationElement;
if(!c){throw"measureString requires a string measurement environment to be set up. Did you mean metricsForString?"
}if(typeof c.innerText!="undefined"){c.innerText=b}else{c.textContent=b}var a={width:c.clientWidth,height:c.clientHeight};
c=null;return a},metricsForString:function(b,c,e){SC.prepareStringMeasurement(c,e);
var a=SC.measureString(b);SC.teardownStringMeasurement();return a},viewportOffset:function(c){if(c.getBoundingClientRect){var e=c.getBoundingClientRect();
return{x:e.left,y:e.top}}var k=0,f=0,l,h,g,m,b,j=c,a=SC.browser.mozilla>=3;while(j){l=SC.$(j);
f+=(j.offsetTop||0);if(!a||(j!==c)){f+=(j.clientTop||0)}k+=(j.offsetLeft||0);if(!a||(j!==c)){k+=(j.clientLeft||0)
}if(SC.browser.mozilla){h=l.attr("overflow");if(h!=="visible"){g=parseInt(l.attr("borderLeftWidth"),0)||0;
m=parseInt(l.attr("borderTopWidth"),0)||0;if(c!==j){g*=2;m*=2}k+=g;f+=m}b=j.offsetParent;
if(SC.browser.mozilla.match(/1[.]9/)&&b){f-=b.clientTop;k-=b.clientLeft}}if(j.offsetParent==document.body&&l.attr("position")==="absolute"){break
}j=j.offsetParent}j=c;while(j){if(!SC.browser.isOpera||j.tagName==="BODY"){f-=j.scrollTop||0;
k-=j.scrollLeft||0}j=j.parentNode}return{x:k,y:f}},ZERO_POINT:{x:0,y:0},ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(b,a){return(b>=0)&&(b>=a.start)&&(b<(a.start+a.length))
},minRange:function(a){return a.start},maxRange:function(a){return(a.length<0)?-1:(a.start+a.length)
},unionRanges:function(c,b){if((c==null)||(c.length<0)){return b}if((b==null)||(b.length<0)){return c
}var e=Math.min(c.start,b.start),a=Math.max(SC.maxRange(c),SC.maxRange(b));return{start:e,length:a-e}
},intersectRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var e=Math.max(SC.minRange(c),SC.minRange(b)),a=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}},subtractRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var a=Math.max(SC.minRange(c),SC.minRange(b)),e=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}},cloneRange:function(a){return{start:a.start,length:a.length}
},rangesEqual:function(b,a){if(b===a){return true}if(b==null){return a.length<0}if(a==null){return b.length<0
}return(b.start==a.start)&&(b.length==a.length)},convertHsvToHex:function(k,x,u){var a=0,l=0,o=0;
if(u>0){var j=(k==1)?0:Math.floor(k*6),m=(k==1)?0:(k*6)-j,e=u*(1-x),c=u*(1-(x*m)),w=u*(1-(x*(1-m))),n=[[u,w,e],[c,u,e],[e,u,w],[e,c,u],[w,e,u],[u,e,c]];
a=Math.round(255*n[j][0]);l=Math.round(255*n[j][1]);o=Math.round(255*n[j][2])}return this.parseColor("rgb("+a+","+l+","+o+")")
},convertHexToHsv:function(j){var c=this.expandColor(j),a=Math.max(Math.max(c[0],c[1]),c[2]),e=Math.min(Math.min(c[0],c[1]),c[2]);
var g=(a==e)?0:((a==c[0])?((c[1]-c[2])/(a-e)/6):((a==c[1])?((c[2]-c[0])/(a-e)/6+1/3):((c[0]-c[1])/(a-e)/6+2/3)));
g=(g<0)?(g+1):((g>1)?(g-1):g);var f=(a===0)?0:(1-e/a);var b=a/255;return[g,f,b]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(b){var c,f,e,a;
c=this.parseColor(b);if(c){f=parseInt(c.slice(1,3),16);e=parseInt(c.slice(3,5),16);
a=parseInt(c.slice(5,7),16);return[f,e,a]}},parseColor:function(e){var f=0,a="#",c;
if(c=this.PARSE_COLOR_RGBRE.exec(e)){var b;for(f=1;f<=3;f++){b=Math.max(0,Math.min(255,parseInt(c[f],0)));
a+=this.toColorPart(b)}return a}if(c=this.PARSE_COLOR_HEXRE.exec(e)){if(c[1].length==3){for(f=0;
f<3;f++){a+=c[1].charAt(f)+c[1].charAt(f)}return a}return"#"+c[1]}return false},toColorPart:function(a){if(a>255){a=255
}var b=a.toString(16);if(a<16){return"0"+b}return b},getStyle:function(a,b){var c="";
if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(e,f){return f.toUpperCase()
});c=a.currentStyle[b]}}return c},uniJapaneseConvert:function(e){var a,c="",b;for(b=0;
b<e.length;b++){a=e.charCodeAt(b);a=((a>=65281&&a<=65392)?a-65248:a);a=(a===12540?45:a);
c=c+String.fromCharCode(a)}return c}});require("tasks/task");SC.didPreloadBundle=function(){};
SC.PreloadBundleTask=SC.Task.extend({bundle:null,target:"SC",action:"preloaded",run:function(a){var b;
if(b=this.get("bundle")){var c=Date.now();SC.loadBundle(this.get("bundle"),this.get("target"),this.get("action"))
}}});SC.VALIDATE_OK=YES;SC.VALIDATE_NO_CHANGE=NO;SC.Validator=SC.Object.extend({fieldValueForObject:function(b,c,a){return b
},objectForFieldValue:function(c,b,a){return c},validate:function(a,b){return true
},validateError:function(a,b){return SC.$error("Invalid.General(%@)".loc(b.get("fieldValue")),b.get("fieldKey"))
},validateChange:function(b,c,a){return this.validate(b,c)?SC.VALIDATE_OK:this.validateError(b,c)
},validateSubmit:function(a,b){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
},validatePartial:function(a,b){if(!b.get("isValid")){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
}else{return SC.VALIDATE_NO_CHANGE}},validateKeyDown:function(b,c,a){return true},attachTo:function(a,b){},detachFrom:function(a,b){}});
SC.Validator.mixin({OK:true,NO_CHANGE:false,findFor:function(f,h,g){var c;if(!g){return
}if(g instanceof SC.Validator){c=g}else{if(g.isClass){c=g.create()}else{if(SC.typeOf(g)===SC.T_STRING){var b=null;
var a=g.match(/^(.+)\[(.*)\]/);if(a){g=a[1];b=a[2]}g=g.classify();var e=SC.Validator[g];
if(SC.none(e)){throw"validator %@ not found for %@".fmt(g,h)}else{if(b){if(!f){throw"named validator (%@) could not be found for field %@ because the field does not belong to a form".fmt(b,h)
}if(!f._validatorHash){f._validatorHash={}}c=(b)?f._validatorHash[b]:null;if(!c){c=e.create()
}if(b){f._validatorHash[b]=c}}else{c=e.create()}}}}}return c},fieldValueForObject:function(a,b,c){if(this.prototype&&this.prototype.fieldValueForObject){return this.prototype.fieldValueForObject(a,b,c)
}else{return null}},objectForFieldValue:function(b,a,c){if(this.prototype&&this.prototype.objectForFieldValue){return this.prototype.objectForFieldValue(b,a,c)
}else{return null}}});sc_require("validators/validator");SC.Validator.CreditCard=SC.Validator.extend({fieldValueForObject:function(a,b,c){if(typeof(a)=="string"&&a.length==16){a=[a.slice(0,4),a.slice(4,8),a.slice(8,12),a.slice(12,16)].join(" ")
}return a},objectForFieldValue:function(b,a,c){return b.replace(/[\s-\.\:]/g,"")},validate:function(a,b){return this.checkNumber(b.get("fieldValue"))
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.CreditCard(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){return !!a.match(/[0-9\- ]/)},checkNumber:function(k){if(!k||k.length===0){return YES
}k=k.replace(/[^0-9]/g,"");var a="0123456789";var h=k.length;var g=parseInt(k,0);
var m=k.toString();m=m.replace(/^\s+|\s+$/g,"");var l=0;var o=true;var b=false;var n;
var e;for(var c=0;c<h;c++){n=""+m.substring(c,c+1);if(a.indexOf(n)=="-1"){o=false
}}if(!o){b=false}if((h===0)&&(b)){b=false}else{if(h>=15){for(var f=h;f>0;f--){e=parseInt(g,0)%10;
e=parseInt(e,0);l+=e;f--;g=g/10;e=parseInt(g,0)%10;e=e*2;switch(e){case 10:e=1;break;
case 12:e=3;break;case 14:e=5;break;case 16:e=7;break;case 18:e=9;break;default:e=e
}g=g/10;l+=e}if((l%10)===0){b=true}else{b=false}}}return b}});sc_require("validators/validator");
SC.Validator.Date=SC.Validator.extend({format:"NNN d, yyyy h:mm:ss a",fieldValueForObject:function(b,c,e){var a;
if(typeof(b)==="number"){a=new Date(b)}else{if(b instanceof Date){a=b}}if(a){b=a.format(this.get("format"))
}return b},objectForFieldValue:function(c,b,e){if(c){var a=Date.parseDate(c);c=(a)?a.getTime():null
}return c}});SC.Validator.DateTime=SC.Validator.extend({format:"%d/%m/%Y",fieldValueForObject:function(a,b,c){if(SC.kindOf(a,SC.DateTime)){a=a.toFormattedString(this.get("format"))
}else{a=null}return a},objectForFieldValue:function(b,a,c){if(b){b=SC.DateTime.parse(b,this.get("format"))
}return b}});sc_require("validators/validator");SC.Validator.Email=SC.Validator.extend({validate:function(a,b){return(b.get("fieldValue")||"").match(/.+@.+\...+/)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Email(%@)".loc(a),a)
}});SC.Validator.EmailOrEmpty=SC.Validator.Email.extend({validate:function(a,c){var b=c.get("fieldValue");
return(b&&b.length>0)?b.match(/.+@.+\...+/):true}});sc_require("validators/validator");
SC.Validator.NotEmpty=SC.Validator.extend({validate:function(b,e){var c=e.get("fieldValue");
var a=!!c;if(a&&c.length){a=c.length>0}return a},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.NotEmpty(%@)".loc(a.capitalize()),c.get("errorLabel"))}});
sc_require("validators/validator");SC.Validator.Number=SC.Validator.extend({places:0,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(this.get("places"));
break;case SC.T_NULL:case SC.T_UNDEFINED:a="";break}return a},objectForFieldValue:function(c,b,e){var a;
c=c.replace(/,/g,"");switch(SC.typeOf(c)){case SC.T_STRING:if(c.length===0){c=null
}else{if(this.get("places")>0){c=parseFloat(c)}else{if(c.length==1&&c.match(/-/)){c=null
}else{a=parseInt(c,0);if(isNaN(a)){c=SC.uniJapaneseConvert(c);c=parseInt(c,0);if(isNaN(c)){c=""
}}else{c=a}}}}break;case SC.T_NULL:case SC.T_UNDEFINED:c=null;break}return c},validate:function(a,c){var b=c.get("fieldValue");
return(b==="")||!(isNaN(b)||isNaN(parseFloat(b)))},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.Number(%@)".loc(a),a)},validateKeyDown:function(b,c,a){var e=c.$input().val();
if(!e){e=""}e+=a;if(this.get("places")===0){if(a.length===0){return true}else{return e.match(/^[\-{0,1}]?[0-9,\0]*/)[0]===e
}}else{if(a.length===0){return true}else{return e.match(/^[\-{0,1}]?[0-9,\0]*\.?[0-9\0]+/)===e
}}}});sc_require("validators/validator");SC.Validator.Password=SC.Validator.extend({attachTo:function(a,b){arguments.callee.base.apply(this,arguments);
if(!this.fields){this.fields=[]}this.fields.push(b)},validate:function(f){if(!this.fields||this.fields.length===0){return true
}var e=false;var b=false;var a=true;var c=this.fields[0].get("fieldValue");this.fields.forEach(function(h){var g=h.get("fieldValue");
if(g!=c){a=false}if(!g||g.length===0){e=true}if(g&&g.length>0){b=true}});if(f){return(b===false)?false:a
}else{return(e===true)?true:a}},updateFields:function(c,b){if(!this.fields||this.fields.length===0){return true
}var a="Invalid.Password".loc();var e=this._field;this.fields.forEach(function(g){var h=(b)?null:((g==e)?a:"");
c.setErrorFor(g,h)});return(b)?SC.VALIDATE_OK:a},validateChange:function(b,c,a){return this.updateFields(b,this.validate(false))
},validateSubmit:function(a,b){return this.updateFields(a,this.validate(true))},validatePartial:function(b,c){var a=!this._field.get("isValid");
if(a){return this.updateFields(b,this.validate(false))}else{return SC.VALIDATE_NO_CHANGE
}}});sc_require("validators/validator");SC.Validator.PositiveInteger=SC.Validator.extend({defaultValue:null,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(0);
break;case SC.T_NULL:case SC.T_UNDEFINED:a=this.get("defaultValue");break}return a
},objectForFieldValue:function(b,a,c){b=b.replace(/,/g,"");switch(SC.typeOf(b)){case SC.T_STRING:if(b.length===0){b=this.get("defaultValue")
}else{b=parseInt(b,0)}break;case SC.T_NULL:case SC.T_UNDEFINED:b=this.get("defaultValue");
break}return b},validate:function(a,c){var b=c.get("fieldValue");return(b==="")||!isNaN(b)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Number(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){var e=c.$input().val();if(!e){e=""}e+=a;if(a.length===0){return true
}else{return e.match(/^[0-9\0]*/)[0]===e}}});sc_require("views/view");SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(a){this.removeAllChildren();
if(a){this.appendChild(a)}},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("nowShowing");if(a&&a.length>0){this.nowShowingDidChange()}},nowShowingDidChange:function(){var a=this.get("nowShowing");
if(a===SC.CONTENT_SET_DIRECTLY){return}if(SC.typeOf(a)===SC.T_STRING&&a.length>0){if(a.indexOf(".")>0){a=SC.objectForPropertyPath(a)
}else{a=SC.objectForPropertyPath(a,this.get("page"))}}if(SC.typeOf(a)===SC.T_CLASS){if(a.kindOf(SC.View)){a=a.create()
}else{a=null}}if(a&&!(a instanceof SC.View)){a=null}this.set("contentView",a)}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});sc_require("views/view");sc_require("mixins/control");
SC.IMAGE_STATE_NONE="none";SC.IMAGE_STATE_LOADING="loading";SC.IMAGE_STATE_LOADED="loaded";
SC.IMAGE_STATE_FAILED="failed";SC.IMAGE_STATE_SPRITE="sprite";SC.BLANK_IMAGE_DATAURL="data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==";
SC.BLANK_IMAGE_URL=SC.browser.msie&&SC.browser.msie<8?"/static/sproutcore/foundation/en/d5d0cd6ba9c796f27ce9264a5339f745f4f7fc66/blank.gif":SC.BLANK_IMAGE_DATAURL;
SC.ImageView=SC.View.extend(SC.Control,{classNames:"sc-image-view",tagName:"img",status:SC.IMAGE_STATE_NONE,value:null,useImageCache:YES,canLoadInBackground:NO,localize:YES,displayProperties:"status toolTip".w(),render:function(c,g){var a=this.get("status"),e=this.get("value");
if(a===SC.IMAGE_STATE_NONE&&e){this._image_valueDidChange()}a=this.get("status");
var f=(a===SC.IMAGE_STATE_LOADED)?e:SC.BLANK_IMAGE_URL;if(a===SC.IMAGE_STATE_SPRITE){c.addClass(e)
}c.attr("src",f);var b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}c.attr("title",b);c.attr("alt",b)}},_image_valueDidChange:function(){var b=this.get("value"),c;
if(b&&b.isEnumerable){b=b.firstObject()}c=SC.ImageView.valueIsUrl(b);if(c&&this.get("useImageCache")){var a=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
this._loadingUrl=b;SC.imageCache.loadImage(b,this,this.imageDidLoad,a);if(this._loadingUrl){this.set("status",SC.IMAGE_STATE_LOADING)
}}else{this._loadingUrl=null;this.set("status",(c)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_SPRITE);
this.displayDidChange()}}.observes("value"),imageDidLoad:function(a,b){if(a===this._loadingUrl){this._loadingUrl=null
}if(this.get("value")===a){this.set("status",SC.$ok(b)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_FAILED);
this.displayDidChange()}}});SC.ImageView.valueIsUrl=function(a){return a?a.indexOf("/")>=0:NO
};sc_require("views/view");sc_require("mixins/control");SC.ALIGN_LEFT="left";SC.ALIGN_RIGHT="right";
SC.ALIGN_CENTER="center";SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,{classNames:["sc-label-view"],fontWeight:SC.REGULAR_WEIGHT,escapeHTML:true,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:false,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,exampleInlineTextFieldView:SC.InlineTextFieldView,icon:null,textAlign:SC.ALIGN_LEFT,isInlineEditorMultiline:NO,displayValue:function(){var h,f;
h=this.get("value");f=this.getDelegateProperty("formatter",this.displayDelegate);
if(f){var g=(SC.typeOf(f)===SC.T_FUNCTION)?f(h,this):f.fieldValueForObject(h,this);
if(!SC.none(g)){h=g}}if(SC.typeOf(h)===SC.T_ARRAY){var e=[];for(var b=0,c=h.get("length");
b<c;b++){var a=h.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}e.push(a)
}h=e.join(",")}if(!SC.none(h)&&h.toString){h=h.toString()}if(h&&this.getDelegateProperty("localize",this.displayDelegate)){h=h.loc()
}if(this.get("escapeHTML")){h=SC.RenderContext.escapeHTML(h)}return h}.property("value","localize","formatter","escapeHTML").cacheable(),hintValue:function(){var a=this.get("hint");
if(this.get("escapeHTML")){a=SC.RenderContext.escapeHTML(a)}return a}.property("hint","escapeHTML").cacheable(),isEditable:NO,isEditableBindingDefault:SC.Binding.bool(),isEditing:NO,validator:null,doubleClick:function(a){return this.beginEditing()
},beginEditing:function(){if(this.get("isEditing")){return YES}if(!this.get("isEditable")){return NO
}var b=this.$(),e=this.get("value")||"",c=SC.viewportOffset(b[0]),a=this.convertFrameFromView(this.get("frame"),null);
c.width=a.width;c.height=a.height;SC.InlineTextFieldView.beginEditing({frame:c,delegate:this,exampleElement:b,value:e,multiline:this.get("isInlineEditorMultiline"),isCollection:NO,validator:this.get("validator"),exampleInlineTextFieldView:this.get("exampleInlineTextFieldView")})
},discardEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.discardEditing()
},commitEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.commitEditing()
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(b){var a=this.$();
this._oldOpacity=a.css("opacity");a.css("opacity",0)},inlineEditorShouldBeginEditing:function(){return this.get("isEditable")
},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(a,b){this.setIfChanged("value",b);
this.$().css("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
},displayProperties:"displayValue textAlign fontWeight icon".w(),_TEMPORARY_CLASS_HASH:{},render:function(e,a){var m=this.get("displayValue"),l=this.get("icon"),h=this.get("hintValue"),g,f,n,j=false,c=false;
if(l){var b=(l.indexOf("/")>=0)?l:SC.BLANK_IMAGE_URL,k=(b===l)?"":l;l='<img src="'+b+'" alt="" class="icon '+k+'" />';
if(l!==this._iconCache){this._iconCache=l;j=true}}if(h&&(!m||m==="")){n='<span class="sc-hint">'+h+"</span>"
}else{n=m}if(n!==this._textCache){this._textCache=n;c=true}if(a||c||j){e.push(l,n)
}f={"text-align":this.get("textAlign"),"font-weight":this.get("fontWeight")};if(this.get("isEditing")){f.opacity=0
}e.addStyle(f);g=this._TEMPORARY_CLASS_HASH;g.icon=!!this.get("icon");e.setClass(g)
}});require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},paneDidAttach:function(){var b=arguments.callee.base.apply(this,arguments);
var a=this.rootResponder;a.makeMainPane(this);if(!a.get("keyRootView")){a.makeKeyPane(this)
}return b},acceptsKeyPane:YES,classNames:["sc-main"]});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/foundation")
}SC.stringsFor("English",{"Invalid.CreditCard(%@)":"%@ is not a valid credit card number","Invalid.Email(%@)":"%@ is not a valid email address","Invalid.NotEmpty(%@)":"%@ must not be empty","Invalid.Password":"Your passwords do not match.  Please try typing them again.","Invalid.General(%@)":"%@ is invalid.  Please try again.","Invalid.Number(%@)":"%@ is not a number."});
SC.allowsBackspaceToPreviousPage=NO;SC.BORDER_BEZEL="sc-bezel-border";SC.BORDER_BLACK="sc-black-border";
SC.BORDER_GRAY="sc-gray-border";SC.BORDER_TOP="sc-top-border";SC.BORDER_BOTTOM="sc-bottom-border";
SC.BORDER_NONE=null;SC.Border={borderTop:0,borderRight:0,borderBottom:0,borderLeft:0,borderStyle:SC.BORDER_GRAY,hasBorder:YES,displayProperties:["borderStyle"],_BORDER_REGEXP:(/-border$/),initMixin:function(){this._sc_border_borderStyleDidChange()
},renderMixin:function(a,c){var b=this.get("borderStyle");if(b){if(this._BORDER_REGEXP.exec(b)){a.addClass(b)
}else{a.addStyle("border","1px "+b+" solid")}}},_sc_border_borderStyleDidChange:function(){var a=this.get("borderStyle"),b=SC.Border.dimensions[a];
if(b){this.borderTop=b;this.borderRight=b;this.borderBottom=b;this.borderLeft=b}}};
SC.mixin(SC.Border,{dimensions:{"sc-bezel-border":1,"sc-black-border":1,"sc-gray-border":1,"sc-top-border":1,"sc-bottom-border":1}});
SC.CollectionFastPath={initMixin:function(){this._indexMap={}},poolForExampleView:function(a){var b="_pool_"+SC.guidFor(a);
if(!this[b]){this[b]=[]}return this[b]},createItemViewFromExampleView:function(c,b){var a=c.create(b);
if(a.isPoolable){a.owningPool=this.poolForExampleView(c)}a.createdFromExampleView=c;
return a},configureItemView:function(b,a){b.beginPropertyChanges();b.setIfChanged("content",a.content);
b.setIfChanged("contentIndex",a.contentIndex);b.setIfChanged("parentView",a.parentView);
b.setIfChanged("layerId",a.layerId);b.setIfChanged("isEnabled",a.isEnabled);b.setIfChanged("isSelected",a.isSelected);
b.setIfChanged("outlineLevel",a.outlineLevel);b.setIfChanged("layout",a.layout);b.setIfChanged("disclosureState",a.disclosureState);
b.setIfChanged("isVisibleInWindow",a.isVisibleInWindow);b.setIfChanged("isGroupView",a.isGroupView);
b.setIfChanged("page",this.page);b.endPropertyChanges()},wakePooledView:function(b,a){this.configureItemView(b,a);
if(b.awakeFromPool){b.awakeFromPool(b.owningPool,this)}},allocateItemView:function(e,b){var a;
if(e.prototype.isPoolable){var c=this.poolForExampleView(e);if(c.length>0){a=c.pop();
this.wakePooledView(a,b)}}if(!a){a=this.createItemViewFromExampleView(e,b)}return a
},releaseItemView:function(b){if(!b.isPoolable){b.destroy();return}var a=b.owningPool;
a.push(b);if(b.hibernateInPool){b.hibernateInPool(a,this)}},contentIndexIsGroup:function(b,e){var c=this.get("contentDelegate");
var a=this.get("_contentGroupIndexes"),f=NO;f=a&&a.contains(b);if(f){f=c.contentIndexIsGroup(this,this.get("content"),b)
}return f},exampleViewForItem:function(g,e){var b=this.get("contentDelegate"),c=this.get("_contentGroupIndexes"),f,a,h=this.contentIndexIsGroup(e,g);
if(h){f=this.get("contentGroupExampleViewKey");if(f&&g){a=g.get(f)}if(!a){a=this.get("groupExampleView")||this.get("exampleView")
}}else{f=this.get("contentExampleViewKey");if(f&&g){a=g.get(f)}if(!a){a=this.get("exampleView")
}}return a},setAttributesForItem:function(g,e,c){var b=this.get("contentDelegate"),h=this.contentIndexIsGroup(e),a=this.exampleViewForItem(g,e),f=this.get("content");
c.createdFromExampleView=a;c.parentView=this.get("containerView")||this;c.contentIndex=e;
c.owner=c.displayDelegate=this;c.content=g;c.page=this.page;c.layerId=this.layerIdFor(e);
c.isEnabled=b.contentIndexIsEnabled(this,f,e);c.isSelected=b.contentIndexIsSelected(this,f,e);
c.outlineLevel=b.contentIndexOutlineLevel(this,f,e);c.disclosureState=b.contentIndexDisclosureState(this,f,e);
c.isVisibleInWindow=this.get("isVisibleInWindow");c.isGroupView=h;c.layout=this.layoutForContentIndex(e);
if(!c.layout){c.layout=a.prototype.layout}},mappedViewsForItem:function(a,b){if(!b){b=this._viewMap
}return b[SC.guidFor(a)]},mappedViewForItem:function(c,b,e){if(!e){e=this._viewMap
}var a=e[SC.guidFor(c)];if(!a){return undefined}return a[b]},mapView:function(f,c,b,h){if(!h){h=this._viewMap
}var e=SC.guidFor(f),a=h[e];if(!a){a=h[e]={_length:0}}a[c]=b;a._length++},unmapView:function(f,c,h){if(!h){h=this._viewMap
}var e=SC.guidFor(f),a=h[e];if(!a){return}if(a[c]){var b=a[c];delete a[c];a._length--;
if(a._length<=0){delete h[e]}}},itemViewForContentIndex:function(b){var a=this._indexMap[b];
if(!a){var e=this.get("content"),c;c=e.objectAt(b);if(!c){return null}var f=this.exampleViewForItem(c,b);
a=this.addItemView(f,c,b)}return a},nearestMappedViewIndexForItem:function(f,c,g){var b=this.mappedViewsForItem(f,g);
if(!b){return null}var e=null,j=-1,h=0;for(var a in b){a=parseInt(a,10);if(isNaN(a)){continue
}h=Math.abs(c-a);if(j<0||h<j){j=h;e=a}}return e},remapItemViews:function(b){var l=this._viewMap||{},a=(this._viewMap={}),k=(this._indexMap={}),m=[],j=this.get("content"),p;
if(!j){return}var g=this._itemsToAdd;b.forEach(function(q){p=j.objectAt(q);var t=this.mappedViewsForItem(p,l);
if(t){if(t[q]){var s=t[q];this.unmapView(p,q,l);this.mapView(p,q,s,a);k[q]=s}else{m.push(q)
}}else{g.push(q)}},this);for(var o=0,h=m.length;o<h;o++){var n=m[o];p=j.objectAt(n);
var f=this.nearestMappedViewIndexForItem(p,n,l),c;if(!SC.none(f)){c=this.mappedViewForItem(p,f,l);
var e=this.exampleViewForItem(p,n);if(e===c.createdFromExampleView){this.unmapView(p,f,l);
this.mapView(p,n,c,a);k[n]=c}else{g.push(n)}}else{g.push(n)}}return l},reloadIfNeeded:function(g,b){var e=this.get("content"),f;
if(!g||!g.isIndexSet){g=this.get("nowShowing")}if(!b){f=this._invalidIndexes;if(!f||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;if(f.isIndexSet&&f.contains(g)){f=YES}if(this.willReload){this.willReload(f===YES?null:f)
}}var h=this._itemsToAdd||(this._itemsToAdd=[]);var a=this.remapItemViews(g);this.processRemovals(a);
if(f){this.processUpdates(f===YES?g:f)}this.processAdds();if(!b){this.clearDOMPools()
}h.length=0;if(!b){var c=this.computeLayout();if(c){this.adjust(c)}if(this.didReload){this.didReload(f===YES?null:f)
}}return this},processRemovals:function(c){var g=this.get("content");for(var e in c){var b=c[e];
for(var f in b){f=parseInt(f,10);if(isNaN(f)){continue}var a=b[f];if(this._indexMap[f]===a){delete this._indexMap[f]
}a._isInCollection=NO;this.removeItemView(a)}}},processUpdates:function(f){var b=this._itemsToUpdate,e=this.get("content"),c,a;
f.forEach(function(g){c=e.objectAt(g);if(a=this.mappedViewForItem(c,g)){if(!a._isInCollection){return
}var h=this.exampleViewForItem(c,g);this.updateItemView(a,h,c,g)}},this)},processAdds:function(){var g=this.get("content");
var h=this._itemsToAdd,b,a=h.length,f,e;for(b=0;b<a;b++){f=h[b];e=g.objectAt(f);var j=this.exampleViewForItem(e,f);
var c=this.addItemView(j,e,f)}},clearDOMPools:function(){var a=this._domPools||(this._domPools={});
for(var b in a){this.clearDOMPool(a[b])}},domPoolSize:10,clearDOMPool:function(c){var b,a=c.length,e;
for(b=this.domPoolSize;b<a;b++){e=c[b];this.removeChild(e);this.releaseItemView(e)
}c.length=Math.min(c.length,this.domPoolSize)},domPoolForExampleView:function(e){var c=this._domPools||(this._domPools={}),a=SC.guidFor(e);
var b=c[a];if(!b){b=c[a]=[]}return b},itemFromDOMPool:function(c){var b=this.domPoolForExampleView(c);
if(b.length<1){return null}var a=b.shift();if(a.wakeFromDOMPool){a.wakeFromDOMPool()
}return a},sendToDOMPool:function(a){var b=this.domPoolForExampleView(a.createdFromExampleView);
b.push(a);var c=a.get("frame");a.adjust({top:-c.height});a.set("layerId",SC.guidFor(a));
if(a.sleepInDOMPool){a.sleepInDOMPool()}},addItemView:function(f,e,c){var a,b=this._TMP_ATTRS||(this._TMP_ATTRS={});
this.setAttributesForItem(e,c,b);if(a=this.itemFromDOMPool(f)){this.configureItemView(a,b);
a._isInCollection=YES;this.mapView(e,c,a);this._indexMap[c]=a;return a}a=this.allocateItemView(f,b);
this.appendChild(a);a._isInCollection=YES;this.mapView(e,c,a);this._indexMap[c]=a;
return a},removeItemView:function(a){if(a.get("layerIsCacheable")){this.sendToDOMPool(a)
}else{this.removeChild(a)}a._isInCollection=NO},updateItemView:function(e,f,c,b){if(!e.get("layerIsCacheable")||e.createdFromExampleView!==f){console.error("BAD UPDATE");
this.unmapView(e,b);delete this._indexMap[b];this.removeItemView(e,c,b);var g=this.addItemView(f,c,b)
}else{var a=this._TMP_ATTRS||(this._TMP_ATTRS={});this.setAttributesForItem(c,b,a);
this.configureItemView(e,a)}},_lastTopUpdate:0,_lastLeftUpdate:0,_tolerance:100,touchScrollDidChange:function(h,g){var j=this.get("clippingFrame");
var f=this._inScrollClippingFrame||(this._inScrollClippingFrame={x:0,y:0,width:0,height:0});
f.x=j.x;f.y=j.y;f.width=j.width;f.height=j.height;f.x=h;f.y=g;var e=this.contentIndexesInRect(f);
if(!e){return}var b=this.get("length"),a=e.get("max"),c=e.get("min");if(a>b||c<0){e=e.copy();
e.remove(b,a-b).remove(c,0-c).freeze()}if(this._lastNowShowing){if(e.contains(this._lastNowShowing)&&this._lastNowShowing.contains(e)){return
}}this._lastNowShowing=e;this.reloadIfNeeded(e,YES)}};SC.CollectionGroup={classNames:["sc-collection-group"]};
SC.CollectionRowDelegate={isCollectionRowDelegate:YES,rowHeight:18,customRowHeightIndexes:null,contentIndexRowHeight:function(a,b,c){return this.get("rowHeight")
}};SC.CollectionViewDelegate={isCollectionViewDelegate:YES,collectionViewSelectionForProposedSelection:function(a,b){return b
},collectionViewShouldSelectIndexes:function(a,b,c){return b},collectionViewShouldDeselectIndexes:function(a,b){return b
},collectionViewShouldDeleteIndexes:function(a,b){return b},collectionViewDeleteContent:function(a,c,b){if(!c){return NO
}if(SC.typeOf(c.destroyAt)===SC.T_FUNCTION){c.destroyAt(b);a.selectPreviousItem(NO,1);
return YES}else{if(SC.typeOf(c.removeAt)===SC.T_FUNCTION){c.removeAt(b);a.selectPreviousItem(NO,1);
return YES}else{return NO}}},collectionViewShouldBeginDrag:function(a){return YES
},collectionViewDragDataTypes:function(a){return[]},collectionViewDragDataForType:function(a,c,b){return null
},collectionViewComputeDragOperations:function(a,b,c){return c},collectionViewValidateDragOperation:function(b,e,f,c,a){return(a&SC.DROP_ON)?SC.DRAG_NONE:f
},collectionViewPerformDragOperation:function(b,e,f,c,a){return SC.DRAG_NONE},collectionViewDragViewFor:function(a,b){return null
},ghostActsLikeCursor:NO};SC.Scrollable={initMixin:function(){console.warn("SC.Scrollable is deprecated and will be removed in a future version of SproutCore.  Consider pulling the mixin into your own app if you want to keep using it.")
},isScrollable:true,verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("innerFrame").height
}.property("innerFrame"),horizontalPageScroll:function(){return this.get("innerFrame").width
}.property("innerFrame"),hasVerticalScroller:function(){return this.get("scrollFrame").height>this.get("innerFrame").height
}.property("scrollFrame"),hasHorizontalScroller:function(){return this.get("scrollFrame").width>this.get("innerFrame").width
}.property("scrollFrame"),scrollBy:function(a){var b=this.get("scrollFrame");var c=this.get("innerFrame");
if(!this.get("hasVerticalScroller")){a.y=0}if(b.height<=c.height){a.y=0}if(!this.get("hasHorizontalScroller")){a.x=0
}if(b.width<=c.width){a.x=0}var e={x:b.x-(a.x||0),y:b.y-(a.y||0)};this.set("scrollFrame",e);
e=this.get("scrollFrame");return{x:e.x-b.x,y:e.y-b.y}},scrollTo:function(a,b){this.set("scrollFrame",{x:0-a,y:0-b})
},scrollToVisible:function(b){var g=this.get("innerFrame");var e=this.get("scrollFrame");
var a=this.convertFrameFromView(b.get("frame"),b);a.x-=(g.x+e.x);a.y-=(g.y+e.y);var c={x:0-e.x,y:0-e.y,width:g.width,height:g.height};
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));this.scrollTo(c.x,c.y)},scrollDownLine:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalLineScroll")*a}).y},scrollUpLine:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalLineScroll")*a}).y},scrollRightLine:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalLineScroll")*a}).x},scrollLeftLine:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalLineScroll")*a}).x},scrollDownPage:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalPageScroll")*a}).y},scrollUpPage:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalPageScroll")*a}).y},scrollRightPage:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalPageScroll")*a}).x},scrollLeftPage:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalPageScroll")*a}).x}};SC.ModalPane=SC.Pane.extend({classNames:"sc-modal",layout:{top:0,left:0,bottom:0,right:0},_openPaneCount:0,paneWillAppend:function(a){this._openPaneCount++;
if(!this.get("isVisibleInWindow")){this.append()}return this},paneDidRemove:function(a){this._openPaneCount--;
if(this._openPaneCount<=0){this._openPaneCount=0;if(this.get("isVisibleInWindow")){this.remove()
}}},mouseDown:function(b){var a=this.get("owner");if(a&&a.modalPaneDidClick){a.modalPaneDidClick(b)
}},touchStart:function(a){this.mouseDown(a)}});sc_require("panes/modal");SC.PanelPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},classNames:["sc-panel"],acceptsKeyPane:YES,isModal:YES,modalPane:SC.ModalPane.extend({classNames:"for-sc-panel"}),contentView:null,contentViewBindingDefault:SC.Binding.single(),render:function(a,b){if(a.needsContent){this.renderChildViews(a,b);
a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>")
}},replaceContent:function(a){this.removeAllChildren();if(a){this.appendChild(a)}},createChildViews:function(){var a=this.contentView;
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView"),_modalPane:function(){var a=this.get("modalPane");if(a&&a.isClass){a=a.create({owner:this});
this.set("modalPane",a)}return a},appendTo:function(a){var b;if(!this.get("isVisibleInWindow")&&this.get("isModal")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}return arguments.callee.base.apply(this,arguments)},remove:function(){var b,a=arguments.callee.base.apply(this,arguments);
if(this._isShowingModal){this._isShowingModal=NO;if(b=this._modalPane()){b.paneDidRemove(this)
}}return a},_isModalDidChange:function(){var b,a=this.get("isModal");if(a){if(!this._isShowingModal&&this.get("isVisibleInWindow")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}}else{if(this._isShowingModal&&(b=this._modalPane())){this._isShowingModal=NO;
b.paneDidRemove(this)}}}.observes("isModal"),paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.becomeKeyPane();return a}});SC.ButtonView=SC.View.extend(SC.Control,SC.Button,SC.StaticLayout,{tagName:"div",classNames:["sc-button-view"],theme:"square",buttonBehavior:SC.PUSH_BEHAVIOR,holdInterval:100,isDefault:NO,isDefaultBindingDefault:SC.Binding.oneWay().bool(),isCancel:NO,isCancelBindingDefault:SC.Binding.oneWay().bool(),href:"",action:null,target:null,supportFocusRing:NO,triggerAction:function(a){if(!this.get("isEnabled")){return NO
}this.set("isActive",YES);this.invokeLater("_triggerActionAfterDelay",200,a);return YES
},_triggerActionAfterDelay:function(a){this._action(a,YES);this.didTriggerAction();
this.set("isActive",NO)},didTriggerAction:function(){},titleMinWidth:80,init:function(){arguments.callee.base.apply(this,arguments);
if(this.get("keyEquivalent")){this._defaultKeyEquivalent=this.get("keyEquivalent")
}},_TEMPORARY_CLASS_HASH:{},displayProperties:["href","icon","title","value","toolTip"],renderStyle:"renderDefault",render:function(e,g){var a,b,c,f;
if(this.get("tagName")==="a"){a=this.get("href");if(!a||(a.length===0)){a="javascript:;"
}e.attr("href",a)}else{e.attr("role","button")}b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}e.attr("title",b);e.attr("alt",b)}c=this._TEMPORARY_CLASS_HASH;c.def=this.get("isDefault");
c.cancel=this.get("isCancel");c.icon=!!this.get("icon");e.attr("role","button").setClass(c);
f=this.get("theme");if(f){e.addClass(f)}this[this.get("renderStyle")](e,g)},renderDefault:function(a,b){if(b){a=a.push("<span class='sc-button-inner' style = 'min-width:",this.get("titleMinWidth"),"px'>");
this.renderTitle(a,b);a.push("</span>");if(this.get("supportFocusRing")){a.push('<div class="focus-ring">','<div class="focus-left"></div>','<div class="focus-middle"></div>','<div class="focus-right"></div></div>')
}}else{this.renderTitle(a,b)}},renderImage:function(a,c){var b=this.get("icon");a.addClass("no-min-width");
if(b){a.push("<div class='img "+b+"'></div>")}else{a.push("<div class='img'></div>")
}},_defaultKeyEquivalent:null,_isDefaultOrCancelDidChange:function(){var a=!!this.get("isDefault"),b=!a&&this.get("isCancel");
if(this.didChangeFor("defaultCancelChanged","isDefault","isCancel")){this.displayDidChange();
if(a){this.set("keyEquivalent","return")}else{if(b){this.setIfChanged("keyEquivalent","escape")
}else{this.set("keyEquivalent",this._defaultKeyEquivalent)}}}}.observes("isDefault","isCancel"),isMouseDown:false,mouseDown:function(a){var b=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);this._isMouseDown=YES;
if(b===SC.HOLD_BEHAVIOR){this._action(a)}else{if(!this._isFocused&&(b!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}}return YES},mouseExited:function(a){if(this._isMouseDown){this.set("isActive",NO)
}return YES},mouseEntered:function(a){if(this._isMouseDown){this.set("isActive",YES)
}return YES},mouseUp:function(b){if(this._isMouseDown){this.set("isActive",NO)}this._isMouseDown=false;
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){var a=this.$().within(b.target);
if(a&&this.get("isEnabled")){this._action(b)}}return YES},touchStart:function(b){var a=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);if(a===SC.HOLD_BEHAVIOR){this._action(b)
}else{if(!this._isFocused&&(a!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;this.becomeFirstResponder();
if(this.get("isVisibleInWindow")){this.$()[0].focus()}}}b.preventDefault();return YES
},touchesDragged:function(a,b){if(!this.touchIsInBoundary(a)){if(!this._touch_exited){this.set("isActive",NO)
}this._touch_exited=YES}else{if(this._touch_exited){this.set("isActive",YES)}this._touch_exited=NO
}a.preventDefault();return YES},touchEnd:function(a){this._touch_exited=NO;this.set("isActive",NO);
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){if(this.touchIsInBoundary(a)){this._action()
}}a.preventDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(b.which===13){this.triggerAction(b);
return YES}return YES},_action:function(a,c){switch(this.get("buttonBehavior")){case SC.TOGGLE_BEHAVIOR:var b=this.get("isSelected");
if(b){this.set("value",this.get("toggleOffValue"))}else{this.set("value",this.get("toggleOnValue"))
}break;case SC.TOGGLE_ON_BEHAVIOR:this.set("value",this.get("toggleOnValue"));break;
case SC.TOGGLE_OFF_BEHAVIOR:this.set("value",this.get("toggleOffValue"));break;case SC.HOLD_BEHAVIOR:this._runHoldAction(a,c);
break;default:this._runAction(a)}},_runAction:function(a){var c=this.get("action"),e=this.get("target")||null,b=this.getPath("pane.rootResponder");
if(c){if(this._hasLegacyActionHandler()){this._triggerLegacyActionHandler(a)}else{if(b){b.sendAction(c,e,this,this.get("pane"))
}}}},_runHoldAction:function(a,b){if(this.get("isActive")){this._runAction();if(!b){SC.RunLoop.begin();
this.invokeLater("_runHoldAction",this.get("holdInterval"),a);SC.RunLoop.end()}}},_hasLegacyActionHandler:function(){var a=this.get("action");
if(a&&(SC.typeOf(a)===SC.T_FUNCTION)){return true}if(a&&(SC.typeOf(a)===SC.T_STRING)&&(a.indexOf(".")!=-1)){return true
}return false},_triggerLegacyActionHandler:function(evt){if(!this._hasLegacyActionHandler()){return false
}var action=this.get("action");if(SC.typeOf(action)===SC.T_FUNCTION){this.action(evt)
}if(SC.typeOf(action)===SC.T_STRING){eval("this.action = function(e) { return "+action+"(this, e); };");
this.action(evt)}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){var b=this.$()[0];if(b){b.focus()
}}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},didAppendToDocument:function(){if(parseInt(SC.browser.msie,0)===7){var c=this.get("layout");
if(this.get("useStaticLayout")&&c.width&&(c.width.indexOf&&c.width.indexOf("auto")!=-1)){var b=this.$();
if(b&&b[0]){var a=b[0].clientWidth;if(a!==0){var e=parseInt(b.css("paddingRight"),0);
this.$(".sc-button-label").css("minWidth",a-(e*2)+"px")}}}}}});SC.TOGGLE_BEHAVIOR="toggle";
SC.PUSH_BEHAVIOR="push";SC.TOGGLE_ON_BEHAVIOR="on";SC.TOGGLE_OFF_BEHAVIOR="off";SC.HOLD_BEHAVIOR="hold";
SC.ButtonView.CLICK_AND_HOLD_DELAY=300;SC.REGULAR_BUTTON_HEIGHT=24;sc_require("panes/panel");
sc_require("views/button");SC.BUTTON1_STATUS="button1";SC.BUTTON2_STATUS="button2";
SC.BUTTON3_STATUS="button3";SC.AlertPane=SC.PanelPane.extend({classNames:"sc-alert",delegate:null,icon:"sc-icon-alert-48",message:"",description:"",displayDescription:function(){var a=this.get("description");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="description">'+a.split("\n").join('</p><p class="description">')+"</p>"
}.property("description").cacheable(),caption:"",displayCaption:function(){var a=this.get("caption");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="caption">'+a.split("\n").join('</p><p class="caption">')+"</p>"
}.property("caption").cacheable(),buttonOne:SC.outlet("contentView.childViews.1.childViews.1"),buttonTwo:SC.outlet("contentView.childViews.1.childViews.0"),buttonThree:SC.outlet("contentView.childViews.2.childViews.0"),buttonThreeWrapper:SC.outlet("contentView.childViews.2"),layout:{top:0.3,centerX:0,width:500},contentView:SC.View.extend({useStaticLayout:YES,layout:{left:0,right:0,top:0,height:"auto"},childViews:[SC.View.extend(SC.StaticLayout,{classNames:["info"],render:function(a,e){var c=this.get("pane");
var b=SC.BLANK_IMAGE_URL;if(c.get("icon")=="blank"){a.addClass("plain")}a.push('<img src="'+b+'" class="icon '+c.get("icon")+'" />');
a.begin("h1").attr("class","header").text(c.get("message")||"").end();a.push(c.get("displayDescription")||"");
a.push(c.get("displayCaption")||"");a.push('<div class="separator"></div>')}}),SC.View.extend({layout:{bottom:13,height:24,right:18,width:466},childViews:["cancelButton","okButton"],classNames:["text-align-right"],cancelButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON2_STATUS,localize:YES,titleMinWidth:64,layout:{right:5,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Cancel",isCancel:YES,action:"dismiss",isVisible:NO}),okButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON1_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"OK",isDefault:YES,action:"dismiss"})}),SC.View.extend({layout:{bottom:13,height:24,left:18,width:150},isVisible:NO,childViews:[SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON3_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Extra",action:"dismiss",isVisible:NO})]})]}),dismiss:function(b){var a=this.delegate;
if(a&&a.alertPaneDidDismiss){a.alertPaneDidDismiss(this,b.get("actionKey"))}this.remove()
},alertInfoDidChange:function(){var a=this.getPath("contentView.childViews.0");if(a){a.displayDidChange()
}}.observes("icon","message","displayDescription","displayCaption")});SC.AlertPane._normalizeArguments=function(b){b=SC.A(b);
var a=b.length,c=b[a-1];if(SC.typeOf(c)!==SC.T_STRING){b[a-1]=null}else{c=null}b[7]=c;
return b};SC.AlertPane.show=function(s,n,p,b,c,q,a,h){var g=this._normalizeArguments(arguments);
var f=this.create({message:g[0]||"",description:g[1]||null,caption:g[2]||null,icon:g[6]||"sc-icon-alert-48",delegate:g[7]});
var m="buttonOne buttonTwo buttonThree".w(),e,j;for(var l=0;l<3;l++){e=f.get(m[l]);
j=g[l+3];if(j){e.set("title",j).set("isVisible",YES);if(j=="?"){e.set("titleMinWidth",0)
}if(l==2){var o=f.get("buttonThreeWrapper");o.set("isVisible",YES)}}}var k=f.append();
f.adjust("height",f.childViews[0].$().height());f.updateLayout();return k};SC.AlertPane.warn=function(f,e,a,j,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-alert-48";return this.show.apply(this,b)};SC.AlertPane.info=function(f,e,a,j,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-info-48";return this.show.apply(this,b)};SC.AlertPane.error=function(f,e,a,j,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-error-48";return this.show.apply(this,b)};SC.AlertPane.plain=function(f,e,a,j,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="blank";return this.show.apply(this,b)};sc_require("panes/panel");SC.PalettePane=SC.PanelPane.extend({classNames:"sc-palette",isModal:NO,modalPane:SC.ModalPane,isAnchored:NO,_mouseOffsetX:null,_mouseOffsetY:null,mouseDown:function(a){var b=this.get("frame");
this._mouseOffsetX=b?(b.x-a.pageX):0;this._mouseOffsetY=b?(b.y-a.pageY):0;return YES
},mouseDragged:function(a){if(!this.isAnchored){this.set("layout",{width:this.layout.width,height:this.layout.height,left:this._mouseOffsetX+a.pageX,top:this._mouseOffsetY+a.pageY});
this.updateLayout()}return YES},touchStart:function(a){return this.mouseDown(a)},touchesDragged:function(a){return this.mouseDragged(a)
}});sc_require("panes/palette");SC.PICKER_MENU="menu";SC.PICKER_FIXED="fixed";SC.PICKER_POINTER="pointer";
SC.PICKER_MENU_POINTER="menu-pointer";SC.POINTER_LAYOUT=["perfectRight","perfectLeft","perfectTop","perfectBottom"];
SC.PickerPane=SC.PalettePane.extend({classNames:"sc-picker",isAnchored:YES,isModal:YES,pointerPos:"perfectRight",pointerPosX:0,pointerPosY:0,anchorElement:null,preferType:null,preferMatrix:null,pointerOffset:null,extraRightOffset:0,popup:function(e,c,f,a){var b=e.isView?e.get("layer"):e;
this.beginPropertyChanges();this.set("anchorElement",b);if(c){this.set("preferType",c)
}if(f){this.set("preferMatrix",f)}if(a){this.set("pointerOffset",a)}this.endPropertyChanges();
this.positionPane();this.append()},positionPane:function(){var b=this.get("anchorElement"),c=this.get("preferType"),e=this.get("preferMatrix"),f=this.get("layout"),a;
if(b){b=this.computeAnchorRect(b);if(b.x===0&&b.y===0){return}a=SC.cloneRect(b);if(c){switch(c){case SC.PICKER_MENU:case SC.PICKER_FIXED:if(!e||e.length!==3){this.set("preferMatrix",[1,4,3])
}a.x+=((this.preferMatrix[2]===0)?a.width:0)+this.preferMatrix[0];a.y+=((this.preferMatrix[2]===3)?a.height:0)+this.preferMatrix[1];
break;default:a.y+=a.height;break}}else{a.y+=a.height}a=this.fitPositionToScreen(a,this.get("frame"),b);
this.adjust({width:a.width,height:a.height,left:a.x,top:a.y})}else{this.adjust({width:f.width,height:f.height,centerX:0,centerY:0})
}this.updateLayout();return this},computeAnchorRect:function(c){var f,b,e,a=SC.RootResponder.responder.computeWindowSize();
if(c.getBoundingClientRect){f=c.getBoundingClientRect();b={x:f.left,y:f.top,width:f.width,height:f.height};
if(b.width===undefined||b.height===undefined){e=SC.$(c);b.width=e.outerWidth();b.height=e.outerHeight()
}}else{b=SC.viewportOffset(c);e=SC.$(c);b.width=e.outerWidth();b.height=e.outerHeight()
}b.height=(a.height-b.y)<b.height?(a.height-b.y):b.height;return b},fitPositionToScreen:function(f,c,b){var a=SC.RootResponder.responder.computeWindowSize();
var e={x:0,y:0,width:a.width,height:a.height};c.x=f.x;c.y=f.y;if(this.preferType){switch(this.preferType){case SC.PICKER_MENU:c=this.fitPositionToScreenMenu(e,c,this.get("isSubMenu"));
break;case SC.PICKER_MENU_POINTER:this.setupPointer(b);c=this.fitPositionToScreenMenuPointer(e,c,b);
break;case SC.PICKER_POINTER:this.setupPointer(b);c=this.fitPositionToScreenPointer(e,c,b);
break;case SC.PICKER_FIXED:break;default:break}}else{c=this.fitPositionToScreenDefault(e,c,b)
}this.displayDidChange();return c},fitPositionToScreenDefault:function(c,e,b){if(SC.maxX(e)>c.width){var g=Math.max(SC.maxX(b),e.width);
e.x=Math.min(g,c.width)-e.width}if(SC.minX(e)<0){e.x=SC.minX(Math.max(b,0));if(SC.maxX(e)>c.width){e.x=Math.max(0,c.width-e.width)
}}if(SC.maxY(e)>c.height){g=Math.max((b.y-e.height),0);if(g>c.height){e.y=Math.max(0,c.height-e.height)
}else{e.y=g}}if(SC.minY(e)<0){g=Math.min(SC.maxY(b),(c.height-b.height));e.y=Math.max(g,0)
}return e},fitPositionToScreenMenu:function(c,b,a){if(a){b.x-=this.get("submenuOffsetX");
b.y-=Math.floor(this.get("menuHeightPadding")/2)}if((b.x+b.width)>(c.width-20)){if(a){b.x=b.x-(b.width*2)
}else{b.x=c.width-b.width-20}}if(b.x<7){b.x=7}if(b.y<7){b.height+=b.y;b.y=7}if(b.height+b.y+35>=c.height){if(b.height+50>=c.height){b.y=SC.MenuPane.VERTICAL_OFFSET;
b.height=c.height-(SC.MenuPane.VERTICAL_OFFSET*2)}else{b.y+=(c.height-(b.height+b.y+35))
}}return b},fitPositionToScreenMenuPointer:function(c,e,b){e=this.fitPositionToScreenPointer(c,e,b);
if(e.height+e.y+35>=c.height){e.height=c.height-e.y-(SC.MenuPane.VERTICAL_OFFSET*2)
}return e},fitPositionToScreenPointer:function(p,n,o){var j=[this.pointerOffset[0],this.pointerOffset[1],this.pointerOffset[2],this.pointerOffset[3]];
var g=[[o.x+o.width+j[0],o.y+parseInt(o.height/2,0)-40],[o.x-n.width+j[1],o.y+parseInt(o.height/2,0)-40],[o.x+parseInt((o.width/2)-(n.width/2),0),o.y-n.height+j[2]],[o.x+parseInt((o.width/2)-(n.width/2),0),o.y+o.height+j[3]]];
var c=[[o.x+o.width+n.width+j[0],o.y+parseInt(o.height/2,0)+n.height-24],[o.x+j[1],o.y+parseInt(o.height/2,0)+n.height-24],[o.x+parseInt((o.width/2)-(n.width/2),0)+n.width,o.y+j[2]],[o.x+parseInt((o.width/2)-(n.width/2),0)+n.width,o.y+o.height+n.height+j[3]]];
var h=[[g[0][1]>0?0:0-g[0][1],c[0][0]<p.width?0:c[0][0]-p.width,c[0][1]<p.height?0:c[0][1]-p.height,g[0][0]>0?0:0-g[0][0]],[g[1][1]>0?0:0-g[1][1],c[1][0]<p.width?0:c[1][0]-p.width,c[1][1]<p.height?0:c[1][1]-p.height,g[1][0]>0?0:0-g[1][0]],[g[2][1]>0?0:0-g[2][1],c[2][0]<p.width?0:c[2][0]-p.width,c[2][1]<p.height?0:c[2][1]-p.height,g[2][0]>0?0:0-g[2][0]],[g[3][1]>0?0:0-g[3][1],c[3][0]<p.width?0:c[3][0]-p.width,c[3][1]<p.height?0:c[3][1]-p.height,g[3][0]>0?0:0-g[3][0]]];
var e=this.preferMatrix;if(e[4]===-1){n.x=o.x+parseInt(o.width/2,0);n.y=o.y+parseInt(o.height/2,0)-parseInt(n.height/2,0);
this.set("pointerPos",SC.POINTER_LAYOUT[0]+" fallback");this.set("pointerPosY",parseInt(n.height/2,0)-40)
}else{n.x=g[e[4]][0];n.y=g[e[4]][1];this.set("pointerPos",SC.POINTER_LAYOUT[e[4]]);
this.set("pointerPosY",0)}this.set("pointerPosX",0);for(var k=0,b,l=SC.POINTER_LAYOUT.length;
k<l;k++){b=e[k];if(h[b][0]===0&&h[b][1]===0&&h[b][2]===0&&h[b][3]===0){if(e[4]!==b){n.x=g[b][0];
n.y=g[b][1];this.set("pointerPosY",0);this.set("pointerPos",SC.POINTER_LAYOUT[b])
}k=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&h[b][0]===0&&h[b][1]===0&&h[b][2]<n.height-91&&h[b][3]===0){if(e[4]!==b){n.x=g[b][0];
this.set("pointerPos",SC.POINTER_LAYOUT[b])}n.y=g[b][1]-h[b][2];this.set("pointerPosY",h[b][2]);
k=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&h[b][0]===0&&h[b][1]===0&&h[b][2]<=n.height-51&&h[b][3]===0){if(e[4]!==b){n.x=g[b][0]
}n.y=g[b][1]-(n.height-51);this.set("pointerPosY",(n.height-53));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-low");
k=SC.POINTER_LAYOUT.length}else{if((b===2||b===3)&&h[b][0]===0&&h[b][1]<=parseInt(n.width/2,0)-this.get("extraRightOffset")&&h[b][2]===0&&h[b][3]===0){if(e[4]!==b){n.y=g[b][1]
}n.x=g[b][0]-(parseInt(n.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-right");
k=SC.POINTER_LAYOUT.length}else{if((b===2||b===3)&&h[b][0]===0&&h[b][1]===0&&h[b][2]===0&&h[b][3]<=parseInt(n.width/2,0)-this.get("extraRightOffset")){if(e[4]!==b){n.y=g[b][1]
}n.x=g[b][0]+(parseInt(n.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-left");
k=SC.POINTER_LAYOUT.length}}}}}}return n},setupPointer:function(g){var h=this.pointerOffset,f=SC.PickerPane;
if(!h||h.length!==4){if(this.get("preferType")==SC.PICKER_MENU_POINTER){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("pointerOffset",f.TINY_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.SMALL_CONTROL_SIZE:this.set("pointerOffset",f.SMALL_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.REGULAR_CONTROL_SIZE:this.set("pointerOffset",f.REGULAR_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.LARGE_CONTROL_SIZE:this.set("pointerOffset",f.LARGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.HUGE_CONTROL_SIZE:this.set("pointerOffset",f.HUGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break}}else{var e=(g.width<16)?((g.width<4)?9:6):0,b=(g.height<16)?((g.height<4)?9:6):0,c=f.PICKER_POINTER_OFFSET;
var j=[c[0]+e,c[1]-e,c[2]-b,c[3]+b];this.set("pointerOffset",j);this.set("extraRightOffset",f.PICKER_EXTRA_RIGHT_OFFSET)
}}if(!this.preferMatrix||this.preferMatrix.length!==5){this.set("preferMatrix",this.get("preferType")==SC.PICKER_MENU_POINTER?[3,0,1,2,3]:[0,1,2,3,2])
}},displayProperties:["pointerPosY"],render:function(b,e){var a=arguments.callee.base.apply(this,arguments);
if(b.needsContent){if(this.get("preferType")==SC.PICKER_POINTER||this.get("preferType")==SC.PICKER_MENU_POINTER){b.push('<div class="sc-pointer '+this.get("pointerPos")+'" style="margin-top: '+this.get("pointerPosY")+'px"></div>');
b.addClass(this.get("pointerPos"))}}else{if(this.get("preferType")==SC.PICKER_POINTER||this.get("preferType")==SC.PICKER_MENU_POINTER){var c=this.$(".sc-pointer");
c.attr("class","sc-pointer "+this.get("pointerPos"));c.attr("style","margin-top: "+this.get("pointerPosY")+"px");
b.addClass(this.get("pointerPos"))}}return a},modalPaneDidClick:function(a){var b=this.get("frame");
if(!this.clickInside(b,a)){this.remove()}return YES},mouseDown:function(a){return this.modalPaneDidClick(a)
},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)},windowSizeDidChange:function(b,a){this.positionPane()
}});SC.PickerPane.PICKER_POINTER_OFFSET=[9,-9,-18,18];SC.PickerPane.PICKER_EXTRA_RIGHT_OFFSET=20;
SC.PickerPane.TINY_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];SC.PickerPane.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;
SC.PickerPane.SMALL_PICKER_MENU_POINTER_OFFSET=[9,-9,-8,8];SC.PickerPane.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET=11;
SC.PickerPane.REGULAR_PICKER_MENU_POINTER_OFFSET=[9,-9,-12,12];SC.PickerPane.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET=13;
SC.PickerPane.LARGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-16,16];SC.PickerPane.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=17;
SC.PickerPane.HUGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];SC.PickerPane.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;
SC.SeparatorView=SC.View.extend({classNames:["sc-separator-view"],tagName:"span",layoutDirection:SC.LAYOUT_HORIZONTAL,render:function(a,b){if(b){a.push("<span></span>")
}a.addClass(this.get("layoutDirection"))}});sc_require("views/button");sc_require("views/separator");
SC.MenuItemView=SC.View.extend(SC.ContentDisplay,{classNames:["sc-menu-item"],escapeHTML:YES,acceptsFirstResponder:YES,blocksIEDeactivate:YES,blocksIEDeactivate:YES,content:null,isSeparator:function(){return this.getContentProperty("itemSeparatorKey")===YES
}.property("content").cacheable(),isEnabled:function(){return this.getContentProperty("itemIsEnabledKey")!==NO&&this.getContentProperty("itemSeparatorKey")!==YES
}.property("content.isEnabled").cacheable(),subMenu:function(){var c=this.get("content"),b,a;
if(!c){return null}a=this.get("parentMenu");b=c.get(a.itemSubMenuKey);if(b){if(SC.kindOf(b,SC.MenuPane)){b.set("isModal",NO);
b.set("isSubMenu",YES);b.set("parentMenu",a);return b}else{return SC.MenuPane.create({layout:{width:200},items:b,isModal:NO,isSubMenu:YES,parentMenu:a,controlSize:a.get("controlSize")})
}}return null}.property("content").cacheable(),hasSubMenu:function(){return !!this.get("subMenu")
}.property("subMenu").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.contentDidChange()},render:function(b,j){var c=this.get("content"),a,g,f=this.get("parentMenu"),e=this.get("itemWidth")||f.layout.width,h=this.get("itemHeight")||SC.DEFAULT_MENU_ITEM_HEIGHT;
this.set("itemWidth",e);this.set("itemHeight",h);b=b.begin("a").addClass("menu-item");
if(c.get(f.itemSeparatorKey)){b.push('<span class="separator"></span>');b.addClass("disabled")
}else{g=c.get(f.itemIconKey);if(g){this.renderImage(b,g);b.addClass("has-icon")}g=this.get("title");
if(SC.typeOf(g)!==SC.T_STRING){g=g.toString()}this.renderLabel(b,g);if(this.getContentProperty("itemCheckboxKey")){b.push('<div class="checkbox"></div>')
}if(this.get("hasSubMenu")){this.renderBranch(b)}g=this.getContentProperty("itemShortCutKey");
if(g){this.renderShortcut(b,g)}}b=b.end()},renderImage:function(b,e){var a,c;if(e&&SC.ImageView.valueIsUrl(e)){a=e;
c=""}else{c=e;a=SC.BLANK_IMAGE_URL}b.begin("img").addClass("image").addClass(c).attr("src",a).end()
},renderLabel:function(b,a){if(this.get("escapeHTML")){a=SC.RenderContext.escapeHTML(a)
}b.push("<span class='value ellipsis'>"+a+"</span>")},renderBranch:function(a){a.push('<span class="has-branch"></span>')
},renderShortcut:function(b,a){b.push('<span class = "shortcut">'+a+"</span>")},showSubMenu:function(){var a=this.get("subMenu");
if(a){a.set("mouseHasEntered",NO);a.popup(this,[0,0,0])}this._subMenuTimer=null},title:function(){var b=this.getContentProperty("itemTitleKey"),a=this.getPath("parentMenu.localize");
if(a&&b){b=b.loc()}return b||""}.property("content.title").cacheable(),getContentProperty:function(b){var a=this.get("content"),c=this.get("parentMenu");
if(a){return a.get(c.get(b))}},mouseUp:function(b){var a;a=this.getPath("parentMenu.rootMenu.targetMenuItem");
if(a){a.performAction()}return YES},performAction:function(){if(!this.get("isEnabled")||this.get("hasSubMenu")){return NO
}var b=this.getContentProperty("itemDisableMenuFlashKey"),a;if(b){this.sendAction()
}else{this._flashCounter=0;a=this.getPath("parentMenu.rootMenu");a._isFlashing=YES;
this.invokeLater(this.flashHighlight,25);this.invokeLater(this.sendAction,150)}return YES
},sendAction:function(){var c=this.getContentProperty("itemActionKey"),e=this.getContentProperty("itemTargetKey"),b=this.getPath("parentMenu.rootMenu"),a;
this.getPath("parentMenu.rootMenu").remove();b._isFlashing=NO;c=(c===undefined)?b.get("action"):c;
e=(e===undefined)?b.get("target"):e;b.set("selectedItem",this.get("content"));if(SC.typeOf(c)===SC.T_FUNCTION){c.apply(e,[b]);
SC.Logger.warn("Support for menu item action functions has been deprecated. Please use target and action.")
}else{a=this.getPath("pane.rootResponder")||SC.RootResponder.responder;if(a){a.sendAction(c,e,this)
}}},flashHighlight:function(){var a=this._flashCounter,b=this.$();if(a%2===0){b.addClass("focus")
}else{b.removeClass("focus")}if(a<=2){this.invokeLater(this.flashHighlight,50);this._flashCounter++
}},mouseDown:function(a){return YES},mouseEntered:function(a){var c=this.get("parentMenu"),b=c.get("rootMenu");
if(b._isFlashing){return}c.set("mouseHasEntered",YES);this.set("mouseHasEntered",YES);
c.set("currentMenuItem",this);if(this.get("isEnabled")){this.becomeFirstResponder()
}if(this.get("hasSubMenu")){this._subMenuTimer=this.invokeLater(this.showSubMenu,100)
}return YES},mouseExited:function(a){var b,c;if(this.get("hasSubMenu")){c=this._subMenuTimer;
if(c){c.invalidate()}else{this.invokeLater(this.checkMouseLocation,100)}}else{b=this.get("parentMenu");
if(b.get("currentMenuItem")===this){b.set("currentMenuItem",null)}}return YES},touchStart:function(a){this.mouseEntered(a);
return YES},touchEnd:function(a){return this.mouseUp(a)},touchEntered:function(a){return this.mouseEntered(a)
},touchExited:function(a){return this.mouseExited(a)},checkMouseLocation:function(){var b=this.get("subMenu"),c=this.get("parentMenu"),a,e;
if(!b.get("mouseHasEntered")){a=c.get("currentMenuItem");if(a===this||a===null){e=c.get("previousMenuItem");
if(e){e.resignFirstResponder()}this.resignFirstResponder();b.remove()}}},moveUp:function(b,a){var c=this.get("parentMenu");
if(c){c.moveUp(this)}return YES},moveDown:function(b,a){var c=this.get("parentMenu");
if(c){c.moveDown(this)}return YES},moveRight:function(b,a){this.showSubMenu();return YES
},insertText:function(b,a){var c=this.get("parentMenu");if(c){c.insertText(b,a)}},keyDown:function(a){return this.interpretKeyEvents(a)
},keyUp:function(a){return YES},cancel:function(a){this.getPath("parentMenu.rootMenu").remove();
return YES},didBecomeFirstResponder:function(a){if(a!==this){return}var b=this.get("parentMenu");
if(b){b.set("currentSelectedMenuItem",this)}},willLoseFirstResponder:function(a){if(a!==this){return
}var b=this.get("parentMenu");if(b){b.set("currentSelectedMenuItem",null);b.set("previousSelectedMenuItem",this)
}},insertNewline:function(b,a){this.mouseUp(a)},closeParent:function(){this.$().removeClass("focus");
var a=this.get("parentMenu");if(a){a.remove()}},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)
},contentDidChange:function(){var b=this.get("content"),a=this._content;if(b===a){return
}var c=this.contentPropertyDidChange;if(a&&a.removeObserver){a.removeObserver("*",this,c)
}this._content=b;if(b&&b.addObserver){b.addObserver("*",this,c)}this.contentPropertyDidChange(b,"*")
}.observes("content"),contentPropertyDidChange:function(h,k){var b=this.get("parentMenu");
if(!b){return}var a=SC.MenuItemView._contentPropertyToMenuItemPropertyMapping,j=SC.keys(a),f,g,e,c;
if(k==="*"){for(f=0,g=j.length;f<g;++f){e=j[f];c=a[e];this.notifyPropertyChange(c)
}}else{for(f=0,g=j.length;f<g;++f){e=j[f];if(b.get(e)===k){c=a[e];this.notifyPropertyChange(c)
}}}}});SC.MenuItemView._contentPropertyToMenuItemPropertyMapping={itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemSeparatorKey:"isSeparator",itemSubMenuKey:"subMenu"};
require("panes/picker");require("views/menu_item");SC.MenuPane=SC.PickerPane.extend({classNames:["sc-menu"],items:[],controlSize:SC.REGULAR_CONTROL_SIZE,itemHeight:null,itemSeparatorHeight:null,menuHeight:0,menuHeightPadding:null,submenuOffsetX:null,selectedItem:null,exampleView:SC.MenuItemView,anchor:null,isSubMenu:NO,localize:YES,acceptsMenuPane:YES,popup:function(b,c){var a;
this.beginPropertyChanges();if(b){a=b.isView?b.get("layer"):b}this.set("anchorElement",a);
this.set("anchor",b);if(c){this.set("preferMatrix",c)}this.adjust("height",this.get("menuHeight"));
this.positionPane();this.set("defaultResponder",this);this.endPropertyChanges();if(parseInt(SC.browser.msie,0)===7){this.invokeLast(this.append)
}else{this.append()}},remove:function(){var a=this.get("parentMenu");this.set("currentMenuItem",null);
this.closeOpenMenus();this.resignMenuPane();if(a){a.becomeMenuPane()}return arguments.callee.base.apply(this,arguments)
},itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemValueKey:"value",itemIconKey:"icon",itemHeightKey:"height",itemSubMenuKey:"subMenu",itemSeparatorKey:"separator",itemTargetKey:"target",itemActionKey:"action",itemCheckboxKey:"checkbox",itemShortCutKey:"shortcut",itemKeyEquivalentKey:"keyEquivalent",itemDisableMenuFlashKey:"disableMenuFlash",menuItemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemSeparatorKey itemActionKey itemCheckboxKey itemShortCutKey itemBranchKey itemHeightKey itemSubMenuKey itemKeyEquivalentKey itemTargetKey".w(),preferType:SC.PICKER_MENU,isModal:YES,_menuView:null,init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.TINY_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.TINY_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.TINY_SUBMENU_OFFSET_X);
break;case SC.SMALL_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.SMALL_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.SMALL_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.SMALL_SUBMENU_OFFSET_X);
break;case SC.REGULAR_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.REGULAR_SUBMENU_OFFSET_X);
break;case SC.LARGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.LARGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.LARGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.LARGE_SUBMENU_OFFSET_X);
break;case SC.HUGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.HUGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.HUGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.HUGE_SUBMENU_OFFSET_X);
break}return arguments.callee.base.apply(this,arguments)},setIfNull:function(a,b){if(this.get(a)===null){this.set(a,b)
}},render:function(a,b){a.addClass(this.get("controlSize"));return arguments.callee.base.apply(this,arguments)
},createChildViews:function(){var b,a,c;b=this.createChildView(SC.MenuScrollView,{borderStyle:SC.BORDER_NONE,controlSize:this.get("controlSize")});
a=this._menuView=SC.View.create();c=this.get("menuItemViews");a.set("layout",{top:0,left:0,height:this.get("menuHeight")});
a.replaceAllChildren(c);b.set("contentView",a);this.childViews=[b];return this},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();this._notifyDidAppendToDocument();this.becomeMenuPane();
return this},becomeMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(this)
}return this},resignMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(null)
}return this},menuItemViews:function(){var q=[],n=this.get("displayItems"),l=this.get("exampleView"),t,o,s,c,m,b,g,f,j,a,h,e,p,k;
if(!n){return q}c=this.get("itemHeightKey");m=this.get("itemSeparatorKey");b=this.get("itemHeight");
a=this.get("itemKeyEquivalentKey");g=this.get("itemSeparatorHeight");j=Math.floor(this.get("menuHeightPadding")/2);
f=j;e=this.menuItemKeys.map(SC._menu_fetchKeys,this);k=n.get("length");for(p=0;p<k;
p++){t=n[p];s=t.get(c);if(!s){s=t.get(m)?g:b}o=this._menuView.createChildView(l,{layout:{height:s,top:f},contentDisplayProperties:e,content:t,parentMenu:this});
q[p]=o;f+=s;h=t.get(a);if(h){this._keyEquivalents[h]=o}}this.set("menuHeight",f+j);
return q}.property("displayItems").cacheable(),menuItemViewForContentIndex:function(a){var b=this.get("menuItemViews");
if(!b){return undefined}return b.objectAt(a)},_keyEquivalents:{},rootMenu:function(){if(this.get("isSubMenu")){return this.getPath("parentMenu.rootMenu")
}return this}.property("isSubMenu").cacheable(),windowSizeDidChange:function(b,a){this.remove();
return arguments.callee.base.apply(this,arguments)},displayItems:function(){var e=this.get("items"),c=this.get("localize"),j=this.get("itemHeight"),b,f=[],a,g,h;
if(!e){return null}b=e.get("length");for(a=0;a<b;a++){g=e.objectAt(a);if(!g){continue
}h=SC.typeOf(g);if(h===SC.T_STRING){g=SC.Object.create({title:g,value:g,isEnabled:YES})
}else{if(h===SC.T_HASH){g=SC.Object.create(g)}else{if(h===SC.T_ARRAY){g=this.convertArrayMenuItemToObject(g)
}}}g.contentIndex=a;f.push(g)}return f}.property("items").cacheable(),_sc_menu_itemsDidChange:function(){var a=this.get("menuItemViews");
this._menuView.replaceAllChildren(a);this._menuView.adjust("height",this.get("menuHeight"))
}.observes("items"),convertArrayMenuItemToObject:function(g){SC.Logger.warn("Support for Array-based menu items has been deprecated.  Please update your menus to use a hash.");
var f,c=SC._menu_fetchKeys,b=SC._menu_fetchItem,j,e=SC.Object.create(),a,h;f=this.menuItemKeys.map(c,this);
e[f[0]]=g[0];e[f[1]]=g[1];e[f[2]]=g[2];e[f[3]]=g[3];e[f[4]]=g[4];e[f[5]]=g[5];e[f[6]]=g[6];
e[f[7]]=g[7];e[f[8]]=g[8];e[f[9]]=g[9];e[f[10]]=g[10];e[f[11]]=g[11];e[f[12]]=g[12];
return e},currentMenuItem:function(a,b){if(b!==undefined){if(this._currentMenuItem!==null){this.set("previousMenuItem",this._currentMenuItem)
}this._currentMenuItem=b;this.setPath("rootMenu.targetMenuItem",b);return b}return this._currentMenuItem
}.property().cacheable(),_sc_menu_currentMenuItemDidChange:function(){var a=this.get("currentMenuItem"),b=this.get("previousMenuItem");
if(b){if(b.get("hasSubMenu")&&a===null){}else{b.resignFirstResponder();this.closeOpenMenusFor(b)
}}if(a&&a.get("isEnabled")){a.scrollToVisible()}}.observes("currentMenuItem"),closeOpenMenusFor:function(a){if(!a){return
}var b=a.get("parentMenu");while(b&&a){b=a.get("subMenu");if(b){b.remove();a.resignFirstResponder();
a=b.get("previousMenuItem")}}},closeOpenMenus:function(){this.closeOpenMenusFor(this.get("previousMenuItem"))
},mouseDown:function(a){this.modalPaneDidClick();return YES},mouseEntered:function(a){this.set("mouseHasEntered",YES)
},keyUp:function(a){var b=this.interpretKeyEvents(a);return !b?NO:b},moveUp:function(){var c=this.get("currentMenuItem"),e=this.get("menuItemViews"),b,f,a;
if(!c){a=e.get("length")-1}else{b=c.getPath("content.contentIndex");if(b===0){return YES
}a=b-1}while(a>=0){if(e[a].get("isEnabled")){this.set("currentMenuItem",e[a]);e[a].becomeFirstResponder();
break}a--}return YES},moveDown:function(){var e=this.get("currentMenuItem"),f=this.get("menuItemViews"),b=f.get("length"),c,g,a;
if(!e){a=0}else{c=e.getPath("content.contentIndex");if(c===b){return YES}a=c+1}while(a<b){if(f[a].get("isEnabled")){this.set("currentMenuItem",f[a]);
f[a].becomeFirstResponder();break}a++}return YES},insertText:function(b,a){var e=this._timer,c=this._keyBuffer;
if(e){e.invalidate()}e=this._timer=SC.Timer.schedule({target:this,action:"clearKeyBuffer",interval:500,isPooled:NO});
c=c||"";c+=b.toUpperCase();this.selectMenuItemForString(c);this._keyBuffer=c;return YES
},performKeyEquivalent:function(b){var a=this._keyEquivalents[b];if(a){a.performAction(YES);
return YES}if(b==="escape"){this.remove();return YES}if(b==="return"){return YES}return NO
},selectMenuItemForString:function(c){var e=this.get("menuItemViews"),g,h,b,a,f;if(!e){return
}f=c.length;a=e.get("length");for(b=0;b<a;b++){g=e.objectAt(b);h=g.get("title");if(!h){continue
}h=h.replace(/ /g,"").substr(0,f).toUpperCase();if(h===c){this.set("currentMenuItem",g);
g.becomeFirstResponder();break}}},clearKeyBuffer:function(){this._keyBuffer=""},modalPaneDidClick:function(a){this.remove();
return YES}});SC._menu_fetchKeys=function(a){return this.get(a)};SC._menu_fetchItem=function(a){if(!a){return null
}return this.get?this.get(a):this[a]};SC.MenuPane.TINY_MENU_ITEM_HEIGHT=10;SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT=2;
SC.MenuPane.TINY_MENU_HEIGHT_PADDING=2;SC.MenuPane.TINY_SUBMENU_OFFSET_X=0;SC.MenuPane.SMALL_MENU_ITEM_HEIGHT=16;
SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT=7;SC.MenuPane.SMALL_MENU_HEIGHT_PADDING=4;
SC.MenuPane.SMALL_SUBMENU_OFFSET_X=2;SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT=20;SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT=9;
SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING=6;SC.MenuPane.REGULAR_SUBMENU_OFFSET_X=2;
SC.MenuPane.LARGE_MENU_ITEM_HEIGHT=60;SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT=20;
SC.MenuPane.LARGE_MENU_HEIGHT_PADDING=0;SC.MenuPane.LARGE_SUBMENU_OFFSET_X=4;SC.MenuPane.HUGE_MENU_ITEM_HEIGHT=20;
SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT=9;SC.MenuPane.HUGE_MENU_HEIGHT_PADDING=0;
SC.MenuPane.HUGE_SUBMENU_OFFSET_X=0;SC.MenuPane.VERTICAL_OFFSET=23;sc_require("views/button");
SC.SelectButtonView=SC.ButtonView.extend({escapeHTML:YES,objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,iconKey:null,isEnabledKey:"isEnabled",localize:YES,disableSort:YES,classNames:["select-button"],menu:null,itemList:[],itemIdx:null,value:null,checkboxEnabled:YES,separatorPostion:null,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","objects"],preferMatrix:null,SELECT_BUTTON_SPRITE_WIDTH:28,isActiveBinding:"*menu.isVisibleInWindow",isDefaultPosition:NO,lastMenuWidth:null,customView:null,customViewClassName:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,supportFocusRing:YES,leftAlign:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:return SC.SelectButtonView.TINY_OFFSET_X;
case SC.SMALL_CONTROL_SIZE:return SC.SelectButtonView.SMALL_OFFSET_X;case SC.REGULAR_CONTROL_SIZE:return SC.SelectButtonView.REGULAR_OFFSET_X;
case SC.LARGE_CONTROL_SIZE:return SC.SelectButtonView.LARGE_OFFSET_X;case SC.HUGE_CONTROL_SIZE:return SC.SelectButtonView.HUGE_OFFSET_X
}return 0}.property("controlSize"),sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];c=c.get?c.get(a):c[a]}return(e<c)?-1:((e>c)?1:0)
})}return b},render:function(b,f){arguments.callee.base.apply(this,arguments);var c,a,p,t,w,g,v,h,n,q,m,e,k,x,s,o,u,l,j;
c=this.layout.width;if(f&&c){this.adjust({width:c-this.SELECT_BUTTON_SPRITE_WIDTH})
}a=this.get("objects");a=this.sortObjects(a);p=a.length;t=this.get("nameKey");w=this.get("iconKey");
g=this.get("valueKey");j=this.get("isEnabledKey");v=this.get("checkboxEnabled");h=this.get("value");
n=this.get("localize");q=this.get("separatorPostion");m=[];e=YES;k=0;a.forEach(function(y){if(y){x=t?(y.get?y.get(t):y[t]):y.toString();
x=n?x.loc():x;s=w?(y.get?y.get(w):y[w]):null;if(SC.none(y[w])){s=null}o=(g)?(y.get?y.get(g):y[g]):y;
if(!SC.none(h)&&!SC.none(o)){if(h===o){this.set("title",x);this.set("icon",s)}}if(o===this.get("value")){this.set("itemIdx",k);
e=!v?NO:YES}else{e=NO}l=(j)?(y.get?y.get(j):y[j]):y;if(NO!==l){l=YES}if(k===0){this._defaultVal=o;
this._defaultTitle=x;this._defaultIcon=s}var z=SC.Object.create({title:x,icon:s,value:o,isEnabled:l,checkbox:e,target:this,action:"displaySelectedItem"});
m.push(z)}k+=1;if(q&&k===(p-q)){var A=SC.Object.create({separator:YES});m.push(A)
}this.set("itemList",m)},this);if(f){this.invokeLast(function(){var y=this.get("value");
if(SC.none(y)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this.itemIdx)
},_action:function(p){var k,a,m,n,v,s,C,f,B,c,q,w,t,z,g,h,o,b,A,j,l;k=this.$(".sc-button-label")[0];
var D=SC.SelectButtonView.MENU_WIDTH_OFFSET;if(!this.get("isDefaultPosition")){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:D+=SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET;
break;case SC.SMALL_CONTROL_SIZE:D+=SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET;
break;case SC.REGULAR_CONTROL_SIZE:D+=SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET;
break;case SC.LARGE_CONTROL_SIZE:D+=SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET;
break;case SC.HUGE_CONTROL_SIZE:D+=SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET;
break}}a=this.get("layer").offsetWidth+D;m=k.scrollWidth;n=this.get("lastMenuWidth");
if(m){v=k.offsetWidth;if(m&&v){a=a+m-v}}if(!n||(a>n)){n=a}s=this.get("itemList");
var x=this.get("customViewClassName");var u=this.get("customViewMenuOffsetWidth");
var e="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
e=x?(e+" "+x):e;j=(this.get("customView")||SC.MenuItemView).create();l=j.get("escapeHTML");
for(q=0,A=s.length;q<A;++q){B=s.objectAt(q);c=document.createElement("div");c.style.cssText="top:-10000px; left: -10000px;  position: absolute;";
c.className=e;c.innerHTML=l?SC.RenderContext.escapeHTML(B.title):B.title;document.body.appendChild(c);
C=c.offsetWidth+u;if(!f||(C>f)){f=C}document.body.removeChild(c)}f=(f>n)?f:n;var y=SC.RootResponder.responder.get("currentWindowSize").width;
if(f>y){f=(y-25)}this.set("lastMenuWidth",n);w=this.get("value");t=this.get("itemList");
z=this.get("controlSize");h=this.get("customView");o=h?h:SC.MenuItemView;b=SC.MenuPane.create({classNames:["select-button"],items:t,exampleView:o,isEnabled:YES,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:f},controlSize:z,itemWidth:n});
if(!b){return NO}b.popup(this,this.preferMatrix);this.set("menu",b);h=b.menuItemViewForContentIndex(this.get("itemIdx"));
b.set("currentMenuItem",h);h.becomeFirstResponder();this.set("isActive",YES);return YES
},displaySelectedItem:function(a){var b=this.getPath("menu.selectedItem");if(!b){return NO
}this.set("value",b.get("value"));this.set("title",b.get("title"));this.set("itemIdx",b.get("contentIndex"));
return YES},changeSelectButtonPreferMatrix:function(){var c=0,h=0;switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:c=SC.SelectButtonView.TINY_OFFSET_Y;
h=SC.MenuPane.TINY_MENU_ITEM_HEIGHT;break;case SC.SMALL_CONTROL_SIZE:c=SC.SelectButtonView.SMALL_OFFSET_Y;
h=SC.MenuPane.SMALL_MENU_ITEM_HEIGHT;break;case SC.REGULAR_CONTROL_SIZE:c=SC.SelectButtonView.REGULAR_OFFSET_Y;
h=SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT;break;case SC.LARGE_CONTROL_SIZE:c=SC.SelectButtonView.LARGE_OFFSET_Y;
h=SC.MenuPane.LARGE_MENU_ITEM_HEIGHT;break;case SC.HUGE_CONTROL_SIZE:c=SC.SelectButtonView.HUGE_OFFSET_Y;
h=SC.MenuPane.HUGE_MENU_ITEM_HEIGHT;break}var f=c,b=this.get("itemIdx"),a=this.get("leftAlign"),g,e;
if(this.get("isDefaultPosition")){g=[1,0,3];this.set("preferMatrix",g)}else{if(b){f=b*h+c
}e=[a,-f,2];this.set("preferMatrix",e)}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
this.invokeLast(this._recordMouseDownTimestamp);return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(b){var e=new Date().getTime(),c=this._menuRenderedTimestamp,f=this.get("menu"),g=SC.platform.touch,a;
if(f){a=f.getPath("rootMenu.targetMenuItem");if(a&&a.get("mouseHasEntered")){if(!a.performAction()){f.remove()
}}else{if(!g&&(e-c>SC.ButtonView.CLICK_AND_HOLD_DELAY)){if(!f.get("mouseHasEntered")&&!this.get("isDefaultPosition")){a=f.get("currentMenuItem");
if(a&&!a.performAction()){f.remove()}}else{f.remove()}}}}this._isMouseDown=NO;return YES
},mouseExited:function(){return YES},keyDown:function(a){if(this.interpretKeyEvents(a)){return YES
}else{arguments.callee.base.apply(this,arguments)}},interpretKeyEvents:function(a){if(a){if((a.keyCode===38||a.keyCode===40)){this._action()
}else{if(a.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
},acceptsFirstResponder:function(){return this.get("isEnabled")}.property("isEnabled"),_button_isSelectedDidChange:function(){}.observes("isSelected")});
SC.SelectButtonView.TINY_OFFSET_X=0;SC.SelectButtonView.TINY_OFFSET_Y=0;SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.SMALL_OFFSET_X=-18;SC.SelectButtonView.SMALL_OFFSET_Y=3;SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET=7;
SC.SelectButtonView.REGULAR_OFFSET_X=-17;SC.SelectButtonView.REGULAR_OFFSET_Y=3;SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET=4;
SC.SelectButtonView.LARGE_OFFSET_X=-17;SC.SelectButtonView.LARGE_OFFSET_Y=6;SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET=3;
SC.SelectButtonView.HUGE_OFFSET_X=0;SC.SelectButtonView.HUGE_OFFSET_Y=0;SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.MENU_WIDTH_OFFSET=-2;sc_require("panes/panel");SC.SheetPane=SC.PanelPane.extend({classNames:"sc-sheet",modalPane:SC.ModalPane,transitionDuration:200,_state:"NO_VIEW",init:function(){arguments.callee.base.apply(this,arguments);
if(SC.Animatable){SC.SheetPane.ANIMATABLE_AVAILABLE=YES;this.mixin(SC.Animatable);
if(!this.transitions){this.transitions={}}if(!this.transitions.top){this.transitions.top={duration:this.transitionDuration===200?0.3:this.transitionDuration/1000,action:"_complete",target:this}
}}},append:function(){var a=this.get("layout");if(!a.height||!a.top){a=SC.View.convertLayoutToAnchoredLayout(a,this.computeParentDimensions())
}a.top=-1*a.height;if(this.disableAnimation){this.disableAnimation()}this.adjust(a);
this.updateLayout();if(this.enableAnimation){this.enableAnimation()}return arguments.callee.base.apply(this,arguments)
},remove:function(){var b=this,a=arguments;this.invokeLater(function(){a.callee.base.apply(b,a)
},this.transitionDuration);this.slideUp();return this},paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.slideDown();return a},slideDown:function(){this._state=SC.SheetPane.ANIMATING;
this._direction=SC.SheetPane.SLIDE_DOWN;if(SC.SheetPane.ANIMATABLE_AVAILABLE){this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_OUT;
this.adjust("top",0)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},slideUp:function(){this._state=SC.SheetPane.ANIMATING;this._direction=SC.SheetPane.SLIDE_UP;
if(SC.SheetPane.ANIMATABLE_AVAILABLE){var a=this.get("layout");this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_IN;
this.adjust("top",-1*a.height)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},_complete:function(){var a=this._direction;if(a===SC.SheetPane.SLIDE_DOWN){if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",0)
}this.adjust({centerX:0,left:null});if(SC.browser.mozilla){this.parentViewDidChange()
}}else{var b=this.get("layout");if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",-1*b.height)
}}this._state=SC.SheetPane.READY;this.updateLayout()},blurTo:function(a){this.setFirstResponder("")
},tick:function(){this._timer=null;var b=Date.now();var f=(b-this._start)/(this._end-this._start),h=this,a=this._direction,c=this.get("layout"),e,g;
if(f<0){f=0}if(f>=1){this._complete();return this}g=Math.floor(c.height*f);if(a==SC.SheetPane.SLIDE_DOWN){h.adjust("top",0-(c.height-g))
}else{if(a==SC.SheetPane.SLIDE_UP){h.adjust("top",0-g)}}this._timer=this.invokeLater(this.tick,20);
h.updateLayout();return this}});SC.SheetPane.mixin({ANIMATABLE_AVAILABLE:NO,NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",SLIDE_DOWN:"SLIDEDOWN",SLIDE_UP:"SLIDEUP"});
SC.DRAG_LINK=4;SC.DRAG_COPY=1;SC.DRAG_MOVE=2;SC.DRAG_NONE=0;SC.DRAG_ANY=7;SC.DRAG_AUTOSCROLL_ZONE_THICKNESS=20;
SC.Drag=SC.Object.extend({source:null,ghostView:null,ghostActsLikeCursor:NO,dragView:null,ghost:YES,slideBack:YES,mouseDownEvent:null,ghostOffset:{x:0,y:0},location:{},dataTypes:function(){if(this.dataSource){return this.dataSource.get("dragDataTypes")||[]
}var e=this.data;if(e){var a=[];for(var b in e){if(e.hasOwnProperty(b)){a.push(b)
}}return a}var c=this.get("source");if(c&&c.dragDataTypes){return c.get("dragDataTypes")||[]
}return[]}.property().cacheable(),hasDataType:function(a){return(this.get("dataTypes").indexOf(a)>=0)
},dataForType:function(a){if(this.dataSource){return this.dataSource.dragDataForType(this,a)
}else{if(this.data){return this.data[a]}else{var b=this.get("source");if(b&&SC.typeOf(b.dragDataForType)==SC.T_FUNCTION){return b.dragDataForType(this,a)
}else{return null}}}},dataSource:null,data:null,allowedDragOperations:SC.DRAG_ANY,_dragInProgress:YES,_dragViewWasVisible:null,startDrag:function(){this._createGhostView();
var j=this.event;var f={x:j.pageX,y:j.pageY};this.set("location",f);var b=this._getDragView();
var k=b.get("parentView");var g=k?k.convertFrameToView(b.get("frame"),null):b.get("frame");
if(this.get("ghost")){this._dragViewWasVisible=b.get("isVisible");b.set("isVisible",NO)
}if(this.ghostActsLikeCursor){this.ghostOffset={x:14,y:14}}else{this.ghostOffset={x:(f.x-g.x),y:(f.y-g.y)}
}if(!this._ghostViewHidden){this._positionGhostView(j)}this.ghostView.rootResponder.dragDidStart(this);
var a=this.source;if(a&&a.dragDidBegin){a.dragDidBegin(this,f)}var c=this._dropTargets();
for(var h=0,e=c.length;h<e;h++){c[h].tryToPerform("dragStarted",this,j)}},mouseDragged:function(a){var b=this._autoscroll(a);
var g=this.get("location");if(!b&&(a.pageX===g.x)&&(a.pageY===g.y)){return}g={x:a.pageX,y:a.pageY};
this.set("location",g);var e=this.source;var c=this._lastTarget;var f=this._findDropTarget(a);
var h=SC.DRAG_NONE;while(f&&(f!==c)&&(h===SC.DRAG_NONE)){if(f&&e&&e.dragSourceOperationMaskFor){h=e.dragSourceOperationMaskFor(this,f)
}else{h=SC.DRAG_ANY}if((h!==SC.DRAG_NONE)&&f&&f.computeDragOperations){h=h&f.computeDragOperations(this,a,h)
}else{h=SC.DRAG_NONE}this.allowedDragOperations=h;if(h===SC.DRAG_NONE){f=this._findNextDropTarget(f)
}}if(f!==c){if(c&&c.dragExited){c.dragExited(this,a)}if(f){if(f.dragEntered){f.dragEntered(this,a)
}if(f.dragUpdated){f.dragUpdated(this,a)}}this._lastTarget=f}else{if(f&&f.dragUpdated){f.dragUpdated(this,a)
}}if(e&&e.dragDidMove){e.dragDidMove(this,g)}if(!this._ghostViewHidden){this._positionGhostView(a)
}},mouseUp:function(n){var h={x:n.pageX,y:n.pageY},j=this._lastTarget,f=this.allowedDragOperations;
this.set("location",h);try{if(j&&j.acceptDragOperation&&j.acceptDragOperation(this,f)){f=j.performDragOperation?j.performDragOperation(this,f):SC.DRAG_NONE
}else{f=SC.DRAG_NONE}}catch(k){console.error("Exception in SC.Drag.mouseUp(acceptDragOperation|performDragOperation): %@".fmt(k))
}try{if(j&&j.dragExited){j.dragExited(this,n)}}catch(l){console.error("Exception in SC.Drag.mouseUp(target.dragExited): %@".fmt(l))
}var c=this._dropTargets();for(var m=0,g=c.length;m<g;m++){try{c[m].tryToPerform("dragEnded",this,n)
}catch(b){console.error("Exception in SC.Drag.mouseUp(dragEnded on %@): %@".fmt(c[m],b))
}}this._destroyGhostView();if(this.get("ghost")){if(this._dragViewWasVisible){this._getDragView().set("isVisible",YES)
}this._dragViewWasVisible=null}var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,h,f)
}this._lastTarget=null;this._dragInProgress=NO},_getDragView:function(){if(!this.dragView){if(!this.source||!this.source.isView){throw"Source can't be used as dragView, because it's not a view."
}this.dragView=this.source}return this.dragView},_createGhostView:function(){var c=this,b=this._getDragView(),e=b.get("frame"),a;
a=this.ghostView=SC.Pane.create({classNames:["sc-ghost-view"],layout:{top:e.y,left:e.x,width:e.width,height:e.height},owner:this,didCreateLayer:function(){if(b){var f=b.get("layer");
if(f){f=f.cloneNode(true);f.style.top="0px";f.style.left="0px";this.get("layer").appendChild(f)
}}}});a.append()},_positionGhostView:function(a){var c=this.get("location");c.x-=this.ghostOffset.x;
c.y-=this.ghostOffset.y;var b=this.ghostView;if(b){b.adjust({top:c.y,left:c.x});b.invokeOnce("updateLayout")
}},_ghostViewHidden:NO,hideGhostView:function(){if(this.ghostView&&!this._ghostViewHidden){this.ghostView.remove();
this._ghostViewHidden=YES}},unhideGhostView:function(){if(this._ghostViewHidden){this._ghostViewHidden=NO;
this._createGhostView()}},_destroyGhostView:function(){if(this.ghostView){this.ghostView.remove();
this.ghostView=null;this._ghostViewHidden=NO}},_dropTargets:function(){if(this._cachedDropTargets){return this._cachedDropTargets
}var b=[];var e=SC.Drag._dropTargets;for(var c in e){if(e.hasOwnProperty(c)){b.push(e[c])
}}var g={};var f=SC.Drag._dropTargets;var a=function(h){if(!h){return 0}var k=SC.guidFor(h);
var j=g[k];if(!j){j=1;while(h=h.get("parentView")){if(f[SC.guidFor(h)]!==undefined){j++
}}g[k]=j}return j};b.sort(function(j,h){if(j===h){return 0}j=a(j);h=a(h);return(j>h)?-1:1
});this._cachedDropTargets=b;return b},_findDropTarget:function(c){var h={x:c.pageX,y:c.pageY};
var f,g;var e=this._dropTargets();for(var b=0,a=e.length;b<a;b++){f=e[b];if(!f.get("isVisibleInWindow")){continue
}g=f.convertFrameToView(f.get("clippingFrame"),null);if(SC.pointInRect(h,g)){return f
}}return null},_findNextDropTarget:function(a){var b=SC.Drag._dropTargets;while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a
}}return null},_autoscroll:function(n){if(!n){n=this._lastAutoscrollEvent}if(!this._dragInProgress){return NO
}var h=n?{x:n.pageX,y:n.pageY}:this.get("location"),j=this._findScrollableView(h),o=null,m,c,e,k,b,a,g;
while(j&&!o){m=j.get("canScrollVertical")?1:0;c=j.get("canScrollHorizontal")?1:0;
if(m||c){a=j.get("containerView");if(a){g=j.convertFrameToView(a.get("frame"),null)
}else{m=c=0}}if(m){k=SC.maxY(g);e=k-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=k){m=1
}else{e=SC.minY(g);k=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=k){m=-1}else{m=0
}}}if(c){k=SC.maxX(g);e=k-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=k){c=1
}else{e=SC.minX(g);k=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=k){c=-1}else{c=0
}}}if(m||c){o=j}else{j=this._findNextScrollableView(j)}}if(o&&(this._lastScrollableView===o)){if((Date.now()-this._hotzoneStartTime)>100){this._horizontalScrollAmount*=1.05;
this._verticalScrollAmount*=1.05}}else{this._lastScrollableView=o;this._horizontalScrollAmount=15;
this._verticalScrollAmount=15;this._hotzoneStartTime=(o)?Date.now():null;c=m=0}if(o&&(c||m)){var l={x:c*this._horizontalScrollAmount,y:m*this._verticalScrollAmount};
o.scrollBy(l)}if(o){if(n){this._lastAutoscrollEvent={pageX:n.pageX,pageY:n.pageY}
}this.invokeLater(this._autoscroll,100,null);return YES}else{this._lastAutoscrollEvent=null;
return NO}},_scrollableViews:function(){if(this._cachedScrollableView){return this._cachedScrollableView
}var a=[];var c=SC.Drag._scrollableViews;for(var b in c){if(c.hasOwnProperty(b)){a.push(c[b])
}}a=a.sort(function(g,e){var f=g;while(f=f.get("parentView")){if(e==f){return -1}}return 1
});this._cachedScrollableView=a;return a},_findScrollableView:function(g){var c=this._scrollableViews(),b=c?c.length:0,e,f,a;
for(a=0;a<b;a++){e=c[a];if(!e.get("isVisibleInWindow")){continue}f=e.convertFrameToView(e.get("clippingFrame"),null);
if(SC.pointInRect(g,f)){return e}}return null},_findNextScrollableView:function(a){var b=SC.Drag._scrollableViews;
while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a}}return null}});SC.Drag.mixin({start:function(b){var a=this.create(b);
a.startDrag();return a},_dropTargets:{},_scrollableViews:{},addDropTarget:function(a){this._dropTargets[SC.guidFor(a)]=a
},removeDropTarget:function(a){delete this._dropTargets[SC.guidFor(a)]},addScrollableView:function(a){this._scrollableViews[SC.guidFor(a)]=a
},removeScrollableView:function(a){delete this._scrollableViews[SC.guidFor(a)]}});
SC.MODIFIED_KEY_BINDINGS={"ctrl_.":"cancel",shift_tab:"insertBacktab",shift_left:"moveLeftAndModifySelection",shift_right:"moveRightAndModifySelection",shift_up:"moveUpAndModifySelection",shift_down:"moveDownAndModifySelection",alt_left:"moveLeftAndModifySelection",alt_right:"moveRightAndModifySelection",alt_up:"moveUpAndModifySelection",alt_down:"moveDownAndModifySelection",ctrl_a:"selectAll"};
SC.BASE_KEY_BINDINGS={escape:"cancel",backspace:"deleteBackward","delete":"deleteForward","return":"insertNewline",tab:"insertTab",left:"moveLeft",right:"moveRight",up:"moveUp",down:"moveDown",home:"moveToBeginningOfDocument",end:"moveToEndOfDocument",pagedown:"pageDown",pageup:"pageUp"};
require("core");SC.UndoManager=SC.Object.extend({undoActionName:function(){return this.undoStack?this.undoStack.name:null
}.property("undoStack"),redoActionName:function(){return this.redoStack?this.redoStack.name:null
}.property("redoStack"),canUndo:function(){return this.undoStack!=null}.property("undoStack"),canRedo:function(){return this.redoStack!=null
}.property("redoStack"),undo:function(){this._undoOrRedo("undoStack","isUndoing")
},redo:function(){this._undoOrRedo("redoStack","isRedoing")},isUndoing:false,isRedoing:false,groupingLevel:0,registerUndo:function(b,a){this.beginUndoGroup(a);
this._activeGroup.actions.push(b);this.endUndoGroup(a)},beginUndoGroup:function(b){if(this._activeGroup){this.groupingLevel++
}else{var a=this.isUndoing?"redoStack":"undoStack";this._activeGroup={name:b,actions:[],prev:this.get(a)};
this.set(a,this._activeGroup);this.groupingLevel=1}},endUndoGroup:function(a){if(!this._activeGroup){raise("endUndoGroup() called outside group.")
}if(this.groupingLevel>1){this.groupingLevel--}else{this._activeGroup=null;this.groupingLevel=0
}this.propertyDidChange(this.isUndoing?"redoStack":"undoStack")},setActionName:function(a){if(!this._activeGroup){raise("setActionName() called outside group.")
}this._activeGroup.name=a},_activeGroup:null,undoStack:null,redoStack:null,_undoOrRedo:function(a,c){if(this._activeGroup){return false
}if(this.get(a)==null){return true}this.set(c,true);var f=this.get(a);this.set(a,f.prev);
var b;var e=f.actions.length>1;if(e){this.beginUndoGroup(f.name)}while(b=f.actions.pop()){b()
}if(e){this.endUndoGroup(f.name)}this.set(c,false)}});SC.CheckboxView=SC.ButtonView.extend(SC.StaticLayout,SC.Button,{classNames:["sc-checkbox-view"],tagName:"label",needsEllipsis:NO,render:function(b,a){var c,e,k=this.get("value"),j=k===SC.MIXED_MODE?"mixed":(k===this.get("toggleOnValue")?"true":"false");
if(a){var g=SC.BLANK_IMAGE_URL,f=this.get("isEnabled")?"":'disabled="disabled"',h=SC.guidFor(this);
b.attr("role","checkbox");c=this._field_currentDisplayTitle=this.get("displayTitle");
if(SC.browser.msie){b.attr("for",h)}b.push('<span class="button" ></span>');if(this.get("needsEllipsis")){b.push('<span class="label ellipsis">',c,"</span>")
}else{b.push('<span class="label">',c,"</span>")}b.attr("name",h)}else{c=this.get("displayTitle");
if(c!==this._field_currentDisplayTitle){this._field_currentDisplayTitle=c;this.$("span.label").text(c)
}}b.attr("aria-checked",j)},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;if(a){a.allowDefault()}return YES
},mouseUp:function(a){if(!this.get("isEnabled")||(a&&a.target&&!this.$().within(a.target))){return YES
}var b=this.get("value");if(b===this.get("toggleOnValue")){this.$().attr("aria-checked","false");
this.set("value",this.get("toggleOffValue"))}else{this.$().attr("aria-checked","true");
this.set("value",this.get("toggleOnValue"))}this.set("isActive",NO);this._isMouseDown=NO;
return YES},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
}});SC.LIST_ITEM_ACTION_CANCEL="sc-list-item-cancel-action";SC.LIST_ITEM_ACTION_REFRESH="sc-list-item-cancel-refresh";
SC.LIST_ITEM_ACTION_EJECT="sc-list-item-cancel-eject";SC.ListItemView=SC.View.extend(SC.StaticLayout,SC.Control,{classNames:["sc-list-item-view"],content:null,hasContentIcon:NO,hasContentRightIcon:NO,hasContentBranch:NO,contentCheckboxKey:null,contentIconKey:null,contentRightIconKey:null,contentValueKey:null,escapeHTML:YES,contentUnreadCountKey:null,contentIsBranchKey:null,isEditing:NO,outlineIndent:16,outlineLevel:0,disclosureState:SC.LEAF_NODE,validator:null,contentPropertyDidChange:function(){if(this.get("contentIsEditable")!==this.contentIsEditable()){this.notifyPropertyChange("contentIsEditable")
}this.displayDidChange()},contentIsEditable:function(){var a=this.get("content");
return a&&(a.get?a.get("isEditable")!==NO:NO)}.property("content").cacheable(),render:function(c,a){var g=this.get("content"),o=this.displayDelegate,b=this.get("outlineLevel"),f=this.get("outlineIndent"),n,l,k,p=[];
p.push((this.get("contentIndex")%2===0)?"even":"odd");c.setClass("disabled",!this.get("isEnabled"));
k=c.begin("div").addClass("sc-outline");if(b>=0&&f>0){k.addStyle("left",f*(b+1))}l=this.get("disclosureState");
if(l!==SC.LEAF_NODE){this.renderDisclosure(k,l);p.push("has-disclosure")}n=this.getDelegateProperty("contentCheckboxKey",o);
if(n){l=g?(g.get?g.get(n):g[n]):NO;this.renderCheckbox(k,l);p.push("has-checkbox")
}if(this.getDelegateProperty("hasContentIcon",o)){n=this.getDelegateProperty("contentIconKey",o);
l=(n&&g)?(g.get?g.get(n):g[n]):null;this.renderIcon(k,l);p.push("has-icon")}n=this.getDelegateProperty("contentValueKey",o);
l=(n&&g)?(g.get?g.get(n):g[n]):g;if(l&&SC.typeOf(l)!==SC.T_STRING){l=l.toString()
}if(this.get("escapeHTML")){l=SC.RenderContext.escapeHTML(l)}this.renderLabel(k,l);
if(this.getDelegateProperty("hasContentRightIcon",o)){n=this.getDelegateProperty("contentRightIconKey",o);
l=(n&&g)?(g.get?g.get(n):g[n]):null;this.renderRightIcon(k,l);p.push("has-right-icon")
}n=this.getDelegateProperty("contentUnreadCountKey",o);l=(n&&g)?(g.get?g.get(n):g[n]):null;
if(!SC.none(l)&&(l!==0)){this.renderCount(k,l);var e=["zero","one","two","three","four","five"];
var m=l.toString().length;var j=e.length;var h=(m<j)?e[m]:e[j-1];p.push("has-count "+h+"-digit")
}n=this.getDelegateProperty("listItemActionProperty",o);l=(n&&g)?(g.get?g.get(n):g[n]):null;
if(l){this.renderAction(k,l);p.push("has-action")}if(this.getDelegateProperty("hasContentBranch",o)){n=this.getDelegateProperty("contentIsBranchKey",o);
l=(n&&g)?(g.get?g.get(n):g[n]):NO;this.renderBranch(k,l);p.push("has-branch")}c.addClass(p);
c=k.end()},renderDisclosure:function(f,g){var e=(g===SC.BRANCH_OPEN)?"open":"closed",a=this._scli_disclosureHtml,c,b;
if(!a){a=this.constructor.prototype._scli_disclosureHtml={}}c=a[e];if(!c){c=a[e]='<img src="'+SC.BLANK_IMAGE_URL+'" class="disclosure button '+e+'" />'
}f.push(c)},renderCheckbox:function(g,j){var f=(j===SC.MIXED_STATE)?"mixed":j?"sel":"nosel",b=this._scli_checkboxHtml,h=this.get("contentIsEditable")&&this.get("isEnabled"),e,c,a=[];
if(!h){f=SC.keyFor("disabled",f)}if(!b){b=this.constructor.prototype._scli_checkboxHtml={}
}e=b[f];if(!e){c=SC.RenderContext("div").attr("role","button").classNames(SC.clone(SC.CheckboxView.prototype.classNames));
if(j===SC.MIXED_STATE){a.push("mixed")}else{if(j){a.push("sel")}}if(!h){a.push("disabled")
}c.addClass(a);c.push('<span class="button"></span>');e=b[f]=c.join()}g.push(e)},renderIcon:function(c,f){var b=null,e=null,a=[];
if(f&&SC.ImageView.valueIsUrl(f)){b=f;e=""}else{e=f;b=SC.BLANK_IMAGE_URL}a.push(e,"icon");
c.begin("img").addClass(a).attr("src",b).end()},renderLabel:function(b,a){b.push("<label>",a||"","</label>")
},$label:function(){return this.$("label")},renderRightIcon:function(c,f){var b=null,e=null,a=[];
if(f&&SC.ImageView.valueIsUrl(f)){b=f;e=""}else{e=f;b=SC.BLANK_IMAGE_URL}a.push("right-icon",e);
c.begin("img").addClass(a).attr("src",b).end()},renderCount:function(a,b){a.push('<span class="count"><span class="inner">',b.toString(),"</span></span>")
},renderAction:function(a,b){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="action" />')
},renderBranch:function(c,b){var a=[];a.push("branch",b?"branch-visible":"branch-hidden");
c.begin("span").addClass(a).push("&nbsp;").end()},_isInsideElementWithClassName:function(f,a){var c=this.get("layer");
if(!c){return NO}var e=SC.$(a.target);var b=NO,g;while(!b&&e.length>0&&(e[0]!==c)){if(e.hasClass(f)){b=YES
}e=e.parent()}e=c=null;return b},_isInsideCheckbox:function(b){var a=this.displayDelegate;
var c=this.getDelegateProperty("contentCheckboxKey",a);return c&&this._isInsideElementWithClassName("sc-checkbox-view",b)
},_isInsideDisclosure:function(a){if(this.get("disclosureState")===SC.LEAF_NODE){return NO
}return this._isInsideElementWithClassName("disclosure",a)},_isInsideRightIcon:function(c){var b=this.displayDelegate;
var a=this.getDelegateProperty("hasContentRightIcon",b);return a&&this._isInsideElementWithClassName("right-icon",c)
},mouseDown:function(a){if(!this.get("contentIsEditable")){return NO}if(this._isInsideCheckbox(a)){this._addCheckboxActiveState();
this._isMouseDownOnCheckbox=YES;this._isMouseInsideCheckbox=YES;return YES}else{if(this._isInsideDisclosure(a)){this._addDisclosureActiveState();
this._isMouseDownOnDisclosure=YES;this._isMouseInsideDisclosure=YES;return YES}else{if(this._isInsideRightIcon(a)){this._addRightIconActiveState();
this._isMouseDownOnRightIcon=YES;this._isMouseInsideRightIcon=YES;return YES}}}return NO
},mouseUp:function(j){var c=NO,k,e,b,a,h,g;if(this._isMouseDownOnCheckbox){if(this._isInsideCheckbox(j)){k=this.displayDelegate;
e=this.getDelegateProperty("contentCheckboxKey",k);b=this.get("content");if(b&&b.get){var f=b.get(e);
f=(f===SC.MIXED_STATE)?YES:!f;b.set(e,f);this.displayDidChange()}}this._removeCheckboxActiveState();
c=YES}else{if(this._isMouseDownOnDisclosure){if(this._isInsideDisclosure(j)){a=this.get("disclosureState");
h=this.get("contentIndex");g=(!SC.none(h))?SC.IndexSet.create(h):null;k=this.get("displayDelegate");
if(a===SC.BRANCH_OPEN){if(g&&k&&k.collapse){k.collapse(g)}else{this.set("disclosureState",SC.BRANCH_CLOSED)
}this.displayDidChange()}else{if(a===SC.BRANCH_CLOSED){if(g&&k&&k.expand){k.expand(g)
}else{this.set("disclosureState",SC.BRANCH_OPEN)}this.displayDidChange()}}}this._removeDisclosureActiveState();
c=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();c=YES
}}}this._isMouseInsideCheckbox=this._isMouseDownOnCheckbox=NO;this._isMouseDownOnDisclosure=this._isMouseInsideDisclosure=NO;
this._isMouseInsideRightIcon=this._isMouseDownOnRightIcon=NO;return c},mouseMoved:function(a){if(this._isMouseDownOnCheckbox&&this._isInsideCheckbox(a)){this._addCheckboxActiveState();
this._isMouseInsideCheckbox=YES}else{if(this._isMouseDownOnCheckbox){this._removeCheckboxActiveState();
this._isMouseInsideCheckbox=NO}else{if(this._isMouseDownOnDisclosure&&this._isInsideDisclosure(a)){this._addDisclosureActiveState();
this._isMouseInsideDisclosure=YES}else{if(this._isMouseDownOnDisclosure){this._removeDisclosureActiveState();
this._isMouseInsideDisclosure=NO}else{if(this._isMouseDownOnRightIcon&&this._isInsideRightIcon(a)){this._addRightIconActiveState();
this._isMouseInsideRightIcon=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();
this._isMouseInsideRightIcon=NO}}}}}}return NO},touchStart:function(a){return this.mouseDown(a)
},touchEnd:function(a){return this.mouseUp(a)},touchEntered:function(a){return this.mouseEntered(a)
},touchExited:function(a){return this.mouseExited(a)},_addCheckboxActiveState:function(){var a=this.get("isEnabled");
this.$(".sc-checkbox-view").setClass("active",a)},_removeCheckboxActiveState:function(){this.$(".sc-checkbox-view").removeClass("active")
},_addDisclosureActiveState:function(){var a=this.get("isEnabled");this.$("img.disclosure").setClass("active",a)
},_removeDisclosureActiveState:function(){this.$("img.disclosure").removeClass("active")
},_addRightIconActiveState:function(){this.$("img.right-icon").setClass("active",YES)
},_removeRightIconActiveState:function(){this.$("img.right-icon").removeClass("active")
},contentHitTest:function(b){var a=this.displayDelegate;var c=this.getDelegateProperty("contentValueKey",a);
if(!c){return NO}var f=this.$label()[0];if(!f){return NO}var g=b.target,e=this.get("layer");
while(g&&(g!==e)&&(g!==window)){if(g===f){return YES}g=g.parentNode}return NO},beginEditing:function(){if(this.get("isEditing")){return YES
}return this._beginEditing(YES)},_beginEditing:function(y){var s=this.get("content"),j=this.get("displayDelegate"),h=this.getDelegateProperty("contentValueKey",j),k=this.get("parentView"),x=k?k.get("frame"):null,a=this.$label(),e=this.get("validator"),u,m,g,n,b,p,c,q,w,t,z;
if(y&&this.scrollToVisible()){var l=this.get("owner"),o=this.get("contentIndex");
this.invokeLast(function(){var f=l.itemViewForContentIndex(o);if(f&&f._beginEditing){f._beginEditing(NO)
}});return YES}if(!k||!a||a.get("length")===0){return NO}m=(h&&s&&s.get)?s.get(h):null;
u=this.computeFrameWithParentFrame(null);g=SC.viewportOffset(a[0]);n=a.css("lineHeight");
b=a.css("fontSize");p=this.$().css("top");if(p){p=parseInt(p.substring(0,p.length-2),0)
}else{p=0}c=n;w=0;if(b&&c){t=b*1.5;if(t<c){a.css({lineHeight:"1.5"});w=(c-t)/2}else{n=null
}}u.x=g.x;u.y=g.y+p+w;u.height=a[0].offsetHeight;u.width=a[0].offsetWidth;q=this.get("escapeHTML");
z=SC.InlineTextFieldView.beginEditing({frame:u,exampleElement:a,delegate:this,value:m,multiline:NO,isCollection:YES,validator:e,escapeHTML:q});
if(n){a.css({lineHeight:n})}return z},commitEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.commitEditing()},discardEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.discardEditing()},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)
},inlineEditorDidBeginEditing:function(b){var a=this.$label();this._oldOpacity=a.css("opacity");
a.css("opacity",0)},inlineEditorShouldBeginEditing:function(a){return YES},inlineEditorShouldBeginEditing:function(a,b){return YES
},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(c,f){this.set("isEditing",NO);
var e=this.get("content");var a=this.displayDelegate;var b=this.getDelegateProperty("contentValueKey",a);
if(b&&e&&e.set){e.set(b,f)}this.displayDidChange()}});sc_require("mixins/collection_view_delegate");
sc_require("views/list_item");SC.DRAG_REORDER=16;SC.HORIZONTAL_ORIENTATION="horizontal";
SC.VERTICAL_ORIENTATION="vertical";SC.BENCHMARK_RELOAD=NO;SC.CollectionView=SC.View.extend(SC.CollectionViewDelegate,SC.CollectionContent,{classNames:["sc-collection-view"],ACTION_DELAY:200,useFastPath:NO,content:null,contentBindingDefault:SC.Binding.multiple(),length:0,nowShowing:function(){return this.computeNowShowing()
}.property("length","clippingFrame").cacheable(),selection:null,isSelectable:YES,isSelectableBindingDefault:SC.Binding.bool(),isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),isEditable:YES,isEditableBindingDefault:SC.Binding.bool(),canReorderContent:NO,canReorderContentBindingDefault:SC.Binding.bool(),canDeleteContent:NO,canDeleteContentBindingDefault:SC.Binding.bool(),canEditContent:NO,canEditContentBindingDefault:SC.Binding.bool(),isDropTarget:NO,useToggleSelection:NO,actOnSelect:NO,selectOnMouseDown:YES,exampleView:SC.ListItemView,contentExampleViewKey:null,groupExampleView:null,contentGroupExampleViewKey:null,action:null,target:null,contentValueKey:null,acceptsFirstResponder:NO,isActive:NO,calculatedHeight:0,calculatedWidth:0,computeLayout:function(){return null
},layoutForContentIndex:function(a){return null},allContentIndexes:function(){return SC.IndexSet.create(0,this.get("length")).freeze()
}.property("length").cacheable(),contentIndexesInRect:function(a){return null},computeNowShowing:function(){var c=this.contentIndexesInRect(this.get("clippingFrame"));
if(!c){c=this.get("allContentIndexes")}else{var b=this.get("length"),a=c.get("max");
if(a>b){c=c.copy().remove(b,a-b).freeze()}}return c},showInsertionPoint:function(a,b){},hideInsertionPoint:function(){},delegate:null,selectionDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionViewDelegate",a,b)}.property("delegate","content").cacheable(),contentDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionContent",a,b)}.property("delegate","content").cacheable(),_contentGroupIndexes:function(){return this.get("contentDelegate").contentGroupIndexes(this,this.get("content"))
}.property("contentDelegate","content").cacheable(),contentRangeDidChange:function(e,b,c,a){if(!b&&(c==="[]")){this.notifyPropertyChange("_contentGroupIndexes");
this.reload(a)}else{this.contentPropertyDidChange(b,c,a)}},contentPropertyDidChange:function(c,b,a){},updateContentRangeObserver:function(){var e=this.get("nowShowing"),a=this._cv_contentRangeObserver,c=this.get("content");
if(!c){return}if(a){c.updateRangeObserver(a,e)}else{var b=this.contentRangeDidChange;
a=c.addRangeObserver(e,this,b,null);this._cv_contentRangeObserver=a}},removeContentRangeObserver:function(){var b=this.get("content"),a=this._cv_contentRangeObserver;
if(a){if(b){b.removeRangeObserver(a)}this._cv_contentRangeObserver=null}},contentLengthDidChange:function(){var a=this.get("content");
this.set("length",a?a.get("length"):0)},_cv_contentDidChange:function(){var b=this.get("content"),a=this.contentLengthDidChange;
if(b===this._content){return}this.removeContentRangeObserver();if(this._content){this._content.removeObserver("length",this,a)
}this._content=b;if(b){b.addObserver("length",this,a)}this.contentLengthDidChange();
this.contentRangeDidChange(b,null,"[]",null)}.observes("content"),_invalidIndexes:NO,reload:function(a){var b=this._invalidIndexes;
if(a&&b!==YES){if(b){b.add(a)}else{b=this._invalidIndexes=a.clone()}}else{this._invalidIndexes=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadIfNeeded)}return this
},reloadIfNeeded:function(){var z=this._invalidIndexes;if(!z||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;var w=this.get("content"),x,y,o,B=this.computeLayout(),A=SC.BENCHMARK_RELOAD,c=this.get("nowShowing"),C=this._sc_itemViews,p=this.get("containerView")||this,a,t,v,u,m,q,j,s,f,n,l,D,e,b,h,k,g;
if(z.isIndexSet&&z.contains(c)){z=YES}if(this.willReload){this.willReload(z===YES?null:z)
}a=this.get("exampleView");v=a?a.isReusableInCollections:NO;t=this.get("groupExampleView");
u=t?t.isReusableInCollections:NO;if(z.isIndexSet){if(A){SC.Benchmark.start(A="%@#reloadIfNeeded (Partial)".fmt(this),YES)
}q=[];j=[];s=[];z.forEach(function(E){o=C?C[E]:null;if(c.contains(E)){if(o&&o.parentView===p){j.push(E)
}else{s.push(E)}}else{if(o&&o.parentView===p){q.push(E)}}},this);for(x=0,y=q.length;
x<y;++x){n=q[x];o=C?C[n]:null;delete C[n];h=this.get("contentDelegate");k=this.get("_contentGroupIndexes");
g=k&&k.contains(n);if(g){g=h.contentIndexIsGroup(this,w,n)}m=g?u:v;if(m){b=g?this._GROUP_VIEW_POOL:this._VIEW_POOL;
b.push(o);o.destroyLayer()}p.removeChild(o)}for(x=0,y=j.length;x<y;++x){n=j[x];o=C?C[n]:null;
l=this.itemViewForContentIndex(n,YES);o.destroyLayer();p.replaceChild(l,o)}for(x=0,y=s.length;
x<y;++x){n=s[x];l=this.itemViewForContentIndex(n,YES);p.insertBefore(l,null)}if(A){SC.Benchmark.end(A)
}}else{if(A){SC.Benchmark.start(A="%@#reloadIfNeeded (Full)".fmt(this),YES)}if(C){C.length=0
}f=p.get("childViews");if(f){f=f.copy()}p.beginPropertyChanges();if(this.willRemoveAllChildren){this.willRemoveAllChildren()
}p.destroyLayer().removeAllChildren();if(f){for(x=0,y=f.length;x<y;++x){l=f[x];g=l.get("isGroupView");
m=g?u:v;if(m){b=g?this._GROUP_VIEW_POOL:this._VIEW_POOL;b.push(l);l.destroyLayer()
}}}f=[];c.forEach(function(E){f.push(this.itemViewForContentIndex(E,YES))},this);
p.set("childViews",f);p.replaceLayer();p.endPropertyChanges();if(A){SC.Benchmark.end(A)
}}if(B){this.adjust(B)}if(this.didReload){this.didReload(z===YES?null:z)}return this
},displayProperties:"isFirstResponder isEnabled isActive".w(),render:function(a,b){a.setClass("focus",this.get("isFirstResponder"));
a.setClass("disabled",!this.get("isEnabled"));a.setClass("active",this.get("isActive"));
return arguments.callee.base.apply(this,arguments)},_TMP_ATTRS:{},_COLLECTION_CLASS_NAMES:"sc-collection-item".w(),_GROUP_COLLECTION_CLASS_NAMES:"sc-collection-item sc-group-item".w(),_VIEW_POOL:null,_GROUP_VIEW_POOL:null,itemViewForContentIndex:function(n,a){var y;
var x=this._sc_itemViews;if(!x){x=this._sc_itemViews=[]}else{if(!a&&(y=x[n])){return y
}}var p=this.get("content"),s=p.objectAt(n),j=this.get("contentDelegate"),l=this.get("_contentGroupIndexes"),k=NO,z,m,t,g,u,e,b,c,w,h,f,q,v;
k=l&&l.contains(n);if(k){k=j.contentIndexIsGroup(this,p,n)}if(k){z=this.get("contentGroupExampleViewKey");
if(z&&s){m=s.get(z)}if(!m){m=this.get("groupExampleView")||this.get("exampleView")
}u="_GROUP_VIEW_POOL"}else{z=this.get("contentExampleViewKey");if(z&&s){m=s.get(z)
}if(!m){m=this.get("exampleView")}u="_VIEW_POOL"}c=this.get("containerView")||this;
g=this.layerIdFor(n);w=j.contentIndexIsEnabled(this,p,n);h=j.contentIndexIsSelected(this,p,n);
f=j.contentIndexOutlineLevel(this,p,n);q=j.contentIndexDisclosureState(this,p,n);
v=this.isVisibleInWindow;t=this.layoutForContentIndex(n);if(m&&m.isReusableInCollections){e=this[u];
if(!e){e=this[u]=[]}if(e.length>0){y=e.pop();b=y.prepareForReuse;if(b){b.call(y)}y.beginPropertyChanges();
y.set("contentIndex",n);y.set("layerId",g);y.set("isEnabled",w);y.set("isSelected",h);
y.set("outlineLevel",f);y.set("disclosureState",q);y.set("isVisibleInWindow",v);y.set("parentView",c);
SC.View.views[g]=y;if(t){y.set("layout",t)}else{y.set("layout",m.prototype.layout)
}y.set("content",s);y.endPropertyChanges()}}if(!y){var o=this._TMP_ATTRS;o.contentIndex=n;
o.content=s;o.owner=o.displayDelegate=this;o.parentView=c;o.page=this.page;o.layerId=g;
o.isEnabled=w;o.isSelected=h;o.outlineLevel=f;o.disclosureState=q;o.isGroupView=k;
o.isVisibleInWindow=v;if(k){o.classNames=this._GROUP_COLLECTION_CLASS_NAMES}else{o.classNames=this._COLLECTION_CLASS_NAMES
}if(t){o.layout=t}else{delete o.layout}y=this.createItemView(m,n,o)}x[n]=y;return y
},itemViewForContentObject:function(a){return this.itemViewForContentIndex(this.get("content").indexOf(a))
},_TMP_LAYERID:[],createItemView:function(c,a,b){return c.create(b)},layerIdFor:function(a){var b=this._TMP_LAYERID;
b[0]=SC.guidFor(this);b[1]=a;return b.join("-")},contentIndexForLayerId:function(c){if(!c||!(c=c.toString())){return null
}var b=this._baseLayerId;if(!b){b=this._baseLayerId=SC.guidFor(this)+"-"}if((c.length<=b.length)||(c.indexOf(b)!==0)){return null
}var a=Number(c.slice(c.lastIndexOf("-")+1));return isNaN(a)?null:a},itemViewForEvent:function(l){var e=this.getPath("pane.rootResponder");
if(!e){return null}var c=SC.guidFor(this)+"-",a=c.length,f=l.target,h=this.get("layer"),g=null,b,k,j;
while(f&&f!==document&&f!==h){b=f?SC.$(f).attr("id"):null;if(b&&(g=this.contentIndexForLayerId(b))!==null){break
}f=f.parentNode}if(g===null||(f===h)){f=h=null;return null}if(g>=this.get("length")){throw"layout for item view %@ was found when item view does not exist (%@)".fmt(b,this)
}return this.itemViewForContentIndex(g)},expand:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(e){var f=a.contentIndexDisclosureState(this,c,e);if(f===SC.BRANCH_CLOSED){a.contentIndexExpand(this,c,e)
}},this);return this},collapse:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(e){var f=a.contentIndexDisclosureState(this,c,e);if(f===SC.BRANCH_OPEN){a.contentIndexCollapse(this,c,e)
}},this);return this},_cv_selectionDidChange:function(){var c=this.get("selection"),b=this._cv_selection,a=this._cv_selectionContentDidChange;
if(c===b){return}if(b){b.removeObserver("[]",this,a)}if(c){c.addObserver("[]",this,a)
}this._cv_selection=c;this._cv_selectionContentDidChange()}.observes("selection"),_cv_selectionContentDidChange:function(){var c=this.get("selection"),b=this._cv_selindexes,a=this.get("content"),e;
this._cv_selindexes=c?c.frozenCopy():null;if(b){b=b.indexSetForSource(a)}if(c){c=c.indexSetForSource(a)
}if(c&&b){e=c.without(b).add(b.without(c))}else{e=c||b}if(e&&e.get("length")>0){this.reloadSelectionIndexes(e)
}},_invalidSelection:NO,reloadSelectionIndexes:function(a){var b=this._invalidSelection;
if(a&&(b!==YES)){if(b){b.add(a)}else{b=this._invalidSelection=a.copy()}}else{this._invalidSelection=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)
}return this},reloadSelectionIndexesIfNeeded:function(){var f=this._invalidSelection;
if(!f||!this.get("isVisibleInWindow")){return this}var e=this.get("nowShowing"),b=this._invalidIndexes,a=this.get("content"),c=this.get("selection");
this._invalidSelection=NO;if(b===YES||!e){return this}if(f===YES){f=e}if(b&&b.isIndexSet){f=f.without(b)
}f.forEach(function(g){if(!e.contains(g)){return}var h=this.itemViewForContentIndex(g,NO);
if(h){h.set("isSelected",c?c.contains(a,g):NO)}},this);return this},select:function(c,g){var e=this.get("content"),a=this.get("selectionDelegate"),b=this.get("_contentGroupIndexes"),f;
if(!this.get("isSelectable")){return this}if(SC.typeOf(c)===SC.T_NUMBER){c=SC.IndexSet.create(c,1)
}if(c&&c.get("length")>0){if(b&&b.get("length")>0){c=c.copy().remove(b)}c=a.collectionViewShouldSelectIndexes(this,c,g);
if(!c||c.get("length")===0){return this}}else{c=null}if(g&&(f=this.get("selection"))){f=f.copy()
}else{f=SC.SelectionSet.create()}if(c&&c.get("length")>0){if(c.get("length")===1){f.addObject(e.objectAt(c.get("firstObject")))
}else{f.add(e,c)}}f=a.collectionViewSelectionForProposedSelection(this,f);if(!f){f=SC.SelectionSet.create()
}this._selectionAnchor=null;this.set("selection",f.freeze());return this},deselect:function(b){var e=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate");
if(!this.get("isSelectable")){return this}if(!e||e.get("length")===0){return this
}if(SC.typeOf(b)===SC.T_NUMBER){b=SC.IndexSet.create(b,1)}b=a.collectionViewShouldDeselectIndexes(this,b);
if(!b||b.get("length")===0){return this}e=e.copy().remove(c,b);e=a.collectionViewSelectionForProposedSelection(this,e);
if(!e){e=SC.SelectionSet.create()}this.set("selection",e.freeze());return this},_findNextSelectableItemFromIndex:function(j,a){var c=this.get("length"),e=SC.IndexSet.create(),f=this.get("content"),k=this.get("selectionDelegate"),h=this.get("_contentGroupIndexes"),g,b;
if(!h&&(k.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return j
}while(j<c){if(!h||!h.contains(j)){e.add(j);g=k.collectionViewShouldSelectIndexes(this,e);
if(g&&g.get("length")>=1){return j}e.remove(j)}j++}if(a===undefined){b=this.get("selection");
a=b?b.get("max"):-1}return a},_findPreviousSelectableItemFromIndex:function(b,j){var c=SC.IndexSet.create(),g=this.get("content"),a=this.get("selectionDelegate"),f=this.get("_contentGroupIndexes"),e;
if(SC.none(b)){b=-1}if(!f&&(a.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return b
}while(b>=0){if(!f||!f.contains(b)){c.add(b);e=a.collectionViewShouldSelectIndexes(this,c);
if(e&&e.get("length")>=1){return b}c.remove(b)}b--}if(j===undefined){var h=this.get("selection");
j=h?h.get("min"):-1}if(SC.none(j)){j=-1}return j},selectPreviousItem:function(j,b){if(SC.none(b)){b=1
}if(SC.none(j)){j=false}var g=this.get("selection"),f=this.get("content");if(g){g=g.indexSetForSource(f)
}var h=g?g.get("min"):-1,a=g?g.get("max")-1:-1,e=this._selectionAnchor;if(SC.none(e)){e=h
}if(j){if(a>e){a=a-b}else{h=this._findPreviousSelectableItemFromIndex(h-b)}if(SC.none(h)||(h<0)){h=0
}if(a<h){a=h}}else{h=this._findPreviousSelectableItemFromIndex(h-b);if(SC.none(h)||(h<0)){h=0
}a=h;e=null}var c=h;g=SC.IndexSet.create(h,a+1-h);this.scrollToContentIndex(c);this.select(g);
this._selectionAnchor=e;return this},selectNextItem:function(j,k){if(SC.none(k)){k=1
}if(SC.none(j)){j=false}var b=this.get("selection"),h=this.get("content");if(b){b=b.indexSetForSource(h)
}var a=b?b.get("min"):-1,e=b?b.get("max")-1:-1,f=this._selectionAnchor,c=this.get("length");
if(SC.none(f)){f=a}if(j){if(a<f){a=a+k}else{e=this._findNextSelectableItemFromIndex(e+k,e)
}if(e>=c){e=c-1}if(a>e){a=e}}else{e=this._findNextSelectableItemFromIndex(e+k,e);
if(e>=c){e=c-1}a=e;f=null}var g=e;b=SC.IndexSet.create(a,e-a+1);this.scrollToContentIndex(g);
this.select(b);this._selectionAnchor=f;return this},deleteSelection:function(){if(!this.get("canDeleteContent")){return NO
}var e=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate"),b=e&&c?e.indexSetForSource(c):null;
if(!c||!b||b.get("length")===0){return NO}b=a.collectionViewShouldDeleteIndexes(this,b);
if(!b||b.get("length")===0){return NO}a.collectionViewDeleteContent(this,this.get("content"),b);
return YES},scrollToContentIndex:function(b){var a=this.itemViewForContentIndex(b);
if(a){this.scrollToItemView(a)}return this},scrollToItemView:function(a){if(a){a.scrollToVisible()
}return this},keyDown:function(a){var b=this.interpretKeyEvents(a);return !b?NO:b
},keyUp:function(){return true},insertText:function(b,a){if(b===" "){var c=this.get("selection");
if(c&&c.get("length")>0){this.invokeLater(this._cv_action,0,null,a)}return YES}else{return NO
}},selectAll:function(a){var b=this.get("content"),c=b?SC.IndexSet.create(0,b.get("length")):null;
this.select(c,NO);return YES},deleteBackward:function(a){return this.deleteSelection()
},deleteForward:function(a){return this.deleteSelection()},moveDown:function(b,a){this.selectNextItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUp:function(b,a){this.selectPreviousItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeft:function(m){if(m.ctrlKey||m.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(false,1);this._cv_performSelectAction(null,m,this.ACTION_DELAY)
}else{var c=this.get("selection"),k=this.get("content"),h=c?c.indexSetForSource(k):null;
if(h){var n=undefined,g=false,j=undefined;if(h.get("length")===1){j=h.get("firstObject");
n=this.get("contentDelegate");var b=n.contentIndexDisclosureState(this,k,j);if(b!==SC.BRANCH_OPEN){g=true
}}if(g){var a=n.contentIndexOutlineLevel(this,k,j)-1;if(a>=0){var f=-1;while(f<0){var e=this._findPreviousSelectableItemFromIndex(j-1);
if(e<0){return false}j=e;var l=n.contentIndexOutlineLevel(this,k,j);if(l===a){f=e
}}if(f!==-1){this.select(j)}}}else{this.collapse(h)}}}return true},moveRight:function(a){if(a.ctrlKey||a.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectNextItem(false,1);this._cv_performSelectAction(null,a,this.ACTION_DELAY)
}else{var e=this.get("selection"),c=this.get("content"),b=e?e.indexSetForSource(c):null;
if(b){this.expand(b)}}return true},moveDownAndModifySelection:function(b,a){this.selectNextItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUpAndModifySelection:function(b,a){this.selectPreviousItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeftAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},moveRightAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectNextItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},insertNewline:function(e,c){var b=this.get("isEditable")&&this.get("canEditContent"),h,g,j,a,f;
if(b){h=this.get("selection");g=this.get("content");if(h&&h.get("length")===1){j=h.indexSetForSource(g);
a=j?j.get("min"):-1;b=a>=0}}if(b){f=this.itemViewForContentIndex(a);b=f&&SC.typeOf(f.beginEditing)===SC.T_FUNCTION
}if(b){this.scrollToContentIndex(a);f=this.itemViewForContentIndex(a);f.beginEditing()
}else{this.invokeLater(this._cv_action,0,f,null)}return YES},mouseDown:function(k){var h=this.itemViewForEvent(k),g=this.get("content"),f=h?h.get("contentIndex"):-1,c,e,b,a,l,j=g.get("allowsMultipleSelection");
c=this.mouseDownInfo={event:k,itemView:h,contentIndex:f,at:Date.now()};this.becomeFirstResponder();
if(this.get("useToggleSelection")){if(this.get("selectOnMouseDown")){if(!h){return
}b=this.get("selection");a=b&&b.containsObject(h.get("content"));if(a){this.deselect(f)
}else{if(!j){this.select(f,NO)}else{this.select(f,YES)}}}return YES}if(!h){if(this.get("allowDeselectAll")){this.select(null,false)
}return YES}b=this.get("selection");if(b){b=b.indexSetForSource(g)}a=b?b.contains(f):NO;
c.modifierKeyPressed=l=k.ctrlKey||k.metaKey;if(l&&a){c.shouldDeselect=f>=0}else{if(k.shiftKey&&b&&b.get("length")>0&&j){b=this._findSelectionExtendedByShift(b,f);
e=this._selectionAnchor;this.select(b);this._selectionAnchor=e}else{if(!l&&a){c.shouldReselect=f>=0
}else{if((k.shiftKey||l)&&!j){this.select(null,false)}if(this.get("selectOnMouseDown")){this.select(f,l)
}else{c.shouldSelect=f>=0}}}}c.previousContentIndex=f;return YES},mouseUp:function(k){var l=this.itemViewForEvent(k),e=this.mouseDownInfo,g=this.get("content"),f,c,a,b,h,m,j=g.get("allowsMultipleSelection");
if(this.get("useToggleSelection")){if(!l||this.get("selectOnMouseDown")){return NO
}c=this.get("selection");f=(l)?l.get("contentIndex"):-1;a=c&&c.containsObject(l.get("content"));
if(a){this.deselect(f)}else{if(!j){this.select(f,NO)}else{this.select(f,YES)}}}else{if(e){m=e.contentIndex;
f=(l)?l.get("contentIndex"):-1;if(e.shouldSelect){this.select(m,e.modifierKeyPressed)
}if(e.shouldDeselect){this.deselect(m)}if(e.shouldReselect){b=this.get("isEditable")&&this.get("canEditContent");
if(b){c=this.get("selection");b=c&&(c.get("length")===1)}if(b){h=this.itemViewForContentIndex(m);
b=h&&(!h.contentHitTest||h.contentHitTest(k));b=(b&&h.beginEditing)?h.beginEditing():NO
}if(!b){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()}this._cv_reselectTimer=this.invokeLater(this.select,300,m,false)
}}this._cleanupMouseDown()}}this._cv_performSelectAction(l,k,0,k.clickCount);return NO
},_cleanupMouseDown:function(){var b=this.mouseDownInfo,a;if(b){for(a in b){if(!b.hasOwnProperty(a)){continue
}delete b[a]}}this.mouseDownInfo=null},mouseMoved:function(c){var a=this.itemViewForEvent(c),b=this._lastHoveredItem;
if(a!==b){if(b&&b.mouseOut){b.mouseOut(c)}if(a&&a.mouseOver){a.mouseOver(c)}}this._lastHoveredItem=a;
if(a&&a.mouseMoved){a.mouseMoved(c)}return YES},mouseOut:function(b){var a=this._lastHoveredItem;
this._lastHoveredItem=null;if(a&&a.mouseOut){a.mouseOut(b)}return YES},touchStart:function(e){if(this.get("useToggleSelection")){return true
}var b=this.itemViewForEvent(e),c=this.get("content"),g=b?b.get("contentIndex"):-1,f,a;
this.becomeFirstResponder();this.select(g,NO);this._cv_performSelectAction(this,e);
return YES},touchesDragged:function(a,b){b.forEach(function(c){if(Math.abs(c.pageX-c.startX)>5||Math.abs(c.pageY-c.startY)>5){this.select(null,NO);
c.makeTouchResponder(c.nextTouchResponder)}},this)},touchCancelled:function(a){this.select(null,NO)
},_findSelectionExtendedByShift:function(f,j){if(!f||f.get("length")===0){return SC.IndexSet.create(j)
}var e=this.get("content"),h=e.get("length")-1,c=f.get("min"),a=f.get("max")-1,g=this.mouseDownInfo,b=this._selectionAnchor;
if(SC.none(b)){b=-1}if(j<c){c=j;if(b<0){this._selectionAnchor=b=a}}else{if(j>a){a=j;
if(b<0){this._selectionAnchor=b=c}}else{if(j>=c&&j<=a){if(b<0){this._selectionAnchor=b=c
}if(j===b){c=a=j}else{if(j>b){c=b;a=j}else{if(j<b){c=j;a=b}}}}}}return SC.IndexSet.create(c,a-c+1)
},reorderDataType:function(){return"SC.CollectionView.Reorder."+SC.guidFor(this)}.property().cacheable(),dragContent:null,proposedInsertionIndex:null,proposedDropOperation:null,mouseDragged:function(j){var k=this.get("selectionDelegate"),f=this.get("content"),a=this.get("selection"),c=this.mouseDownInfo,g=this.get("_contentGroupIndexes"),e,b,h;
if(!c||c.contentIndex<0){return YES}if((Date.now()-c.at)<123){return YES}if(k.collectionViewShouldBeginDrag(this)){if(!this.get("selectOnMouseDown")){e=SC.IndexSet.create(c.contentIndex)
}else{e=a?a.indexSetForSource(f):null}if(e&&g&&g.get("length")>0){e=e.copy().remove(g);
if(e.get("length")===0){e=null}else{e.freeze()}}if(!e){return YES}else{e=e.frozenCopy()
}e={content:f,indexes:e};this.set("dragContent",e);b=this.get("dragDataTypes");if(b&&b.get("length")>0){h=k.collectionViewDragViewFor(this,e.indexes);
if(!h){h=this._cv_dragViewFor(e.indexes)}h.createLayer();SC.Drag.start({event:c.event,source:this,dragView:h,ghost:NO,ghostActsLikeCursor:k.ghostActsLikeCursor,slideBack:YES,dataSource:this});
this._cleanupMouseDown();this._lastInsertionIndex=null}else{this.set("dragContent",null)
}return YES}},_cv_dragViewFor:function(e){var b=this.get("nowShowing").without(e);
b=this.get("nowShowing").without(b);var c=this.get("layer").cloneNode(false);var a=SC.View.create({layer:c,parentView:this});
SC.$(c).css("backgroundColor","transparent").css("border","none").css("top",0).css("left",0);
b.forEach(function(h){var j=this.itemViewForContentIndex(h),f,g;if(j){f=j.get("isSelected");
j.set("isSelected",NO);j.updateLayerIfNeeded();g=j.get("layer");if(g){g=g.cloneNode(true)
}j.set("isSelected",f);j.updateLayerIfNeeded()}if(g){c.appendChild(g)}g=null},this);
c=null;return a},dragDataTypes:function(){var a=this.get("selectionDelegate"),b=a.collectionViewDragDataTypes(this),c;
if(this.get("canReorderContent")){b=b?b.copy():[];c=this.get("reorderDataType");if(b.indexOf(c)<0){b.push(c)
}}return b?b:[]}.property(),dragDataForType:function(c,b){if(this.get("canReorderContent")){if(b===this.get("reorderDataType")){return this.get("dragContent")
}}var a=this.get("selectionDelegate");return a.collectionViewDragDataForType(this,c,b)
},computeDragOperations:function(c,b){var e=SC.DRAG_NONE,a=this.get("selectionDelegate");
if(this.get("canReorderContent")){if(c.get("dataTypes").indexOf(this.get("reorderDataType"))>=0){e=SC.DRAG_REORDER
}}e=a.collectionViewComputeDragOperations(this,c,e);if(e&SC.DRAG_REORDER){e=SC.DRAG_MOVE
}return e},_computeDropOperationState:function(c,n,f){var h=this.convertFrameFromView(c.get("location"),null),m=SC.DROP_BEFORE,o=this.get("selectionDelegate"),e=this.get("canReorderContent"),p,j,a,k,g,b;
var l=this.insertionIndexForLocation(h,SC.DROP_ON);if(SC.typeOf(l)===SC.T_ARRAY){m=l[1];
l=l[0]}if(m===SC.DROP_ON){this.set("proposedInsertionIndex",l);this.set("proposedDropOperation",m);
b=o.collectionViewValidateDragOperation(this,c,f,l,m);l=this.get("proposedInsertionIndex");
m=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
if(b!==SC.DRAG_NONE){return[l,m,b]}else{m=SC.DROP_BEFORE;l=this.insertionIndexForLocation(h,SC.DROP_BEFORE);
if(SC.typeOf(l)===SC.T_ARRAY){m=l[1];l=l[0]}}}if((l>=0)&&e&&(m!==SC.DROP_ON)){p=c.dataForType(this.get("reorderDataType"));
if(p){j=this.get("content");if(m===SC.DROP_BEFORE){a=p.indexes.contains(l-1);k=p.indexes.contains(l)
}else{a=p.indexes.contains(l);k=p.indexes.contains(l-1)}if(a&&k){if(SC.none(this._lastInsertionIndex)){if(m===SC.DROP_BEFORE){while((l>=0)&&p.indexes.contains(l)){l--
}}else{g=j?j.get("length"):0;while((l<g)&&p.indexes.contains(l)){l++}}}else{l=this._lastInsertionIndex
}}if(l>=0){f=SC.DRAG_REORDER}}}this.set("proposedInsertionIndex",l);this.set("proposedDropOperation",m);
f=o.collectionViewValidateDragOperation(this,c,f,l,m);l=this.get("proposedInsertionIndex");
m=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
return[l,m,f]},dragUpdated:function(g,b){var j=g.get("allowedDragOperations"),h=this._computeDropOperationState(g,b,j),a=h[0],c=h[1],f=h[2];
if(f!==SC.DRAG_NONE){if((this._lastInsertionIndex!==a)||(this._lastDropOperation!==c)){var e=this.itemViewForContentIndex(a);
this.showInsertionPoint(e,c)}this._lastInsertionIndex=a;this._lastDropOperation=c
}else{this.hideInsertionPoint();this._lastInsertionIndex=this._lastDropOperation=null
}return(f&SC.DRAG_REORDER)?SC.DRAG_MOVE:f},dragExited:function(){this.hideInsertionPoint();
this._lastInsertionIndex=this._lastDropOperation=null},acceptDragOperation:function(a,b){return YES
},performDragOperation:function(f,h){var a=this._computeDropOperationState(f,null,h),m=a[0],l=a[1],j=a[2],n=this.get("selectionDelegate"),c,o,e,k,b,g;
if(j&SC.DRAG_REORDER){h=(h&SC.DRAG_MOVE)?SC.DRAG_REORDER:SC.DRAG_NONE}else{h=h&j}if(h===SC.DRAG_NONE){return h
}c=n.collectionViewPerformDragOperation(this,f,h,m,l);if((c===SC.DRAG_NONE)&&(h&SC.DRAG_REORDER)){e=f.dataForType(this.get("reorderDataType"));
if(!e){return SC.DRAG_NONE}k=this.get("content");g=e.indexes;if(g.get("length")===1){if(((l===SC.DROP_BEFORE)||(l===SC.DROP_AFTER))&&(g.get("min")===m)){return SC.DRAG_MOVE
}}k.beginPropertyChanges();o=[];b=0;e.indexes.forEach(function(p){o.push(k.objectAt(p-b));
k.removeAt(p-b);b++;if(p<m){m--}},this);if(l===SC.DROP_AFTER){m++}k.replace(m,0,o,l);
this.select(SC.IndexSet.create(m,o.length));k.endPropertyChanges();h=SC.DRAG_MOVE
}return h},collectionViewShouldBeginDrag:function(a){return this.get("canReorderContent")
},insertionIndexForLocation:function(a,b){return -1},_cv_isVisibleInWindowDidChange:function(){if(this.get("isVisibleInWindow")){if(this._invalidIndexes){this.invokeOnce(this.reloadIfNeeded)
}if(this._invalidSelection){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)}}}.observes("isVisibleInWindow"),collectionViewShouldSelectItem:function(a,b){return this.get("isSelectable")
},_TMP_DIFF1:SC.IndexSet.create(),_TMP_DIFF2:SC.IndexSet.create(),_cv_nowShowingDidChange:function(){var b=this.get("nowShowing"),a=this._sccv_lastNowShowing,e,f,c;
if(a!==b){if(a&&b){f=this._TMP_DIFF1.add(a).remove(b);c=this._TMP_DIFF2.add(b).remove(a);
e=f.add(c)}else{e=a||b}}if(e&&e.get("length")>0){this._sccv_lastNowShowing=b?b.frozenCopy():null;
this.updateContentRangeObserver();this.reload(e)}if(f){f.clear()}if(c){c.clear()}}.observes("nowShowing"),init:function(){arguments.callee.base.apply(this,arguments);
if(this.useFastPath){this.mixin(SC.CollectionFastPath)}if(this.get("canReorderContent")){this._cv_canReorderContentDidChange()
}this._sccv_lastNowShowing=this.get("nowShowing").clone();if(this.content){this._cv_contentDidChange()
}if(this.selection){this._cv_selectionDidChange()}},_cv_canReorderContentDidChange:function(){if(this.get("canReorderContent")){if(!this.get("isDropTarget")){this.set("isDropTarget",YES)
}SC.Drag.addDropTarget(this)}}.observes("canReorderContent"),_cv_performSelectAction:function(b,e,c,a){var f;
if(c===undefined){c=0}if(a===undefined){a=1}if((a>1)||this.get("actOnSelect")){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()
}f=this.get("selection");f=f?f.toArray():[];if(this._cv_actionTimer){this._cv_actionTimer.invalidate()
}this._cv_actionTimer=this.invokeLater(this._cv_action,c,b,e,f)}},_cv_action:function(b,a,c){var e=this.get("action");
var f=this.get("target")||null;this._cv_actionTimer=null;if(e){if(SC.typeOf(e)===SC.T_FUNCTION){return this.action(b,a)
}var g=this.get("pane");if(g){g.rootResponder.sendAction(e,f,this,g,c)}}else{if(!b){return
}else{if(SC.typeOf(b._action)==SC.T_FUNCTION){return b._action(a)}else{if(SC.typeOf(b.action)==SC.T_FUNCTION){return b.action(a)
}}}}}});SC.DateFieldView=SC.TextFieldView.extend({value:null,showDate:YES,showTime:NO,formatTime:"%I:%M %p",formatDate:"%d/%m/%Y",formatDateTime:"%d/%m/%Y %I:%M %p",_dtConstants:"%a %b %d %H %I %j %m %M %p %S %U %W %y %Y".w(),_wtConstants:[3,3,2,2,2,3,2,2,2,2,2,2,2,4],activeSelection:0,format:function(){var a=this.get("showTime");
var b=this.get("showDate");if(a===YES&&b===YES){return this.get("formatDateTime")
}if(a===YES){return this.get("formatTime")}return this.get("formatDate")}.property("showTime","showDate").cacheable(),validator:function(){return SC.Validator.DateTime.extend({format:this.get("format")})
}.property("format").cacheable(),tabsSelections:function(){var g=[];var e=this.get("format");
var k=this.get("_dtConstants");var b=this.get("_wtConstants");if(SC.empty(e)){throw"The format string is empty, and must be a valid string."
}var h,l,c,f=0,a=0,j=0;while(f<e.length&&e.indexOf("%",f)!==-1){h=e.indexOf("%",f);
l=e.substring(h,h+2);f=h+2;c=k.indexOf(l);if(c===-1){throw"SC.DateFieldView: The format's key '%@' is not supported.".fmt(l)
}a=a+h-j;g.push(SC.Object.create({key:l,textSelection:SC.TextSelection.create({start:a,end:a+b[c]})}));
a=a+b[c];j=f}h=l=c=null;return g}.property("format").cacheable(),updateTextSelecitonObserver:function(){var a=this.get("activeSelection");
var b=this.get("tabsSelections");if(this.get("isEditing")){this.selection(null,b[a].get("textSelection"))
}}.observes("activeSelection","value"),updateValue:function(b,c){var f=(c===0)?-1:1;
var e=this.get("value"),a;switch(b){case"%a":case"%d":case"%j":this.set("value",e.advance({day:f}));
break;case"%b":case"%m":this.set("value",e.advance({month:f}));break;case"%H":case"%I":this.set("value",e.advance({hour:f}));
break;case"%M":this.set("value",e.advance({minute:f}));break;case"%p":a=e.get("hour")>=12?-12:12;
this.set("value",e.advance({hour:a}));break;case"%S":this.set("value",e.advance({second:f}));
break;case"%U":this.set("value",e.advance({week1:f}));break;case"%W":this.set("value",e.advance({week0:f}));
break;case"%y":case"%Y":this.set("value",e.advance({year:f}));break}},_selectRootElement:function(){},keyDown:function(a){if(this.interpretKeyEvents(a)){a.stop();
return YES}return arguments.callee.base.apply(this,arguments)},ctrl_a:function(){return YES
},moveUp:function(b){var a=this.get("activeSelection");var c=this.get("tabsSelections");
this.updateValue(c[a].get("key"),1);return YES},moveDown:function(b){var a=this.get("activeSelection");
var c=this.get("tabsSelections");this.updateValue(c[a].get("key"),0);return YES},insertText:function(a){return YES
},moveRight:function(a){var c=this.get("tabsSelections");var b=this.get("activeSelection")+1;
if(b===c.length){b=0}this.set("activeSelection",b);return YES},moveLeft:function(a){var c=this.get("tabsSelections");
var b=this.get("activeSelection")-1;if(b===-1){b=c.length-1}this.set("activeSelection",b);
return YES},insertTab:function(a){var c=this.get("tabsSelections");var b=this.get("activeSelection")+1;
if(b<c.length){this.set("activeSelection",b);return YES}return NO},insertBacktab:function(a){var b=this.get("activeSelection")-1;
if(b!==-1){this.set("activeSelection",b);return YES}return NO},mouseUp:function(b){var c=arguments.callee.base.apply(this,arguments);
var f=this.get("selection");if(SC.none(f)){this.set("activeSelection",0)}else{var j=f.get("start");
var h=this.get("tabsSelections");var a=h.length,g;for(var e=0;e<a;e++){g=h[e].get("textSelection");
if(j>=g.get("start")&&j<=g.get("end")){this.set("activeSelection",e)}}}return c},deleteBackward:function(a){return YES
},deleteForward:function(a){return YES}});SC.DisclosureView=SC.ButtonView.extend({classNames:["sc-disclosure-view"],theme:"disclosure",buttonBehavior:SC.TOGGLE_BEHAVIOR,toggleOnValue:YES,toggleOffValue:NO,valueBindingDefault:SC.Binding.bool(),render:function(a,c){var b=this.get("displayTitle");
if(c){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="button" alt="" />');if(this.get("needsEllipsis")){a.push('<span class="ellipsis sc-button-label">',b,"</span>")
}else{a.push('<span class="sc-button-label">',b,"</span>")}}else{this.$("label").text(b)
}},keyDown:function(a){if(a.which===37||a.which===38){this.set("value",this.get("toggleOffValue"));
return YES}if(a.which===39||a.which===40){this.set("value",this.get("toggleOnValue"));
return YES}arguments.callee.base.apply(this,arguments)}});sc_require("views/collection");
sc_require("mixins/collection_row_delegate");SC.ListView=SC.CollectionView.extend(SC.CollectionRowDelegate,{classNames:["sc-list-view"],acceptsFirstResponder:YES,showAlternatingRows:NO,render:function(a,b){a.setClass("alternating",this.get("showAlternatingRows"));
return arguments.callee.base.apply(this,arguments)},rowDelegate:function(){var a=this.delegate,b=this.get("content");
return this.delegateFor("isCollectionRowDelegate",a,b)}.property("delegate","content").cacheable(),_sclv_rowDelegateDidChange:function(){var e=this._sclv_rowDelegate,b=this.get("rowDelegate"),c=this._sclv_rowHeightDidChange,a=this._sclv_customRowHeightIndexesDidChange;
if(e===b){return this}this._sclv_rowDelegate=b;if(e){e.removeObserver("rowHeight",this,c);
e.removeObserver("customRowHeightIndexes",this,a)}if(!b){throw"Internal Inconsistancy: ListView must always have CollectionRowDelegate"
}b.addObserver("rowHeight",this,c);b.addObserver("customRowHeightIndexes",this,a);
this._sclv_rowHeightDidChange()._sclv_customRowHeightIndexesDidChange();return this
}.observes("rowDelegate"),_sclv_rowHeightDidChange:function(){var b=this.get("rowDelegate"),a=b.get("rowHeight"),c;
if(a===this._sclv_rowHeight){return this}this._sclv_rowHeight=a;c=SC.IndexSet.create(0,this.get("length"));
this.rowHeightDidChangeForIndexes(c);return this},_sclv_customRowHeightIndexesDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),e=this._sclv_customRowHeightIndexes,c=this._sclv_customRowHeightIndexesContentDidChange;
if((b===e)||(e&&e.isEqual(b))){return this}if(e&&this._sclv_isObservingCustomRowHeightIndexes){e.removeObserver("[]",this,c)
}if(this._sclv_isObservingCustomRowHeightIndexes=b&&!b.get("isFrozen")){b.addObserver("[]",this,c)
}this._sclv_customRowHeightIndexesContentDidChange();return this},_sclv_customRowHeightIndexesContentDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),c=this._sclv_customRowHeightIndexes,e;
if(b&&c){e=b.copy().add(c)}else{e=b||c}this._sclv_customRowHeightIndexes=b?b.frozenCopy():null;
this.rowHeightDidChangeForIndexes(e);return this},rowOffsetForContentIndex:function(j){if(j===0){return 0
}var l=this.get("rowDelegate"),a=l.get("rowHeight"),g,f,c,b,k,h,e;f=j*a;g=this.get("rowSpacing");
if(g){f+=j*g}if(l.customRowHeightIndexes&&(c=l.get("customRowHeightIndexes"))){b=this._sclv_offsetCache;
if(!b){b=this._sclv_offsetCache=[];k=h=0;c.forEach(function(m){k+=this.rowHeightForContentIndex(m)-a;
b[m+1]=k;h=m},this);this._sclv_max=h+1}k=b[j];if(k===undefined){k=b[j]=b[j-1];if(k===undefined){h=this._sclv_max;
if(j<h){h=c.indexBefore(j)+1}k=b[j]=b[h]||0}}f+=k}return f},rowHeightForContentIndex:function(a){var b=this.get("rowDelegate"),f,c,g,e;
if(b.customRowHeightIndexes&&(e=b.get("customRowHeightIndexes"))){c=this._sclv_heightCache;
if(!c){c=this._sclv_heightCache=[];g=this.get("content");e.forEach(function(h){c[h]=b.contentIndexRowHeight(this,g,h)
},this)}f=c[a];if(f===undefined){f=b.get("rowHeight")}}else{f=b.get("rowHeight")}return f
},rowHeightDidChangeForIndexes:function(b){var a=this.get("length");this._sclv_heightCache=this._sclv_offsetCache=null;
if(b&&b.isIndexSet){b=b.get("min")}this.reload(SC.IndexSet.create(b,a-b));return this
},computeLayout:function(){var a=this._sclv_layout;if(!a){a=this._sclv_layout={}}a.minHeight=this.rowOffsetForContentIndex(this.get("length"));
this.set("calculatedHeight",a.minHeight);return a},layoutForContentIndex:function(a){return{top:this.rowOffsetForContentIndex(a),height:this.rowHeightForContentIndex(a),left:0,right:0}
},contentIndexesInRect:function(j){var a=this.get("rowDelegate").get("rowHeight"),h=SC.minY(j),b=SC.maxY(j),k=j.height||0,g=this.get("length"),f,c,e;
c=(h-(h%a))/a;f=this.rowOffsetForContentIndex(c);while(c>0&&f>h){c--;f-=this.rowHeightForContentIndex(c)
}f+=this.rowHeightForContentIndex(c);while(c<g&&f<=h){c++;f+=this.rowHeightForContentIndex(c)
}if(c<0){c=0}if(c>=g){c=g}e=c+((k-(k%a))/a);if(e>g){e=g}f=this.rowOffsetForContentIndex(e);
while(e>=c&&f>=b){e--;f-=this.rowHeightForContentIndex(e)}f+=this.rowHeightForContentIndex(e);
while(e<g&&f<b){e++;f+=this.rowHeightForContentIndex(e)}e++;if(e<c){e=c}if(e>g){e=g
}return SC.IndexSet.create(c,e-c)},insertionPointView:SC.View.extend({classNames:"sc-list-insertion-point",render:function(a,b){if(b){a.push('<div class="anchor"></div>')
}}}),showInsertionPoint:function(h,g){var j=this._insertionPointView;if(!j){j=this._insertionPointView=this.get("insertionPointView").create()
}var e=h.get("contentIndex"),f=this.get("length"),c=SC.clone(h.get("layout")),a=h.get("outlineLevel"),b=h.get("outlineIndent")||0,k;
if((e>=f)&&e>0){k=this.itemViewForContentIndex(f-1);if(k.get("isGroupView")){a=1;
b=k.get("outlineIndent")}}if(SC.none(a)){a=-1}if(g&SC.DROP_ON){this.hideInsertionPoint();
h.set("isSelected",YES);this._lastDropOnView=h}else{if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}if(g&SC.DROP_AFTER){c.top+=c.height}c.height=2;c.right=0;
c.left=((a+1)*b)+12;delete c.width;j.set("layout",c);this.appendChild(j)}},hideInsertionPoint:function(){if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}var a=this._insertionPointView;if(a){a.removeFromParent().destroy()
}this._insertionPointView=null},insertionIndexForLocation:function(h,m){var b={x:h.x,y:h.y,width:1,height:1},g=this.contentIndexesInRect(b),j=g.get("min"),k=this.get("length"),c,n,o,f,q,e,p,l,a;
if(SC.none(j)||j<0){if((k===0)||(h.y<=this.rowOffsetForContentIndex(0))){j=0}else{if(h.y>=this.rowOffsetForContentIndex(k)){j=k
}}}c=this.rowOffsetForContentIndex(j);n=c+this.rowHeightForContentIndex(j);if(m==SC.DROP_ON){if(this.get("isEditable")){o=Math.min(Math.floor((n-c)*0.2),5)
}else{o=0}if(h.y>=(c+o)||h.y<=(n+o)){return[j,SC.DROP_ON]}}if((j<k)&&(h.y>=n-10)){j++
}if(j>0){l=this.itemViewForContentIndex(j-1);p=(l?l.get("outlineIndent"):0)||0;e=l?l.get("outlineLevel"):0;
if(j<k){l=this.itemViewForContentIndex(j);f=l?l.get("outlineLevel"):0;q=(l?l.get("outlineIndent"):0)||0;
q*=f}else{f=l.get("isGroupView")?1:0;q=p*f}p*=e;if((f!==e)&&(q!==p)){if(p>q){j--;
m=SC.DROP_AFTER}}}if(m===SC.DROP_BEFORE){l=(j<k)?this.itemViewForContentIndex(j):null;
if(!l||l.get("isGroupView")){if(j>0){l=this.itemViewForContentIndex(j-1);if(!l.get("isGroupView")||(l.get("disclosureState")===SC.BRANCH_OPEN)){j=j-1;
m=SC.DROP_AFTER}else{j=-1}}else{j=-1}}if(j<0){m=SC.DRAG_NONE}}return[j,m]},mouseWheel:function(a){var b=SC.InlineTextFieldView.editor;
if(b&&b.get("isEditing")){if(b.get("delegate").get("displayDelegate")===this){SC.InlineTextFieldView.commitEditing()
}}return NO},init:function(){arguments.callee.base.apply(this,arguments);this._sclv_rowDelegateDidChange()
}});require("views/list");SC.GridView=SC.ListView.extend({classNames:["sc-grid-view"],layout:{left:0,right:0,top:0,bottom:0},rowHeight:48,columnWidth:64,exampleView:SC.LabelView,insertionOrientation:SC.HORIZONTAL_ORIENTATION,itemsPerRow:function(){var b=this.get("frame"),a=this.get("columnWidth")||0;
return(a<=0)?1:Math.floor(b.width/a)}.property("clippingFrame","columnWidth").cacheable(),contentIndexesInRect:function(f){var e=this.get("rowHeight")||48,b=this.get("itemsPerRow"),c=Math.floor(SC.minY(f)/e)*b,a=Math.ceil(SC.maxY(f)/e)*b;
return SC.IndexSet.create(c,a-c)},layoutForContentIndex:function(h){var e=this.get("rowHeight")||48,a=this.get("clippingFrame").width,b=this.get("itemsPerRow"),f=Math.floor(a/b),g=Math.floor(h/b),c=h-(b*g);
return{left:c*f,top:g*e,height:e,width:f}},computeLayout:function(){var f=this.get("content"),e=(f)?f.get("length"):0,c=this.get("rowHeight")||48,a=this.get("itemsPerRow"),g=Math.ceil(e/a);
var b=this._cachedLayoutHash;if(!b){b=this._cachedLayoutHash={}}b.minHeight=g*c;this.calculatedHeight=b.minHeight;
return b},insertionPointClass:SC.View.extend({classNames:["grid-insertion-point"],render:function(a,b){if(b){a.push('<span class="anchor"></span>')
}}}),showInsertionPoint:function(c,g){if(!c){return}if(g===SC.DROP_ON){if(c!==this._dropOnInsertionPoint){this.hideInsertionPoint();
this._dropOnInsertionPoint=c}}else{if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null
}if(!this._insertionPointView){this._insertionPointView=this.insertionPointClass.create()
}var b=this._insertionPointView;var a=c.get("frame");var e={height:a.height-6,x:a.x,y:a.y+6,width:0};
if(!SC.rectsEqual(b.get("frame"),e)){b.set("frame",e)}if(b.parentNode!==c.parentNode){c.parentNode.appendChild(b)
}}},hideInsertionPoint:function(){var a=this._insertionPointView;if(a){a.removeFromParent()
}if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null}},insertionIndexForLocation:function(e,l){var g=this.get("frame"),h=this.get("clippingFrame"),m=this.get("itemsPerRow"),a=Math.floor(g.width/m),o=Math.floor((e.y-g.y-h.y)/this.get("rowHeight"));
var k=SC.DROP_BEFORE,c=(e.x-g.x-h.x),b=Math.floor(c/a),n=(c/a)-b;if(l===SC.DROP_ON){if(n>0.8){b++
}if((n>=0.2)&&(n<=0.8)){k=SC.DROP_ON}}else{if(n>0.45){b++}}var j=(o*m)+b;return[j,k]
},_gv_clippingFrameDidChange:function(){var e=this.get("nowShowing"),c,b,a;this.notifyPropertyChange("itemsPerRow");
a=e.get("length");for(b=0;b<a;b++){c=this.itemViewForContentIndex(b);c.adjust(this.layoutForContentIndex(b))
}}.observes("clippingFrame")});SC.ScrollerView=SC.View.extend({classNames:["sc-scroller-view"],_touchScrollValue:NO,value:function(a,c){var b=this.get("minimum");
if(c!==undefined){this._scs_value=c}c=this._scs_value||b;return Math.max(Math.min(c,this.get("maximum")),b)
}.property("maximum","minimum").cacheable(),displayValue:function(){var a;if(this.get("_touchScrollValue")){a=this.get("_touchScrollValue")
}else{a=this.get("value")}return a}.property("value","_touchScrollValue").cacheable(),proportion:0,maximum:100,minimum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,hasButtons:YES,scrollbarThickness:14,capLength:18,capOverlap:14,buttonLength:41,buttonOverlap:11,displayProperties:"thumbPosition thumbLength isEnabled controlsHidden".w(),render:function(c,a){var b=[],k="",f,m,h,g,n,l,j,e,o;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.push("sc-vertical");
break;case SC.LAYOUT_HORIZONTAL:b.push("sc-horizontal");break}if(!this.get("isEnabled")){b.push("disabled")
}if(this.get("controlsHidden")){b.push("controls-hidden")}c.addClass(b);m=this.get("thumbLength");
f=this.get("thumbPosition");if(a){if(this.get("hasButtons")){k='<div class="button-bottom"></div><div class="button-top"></div>'
}else{k='<div class="endcap"></div>'}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:c.push('<div class="track"></div>','<div class="cap"></div>',k,'<div class="thumb" style="height: '+m+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>');
break;case SC.LAYOUT_HORIZONTAL:c.push('<div class="track"></div>','<div class="cap"></div>',k,'<div class="thumb" style="width: '+m+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>')
}}else{if(this.get("controlsHidden")){return}g=this.$(".thumb");this.adjustThumb(g,f,m)
}},touchScrollDidStart:function(a){this.set("_touchScrollValue",a)},touchScrollDidEnd:function(a){this.set("_touchScrollValue",NO)
},touchScrollDidChange:function(a){this.set("_touchScrollValue",a)},adjustThumb:function(b,a,c){this.adjustThumbPosition(b,a);
this.adjustThumbSize(b,c)},adjustThumbPosition:function(b,a){if(this._thumbPosition===a){return
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.css("top",a);break;
case SC.LAYOUT_HORIZONTAL:b.css("left",a);break}this._thumbPosition=a},adjustThumbSize:function(a,b){if(this._thumbSize===b){return
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a.css("height",Math.max(b,20));
break;case SC.LAYOUT_HORIZONTAL:a.css("width",Math.max(b,20));break}this._thumbSize=b
},trackLength:function(){var a=this.get("scrollerLength");a-=this.capLength-this.capOverlap;
a-=this.buttonLength-this.buttonOverlap;return a}.property("scrollerLength").cacheable(),scrollerLength:function(){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:return this.get("frame").height;
case SC.LAYOUT_HORIZONTAL:return this.get("frame").width}return 0}.property("frame").cacheable(),thumbLength:function(){var a;
a=Math.floor(this.get("trackLength")*this.get("proportion"));a=isNaN(a)?0:a;return Math.max(a,20)
}.property("trackLength","proportion").cacheable(),thumbPosition:function(){var h=this.get("displayValue"),c=this.get("maximum"),b=this.get("trackLength"),e=this.get("thumbLength"),g=this.get("capLength"),f=this.get("capOverlap"),a;
a=(h/c)*(b-e);a+=g-f;return Math.floor(isNaN(a)?0:a)}.property("displayValue","maximum","trackLength","thumbLength").cacheable(),controlsHidden:function(){return this.get("proportion")>=1
}.property("proportion").cacheable(),mouseDown:function(j){if(!this.get("isEnabled")){return NO
}var e=j.target,b=this.get("thumbPosition"),h,c,g;if(e.className.indexOf("thumb")>=0){c=this.convertFrameFromView({x:j.pageX,y:j.pageY});
c.x-=b;c.y-=b;this._thumbDragging=YES;this._thumbOffset=c;this._mouseDownLocation={x:j.pageX,y:j.pageY};
this._thumbPositionAtDragStart=this.get("thumbPosition")}else{if(e.className.indexOf("button-top")>=0){this.decrementProperty("value",30);
this.makeButtonActive(".button-top");this.startMouseDownTimer("scrollUp")}else{if(e.className.indexOf("button-bottom")>=0){this.incrementProperty("value",30);
this.makeButtonActive(".button-bottom");this.startMouseDownTimer("scrollDown")}else{var f=this.get("scrollerLength"),a=this.convertFrameFromView({x:j.pageX,y:j.pageY}),k;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:this._mouseDownLocation=k=a.y;
break;case SC.LAYOUT_HORIZONTAL:this._mouseDownLocation=k=a.x;break}if(k<b){this.decrementProperty("value",f);
this.startMouseDownTimer("page")}else{this.incrementProperty("value",f);this.startMouseDownTimer("page")
}}}}return YES},mouseUp:function(a){var c=this._scs_buttonActive,b=NO,e;if(c){c.removeClass("active");
b=YES}e=this._mouseDownTimer;if(e){e.invalidate();this._mouseDownTimer=null}this._thumbDragging=NO;
return b},mouseDragged:function(a){var e,c,g,b,f=this._thumbPositionAtDragStart;if(!this._thumbDragging){return NO
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:g=(a.pageY-this._mouseDownLocation.y);
break;case SC.LAYOUT_HORIZONTAL:g=(a.pageX-this._mouseDownLocation.x);break}b=f+g;
c=this.get("trackLength")-this.get("thumbLength");this.set("value",Math.round((b/c)*this.get("maximum")));
return YES},startMouseDownTimer:function(a){var b;this._mouseDownTimerAction=a;this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:300})
},mouseDownTimerDidFire:function(){var e=this.get("scrollerLength"),a=SC.device.get("mouseLocation"),c=this.get("thumbPosition"),b=this.get("thumbLength"),f=50;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a=this.convertFrameFromView(a).y;
break;case SC.LAYOUT_HORIZONTAL:a=this.convertFrameFromView(a).x;break}switch(this._mouseDownTimerAction){case"scrollDown":this.incrementProperty("value",30);
break;case"scrollUp":this.decrementProperty("value",30);break;case"page":f=150;if(a<c){this.decrementProperty("value",e)
}else{if(a>c+b){this.incrementProperty("value",e)}}}this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:f})
},makeButtonActive:function(a){this._scs_buttonActive=this.$(a).addClass("active")
}});sc_require("views/scroller");sc_require("mixins/border");SC.NORMAL_SCROLL_DECELERATION=0.95;
SC.FAST_SCROLL_DECELERATION=0.85;SC.ScrollView=SC.View.extend(SC.Border,{classNames:["sc-scroll-view"],isScrollable:YES,contentView:null,horizontalAlign:SC.ALIGN_LEFT,verticalAlign:SC.ALIGN_TOP,horizontalScrollOffset:function(b,e){if(e!==undefined){var c=this.minimumHorizontalScrollOffset(),a=this.get("maximumHorizontalScrollOffset");
this._scroll_horizontalScrollOffset=Math.max(c,Math.min(a,e))}return this._scroll_horizontalScrollOffset||0
}.property().cacheable(),verticalScrollOffset:function(b,e){if(e!==undefined){var c=this.get("minimumVerticalScrollOffset"),a=this.get("maximumVerticalScrollOffset");
this._scroll_verticalScrollOffset=Math.max(c,Math.min(a,e))}return this._scroll_verticalScrollOffset||0
}.property().cacheable(),maximumScrollOffset:function(b,a,c){if(b>=a){return b-a}if(c===SC.ALIGN_LEFT||c===SC.ALIGN_TOP){return 0
}else{if(c===SC.ALIGN_MIDDLE||c===SC.ALIGN_CENTER){return 0-Math.round((a-b)/2)}else{return 0-(a-b)
}}},minimumScrollOffset:function(b,a,c){if(b>a){return 0}if(c===SC.ALIGN_LEFT||c===SC.ALIGN_TOP){return 0
}else{if(c===SC.ALIGN_MIDDLE||c===SC.ALIGN_CENTER){return 0-Math.round((a-b)/2)}else{return 0-(a-b)
}}},maximumHorizontalScrollOffset:function(){var c=this.get("contentView"),b=0,a=0;
if(c&&c.get("frame")){b=c.get("frame").width}if(c){a=c.calculatedWidth||0}if(c&&c.calculatedWidth&&c.calculatedWidth!==0){b=c.calculatedWidth
}b*=this._scale;var e=this.get("containerView").get("frame").width;if(!this.get("canScrollHorizontal")){b=Math.min(b,e)
}return this.maximumScrollOffset(b,e,this.get("horizontalAlign"))}.property(),maximumVerticalScrollOffset:function(){var a=this.get("contentView"),c=0,b=0;
if(a&&a.get("frame")){c=a.get("frame").height}if(a){b=a.calculatedHeight||0}if(a&&a.calculatedHeight&&a.calculatedHeight!==0){c=a.calculatedHeight
}c*=this._scale;var e=this.get("containerView").get("frame").height;if(!this.get("canScrollVertical")){c=Math.min(c,e)
}return this.maximumScrollOffset(c,e,this.get("verticalAlign"))}.property(),minimumHorizontalScrollOffset:function(){var b=this.get("contentView");
var a=b?b.get("frame").width:0;if(b&&b.calculatedWidth&&b.calculatedWidth!==0){a=b.calculatedWidth
}a*=this._scale;var c=this.get("containerView").get("frame").width;if(!this.get("canScrollHorizontal")){a=Math.min(a,c)
}return this.minimumScrollOffset(a,c,this.get("horizontalAlign"))}.property(),minimumVerticalScrollOffset:function(){var a=this.get("contentView");
var b=(a&&a.get("frame"))?a.get("frame").height:0;if(a&&a.calculatedHeight&&a.calculatedHeight!==0){b=a.calculatedHeight
}b*=this._scale;var c=this.get("containerView").get("frame").height;if(!this.get("canScrollVertical")){b=Math.min(b,c)
}return this.minimumScrollOffset(b,c,this.get("verticalAlign"))}.property(),verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("frame").height
}.property("frame"),horizontalPageScroll:function(){return this.get("frame").width
}.property("frame"),hasHorizontalScroller:YES,horizontalScrollerView:function(){return SC.ScrollerView
}.property().cacheable(),isHorizontalScrollerVisible:YES,canScrollHorizontal:function(){return !!(this.get("hasHorizontalScroller")&&this.get("horizontalScrollerView")&&this.get("isHorizontalScrollerVisible"))
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:YES,hasVerticalScroller:YES,verticalScrollerView:function(){return SC.ScrollerView
}.property().cacheable(),isVerticalScrollerVisible:YES,canScrollVertical:function(){return !!(this.get("hasVerticalScroller")&&this.get("verticalScrollerView")&&this.get("isVerticalScrollerVisible"))
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,verticalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),horizontalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),verticalScrollerLayout:null,horizontalScrollerLayout:null,containerView:SC.ContainerView.extend({}),scrollTo:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}if(!SC.none(a)){a=Math.max(this.get("minimumHorizontalScrollOffset"),Math.min(this.get("maximumHorizontalScrollOffset"),a));
this.set("horizontalScrollOffset",a)}if(!SC.none(b)){b=Math.max(this.get("minimumVerticalScrollOffset"),Math.min(this.get("maximumVerticalScrollOffset"),b));
this.set("verticalScrollOffset",b)}return this},scrollBy:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}a=(a)?this.get("horizontalScrollOffset")+a:null;b=(b)?this.get("verticalScrollOffset")+b:null;
return this.scrollTo(a,b)},scrollToVisible:function(b){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var c=this.get("contentView");if(!c){return NO}var a=b.get("frame");if(!a){return NO
}a=c.convertFrameFromView(a,b.get("parentView"));return this.scrollToRect(a)},scrollToRect:function(b){var a=SC.cloneRect(this.get("containerView").get("frame"));
a.x=this.get("horizontalScrollOffset");a.y=this.get("verticalScrollOffset");var e=a.x,c=a.y;
a.y-=Math.max(0,SC.minY(a)-SC.minY(b));a.x-=Math.max(0,SC.minX(a)-SC.minX(b));a.y+=Math.max(0,SC.maxY(b)-SC.maxY(a));
a.x+=Math.max(0,SC.maxX(b)-SC.maxX(a));if((e!==a.x)||(c!==a.y)){this.scrollTo(a.x,a.y);
return YES}else{return NO}},scrollDownLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalLineScroll")*a)
},scrollUpLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-this.get("verticalLineScroll")*a)
},scrollRightLine:function(a){if(a===undefined){a=1}return this.scrollTo(this.get("horizontalLineScroll")*a,null)
},scrollLeftLine:function(a){if(a===undefined){a=1}return this.scrollTo(0-this.get("horizontalLineScroll")*a,null)
},scrollDownPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalPageScroll")*a)
},scrollUpPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-(this.get("verticalPageScroll")*a))
},scrollRightPage:function(a){if(a===undefined){a=1}return this.scrollBy(this.get("horizontalPageScroll")*a,null)
},scrollLeftPage:function(a){if(a===undefined){a=1}return this.scrollBy(0-(this.get("horizontalPageScroll")*a),null)
},tile:function(){var h=SC.platform.touch;var c=this.get("hasHorizontalScroller")?this.get("horizontalScrollerView"):null;
var k=c&&!h&&this.get("isHorizontalScrollerVisible");var m=this.get("hasVerticalScroller")?this.get("verticalScrollerView"):null;
var g=m&&!h&&this.get("isVerticalScrollerVisible");var f=this.get("containerView");
var p={left:0,top:0};var o,j,b,q,e,a;var l=((k)?c.get("scrollbarThickness"):0);var n=(g)?m.get("scrollbarThickness"):0;
if(k){a=this.get("horizontalScrollerLayout");j={left:(a?a.left:0),bottom:(a?a.bottom:0),right:(a?a.right+n-1:n-1),height:l};
c.set("layout",j);q=this.get("horizontalOverlay");p.bottom=q?0:(j.bottom+l)}else{p.bottom=0
}if(c){c.set("isVisible",k)}if(g){l=l+this.get("verticalScrollerBottom");e=this.get("verticalScrollerLayout");
j={top:(e?e.top:0),bottom:(e?e.bottom+l:l),right:(e?e.right:0),width:n};m.set("layout",j);
b=this.get("verticalOverlay");p.right=b?0:(j.right+n)}else{p.right=0}if(m){m.set("isVisible",g)
}f.adjust(p)},scrollerVisibilityDidChange:function(){this.tile()}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible"),_scroll_wheelDeltaX:0,_scroll_wheelDeltaY:0,mouseWheel:function(a){var b=(SC.browser.safari&&SC.browser.version>533)?120:1;
this._scroll_wheelDeltaX+=a.wheelDeltaX/b;this._scroll_wheelDeltaY+=a.wheelDeltaY/b;
this.invokeLater(this._scroll_mouseWheel,10);return this.get("canScrollHorizontal")||this.get("canScrollVertical")
},_scroll_mouseWheel:function(){this.scrollBy(this._scroll_wheelDeltaX,this._scroll_wheelDeltaY);
if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY>0){this._scroll_wheelDeltaY=Math.floor(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.max(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY<0){this._scroll_wheelDeltaY=Math.ceil(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.min(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{this._scroll_wheelDeltaY=0;this._scroll_wheelDeltaX=0}}},canScale:NO,_scale:1,scale:function(a,b){if(b!==undefined){this._scale=Math.min(Math.max(this.get("minimumScale"),b),this.get("maximumScale"))
}return this._scale}.property().cacheable(),minimumScale:0.25,maximumScale:2,autoScaleRange:NO,_scale_css:"",updateScale:function(b){var a=this.get("contentView");
if(!a){return}if(a.isScalable){this.get("contentView").applyScale(b);this._scale_css=""
}else{this._scale_css="scale3d("+b+", "+b+", 1)"}},acceptsMultitouch:YES,decelerationRate:SC.NORMAL_SCROLL_DECELERATION,alwaysBounceHorizontal:NO,alwaysBounceVertical:YES,delaysContentTouches:YES,_touchScrollDidChange:function(){if(this.get("contentView").touchScrollDidChange){this.get("contentView").touchScrollDidChange(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidChange){this.verticalScrollerView.touchScrollDidChange(this._scroll_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidChange){this.horizontalScrollerView.touchScrollDidChange(this._scroll_horizontalScrollOffset)
}},_touchScrollDidStart:function(){if(this.get("contentView").touchScrollDidStart){this.get("contentView").touchScrollDidStart(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidStart){this.verticalScrollerView.touchScrollDidStart(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidStart){this.horizontalScrollerView.touchScrollDidStart(this._touch_horizontalScrollOffset)
}},_touchScrollDidEnd:function(){if(this.get("contentView").touchScrollDidEnd){this.get("contentView").touchScrollDidEnd(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidEnd){this.verticalScrollerView.touchScrollDidEnd(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidEnd){this.horizontalScrollerView.touchScrollDidEnd(this._touch_horizontalScrollOffset)
}},_applyCSSTransforms:function(b){var a="";this.updateScale(this._scale);a+="translate3d("+-this._scroll_horizontalScrollOffset+"px, "+-Math.round(this._scroll_verticalScrollOffset)+"px,0) ";
a+=this._scale_css;b.style.webkitTransform=a;b.style.webkitTransformOrigin="top left"
},captureTouch:function(a){return YES},touchGeneration:0,touchStart:function(b){var a=++this.touchGeneration;
if(!this.tracking&&this.get("delaysContentTouches")){this.invokeLater(this.beginTouchesInContent,150,a)
}else{if(!this.tracking){this.invokeLater(this.beginTouchesInContent,1,a)}}this.beginTouchTracking(b,YES)
},beginTouchesInContent:function(b){if(b!==this.touchGeneration){return}var c=this.touch,a;
if(c&&this.tracking&&!this.dragging){c.touch.captureTouch(this,YES);if(!c.touch.touchResponder){c.touch.makeTouchResponder(this)
}}},beginTouchTracking:function(e,o){var g=e.averagedTouchesForView(this,o);var b=this._scroll_verticalScrollOffset||0,c=this._scroll_horizontalScrollOffset||0,j=c,h=b;
if(this.touch&&this.touch.timeout){clearTimeout(this.touch.timeout);this.touch.timeout=null;
j=this.touch.startClipOffset.x;h=this.touch.startClipOffset.y}var k=this.get("contentView");
var a=k?k.get("frame").width:0,m=k?k.get("frame").height:0;if(k.calculatedWidth&&k.calculatedWidth!==0){a=k.calculatedWidth
}if(k.calculatedHeight&&k.calculatedHeight!==0){m=k.calculatedHeight}var l=this.get("containerView").get("frame").width,q=this.get("containerView").get("frame").height;
var f=this.convertFrameToView(this.get("frame"),null),p=(c+(g.x-f.x))/this._scale,n=(b+(g.y-f.y))/this._scale;
this.touch={startTime:e.timeStamp,notCalculated:YES,enableScrolling:{x:a*this._scale>l||this.get("alwaysBounceHorizontal"),y:m*this._scale>q||this.get("alwaysBounceVertical")},scrolling:{x:NO,y:NO},startClipOffset:{x:j,y:h},lastScrollOffset:{x:c,y:b},startTouchOffset:{x:g.x,y:g.y},scrollVelocity:{x:0,y:0},startTouchOffsetInContent:{x:p,y:n},containerSize:{width:l,height:q},contentSize:{width:a,height:m},startScale:this._scale,startDistance:g.d,canScale:this.get("canScale"),minimumScale:this.get("minimumScale"),maximumScale:this.get("maximumScale"),globalFrame:f,layer:this.get("contentView").get("layer"),resistanceCoefficient:0.998,resistanceAsymptote:320,decelerationFromEdge:0.05,accelerationToEdge:0.1,scrollTolerance:{x:15,y:15},scaleTolerance:5,secondaryScrollTolerance:30,scrollLock:500,decelerationRate:this.get("decelerationRate"),lastEventTime:e.timeStamp,touch:e};
if(!this.tracking){this.tracking=YES;this.dragging=NO}},_adjustForEdgeResistance:function(g,e,b,c,a){var f;
if(g<e){f=g-e}else{if(g>b){f=b-g}else{return g}}f=Math.pow(c,Math.abs(f))*a;if(g<e){f=f-a
}else{f=-f+a}return Math.min(Math.max(e,g),b)+f},touchesDragged:function(a,c){var b=a.averagedTouchesForView(this);
this.updateTouchScroll(b.x,b.y,b.d,a.timeStamp)},updateTouchScroll:function(l,k,e,h){var g=this.touch,a=l-g.globalFrame.x,m=k-g.globalFrame.y,v,n,w,o,C,A;
var c=((this._scroll_horizontalScrollOffset||0)+a)/this._scale,b=((this._scroll_verticalScrollOffset||0)+m)/this._scale;
var z=c-g.startTouchOffset.x,y=b-g.startTouchOffset.y;var j=g.dragging;if(!g.scrolling.x&&Math.abs(z)>g.scrollTolerance.x&&g.enableScrolling.x){j=YES;
g.scrolling.x=YES;g.scrollTolerance.y=g.secondaryScrollTolerance;g.startTouchOffset.x=l;
z=0}if(!g.scrolling.y&&Math.abs(y)>g.scrollTolerance.y&&g.enableScrolling.y){j=YES;
g.scrolling.y=YES;g.scrollTolerance.x=g.secondaryScrollTolerance;g.startTouchOffset.y=k;
y=0}if(j&&!g.dragging){g.dragging=YES;this.dragging=YES;this._touchScrollDidStart()
}if(!g.scrolling.x&&!g.scrolling.y&&!g.canScale){return}if(g.scrolling.x&&!g.scrolling.y){if(z>g.scrollLock&&!g.scrolling.y){g.enableScrolling.y=NO
}}if(g.scrolling.y&&!g.scrolling.x){if(y>g.scrollLock&&!g.scrolling.x){g.enableScrolling.x=NO
}}if(g.canScale){var q=g.startDistance,x=e-q;if(Math.abs(x)>g.scaleTolerance){g.scrolling.y=YES;
g.scrolling.x=YES;var B=g.startScale*(e/Math.max(q,50));var s=this._adjustForEdgeResistance(B,g.minimumScale,g.maximumScale,g.resistanceCoefficient,g.resistanceAsymptote);
this.dragging=YES;this._scale=s;var u=c*this._scale,t=b*this._scale}}C=this.minimumScrollOffset(g.contentSize.width*this._scale,g.containerSize.width,this.get("horizontalAlign"));
A=this.minimumScrollOffset(g.contentSize.height*this._scale,g.containerSize.height,this.get("verticalAlign"));
o=this.maximumScrollOffset(g.contentSize.width*this._scale,g.containerSize.width,this.get("horizontalAlign"));
n=this.maximumScrollOffset(g.contentSize.height*this._scale,g.containerSize.height,this.get("verticalAlign"));
w=g.startTouchOffsetInContent.x*this._scale-a;v=g.startTouchOffsetInContent.y*this._scale-m;
w=this._adjustForEdgeResistance(w,C,o,g.resistanceCoefficient,g.resistanceAsymptote);
v=this._adjustForEdgeResistance(v,A,n,g.resistanceCoefficient,g.resistanceAsymptote);
if(g.scrolling.x){this._scroll_horizontalScrollOffset=w}if(g.scrolling.y){this._scroll_verticalScrollOffset=v
}this._applyCSSTransforms(g.layer);this._touchScrollDidChange();if(h-g.lastEventTime>=1||g.notCalculated){g.notCalculated=NO;
var f=this._scroll_horizontalScrollOffset;var p=this._scroll_verticalScrollOffset;
g.scrollVelocity.x=((f-g.lastScrollOffset.x)/Math.max(1,h-g.lastEventTime));g.scrollVelocity.y=((p-g.lastScrollOffset.y)/Math.max(1,h-g.lastEventTime));
g.lastScrollOffset.x=f;g.lastScrollOffset.y=p;g.lastEventTime=h}},touchEnd:function(c){var a=this.touch,b=c.averagedTouchesForView(this);
if(b.touchCount>0){this.beginTouchTracking(c,NO)}else{if(this.dragging){a.dragging=NO;
a.lastEventTime=c.timeStamp;this.startDecelerationAnimation()}else{this.touch=null;
c.captureTouch(this);if(c.touchResponder&&c.touchResponder!==this){c.touchResponder.tryToPerform("touchEnd",c)
}}this.tracking=NO;this.dragging=NO}},touchCancelled:function(a){this.beginPropertyChanges();
this.set("scale",this._scale);this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);
this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);this.endPropertyChanges();
this.tracking=NO;if(this.dragging){this._touchScrollDidEnd()}this.dragging=NO;this.touch=null
},startDecelerationAnimation:function(a){var b=this.touch;b.decelerationVelocity={x:b.scrollVelocity.x*10,y:b.scrollVelocity.y*10};
this.decelerateAnimation()},bouncyBounce:function(c,f,e,g,h,b,a){if(f<e){if(c<0){c=c+((e-f)*h)
}else{c=Math.min((e-f)*b+a,e-f-0.01)}}else{if(f>g){if(c>0){c=c-((f-g)*h)}else{c=-Math.min((f-g)*b+a,f-g-0.01)
}}}return c},decelerateAnimation:function(){var b=this.touch,w=this._scale,v=this.minimumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign")),u=this.minimumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign")),j=this.maximumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign")),h=this.maximumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign")),a=Date.now(),f=Math.max(a-b.lastEventTime,1),o=this._scroll_horizontalScrollOffset+b.decelerationVelocity.x*(f/10),l=this._scroll_verticalScrollOffset+b.decelerationVelocity.y*(f/10);
var n=b.decelerationFromEdge,p=b.accelerationToEdge;var e=o>=v&&o<=j;var q=l>=u&&l<=h;
o/=this._scale;l/=this._scale;var k=0;k=this.bouncyBounce(k,w,b.minimumScale,b.maximumScale,n,p,0);
this._scale=w=w+k;o*=this._scale;l*=this._scale;v=this.minimumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign"));
u=this.minimumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign"));
j=this.maximumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign"));
h=this.maximumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign"));
if(e&&(o<v||o>j)){o=Math.max(v,Math.min(o,j))}if(q&&(l<u||l>h)){l=Math.max(u,Math.min(l,h))
}this._scroll_horizontalScrollOffset=o;this._scroll_verticalScrollOffset=l;this._applyCSSTransforms(b.layer);
SC.RunLoop.begin();this._touchScrollDidChange();SC.RunLoop.end();var s=b.decelerationRate;
b.decelerationVelocity.y*=Math.pow(s,(f/10));b.decelerationVelocity.x*=Math.pow(s,(f/10));
b.decelerationVelocity.x=this.bouncyBounce(b.decelerationVelocity.x,o,v,j,n,p,0.3);
b.decelerationVelocity.y=this.bouncyBounce(b.decelerationVelocity.y,l,u,h,n,p,0.3);
var m=Math.abs(b.decelerationVelocity.x);var c=Math.abs(b.decelerationVelocity.y);
if(c<0.01&&m<0.01&&Math.abs(k)<0.01){b.timeout=null;this.touch=null;SC.RunLoop.begin();
this._touchScrollDidEnd();this.beginPropertyChanges();this.set("scale",this._scale);
this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);
this.endPropertyChanges();SC.RunLoop.end();return}var g=this;b.lastEventTime=Date.now();
this.touch.timeout=setTimeout(function(){g.decelerateAnimation()},10)},createChildViews:function(){var b=[],a;
if(SC.none(a=this.containerView)){a=SC.ContainerView}b.push(this.containerView=this.createChildView(a,{contentView:this.contentView,isScrollContainer:YES}));
this.contentView=this.containerView.get("contentView");a=this.get("horizontalScrollerView");
if(a){if(this.get("hasHorizontalScroller")){a=this.horizontalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_HORIZONTAL,valueBinding:"*owner.horizontalScrollOffset"});
b.push(a)}else{this.horizontalScrollerView=null}}a=this.get("verticalScrollerView");
if(a){if(this.get("hasVerticalScroller")){a=this.verticalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_VERTICAL,valueBinding:"*owner.verticalScrollOffset"});
b.push(a)}else{this.verticalScrollerView=null}}this.childViews=b;this.contentViewDidChange();
this.tile()},init:function(){arguments.callee.base.apply(this,arguments);this._scroll_contentView=this.get("contentView");
var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var e=this.get("contentView"),a=this._scroll_contentView,b=this.contentViewFrameDidChange,c=this.contentViewLayerDidChange;
if(e!==a){if(a){a.removeObserver("frame",this,b);a.removeObserver("layer",this,c)
}this._scroll_contentView=e;if(e){e.addObserver("frame",this,b);e.addObserver("layer",this,c)
}this.containerView.set("contentView",e);this.contentViewFrameDidChange()}}.observes("contentView"),render:function(a,b){this.invokeLast(this.adjustElementScroll);
if(b){a.push('<div class="corner"></div>')}return arguments.callee.base.apply(this,arguments)
},oldMaxHOffset:0,oldMaxVOffset:0,contentViewFrameDidChange:function(b){var p=this.get("contentView"),n=(p)?p.get("frame"):null,j=this._scale,c=(n)?n.width*j:0,s=(n)?n.height*j:0,l,k,o;
if(!b&&(c===this._scroll_contentWidth)&&(s===this._scroll_contentHeight)){return}this._scroll_contentWidth=c;
this._scroll_contentHeight=s;l=this.get("frame");k=l.width;o=l.height;if(this.get("hasHorizontalScroller")&&(p=this.get("horizontalScrollerView"))){if(this.get("autohidesHorizontalScroller")){this.set("isHorizontalScrollerVisible",c>k)
}p.setIfChanged("maximum",c-k);p.setIfChanged("proportion",k/c)}if(this.get("hasVerticalScroller")&&(p=this.get("verticalScrollerView"))){if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",s>o)
}s-=this.get("verticalScrollerBottom");p.setIfChanged("maximum",s-o);p.setIfChanged("proportion",o/s)
}if(!this.get("isVerticalScrollerVisible")&&(this.get("verticalScrollOffset")!==0)&&this.get("autohidesVerticalScroller")){this.set("verticalScrollOffset",0)
}if(!this.get("isHorizontalScrollerVisible")&&(this.get("horizontalScrollOffset")!==0)&&this.get("autohidesHorizontalScroller")){this.set("horizontalScrollOffset",0)
}var q=this.get("maximumVerticalScrollOffset"),m=this.get("verticalScrollOffset"),h=this.get("maximumHorizontalScrollOffset"),a=this.get("horizontalScrollOffset"),g=q<m,e=h<a;
if(g||e){this.forceDimensionsRecalculation(e,g,m,a)}},frameDidChange:function(){this.contentViewFrameDidChange(YES)
}.observes("frame"),contentViewLayerDidChange:function(){if(this._verticalScrollOffset!==0){this._verticalScrollOffset=-1
}if(this._horizontalScrollOffset!==0){this._horizontalScrollOffset=-1}this.invokeLast(this.adjustElementScroll)
},_scroll_horizontalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("verticalScrollOffset"),adjustElementScroll:function(){var a=this.get("containerView"),e=this.get("contentView"),c=this.get("verticalScrollOffset"),b=this.get("horizontalScrollOffset");
if(e){SC.RunLoop.begin();e._viewFrameDidChange();SC.RunLoop.end();if(SC.platform.touch){this._applyCSSTransforms(e.get("layer"))
}}if(a&&!SC.platform.touch){a=a.$()[0];if(a){if(c!==this._verticalScrollOffset){a.scrollTop=c;
this._verticalScrollOffset=c}if(b!==this._horizontalScrollOffset){a.scrollLeft=b;
this._horizontalScrollOffset=b}}}},forceDimensionsRecalculation:function(b,c,f,a){var g=a;
var e=f;this.scrollTo(0,0);if(b&&c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),this.get("maximumVerticalScrollOffset"))
}if(b&&!c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),e)}if(!b&&c){this.scrollTo(g,this.get("maximumVerticalScrollOffset"))
}},_scroll_verticalScrollOffset:0,_scroll_horizontalScrollOffset:0});sc_require("views/scroll");
SC.MenuScrollerView=SC.ScrollerView.extend({classNames:["sc-menu-scroller-view"],scrollDown:NO,value:function(a,c){if(c!==undefined){this._value=c
}else{var b=this._value||0;return Math.min(b,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,verticalLineScroll:20,ownerScrollValueKey:function(){return"verticalScrollOffset"
}.property("layoutDirection").cacheable(),init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.TINY_SCROLLER_THICKNESS);
break;case SC.SMALL_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS);
break;case SC.REGULAR_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS);
break;case SC.LARGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS);
break;case SC.HUGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS);
break}return arguments.callee.base.apply(this,arguments)},render:function(a,c){a.addClass("sc-vertical");
a.addClass(this.get("controlSize"));if(c){var b=this.get("scrollDown")?"arrowDown":"arrowUp";
a.push('<span class="scrollArrow '+b+'">&nbsp;</span>')}a.setClass("disabled",!this.get("isEnabled"))
},didCreateLayer:function(){},willDestroyLayer:function(){var a=this._sc_scroller_scrollDidChange;
SC.Event.remove(this.$(),"scroll",this,a)},mouseEntered:function(a){this.set("isMouseOver",YES);
this._invokeScrollOnMouseOver()},mouseExited:function(a){this.set("isMouseOver",NO)
},_sc_scroller_valueDidChange:function(){}.observes("value"),_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var a=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(a,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var b=Date.now(),e=this._sc_lastScroll,c=this.get("layer"),a=0;
if(e&&(b-e)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=b;SC.RunLoop.begin();if(!this.get("isEnabled")){return}this._sc_scrollValue=a=c.scrollTop;
this.set("value",a);SC.RunLoop.end()},_scrollMenu:function(){var b=this.get("value"),a;
if(this.get("scrollDown")){a=b+this.verticalLineScroll;if(a<=this.get("maximum")){this.set("value",a)
}}else{a=b-this.verticalLineScroll;if(a>=0){this.set("value",a)}else{if(b<=this.verticalLineScroll&&b>0){this.set("value",0)
}}}return YES},_invokeScrollOnMouseOver:function(){this._scrollMenu();if(this.get("isMouseOver")){this.invokeLater(this._invokeScrollOnMouseOver,100)
}}});SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS=18;SC.MenuScrollerView.TINY_SCROLLER_THICKNESS=10;
SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS=14;SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS=23;
SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS=26;SC.MenuScrollView=SC.ScrollView.extend({classNames:["sc-menu-scroll-view"],maximumHorizontalScrollOffset:0,hasHorizontalScroller:NO,horizontalScrollerView:SC.MenuScrollerView,isHorizontalScrollerVisible:NO,canScrollHorizontal:NO,autohidesHorizontalScroller:NO,hasVerticalScroller:YES,verticalScrollerView:SC.MenuScrollerView,verticalScrollerView2:SC.MenuScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:YES,autohidesVerticalScroller:YES,verticalScrollerBottom:0,controlSize:SC.REGULAR_CONTROL_SIZE,containerView:SC.ContainerView,tile:function(){var h,v,j,b,t,k,c;
h=this.get("hasVerticalScroller");v=h?this.get("verticalScrollerView"):null;j=h?this.get("verticalScrollerView2"):null;
b=v&&this.get("isVerticalScrollerVisible");t=this.get("containerView");k={left:0,top:0};
if(b){c=0;var a=v.get("scrollerThickness")||j.get("scrollerThickness");var l=this.get("contentView"),q,s=(l)?l.get("frame"):null,m=(s)?s.height:0,u=this.containerView.$()[0],n=this.get("verticalScrollOffset"),g={height:0,top:0,right:0,left:0},p={height:a,top:0,right:0,left:0},e={height:a,bottom:0,right:0,left:0},o={height:0,bottom:0,right:0,left:0};
if(u){c=u.offsetHeight}if(n===0){k.top=0;k.bottom=a;v.set("layout",g);j.set("layout",e)
}else{if(n>=(m-c-a)){k.top=a;k.bottom=0;v.set("layout",p);j.set("layout",o)}else{k.top=a;
k.bottom=a;v.set("layout",p);j.set("layout",e)}}}if(v){v.set("isVisible",b);j.set("isVisible",b)
}t.set("layout",k)},scrollerVisibilityDidChange:function(){this.tile()}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible","verticalScrollOffset"),createChildViews:function(){var c=[],b,a,e=this.get("controlSize");
if(SC.none(b=this.containerView)){b=SC.ContainerView}c.push(this.containerView=this.createChildView(b,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if((b=this.verticalScrollerView)&&(a=this.verticalScrollerView2)){if(this.get("hasVerticalScroller")){b=this.verticalScrollerView=this.createChildView(b,{layout:{top:0,left:0,right:0},controlSize:e,valueBinding:"*owner.verticalScrollOffset"});
c.push(b);a=this.verticalScrollerView2=this.createChildView(a,{scrollDown:YES,layout:{bottom:0,left:0,right:0},controlSize:e,valueBinding:"*owner.verticalScrollOffset"});
c.push(a)}else{this.verticalScrollerView=null;this.verticalScrollerView2=null}}this.childViews=c;
this.contentViewFrameDidChange();this.tile()},init:function(){arguments.callee.base.apply(this,arguments);
this._scroll_contentView=this.get("contentView");var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewFrameDidChange:function(){var c=this.get("contentView"),b,j=(c)?c.get("frame"):null,g=(j)?j.width:0,a=(j)?j.height:0,k=this.get("frame"),e,h;
this._scroll_contentWidth=g;this._scroll_contentHeight=a;if(this.get("hasVerticalScroller")&&(c=this.get("verticalScrollerView"))&&(b=this.get("verticalScrollerView2"))){a-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",a>k.height)
}a-=this.get("verticalScrollerBottom");e=0;h=this.containerView.$()[0];if(h){e=h.offsetHeight
}a=a-e;c.setIfChanged("maximum",a);b.setIfChanged("maximum",a)}},_scroll_horizontalScrollOffsetDidChange:function(){},_scroll_verticalScrollOffsetDidChange:function(){var b=this.get("verticalScrollOffset");
var a=this.get("contentView");if(a){a.adjust("top",0-b)}}.observes("verticalScrollOffset")});
sc_require("views/button");SC.PopupButtonView=SC.ButtonView.extend({classNames:["sc-popup-button"],preferMatrix:null,menu:null,isActiveBinding:"*menu.isVisibleInWindow",action:function(a){var b=this.get("menu");
if(!b){SC.Logger.warn("SC.PopupButton - Unable to show menu because the menu property is set to %@.".fmt(b));
return NO}b.popup(this,this.get("preferMatrix"));return YES},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this._isMouseDown=YES;this._action();this.invokeLast(this._recordMouseDownTimestamp);
return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(b){var e=new Date().getTime(),c=this._menuRenderedTimestamp,f=this.get("menu"),g=SC.platform.touch,a;
if(f){a=f.getPath("rootMenu.targetMenuItem");if(a){if(!a.performAction()){f.remove()
}}else{if(!g&&(e-c>SC.ButtonView.CLICK_AND_HOLD_DELAY)){f.remove()}}}this._isMouseDown=NO;
arguments.callee.base.apply(this,arguments);return YES},mouseExited:function(a){return YES
},performKeyEquivalent:function(b,a){if(!this.get("isEnabled")){return NO}var c=this.get("menu");
return(!!c&&c.performKeyEquivalent(b,a))},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled")});SC.ProgressView=SC.View.extend(SC.Control,{value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),offsetRange:24,contentMaximumKey:null,isIndeterminate:NO,isIndeterminateBindingDefault:SC.Binding.bool(),isRunning:NO,isRunningBindingDefault:SC.Binding.bool(),animatedBackgroundMatrix:[],contentIsIndeterminateKey:null,classNames:"sc-progress-view",_backgroundOffset:0,_currentBackground:1,_nextBackground:1,init:function(){arguments.callee.base.apply(this,arguments);
this.animateProgressBar()},animateProgressBar:function(){if(this.get("isRunning")&&this.get("isVisibleInWindow")){this._animateProgressBar(500)
}}.observes("isRunning","isVisibleInWindow"),_animateProgressBar:function(a){if(a===0){a=1000/30
}if(this.get("isRunning")&&this.get("isVisibleInWindow")){this.displayDidChange();
this.invokeLater(this._animateProgressBar,a,600)}},displayProperties:"value minimum maximum isIndeterminate".w(),render:function(c,b){var p,f,m,e,j,g=this.get("isIndeterminate"),o=this.get("isRunning"),l=this.get("isEnabled"),n=this.get("offsetRange"),h=(g&&o)?(Math.floor(Date.now()/75)%n-n):0;
if(!l){m="0%"}else{if(g){m="120%"}else{m=(this.get("_percentageNumeric")*100)+"%"
}}var a={"sc-indeterminate":g,"sc-empty":(m<=0),"sc-complete":(m>=100)};if(b){var k=this._createClassNameString(a);
c.push('<div class="sc-inner ',k,'" style="width: ',m,";left: ",h,'px;">','<div class="sc-inner-head">',"</div>",'<div class="sc-inner-tail"></div></div>','<div class="sc-outer-head"></div>','<div class="sc-outer-tail"></div>')
}else{c.setClass(a);p=this.$(".sc-inner");f=this.get("animatedBackgroundMatrix");
e="width: "+m+"; ";e=e+"left: "+h+"px; ";if(f.length===3){p.css("backgroundPosition","0px -"+(f[0]+f[1]*this._currentBackground)+"px");
if(this._currentBackground===f[2]-1||this._currentBackground===0){this._nextBackground*=-1
}this._currentBackground+=this._nextBackground;e=e+"backgroundPosition: "+j+"px; ";
p.attr("style",e)}else{p.attr("style",e)}}},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
},_percentageNumeric:function(){var b=this.get("minimum")||0,c=this.get("maximum")||1,a=this.get("value")||0;
a=(a-b)/(c-b);if(a>1){a=1}if(isNaN(a)){a=0}if(a<b){a=0}if(a>c){a=1}return a}.property("value").cacheable(),_createClassNameString:function(c){var b=[],a;
for(a in c){if(!c.hasOwnProperty(a)){continue}if(c[a]){b.push(a)}}return b.join(" ")
}});SC.RadioView=SC.View.extend(SC.Control,{classNames:["sc-radio-view"],value:null,layoutDirection:SC.LAYOUT_VERTICAL,escapeHTML:YES,items:[],itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this._renderAsFirstTime=YES;
this.notifyPropertyChange("_displayItems")},displayProperties:["value","_displayItems"],render:function(f,a){var s,q,n,c,t,e,m,j,g,h,o,b,l=this.get("_displayItems"),p=this.get("value"),k=SC.isArray(p);
f.addClass(this.get("layoutDirection"));if(k&&p.length<=0){p=p[0];k=NO}if(this._renderAsFirstTime){a=YES;
this._renderAsFirstTime=NO}if(a){f.attr("role","radiogroup");c=SC.guidFor(this);t=l.length;
for(q=0;q<t;q++){s=l[q];n=s[3];if(n){e=(n.indexOf("/")>=0)?n:SC.BLANK_IMAGE_URL;m=(e===n)?"":n;
n='<img src="'+e+'" class="icon '+m+'" alt="" />'}else{n=""}if(s){g=(k)?(p.indexOf(s[1])>=0):(p===s[1])
}else{g=NO}b=this._getSelectionStateClassNames(s,g,p,k,false);h=this.escapeHTML?SC.RenderContext.escapeHTML(s[0]):s[0];
f.push('<div class="sc-radio-button ',b,'" ','aria-checked="',g?"true":"false",'" ','role="radio"',' index="',q,'">','<span class="button"></span>','<span class="sc-button-label">',n,h,"</span></div>")
}}else{this.$(".sc-radio-button").forEach(function(u){u=this.$(u);q=parseInt(u.attr("index"),0);
s=(q>=0)?l[q]:null;if(s){g=(k)?(p.indexOf(s[1])>=0):(p===s[1])}else{g=NO}o=this._getSelectionStateClassNames(s,g,p,k,true);
u.attr("aria-checked",g?"true":"false");u.setClass(o);q=o=null},this)}},_displayItems:function(){var f=this.get("items"),b=this.get("localize"),q=this.get("itemTitleKey"),p=this.get("itemValueKey"),c=this.get("itemIsEnabledKey"),n=this.get("itemIconKey"),e=[],h=(f)?f.get("length"):0,o,j,m,l,a,k,g;
for(l=0;l<h;l++){o=f.objectAt(l);if(SC.typeOf(o)===SC.T_ARRAY){j=o[0];m=o[1]}else{if(o){if(q){j=o.get?o.get(q):o[q]
}else{j=(o.toString)?o.toString():null}if(p){m=o.get?o.get(p):o[p]}else{m=o}if(c){k=o.get?o.get(c):o[c]
}else{k=YES}if(n){g=o.get?o.get(n):o[n]}else{g=null}}else{j=m=g=null;k=NO}}if(b){j=j.loc()
}e.push([j,m,k,g])}return e}.property("items","itemTitleKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey").cacheable(),_getSelectionStateClassNames:function(e,g,f,a,b){var j,c;
j={sel:(g&&!a),mixed:(g&&a),disabled:(!e[2])};if(b){return j}else{var h=[];for(c in j){if(!j.hasOwnProperty(c)){continue
}if(j[c]){h.push(c)}}return h.join(" ")}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}var b=a.target;while(b){if(b.className&&b.className.indexOf("sc-radio-button")>-1){break
}b=b.parentNode}if(!b){return NO}b=this.$(b);if(b.hasClass("disabled")){return YES
}b.addClass("active");this._activeRadioButton=b;a.allowDefault();return YES},mouseUp:function(a){if(!this.get("isEnabled")){return YES
}var g=this._activeRadioButton,f=a.target,b=this.get("_displayItems"),c,e;if(g){g.removeClass("active");
this._activeRadioButton=null}else{return YES}while(f){if(f.className&&f.className.indexOf("sc-radio-button")>-1){break
}f=f.parentNode}f=this.$(f);if(f[0]!==g[0]||f.hasClass("disabled")){return YES}c=parseInt(f.attr("index"),0);
e=b[c];this.set("value",e[1])},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
}});SC.SceneView=SC.ContainerView.extend({scenes:["master","detail"],nowShowing:null,transitionDuration:200,_state:"NO_VIEW",replaceContent:function(a){if(a&&this._state===this.READY){this.animateScene(a)
}else{this.replaceScene(a)}return this},replaceScene:function(c){var e=this._targetView,f=this.STANDARD_LAYOUT,b=this.get("scenes"),a=b?b.indexOf(this.get("nowShowing")):-1;
this._targetView=c;this._targetIndex=a;if(this._timer){this._timer.invalidate()}this._leftView=this._rightView=this._start=this._end=null;
this._timer=null;this.removeAllChildren();if(e){e.set("layout",f)}if(c){c.set("layout",f)
}if(c){this.appendChild(c)}this._state=c?this.READY:this.NO_VIEW},animateScene:function(b){var c=this._targetView,g=this._targetIndex,a=this.get("scenes"),f=a?a.indexOf(this.get("nowShowing")):-1,e;
if(g<0||f<0||g===f){return this.replaceScene(b)}this._targetView=b;this._targetIndex=f;
if(f>g){this._leftView=c;this._rightView=b;this._target=-1}else{this._leftView=b;
this._rightView=c;this._target=1}this.removeAllChildren();if(c){this.appendChild(c)
}if(b){this.appendChild(b)}this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this._state=this.ANIMATING;this.tick()},tick:function(){this._timer=null;var a=Date.now(),e=(a-this._start)/(this._end-this._start),h=this._target,g=this._leftView,b=this._rightView,c,f;
if(e<0){e=0}if(!this.get("isVisibleInWindow")||(e>=1)){return this.replaceScene(this._targetView)
}c=SC.clone(this.get("frame"));f=Math.floor(c.width*e);if(h>0){c.left=0-(c.width-f);
g.set("layout",c);c=SC.clone(c);c.left=f;b.set("layout",c)}else{c.left=0-f;g.set("layout",c);
c=SC.clone(c);c.left=c.width-f;b.set("layout",c)}this._timer=this.invokeLater(this.tick,20);
return this},NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",STANDARD_LAYOUT:{top:0,left:0,bottom:0,right:0}});
SC.SegmentedView=SC.View.extend(SC.Control,{classNames:["sc-segmented-view"],theme:"square",value:null,isEnabled:YES,allowsEmptySelection:NO,allowsMultipleSelection:NO,localize:YES,align:SC.ALIGN_CENTER,layoutDirection:SC.LAYOUT_HORIZONTAL,items:[],itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemActionKey:null,itemTargetKey:null,itemKeyEquivalentKey:null,itemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey".w(),displayItems:function(){var g=this.get("items"),c=this.get("localize"),m=null,e,k,f=[],h=g.get("length"),j,l,b=SC._segmented_fetchKeys,a=SC._segmented_fetchItem;
for(j=0;j<h;j++){l=g.objectAt(j);if(SC.none(l)){continue}e=SC.typeOf(l);if(e===SC.T_STRING){k=[l.humanize().titleize(),l,YES,null,null,null,j]
}else{if(e!==SC.T_ARRAY){if(m===null){m=this.itemKeys.map(b,this)}k=m.map(a,l);k[k.length]=j;
if(!m[0]&&l.toString){k[0]=l.toString()}if(!m[1]){k[1]=l}if(!m[2]){k[2]=YES}}}if(c&&k[0]){k[0]=k[0].loc()
}if(c&&k[5]&&SC.typeOf(k[5])===SC.T_STRING){k[5]=k[5].loc()}f[f.length]=k}return f
}.property("items","itemTitleKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey","itemWidthKey","itemToolTipKey"),itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this.set("renderLikeFirstTime",YES);
this.notifyPropertyChange("displayItems")},init:function(){arguments.callee.base.apply(this,arguments);
this.itemsDidChange()},displayProperties:["displayItems","value","activeIndex"],render:function(b,a){var h=this.get("displayItems");
var c=this.get("theme");if(c){b.addClass(c)}if(a||this.get("renderLikeFirstTime")){this._seg_displayItems=h;
this.renderDisplayItems(b,h);b.addStyle("text-align",this.get("align"));this.set("renderLikeFirstTime",NO)
}else{var m=this.get("activeIndex"),k=this.get("value"),e=SC.isArray(k);if(e&&k.get("length")===1){k=k.objectAt(0);
e=NO}var j={},f=h.length,g=this.$(".sc-segment"),l;while(--f>=0){l=h[f];j.sel=e?(k.indexOf(l[1])>=0):(l[1]===k);
j.active=(m===f);j.disabled=!l[2];SC.$(g[f]).setClass(j)}j=h=k=h=null}},renderDisplayItems:function(e,m){var p=this.get("value"),j=SC.isArray(p),t=this.get("activeIndex"),k=m.length,o,n,b,l,g,s,a,c,h,f,q;
for(h=0;h<k;h++){g=e.begin("a").attr("role","button");s=m[h];o=s[0];n=s[3];a=s[5];
f={};q=[];if(this.get("layoutDirection")==SC.LAYOUT_HORIZONTAL){f.display="inline-block"
}q.push("sc-segment");if(!s[2]){q.push("disabled")}if(h===0){q.push("sc-first-segment")
}if(h===(k-1)){q.push("sc-last-segment")}if(h!==0&&h!==(k-1)){q.push("sc-middle-segment")
}if(j?(p.indexOf(s[1])>=0):(s[1]===p)){q.push("sel")}if(t===h){q.push("active")}if(s[4]){c=s[4];
f.width=c+"px"}g.addClass(q);g.addStyle(f);if(a){g.attr("title",a)}if(n){b=(n.indexOf("/")>=0)?n:SC.BLANK_IMAGE_URL;
l=(b===n)?"":n;n='<img src="'+b+'" alt="" class="icon '+l+'" />'}else{n=""}g.push('<span class="sc-button-inner"><label class="sc-button-label">',n+o,"</label></span>");
g.end()}},displayItemIndexForEvent:function(b){return this.displayItemIndexForPosition(b.pageX,b.pageY);
var e=SC.$(b.target);if(!e||e===document){return -1}var a=this.$(),c=null;while(!c&&(e.length>0)&&(e[0]!==a[0])){if(e.hasClass("sc-segment")){c=e
}else{e=e.parent()}}e=a=null;return(c)?this.$(".sc-segment").index(c):-1},displayItemIndexForPosition:function(f,e){var c=this.$(".sc-segment"),b=c.length,a,h,g;
for(a=0;a<b;a++){h=c[a];g=h.getBoundingClientRect();if(this.get("layoutDirection")==SC.LAYOUT_VERTICAL){if(e>g.top&&e<g.bottom){return a
}}else{if(f>g.left&&f<g.right){return a}}}return -1},keyDown:function(e){var g,h,f,a,j,c;
if(e.which===9){var b=e.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{e.allowDefault()}return YES}if(!this.get("allowsMultipleSelection")&&!this.get("allowsEmptySelection")){f=this.get("displayItems");
a=f.length;j=this.get("value");c=SC.isArray(j);if(e.which===39||e.which===40){for(g=0;
g<a-1;g++){h=f[g];if(c?(j.indexOf(h[1])>=0):(h[1]===j)){this.triggerItemAtIndex(g+1)
}}return YES}else{if(e.which===37||e.which===38){for(g=1;g<a;g++){h=f[g];if(c?(j.indexOf(h[1])>=0):(h[1]===j)){this.triggerItemAtIndex(g-1)
}}return YES}}}return YES},mouseDown:function(b){if(!this.get("isEnabled")){return YES
}var a=this.displayItemIndexForEvent(b);if(a>=0){this._isMouseDown=YES;this.set("activeIndex",a)
}return YES},mouseUp:function(b){var a=this.displayItemIndexForEvent(b);if(this._isMouseDown&&(a>=0)){this.triggerItemAtIndex(a)
}this._isMouseDown=NO;this.set("activeIndex",-1);return YES},mouseMoved:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}return YES},mouseExited:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}return YES},mouseEntered:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",-1)}return YES},touchStart:function(b){if(!this.get("isEnabled")){return YES
}var a=this.displayItemIndexForEvent(b);if(a>=0){this._isTouching=YES;this.set("activeIndex",a)
}return YES},touchEnd:function(b){var a=this.displayItemIndexForEvent(b);if(this._isTouching&&(a>=0)){this.triggerItemAtIndex(a)
}this._isTouching=NO;this.set("activeIndex",-1);return YES},touchesDragged:function(b,c){var e=this.touchIsInBoundary(b);
if(e){if(!this._isTouching){this._touchDidEnter(b)}var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}else{if(this._isTouching){this._touchDidExit(b)}}this._isTouching=e;
return YES},_touchDidExit:function(b){var a=this.displayItemIndexForEvent(b);this.set("activeIndex",-1);
return YES},_touchDidEnter:function(b){var a=this.displayItemIndexForEvent(b);this.set("activeIndex",a);
return YES},triggerItemAtIndex:function(m){var k=this.get("displayItems"),n=k.objectAt(m),b,l,c,h,g;
if(!n[2]){return this}h=this.get("allowsEmptySelection");g=this.get("allowsMultipleSelection");
b=n[1];l=c=this.get("value");if(!SC.isArray(l)){l=[l]}if(!g){if(h&&(l.get("length")===1)&&(l.objectAt(0)===b)){l=[]
}else{l=[b]}}else{if(l.indexOf(b)>=0){if(l.get("length")>1||(l.objectAt(0)!==b)||h){l=l.without(b)
}}else{l=l.concat([b])}}switch(l.get("length")){case 0:l=null;break;case 1:l=l.objectAt(0);
break;default:break}var o=this.get("itemActionKey"),a=this.get("itemTargetKey"),f,j=null,e=this.getPath("pane.rootResponder");
if(o&&(n=this.get("items").objectAt(n[6]))){f=n.get?n.get(o):n[o];if(a){j=n.get?n.get(a):n[a]
}if(e){e.sendAction(f,j,this,this.get("pane"))}}if(!f&&c!==undefined){this.set("value",l)
}f=this.get("action");if(f&&e){e.sendAction(f,this.get("target"),this,this.get("pane"))
}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}}});
SC._segmented_fetchKeys=function(a){return this.get(a)};SC._segmented_fetchItem=function(a){if(!a){return null
}return this.get?this.get(a):this[a]};sc_require("views/button");SC.SelectView=SC.ButtonView.extend({items:[],itemsBindingDefault:SC.Binding.multiple(),itemTitleKey:null,itemSortKey:null,itemValueKey:null,itemIconKey:null,itemSeparatorKey:"separator",localize:YES,disableSort:YES,classNames:["sc-select-view"],_itemList:[],_currentSelItem:null,_itemIdx:null,value:null,showCheckbox:YES,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","items"],preferMatrix:null,CUSTOM_MENU_ITEM_HEIGHT:20,isSelectedBinding:"*menu.isVisibleInWindow",positionMenuBelow:NO,lastMenuWidth:null,exampleView:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,menuItemPadding:35,leftAlign:function(){var b=0,a=this.get("controlSize");
if(a===SC.SMALL_CONTROL_SIZE){b=-14}if(a===SC.REGULAR_CONTROL_SIZE){b=-16}return b
}.property("controlSize"),sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("itemSortKey")||this.get("itemTitleKey");
b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];c=c.get?c.get(a):c[a]}return(e<c)?-1:((e>c)?1:0)
})}return b},render:function(b,g){arguments.callee.base.apply(this,arguments);var c,l,p,s,v,h,f,u,j,n,a,m,e,k,w,q,o,t;
l=this.get("items");l=this.sortObjects(l);p=l.length;s=this.get("itemTitleKey");v=this.get("itemIconKey");
h=this.get("itemValueKey");f=this.get("itemSeparatorKey");u=this.get("showCheckbox");
j=this.get("value");n=this.get("localize");m=[];e=YES;k=0;l.forEach(function(x){if(x){w=s?(x.get?x.get(s):x[s]):x.toString();
w=n?w.loc():w;q=v?(x.get?x.get(v):x[v]):null;if(SC.none(x[v])){q=null}o=(h)?(x.get?x.get(h):x[h]):x;
if(!SC.none(j)&&!SC.none(o)){if(j===o){this.set("title",w);this.set("icon",q)}}if(o===this.get("value")){this.set("_itemIdx",k);
e=!u?NO:YES}else{e=NO}a=f?(x.get?x.get(f):x[f]):NO;if(k===0){this._defaultVal=o;this._defaultTitle=w;
this._defaultIcon=q}var y=SC.Object.create({separator:a,title:w,icon:q,value:o,isEnabled:YES,checkbox:e,action:this.displaySelectedItem});
m.push(y)}k+=1;this.set("_itemList",m)},this);if(g){this.invokeLast(function(){var x=this.get("value");
if(SC.none(x)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this._itemIdx)
},_action:function(n){var j,a,k,l,t,p,A,f,z,c,o,v,q,x,g,h,m,b,y;j=this.$(".sc-button-label")[0];
a=this.get("layer").offsetWidth;k=j.scrollWidth;l=this.get("lastMenuWidth");if(k){t=j.offsetWidth;
if(k&&t){a=a+k-t}}if(!l||(a>l)){l=a}p=this.get("_itemList");var u=this.get("customViewClassName");
var s=this.get("customViewMenuOffsetWidth");var e="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
e=u?(e+" "+u):e;SC.prepareStringMeasurement("",e);for(o=0,y=p.length;o<y;++o){z=p.objectAt(o);
A=SC.measureString(z.title).width;if(!f||(A>f)){f=A}}SC.teardownStringMeasurement();
l=(f+this.menuItemPadding>l)?f+this.menuItemPadding:l;var w=SC.RootResponder.responder.get("currentWindowSize").width;
if(l>w){l=(w-25)}this.set("lastMenuWidth",l);v=this.get("_currentSelItem");q=this.get("_itemList");
x=this.get("controlSize");g=this.get("menuPaneHeightPadding");h=this.get("exampleView");
m=h?h:SC.MenuItemView;b=SC.MenuPane.create({classNames:["select-button"],items:q,exampleView:m,isEnabled:YES,menuHeightPadding:g,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:l},controlSize:x,itemWidth:l,contentView:SC.View.extend({})});
if(!b){return NO}b.popup(this,this.preferMatrix);b.set("currentSelectedMenuItem",v);
return YES},displaySelectedItem:function(){var l,b,g,k,c,a=0,h,f,j,m=null,e;l=this.parentMenu();
b=l.get("currentSelectedMenuItem");g=l.menuItemViews;if(b&&g){a=g.indexOf(b)}h=l.get("anchor");
f=l.get("items");j=f.length;while(!m&&(--j>=0)){e=f[j];k=!SC.none(e.title)?e.title:f.toString();
c=!SC.none(e.value)?e.value:k;if(k===this.get("value")&&(a===j)){m=f;h.set("value",c);
h.set("title",k)}}h.set("icon",this.get("icon")).set("_currentSelItem",b).set("_itemIdx",a)
},changeSelectButtonPreferMatrix:function(){var e=0,b=this.get("_itemIdx"),a=this.get("leftAlign"),f,c;
if(this.get("positionMenuBelow")){f=[a,4,3];this.set("preferMatrix",f)}else{if(b){e=b*this.CUSTOM_MENU_ITEM_HEIGHT
}c=[a,-e,2];this.set("preferMatrix",c)}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
return YES},keyDown:function(a){if(this.interpretKeyEvents(a)){return YES}else{arguments.callee.base.apply(this,arguments)
}},interpretKeyEvents:function(a){if(a){if((a.keyCode===38||a.keyCode===40)){this._action()
}else{if(a.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
}});SC.SelectFieldView=SC.FieldView.extend({tagName:"select",classNames:["sc-select-field-view"],objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,emptyName:null,localize:false,cpDidChange:YES,disableSort:NO,validateMenuItem:function(b,a){return true
},sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
b=b.sortProperty(a)}return b},render:function(c,a){if(this.get("cpDidChange")){this.set("cpDidChange",NO);
var g=this.get("nameKey");var l=this.get("valueKey");var k=this.get("objects");var b=this.get("value");
var e,h;var j=this.get("localize");if(!l&&b){b=SC.guidFor(b)}if((b===null)||(b==="")){b="***"
}if(k){k=this.sortObjects(k);if(!a){h=this.$input()[0];h.innerHTML=""}var f=this.get("emptyName");
if(f){if(j){f=f.loc()}if(a){c.push('<option value="***">'+f+"</option>",'<option disabled="disabled"></option>')
}else{e=document.createElement("option");e.value="***";e.innerHTML=f;h.appendChild(e);
e=document.createElement("option");e.disabled="disabled";h.appendChild(e)}}k.forEach(function(p,o){if(p){var n=g?(p.get?p.get(g):p[g]):p.toString();
if(j){n=n.loc()}var q=(l)?(p.get?p.get(l):p[l]):p;if(!f&&o===0&&b==="***"){this.set("value",q)
}if(q){q=(SC.guidFor(q))?SC.guidFor(q):q.toString()}var m=(this.validateMenuItem&&this.validateMenuItem(q,n))?"":'disabled="disabled" ';
if(a){c.push("<option "+m+'value="'+q+'">'+n+"</option>")}else{e=document.createElement("option");
e.value=q;e.innerHTML=n;if(m.length>0){e.disable="disabled"}h.appendChild(e)}}else{if(a){c.push('<option disabled="disabled"></option>')
}else{e=document.createElement("option");e.disabled="disabled";h.appendChild(e)}}},this);
this.setFieldValue(b)}else{this.set("value",null)}}},displayProperties:["objects","nameKey","valueKey"],_objectsObserver:function(){this.set("cpDidChange",YES)
}.observes("objects"),_nameKeyObserver:function(){this.set("cpDidChange",YES)}.observes("nameKey"),_valueKeyObserver:function(){this.set("cpDidChange",YES)
}.observes("valueKey"),$input:function(){return this.$()},mouseDown:function(a){if(!this.get("isEnabled")){a.stop();
return YES}else{return arguments.callee.base.apply(this,arguments)}},getFieldValue:function(){var g=arguments.callee.base.apply(this,arguments);
var c=this.get("valueKey");var f=this.get("objects");var e,a;if(g=="***"){g=null}else{if(g&&f){var h=(SC.typeOf(f.length)===SC.T_FUNCTION)?f.length():f.length;
e=null;while(!e&&(--h>=0)){a=f.objectAt?f.objectAt(h):f[h];if(!a){continue}if(c){a=(a.get)?a.get(c):a[c]
}var b=(a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null;if(g==b){e=a}}}}return(c||e)?e:g
},setFieldValue:function(a){if(SC.none(a)){a="***"}else{a=((a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null)
}this.$input().val(a);return this},fieldDidFocus:function(){var a=this.get("isFocused");
if(!a){this.set("isFocused",true)}},fieldDidBlur:function(){var a=this.get("isFocused");
if(a){this.set("isFocused",false)}},_isFocusedObserver:function(){this.$().setClass("focus",this.get("isFocused"))
}.observes("isFocused"),didCreateLayer:function(){var a=this.$input();if(this.get("isEnabled")===false){this.$()[0].disabled=true
}SC.Event.add(a,"blur",this,this.fieldDidBlur);SC.Event.add(a,"focus",this,this.fieldDidFocus);
return arguments.callee.base.apply(this,arguments)},willDestroyLayer:function(){var a=this.$input();
SC.Event.remove(a,"focus",this,this.fieldDidFocus);SC.Event.remove(a,"blur",this,this.fieldDidBlur);
return arguments.callee.base.apply(this,arguments)}});SC.SliderView=SC.View.extend(SC.Control,{classNames:"sc-slider-view",handleSelector:"img.sc-handle",value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),contentMaximumKey:null,step:0.1,displayProperties:"value minimum maximum".w(),render:function(e,h){arguments.callee.base.apply(this,arguments);
var c=this.get("minimum"),a=this.get("maximum"),g=this.get("value"),f=this.get("step");
g=Math.min(Math.max(g,c),a);if(!SC.none(f)&&f!==0){g=Math.round(g/f)*f}if(g!==0){g=Math.floor((g-c)/(a-c)*100)
}if(h){var b=SC.BLANK_IMAGE_URL;e.push('<span class="sc-inner">','<span class="sc-leftcap"></span>','<span class="sc-rightcap"></span>','<img src="',b,'" class="sc-handle" style="left: ',g,'%" />',"</span>")
}else{this.$(this.get("handleSelector")).css("left",g+"%")}},_isMouseDown:NO,mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;return this._triggerHandle(a,true)
},mouseDragged:function(a){return this._isMouseDown?this._triggerHandle(a):YES},mouseUp:function(a){if(this._isMouseDown){this.set("isActive",NO)
}var b=this._isMouseDown?this._triggerHandle(a):YES;this._isMouseDown=NO;return b
},mouseWheel:function(b){if(!this.get("isEnabled")){return YES}var e=this.get("minimum"),a=this.get("maximum"),c=this.get("value")+((b.wheelDeltaX+b.wheelDeltaY)*0.01),f=this.get("step"),g=Math.round(c/f)*f;
if(c<e){this.setIfChanged("value",e)}else{if(c>a){this.setIfChanged("value",a)}else{this.setIfChanged("value",c)
}}return YES},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
},touchesDragged:function(a){return this.mouseDragged(a)},_triggerHandle:function(b,f){var g=this.get("frame").width,e=this.get("minimum"),a=this.get("maximum"),h=this.get("step"),c=this.get("value"),j;
if(f){j=this.convertFrameFromView({x:b.pageX}).x;this._evtDiff=b.pageX-j}else{j=b.pageX-this._evtDiff
}j=Math.max(Math.min(j,g-8),8)-8;g-=16;j=j/g;j=e+((a-e)*j);if(h!==0){j=Math.round(j/h)*h
}if(Math.abs(c-j)>=0.01){this.set("value",j)}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},keyDown:function(c){if(c.which===9){var b=c.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{c.allowDefault()}return YES}if(c.which===37||c.which===38||c.which===39||c.which===40){var f=this.get("minimum"),a=this.get("maximum"),g=this.get("step"),e=a-f,j=0,h;
if(c.which===37||c.which===38){if(g===0){if(e<100){j=this.get("value")-1}else{h=Math.abs(e/100);
if(h<2){h=2}j=this.get("value")-Math.abs(e/100)}}else{j=this.get("value")-g}}if(c.which===39||c.which===40){if(g===0){if(e<100){j=this.get("value")+2
}else{h=Math.abs(e/100);if(h<2){h=2}j=this.get("value")+h}}else{j=this.get("value")+g
}}if(j>=f&&j<=a){this.set("value",j)}}SC.RunLoop.begin().end();return YES},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
}});sc_require("mixins/collection_group");sc_require("views/disclosure");SC.SourceListGroupView=SC.View.extend(SC.Control,SC.CollectionGroup,{classNames:["sc-source-list-group"],content:null,isGroupVisible:YES,hasGroupTitle:YES,groupTitleKey:null,groupVisibleKey:null,render:function(a,b){a.push('<div role="button" class="sc-source-list-label sc-disclosure-view sc-button-view button disclosure no-disclosure">','<img src="'+SC.BLANK_IMAGE_URL+'" class="button" />','<span class="label"></span></div>')
},createChildViews:function(){},contentPropertyDidChange:function(g,c){var f=this.get("content");
var j=this.outlet("labelView");if(f===null){j.setIfChanged("isVisible",NO);this.setIfChanged("hasGroupTitle",NO);
return}else{j.setIfChanged("isVisible",YES);this.setIfChanged("hasGroupTitle",YES)
}var b=this.getDelegateProperty("groupTitleKey",this.displayDelegate);if((c=="*")||(b&&(c==b))){var h=(f&&f.get&&b)?f.get(b):f;
if(h!=this._title){this._title=h;if(h){h=h.capitalize()}j.set("title",h)}}var e=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if((c=="*")||(e&&(c==e))){if(e){j.removeClassName("no-disclosure");var a=(f&&f.get)?!!f.get(e):YES;
if(a!=this.get("isGroupVisible")){this.set("isGroupVisible",a);j.set("value",a)}}else{j.addClassName("no-disclosure")
}}},disclosureValueDidChange:function(c){if(c==this.get("isGroupVisible")){return
}var b=this.get("content");var a=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if(b&&b.set&&a){b.set(a,c)}this.set("isGroupVisible",c);if(this.owner&&this.owner.updateChildren){this.owner.updateChildren(true)
}},labelView:SC.DisclosureView.extend({value:YES,_valueObserver:function(){if(this.owner){this.owner.disclosureValueDidChange(this.get("value"))
}}.observes("value")})});sc_require("views/list");sc_require("views/source_list_group");
SC.BENCHMARK_SOURCE_LIST_VIEW=YES;SC.SourceListView=SC.ListView.extend({classNames:["sc-source-list"],rowHeight:32,selectOnMouseDown:NO,actOnSelect:YES});
sc_require("views/split");SC.SplitDividerView=SC.View.extend({classNames:["sc-split-divider-view"],prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){var b=this.get("splitView");return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},doubleClick:function(a){var b=this.get("splitView");return(b)?b.doubleClickInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(a){return this.mouseDown(a)}});sc_require("views/split_divider");
SC.RESIZE_BOTH="resize-both";SC.RESIZE_TOP_LEFT="resize-top-left";SC.RESIZE_BOTTOM_RIGHT="resize-bottom-right";
SC.SplitView=SC.View.extend({classNames:["sc-split-view"],displayProperties:["layoutDirection"],delegate:null,layoutDirection:SC.LAYOUT_HORIZONTAL,canCollapseViews:YES,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,defaultThickness:0.5,isSplitView:YES,topLeftView:SC.View,dividerView:SC.SplitDividerView,bottomRightView:SC.View,topLeftThickness:function(){var a=this.get("topLeftView");
return a?this.thicknessForView(a):0}.property("topLeftView").cacheable(),bottomRightThickness:function(){var a=this.get("bottomRightView");
return a?this.thicknessForView(a):0}.property("bottomRightView").cacheable(),thumbViewCursor:null,canCollapseView:function(a){return this.invokeDelegateMethod(this.delegate,"splitViewCanCollapse",this,a)
},thicknessForView:function(a){var c=this.get("layoutDirection"),b=a.get("frame");
return(c===SC.LAYOUT_HORIZONTAL)?b.width:b.height},createChildViews:function(){var f=[],e=["topLeftView","dividerView","bottomRightView"],c,b,a;
for(b=0,a=e.length;b<a;++b){if(c=this.get(e[b])){c=this[e[b]]=this.createChildView(c,{layoutView:this,rootElementPath:[b]});
f.push(c)}}this.set("childViews",f);return this},updateChildLayout:function(){var a=this.get("topLeftView"),b=this.get("bottomRightView"),j=this.get("dividerView"),k=this.get("layoutDirection"),e=this._desiredTopLeftThickness;
var l=this.get("dividerThickness");l=(!SC.none(l))?l:7;var h=(k===SC.LAYOUT_HORIZONTAL)?this.get("frame").width:this.get("frame").height,m=h-l-e,c=this.get("autoresizeBehavior"),g,f;
f=a.get("isCollapsed")||NO;a.setIfChanged("isVisible",!f);g=SC.clone(a.get("layout"));
if(k===SC.LAYOUT_HORIZONTAL){g.top=0;g.left=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:g.right=m+l;delete g.width;break;case SC.RESIZE_BOTTOM_RIGHT:delete g.right;
delete g.height;g.width=e;break}}else{g.top=0;g.left=0;g.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:g.bottom=m+l;delete g.height;break;case SC.RESIZE_BOTTOM_RIGHT:delete g.bottom;
delete g.width;g.height=e;break}}a.set("layout",g);if(j){g=SC.clone(j.get("layout"));
if(k===SC.LAYOUT_HORIZONTAL){g.width=l;delete g.height;g.top=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete g.left;g.right=m;delete g.centerX;delete g.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:g.left=e;delete g.right;delete g.centerX;delete g.centerY;
break}}else{delete g.width;g.height=l;g.left=0;g.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete g.top;g.bottom=m;delete g.centerX;delete g.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:g.top=e;delete g.bottom;delete g.centerX;delete g.centerY;
break}}j.set("layout",g)}f=b.get("isCollapsed")||NO;b.setIfChanged("isVisible",!f);
g=SC.clone(b.get("layout"));if(k===SC.LAYOUT_HORIZONTAL){g.top=0;g.bottom=0;g.right=0;
switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";case SC.RESIZE_BOTTOM_RIGHT:g.left=e+l;
delete g.width;break;case SC.RESIZE_TOP_LEFT:delete g.left;g.width=m;break}}else{g.left=0;
g.right=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_BOTTOM_RIGHT:g.top=e+l;delete g.height;break;case SC.RESIZE_TOP_LEFT:delete g.top;
g.height=m;break}}b.set("layout",g);this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
},renderLayout:function(b,a){if(a||this._recalculateDivider){if(!this.get("thumbViewCursor")){this.set("thumbViewCursor",SC.Cursor.create())
}var e=this.get("layoutDirection"),g=this.get("frame"),f,k=this.$(),j=this.get("defaultThickness"),c=this.get("autoresizeBehavior");
var h=this.get("dividerThickness");h=(!SC.none(h))?h:7;if(this._recalculateDivider===undefined&&j<1){this._recalculateDivider=YES
}else{if(this._recalculateDivider){this._recalculateDivider=NO}}if(k[0]){f=(e===SC.LAYOUT_HORIZONTAL)?k[0].offsetWidth:k[0].offsetHeight
}else{f=(e===SC.LAYOUT_HORIZONTAL)?g.width:g.height}if(SC.none(j)||(j>0&&j<1)){j=Math.floor((f-(h))*(j||0.5))
}if(c===SC.RESIZE_BOTTOM_RIGHT){this._desiredTopLeftThickness=j}else{this._desiredTopLeftThickness=f-h-j
}this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this._updateTopLeftThickness(0);this._setCursorStyle();this.updateChildLayout()}arguments.callee.base.apply(this,arguments)
},render:function(b,c){arguments.callee.base.apply(this,arguments);if(this._inLiveResize){this._setCursorStyle()
}var a=this.get("layoutDirection");if(a===SC.LAYOUT_HORIZONTAL){b.addClass("sc-horizontal")
}else{b.addClass("sc-vertical")}},mouseDownInThumbView:function(a,c){var b=this.getPath("pane.rootResponder");
if(!b){return NO}b.dragDidStart(this);this._mouseDownX=a.pageX;this._mouseDownY=a.pageY;
this._thumbView=c;this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this.beginLiveResize();this._inLiveResize=YES;return YES},mouseDragged:function(a){var b=(this._layoutDirection===SC.LAYOUT_HORIZONTAL)?a.pageX-this._mouseDownX:a.pageY-this._mouseDownY;
this._updateTopLeftThickness(b);return YES},mouseUp:function(a){if(this._inLiveResize===YES){this._thumbView=null;
this._inLiveResize=NO;this.endLiveResize();return YES}return NO},touchesDragged:function(a){return this.mouseDragged(a)
},touchEnd:function(a){return this.mouseUp(a)},doubleClickInThumbView:function(b,e){var a=this._topLeftView,c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){a=this._bottomRightView;c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){return NO}}if(!c){this._uncollapsedThickness=this.thicknessForView(a);
if(a===this._topLeftView){this._updateTopLeftThickness(this.topLeftThickness()*-1)
}else{this._updateBottomRightThickness(this.bottomRightThickness()*-1)}if(!a.get("isCollapsed")){this._uncollapsedThickness=null
}}else{if(a===this._topLeftView){this._updateTopLeftThickness(this._uncollapsedThickness)
}else{this._updateBottomRightThickness(this._uncollapsedThickness)}a._uncollapsedThickness=null
}this._setCursorStyle();return true},_updateTopLeftThickness:function(f){var a=this._topLeftView,c=this._bottomRightView,g=this.thicknessForView(a),h=this.thicknessForView(c),l=this._dividerThickness,k=0,b=this._topLeftViewThickness+f,o=this._layoutDirection,q=this.canCollapseView(c),n=b,m=this.get("topLeftMaxThickness"),e=this.get("topLeftMinThickness"),p,j,s;
if(!a.get("isCollapsed")){k+=g}if(!c.get("isCollapsed")){k+=h}if(!SC.none(m)){n=Math.min(m,n)
}if(!SC.none(e)){n=Math.max(e,n)}m=this.get("bottomRightMaxThickness");e=this.get("bottomRightMinThickness");
p=k-n;if(!SC.none(m)){p=Math.min(m,p)}if(!SC.none(e)){p=Math.max(e,p)}n=k-p;n=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,a,n);
n=Math.min(n,k);n=Math.max(0,n);j=a.get("collapseAtThickness");if(!j){j=0}s=c.get("collapseAtThickness");
s=SC.none(s)?k:(k-s);if((b<=j)&&this.canCollapseView(a)){m=c.get("maxThickness");
if(!m||(l+k)<=m){n=0}}else{if(b>=s&&this.canCollapseView(c)){m=a.get("maxThickness");
if(!m||(l+k)<=m){n=k}}}if(n!=this.thicknessForView(a)){this._desiredTopLeftThickness=n;
a.set("isCollapsed",n===0);c.set("isCollapsed",n>=k);this.updateChildLayout();this.displayDidChange()
}},_updateBottomRightThickness:function(f){var a=this._topLeftView,c=this._bottomRightView,g=this.thicknessForView(a),h=this.thicknessForView(c),l=this._dividerThickness,k=0,b=this._topLeftViewThickness+f,o=this._layoutDirection,q=this.canCollapseView(c),n=b,m=this.get("topLeftMaxThickness"),e=this.get("topLeftMinThickness"),p,j,s;
if(!a.get("isCollapsed")){k+=g}if(!c.get("isCollapsed")){k+=h}if(!SC.none(m)){n=Math.min(m,n)
}if(!SC.none(e)){n=Math.max(e,n)}m=this.get("bottomRightMaxThickness");e=this.get("bottomRightMinThickness");
p=k-n;if(!SC.none(m)){p=Math.min(m,p)}if(!SC.none(e)){p=Math.max(e,p)}n=k-p;n=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,a,n);
n=Math.min(n,k);n=Math.max(0,n);j=a.get("collapseAtThickness");if(!j){j=0}s=c.get("collapseAtThickness");
s=SC.none(s)?k:(k-s);if((b<=j)&&this.canCollapseView(a)){m=c.get("maxThickness");
if(!m||(l+k)<=m){n=0}}else{if(b>=s&&this.canCollapseView(c)){m=a.get("maxThickness");
if(!m||(l+k)<=m){n=k}}}if(n!=this.thicknessForView(a)){this._desiredTopLeftThickness=n;
a.set("isCollapsed",n===0);c.set("isCollapsed",n>=k);this.updateChildLayout();this.displayDidChange()
}},_setCursorStyle:function(){var e=this._topLeftView,f=this._bottomRightView,a=this.get("thumbViewCursor"),b=this.thicknessForView(e),c=this.thicknessForView(f);
this._layoutDirection=this.get("layoutDirection");if(e.get("isCollapsed")||b===this.get("topLeftMinThickness")||c==this.get("bottomRightMaxThickness")){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"s-resize")
}else{if(f.get("isCollapsed")||b===this.get("topLeftMaxThickness")||c==this.get("bottomRightMinThickness")){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"w-resize":"n-resize")
}else{if(SC.browser.msie){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"n-resize")
}else{a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"ew-resize":"ns-resize")
}}}}.observes("layoutDirection"),splitViewCanCollapse:function(b,a){if(b.get("canCollapseViews")===NO){return NO
}if(a.get("canCollapse")===NO){return NO}return YES},splitViewConstrainThickness:function(c,a,b){return b
},_forceSplitCalculation:function(){this.updateLayout()}.observes("*pane.isPaneAttached"),viewDidResize:function(){arguments.callee.base.apply(this,arguments);
this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
}.observes("layout")});sc_require("views/collection");SC.StackedView=SC.CollectionView.extend({classNames:["sc-stacked-view"],layout:{top:0,left:0,right:0,height:1},computeNowShowing:function(a){return this.get("allContentIndexes")
},updateHeight:function(a){if(a){this._updateHeight()}else{this.invokeLast(this._updateHeight)
}return this},_updateHeight:function(){var f=this.get("childViews"),b=f.get("length"),c,e,a;
if(b===0){a=1}else{c=f.objectAt(b-1);e=c?c.get("layer"):null;a=e?(e.offsetTop+e.offsetHeight):1;
e=null}this.adjust("height",a)},didReload:function(a){return this.updateHeight()},didCreateLayer:function(){return this.updateHeight()
}});SC.StaticContentView=SC.View.extend(SC.StaticLayout,{classNames:["sc-static-content-view"],displayProperties:["content"],content:null,contentLayoutDidChange:function(){this._viewFrameDidChange()
},useStaticLayout:YES,frame:function(){var a=this.get("layer"),b;if(!a){return{x:0,y:0,width:0,height:0}
}if(a.getBoundingClientRect){b=a.getBoundingClientRect();return{x:0,y:0,width:b.width,height:b.height}
}else{return{x:0,y:0,width:a.clientWidth,height:a.clientHeight}}}.property("content").cacheable(),parentViewDidResize:function(){this.contentLayoutDidChange()
},didCreateLayer:function(){this.contentLayoutDidChange()},render:function(a,c){var b=this.get("content");
if(b){a.push(b||"")}}});sc_require("views/segmented");SC.TOP_LOCATION="top";SC.TOP_TOOLBAR_LOCATION="top-toolbar";
SC.BOTTOM_LOCATION="bottom";SC.TabView=SC.View.extend({classNames:["sc-tab-view"],displayProperties:["nowShowing"],nowShowing:null,items:[],isEnabled:YES,itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemToolTipKey:null,tabHeight:SC.REGULAR_BUTTON_HEIGHT,tabLocation:SC.TOP_LOCATION,userDefaultKey:null,_tab_nowShowingDidChange:function(){var a=this.get("nowShowing");
this.get("containerView").set("nowShowing",a);this.get("segmentedView").set("value",a);
return this}.observes("nowShowing"),_tab_saveUserDefault:function(){var a=this.get("nowShowing");
var b=this.get("userDefaultKey");if(b){SC.userDefaults.set([b,"nowShowing"].join(":"),a)
}}.observes("nowShowing"),_tab_itemsDidChange:function(){this.get("segmentedView").set("items",this.get("items"));
return this}.observes("items"),init:function(){arguments.callee.base.apply(this,arguments);
this._tab_nowShowingDidChange()._tab_itemsDidChange()},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("userDefaultKey");if(a){a=[a,"nowShowing"].join(":");var b=SC.userDefaults.get(a);
if(!SC.none(b)){this.set("nowShowing",b)}}},createChildViews:function(){var g=[],a,f,e,c=this.get("tabLocation"),b=this.get("tabHeight");
e=(c===SC.TOP_LOCATION)?{top:b/2+1,left:0,right:0,bottom:0}:(c===SC.TOP_TOOLBAR_LOCATION)?{top:b+1,left:0,right:0,bottom:0}:{top:0,left:0,right:0,bottom:b-1};
f=this.containerView.extend(SC.Border,{layout:e,borderStyle:SC.BORDER_BLACK});a=this.containerView=this.createChildView(f);
g.push(a);e=(c===SC.TOP_LOCATION||c===SC.TOP_TOOLBAR_LOCATION)?{height:b,left:0,right:0,top:0}:{height:b,left:0,right:0,bottom:0};
this.segmentedView=this.get("segmentedView").extend({layout:e,_sc_tab_segmented_valueDidChange:function(){var h=this.get("parentView");
if(h){h.set("nowShowing",this.get("value"))}this.set("layerNeedsUpdate",YES);this.invokeOnce(this.updateLayerIfNeeded)
}.observes("value"),init:function(){var h=this.get("parentView");if(h){SC._TAB_ITEM_KEYS.forEach(function(j){this[j]=h.get(j)
},this)}return arguments.callee.base.apply(this,arguments)}});a=this.segmentedView=this.createChildView(this.segmentedView);
g.push(a);this.set("childViews",g);return this},containerView:SC.ContainerView,segmentedView:SC.SegmentedView});
SC._TAB_ITEM_KEYS="itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey itemActionKey itemTargetKey".w();
SC.ThumbView=SC.View.extend({classNames:["sc-thumb-view"],isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){if(!this.get("isEnabled")){return NO}var b=this.get("splitView");
return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(a){return this.mouseDown(a)}});SC.ToolbarView=SC.View.extend({classNames:["sc-toolbar-view"],anchorLocation:null,layout:{left:0,height:32,right:0},init:function(){if(this.anchorLocation){this.layout=SC.merge(this.layout,this.anchorLocation)
}arguments.callee.base.apply(this,arguments)}});SC.WebView=SC.View.extend(SC.Control,{classNames:"sc-web-view",displayProperties:["value","shouldAutoResize"],shouldAutoResize:NO,render:function(a,e){var c=this.get("value");
if(e){a.push('<iframe src="'+c+'" style="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0p;"></iframe>')
}else{var b=this.$("iframe");b.attr("src","javascript:;");b.attr("src",c)}},didCreateLayer:function(){var a=this.$("iframe");
SC.Event.add(a,"load",this,this.iframeDidLoad)},iframeDidLoad:function(){if(this.get("shouldAutoResize")===YES){var a;
var c=this.$("iframe")[0];if(c&&c.contentWindow){a=c.contentWindow;if(a&&a.document&&a.document.documentElement){var b=a.document.documentElement;
if(!SC.browser.isIE){this.$().width(b.scrollWidth);this.$().height(b.scrollHeight)
}else{this.$().width(b.scrollWidth+12);this.$().height(b.scrollHeight+5)}}}}}});SC.WELL_CONTAINER_PADDING=15;
SC.WellView=SC.ContainerView.extend({classNames:"sc-well-view",contentLayout:{top:SC.WELL_CONTAINER_PADDING,bottom:SC.WELL_CONTAINER_PADDING,left:SC.WELL_CONTAINER_PADDING,right:SC.WELL_CONTAINER_PADDING},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);a.set("layout",this.contentLayout);
this.childViews=[a]}},render:function(a,b){if(b){a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>","<div class='content-background'></div>")
}arguments.callee.base.apply(this,arguments)},contentViewDidChange:function(){var a=this.get("contentView");
a.set("layout",this.contentLayout);this.replaceContent(a)}.observes("contentView")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/desktop")
}SC.DataSource=SC.Object.extend({fetch:function(a,b){return NO},retrieveRecords:function(a,c,b){return this._handleEach(a,c,this.retrieveRecord,b)
},commitRecords:function(c,b,h,g,j){var e,f,a;if(b.length>0){e=this.createRecords.call(this,c,b,j)
}if(h.length>0){f=this.updateRecords.call(this,c,h,j)}if(g.length>0){a=this.destroyRecords.call(this,c,g,j)
}return((e===f)&&(e===a))?e:SC.MIXED_STATE},cancel:function(a,b){return NO},updateRecords:function(a,b,c){return this._handleEach(a,b,this.updateRecord,null,c)
},createRecords:function(a,b,c){return this._handleEach(a,b,this.createRecord,null,c)
},destroyRecords:function(a,b,c){return this._handleEach(a,b,this.destroyRecord,null,c)
},_handleEach:function(h,e,c,a,b){var f=e.length,j,g,k,l;if(!a){a=[]}for(j=0;j<f;
j++){l=a[j]?a[j]:b;k=c.call(this,h,e[j],l,b);if(g===undefined){g=k}else{if(g===YES){g=(k===YES)?YES:SC.MIXED_STATE
}else{if(g===NO){g=(k===NO)?NO:SC.MIXED_STATE}}}}return g?g:null},updateRecord:function(a,b,c){return NO
},retrieveRecord:function(a,b,c){return NO},createRecord:function(a,b,c){return NO
},destroyRecord:function(a,b,c){return NO}});sc_require("data_sources/data_source");
SC.CascadeDataSource=SC.DataSource.extend({dataSources:null,from:function(a){var b=this.get("dataSources");
if(!b){this.set("dataSources",b=[])}b.push(a);return this},fetch:function(c,h){var f=this.get("dataSources"),b=f?f.length:0,e=NO,j,g,a;
for(a=0;(e!==YES)&&a<b;a++){g=f.objectAt(a);j=g.fetch?g.fetch.call(g,c,h):NO;e=this._handleResponse(e,j)
}return e},retrieveRecords:function(c,g){var f=this.get("dataSources"),b=f?f.length:0,e=NO,j,h,a;
for(a=0;(e!==YES)&&a<b;a++){h=f.objectAt(a);j=h.retrieveRecords.call(h,c,g);e=this._handleResponse(e,j)
}return e},commitRecords:function(k,c,h,e){var b=this.get("dataSources"),f=b?b.length:0,g=NO,l,a,j;
for(j=0;(g!==YES)&&j<f;j++){a=b.objectAt(j);l=a.commitRecords.call(a,k,c,h,e);g=this._handleResponse(g,l)
}return g},cancel:function(c,g){var f=this.get("dataSources"),b=f?f.length:0,e=NO,j,h,a;
for(a=0;(e!==YES)&&a<b;a++){h=f.objectAt(a);j=h.cancel.call(h,c,g);e=this._handleResponse(e,j)
}return e},init:function(){arguments.callee.base.apply(this,arguments);var b=this.get("dataSources"),a=b?b.get("length"):0,c;
while(--a>=0){c=b[a];if(SC.typeOf(c)===SC.T_STRING){b[a]=this.get(c)}}},_handleResponse:function(b,a){if(a===YES){return YES
}else{if(b===NO){return(a===NO)?NO:SC.MIXED_STATE}else{return SC.MIXED_STATE}}}});
SC.Record=SC.Object.extend({isRecord:YES,primaryKey:"guid",id:function(a,b){if(b!==undefined){this.writeAttribute(this.get("primaryKey"),b);
return b}else{return SC.Store.idFor(this.storeKey)}}.property("storeKey").cacheable(),status:function(){return this.store.readStatus(this.storeKey)
}.property("storeKey").cacheable(),store:null,storeKey:null,isDestroyed:function(){return !!(this.get("status")&SC.Record.DESTROYED)
}.property("status").cacheable(),isEditable:function(a,b){if(b!==undefined){this._screc_isEditable=b
}if(this.get("status")&SC.Record.READY){return this._screc_isEditable}else{return NO
}}.property("status").cacheable(),_screc_isEditable:YES,isLoaded:function(){var b=SC.Record,a=this.get("status");
return !((a===b.EMPTY)||(a===b.BUSY_LOADING)||(a===b.ERROR))}.property("status").cacheable(),relationships:null,attributes:function(){var a=this.get("store"),b=this.storeKey;
return a.readEditableDataHash(b)}.property(),readOnlyAttributes:function(){var a=this.get("store"),c=this.storeKey,b=a.readDataHash(c);
if(b){b=SC.clone(b)}return b}.property(),childRecords:null,childRecordNamespace:null,refresh:function(){this.get("store").refreshRecord(null,null,this.get("storeKey"));
return this},destroy:function(){this.get("store").destroyRecord(null,null,this.get("storeKey"));
this.notifyPropertyChange("status");this.propagateToAggregates();return this},recordDidChange:function(a){this.get("store").recordDidChange(null,null,this.get("storeKey"),a);
this.notifyPropertyChange("status");this.propagateToAggregates();return this},_editLevel:0,beginEditing:function(){this._editLevel++;
return this},endEditing:function(a){if(--this._editLevel<=0){this._editLevel=0;this.recordDidChange(a)
}return this},readAttribute:function(c){var a=this.get("store"),e=this.storeKey;var b=a.readDataHash(e);
return b?b[c]:undefined},writeAttribute:function(e,h,g){var b=this.get("store"),f=this.storeKey,a=b.peekStatus(f),c;
c=b.readEditableDataHash(f);if(!c){throw SC.Record.BAD_STATE_ERROR}if(h!==c[e]){if(!g){this.beginEditing()
}c[e]=h;if(e===this.get("primaryKey")){SC.Store.replaceIdFor(f,h);this.propertyDidChange("id")
}if(!g){this.endEditing(e)}}return this},propagateToAggregates:function(){var q=this.get("storeKey"),e=SC.Store.recordTypeFor(q),o,j,p,b,n;
var h=e.aggregates;if(!h){var g=this.get("store").readDataHash(q);h=[];for(var c in g){if(this[c]&&this[c].get&&this[c].get("aggregate")===YES){h.push(c)
}}e.aggregates=h}var m=SC.Record,a=m.DIRTY,f=m.READY_NEW,s=m.DESTROYED,t=m.READY_CLEAN,l;
l=function(v){var k,u;if(v){k=this.get("status");if((k&a)||(k&f)||(k&s)){u=v.get("status");
if(u===t){v.get("store").recordDidChange(v.constructor,null,v.get("storeKey"),null,YES)
}}}};for(o=0,j=h.length;o<j;++o){p=h[o];b=this.get(p);n=SC.kindOf(b,SC.ManyArray)?b:[b];
n.forEach(l,this)}},storeDidChangeProperties:function(a,b){if(a){this.notifyPropertyChange("status")
}else{if(b){this.beginPropertyChanges();b.forEach(function(f){this.notifyPropertyChange(f)
},this);this.notifyPropertyChange("status");this.endPropertyChanges()}else{this.allPropertiesDidChange()
}var e=this.relationships,c=e?e.length:0;while(--c>=0){e[c].recordPropertyDidChange(b)
}}},normalize:function(f){var l=this.primaryKey,c=this.get("id"),m=this.get("store"),o=this.get("storeKey"),n,j,e,s,h,q,b,a,k,p;
var g=m.readEditableDataHash(o)||{};g[l]=c;s=m.readDataHash(o);for(n in this){j=this[n];
if(j){e=j.typeClass;if(e){p=j.get("key")||n;b=SC.typeOf(e.call(j))===SC.T_CLASS;a=j.isChildRecordTransform;
if(!b&&!a){h=this.get(n);if(h!==undefined||(h===null&&f)){g[p]=h}}else{if(a){h=this.get(n);
if(h&&h.normalize){h.normalize()}}else{if(b){h=s[n];if(h!==undefined){g[p]=h}else{k=j.get("defaultValue");
if(SC.typeOf(k)===SC.T_FUNCTION){g[p]=k(this,n,k)}else{g[p]=k}}}}}}}}return this},unknownProperty:function(b,e){if(e!==undefined){var c=this.get("storeKey"),f=SC.Store.recordTypeFor(c);
if(f.ignoreUnknownProperties===YES){this[b]=e;return e}var a=this.get("primaryKey");
this.writeAttribute(b,e);if(b===a){SC.Store.replaceIdFor(c,e)}}return this.readAttribute(b)
},commitRecord:function(b){var a=this.get("store");a.commitRecord(undefined,undefined,this.get("storeKey"),b);
return this},isError:function(){return this.get("status")&SC.Record.ERROR}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readError(this.get("storeKey"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),toString:function(){var a=this.get("store").readDataHash(this.get("storeKey"));
return"%@(%@) %@".fmt(this.constructor.toString(),SC.inspect(a),this.statusString())
},statusString:function(){var b=[],a=this.get("status");for(var c in SC.Record){if(c.match(/[A-Z_]$/)&&SC.Record[c]===a){b.push(c)
}}return b.join(" ")},registerChildRecord:function(g,f){var c=g.primaryKey||"childRecordKey";
var e=f[c];var b=null;var a=this.get("childRecords");if(e&&a){b=a[e]}if(SC.none(b)){b=this.createChildRecord(g,f)
}return b},createChildRecord:function(h,j){SC.RunLoop.begin();var e=SC.Record._generateChildKey();
j=j||{};var c=h.primaryKey||"childRecordKey";var g=j[c];j[c]=e;var b=this.get("store");
if(SC.none(b)){throw"Error: during the creation of a child record: NO STORE ON PARENT!"
}var f=b.createRecord(h,j);f._parentRecord=this;if(this.generateIdForChild){this.generateIdForChild(f)
}var a=this.get("childRecords");if(SC.none(a)){a=SC.Object.create();this.set("childRecords",a)
}a[e]=f;SC.RunLoop.end();return f},generateIdForChild:function(a){}});SC.Record.mixin({ignoreUnknownProperties:NO,CLEAN:1,DIRTY:2,EMPTY:256,ERROR:4096,READY:512,READY_CLEAN:513,READY_DIRTY:514,READY_NEW:515,DESTROYED:1024,DESTROYED_CLEAN:1025,DESTROYED_DIRTY:1026,BUSY:2048,BUSY_LOADING:2052,BUSY_CREATING:2056,BUSY_COMMITTING:2064,BUSY_REFRESH:2080,BUSY_REFRESH_CLEAN:2081,BUSY_REFRESH_DIRTY:2082,BUSY_DESTROYING:2112,BAD_STATE_ERROR:SC.$error("Internal Inconsistency"),RECORD_EXISTS_ERROR:SC.$error("Record Exists"),NOT_FOUND_ERROR:SC.$error("Not found "),BUSY_ERROR:SC.$error("Busy"),GENERIC_ERROR:SC.$error("Generic Error"),_nextChildKey:0,attr:function(a,b){return SC.RecordAttribute.attr(a,b)
},fetch:function(b,a){return SC.FetchedAttribute.attr(b,a)},toMany:function(e,b){b=b||{};
var c=b.nested;var a;if(c){a=SC.ChildrenAttribute.attr(e,b)}else{a=SC.ManyAttribute.attr(e,b)
}return a},toOne:function(e,b){b=b||{};var c=b.nested;var a;if(c){a=SC.ChildAttribute.attr(e,b)
}else{a=SC.SingleAttribute.attr(e,b)}return a},storeKeysById:function(){var b=SC.keyFor("storeKey",SC.guidFor(this)),a=this[b];
if(!a){a=this[b]={}}return a},storeKeyFor:function(c){var b=this.storeKeysById(),a=b[c];
if(!a){a=SC.Store.generateStoreKey();SC.Store.idsByStoreKey[a]=c;SC.Store.recordTypesByStoreKey[a]=this;
b[c]=a}return a},storeKeyExists:function(c){var b=this.storeKeysById(),a=b[c];return a
},find:function(a,b){return a.find(this,b)},extend:function(){var a=SC.Object.extend.apply(this,arguments);
SC.Query._scq_didDefineRecordType(a);return a},_generateChildKey:function(){var a=SC.Record._nextChildKey+1;
SC.Record._nextChildKey=a;return a}});sc_require("data_sources/data_source");sc_require("models/record");
SC.FixturesDataSource=SC.DataSource.extend({simulateRemoteResponse:NO,latency:50,cancel:function(a,b){return NO
},fetch:function(a,b){if(b.get("location")!==SC.Query.LOCAL){throw SC.$error("SC.Fixture data source can only fetch local queries")
}if(!b.get("recordType")&&!b.get("recordTypes")){throw SC.$error("SC.Fixture data source can only fetch queries with one or more record types")
}if(this.get("simulateRemoteResponse")){this.invokeLater(this._fetch,this.get("latency"),a,b)
}else{this._fetch(a,b)}},_fetch:function(a,c){var e=c.get("recordType"),b=c.get("recordTypes")||[e];
b.forEach(function(f){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f)
}if(f){this.loadFixturesFor(a,f)}},this);a.dataSourceDidFetchQuery(c)},retrieveRecords:function(a,c){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._retrieveRecords,e,a,c)
}else{this._retrieveRecords(a,c)}return b},_retrieveRecords:function(a,b){b.forEach(function(e){var c=[],h=SC.Store.recordTypeFor(e),g=a.idFor(e),f=this.fixtureForStoreKey(a,e);
c.push(e);a.dataSourceDidComplete(e,f,g)},this)},updateRecords:function(a,c,f){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._updateRecords,e,a,c)
}else{this._updateRecords(a,c)}return b},_updateRecords:function(a,b){b.forEach(function(c){var e=a.readDataHash(c);
this.setFixtureForStoreKey(a,c,e);a.dataSourceDidComplete(c)},this)},createRecords:function(a,b,e){var c=this.get("latency");
if(this.get("simulateRemoteResponse")){this.invokeLater(this._createRecords,c,a,b)
}else{this._createRecords(a,b)}return YES},_createRecords:function(a,b){b.forEach(function(f){var h=a.idFor(f),g=a.recordTypeFor(f),e=a.readDataHash(f),c=this.fixturesFor(g);
if(!h){h=this.generateIdFor(g,e,a,f)}this._invalidateCachesFor(g,f,h);c[h]=e;a.dataSourceDidComplete(f,null,h)
},this)},destroyRecords:function(a,c,f){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._destroyRecords,e,a,c)
}else{this._destroyRecords(a,c)}return b},_destroyRecords:function(a,b){b.forEach(function(e){var g=a.idFor(e),f=a.recordTypeFor(e),c=this.fixturesFor(f);
this._invalidateCachesFor(f,e,g);if(g){delete c[g]}a.dataSourceDidDestroy(e)},this)
},loadFixturesFor:function(a,h,c){var b=[],f,e,g;f=this.fixturesFor(h);for(e in f){g=h.storeKeyFor(e);
if(a.peekStatus(g)===SC.Record.EMPTY){b.push(f[e])}if(c){c.push(g)}}if(b&&b.length>0){a.loadRecords(h,b)
}return this},generateIdFor:function(e,b,a,c){return"@id%@".fmt(SC.Store.generateStoreKey())
},fixtureForStoreKey:function(a,c){var f=a.idFor(c),e=a.recordTypeFor(c),b=this.fixturesFor(e);
return b?b[f]:null},setFixtureForStoreKey:function(a,e,c){var g=a.idFor(e),f=a.recordTypeFor(e),b=this.fixturesFor(f);
this._invalidateCachesFor(f,e,g);b[g]=c;return this},fixturesFor:function(j){if(!this._fixtures){this._fixtures={}
}var g=this._fixtures[SC.guidFor(j)];if(g){return g}var f=j?j.FIXTURES:null,b=f?f.length:0,c=j?j.prototype.primaryKey:"guid",a,e,h;
this._fixtures[SC.guidFor(j)]=g={};for(a=0;a<b;a++){e=f[a];h=e[c];if(!h){h=this.generateIdFor(j,e)
}g[h]=e}return g},fixturesLoadedFor:function(c){if(!this._fixtures){return NO}var a=[],b=this._fixtures[SC.guidFor(c)];
return b?YES:NO},hasFixturesFor:function(b){var a=NO;b.forEach(function(e){if(a!==SC.MIXED_STATE){var f=SC.Store.recordTypeFor(e),c=f?f.FIXTURES:null;
if(c&&c.length&&c.length>0){if(a===NO){a=YES}}else{if(a===YES){a=SC.MIXED_STATE}}}},this);
return a},_invalidateCachesFor:function(e,b,c){var a=this._storeKeyCache;if(a){delete a[SC.guidFor(e)]
}return this}});SC.Record.fixtures=SC.FixturesDataSource.create();sc_require("core");
sc_require("models/record");SC.Query=SC.Object.extend(SC.Copyable,SC.Freezable,{isQuery:YES,conditions:null,orderBy:null,recordType:null,recordTypes:null,expandedRecordTypes:function(){var b=SC.CoreSet.create(),a,c;
if(a=this.get("recordType")){this._scq_expandRecordType(a,b)}else{if(a=this.get("recordTypes")){a.forEach(function(e){this._scq_expandRecordType(e,b)
},this)}else{this._scq_expandRecordType(SC.Record,b)}}c=SC.Query._scq_queriesWithExpandedRecordTypes;
if(!c){c=SC.Query._scq_queriesWithExpandedRecordTypes=SC.CoreSet.create()}c.add(this);
return b.freeze()}.property("recordType","recordTypes").cacheable(),_scq_expandRecordType:function(b,a){if(a.contains(b)){return
}a.add(b);if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)}b.subclasses.forEach(function(c){this._scq_expandRecordType(c,a)
},this)},parameters:null,location:"local",scope:null,isRemote:function(){return this.get("location")===SC.Query.REMOTE
}.property("location").cacheable(),isLocal:function(){return this.get("location")===SC.Query.LOCAL
}.property("location").cacheable(),isEditable:NO,contains:function(a,e){var f,b=YES;
if(f=this.get("recordTypes")){b=f.find(function(g){return SC.kindOf(a,g)})}else{if(f=this.get("recordType")){b=SC.kindOf(a,f)
}}if(!b){return NO}var c=this.get("scope");if(c&&!c.contains(a)){return NO}if(!this._isReady){this.parse()
}if(!this._isReady){return NO}if(e===undefined){e=this.parameters||this}return this._tokenTree.evaluate(a,e)
},containsRecordTypes:function(a){var b=this.get("recordType");if(b){return !!a.find(function(c){return SC.kindOf(c,b)
})}else{if(b=this.get("recordTypes")){return !!b.find(function(c){return !!a.find(function(e){return SC.kindOf(e,c)
})})}else{return YES}}},compare:function(g,e){var c=0,f,b,a,h;if(g===e){return 0}if(!this._isReady){this.parse()
}if(!this._isReady){return SC.compare(g.get("id"),e.get("id"))}b=this._order;if(SC.typeOf(b)===SC.T_FUNCTION){c=b.call(null,g,e)
}else{a=b?b.length:0;for(h=0;c===0&&(h<a);h++){f=b[h].propertyName;if(SC.Query.comparisons[f]){c=SC.Query.comparisons[f](g.get(f),e.get(f))
}else{c=SC.compare(g.get(f),e.get(f))}if((c!==0)&&b[h].descending){c=(-1)*c}}}if(c!==0){return c
}else{return SC.compare(g.get("id"),e.get("id"))}},_isReady:NO,parse:function(){var c=this.get("conditions"),e=this.get("queryLanguage"),b,a;
b=this._tokenList=this.tokenizeString(c,e);a=this._tokenTree=this.buildTokenTree(b,e);
this._order=this.buildOrder(this.get("orderBy"));this._isReady=!!a&&!a.error;if(a&&a.error){throw a.error
}return this._isReady},queryWithScope:function(c){var b=SC.keyFor("__query__",SC.guidFor(this)),a=c[b];
if(!a){c[b]=a=this.copy();a.set("scope",c);a.freeze()}return a},copyKeys:"conditions orderBy recordType recordTypes parameters location scope".w(),concatenatedProperties:"copyKeys".w(),copy:function(){var e={},c=this.get("copyKeys"),g=c?c.length:0,b,f,a;
while(--g>=0){b=c[g];f=this.get(b);if(f!==undefined){e[b]=f}}a=this.constructor.create(e);
e=null;return a},queryLanguage:{UNKNOWN:{firstCharacter:/[^\s'"\w\d\(\)\{\}]/,notAllowed:/[\s'"\w\d\(\)\{\}]/},PROPERTY:{firstCharacter:/[a-zA-Z_]/,notAllowed:/[^a-zA-Z_0-9]/,evalType:"PRIMITIVE",evaluate:function(b,a){return b.get(this.tokenValue)
}},NUMBER:{firstCharacter:/[\d\-]/,notAllowed:/[^\d\-\.]/,format:/^-?\d+$|^-?\d+\.\d+$/,evalType:"PRIMITIVE",evaluate:function(b,a){return parseFloat(this.tokenValue)
}},STRING:{firstCharacter:/['"]/,delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return this.tokenValue
}},PARAMETER:{firstCharacter:/\{/,lastCharacter:"}",delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},"%@":{rememberCount:true,reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},OPEN_PAREN:{firstCharacter:/\(/,singleCharacter:true},CLOSE_PAREN:{firstCharacter:/\)/,singleCharacter:true},AND:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e&&b}},OR:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e||b}},NOT:{reservedWord:true,rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.rightSide.evaluate(c,a);
return !b}},"=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.isEqual(e,b)}},"!=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return !SC.isEqual(e,b)}},"<":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)==-1}},"<=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)!=1}},">":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)==1}},">=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)!=-1}},BEGINS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.leftSide.evaluate(c,a);
var e=this.rightSide.evaluate(c,a);return(b&&b.indexOf(e)===0)}},ENDS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,b){var c=this.leftSide.evaluate(e,b);
var a=this.rightSide.evaluate(e,b);return(c&&c.indexOf(a)===(c.length-a.length))}},CONTAINS:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var c=this.leftSide.evaluate(e,a)||[];
var g=this.rightSide.evaluate(e,a);switch(SC.typeOf(c)){case SC.T_STRING:return(c.indexOf(g)!==-1);
case SC.T_ARRAY:var f=false;var b=0;while(f===false&&b<c.length){if(g==c[b]){f=true
}b++}return f;default:break}}},ANY:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var g=this.leftSide.evaluate(e,a);
var b=this.rightSide.evaluate(e,a);var f=false;var c=0;while(f===false&&c<b.length){if(g==b[c]){f=true
}c++}return f}},MATCHES:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return b.test(e)}},TYPE_IS:{reservedWord:true,rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var c=SC.Store.recordTypeFor(e.storeKey);
var b=this.rightSide.evaluate(e,a);var f=SC.objectForPropertyPath(b);return c==f}},"null":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return null
}},"undefined":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return undefined
}},"false":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}},"true":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},YES:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},NO:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}}},tokenizeString:function(x,s){var l=[],v=null,j=null,g=null,w=null,a=null,k=null,e=null,h=null,u=false,b=false,n=false,o=false,p={};
function f(y,c){j=s[y];if(j.format&&!j.format.test(c)){y="UNKNOWN"}if(j.delimeted){o=true
}if(!j.delimeted){for(var t in s){if(s[t].reservedWord&&t==c){y=t}}}j=s[y];if(j&&j.rememberCount){if(!p[y]){p[y]=0
}c=p[y];p[y]+=1}l.push({tokenType:y,tokenValue:c});a=null;k=null;e=null}if(!x){return[]
}var m=x.length;for(var q=0;q<m;q++){u=(q===m-1);v=x.charAt(q);o=false;if(a){j=s[a];
b=j.delimeted?v===h:j.notAllowed.test(v);if(!b){e+=v}if(b||u){f(a,e)}if(u&&!b){o=true
}}if(!a&&!o){for(g in s){j=s[g];if(j.firstCharacter&&j.firstCharacter.test(v)){a=g
}}if(a){j=s[a];e=v;if(j.delimeted){e="";if(j.lastCharacter){h=j.lastCharacter}else{h=v
}}if(j.singleCharacter||u){f(a,e)}}}}return l},buildTokenTree:function(m,a){var p=m.slice();
var s=0;var u=[];var c=false;var q=[];if(!m||m.length===0){return{evaluate:function(){return true
}}}function t(l){var y=l;if(y<0){return false}var x=a[p[y].tokenType];if(!x){q.push("logic for token '"+p[y].tokenType+"' is not defined");
return false}p[y].evaluate=x.evaluate;return x}function b(y,l){var z=l;var x=t(z);
if(!x){return false}if(y=="left"){return x.leftType}if(y=="right"){return x.rightType
}}function o(l){var y=l;var x=t(y);if(!x){return false}else{return x.evalType}}function g(l){p.splice(l,1);
if(l<=s){s--}}function v(l){var x=l||s;if(x>0){return true}else{return false}}function k(l){var x=l;
if(x<0){return true}return(b("left",x)&&!p[x].leftSide)||(b("right",x)&&!p[x].rightSide)
}function j(x,y){var l=(y<x)?"left":"right";if(x<0||y<0){return false}if(!b(l,x)){return false
}if(!o(y)){return false}if(b(l,x)==o(y)){return true}else{return false}}function n(l){var x=l;
if(!k(x)){return false}if(!v(x)){return false}if(j(x,x-1)){return true}else{return false
}}function e(l){var x=l;if(k(x)){return false}if(!v(x)){return false}if(!k(x-1)){return false
}if(j(x-1,x)){return true}else{return false}}function h(l){var x=l;if(x<1){return false
}p[x].leftSide=p[x-1];g(x-1)}function w(l){var x=l;if(x<1){return false}p[x-1].rightSide=p[x];
g(x)}function f(l){g(l);g(u.pop())}for(s=0;s<p.length;s++){c=false;if(p[s].tokenType=="UNKNOWN"){q.push("found unknown token: "+p[s].tokenValue)
}if(p[s].tokenType=="OPEN_PAREN"){u.push(s)}if(p[s].tokenType=="CLOSE_PAREN"){f(s)
}if(n(s)){h(s)}if(e(s)){w(s);c=true}if(c){s--}}if(p.length==1){p=p[0]}else{q.push("string did not resolve to a single tree")
}if(q.length>0){return{error:q.join(",\n"),tree:p}}else{return p}},buildOrder:function(a){if(!a){return[]
}else{if(SC.typeOf(a)===SC.T_FUNCTION){return a}else{var e=a.split(",");for(var b=0;
b<e.length;b++){var c=e[b];c=c.replace(/^\s+|\s+$/,"");c=c.replace(/\s+/,",");c=c.split(",");
e[b]={propertyName:c[0]};if(c[1]&&c[1]=="DESC"){e[b].descending=true}}return e}}}});
SC.Query.mixin({LOCAL:"local",REMOTE:"remote",storeKeyFor:function(a){return a?a.get("storeKey"):null
},containsRecords:function(h,f,e){var g=[];for(var b=0,a=f.get("length");b<a;b++){var c=f.objectAt(b);
if(c&&h.contains(c)){g.push(c.get("storeKey"))}}g=SC.Query.orderStoreKeys(g,h,e);
return g},orderStoreKeys:function(f,g,b){if(f){var a=SC.Query,e=a._TMP_STORES,h=a._TMP_QUERIES;
if(!e){e=a._TMP_STORES=[]}if(!h){h=a._TMP_QUERIES=[]}e.push(b);h.push(g);var c=f.sort(SC.Query.compareStoreKeys);
a._TMP_STORES.pop();a._TMP_QUERIES.pop()}return f},compareStoreKeys:function(j,g){var o=SC.Query,m=o._TMP_STORES,b=o._TMP_QUERIES,p=m[m.length-1],n=b[b.length-1],c=n.compare,e=p.materializeRecord(j),a=p.materializeRecord(g);
if(c!==o.prototype.compare){return c.call(n,e,a)}else{var q=0,l,f,k,h;if(e===a){return 0
}if(!n._isReady){n.parse()}if(!n._isReady){return SC.compare(e.get("id"),a.get("id"))
}f=n._order;if(SC.typeOf(f)===SC.T_FUNCTION){q=f.call(null,e,a)}else{k=f?f.length:0;
for(h=0;q===0&&(h<k);h++){l=f[h].propertyName;if(SC.Query.comparisons[l]){q=SC.Query.comparisons[l](e.get(l),a.get(l))
}else{q=SC.compare(e.get(l),a.get(l))}if((q!==0)&&f[h].descending){q=(-1)*q}}}if(q!==0){return q
}else{return SC.compare(e.get("id"),a.get("id"))}}},build:function(j,c,h,e){var a=null,g,b,k,f;
if(c&&c.isQuery){if(c.get("location")===j){return c}else{return c.copy().set("location",j).freeze()
}}if(typeof c===SC.T_STRING){g=SC.objectForPropertyPath(c);if(!g){throw"%@ did not resolve to a class".fmt(c)
}c=g}else{if(c&&c.isEnumerable){g=[];c.forEach(function(l){if(typeof l===SC.T_STRING){l=SC.objectForPropertyPath(l)
}if(!l){throw"cannot resolve record types: %@".fmt(c)}g.push(l)},this);c=g}else{if(!c){c=SC.Record
}}}if(e===undefined){e=null}if(h===undefined){h=null}if(!e&&(typeof h!==SC.T_STRING)){a=h;
h=null}if(!e&&!a){f=SC.Query._scq_recordTypeCache;if(!f){f=SC.Query._scq_recordTypeCache={}
}b=f[j];if(!b){b=f[j]={}}if(c.isEnumerable){k=c.map(function(l){return SC.guidFor(l)
});k=k.sort().join(":")}else{k=SC.guidFor(c)}if(h){k=[k,h].join("::")}g=b[k];if(!g){if(c.isEnumerable){a={recordTypes:c.copy()}
}else{a={recordType:c}}a.location=j;a.conditions=h;g=b[k]=SC.Query.create(a).freeze()
}}else{if(!a){a={}}if(!a.location){a.location=j}if(c&&c.isEnumerable){a.recordsTypes=c
}else{a.recordType=c}if(h){a.conditions=h}if(e){a.parameters=e}g=SC.Query.create(a).freeze()
}return g},local:function(c,a,b){return this.build(SC.Query.LOCAL,c,a,b)},remote:function(c,a,b){return this.build(SC.Query.REMOTE,c,a,b)
},_scq_didDefineRecordType:function(){var a=SC.Query._scq_queriesWithExpandedRecordTypes;
if(a){a.forEach(function(b){b.notifyPropertyChange("expandedRecordTypes")},this);
a.clear()}}});SC.Query.comparisons={};SC.Query.registerComparison=function(a,b){SC.Query.comparisons[a]=b
};SC.Query.registerQueryExtension=function(b,a){SC.Query.prototype.queryLanguage[b]=a
};SC.Q=SC.Query.from;sc_require("core");sc_require("models/record");sc_require("system/query");
SC.ChildRecord=SC.Record.extend({isChildRecord:YES,type:null,primaryKey:"childRecordKey",_parentRecord:null,status:function(){var a=SC.Record.EMPTY;
if(this._parentRecord){a=this._parentRecord.get("status");this.store.writeStatus(this.storeKey,a);
this.store.dataHashDidChange(this.storeKey)}else{a=this.store.readStatus(this.storeKey)
}return a}.property("storeKey").cacheable(),recordDidChange:function(){if(this._parentRecord&&this._parentRecord.recordDidChange){this._parentRecord.recordDidChange()
}else{arguments.callee.base.apply(this,arguments)}},createChildRecord:function(e,c){var a,b=this._parentRecord;
if(b){a=b.createChildRecord(e,c)}else{a=arguments.callee.base.apply(this,arguments)
}return a}});sc_require("models/record");sc_require("models/child_record");SC.RecordAttribute=SC.Object.extend({defaultValue:null,type:String,key:null,isRequired:NO,isEditable:YES,useIsoDate:YES,aggregate:NO,typeClass:function(){var a=this.get("type");
if(SC.typeOf(a)===SC.T_STRING){a=SC.objectForPropertyPath(a)}return a}.property("type").cacheable(),transform:function(){var a=this.get("typeClass")||String,c=SC.RecordAttribute.transforms,b;
while(a&&!(b=c[SC.guidFor(a)])){if(a.superclass.hasOwnProperty("create")){a=a.superclass
}else{a=SC.T_FUNCTION}}return b}.property("typeClass").cacheable(),toType:function(a,c,f){var b=this.get("transform"),e=this.get("typeClass");
if(b&&b.to){f=b.to(f,this,e,a,c)}return f},fromType:function(a,c,f){var b=this.get("transform"),e=this.get("typeClass");
if(b&&b.from){f=b.from(f,this,e,a,c)}return f},call:function(a,b,c){var e=this.get("key")||b,f;
if((c!==undefined)&&this.get("isEditable")){f=this.fromType(a,b,c);a.writeAttribute(e,f)
}f=c=a.readAttribute(e);if(SC.none(c)&&(c=this.get("defaultValue"))){if(typeof c===SC.T_FUNCTION){c=this.defaultValue(a,b,this);
if((f!==c)&&a.get("store").readDataHash(a.get("storeKey"))){a.writeAttribute(e,c,true)
}}}else{c=this.toType(a,b,c)}return c},isProperty:YES,isCacheable:YES,dependentKeys:[],init:function(){arguments.callee.base.apply(this,arguments);
this.cacheKey="__cache__"+SC.guidFor(this);this.lastSetValueKey="__lastValue__"+SC.guidFor(this)
}});SC.RecordAttribute.attr=function(a,b){if(!b){b={}}if(!b.type){b.type=a||String
}return this.create(b)};SC.RecordAttribute.transforms={};SC.RecordAttribute.registerTransform=function(a,b){SC.RecordAttribute.transforms[SC.guidFor(a)]=b
};SC.RecordAttribute.registerTransform(Boolean,{to:function(a){return SC.none(a)?null:!!a
}});SC.RecordAttribute.registerTransform(Number,{to:function(a){return SC.none(a)?null:Number(a)
}});SC.RecordAttribute.registerTransform(String,{to:function(a){if(!(typeof a===SC.T_STRING)&&!SC.none(a)&&a.toString){a=a.toString()
}return a}});SC.RecordAttribute.registerTransform(Array,{to:function(a){if(!SC.isArray(a)&&!SC.none(a)){a=[]
}return a}});SC.RecordAttribute.registerTransform(Object,{to:function(a){if(!(typeof a==="object")&&!SC.none(a)){a={}
}return a}});SC.RecordAttribute.registerTransform(SC.Record,{to:function(f,a,e,c){var b=c.get("store");
if(SC.none(f)||(f==="")){return null}else{return b.find(e,f)}},from:function(a){return a?a.get("id"):null
}});SC.RecordAttribute.registerTransform(SC.T_FUNCTION,{to:function(f,a,e,c){e=e.apply(c);
var b=c.get("store");return b.find(e,f)},from:function(a){return a.get("id")}});SC.RecordAttribute.registerTransform(Date,{to:function(j,a){if(j===null){return null
}var c;j=j.toString()||"";if(a.get("useIsoDate")){var e="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",h=j.match(new RegExp(e)),g=0,b=new Date(h[1],0,1),f;
if(h[3]){b.setMonth(h[3]-1)}if(h[5]){b.setDate(h[5])}if(h[7]){b.setHours(h[7])}if(h[8]){b.setMinutes(h[8])
}if(h[10]){b.setSeconds(h[10])}if(h[12]){b.setMilliseconds(Number("0."+h[12])*1000)
}if(h[14]){g=(Number(h[16])*60)+Number(h[17]);g*=((h[15]=="-")?1:-1)}g-=b.getTimezoneOffset();
f=(Number(b)+(g*60*1000));c=new Date();c.setTime(Number(f))}else{c=new Date(Date.parse(j))
}return c},_dates:{},_zeropad:function(a){return((a<0)?"-":"")+((a<10)?"0":"")+Math.abs(a)
},from:function(b){var a=this._dates[b.getTime()];if(a){return a}var e=this._zeropad,c=0-b.getTimezoneOffset()/60;
c=(c===0)?"Z":"%@:00".fmt(e(c));this._dates[b.getTime()]=a="%@-%@-%@T%@:%@:%@%@".fmt(e(b.getFullYear()),e(b.getMonth()+1),e(b.getDate()),e(b.getHours()),e(b.getMinutes()),e(b.getSeconds()),c);
return a}});if(SC.DateTime&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}sc_require("models/record");sc_require("models/record_attribute");SC.ChildAttribute=SC.RecordAttribute.extend({isChildRecordTransform:YES,toType:function(e,c,f){var b=null,g=SC.keyFor("__kid__",SC.guidFor(this)),h=this.get("typeClass");
if(e[g]){return e[g]}if(!e){throw"SC.Child: Error during transform: Unable to retrieve parent record."
}if(f){var a=e.get("childRecordNamespace");if(f.type&&!SC.none(a)){h=a[f.type]}if(!h||SC.typeOf(h)!==SC.T_CLASS){throw"SC.Child: Error during transform: Invalid record type."
}b=e[g]=e.registerChildRecord(h,f)}return b},fromType:function(a,b,c){return c},call:function(a,b,c){var e=this.get("key")||b,g=SC.keyFor("__kid__",SC.guidFor(this)),f;
if(c!==undefined){this.orphan(a);f=this.fromType(a,b,c);a[g]=null;a.writeAttribute(e,f);
c=this.toType(a,b,c)}else{c=a.readAttribute(e);if(SC.none(c)&&(c=this.get("defaultValue"))){if(typeof c===SC.T_FUNCTION){c=this.defaultValue(a,b,this);
if(a.attributes()){a.writeAttribute(e,c,true)}}}else{c=this.toType(a,b,c)}}return c
},orphan:function(f){var j=SC.keyFor("__kid__",SC.guidFor(this)),b,g,c,e,h,a;a=f?f[j]:null;
if(a){c=a.get("readOnlyAttributes");for(e in c){h=a[e];if(h&&h.isChildRecordTransform){h.orphan(f)
}}b=a.get("store");if(b){g=a.storeKey}if(g){b.unloadRecord(undefined,undefined,g)
}}}});sc_require("models/record");sc_require("models/record_attribute");sc_require("models/child_attribute");
SC.ChildrenAttribute=SC.ChildAttribute.extend({toType:function(b,e,f){var h=this.get("key")||e,g=SC.keyFor("__kidsArray__",SC.guidFor(this)),c=b[g],j=this.get("typeClass"),a;
if(!c){c=SC.ChildArray.create({record:b,propertyName:h,defaultRecordType:j});b[g]=this._cachedRef=c;
a=b.get("relationships");if(!a){b.set("relationships",a=[])}a.push(c)}return c},orphan:function(a){var f=this._cachedRef,g,k,j,h,c,b,e;
if(f){f.forEach(function(l){j=l.get("readOnlyAttributes");for(h in j){b=l[h];if(b&&b.isChildRecordTransform){b.orphan(a)
}}g=l.get("store");if(g){k=l.storeKey}if(k){g.unloadRecord(undefined,undefined,k)
}},this)}}});sc_require("models/record");sc_require("models/record_attribute");SC.FetchedAttribute=SC.RecordAttribute.extend({paramValueKey:"link",paramOwnerKey:"owner",paramRelKey:"rel",queryKey:null,isEditable:NO,toType:function(e,k,h){var j=e.get("store");
if(!j){return null}var b=this.get("paramValueKey"),a=this.get("paramOwnerKey"),g=this.get("paramRelKey"),f=this.get("queryKey")||this.get("typeClass"),c={};
if(b){c[b]=h}if(a){c[a]=e}if(g){c[g]=this.get("key")||k}return j.findAll(f,c)},fromType:function(a,b,c){return c
}});sc_require("models/record");sc_require("models/record_attribute");SC.ManyAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,orderBy:null,toType:function(b,e,g){var f=this.get("typeClass"),j=this.get("key")||e,h=SC.keyFor("__manyArray__",SC.guidFor(this)),c=b[h],a;
if(!c){c=SC.ManyArray.create({recordType:f,record:b,propertyName:j,manyAttribute:this});
b[h]=c;a=b.get("relationships");if(!a){b.set("relationships",a=[])}a.push(c)}return c
},fromType:function(b,f,g){var c=[];if(!SC.isArray(g)){throw"Expects toMany attribute to be an array"
}var a=g.get("length");for(var e=0;e<a;e++){c[e]=g.objectAt(e).get("id")}return c
},inverseDidRemoveRecord:function(a,b,c,e){var f=a.get(b);if(f){f.removeInverseRecord(c)
}},inverseDidAddRecord:function(a,b,c,e){var f=a.get(b);if(f){f.addInverseRecord(c)
}}});sc_require("models/record");sc_require("models/record_attribute");SC.SingleAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,call:function(c,k,b){var a=this.get("key")||k,j,h,l,g,f,e;
if(b!==undefined){if(b&&!SC.kindOf(b,SC.Record)){throw"%@ is not an instance of SC.Record".fmt(b)
}j=this.get("inverse");if(j){l=this._scsa_call(c,k)}e=this.fromType(c,k,b);c.writeAttribute(a,e,!this.get("isMaster"));
f=b;if(j&&(l!==b)){if(l&&(g=l[j])){g.inverseDidRemoveRecord(l,j,c,k)}if(b&&(g=b[j])){g.inverseDidAddRecord(b,j,c,k)
}}}else{f=this._scsa_call(c,k,b)}return f},_scsa_call:SC.RecordAttribute.prototype.call,inverseDidRemoveRecord:function(c,g,h,j){var b=this.get("inverse"),f=this._scsa_call(c,g),e=this.get("isMaster"),a;
c.writeAttribute(g,null,!e);c.notifyPropertyChange(g);if((f!==h)||(j!==b)){if(f&&(a=f[b])){a.inverseDidRemoveRecord(f,b,c,g)
}}},inverseDidAddRecord:function(a,j,c,h){var f=this.get("inverse"),k=this._scsa_call(a,j),g=this.get("isMaster"),e,b;
b=this.fromType(a,j,c);a.writeAttribute(j,b,!g);a.notifyPropertyChange(j);if((k!==c)||(h!==f)){if(k&&(e=k[f])){e.inverseDidRemoveRecord(k,f,a,j)
}}}});SC.ChildArray=SC.Object.extend(SC.Enumerable,SC.Array,{defaultRecordType:null,record:null,propertyName:null,children:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyChildren:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableChildren:function(){var a=this.get("store"),e=this.get("storeKey"),c=this.get("propertyName"),b,f;
b=a.readEditableProperty(e,c);if(!b){f=a.readEditableDataHash(e);b=f[c]=[]}if(b!==this._prevChildren){this.recordPropertyDidChange()
}return b}.property(),length:function(){var a=this.get("readOnlyChildren");return a?a.length:0
}.property("readOnlyChildren"),objectAt:function(b){var f=this._records,e=this.get("readOnlyChildren"),g,c;
var a=e?e.length:0;if(!e){return undefined}if(f&&(c=f[b])){return c}if(!f){this._records=f=[]
}if(b>=a){return undefined}g=e.objectAt(b);if(!g){return undefined}f[b]=c=this._materializeChild(g);
return c},replace:function(l,a,k){var b=this.get("editableChildren"),h=k?(k.get?k.get("length"):k.length):0,g=this.get("record"),e=this.get("propertyName"),j,c;
b.replace(l,a,k);for(var f=l;f<=l+a;f+=1){this.objectAt(f)}g.recordDidChange(e);return this
},normalize:function(){this.forEach(function(b,a){if(b.normalize){b.normalize()}})
},_materializeChild:function(f){var j=this.get("store"),b=this.get("record"),e=this.get("defaultRecordType"),a,g,k,c;
if(!b){return undefined}var h=b.get("childRecordNamespace");if(f.type&&!SC.none(h)){e=h[f.type]
}if(!e||SC.typeOf(e)!==SC.T_CLASS){throw"ChildrenArray: Error during transform: Invalid record type."
}c=e.prototype.primaryKey||"childRecordKey";a=f[c];k=j.storeKeyExists(e,a);if(k){g=j.materializeRecord(k)
}else{g=b.registerChildRecord(e,f)}return g},recordPropertyDidChange:function(e){if(e&&!e.contains(this.get("propertyName"))){return this
}var b=this.get("readOnlyChildren");var c=this._prevChildren,g=this._childrenContentDidChange;
if(b===c){return this}if(c){c.removeObserver("[]",this,g)}this._prevChildren=b;if(b){b.addObserver("[]",this,g)
}var a=(b)?b.propertyRevision:-1;this._childrenContentDidChange(b,"[]",b,a)},_childrenContentDidChange:function(e,b,c,a){this._records=null;
this.enumerableContentDidChange()},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});SC.ManyArray=SC.Object.extend(SC.Enumerable,SC.Array,{recordType:null,record:null,propertyName:null,manyAttribute:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyStoreIds:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableStoreIds:function(){var a=this.get("store"),e=this.get("storeKey"),c=this.get("propertyName"),b,f;
b=a.readEditableProperty(e,c);if(!b){f=a.readEditableDataHash(e);b=f[c]=[]}if(b!==this._prevStoreIds){this.recordPropertyDidChange()
}return b}.property(),isEditable:function(){var a=this.manyAttribute;return a?a.get("isEditable"):NO
}.property("manyAttribute").cacheable(),inverse:function(){var a=this.manyAttribute;
return a?a.get("inverse"):null}.property("manyAttribute").cacheable(),isMaster:function(){var a=this.manyAttribute;
return a?a.get("isMaster"):null}.property("manyAttribute").cacheable(),orderBy:function(){var a=this.manyAttribute;
return a?a.get("orderBy"):null}.property("manyAttribute").cacheable(),length:function(){var a=this.get("readOnlyStoreIds");
return a?a.get("length"):0}.property("readOnlyStoreIds"),objectAt:function(a){var h=this._records,g=this.get("readOnlyStoreIds"),c=this.get("store"),j=this.get("recordType"),f,e,b;
if(!g||!c){return undefined}if(h&&(e=h[a])){return e}if(!h){this._records=h=[]}b=g.objectAt(a);
if(b){f=c.storeKeyFor(j,b);if(c.readStatus(f)===SC.Record.EMPTY){c.retrieveRecord(j,null,f)
}h[a]=e=c.materializeRecord(f)}return e},replace:function(o,e,n){if(!this.get("isEditable")){throw"%@.%@[] is not editable".fmt(this.get("record"),this.get("propertyName"))
}var c=this.get("editableStoreIds"),l=n?(n.get?n.get("length"):n.length):0,j=this.get("record"),f=this.get("propertyName"),h,p,a,b,g,m,k;
a=[];for(h=0;h<l;h++){a[h]=n.objectAt(h).get("id")}g=this.get("inverse");if(g&&e>0){b=SC.ManyArray._toRemove;
if(b){SC.ManyArray._toRemove=null}else{b=[]}for(h=0;h<e;h++){b[h]=this.objectAt(h)
}}c.replace(o,e,a);if(g){for(h=0;h<e;h++){k=b[h];m=k?k[g]:null;if(m&&m.inverseDidRemoveRecord){m.inverseDidRemoveRecord(k,g,j,f)
}}if(b){b.length=0;if(!SC.ManyArray._toRemove){SC.ManyArray._toRemove=b}}for(h=0;
h<l;h++){k=n.objectAt(h);m=k?k[g]:null;if(m&&m.inverseDidAddRecord){m.inverseDidAddRecord(k,g,j,f)
}}}if(j&&(!g||this.get("isMaster"))){j.recordDidChange(f)}return this},removeInverseRecord:function(c){if(!c){return this
}var f=c.get("id"),e=this.get("editableStoreIds"),a=(e&&f)?e.indexOf(f):-1,b;if(a>=0){e.removeAt(a);
if(this.get("isMaster")&&(b=this.get("record"))){b.recordDidChange(this.get("propertyName"))
}}return this},addInverseRecord:function(e){if(!e){return this}var h=e.get("id"),f=this.get("editableStoreIds"),g=this.get("orderBy"),b=f.get("length"),a,c;
if(g){a=this._findInsertionLocation(e,0,b,g)}else{a=b}f.insertAt(a,e.get("id"));if(this.get("isMaster")&&(c=this.get("record"))){c.recordDidChange(this.get("propertyName"))
}return this},_findInsertionLocation:function(h,e,c,g){var b=e+Math.floor((c-e)/2),f=this.objectAt(b),a=this._compare(h,f,g);
if(a<0){if(b===0){return b}else{return this._findInsertionLocation(h,0,b,g)}}else{if(a>0){if(b>=c){return b
}else{return this._findInsertionLocation(h,b,c,g)}}else{return b}}},_compare:function(g,f,k){var j=SC.typeOf(k),h,e,c;
if(j===SC.T_FUNCTION){h=k(g,f)}else{if(j===SC.T_STRING){h=SC.compare(g,f)}else{c=k.get("length");
h=0;for(e=0;(h===0)&&(e<c);e++){h=SC.compare(g,f)}}}return h},recordPropertyDidChange:function(c){if(c&&!c.contains(this.get("propertyName"))){return this
}var g=this.get("readOnlyStoreIds");var b=this._prevStoreIds,e=this._storeIdsContentDidChange;
if(g===b){return this}if(b){b.removeObserver("[]",this,e)}this._prevStoreIds=g;if(g){g.addObserver("[]",this,e)
}var a=(g)?g.propertyRevision:-1;this._storeIdsContentDidChange(g,"[]",g,a)},_storeIdsContentDidChange:function(e,b,c,a){this._records=null;
this.enumerableContentDidChange()},unknownProperty:function(b,c){var a=this.reducedProperty(b,c);
return a===undefined?arguments.callee.base.apply(this,arguments):a},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");SC.Store=SC.Object.extend({name:null,nestedStores:null,dataSource:null,isNested:NO,commitRecordsAutomatically:NO,from:function(a){this.set("dataSource",a);
return this},_getDataSource:function(){var a=this.get("dataSource");if(typeof a===SC.T_STRING){a=SC.objectForPropertyPath(a);
if(a){a=a.create()}if(a){this.set("dataSource",a)}}return a},cascade:function(a){var b=SC.A(arguments);
a=SC.CascadeDataSource.create({dataSources:b});return this.from(a)},chain:function(b,c){if(!b){b={}
}b.parentStore=this;if(c){if(SC.typeOf(c)!=="class"){throw new Error("%@ is not a valid class".fmt(c))
}if(!SC.kindOf(c,SC.NestedStore)){throw new Error("%@ is not a type of SC.NestedStore".fmt(c))
}}else{c=SC.NestedStore}var a=c.create(b),e=this.nestedStores;if(!e){e=this.nestedStores=[]
}e.push(a);return a},willDestroyNestedStore:function(a){if(this.nestedStores){this.nestedStores.removeObject(a)
}return this},hasNestedStore:function(a){while(a&&(a!==this)){a=a.get("parentStore")
}return a===this},dataHashes:null,statuses:null,revisions:null,editables:null,changelog:null,recordArraysWithQuery:null,recordErrors:null,queryErrors:null,storeKeyEditState:function(b){var c=this.editables,a=this.locks;
return(c&&c[b])?SC.Store.EDITABLE:SC.Store.LOCKED},readDataHash:function(a){return this.dataHashes[a]
},readEditableDataHash:function(b){var a=this.dataHashes[b];if(!a){return a}var c=this.editables;
if(!c){c=this.editables=[]}if(!c[b]){c[b]=1;a=this.dataHashes[b]=SC.clone(a)}return a
},readEditableProperty:function(c,a){var f=this.readEditableDataHash(c),e=this.editables[c],b=f[a];
if(e===1){e=this.editables[c]={}}if(!e[a]){b=f[a];if(b&&b.isCopyable){b=f[a]=b.copy()
}e[a]=YES}return b},writeDataHash:function(b,e,a){if(e){this.dataHashes[b]=e}if(a){this.statuses[b]=a
}var c=this.editables;if(!c){c=this.editables=[]}c[b]=1;return this},removeDataHash:function(c,b){var a;
this.dataHashes[c]=null;this.statuses[c]=b||SC.Record.EMPTY;a=this.revisions[c]=this.revisions[c];
var e=this.editables;if(e){e[c]=0}return this},readStatus:function(a){this.readDataHash(a);
return this.statuses[a]||SC.Record.EMPTY},peekStatus:function(a){return this.statuses[a]||SC.Record.EMPTY
},writeStatus:function(b,a){return this.writeDataHash(b,null,a)},dataHashDidChange:function(j,e,f,g){if(!e){e=SC.Store.generateStoreKey()
}var c,b,a,h;c=SC.typeOf(j)===SC.T_ARRAY;if(c){b=j.length}else{b=1;h=j}for(a=0;a<b;
a++){if(c){h=j[a]}this.revisions[h]=e;this._notifyRecordPropertyChange(h,f,g)}return this
},_notifyRecordPropertyChange:function(o,f,n){var a=this.records,h=this.get("nestedStores"),j=SC.Store,c,b,g,m,l,e,p;
g=h?h.length:0;for(m=0;m<g;m++){l=h[m];e=l.peekStatus(o);b=l.storeKeyEditState(o);
if(b===j.INHERITED){l._notifyRecordPropertyChange(o,f,n)}else{if(e&SC.Record.BUSY){if(l.get("hasChanges")){throw j.CHAIN_CONFLICT_ERROR
}l.reset()}}}var k=this.recordPropertyChanges;if(!k){k=this.recordPropertyChanges={storeKeys:SC.CoreSet.create(),records:SC.CoreSet.create(),hasDataChanges:SC.CoreSet.create(),propertyForStoreKeys:{}}
}k.storeKeys.add(o);if(a&&(c=a[o])){k.records.push(o);if(!f){k.hasDataChanges.push(o)
}if(n){if(!(p=k.propertyForStoreKeys[o])){p=k.propertyForStoreKeys[o]=SC.CoreSet.create()
}if(p!=="*"){p.add(n)}}else{k.propertyForStoreKeys[o]="*"}}this.invokeOnce(this.flush);
return this},flush:function(){if(!this.recordPropertyChanges){return this}var k=this.recordPropertyChanges,j=k.storeKeys,n=k.hasDataChanges,a=k.records,g=k.propertyForStoreKeys,e=SC.CoreSet.create(),c,b,f,l,h,m,o;
j.forEach(function(p){if(a.contains(p)){f=n.contains(p)?NO:YES;c=this.records[p];
o=g?g[p]:null;if(o==="*"){o=null}a.remove(p);if(c){c.storeDidChangeProperties(f,o)
}}b=SC.Store.recordTypeFor(p);e.add(b)},this);if(j.get("length")>0){this._notifyRecordArrays(j,e)
}j.clear();n.clear();a.clear();this.recordPropertyChanges.propertyForStoreKeys={};
return this},reset:function(){this.dataHashes={};this.revisions={};this.statuses={};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.recordErrors=null;
this.queryErrors=null;var a=this.records,b;if(a){for(b in a){if(!a.hasOwnProperty(b)){continue
}this._notifyRecordPropertyChange(parseInt(b,10),NO)}}this.set("hasChanges",NO)},commitChangesFromNestedStore:function(l,m,c){if(!c){this._verifyLockRevisions(m,l.locks)
}var h=m.length,f,p,g,a,o,b,e,n,k;b=this.revisions;g=this.dataHashes;a=this.statuses;
o=this.editables;if(!o){o=this.editables=[]}e=l.dataHashes;k=l.revisions;n=l.statuses;
for(f=0;f<h;f++){p=m[f];g[p]=e[p];a[p]=n[p];b[p]=k[p];o[p]=0;this._notifyRecordPropertyChange(p,NO)
}var q=this.changelog,j=l.changelog;if(j){if(!q){q=this.changelog=SC.CoreSet.create()
}q.addEach(j)}this.changelog=q;if(!this.get("parentStore")){this.flush()}return this
},_verifyLockRevisions:function(g,j){var a=g.length,c=this.revisions,f,h,e,b;if(j&&c){for(f=0;
f<a;f++){h=g[f];e=j[h]||1;b=c[h]||1;if(e<b){throw SC.Store.CHAIN_CONFLICT_ERROR}}}return this
},find:function(b,a){if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if((arguments.length===1)&&!(b&&b.get&&b.get("isRecord"))){if(!b){throw new Error("SC.Store#find() must pass recordType or query")
}if(!b.isQuery){b=SC.Query.local(b)}return this._findQuery(b,YES,YES)}else{return this._findRecord(b,a)
}},findAll:function(c,a,b){console.warn("SC.Store#findAll() will be removed in a future version of SproutCore.  Use SC.Store#find() instead");
if(!c||!c.isQuery){c=SC.Query.local(c,a,b)}return this._findQuery(c,YES,YES)},_findQuery:function(g,a,f){var b=this._scst_recordArraysByQuery,e=SC.guidFor(g),c,h;
if(!b){b=this._scst_recordArraysByQuery={}}c=b[e];if(!c&&a){b[e]=c=SC.RecordArray.create({store:this,query:g});
h=this.get("recordArrays");if(!h){this.set("recordArrays",h=SC.Set.create())}h.add(c);
if(f){this.refreshQuery(g)}}this.flush();return c},_findRecord:function(c,b){var a;
if(c&&c.get&&c.get("isRecord")){a=c.get("storeKey")}else{a=b?c.storeKeyFor(b):null
}if(a&&(this.readStatus(a)===SC.Record.EMPTY)){a=this.retrieveRecord(c,b)}return a?this.materializeRecord(a):null
},recordArrayWillDestroy:function(b){var a=this._scst_recordArraysByQuery,c=this.get("recordArrays");
if(a){delete a[SC.guidFor(b.get("query"))]}if(c){c.remove(b)}return this},refreshQuery:function(e){if(!e){throw new Error("refreshQuery() requires a query")
}var a=this._scst_recordArraysByQuery,c=a?a[SC.guidFor(e)]:null,b=this._getDataSource();
if(b&&b.fetch){if(c){c.storeWillFetchQuery(e)}b.fetch.call(b,this,e)}return this},_notifyRecordArrays:function(b,a){var c=this.get("recordArrays");
if(!c){return this}c.forEach(function(e){if(e){e.storeDidChangeStoreKeys(b,a)}},this);
return this},recordsFor:function(g){var e=[],a=g.storeKeysById(),f,c,b;for(f in a){c=a[f];
if(this.readStatus(c)!==SC.RECORD_EMPTY){e.push(c)}}if(e.length>0){b=SC.RecordArray.create({store:this,storeKeys:e})
}else{b=e}return b},_TMP_REC_ATTRS:{},materializeRecord:function(e){var a=this.records,c,f,b;
if(!a){a=this.records={}}c=a[e];if(c){return c}f=SC.Store.recordTypeFor(e);if(!f){return null
}b=this._TMP_REC_ATTRS;b.storeKey=e;b.store=this;c=a[e]=f.create(b);return c},createRecord:function(b,e,a){var k,l,c,j=SC.Record,f,h,g;
if(!a&&(k=b.prototype.primaryKey)){a=e[k];h=b.prototype[k]?b.prototype[k].defaultValue:null;
if(!a&&SC.typeOf(h)===SC.T_FUNCTION){a=e[k]=h()}}l=a?b.storeKeyFor(a):SC.Store.generateStoreKey();
c=this.readStatus(l);if((c&j.BUSY)||(c&j.READY)||(c==j.DESTROYED_DIRTY)){throw a?j.RECORD_EXISTS_ERROR:j.BAD_STATE_ERROR
}else{if(!a&&(c==SC.DESTROYED_CLEAN||c==SC.ERROR)){throw j.BAD_STATE_ERROR}}this.writeDataHash(l,(e?e:{}),j.READY_NEW);
SC.Store.replaceRecordTypeFor(l,b);this.dataHashDidChange(l);f=this.changelog;if(!f){f=SC.Set.create()
}f.add(l);this.changelog=f;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}g=this.materializeRecord(l);if(g){g.propagateToAggregates()}return g},createRecords:function(e,k,a){var h=[],c,b,f,g=k.length,j;
f=SC.typeOf(e)===SC.T_ARRAY;if(!f){c=e}for(j=0;j<g;j++){if(f){c=e[j]||SC.Record}b=a?a[j]:undefined;
h.push(this.createRecord(c,k[j],b))}return h},unloadRecord:function(g,f,e,c){if(e===undefined){e=g.storeKeyFor(f)
}var b=this.readStatus(e),a=SC.Record;c=c||a.EMPTY;if((b===a.BUSY_DESTROYING)||(b&a.DESTROYED)){return this
}else{if(b&a.BUSY){throw a.BUSY_ERROR}else{b=c}}this.removeDataHash(e,b);this.dataHashDidChange(e);
return this},unloadRecords:function(e,a,h,f){var j,g,k,b,c,l;if(h===undefined){j=a.length;
g=SC.typeOf(e)===SC.T_ARRAY;if(!g){c=e}for(k=0;k<j;k++){if(g){c=e[k]||SC.Record}b=a?a[k]:undefined;
this.unloadRecord(c,b,undefined,f)}}else{j=h.length;for(k=0;k<j;k++){l=h?h[k]:undefined;
this.unloadRecord(undefined,undefined,l,f)}}return this},destroyRecord:function(g,f,e){if(e===undefined){e=g.storeKeyFor(f)
}var b=this.readStatus(e),c,a=SC.Record;if((b===a.BUSY_DESTROYING)||(b&a.DESTROYED)){return this
}else{if(b==a.EMPTY){throw a.NOT_FOUND_ERROR}else{if(b&a.BUSY){throw a.BUSY_ERROR
}else{if(b==a.READY_NEW){b=a.DESTROYED_CLEAN}else{b=a.DESTROYED_DIRTY}}}}this.writeStatus(e,b);
this.dataHashDidChange(e);c=this.changelog;if(!c){c=this.changelog=SC.Set.create()
}((b&a.DIRTY)?c.add(e):c.remove(e));this.changelog=c;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}return this},destroyRecords:function(e,a,g){var h,f,j,b,c,k;if(g===undefined){h=a.length;
f=SC.typeOf(e)===SC.T_ARRAY;if(!f){c=e}for(j=0;j<h;j++){if(f){c=e[j]||SC.Record}b=a?a[j]:undefined;
this.destroyRecord(c,b,undefined)}}else{h=g.length;for(j=0;j<h;j++){k=g?g[j]:undefined;
this.destroyRecord(undefined,undefined,k)}}return this},recordDidChange:function(j,h,g,e,c){if(g===undefined){g=j.storeKeyFor(h)
}var b=this.readStatus(g),f,a=SC.Record;if(b&a.BUSY){throw a.BUSY_ERROR}else{if(!(b&a.READY)){throw a.NOT_FOUND_ERROR
}else{if(b!=a.READY_NEW){this.writeStatus(g,a.READY_DIRTY)}}}this.dataHashDidChange(g,null,c,e);
f=this.changelog;if(!f){f=this.changelog=SC.Set.create()}f.add(g);this.changelog=f;
if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)}return this
},recordsDidChange:function(e,a,g){var h,f,j,b,c,k;if(g===undefined){h=a.length;f=SC.typeOf(e)===SC.T_ARRAY;
if(!f){c=e}for(j=0;j<h;j++){if(f){c=e[j]||SC.Record}b=a?a[j]:undefined;k=g?g[j]:undefined;
this.recordDidChange(c,b,k)}}else{h=g.length;for(j=0;j<h;j++){k=g?g[j]:undefined;
this.recordDidChange(undefined,undefined,k)}}return this},retrieveRecords:function(g,b,k,c){var a=this._getDataSource(),j=SC.typeOf(g)===SC.T_ARRAY,l=(!k)?b.length:k.length,m=[],h=SC.Store.generateStoreKey(),o=SC.Record,e,p,q,f,n;
if(!j){e=g}for(p=0;p<l;p++){if(k){q=k[p]}else{if(j){e=g[p]}q=e.storeKeyFor(b[p])}f=this.readStatus(q);
if((f==o.EMPTY)||(f==o.ERROR)||(f==o.DESTROYED_CLEAN)){this.writeStatus(q,o.BUSY_LOADING);
this.dataHashDidChange(q,h,YES);m.push(q)}else{if(c){if(f&o.READY){this.writeStatus(q,o.BUSY_REFRESH|(f&3));
this.dataHashDidChange(q,h,YES);m.push(q)}else{if((f==o.BUSY_DESTROYING)||(f==o.BUSY_CREATING)||(f==o.BUSY_COMMITTING)){throw o.BUSY_ERROR
}else{if(f==o.DESTROYED_DIRTY){throw o.BAD_STATE_ERROR}}}}}}n=NO;if(a){n=a.retrieveRecords.call(a,this,m,b)
}if(!n){l=m.length;h=SC.Store.generateStoreKey();for(p=0;p<l;p++){q=m[p];f=this.readStatus(q);
if(f===o.BUSY_LOADING){this.writeStatus(q,o.ERROR);this.dataHashDidChange(q,h,YES)
}else{if(f&o.BUSY_REFRESH){this.writeStatus(q,o.READY|(f&3));this.dataHashDidChange(q,h,YES)
}}}m.length=0}return m},_TMP_RETRIEVE_ARRAY:[],retrieveRecord:function(g,f,b,c){var e=this._TMP_RETRIEVE_ARRAY,a;
if(b){e[0]=b;b=e;f=null}else{e[0]=f;f=e}a=this.retrieveRecords(g,f,b,c);e.length=0;
return a[0]},refreshRecord:function(c,b,a){return !!this.retrieveRecord(c,b,a,YES)
},refreshRecords:function(b,c,e){var a=this.retrieveRecords(b,c,e,YES);return a&&a.length>0
},commitRecords:function(f,n,b,q){var m=this._getDataSource(),h=SC.typeOf(f)===SC.T_ARRAY,c=[],k=[],l=[],s=SC.Store.generateStoreKey(),g=SC.Record,a,j,e,o,u,t,p;
if(!f&&!n&&!b){b=this.changelog}p=b?b.get("length"):(n?n.get("length"):0);for(j=0;
j<p;j++){if(b){e=b[j]}else{if(h){a=f[j]||SC.Record}else{a=f}e=a.storeKeyFor(n[j])
}o=this.readStatus(e);if((o==g.EMPTY)||(o==g.ERROR)){throw g.NOT_FOUND_ERROR}else{if(o==g.READY_NEW){this.writeStatus(e,g.BUSY_CREATING);
this.dataHashDidChange(e,s,YES);c.push(e)}else{if(o==g.READY_DIRTY){this.writeStatus(e,g.BUSY_COMMITTING);
this.dataHashDidChange(e,s,YES);k.push(e)}else{if(o==g.DESTROYED_DIRTY){this.writeStatus(e,g.BUSY_DESTROYING);
this.dataHashDidChange(e,s,YES);l.push(e)}else{if(o==g.DESTROYED_CLEAN){this.dataHashDidChange(e,s,YES)
}}}}}}if(m&&(p>0||q)){t=m.commitRecords.call(m,this,c,k,l,q)}if(t&&!f&&!n){if(b===this.changelog){this.changelog=null
}else{this.changelog.removeEach(b)}}return t},commitRecord:function(g,f,b,c){var e=this._TMP_RETRIEVE_ARRAY,a;
if(f===undefined&&b===undefined){return NO}if(b!==undefined){e[0]=b;b=e;f=null}else{e[0]=f;
f=e}a=this.commitRecords(g,f,b,c);e.length=0;return a},cancelRecords:function(f,b,k){var a=this._getDataSource(),h=SC.typeOf(f)===SC.T_ARRAY,m=SC.Record,l=[],g,j,n,c,e,o;
j=(k===undefined)?b.length:k.length;for(n=0;n<j;n++){if(h){e=f[n]||SC.Record}else{e=f||SC.Record
}c=b?b[n]:undefined;if(k===undefined){o=e.storeKeyFor(c)}else{o=k?k[n]:undefined}if(o){g=this.readStatus(o);
if((g==m.EMPTY)||(g==m.ERROR)){throw m.NOT_FOUND_ERROR}l.push(o)}}if(a){a.cancel.call(a,this,l)
}return this},cancelRecord:function(f,e,b){var c=this._TMP_RETRIEVE_ARRAY,a;if(b!==undefined){c[0]=b;
b=c;e=null}else{c[0]=e;e=c}a=this.cancelRecords(f,e,b);c.length=0;return this},loadRecord:function(h,e,g){var a=SC.Record,c,b,f;
h=h||SC.Record;b=h.prototype.primaryKey;g=g||e[b];c=f=h.storeKeyFor(g);if(this.readStatus(f)&a.BUSY){this.dataSourceDidComplete(f,e,g)
}else{this.pushRetrieve(h,g,e,f)}return c},loadRecords:function(e,o,a){var g=SC.typeOf(e)===SC.T_ARRAY,h=o.get("length"),j=[],k=SC.Record,c,b,m,l,f,n;
if(!g){c=e||SC.Record;m=c.prototype.primaryKey}for(l=0;l<h;l++){f=o.objectAt(l);if(g){c=e.objectAt(l)||SC.Record;
m=c.prototype.primaryKey}b=(a)?a.objectAt(l):f[m];j[l]=this.loadRecord(c,f,b)}return j
},readError:function(a){var b=this.recordErrors;return b?b[a]:undefined},readQueryError:function(a){var b=this.queryErrors;
return b?b[SC.guidFor(a)]:undefined},dataSourceDidCancel:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}switch(b){case a.BUSY_LOADING:b=a.EMPTY;break;
case a.BUSY_CREATING:b=a.READY_NEW;break;case a.BUSY_COMMITTING:b=a.READY_DIRTY;break;
case a.BUSY_REFRESH_CLEAN:b=a.READY_CLEAN;break;case a.BUSY_REFRESH_DIRTY:b=a.READY_DIRTY;
break;case a.BUSY_DESTROYING:b=a.DESTROYED_DIRTY;break;default:throw a.BAD_STATE_ERROR
}this.writeStatus(c,b);this.dataHashDidChange(c,null,YES);return this},dataSourceDidComplete:function(g,f,e){var b=this.readStatus(g),a=SC.Record,c;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}if(b===a.BUSY_DESTROYING){throw a.BAD_STATE_ERROR
}else{b=a.READY_CLEAN}this.writeStatus(g,b);if(f){this.writeDataHash(g,f,b)}if(e){SC.Store.replaceIdFor(g,e)
}c=f||e?NO:YES;this.dataHashDidChange(g,null,c);return this},dataSourceDidDestroy:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.DESTROYED_CLEAN}this.removeDataHash(c,b);
this.dataHashDidChange(c);return this},dataSourceDidError:function(e,c){var b=this.readStatus(e),f=this.recordErrors,a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.ERROR}if(c&&c.isError){if(!f){f=this.recordErrors=[]
}f[e]=c}this.writeStatus(e,b);this.dataHashDidChange(e,null,YES);return this},pushRetrieve:function(g,f,c,e){var b=SC.Record,a;
if(e===undefined){e=g.storeKeyFor(f)}a=this.readStatus(e);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.READY_CLEAN;
if(c===undefined){this.writeStatus(e,a)}else{this.writeDataHash(e,c,a)}this.dataHashDidChange(e);
return e}return NO},pushDestroy:function(f,e,c){var b=SC.Record,a;if(c===undefined){c=f.storeKeyFor(e)
}a=this.readStatus(c);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.DESTROYED_CLEAN;
this.removeDataHash(c,a);this.dataHashDidChange(c);return c}return NO},pushError:function(h,g,c,e){var b=SC.Record,a,f=this.recordErrors;
if(e===undefined){e=h.storeKeyFor(g)}a=this.readStatus(e);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.ERROR;
if(c&&c.isError){if(!f){f=this.recordErrors=[]}f[e]=c}this.writeStatus(e,a);this.dataHashDidChange(e,null,YES);
return e}return NO},loadQueryResults:function(c,a){if(c.get("location")===SC.Query.LOCAL){throw new Error("Cannot load query results for a local query")
}var b=this._findQuery(c,YES,NO);if(b){b.set("storeKeys",a)}this.dataSourceDidFetchQuery(c);
return this},dataSourceDidFetchQuery:function(a){return this._scstore_dataSourceDidFetchQuery(a,YES)
},_scstore_dataSourceDidFetchQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidFetchQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidFetchQuery(e,NO)
}return this},dataSourceDidCancelQuery:function(a){return this._scstore_dataSourceDidCancelQuery(a,YES)
},_scstore_dataSourceDidCancelQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidCancelQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidCancelQuery(e,NO)
}return this},dataSourceDidErrorQuery:function(b,a){var c=this.queryErrors;if(a&&a.isError){if(!c){c=this.queryErrors={}
}c[SC.guidFor(b)]=a}return this._scstore_dataSourceDidErrorQuery(b,YES)},_scstore_dataSourceDidErrorQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidErrorQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidErrorQuery(e,NO)
}return this},init:function(){arguments.callee.base.apply(this,arguments);this.reset()
},toString:function(){var b=this.get("name");if(!b){return arguments.callee.base.apply(this,arguments)
}else{var a=arguments.callee.base.apply(this,arguments);return"%@ (%@)".fmt(b,a)}},idFor:function(a){return SC.Store.idFor(a)
},recordTypeFor:function(a){return SC.Store.recordTypeFor(a)},storeKeyFor:function(b,a){return b.storeKeyFor(a)
},storeKeyExists:function(b,a){return b.storeKeyExists(a)},storeKeysFor:function(g){var a=[],f=g&&g.isEnumerable,c,e,b;
if(!this.statuses){return a}for(e in SC.Store.recordTypesByStoreKey){c=SC.Store.recordTypesByStoreKey[e];
if(f){b=g.contains(c)}else{b=c===g}if(b&&this.statuses[e]){a.push(parseInt(e,10))
}}return a},storeKeys:function(){var a=[],b;if(!this.statuses){return a}for(b in this.statuses){if(this.statuses[b]!=SC.Record.EMPTY){a.push(parseInt(b,10))
}}return a},statusString:function(a){var b=this.materializeRecord(a);return b.statusString()
}});SC.Store.mixin({CHAIN_CONFLICT_ERROR:new Error("Nested Store Conflict"),NO_PARENT_STORE_ERROR:new Error("Parent Store Required"),NESTED_STORE_UNSUPPORTED_ERROR:new Error("Unsupported In Nested Store"),NESTED_STORE_RETRIEVE_DIRTY_ERROR:new Error("Cannot Retrieve Dirty Record in Nested Store"),EDITABLE:"editable",LOCKED:"locked",INHERITED:"inherited",idsByStoreKey:[],recordTypesByStoreKey:{},queriesByStoreKey:[],nextStoreKey:1,generateStoreKey:function(){return this.nextStoreKey++
},idFor:function(a){return this.idsByStoreKey[a]},queryFor:function(a){return this.queriesByStoreKey[a]
},recordTypeFor:function(a){return this.recordTypesByStoreKey[a]},replaceIdFor:function(c,a){var e=this.idsByStoreKey[c],f,b;
if(e!==a){f=this.recordTypeFor(c);if(!f){throw new Error("replaceIdFor: storeKey %@ does not exist".fmt(c))
}this.idsByStoreKey[c]=a;b=f.storeKeysById();delete b[e];b[a]=c}return this},replaceRecordTypeFor:function(a,b){this.recordTypesByStoreKey[a]=b;
return this}});SC.Store.prototype.nextStoreIndex=1;SC.Store._getDefaultStore=function(){var a=this._store;
if(!a){this._store=a=SC.Store.create()}return a};SC.Store.updateRecords=function(g,h,j,c){console.warn("SC.Store.updateRecords() is deprecated.  Use loadRecords() instead");
var e=this._getDefaultStore(),b=g.length,a,f;if(!j){j=[];for(a=0;a<b;a++){j[a]=g[a].recordType
}}f=e.loadRecords(j,g);b=f.length;for(a=0;a<b;a++){f[a]=e.materializeRecord(f[a])
}return f};SC.Store.find=function(a,b){return this._getDefaultStore().find(b,a)};
SC.Store.findAll=function(a,b){return this._getDefaultStore().findAll(a,b)};sc_require("system/store");
SC.NestedStore=SC.Store.extend({hasChanges:NO,parentStore:null,isNested:YES,lockOnRead:YES,locks:null,chainedChanges:null,find:function(a){if(a&&a.isQuery&&a.get("location")!==SC.Query.LOCAL){throw"SC.Store#find() can only accept LOCAL queries in nested stores"
}return arguments.callee.base.apply(this,arguments)},commitChanges:function(b){if(this.get("hasChanges")){var a=this.get("parentStore");
a.commitChangesFromNestedStore(this,this.chainedChanges,b)}this.reset();return this
},discardChanges:function(){var c,g;if((c=this.records)&&(g=this.locks)){var b=this.get("parentStore"),j=b.revisions;
var h=this.revisions,f,e,a;for(f in c){if(!c.hasOwnProperty(f)){continue}if(!(e=g[f])){continue
}a=j[f];if((a!==e)||(h[f]>a)){this._notifyRecordPropertyChange(parseInt(f,10))}}}this.reset();
this.flush();return this},destroy:function(){this.discardChanges();var a=this.get("parentStore");
if(a){a.willDestroyNestedStore(this)}arguments.callee.base.apply(this,arguments);
return this},reset:function(){var a=this.get("parentStore");if(!a){throw SC.Store.NO_PARENT_STORE_ERROR
}this.dataHashes=SC.beget(a.dataHashes);this.revisions=SC.beget(a.revisions);this.statuses=SC.beget(a.statuses);
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.set("hasChanges",NO)
},refreshQuery:function(b){var a=this.get("parentStore");if(a){a.refreshQuery(b)}return this
},readError:function(b){var a=this.get("parentStore");return a?a.readError(b):null
},readQueryError:function(b){var a=this.get("parentStore");return a?a.readQueryError(b):null
},storeKeyEditState:function(b){var c=this.editables,a=this.locks;return(c&&c[b])?SC.Store.EDITABLE:(a&&a[b])?SC.Store.LOCKED:SC.Store.INHERITED
},_lock:function(f){var e=this.locks,a,g;if(e&&e[f]){return this}if(!e){e=this.locks=[]
}g=this.editables;if(g){g[f]=0}var c=this.get("parentStore"),b;while(c&&(b=c.storeKeyEditState(f))===SC.Store.INHERITED){c=c.get("parentStore")
}if(c&&b===SC.Store.EDITABLE){this.dataHashes[f]=SC.clone(c.dataHashes[f]);if(!g){g=this.editables=[]
}g[f]=1}else{this.dataHashes[f]=this.dataHashes[f]}this.statuses[f]=this.statuses[f];
a=this.revisions[f]=this.revisions[f];e[f]=a||1;return this},readDataHash:function(a){if(this.get("lockOnRead")){this._lock(a)
}return this.dataHashes[a]},readEditableDataHash:function(a){this._lock(a);return arguments.callee.base.apply(this,arguments)
},writeDataHash:function(e,g,b){var c=this.locks,h=NO,a;if(g){this.dataHashes[e]=g
}else{this._lock(e);h=YES}if(b){this.statuses[e]=b}else{if(!h){this.statuses[e]=(this.statuses[e]||SC.Record.READY_NEW)
}}if(!h){a=this.revisions[e]=this.revisions[e];if(!c){c=this.locks=[]}if(!c[e]){c[e]=a||1
}}var f=this.editables;if(!f){f=this.editables=[]}f[e]=1;return this},removeDataHash:function(c,a){var b=this.locks;
if(!b){b=this.locks=[]}if(!b[c]){b[c]=this.revisions[c]||1}return arguments.callee.base.apply(this,arguments)
},dataHashDidChange:function(e,b,a,j){if(!b){b=SC.Store.generateStoreKey()}var c,f,h,k;
c=SC.typeOf(e)===SC.T_ARRAY;if(c){f=e.length}else{f=1;k=e}var g=this.chainedChanges;
if(!g){g=this.chainedChanges=SC.Set.create()}for(h=0;h<f;h++){if(c){k=e[h]}this._lock(k);
this.revisions[k]=b;g.add(k);this._notifyRecordPropertyChange(k,a,j)}this.setIfChanged("hasChanges",YES);
return this},commitChangesFromNestedStore:function(f,g,a){arguments.callee.base.apply(this,arguments);
var b=this.get("parentStore"),j=b.revisions,c;var l=this.locks,h=this.chainedChanges,e,k;
if(!l){l=this.locks=[]}if(!h){h=this.chainedChanges=SC.Set.create()}e=g.length;for(c=0;
c<e;c++){k=g[c];if(!l[k]){l[k]=j[k]||1}h.add(k)}this.setIfChanged("hasChanges",h.get("length")>0);
this.flush();return this},queryFor:function(c,a,b){return this.get("parentStore").queryFor(c,a,b)
},findAll:function(f,b,e,c,a){if(!a){a=this}return this.get("parentStore").findAll(f,b,e,c,a)
},retrieveRecords:function(g,o,b,c){var a=this.get("parentStore"),m,e,s,q=(!b)?o.length:b.length,k=SC.Record,p;
if(c){for(m=0;m<q;m++){e=!b?a.storeKeyFor(g,o[m]):b[m];p=this.peekStatus(e);if(p&k.DIRTY){throw SC.Store.NESTED_STORE_RETRIEVE_DIRTY_ERROR
}else{var h=this.dataHashes,l=this.revisions,j=this.statuses,n=this.editables,u=this.locks;
var f=NO;var t=NO;if(h&&h.hasOwnProperty(e)){delete h[e];f=YES}if(l&&l.hasOwnProperty(e)){delete l[e];
f=YES}if(n){delete n[e]}if(u){delete u[e]}if(j&&j.hasOwnProperty(e)){delete j[e];
if(!f){t=YES}f=YES}if(f){this._notifyRecordPropertyChange(e,t)}}}}return a.retrieveRecords(g,o,b,c)
},commitRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},commitRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},cancelRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidCancel:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidComplete:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidDestroy:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidError:function(b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushRetrieve:function(e,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},pushDestroy:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushError:function(e,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR}});sc_require("models/record");
SC.RecordArray=SC.Object.extend(SC.Enumerable,SC.Array,{store:null,query:null,storeKeys:null,status:SC.Record.EMPTY,isEditable:function(){var a=this.get("query");
return a?a.get("isEditable"):NO}.property("query").cacheable(),length:function(){this.flush();
var a=this.get("storeKeys");return a?a.get("length"):0}.property("storeKeys").cacheable(),_scra_records:null,objectAt:function(a){this.flush();
var g=this._scra_records,f=this.get("storeKeys"),b=this.get("store"),e,c;if(!f||!b){return undefined
}if(g&&(c=g[a])){return c}if(!g){this._scra_records=g=[]}e=f.objectAt(a);if(e){if(b.peekStatus(e)===SC.Record.EMPTY){b.retrieveRecord(null,null,e)
}g[a]=c=b.materializeRecord(e)}return c},forEach:function(j,e){this.flush();var f=this._scra_records,b=this.get("storeKeys"),g=this.get("store"),c=b?b.get("length"):0,h,k,a;
if(!b||!g){return this}if(!f){f=this._scra_records=[]}if(!e){e=this}for(h=0;h<c;h++){a=f[h];
if(!a){a=f[h]=g.materializeRecord(b.objectAt(h))}j.call(e,a,h,this)}return this},replace:function(b,j,h){this.flush();
var f=this.get("storeKeys"),a=h?(h.get?h.get("length"):h.length):0,c,e;if(!f){throw"storeKeys required"
}var g=this.get("query");if(g&&!g.get("isEditable")){throw SC.RecordArray.NOT_EDITABLE
}e=[];for(c=0;c<a;c++){e[c]=h.objectAt(c).get("storeKey")}f.replace(b,j,e);return this
},contains:function(a){return this.indexOf(a)>=0},indexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){return NO
}this.flush();var e=b.get("storeKey"),c=this.get("storeKeys");return c?c.indexOf(e,a):-1
},lastIndexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){return NO}this.flush();var e=b.get("storeKey"),c=this.get("storeKeys");
return c?c.lastIndexOf(e,a):-1},add:function(a){if(!SC.kindOf(a,SC.Record)){return this
}if(this.indexOf(a)<0){this.pushObject(a)}return this},remove:function(a){if(!SC.kindOf(a,SC.Record)){return this
}this.removeObject(a);return this},find:function(a,b){if(a&&a.isQuery){return this.get("store").find(a.queryWithScope(this))
}else{return arguments.callee.base.apply(this,arguments)}},refresh:function(){this.get("store").refreshQuery(this.get("query"));
return this},reload:function(){this.flush(YES);return this},destroy:function(){if(!this.get("isDestroyed")){this.get("store").recordArrayWillDestroy(this)
}arguments.callee.base.apply(this,arguments)},storeWillFetchQuery:function(c){var b=this.get("status"),a=SC.Record;
if((b===a.EMPTY)||(b===a.ERROR)){b=a.BUSY_LOADING}if(b&a.READY){b=a.BUSY_REFRESH}this.setIfChanged("status",b);
return this},storeDidFetchQuery:function(a){this.setIfChanged("status",SC.Record.READY_CLEAN);
return this},storeDidCancelQuery:function(c){var b=this.get("status"),a=SC.Record;
if(b===a.BUSY_LOADING){b=a.EMPTY}else{if(b===a.BUSY_REFRESH){b=a.READY_CLEAN}}this.setIfChanged("status",b);
return this},storeDidErrorQuery:function(a){this.setIfChanged("status",SC.Record.ERROR);
return this},storeDidChangeStoreKeys:function(b,a){var c=this.get("query");if(c.get("location")!==SC.Query.LOCAL){return this
}if(!c.containsRecordTypes(a)){return this}var e=this._scq_changedStoreKeys;if(!e){e=this._scq_changedStoreKeys=SC.IndexSet.create()
}e.addEach(b);this.set("needsFlush",YES);this.enumerableContentDidChange();return this
},flush:function(a){if(this._insideFlush){this.set("needsFlush",YES);return this}if(!this.get("needsFlush")&&!a){return this
}this.set("needsFlush",NO);var k=this.get("query"),n=this.get("store");if(!n||!k||k.get("location")!==SC.Query.LOCAL){return this
}this._insideFlush=YES;var h=this.get("storeKeys"),f=this._scq_changedStoreKeys,g=NO,l=SC.Record,c,e,b,p,o,j;
var m=h;if(h&&!a){if(f){f.forEach(function(q){e=n.peekStatus(q);if(!(e&l.EMPTY)&&!((e&l.DESTROYED)||(e===l.BUSY_DESTROYING))){c=n.materializeRecord(q);
j=!!(c&&k.contains(c))}else{j=NO}if(j){if(h.indexOf(q)<0){if(!g){h=h.copy()}h.pushObject(q)
}}else{if(h.indexOf(q)>=0){if(!g){h=h.copy()}h.removeObject(q)}}},this);g=YES}}else{if(o=k.get("scope")){p=o.flush().get("storeKeys")
}else{if(b=k.get("expandedRecordTypes")){p=SC.IndexSet.create();b.forEach(function(q){p.addEach(n.storeKeysFor(b))
})}}h=[];p.forEach(function(q){e=n.peekStatus(q);if(!(e&l.EMPTY)&&!((e&l.DESTROYED)||(e===l.BUSY_DESTROYING))){c=n.materializeRecord(q);
if(c&&k.contains(c)){h.push(q)}}});g=YES}if(f){f.clear()}if(g){if(h&&(h===m)){h=h.copy()
}h=SC.Query.orderStoreKeys(h,k,n);if(SC.compare(m,h)!==0){this.set("storeKeys",SC.clone(h))
}}this._insideFlush=NO;return this},needsFlush:YES,isError:function(){return this.get("status")&SC.Record.ERROR
}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readQueryError(this.get("query"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),_storeKeysDidChange:function(){var e=this.get("storeKeys");
var c=this._prevStoreKeys,g=this._storeKeysContentDidChange,a=this._storeKeysStateDidChange;
if(e===c){return}if(c){c.removeObserver("[]",this,g)}this._prevStoreKeys=e;if(e){e.addObserver("[]",this,g)
}var b=(e)?e.propertyRevision:-1;this._storeKeysContentDidChange(e,"[]",e,b)}.observes("storeKeys"),_storeKeysContentDidChange:function(e,b,c,a){if(this._scra_records){this._scra_records.length=0
}this.beginPropertyChanges().notifyPropertyChange("length").enumerableContentDidChange().endPropertyChanges()
},init:function(){arguments.callee.base.apply(this,arguments);this._storeKeysDidChange()
}});SC.RecordArray.mixin({NOT_EDITABLE:SC.Error.desc("SC.RecordArray is not editable")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/datastore");
/* @license
==========================================================================
SproutCore -- JavaScript Application Framework
copyright 2006-2009, Sprout Systems Inc., Apple Inc. and contributors.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

SproutCore and the SproutCore logo are trademarks of Sprout Systems, Inc.

For more information about SproutCore, visit http://www.sproutcore.com


==========================================================================
@license */
}if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore")
}SC.stringsFor("English",{});CcChat=SC.Object.create({NAMESPACE:"CcChat",VERSION:"0.1.0",store:SC.Store.create().from(SC.Record.fixtures)});
CcChat.chatController=SC.ObjectController.create({comet:function(){if(typeof(Faye)!=="undefined"){return new Faye.Client("/chat/comet")
}return null}(),chatHasInitialized:NO,username:"",usersInRoom:[],latestChat:null,initChat:function(b){if(this.comet===null){this.comet=new Faye.Client("/chat/comet")
}var a=CcChat.chatRoomController.validateChannel(b);CcChat.chatRoomController.set("channel",b);
var c=this.get("username");if(c.length<1){c="Test User";this.set("username",c)}this.comet.set_username(c);
this.subscribeToChannel(a,this.receiveChat);this.subscribeToUserList(a);CcChat.chatController.set("chatHasInitialized",YES);
this.propertyDidChange("chatHasInitialized");return b},sendChat:function(c,b){if(!this.chatHasInitialized){SC.Logger.log("initializing chat");
this.initChat("test")}var a={author:this.username,message:c,item:b};this.post(CcChat.chatRoomController.get("channel"),a);
SC.Logger.log("sent: "+c)},post:function(b,a){b=CcChat.chatRoomController.validateChannel(b);
SC.Logger.log("sending on "+b);this.comet.publish(b,a)},receiveChat:function(a){SC.Logger.log("received: "+a.message);
this.addMessage(a)},addMessage:function(b){SC.RunLoop.begin();var a=CcChat.store.createRecord(CcChat.ChatMessage,{author:b.author,message:b.message,time:this._now(),item:b.item});
this.set("latestChat",a);SC.RunLoop.end()},subscribeToChannel:function(b,c){var a=CcChat.chatRoomController.validateChannel(b);
this.comet.subscribe(a,c,this)},subscribeToUserList:function(c){var b=CcChat.chatRoomController.validateChannel(c);
var a=this;function e(g){var f=[].concat(g);a.set("usersInRoom",f)}this.subscribeToChannel("/smeta/clients"+c,e)
},_usernameSet:function(){if(this.chatHasInitialized){var a=this.get("username");
this.comet.set_username(a)}}.observes("username"),_now:function(){return new Date().getTime()
}});CcChat.chatComposeController=SC.ObjectController.create({textAreaValue:null,item:null,sendAction:function(){var b=this.get("textAreaValue");
SC.Logger.log("textAreaValue: "+b);var a="User";CcChat.chatController.sendChat(b,this.get("item"));
this.set("textAreaValue","");this.set("item",null)},imageUrl:function(){var a=CcChat.chatComposeController.get("item");
if(a!==null&&a.imageUrl!==undefined&&a.imageUrl!==null){return a.imageUrl}return""
}.property("item"),imageWidth:function(){if(this.get("imageUrl").length>0){return 40
}else{return 0}}.property("imageUrl"),clearButtonTitle:"Remove item",showClearButton:function(){if(this.get("item")!==null){return true
}return false}.property("item"),clearItem:function(){this.set("item",null)}});CcChat.chatListController=SC.ArrayController.create({});
CcChat.chatRoomController=SC.ObjectController.create({channel:"",baseChannelName:function(){return this.get("channel").split("NUM")[0]
}.property("channel"),channelIndex:function(){var a=this.get("channel").split("NUM");
if(a.length>1){return parseInt(a[a.length-1],10)}else{return 0}}.property("channel"),getFirstChannelWithSpace:function(a,b,c){(function(g,l,n){g=CcChat.chatRoomController.validateChannel(g);
var h=g.split("NUM");var e=h[0];var f=0;if(h.length>1){var k=parseInt(h[1],10);f=k+1
}var j=e+"NUM"+f;SC.Logger.log("newChannelName = "+j);function m(o){if(o<l){n(j)}else{CcChat.chatRoomController.getFirstChannelWithSpace(j,l,n)
}}CcChat.chatRoomController.getNumClientsInChannel(j,m)})(a,b,c)},getNumClientsInChannel:function(a,b){(function(e,g){function c(j){var h=[].concat(j);
SC.Logger.log("clients in "+e+": "+h);var k=CcChat.chatController.comet;k.unsubscribe("/smeta/clients"+e);
g(h.length,e)}var f=CcChat.chatController.comet;f.subscribe("/smeta/clients"+e,c,this)
})(a,b)},validateChannel:function(a){if(a.slice(0,1)!="/"){a="/"+a}return a}});CcChat.loginController=SC.ObjectController.create({textAreaValue:null,username:null,usernameBinding:"CcChat.chatController.username",welcomeMessage:function(){var a=this.get("username");
if(a!==undefined&&a!==null&&a.length>0){return"Welcome "+a}else{return""}}.property("username"),login:function(){var a=this.get("textAreaValue");
CcChat.chatController.set("username",a);this.set("textAreaValue","")}});CcChat.userListController=SC.ArrayController.create({contentBinding:"CcChat.chatController.usersInRoom"});
CcChat.ChatMessage=SC.Record.extend({author:SC.Record.attr(String),message:SC.Record.attr(String),time:SC.Record.attr(Number),item:SC.Record.attr(Object)});
CcChat.ChatComposeView=SC.View.extend(SC.StaticLayout,{childViews:"inputView imageView clearImageView sendView".w(),inputView:SC.View.design(SC.StaticLayout,{layout:{left:0,top:0,right:0,height:35},useStaticLayout:YES,childViews:"textFieldView".w(),textFieldView:SC.TextFieldView.design({isTextArea:NO,valueBinding:"CcChat.chatComposeController.textAreaValue",keyUp:function(a){if(a.keyCode===13){CcChat.chatComposeController.sendAction()
}this.fieldValueDidChange();a.allowDefault();return YES}})}),imageView:SC.ImageView.design({layout:{top:2,left:0,height:35,width:this.imageWidth},value:"",valueBinding:"CcChat.chatComposeController.imageUrl"}),clearImageView:SC.ButtonView.design({layout:{top:60,height:24,right:125,width:120},titleBinding:"CcChat.chatComposeController.clearButtonTitle",target:"CcChat.chatComposeController",action:"clearItem",isVisibleBinding:"CcChat.chatComposeController.showClearButton"}),sendView:SC.ButtonView.design({layout:{top:60,height:24,right:20,width:100},title:"Chat",action:"CcChat.chatComposeController.sendAction"}),_adjust_size:function(){var a=CcChat.chatComposeController.get("imageWidth");
this.inputView.adjust("left",a)}.observes("CcChat.chatComposeController.item")});
CcChat.ChatMessageView=SC.View.extend(SC.ContentDisplay,{contentDisplayProperties:"author message".w(),useStaticLayout:YES,render:function(a,j){var f=this.get("content");
var b=f.get("author");b=(b===null)?"":b;var e=f.get("message");var g=f.get("time");
var h="";var c=f.get("item");if(c!==null){if(c!==null&&c.imageUrl!==undefined&&c.imageUrl!==null){h='<img style="float: left" src="'+c.imageUrl+'" height="40px"></img>'
}}a=a.begin().addClass("top");a=a.begin("p").addClass("name").push(h+"<b>%@</b>: %@".fmt(b,e)).end();
a=a.end();arguments.callee.base.apply(this,arguments)}});CcChat.LoginView=SC.View.extend({childViews:"inputView loginButtonView welcomeView".w(),inputView:SC.View.design(SC.StaticLayout,{layout:{left:20,top:5,width:200,height:24},useStaticLayout:YES,childViews:"textFieldView".w(),textFieldView:SC.TextFieldView.design({isTextArea:NO,valueBinding:"CcChat.loginController.textAreaValue",keyUp:function(a){if(a.keyCode===13){CcChat.loginController.login()
}this.fieldValueDidChange();a.allowDefault();return YES}})}),loginButtonView:SC.ButtonView.design({layout:{top:5,height:24,left:240,width:100},title:"Log in",target:"CcChat.loginController",action:"login"}),welcomeView:SC.LabelView.design({layout:{top:5,height:24,left:370,width:200},value:"",valueBinding:SC.Binding.from("CcChat.loginController.welcomeMessage").oneWay()})});
CcChat.UserListView=SC.ScrollView.extend({hasHorizontalScroller:NO,layout:{height:100},backgroundColor:"white",contentView:SC.ListView.design({contentBinding:"CcChat.userListController.arrangedObjects",selectionBinding:"CcChat.userListController.selection",rowHeight:30,canEditContent:NO,isSelectable:YES,showAlternatingRows:YES})});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("cc/cc_chat")
}SC.stringsFor("English",{});CC=SC.Object.create({NAMESPACE:"CC",VERSION:"0.1.0"});
CC.Question=SC.Object.extend({prompt:"This is a prompt",input:"This in an input"});
CC.AppletView=SC.View.extend({jarUrls:"",code:"",params:"",width:600,height:400,appletInstance:function(){return this.$("#"+this.get("appletId"))[0]
},render:function(a,b){this.renderAppletHtml(a)},renderAppletHtml:function(b){var a=b.begin("applet");
a.attr("id",this.get("appletId"));a.attr("archive",this.get("jarUrls"));a.attr("code",this.get("code"));
a.attr("width","100%");a.attr("height",this.get("height"));a.attr("MAYSCRIPT","true");
a.push(this.get("params"));a.end()},classNames:"applet",layout:{centerX:0,centerY:0,width:600,height:400},appletId:function(){return this.get("layerId")+"-applet"
}.property("layerId").cacheable(),run:function(a){a(this.appletInstance())}});CC.AutoScrollView=SC.ScrollView.extend({autoScrollTrigger:null,autoScroll:function(){var a=this;
function b(){var c=a.get("maximumVerticalScrollOffset");a.set("verticalScrollOffset",c)
}SC.Timer.schedule({action:b,interval:100,repeats:NO})}.observes("autoScrollTrigger")});
CC.QuestionView=SC.StackedView.extend(SC.StaticLayout,{layout:{top:0,left:0,right:0},classNames:["question","open-response-question"],contentDisplayProperties:"prompt".w(),prompt:"[prompt]",useStaticLayout:NO,childViews:"promptView inputView".w(),promptView:SC.LabelView.design(SC.StaticLayout,{classNames:"question-prompt",useStaticLayout:YES,escapeHTML:NO,layout:{left:5,right:5},valueBinding:"*parentView.prompt"}),inputView:SC.View.design(SC.StaticLayout,{layout:{left:20,top:5,width:600,height:95},useStaticLayout:YES,childViews:"textFieldView".w(),textFieldView:SC.TextFieldView.design({classNames:"question-input",isTextArea:YES})})});
require("views/question");CC.MultipleChoiceQuestionView=CC.QuestionView.extend({classNames:["question","multiple-choice-question"],choices:"1 2 3 4".w(),canSelectMultipleAnswers:NO,inputView:SC.RadioView.design(SC.StaticLayout,{layout:{left:20,top:5,width:600,height:95},useStaticLayout:YES,classNames:"question-input",itemsBinding:"*parentView.choices",itemsChanged:function(){this.replaceLayer()
}.observes("items")})});CC.MwAppletView=CC.AppletView.extend({cmlUrl:"",params:function(){return'<param name="script" value="page:0:import '+this.get("cmlUrl")+'"/>'
}.property("cmlUrl"),jarUrls:"http://mw2.concord.org/public/lib/mwapplet.jar",code:"org.concord.modeler.MwApplet",width:600,height:400,classNames:"mw-applet",layout:{centerX:0,centerY:0,width:600,height:400}});
CC.SensorAppletView=CC.AppletView.extend({listenerPath:"defaultDataListener",safariSensorStatePath:null,dataRecieved:function(a,c,b){},dataStreamEvent:function(a,c,b){},sensorsReady:function(){},resourcePath:"/simple.otml",isSafari:function(){if(typeof(navigator)!="undefined"&&typeof(navigator.vendor)!="undefined"&&navigator.vendor.indexOf("Apple")!=-1){return YES
}return NO}(),sensorStatePath:function(){if(this.get("isSafari")){return this.get("safariSensorStatePath")
}return null}.property("isSafari","safariSensorStatePath"),sensorState:"ready",appletName:"sensorApplet",params:function(){var a=['<param name="resource" value="'+this.get("resourcePath")+'" />','<param name="listenerPath" value="'+this.get("listenerPath")+'" />','<param name="name" value="'+this.get("appletName")+'" />'];
if(this.get("sensorStatePath")!==null){a.pushObject('<param name="sensorStatePath" value="'+this.get("sensorStatePath")+'" />')
}return a.join("")}.property("resourcePath"),jarUrls:["http://jnlp.concord.org/dev/org/concord/sensor/sensor-applets/sensor-applets.jar?version-id=0.1.0-20100601.160817-14","http://jnlp.concord.org/dev/org/concord/otrunk/otrunk.jar?version-id=0.2.0-20100519.081729-231","http://jnlp.concord.org/dev/org/concord/framework/framework.jar?version-id=0.1.0-20100518.155205-550","http://jnlp.concord.org/dev/org/concord/frameworkview/frameworkview.jar?version-id=0.1.0-20100518.160605-394","http://jnlp.concord.org/dev/org/concord/swing/swing.jar?version-id=0.1.0-20100518.155225-382","http://jnlp.concord.org/dev/jug/jug/jug.jar?version-id=1.1.2","http://jnlp.concord.org/dev/jdom/jdom/jdom.jar?version-id=1.0","http://jnlp.concord.org/dev/org/concord/apple-support/apple-support.jar?version-id=0.1.0-20100518.155355-314","http://jnlp.concord.org/dev/org/concord/utilities/response-cache/response-cache.jar?version-id=0.1.0-20100503.180141-215","http://jnlp.concord.org/dev/org/concord/sensor-native/sensor-native.jar?version-id=0.1.0-20100520.192620-460","http://jnlp.concord.org/dev/org/concord/sensor/sensor.jar?version-id=0.2.0-20100519.082617-265","http://jnlp.concord.org/dev/org/concord/data/data.jar?version-id=0.2.0-20100518.160532-268","http://jnlp.concord.org/dev/org/concord/external/rxtx/rxtx-comm/rxtx-comm.jar?version-id=2.1.7-r2"].join(", "),code:"org.concord.sensor.applet.OTSensorApplet",width:160,height:40,classNames:"sensor-applet",layout:{centerX:0,centerY:0,width:160,height:40},start:function(){this.set("sensorState","running");
if(this.get("isSafari")==NO||this.get("sensorStatePath")===null){this.run(function(a){a.startCollecting()
})}},stop:function(){this.set("sensorState","stopped");if(this.get("isSafari")==NO||this.get("sensorStatePath")===null){this.run(function(a){a.stopCollecting()
})}},reset:function(){this.set("sensorState","ready");if(this.get("isSafari")==NO||this.get("sensorStatePath")===null){this.run(function(a){a.stopCollecting()
})}}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("cc/cc")
}if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("cc");
/*
 * Raphael 1.3.2 - JavaScript Vector Library
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
}Raphael=(function(){var a=/[, ]+/,aZ=/^(circle|rect|path|ellipse|text|image)$/,ba="prototype",X="hasOwnProperty",Q=document,aC=window,m={was:Object[ba][X].call(aC,"Raphael"),is:aC.Raphael},av=function(){if(av.is(arguments[0],"array")){var e=arguments[0],E=A[a8](av,e.splice(0,3+av.is(e[0],ar))),bd=E.set();
for(var S=0,be=e[n];S<be;S++){var R=e[S]||{};aZ.test(R.type)&&bd[f](E[R.type]().attr(R))
}return bd}return A[a8](av,arguments)},a5=function(){},aV="appendChild",a8="apply",a3="concat",aB="",au=" ",D="split",K="click dblclick mousedown mousemove mouseout mouseover mouseup"[D](au),aI="join",n="length",bc=String[ba].toLowerCase,ag=Math,h=ag.max,aS=ag.min,ar="number",aK="toString",aF=Object[ba][aK],a1={},aW=ag.pow,f="push",a6=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+?)['"]?\)$/i,B=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,V=ag.round,z="setAttribute",ab=parseFloat,L=parseInt,aY=String[ba].toUpperCase,k={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},ae={along:"along",blur:ar,"clip-rect":"csv",cx:ar,cy:ar,fill:"colour","fill-opacity":ar,"font-size":ar,height:ar,opacity:ar,path:"path",r:ar,rotation:"csv",rx:ar,ry:ar,scale:"csv",stroke:"colour","stroke-opacity":ar,"stroke-width":ar,translation:"csv",width:ar,x:ar,y:ar},a0="replace";
av.version="1.3.2";av.type=(aC.SVGAngle||Q.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
if(av.type=="VML"){var al=Q.createElement("div");al.innerHTML="<!--[if vml]><br><br><![endif]-->";
if(al.childNodes[n]!=2){return av.type=null}al=null}av.svg=!(av.vml=av.type=="VML");
a5[ba]=av[ba];av._id=0;av._oid=0;av.fn={};av.is=function(E,e){e=bc.call(e);return((e=="object"||e=="undefined")&&typeof E==e)||(E==null&&e=="null")||bc.call(aF.call(E).slice(8,-1))==e
};av.setWindow=function(e){aC=e;Q=aC.document};var aN=function(E){if(av.vml){var e=/^\s+|\s+$/g;
aN=ao(function(bd){var be;bd=(bd+aB)[a0](e,aB);try{var bf=new aC.ActiveXObject("htmlfile");
bf.write("<body>");bf.close();be=bf.body}catch(bh){be=aC.createPopup().document.body
}var S=be.createTextRange();try{be.style.color=bd;var bg=S.queryCommandValue("ForeColor");
bg=((bg&255)<<16)|(bg&65280)|((bg&16711680)>>>16);return"#"+("000000"+bg[aK](16)).slice(-6)
}catch(bh){return"none"}})}else{var R=Q.createElement("i");R.title="Rapha\xebl Colour Picker";
R.style.display="none";Q.body[aV](R);aN=ao(function(S){R.style.color=S;return Q.defaultView.getComputedStyle(R,aB).getPropertyValue("color")
})}return aN(E)};var ap=function(){return"hsb("+[this.h,this.s,this.b]+")"},x=function(){return this.hex
};av.hsb2rgb=ao(function(bh,bf,bl){if(av.is(bh,"object")&&"h" in bh&&"s" in bh&&"b" in bh){bl=bh.b;
bf=bh.s;bh=bh.h}var S,bd,bm;if(bl==0){return{r:0,g:0,b:0,hex:"#000"}}if(bh>1||bf>1||bl>1){bh/=255;
bf/=255;bl/=255}var be=~~(bh*6),bi=(bh*6)-be,R=bl*(1-bf),E=bl*(1-(bf*bi)),bn=bl*(1-(bf*(1-bi)));
S=[bl,E,R,R,bn,bl,bl][be];bd=[bn,bl,bl,E,R,R,bn][be];bm=[R,R,bn,bl,bl,E,R][be];S*=255;
bd*=255;bm*=255;var bj={r:S,g:bd,b:bm,toString:x},e=(~~S)[aK](16),bg=(~~bd)[aK](16),bk=(~~bm)[aK](16);
e=e[a0](a6,"0");bg=bg[a0](a6,"0");bk=bk[a0](a6,"0");bj.hex="#"+e+bg+bk;return bj},av);
av.rgb2hsb=ao(function(e,E,bg){if(av.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){bg=e.b;
E=e.g;e=e.r}if(av.is(e,"string")){var bi=av.getRGB(e);e=bi.r;E=bi.g;bg=bi.b}if(e>1||E>1||bg>1){e/=255;
E/=255;bg/=255}var bf=h(e,E,bg),R=aS(e,E,bg),bd,S,be=bf;if(R==bf){return{h:0,s:0,b:bf}
}else{var bh=(bf-R);S=bh/bf;if(e==bf){bd=(E-bg)/bh}else{if(E==bf){bd=2+((bg-e)/bh)
}else{bd=4+((e-E)/bh)}}bd/=6;bd<0&&bd++;bd>1&&bd--}return{h:bd,s:S,b:be,toString:ap}
},av);var aO=/,?([achlmqrstvxz]),?/gi;av._path2string=function(){return this.join(",")[a0](aO,"$1")
};function ao(S,E,e){function R(){var bd=Array[ba].slice.call(arguments,0),bf=bd[aI]("\u25ba"),be=R.cache=R.cache||{},bg=R.count=R.count||[];
if(be[X](bf)){return e?e(be[bf]):be[bf]}bg[n]>=1000&&delete be[bg.shift()];bg[f](bf);
be[bf]=S[a8](E,bd);return e?e(be[bf]):be[bf]}return R}av.getRGB=ao(function(e){if(!e||!!((e=e+aB).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(e=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(({hs:1,rg:1})[X](e.substring(0,2))||e.charAt()=="#")&&(e=aN(e));
var be,R,S,bh,bi,bf=e.match(B);if(bf){if(bf[2]){bh=L(bf[2].substring(5),16);S=L(bf[2].substring(3,5),16);
R=L(bf[2].substring(1,3),16)}if(bf[3]){bh=L((bi=bf[3].charAt(3))+bi,16);S=L((bi=bf[3].charAt(2))+bi,16);
R=L((bi=bf[3].charAt(1))+bi,16)}if(bf[4]){bf=bf[4][D](/\s*,\s*/);R=ab(bf[0]);S=ab(bf[1]);
bh=ab(bf[2])}if(bf[5]){bf=bf[5][D](/\s*,\s*/);R=ab(bf[0])*2.55;S=ab(bf[1])*2.55;bh=ab(bf[2])*2.55
}if(bf[6]){bf=bf[6][D](/\s*,\s*/);R=ab(bf[0]);S=ab(bf[1]);bh=ab(bf[2]);return av.hsb2rgb(R,S,bh)
}if(bf[7]){bf=bf[7][D](/\s*,\s*/);R=ab(bf[0])*2.55;S=ab(bf[1])*2.55;bh=ab(bf[2])*2.55;
return av.hsb2rgb(R,S,bh)}bf={r:R,g:S,b:bh};var E=(~~R)[aK](16),bd=(~~S)[aK](16),bg=(~~bh)[aK](16);
E=E[a0](a6,"0");bd=bd[a0](a6,"0");bg=bg[a0](a6,"0");bf.hex="#"+E+bd+bg;return bf}return{r:-1,g:-1,b:-1,hex:"none",error:1}
},av);av.getColor=function(E){var R=this.getColor.start=this.getColor.start||{h:0,s:1,b:E||0.75},e=this.hsb2rgb(R.h,R.s,R.b);
R.h+=0.075;if(R.h>1){R.h=0;R.s-=0.2;R.s<=0&&(this.getColor.start={h:0,s:1,b:R.b})
}return e.hex};av.getColor.reset=function(){delete this.start};var aD=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,at=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
av.parsePathString=ao(function(e){if(!e){return null}var R={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},E=[];
if(av.is(e,"array")&&av.is(e[0],"array")){E=aE(e)}if(!E[n]){(e+aB)[a0](aD,function(bd,S,bg){var bf=[],be=bc.call(S);
bg[a0](at,function(bi,bh){bh&&bf[f](+bh)});if(be=="m"&&bf[n]>2){E[f]([S][a3](bf.splice(0,2)));
be="l";S=S=="m"?"l":"L"}while(bf[n]>=R[be]){E[f]([S][a3](bf.splice(0,R[be])));if(!R[be]){break
}}})}E[aK]=av._path2string;return E});av.findDotsAtSegment=function(E,e,bt,br,bf,bd,bh,bg,bn){var bl=1-bn,bk=aW(bl,3)*E+aW(bl,2)*3*bn*bt+bl*3*bn*bn*bf+aW(bn,3)*bh,bi=aW(bl,3)*e+aW(bl,2)*3*bn*br+bl*3*bn*bn*bd+aW(bn,3)*bg,bp=E+2*bn*(bt-E)+bn*bn*(bf-2*bt+E),bo=e+2*bn*(br-e)+bn*bn*(bd-2*br+e),bs=bt+2*bn*(bf-bt)+bn*bn*(bh-2*bf+bt),bq=br+2*bn*(bd-br)+bn*bn*(bg-2*bd+br),bm=(1-bn)*E+bn*bt,bj=(1-bn)*e+bn*br,S=(1-bn)*bf+bn*bh,R=(1-bn)*bd+bn*bg,be=(90-ag.atan((bp-bs)/(bo-bq))*180/ag.PI);
(bp>bs||bo<bq)&&(be+=180);return{x:bk,y:bi,m:{x:bp,y:bo},n:{x:bs,y:bq},start:{x:bm,y:bj},end:{x:S,y:R},alpha:be}
};var Z=ao(function(bj){if(!bj){return{x:0,y:0,width:0,height:0}}bj=M(bj);var bg=0,bf=0,S=[],E=[],R;
for(var bd=0,bi=bj[n];bd<bi;bd++){R=bj[bd];if(R[0]=="M"){bg=R[1];bf=R[2];S[f](bg);
E[f](bf)}else{var be=aM(bg,bf,R[1],R[2],R[3],R[4],R[5],R[6]);S=S[a3](be.min.x,be.max.x);
E=E[a3](be.min.y,be.max.y);bg=R[5];bf=R[6]}}var e=aS[a8](0,S),bh=aS[a8](0,E);return{x:e,y:bh,width:h[a8](0,S)-e,height:h[a8](0,E)-bh}
}),aE=function(be){var R=[];if(!av.is(be,"array")||!av.is(be&&be[0],"array")){be=av.parsePathString(be)
}for(var E=0,S=be[n];E<S;E++){R[E]=[];for(var e=0,bd=be[E][n];e<bd;e++){R[E][e]=be[E][e]
}}R[aK]=av._path2string;return R},ai=ao(function(S){if(!av.is(S,"array")||!av.is(S&&S[0],"array")){S=av.parsePathString(S)
}var bi=[],bk=0,bj=0,bn=0,bm=0,R=0;if(S[0][0]=="M"){bk=S[0][1];bj=S[0][2];bn=bk;bm=bj;
R++;bi[f](["M",bk,bj])}for(var bf=R,bo=S[n];bf<bo;bf++){var e=bi[bf]=[],bl=S[bf];
if(bl[0]!=bc.call(bl[0])){e[0]=bc.call(bl[0]);switch(e[0]){case"a":e[1]=bl[1];e[2]=bl[2];
e[3]=bl[3];e[4]=bl[4];e[5]=bl[5];e[6]=+(bl[6]-bk).toFixed(3);e[7]=+(bl[7]-bj).toFixed(3);
break;case"v":e[1]=+(bl[1]-bj).toFixed(3);break;case"m":bn=bl[1];bm=bl[2];default:for(var be=1,bg=bl[n];
be<bg;be++){e[be]=+(bl[be]-((be%2)?bk:bj)).toFixed(3)}}}else{e=bi[bf]=[];if(bl[0]=="m"){bn=bl[1]+bk;
bm=bl[2]+bj}for(var bd=0,E=bl[n];bd<E;bd++){bi[bf][bd]=bl[bd]}}var bh=bi[bf][n];switch(bi[bf][0]){case"z":bk=bn;
bj=bm;break;case"h":bk+=+bi[bf][bh-1];break;case"v":bj+=+bi[bf][bh-1];break;default:bk+=+bi[bf][bh-2];
bj+=+bi[bf][bh-1]}}bi[aK]=av._path2string;return bi},0,aE),u=ao(function(S){if(!av.is(S,"array")||!av.is(S&&S[0],"array")){S=av.parsePathString(S)
}var bh=[],bj=0,bi=0,bm=0,bl=0,R=0;if(S[0][0]=="M"){bj=+S[0][1];bi=+S[0][2];bm=bj;
bl=bi;R++;bh[0]=["M",bj,bi]}for(var bf=R,bn=S[n];bf<bn;bf++){var e=bh[bf]=[],bk=S[bf];
if(bk[0]!=aY.call(bk[0])){e[0]=aY.call(bk[0]);switch(e[0]){case"A":e[1]=bk[1];e[2]=bk[2];
e[3]=bk[3];e[4]=bk[4];e[5]=bk[5];e[6]=+(bk[6]+bj);e[7]=+(bk[7]+bi);break;case"V":e[1]=+bk[1]+bi;
break;case"H":e[1]=+bk[1]+bj;break;case"M":bm=+bk[1]+bj;bl=+bk[2]+bi;default:for(var be=1,bg=bk[n];
be<bg;be++){e[be]=+bk[be]+((be%2)?bj:bi)}}}else{for(var bd=0,E=bk[n];bd<E;bd++){bh[bf][bd]=bk[bd]
}}switch(e[0]){case"Z":bj=bm;bi=bl;break;case"H":bj=e[1];break;case"V":bi=e[1];break;
default:bj=bh[bf][bh[bf][n]-2];bi=bh[bf][bh[bf][n]-1]}}bh[aK]=av._path2string;return bh
},null,aE),a9=function(E,S,e,R){return[E,S,e,R,e,R]},aU=function(E,S,bf,bd,e,R){var be=1/3,bg=2/3;
return[be*E+bg*bf,be*S+bg*bd,be*e+bg*bf,be*R+bg*bd,e,R]},P=function(bn,bS,bw,bu,bo,bi,bd,bm,bR,bp){var S=ag.PI,bt=S*120/180,e=S/180*(+bo||0),bA=[],bx,bO=ao(function(bU,bX,bT){var bW=bU*ag.cos(bT)-bX*ag.sin(bT),bV=bU*ag.sin(bT)+bX*ag.cos(bT);
return{x:bW,y:bV}});if(!bp){bx=bO(bn,bS,-e);bn=bx.x;bS=bx.y;bx=bO(bm,bR,-e);bm=bx.x;
bR=bx.y;var E=ag.cos(S/180*bo),bk=ag.sin(S/180*bo),bC=(bn-bm)/2,bB=(bS-bR)/2;var bM=(bC*bC)/(bw*bw)+(bB*bB)/(bu*bu);
if(bM>1){bM=ag.sqrt(bM);bw=bM*bw;bu=bM*bu}var R=bw*bw,bF=bu*bu,bH=(bi==bd?-1:1)*ag.sqrt(ag.abs((R*bF-R*bB*bB-bF*bC*bC)/(R*bB*bB+bF*bC*bC))),br=bH*bw*bB/bu+(bn+bm)/2,bq=bH*-bu*bC/bw+(bS+bR)/2,bh=ag.asin(((bS-bq)/bu).toFixed(7)),bg=ag.asin(((bR-bq)/bu).toFixed(7));
bh=bn<br?S-bh:bh;bg=bm<br?S-bg:bg;bh<0&&(bh=S*2+bh);bg<0&&(bg=S*2+bg);if(bd&&bh>bg){bh=bh-S*2
}if(!bd&&bg>bh){bg=bg-S*2}}else{bh=bp[0];bg=bp[1];br=bp[2];bq=bp[3]}var bl=bg-bh;
if(ag.abs(bl)>bt){var bs=bg,bv=bm,bj=bR;bg=bh+bt*(bd&&bg>bh?1:-1);bm=br+bw*ag.cos(bg);
bR=bq+bu*ag.sin(bg);bA=P(bm,bR,bw,bu,bo,0,bd,bv,bj,[bg,bs,br,bq])}bl=bg-bh;var bf=ag.cos(bh),bQ=ag.sin(bh),be=ag.cos(bg),bP=ag.sin(bg),bD=ag.tan(bl/4),bG=4/3*bw*bD,bE=4/3*bu*bD,bN=[bn,bS],bL=[bn+bG*bQ,bS-bE*bf],bK=[bm+bG*bP,bR-bE*be],bI=[bm,bR];
bL[0]=2*bN[0]-bL[0];bL[1]=2*bN[1]-bL[1];if(bp){return[bL,bK,bI][a3](bA)}else{bA=[bL,bK,bI][a3](bA)[aI]()[D](",");
var by=[];for(var bJ=0,bz=bA[n];bJ<bz;bJ++){by[bJ]=bJ%2?bO(bA[bJ-1],bA[bJ],e).y:bO(bA[bJ],bA[bJ+1],e).x
}return by}},U=function(E,e,S,R,bh,bg,bf,be,bi){var bd=1-bi;return{x:aW(bd,3)*E+aW(bd,2)*3*bi*S+bd*3*bi*bi*bh+aW(bi,3)*bf,y:aW(bd,3)*e+aW(bd,2)*3*bi*R+bd*3*bi*bi*bg+aW(bi,3)*be}
},aM=ao(function(R,e,bd,S,bo,bn,bk,bh){var bm=(bo-2*bd+R)-(bk-2*bo+bd),bj=2*(bd-R)-2*(bo-bd),bg=R-bd,bf=(-bj+ag.sqrt(bj*bj-4*bm*bg))/2/bm,be=(-bj-ag.sqrt(bj*bj-4*bm*bg))/2/bm,bi=[e,bh],bl=[R,bk],E;
ag.abs(bf)>1000000000000&&(bf=0.5);ag.abs(be)>1000000000000&&(be=0.5);if(bf>0&&bf<1){E=U(R,e,bd,S,bo,bn,bk,bh,bf);
bl[f](E.x);bi[f](E.y)}if(be>0&&be<1){E=U(R,e,bd,S,bo,bn,bk,bh,be);bl[f](E.x);bi[f](E.y)
}bm=(bn-2*S+e)-(bh-2*bn+S);bj=2*(S-e)-2*(bn-S);bg=e-S;bf=(-bj+ag.sqrt(bj*bj-4*bm*bg))/2/bm;
be=(-bj-ag.sqrt(bj*bj-4*bm*bg))/2/bm;ag.abs(bf)>1000000000000&&(bf=0.5);ag.abs(be)>1000000000000&&(be=0.5);
if(bf>0&&bf<1){E=U(R,e,bd,S,bo,bn,bk,bh,bf);bl[f](E.x);bi[f](E.y)}if(be>0&&be<1){E=U(R,e,bd,S,bo,bn,bk,bh,be);
bl[f](E.x);bi[f](E.y)}return{min:{x:aS[a8](0,bl),y:aS[a8](0,bi)},max:{x:h[a8](0,bl),y:h[a8](0,bi)}}
}),M=ao(function(bn,bi){var S=u(bn),bj=bi&&u(bi),bk={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},be=function(bp,bq){var bo,br;
if(!bp){return["C",bq.x,bq.y,bq.x,bq.y,bq.x,bq.y]}!(bp[0] in {T:1,Q:1})&&(bq.qx=bq.qy=null);
switch(bp[0]){case"M":bq.X=bp[1];bq.Y=bp[2];break;case"A":bp=["C"][a3](P[a8](0,[bq.x,bq.y][a3](bp.slice(1))));
break;case"S":bo=bq.x+(bq.x-(bq.bx||bq.x));br=bq.y+(bq.y-(bq.by||bq.y));bp=["C",bo,br][a3](bp.slice(1));
break;case"T":bq.qx=bq.x+(bq.x-(bq.qx||bq.x));bq.qy=bq.y+(bq.y-(bq.qy||bq.y));bp=["C"][a3](aU(bq.x,bq.y,bq.qx,bq.qy,bp[1],bp[2]));
break;case"Q":bq.qx=bp[1];bq.qy=bp[2];bp=["C"][a3](aU(bq.x,bq.y,bp[1],bp[2],bp[3],bp[4]));
break;case"L":bp=["C"][a3](a9(bq.x,bq.y,bp[1],bp[2]));break;case"H":bp=["C"][a3](a9(bq.x,bq.y,bp[1],bq.y));
break;case"V":bp=["C"][a3](a9(bq.x,bq.y,bq.x,bp[1]));break;case"Z":bp=["C"][a3](a9(bq.x,bq.y,bq.X,bq.Y));
break}return bp},E=function(bo,bp){if(bo[bp][n]>7){bo[bp].shift();var bq=bo[bp];while(bq[n]){bo.splice(bp++,0,["C"][a3](bq.splice(0,6)))
}bo.splice(bp,1);bl=h(S[n],bj&&bj[n]||0)}},R=function(bs,br,bp,bo,bq){if(bs&&br&&bs[bq][0]=="M"&&br[bq][0]!="M"){br.splice(bq,0,["M",bo.x,bo.y]);
bp.bx=0;bp.by=0;bp.x=bs[bq][1];bp.y=bs[bq][2];bl=h(S[n],bj&&bj[n]||0)}};for(var bg=0,bl=h(S[n],bj&&bj[n]||0);
bg<bl;bg++){S[bg]=be(S[bg],bk);E(S,bg);bj&&(bj[bg]=be(bj[bg],e));bj&&E(bj,bg);R(S,bj,bk,e,bg);
R(bj,S,e,bk,bg);var bf=S[bg],bm=bj&&bj[bg],bd=bf[n],bh=bj&&bm[n];bk.x=bf[bd-2];bk.y=bf[bd-1];
bk.bx=ab(bf[bd-4])||bk.x;bk.by=ab(bf[bd-3])||bk.y;e.bx=bj&&(ab(bm[bh-4])||e.x);e.by=bj&&(ab(bm[bh-3])||e.y);
e.x=bj&&bm[bh-2];e.y=bj&&bm[bh-1]}return bj?[S,bj]:S},null,aE),s=ao(function(bh){var bg=[];
for(var bd=0,bi=bh[n];bd<bi;bd++){var e={},bf=bh[bd].match(/^([^:]*):?([\d\.]*)/);
e.color=av.getRGB(bf[1]);if(e.color.error){return null}e.color=e.color.hex;bf[2]&&(e.offset=bf[2]+"%");
bg[f](e)}for(bd=1,bi=bg[n]-1;bd<bi;bd++){if(!bg[bd].offset){var E=ab(bg[bd-1].offset||0),R=0;
for(var S=bd+1;S<bi;S++){if(bg[S].offset){R=bg[S].offset;break}}if(!R){R=100;S=bi
}R=ab(R);var be=(R-E)/(S-bd+1);for(;bd<S;bd++){E+=be;bg[bd].offset=E+"%"}}}return bg
}),aw=function(e,bd,R,S){var E;if(av.is(e,"string")||av.is(e,"object")){E=av.is(e,"string")?Q.getElementById(e):e;
if(E.tagName){if(bd==null){return{container:E,width:E.style.pixelWidth||E.offsetWidth,height:E.style.pixelHeight||E.offsetHeight}
}else{return{container:E,width:bd,height:R}}}}else{if(av.is(e,ar)&&S!=null){return{container:1,x:e,y:bd,width:R,height:S}
}}},aQ=function(e,R){var E=this;for(var S in R){if(R[X](S)&&!(S in e)){switch(typeof R[S]){case"function":(function(bd){e[S]=e===E?bd:function(){return bd[a8](E,arguments)
}})(R[S]);break;case"object":e[S]=e[S]||{};aQ.call(this,e[S],R[S]);break;default:e[S]=R[S];
break}}}},aq=function(e,E){e==E.top&&(E.top=e.prev);e==E.bottom&&(E.bottom=e.next);
e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next)},ad=function(e,E){if(E.top===e){return
}aq(e,E);e.next=null;e.prev=E.top;E.top.next=e;E.top=e},l=function(e,E){if(E.bottom===e){return
}aq(e,E);e.next=E.bottom;e.prev=null;E.bottom.prev=e;E.bottom=e},F=function(E,e,R){aq(E,R);
e==R.top&&(R.top=E);e.next&&(e.next.prev=E);E.next=e.next;E.prev=e;e.next=E},ay=function(E,e,R){aq(E,R);
e==R.bottom&&(R.bottom=E);e.prev&&(e.prev.next=E);E.prev=e.prev;e.prev=E;E.next=e
},v=function(e){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+e+"\u201d of removed object")
}},aA=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(av.svg){a5[ba].svgns="http://www.w3.org/2000/svg";
a5[ba].xlink="http://www.w3.org/1999/xlink";V=function(e){return +e+(~~e===e)*0.5
};var aa=function(bd){for(var E=0,R=bd[n];E<R;E++){if(bc.call(bd[E][0])!="a"){for(var e=1,S=bd[E][n];
e<S;e++){bd[E][e]=V(bd[E][e])}}else{bd[E][6]=V(bd[E][6]);bd[E][7]=V(bd[E][7])}}return bd
},aT=function(R,e){if(e){for(var E in e){if(e[X](E)){R[z](E,e[E]+aB)}}}else{return Q.createElementNS(a5[ba].svgns,R)
}};av[aK]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version
};var t=function(e,S){var E=aT("path");S.canvas&&S.canvas[aV](E);var R=new aG(E,S);
R.type="path";af(R,{fill:"none",stroke:"#000",path:e});return R};var b=function(S,bm,e){var bj="linear",bg=0.5,be=0.5,bo=S.style;
bm=(bm+aB)[a0](aA,function(br,bp,bs){bj="radial";if(bp&&bs){bg=ab(bp);be=ab(bs);var bq=((be>0.5)*2-1);
aW(bg-0.5,2)+aW(be-0.5,2)>0.25&&(be=ag.sqrt(0.25-aW(bg-0.5,2))*bq+0.5)&&be!=0.5&&(be=be.toFixed(5)-0.00001*bq)
}return aB});bm=bm[D](/\s*\-\s*/);if(bj=="linear"){var bf=bm.shift();bf=-ab(bf);if(isNaN(bf)){return null
}var bd=[0,0,ag.cos(bf*ag.PI/180),ag.sin(bf*ag.PI/180)],bl=1/(h(ag.abs(bd[2]),ag.abs(bd[3]))||1);
bd[2]*=bl;bd[3]*=bl;if(bd[2]<0){bd[0]=-bd[2];bd[2]=0}if(bd[3]<0){bd[1]=-bd[3];bd[3]=0
}}var bi=s(bm);if(!bi){return null}var E=S.getAttribute("fill");E=E.match(/^url\(#(.*)\)$/);
E&&e.defs.removeChild(Q.getElementById(E[1]));var R=aT(bj+"Gradient");R.id="r"+(av._id++)[aK](36);
aT(R,bj=="radial"?{fx:bg,fy:be}:{x1:bd[0],y1:bd[1],x2:bd[2],y2:bd[3]});e.defs[aV](R);
for(var bh=0,bn=bi[n];bh<bn;bh++){var bk=aT("stop");aT(bk,{offset:bi[bh].offset?bi[bh].offset:!bh?"0%":"100%","stop-color":bi[bh].color||"#fff"});
R[aV](bk)}aT(S,{fill:"url(#"+R.id+")",opacity:1,"fill-opacity":1});bo.fill=aB;bo.opacity=1;
bo.fillOpacity=1;return 1};var T=function(E){var e=E.getBBox();aT(E.pattern,{patternTransform:av.format("translate({0},{1})",e.x,e.y)})
};var af=function(bl,bu){var bo={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bq=bl.node,bm=bl.attrs,bi=bl.rotate(),be=function(bB,bA){bA=bo[bc.call(bA)];
if(bA){var by=bB.attrs["stroke-width"]||"1",bw={round:by,square:by,butt:0}[bB.attrs["stroke-linecap"]||bu["stroke-linecap"]]||0,bz=[];
var bx=bA[n];while(bx--){bz[bx]=bA[bx]*by+((bx%2)?1:-1)*bw}aT(bq,{"stroke-dasharray":bz[aI](",")})
}};bu[X]("rotation")&&(bi=bu.rotation);var bh=(bi+aB)[D](a);if(!(bh.length-1)){bh=null
}else{bh[1]=+bh[1];bh[2]=+bh[2]}ab(bi)&&bl.rotate(0,true);for(var bp in bu){if(bu[X](bp)){if(!k[X](bp)){continue
}var bn=bu[bp];bm[bp]=bn;switch(bp){case"blur":bl.blur(bn);break;case"rotation":bl.rotate(bn,true);
break;case"href":case"title":case"target":var bs=bq.parentNode;if(bc.call(bs.tagName)!="a"){var S=aT("a");
bs.insertBefore(S,bq);S[aV](bq);bs=S}bs.setAttributeNS(bl.paper.xlink,bp,bn);break;
case"cursor":bq.style.cursor=bn;break;case"clip-rect":var E=(bn+aB)[D](a);if(E[n]==4){bl.clip&&bl.clip.parentNode.parentNode.removeChild(bl.clip.parentNode);
var R=aT("clipPath"),br=aT("rect");R.id="r"+(av._id++)[aK](36);aT(br,{x:E[0],y:E[1],width:E[2],height:E[3]});
R[aV](br);bl.paper.defs[aV](R);aT(bq,{"clip-path":"url(#"+R.id+")"});bl.clip=br}if(!bn){var bt=Q.getElementById(bq.getAttribute("clip-path")[a0](/(^url\(#|\)$)/g,aB));
bt&&bt.parentNode.removeChild(bt);aT(bq,{"clip-path":aB});delete bl.clip}break;case"path":if(bl.type=="path"){aT(bq,{d:bn?bm.path=aa(u(bn)):"M0,0"})
}break;case"width":bq[z](bp,bn);if(bm.fx){bp="x";bn=bm.x}else{break}case"x":if(bm.fx){bn=-bm.x-(bm.width||0)
}case"rx":if(bp=="rx"&&bl.type=="rect"){break}case"cx":bh&&(bp=="x"||bp=="cx")&&(bh[1]+=bn-bm[bp]);
bq[z](bp,V(bn));bl.pattern&&T(bl);break;case"height":bq[z](bp,bn);if(bm.fy){bp="y";
bn=bm.y}else{break}case"y":if(bm.fy){bn=-bm.y-(bm.height||0)}case"ry":if(bp=="ry"&&bl.type=="rect"){break
}case"cy":bh&&(bp=="y"||bp=="cy")&&(bh[2]+=bn-bm[bp]);bq[z](bp,V(bn));bl.pattern&&T(bl);
break;case"r":if(bl.type=="rect"){aT(bq,{rx:bn,ry:bn})}else{bq[z](bp,bn)}break;case"src":if(bl.type=="image"){bq.setAttributeNS(bl.paper.xlink,"href",bn)
}break;case"stroke-width":bq.style.strokeWidth=bn;bq[z](bp,bn);if(bm["stroke-dasharray"]){be(bl,bm["stroke-dasharray"])
}break;case"stroke-dasharray":be(bl,bn);break;case"translation":var bf=(bn+aB)[D](a);
bf[0]=+bf[0]||0;bf[1]=+bf[1]||0;if(bh){bh[1]+=bf[0];bh[2]+=bf[1]}w.call(bl,bf[0],bf[1]);
break;case"scale":bf=(bn+aB)[D](a);bl.scale(+bf[0]||1,+bf[1]||+bf[0]||1,isNaN(ab(bf[2]))?null:+bf[2],isNaN(ab(bf[3]))?null:+bf[3]);
break;case"fill":var bd=(bn+aB).match(c);if(bd){R=aT("pattern");var bk=aT("image");
R.id="r"+(av._id++)[aK](36);aT(R,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});
aT(bk,{x:0,y:0});bk.setAttributeNS(bl.paper.xlink,"href",bd[1]);R[aV](bk);var bv=Q.createElement("img");
bv.style.cssText="position:absolute;left:-9999em;top-9999em";bv.onload=function(){aT(R,{width:this.offsetWidth,height:this.offsetHeight});
aT(bk,{width:this.offsetWidth,height:this.offsetHeight});Q.body.removeChild(this);
bl.paper.safari()};Q.body[aV](bv);bv.src=bd[1];bl.paper.defs[aV](R);bq.style.fill="url(#"+R.id+")";
aT(bq,{fill:"url(#"+R.id+")"});bl.pattern=R;bl.pattern&&T(bl);break}if(!av.getRGB(bn).error){delete bu.gradient;
delete bm.gradient;!av.is(bm.opacity,"undefined")&&av.is(bu.opacity,"undefined")&&aT(bq,{opacity:bm.opacity});
!av.is(bm["fill-opacity"],"undefined")&&av.is(bu["fill-opacity"],"undefined")&&aT(bq,{"fill-opacity":bm["fill-opacity"]})
}else{if((({circle:1,ellipse:1})[X](bl.type)||(bn+aB).charAt()!="r")&&b(bq,bn,bl.paper)){bm.gradient=bn;
bm.fill="none";break}}case"stroke":bq[z](bp,av.getRGB(bn).hex);break;case"gradient":(({circle:1,ellipse:1})[X](bl.type)||(bn+aB).charAt()!="r")&&b(bq,bn,bl.paper);
break;case"opacity":case"fill-opacity":if(bm.gradient){var e=Q.getElementById(bq.getAttribute("fill")[a0](/^url\(#|\)$/g,aB));
if(e){var bg=e.getElementsByTagName("stop");bg[bg[n]-1][z]("stop-opacity",bn)}break
}default:bp=="font-size"&&(bn=L(bn,10)+"px");var bj=bp[a0](/(\-.)/g,function(bw){return aY.call(bw.substring(1))
});bq.style[bj]=bn;bq[z](bp,bn);break}}}J(bl,bu);if(bh){bl.rotate(bh.join(au))}else{ab(bi)&&bl.rotate(bi,true)
}};var j=1.2,J=function(e,S){if(e.type!="text"||!(S[X]("text")||S[X]("font")||S[X]("font-size")||S[X]("x")||S[X]("y"))){return
}var bh=e.attrs,E=e.node,bj=E.firstChild?L(Q.defaultView.getComputedStyle(E.firstChild,aB).getPropertyValue("font-size"),10):10;
if(S[X]("text")){bh.text=S.text;while(E.firstChild){E.removeChild(E.firstChild)}var R=(S.text+aB)[D]("\n");
for(var bd=0,bi=R[n];bd<bi;bd++){if(R[bd]){var bf=aT("tspan");bd&&aT(bf,{dy:bj*j,x:bh.x});
bf[aV](Q.createTextNode(R[bd]));E[aV](bf)}}}else{R=E.getElementsByTagName("tspan");
for(bd=0,bi=R[n];bd<bi;bd++){bd&&aT(R[bd],{dy:bj*j,x:bh.x})}}aT(E,{y:bh.y});var be=e.getBBox(),bg=bh.y-(be.y+be.height/2);
bg&&isFinite(bg)&&aT(E,{y:bh.y+bg})},aG=function(E,e){var S=0,R=0;this[0]=E;this.id=av._oid++;
this.node=E;E.raphael=this;this.paper=e;this.attrs=this.attrs||{};this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aG[ba].rotate=function(E,e,S){if(this.removed){return this
}if(E==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aI](au)
}return this._.rt.deg}var R=this.getBBox();E=(E+aB)[D](a);if(E[n]-1){e=ab(E[1]);S=ab(E[2])
}E=ab(E[0]);if(e!=null){this._.rt.deg=E}else{this._.rt.deg+=E}(S==null)&&(e=null);
this._.rt.cx=e;this._.rt.cy=S;e=e==null?R.x+R.width/2:e;S=S==null?R.y+R.height/2:S;
if(this._.rt.deg){this.transformations[0]=av.format("rotate({0} {1} {2})",this._.rt.deg,e,S);
this.clip&&aT(this.clip,{transform:av.format("rotate({0} {1} {2})",-this._.rt.deg,e,S)})
}else{this.transformations[0]=aB;this.clip&&aT(this.clip,{transform:aB})}aT(this.node,{transform:this.transformations[aI](au)});
return this};aG[ba].hide=function(){!this.removed&&(this.node.style.display="none");
return this};aG[ba].show=function(){!this.removed&&(this.node.style.display="");return this
};aG[ba].remove=function(){if(this.removed){return}aq(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var e in this){delete this[e]}this.removed=true};aG[ba].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return Z(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var R=true}var bf={};try{bf=this.node.getBBox()}catch(bd){}finally{bf=bf||{}}if(this.type=="text"){bf={x:bf.x,y:Infinity,width:0,height:0};
for(var E=0,S=this.node.getNumberOfChars();E<S;E++){var be=this.node.getExtentOfChar(E);
(be.y<bf.y)&&(bf.y=be.y);(be.y+be.height-bf.y>bf.height)&&(bf.height=be.y+be.height-bf.y);
(be.x+be.width-bf.x>bf.width)&&(bf.width=be.x+be.width-bf.x)}}R&&this.hide();return bf
};aG[ba].attr=function(R,bf){if(this.removed){return this}if(R==null){var bd={};for(var S in this.attrs){if(this.attrs[X](S)){bd[S]=this.attrs[S]
}}this._.rt.deg&&(bd.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(bd.scale=this.scale());
bd.gradient&&bd.fill=="none"&&(bd.fill=bd.gradient)&&delete bd.gradient;return bd
}if(bf==null&&av.is(R,"string")){if(R=="translation"){return w.call(this)}if(R=="rotation"){return this.rotate()
}if(R=="scale"){return this.scale()}if(R=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[R]}if(bf==null&&av.is(R,"array")){var e={};for(var E=0,be=R.length;
E<be;E++){e[R[E]]=this.attr(R[E])}return e}if(bf!=null){var bg={};bg[R]=bf;af(this,bg)
}else{if(R!=null&&av.is(R,"object")){af(this,R)}}return this};aG[ba].toFront=function(){if(this.removed){return this
}this.node.parentNode[aV](this.node);var e=this.paper;e.top!=this&&ad(this,e);return this
};aG[ba].toBack=function(){if(this.removed){return this}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
l(this,this.paper);var e=this.paper}return this};aG[ba].insertAfter=function(e){if(this.removed){return this
}var E=e.node;if(E.nextSibling){E.parentNode.insertBefore(this.node,E.nextSibling)
}else{E.parentNode[aV](this.node)}F(this,e,this.paper);return this};aG[ba].insertBefore=function(e){if(this.removed){return this
}var E=e.node;E.parentNode.insertBefore(this.node,E);ay(this,e,this.paper);return this
};aG[ba].blur=function(E){var e=this;if(+E!==0){var R=aT("filter"),S=aT("feGaussianBlur");
e.attrs.blur=E;R.id="r"+(av._id++)[aK](36);aT(S,{stdDeviation:+E||1.5});R.appendChild(S);
e.paper.defs.appendChild(R);e._blur=R;aT(e.node,{filter:"url(#"+R.id+")"})}else{if(e._blur){e._blur.parentNode.removeChild(e._blur);
delete e._blur;delete e.attrs.blur}e.node.removeAttribute("filter")}};var W=function(E,e,be,bd){e=V(e);
be=V(be);var S=aT("circle");E.canvas&&E.canvas[aV](S);var R=new aG(S,E);R.attrs={cx:e,cy:be,r:bd,fill:"none",stroke:"#000"};
R.type="circle";aT(S,R.attrs);return R};var aP=function(R,e,bg,E,be,bf){e=V(e);bg=V(bg);
var bd=aT("rect");R.canvas&&R.canvas[aV](bd);var S=new aG(bd,R);S.attrs={x:e,y:bg,width:E,height:be,r:bf||0,rx:bf||0,ry:bf||0,fill:"none",stroke:"#000"};
S.type="rect";aT(bd,S.attrs);return S};var an=function(E,e,bf,be,bd){e=V(e);bf=V(bf);
var S=aT("ellipse");E.canvas&&E.canvas[aV](S);var R=new aG(S,E);R.attrs={cx:e,cy:bf,rx:be,ry:bd,fill:"none",stroke:"#000"};
R.type="ellipse";aT(S,R.attrs);return R};var q=function(R,bf,e,bg,E,be){var bd=aT("image");
aT(bd,{x:e,y:bg,width:E,height:be,preserveAspectRatio:"none"});bd.setAttributeNS(R.xlink,"href",bf);
R.canvas&&R.canvas[aV](bd);var S=new aG(bd,R);S.attrs={x:e,y:bg,width:E,height:be,src:bf};
S.type="image";return S};var ac=function(E,e,be,bd){var S=aT("text");aT(S,{x:e,y:be,"text-anchor":"middle"});
E.canvas&&E.canvas[aV](S);var R=new aG(S,E);R.attrs={x:e,y:be,"text-anchor":"middle",text:bd,font:k.font,stroke:"none",fill:"#000"};
R.type="text";af(R,R.attrs);return R};var a7=function(E,e){this.width=E||this.width;
this.height=e||this.height;this.canvas[z]("width",this.width);this.canvas[z]("height",this.height);
return this};var A=function(){var S=aw[a8](0,arguments),R=S&&S.container,E=S.x,bf=S.y,bd=S.width,e=S.height;
if(!R){throw new Error("SVG container not found.")}var be=aT("svg");bd=bd||512;e=e||342;
aT(be,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:bd,height:e});if(R==1){be.style.cssText="position:absolute;left:"+E+"px;top:"+bf+"px";
Q.body[aV](be)}else{if(R.firstChild){R.insertBefore(be,R.firstChild)}else{R[aV](be)
}}R=new a5;R.width=bd;R.height=e;R.canvas=be;aQ.call(R,R,av.fn);R.clear();return R
};a5[ba].clear=function(){var e=this.canvas;while(e.firstChild){e.removeChild(e.firstChild)
}this.bottom=this.top=null;(this.desc=aT("desc"))[aV](Q.createTextNode("Created with Rapha\xebl"));
e[aV](this.desc);e[aV](this.defs=aT("defs"))};a5[ba].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=v(e)}}}if(av.vml){var I={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},az=/([clmz]),?([^clmz]*)/gi,bb=/-?[^,\s-]+/g,aJ=1000+au+1000,p=10,aR=function(bj){var bg=/[ahqstv]/ig,R=u;
(bj+aB).match(bg)&&(R=M);bg=/[clmz]/g;if(R==u&&!(bj+aB).match(bg)){var bf=(bj+aB)[a0](az,function(bn,bp,bl){var bo=[],bk=bc.call(bp)=="m",bm=I[bp];
bl[a0](bb,function(bq){if(bk&&bo[n]==2){bm+=bo+I[bp=="m"?"l":"L"];bo=[]}bo[f](V(bq*p))
});return bm+bo});return bf}var bh=R(bj),E,e;bf=[];for(var bd=0,bi=bh[n];bd<bi;bd++){E=bh[bd];
e=bc.call(bh[bd][0]);e=="z"&&(e="x");for(var S=1,be=E[n];S<be;S++){e+=V(E[S]*p)+(S!=be-1?",":aB)
}bf[f](e)}return bf[aI](au)};av[aK]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version
};t=function(R,E){var be=am("group");be.style.cssText="position:absolute;left:0;top:0;width:"+E.width+"px;height:"+E.height+"px";
be.coordsize=E.coordsize;be.coordorigin=E.coordorigin;var bd=am("shape"),S=bd.style;
S.width=E.width+"px";S.height=E.height+"px";bd.coordsize=aJ;bd.coordorigin=E.coordorigin;
be[aV](bd);var bf=new aG(bd,be,E),e={fill:"none",stroke:"#000"};R&&(e.path=R);bf.isAbsolute=true;
bf.type="path";bf.path=[];bf.Path=aB;af(bf,e);E.canvas[aV](be);return bf};af=function(bi,bn){bi.attrs=bi.attrs||{};
var bl=bi.node,bo=bi.attrs,bf=bl.style,S,bs=bi;for(var bg in bn){if(bn[X](bg)){bo[bg]=bn[bg]
}}bn.href&&(bl.href=bn.href);bn.title&&(bl.title=bn.title);bn.target&&(bl.target=bn.target);
bn.cursor&&(bf.cursor=bn.cursor);"blur" in bn&&bi.blur(bn.blur);if(bn.path&&bi.type=="path"){bo.path=bn.path;
bl.path=aR(bo.path)}if(bn.rotation!=null){bi.rotate(bn.rotation,true)}if(bn.translation){S=(bn.translation+aB)[D](a);
w.call(bi,S[0],S[1]);if(bi._.rt.cx!=null){bi._.rt.cx+=+S[0];bi._.rt.cy+=+S[1];bi.setBox(bi.attrs,S[0],S[1])
}}if(bn.scale){S=(bn.scale+aB)[D](a);bi.scale(+S[0]||1,+S[1]||+S[0]||1,+S[2]||null,+S[3]||null)
}if("clip-rect" in bn){var e=(bn["clip-rect"]+aB)[D](a);if(e[n]==4){e[2]=+e[2]+(+e[0]);
e[3]=+e[3]+(+e[1]);var bh=bl.clipRect||Q.createElement("div"),br=bh.style,be=bl.parentNode;
br.clip=av.format("rect({1}px {2}px {3}px {0}px)",e);if(!bl.clipRect){br.position="absolute";
br.top=0;br.left=0;br.width=bi.paper.width+"px";br.height=bi.paper.height+"px";be.parentNode.insertBefore(bh,be);
bh[aV](be);bl.clipRect=bh}}if(!bn["clip-rect"]){bl.clipRect&&(bl.clipRect.style.clip=aB)
}}if(bi.type=="image"&&bn.src){bl.src=bn.src}if(bi.type=="image"&&bn.opacity){bl.filterOpacity=" progid:DXImageTransform.Microsoft.Alpha(opacity="+(bn.opacity*100)+")";
bf.filter=(bl.filterMatrix||aB)+(bl.filterOpacity||aB)}bn.font&&(bf.font=bn.font);
bn["font-family"]&&(bf.fontFamily='"'+bn["font-family"][D](",")[0][a0](/^['"]+|['"]+$/g,aB)+'"');
bn["font-size"]&&(bf.fontSize=bn["font-size"]);bn["font-weight"]&&(bf.fontWeight=bn["font-weight"]);
bn["font-style"]&&(bf.fontStyle=bn["font-style"]);if(bn.opacity!=null||bn["stroke-width"]!=null||bn.fill!=null||bn.stroke!=null||bn["stroke-width"]!=null||bn["stroke-opacity"]!=null||bn["fill-opacity"]!=null||bn["stroke-dasharray"]!=null||bn["stroke-miterlimit"]!=null||bn["stroke-linejoin"]!=null||bn["stroke-linecap"]!=null){bl=bi.shape||bl;
var bm=(bl.getElementsByTagName("fill")&&bl.getElementsByTagName("fill")[0]),bp=false;
!bm&&(bp=bm=am("fill"));if("fill-opacity" in bn||"opacity" in bn){var E=((+bo["fill-opacity"]+1||2)-1)*((+bo.opacity+1||2)-1);
E<0&&(E=0);E>1&&(E=1);bm.opacity=E}bn.fill&&(bm.on=true);if(bm.on==null||bn.fill=="none"){bm.on=false
}if(bm.on&&bn.fill){var R=bn.fill.match(c);if(R){bm.src=R[1];bm.type="tile"}else{bm.color=av.getRGB(bn.fill).hex;
bm.src=aB;bm.type="solid";if(av.getRGB(bn.fill).error&&(bs.type in {circle:1,ellipse:1}||(bn.fill+aB).charAt()!="r")&&b(bs,bn.fill)){bo.fill="none";
bo.gradient=bn.fill}}}bp&&bl[aV](bm);var bd=(bl.getElementsByTagName("stroke")&&bl.getElementsByTagName("stroke")[0]),bq=false;
!bd&&(bq=bd=am("stroke"));if((bn.stroke&&bn.stroke!="none")||bn["stroke-width"]||bn["stroke-opacity"]!=null||bn["stroke-dasharray"]||bn["stroke-miterlimit"]||bn["stroke-linejoin"]||bn["stroke-linecap"]){bd.on=true
}(bn.stroke=="none"||bd.on==null||bn.stroke==0||bn["stroke-width"]==0)&&(bd.on=false);
bd.on&&bn.stroke&&(bd.color=av.getRGB(bn.stroke).hex);E=((+bo["stroke-opacity"]+1||2)-1)*((+bo.opacity+1||2)-1);
var bj=(ab(bn["stroke-width"])||1)*0.75;E<0&&(E=0);E>1&&(E=1);bn["stroke-width"]==null&&(bj=bo["stroke-width"]);
bn["stroke-width"]&&(bd.weight=bj);bj&&bj<1&&(E*=bj)&&(bd.weight=1);bd.opacity=E;
bn["stroke-linejoin"]&&(bd.joinstyle=bn["stroke-linejoin"]||"miter");bd.miterlimit=bn["stroke-miterlimit"]||8;
bn["stroke-linecap"]&&(bd.endcap=bn["stroke-linecap"]=="butt"?"flat":bn["stroke-linecap"]=="square"?"square":"round");
if(bn["stroke-dasharray"]){var bk={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
bd.dashstyle=bk[X](bn["stroke-dasharray"])?bk[bn["stroke-dasharray"]]:aB}bq&&bl[aV](bd)
}if(bs.type=="text"){bf=bs.paper.span.style;bo.font&&(bf.font=bo.font);bo["font-family"]&&(bf.fontFamily=bo["font-family"]);
bo["font-size"]&&(bf.fontSize=bo["font-size"]);bo["font-weight"]&&(bf.fontWeight=bo["font-weight"]);
bo["font-style"]&&(bf.fontStyle=bo["font-style"]);bs.node.string&&(bs.paper.span.innerHTML=(bs.node.string+aB)[a0](/</g,"&#60;")[a0](/&/g,"&#38;")[a0](/\n/g,"<br>"));
bs.W=bo.w=bs.paper.span.offsetWidth;bs.H=bo.h=bs.paper.span.offsetHeight;bs.X=bo.x;
bs.Y=bo.y+V(bs.H/2);switch(bo["text-anchor"]){case"start":bs.node.style["v-text-align"]="left";
bs.bbx=V(bs.W/2);break;case"end":bs.node.style["v-text-align"]="right";bs.bbx=-V(bs.W/2);
break;default:bs.node.style["v-text-align"]="center";break}}};b=function(e,bf){e.attrs=e.attrs||{};
var bg=e.attrs,bi=e.node.getElementsByTagName("fill"),bd="linear",be=".5 .5";e.attrs.gradient=bf;
bf=(bf+aB)[a0](aA,function(bl,bm,bk){bd="radial";if(bm&&bk){bm=ab(bm);bk=ab(bk);aW(bm-0.5,2)+aW(bk-0.5,2)>0.25&&(bk=ag.sqrt(0.25-aW(bm-0.5,2))*((bk>0.5)*2-1)+0.5);
be=bm+au+bk}return aB});bf=bf[D](/\s*\-\s*/);if(bd=="linear"){var E=bf.shift();E=-ab(E);
if(isNaN(E)){return null}}var S=s(bf);if(!S){return null}e=e.shape||e.node;bi=bi[0]||am("fill");
if(S[n]){bi.on=true;bi.method="none";bi.type=(bd=="radial")?"gradientradial":"gradient";
bi.color=S[0].color;bi.color2=S[S[n]-1].color;var bj=[];for(var R=0,bh=S[n];R<bh;
R++){S[R].offset&&bj[f](S[R].offset+au+S[R].color)}bi.colors&&(bi.colors.value=bj[n]?bj[aI](","):"0% "+bi.color);
if(bd=="radial"){bi.focus="100%";bi.focussize=be;bi.focusposition=be}else{bi.angle=(270-E)%360
}}return 1};aG=function(bd,bf,e){var be=0,R=0,E=0,S=1;this[0]=bd;this.id=av._oid++;
this.node=bd;bd.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=bf;this.paper=e;
this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aG[ba].rotate=function(E,e,R){if(this.removed){return this
}if(E==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aI](au)
}return this._.rt.deg}E=(E+aB)[D](a);if(E[n]-1){e=ab(E[1]);R=ab(E[2])}E=ab(E[0]);
if(e!=null){this._.rt.deg=E}else{this._.rt.deg+=E}R==null&&(e=null);this._.rt.cx=e;
this._.rt.cy=R;this.setBox(this.attrs,e,R);this.Group.style.rotation=this._.rt.deg;
return this};aG[ba].setBox=function(bq,E,e){if(this.removed){return this}var bk=this.Group.style,S=(this.shape&&this.shape.style)||this.node.style;
bq=bq||{};for(var bo in bq){if(bq[X](bo)){this.attrs[bo]=bq[bo]}}E=E||this._.rt.cx;
e=e||this._.rt.cy;var bm=this.attrs,bf,be,bg,bp;switch(this.type){case"circle":bf=bm.cx-bm.r;
be=bm.cy-bm.r;bg=bp=bm.r*2;break;case"ellipse":bf=bm.cx-bm.rx;be=bm.cy-bm.ry;bg=bm.rx*2;
bp=bm.ry*2;break;case"rect":case"image":bf=+bm.x;be=+bm.y;bg=bm.width||0;bp=bm.height||0;
break;case"text":this.textpath.v=["m",V(bm.x),", ",V(bm.y-2),"l",V(bm.x)+1,", ",V(bm.y-2)][aI](aB);
bf=bm.x-V(this.W/2);be=bm.y-this.H/2;bg=this.W;bp=this.H;break;case"path":if(!this.attrs.path){bf=0;
be=0;bg=this.paper.width;bp=this.paper.height}else{var bn=Z(this.attrs.path);bf=bn.x;
be=bn.y;bg=bn.width;bp=bn.height}break;default:bf=0;be=0;bg=this.paper.width;bp=this.paper.height;
break}E=(E==null)?bf+bg/2:E;e=(e==null)?be+bp/2:e;var R=E-this.paper.width/2,bj=e-this.paper.height/2,bi;
bk.left!=(bi=R+"px")&&(bk.left=bi);bk.top!=(bi=bj+"px")&&(bk.top=bi);this.X=this.type=="path"?-R:bf;
this.Y=this.type=="path"?-bj:be;this.W=bg;this.H=bp;if(this.type=="path"){S.left!=(bi=-R*p+"px")&&(S.left=bi);
S.top!=(bi=-bj*p+"px")&&(S.top=bi)}else{if(this.type=="text"){S.left!=(bi=-R+"px")&&(S.left=bi);
S.top!=(bi=-bj+"px")&&(S.top=bi)}else{bk.width!=(bi=this.paper.width+"px")&&(bk.width=bi);
bk.height!=(bi=this.paper.height+"px")&&(bk.height=bi);S.left!=(bi=bf-R+"px")&&(S.left=bi);
S.top!=(bi=be-bj+"px")&&(S.top=bi);S.width!=(bi=bg+"px")&&(S.width=bi);S.height!=(bi=bp+"px")&&(S.height=bi);
var bd=(+bq.r||0)/aS(bg,bp);if(this.type=="rect"&&this.arcsize.toFixed(4)!=bd.toFixed(4)&&(bd||this.arcsize)){var bl=am("roundrect"),br={},bh=this.events&&this.events[n];
bo=0;bl.arcsize=bd;bl.raphael=this;this.Group[aV](bl);this.Group.removeChild(this.node);
this[0]=this.node=bl;this.arcsize=bd;for(bo in bm){br[bo]=bm[bo]}delete br.scale;
this.attr(br);if(this.events){for(;bo<bh;bo++){this.events[bo].unbind=aj(this.node,this.events[bo].name,this.events[bo].f,this)
}}}}}};aG[ba].hide=function(){!this.removed&&(this.Group.style.display="none");return this
};aG[ba].show=function(){!this.removed&&(this.Group.style.display="block");return this
};aG[ba].getBBox=function(){if(this.removed){return this}if(this.type=="path"){return Z(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};aG[ba].remove=function(){if(this.removed){return
}aq(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this){delete this[e]
}this.removed=true};aG[ba].attr=function(E,be){if(this.removed){return this}if(E==null){var S={};
for(var R in this.attrs){if(this.attrs[X](R)){S[R]=this.attrs[R]}}this._.rt.deg&&(S.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(S.scale=this.scale());S.gradient&&S.fill=="none"&&(S.fill=S.gradient)&&delete S.gradient;
return S}if(be==null&&av.is(E,"string")){if(E=="translation"){return w.call(this)
}if(E=="rotation"){return this.rotate()}if(E=="scale"){return this.scale()}if(E=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[E]}if(this.attrs&&be==null&&av.is(E,"array")){var bd,e={};for(R=0,bd=E[n];
R<bd;R++){e[E[R]]=this.attr(E[R])}return e}var bf;if(be!=null){bf={};bf[E]=be}be==null&&av.is(E,"object")&&(bf=E);
if(bf){if(bf.text&&this.type=="text"){this.node.string=bf.text}af(this,bf);if(bf.gradient&&(({circle:1,ellipse:1})[X](this.type)||(bf.gradient+aB).charAt()!="r")){b(this,bf.gradient)
}(this.type!="path"||this._.rt.deg)&&this.setBox(this.attrs)}return this};aG[ba].toFront=function(){!this.removed&&this.Group.parentNode[aV](this.Group);
this.paper.top!=this&&ad(this,this.paper);return this};aG[ba].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
l(this,this.paper)}return this};aG[ba].insertAfter=function(e){if(this.removed){return this
}if(e.Group.nextSibling){e.Group.parentNode.insertBefore(this.Group,e.Group.nextSibling)
}else{e.Group.parentNode[aV](this.Group)}F(this,e,this.paper);return this};aG[ba].insertBefore=function(e){if(this.removed){return this
}e.Group.parentNode.insertBefore(this.Group,e.Group);ay(this,e,this.paper);return this
};var a4=/ progid:\S+Blur\([^\)]+\)/g;aG[ba].blur=function(e){var E=this.node.style,R=E.filter;
R=R.replace(a4,"");if(+e!==0){this.attrs.blur=e;E.filter=R+" progid:DXImageTransform.Microsoft.Blur(pixelradius="+(+e||1.5)+")";
E.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+e||1.5))}else{E.filter=R;
E.margin=0;delete this.attrs.blur}};W=function(E,e,bg,be){var bd=am("group"),bf=am("oval"),R=bf.style;
bd.style.cssText="position:absolute;left:0;top:0;width:"+E.width+"px;height:"+E.height+"px";
bd.coordsize=aJ;bd.coordorigin=E.coordorigin;bd[aV](bf);var S=new aG(bf,bd,E);S.type="circle";
af(S,{stroke:"#000",fill:"none"});S.attrs.cx=e;S.attrs.cy=bg;S.attrs.r=be;S.setBox({x:e-be,y:bg-be,width:be*2,height:be*2});
E.canvas[aV](bd);return S};aP=function(E,bg,bf,bh,S,e){var bd=am("group"),R=am("roundrect"),bi=(+e||0)/(aS(bh,S));
bd.style.cssText="position:absolute;left:0;top:0;width:"+E.width+"px;height:"+E.height+"px";
bd.coordsize=aJ;bd.coordorigin=E.coordorigin;bd[aV](R);R.arcsize=bi;var be=new aG(R,bd,E);
be.type="rect";af(be,{stroke:"#000"});be.arcsize=bi;be.setBox({x:bg,y:bf,width:bh,height:S,r:e});
E.canvas[aV](bd);return be};an=function(e,bh,bg,R,E){var bd=am("group"),S=am("oval"),bf=S.style;
bd.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
bd.coordsize=aJ;bd.coordorigin=e.coordorigin;bd[aV](S);var be=new aG(S,bd,e);be.type="ellipse";
af(be,{stroke:"#000"});be.attrs.cx=bh;be.attrs.cy=bg;be.attrs.rx=R;be.attrs.ry=E;
be.setBox({x:bh-R,y:bg-E,width:R*2,height:E*2});e.canvas[aV](bd);return be};q=function(E,e,bh,bg,bi,S){var bd=am("group"),R=am("image"),bf=R.style;
bd.style.cssText="position:absolute;left:0;top:0;width:"+E.width+"px;height:"+E.height+"px";
bd.coordsize=aJ;bd.coordorigin=E.coordorigin;R.src=e;bd[aV](R);var be=new aG(R,bd,E);
be.type="image";be.attrs.src=e;be.attrs.x=bh;be.attrs.y=bg;be.attrs.w=bi;be.attrs.h=S;
be.setBox({x:bh,y:bg,width:bi,height:S});E.canvas[aV](bd);return be};ac=function(E,bh,bg,bi){var bd=am("group"),S=am("shape"),bf=S.style,bj=am("path"),e=bj.style,R=am("textpath");
bd.style.cssText="position:absolute;left:0;top:0;width:"+E.width+"px;height:"+E.height+"px";
bd.coordsize=aJ;bd.coordorigin=E.coordorigin;bj.v=av.format("m{0},{1}l{2},{1}",V(bh*10),V(bg*10),V(bh*10)+1);
bj.textpathok=true;bf.width=E.width;bf.height=E.height;R.string=bi+aB;R.on=true;S[aV](R);
S[aV](bj);bd[aV](S);var be=new aG(R,bd,E);be.shape=S;be.textpath=bj;be.type="text";
be.attrs.text=bi;be.attrs.x=bh;be.attrs.y=bg;be.attrs.w=1;be.attrs.h=1;af(be,{font:k.font,stroke:"none",fill:"#000"});
be.setBox();E.canvas[aV](bd);return be};a7=function(R,e){var E=this.canvas.style;
R==+R&&(R+="px");e==+e&&(e+="px");E.width=R;E.height=e;E.clip="rect(0 "+R+" "+e+" 0)";
return this};var am;Q.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");
try{!Q.namespaces.rvml&&Q.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
am=function(e){return Q.createElement("<rvml:"+e+' class="rvml">')}}catch(ak){am=function(e){return Q.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}A=function(){var R=aw[a8](0,arguments),e=R.container,bh=R.height,bi,E=R.width,bg=R.x,bf=R.y;
if(!e){throw new Error("VML container not found.")}var bd=new a5,be=bd.canvas=Q.createElement("div"),S=be.style;
E=E||512;bh=bh||342;E==+E&&(E+="px");bh==+bh&&(bh+="px");bd.width=1000;bd.height=1000;
bd.coordsize=p*1000+au+p*1000;bd.coordorigin="0 0";bd.span=Q.createElement("span");
bd.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
be[aV](bd.span);S.cssText=av.format("width:{0};height:{1};position:absolute;clip:rect(0 {0} {1} 0);overflow:hidden",E,bh);
if(e==1){Q.body[aV](be);S.left=bg+"px";S.top=bf+"px"}else{e.style.width=E;e.style.height=bh;
if(e.firstChild){e.insertBefore(be,e.firstChild)}else{e[aV](be)}}aQ.call(bd,bd,av.fn);
return bd};a5[ba].clear=function(){this.canvas.innerHTML=aB;this.span=Q.createElement("span");
this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[aV](this.span);this.bottom=this.top=null};a5[ba].remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=v(e)}return true}}if((/^Apple|^Google/).test(aC.navigator.vendor)&&!(aC.navigator.userAgent.indexOf("Version/4.0")+1)){a5[ba].safari=function(){var e=this.rect(-99,-99,this.width+99,this.height+99);
aC.setTimeout(function(){e.remove()})}}else{a5[ba].safari=function(){}}var aj=(function(){if(Q.addEventListener){return function(bd,R,E,e){var S=function(be){return E.call(e,be)
};bd.addEventListener(R,S,false);return function(){bd.removeEventListener(R,S,false);
return true}}}else{if(Q.attachEvent){return function(be,S,R,E){var bd=function(bf){return R.call(E,bf||aC.event)
};be.attachEvent("on"+S,bd);var e=function(){be.detachEvent("on"+S,bd);return true
};return e}}}})();for(var ah=K[n];ah--;){(function(e){aG[ba][e]=function(E){if(av.is(E,"function")){this.events=this.events||[];
this.events.push({name:e,f:E,unbind:aj(this.shape||this.node,e,E,this)})}return this
};aG[ba]["un"+e]=function(S){var R=this.events,E=R[n];while(E--){if(R[E].name==e&&R[E].f==S){R[E].unbind();
R.splice(E,1);!R.length&&delete this.events;return this}}return this}})(K[ah])}aG[ba].hover=function(E,e){return this.mouseover(E).mouseout(e)
};aG[ba].unhover=function(E,e){return this.unmouseover(E).unmouseout(e)};a5[ba].circle=function(e,R,E){return W(this,e||0,R||0,E||0)
};a5[ba].rect=function(e,bd,E,R,S){return aP(this,e||0,bd||0,E||0,R||0,S||0)};a5[ba].ellipse=function(e,S,R,E){return an(this,e||0,S||0,R||0,E||0)
};a5[ba].path=function(e){e&&!av.is(e,"string")&&!av.is(e[0],"array")&&(e+=aB);return t(av.format[a8](av,arguments),this)
};a5[ba].image=function(S,e,bd,E,R){return q(this,S||"about:blank",e||0,bd||0,E||0,R||0)
};a5[ba].text=function(e,R,E){return ac(this,e||0,R||0,E||aB)};a5[ba].set=function(e){arguments[n]>1&&(e=Array[ba].splice.call(arguments,0,arguments[n]));
return new Y(e)};a5[ba].setSize=a7;a5[ba].top=a5[ba].bottom=null;a5[ba].raphael=av;
function y(){return this.x+au+this.y}aG[ba].scale=function(bk,bj,R,E){if(bk==null&&bj==null){return{x:this._.sx,y:this._.sy,toString:y}
}bj=bj||bk;!+bj&&(bj=bk);var bo,bm,bn,bl,bA=this.attrs;if(bk!=0){var bi=this.getBBox(),bf=bi.x+bi.width/2,S=bi.y+bi.height/2,bz=bk/this._.sx,by=bj/this._.sy;
R=(+R||R==0)?R:bf;E=(+E||E==0)?E:S;var bh=~~(bk/ag.abs(bk)),be=~~(bj/ag.abs(bj)),br=this.node.style,bC=R+(bf-R)*bz,bB=E+(S-E)*by;
switch(this.type){case"rect":case"image":var bg=bA.width*bh*bz,bq=bA.height*be*by;
this.attr({height:bq,r:bA.r*aS(bh*bz,be*by),width:bg,x:bC-bg/2,y:bB-bq/2});break;
case"circle":case"ellipse":this.attr({rx:bA.rx*bh*bz,ry:bA.ry*be*by,r:bA.r*aS(bh*bz,be*by),cx:bC,cy:bB});
break;case"path":var bt=ai(bA.path),bu=true;for(var bw=0,bp=bt[n];bw<bp;bw++){var bs=bt[bw],bd=aY.call(bs[0]);
if(bd=="M"&&bu){continue}else{bu=false}if(bd=="A"){bs[bt[bw][n]-2]*=bz;bs[bt[bw][n]-1]*=by;
bs[1]*=bh*bz;bs[2]*=be*by;bs[5]=+!(bh+be?!+bs[5]:+bs[5])}else{if(bd=="H"){for(var bv=1,bx=bs[n];
bv<bx;bv++){bs[bv]*=bz}}else{if(bd=="V"){for(bv=1,bx=bs[n];bv<bx;bv++){bs[bv]*=by
}}else{for(bv=1,bx=bs[n];bv<bx;bv++){bs[bv]*=(bv%2)?bz:by}}}}}var e=Z(bt);bo=bC-e.x-e.width/2;
bm=bB-e.y-e.height/2;bt[0][1]+=bo;bt[0][2]+=bm;this.attr({path:bt});break}if(this.type in {text:1,image:1}&&(bh!=1||be!=1)){if(this.transformations){this.transformations[2]="scale("[a3](bh,",",be,")");
this.node[z]("transform",this.transformations[aI](au));bo=(bh==-1)?-bA.x-(bg||0):bA.x;
bm=(be==-1)?-bA.y-(bq||0):bA.y;this.attr({x:bo,y:bm});bA.fx=bh-1;bA.fy=be-1}else{this.node.filterMatrix=" progid:DXImageTransform.Microsoft.Matrix(M11="[a3](bh,", M12=0, M21=0, M22=",be,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
br.filter=(this.node.filterMatrix||aB)+(this.node.filterOpacity||aB)}}else{if(this.transformations){this.transformations[2]=aB;
this.node[z]("transform",this.transformations[aI](au));bA.fx=0;bA.fy=0}else{this.node.filterMatrix=aB;
br.filter=(this.node.filterMatrix||aB)+(this.node.filterOpacity||aB)}}bA.scale=[bk,bj,R,E][aI](au);
this._.sx=bk;this._.sy=bj}return this};aG[ba].clone=function(){var e=this.attr();
delete e.scale;delete e.translation;return this.paper[this.type]().attr(e)};var g=ao(function(R,e,bf,be,bl,bk,bj,bi,S){var bh=0,bd;
for(var bg=0;bg<1.001;bg+=0.001){var E=av.findDotsAtSegment(R,e,bf,be,bl,bk,bj,bi,bg);
bg&&(bh+=aW(aW(bd.x-E.x,2)+aW(bd.y-E.y,2),0.5));if(bh>=S){return E}bd=E}}),aL=function(e,E){return function(bn,bd,be){bn=M(bn);
var bj,bi,R,bf,S="",bm={},bk,bh=0;for(var bg=0,bl=bn.length;bg<bl;bg++){R=bn[bg];
if(R[0]=="M"){bj=+R[1];bi=+R[2]}else{bf=o(bj,bi,R[1],R[2],R[3],R[4],R[5],R[6]);if(bh+bf>bd){if(E&&!bm.start){bk=g(bj,bi,R[1],R[2],R[3],R[4],R[5],R[6],bd-bh);
S+=["C",bk.start.x,bk.start.y,bk.m.x,bk.m.y,bk.x,bk.y];if(be){return S}bm.start=S;
S=["M",bk.x,bk.y+"C",bk.n.x,bk.n.y,bk.end.x,bk.end.y,R[5],R[6]][aI]();bh+=bf;bj=+R[5];
bi=+R[6];continue}if(!e&&!E){bk=g(bj,bi,R[1],R[2],R[3],R[4],R[5],R[6],bd-bh);return{x:bk.x,y:bk.y,alpha:bk.alpha}
}}bh+=bf;bj=+R[5];bi=+R[6]}S+=R}bm.end=S;bk=e?bh:E?bm:av.findDotsAtSegment(bj,bi,R[1],R[2],R[3],R[4],R[5],R[6],1);
bk.alpha&&(bk={x:bk.x,y:bk.y,alpha:bk.alpha});return bk}},o=ao(function(R,e,be,bd,bk,bj,bi,bh){var S={x:0,y:0},bg=0;
for(var bf=0;bf<1.01;bf+=0.01){var E=U(R,e,be,bd,bk,bj,bi,bh,bf);bf&&(bg+=aW(aW(S.x-E.x,2)+aW(S.y-E.y,2),0.5));
S=E}return bg});var ax=aL(1),H=aL(),O=aL(0,1);aG[ba].getTotalLength=function(){if(this.type!="path"){return
}return ax(this.attrs.path)};aG[ba].getPointAtLength=function(e){if(this.type!="path"){return
}return H(this.attrs.path,e)};aG[ba].getSubpath=function(R,E){if(this.type!="path"){return
}if(ag.abs(this.getTotalLength()-E)<0.000001){return O(this.attrs.path,R).end}var e=O(this.attrs.path,E,1);
return R?O(e,R).end:e};av.easing_formulas={linear:function(e){return e},"<":function(e){return aW(e,3)
},">":function(e){return aW(e-1,3)+1},"<>":function(e){e=e*2;if(e<1){return aW(e,3)/2
}e-=2;return(aW(e,3)+2)/2},backIn:function(E){var e=1.70158;return E*E*((e+1)*E-e)
},backOut:function(E){E=E-1;var e=1.70158;return E*E*((e+1)*E+e)+1},elastic:function(R){if(R==0||R==1){return R
}var E=0.3,e=E/4;return aW(2,-10*R)*ag.sin((R-e)*(2*ag.PI)/E)+1},bounce:function(S){var E=7.5625,R=2.75,e;
if(S<(1/R)){e=E*S*S}else{if(S<(2/R)){S-=(1.5/R);e=E*S*S+0.75}else{if(S<(2.5/R)){S-=(2.25/R);
e=E*S*S+0.9375}else{S-=(2.625/R);e=E*S*S+0.984375}}}return e}};var N={length:0},a2=function(){var bg=+new Date;
for(var bs in N){if(bs!="length"&&N[X](bs)){var bx=N[bs];if(bx.stop||bx.el.removed){delete N[bs];
N[n]--;continue}var be=bg-bx.start,bp=bx.ms,bo=bx.easing,bt=bx.from,bl=bx.diff,R=bx.to,bk=bx.t,bn=bx.prev||0,bf=bx.el,S=bx.callback,bm={},E;
if(be<bp){var bd=av.easing_formulas[bo]?av.easing_formulas[bo](be/bp):be/bp;for(var bq in bt){if(bt[X](bq)){switch(ae[bq]){case"along":E=bd*bp*bl[bq];
R.back&&(E=R.len-E);var br=H(R[bq],E);bf.translate(bl.sx-bl.x||0,bl.sy-bl.y||0);bl.x=br.x;
bl.y=br.y;bf.translate(br.x-bl.sx,br.y-bl.sy);R.rot&&bf.rotate(bl.r+br.alpha,br.x,br.y);
break;case"number":E=+bt[bq]+bd*bp*bl[bq];break;case"colour":E="rgb("+[G(V(bt[bq].r+bd*bp*bl[bq].r)),G(V(bt[bq].g+bd*bp*bl[bq].g)),G(V(bt[bq].b+bd*bp*bl[bq].b))][aI](",")+")";
break;case"path":E=[];for(var bv=0,bj=bt[bq][n];bv<bj;bv++){E[bv]=[bt[bq][bv][0]];
for(var bu=1,bw=bt[bq][bv][n];bu<bw;bu++){E[bv][bu]=+bt[bq][bv][bu]+bd*bp*bl[bq][bv][bu]
}E[bv]=E[bv][aI](au)}E=E[aI](au);break;case"csv":switch(bq){case"translation":var bi=bl[bq][0]*(be-bn),bh=bl[bq][1]*(be-bn);
bk.x+=bi;bk.y+=bh;E=bi+au+bh;break;case"rotation":E=+bt[bq][0]+bd*bp*bl[bq][0];bt[bq][1]&&(E+=","+bt[bq][1]+","+bt[bq][2]);
break;case"scale":E=[+bt[bq][0]+bd*bp*bl[bq][0],+bt[bq][1]+bd*bp*bl[bq][1],(2 in R[bq]?R[bq][2]:aB),(3 in R[bq]?R[bq][3]:aB)][aI](au);
break;case"clip-rect":E=[];bv=4;while(bv--){E[bv]=+bt[bq][bv]+bd*bp*bl[bq][bv]}break
}break}bm[bq]=E}}bf.attr(bm);bf._run&&bf._run.call(bf)}else{if(R.along){br=H(R.along,R.len*!R.back);
bf.translate(bl.sx-(bl.x||0)+br.x-bl.sx,bl.sy-(bl.y||0)+br.y-bl.sy);R.rot&&bf.rotate(bl.r+br.alpha,br.x,br.y)
}(bk.x||bk.y)&&bf.translate(-bk.x,-bk.y);R.scale&&(R.scale=R.scale+aB);bf.attr(R);
delete N[bs];N[n]--;bf.in_animation=null;av.is(S,"function")&&S.call(bf)}bx.prev=be
}}av.svg&&bf&&bf.paper.safari();N[n]&&aC.setTimeout(a2)},G=function(e){return e>255?255:(e<0?0:e)
},w=function(e,R){if(e==null){return{x:this._.tx,y:this._.ty,toString:y}}this._.tx+=+e;
this._.ty+=+R;switch(this.type){case"circle":case"ellipse":this.attr({cx:+e+this.attrs.cx,cy:+R+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+e+this.attrs.x,y:+R+this.attrs.y});
break;case"path":var E=ai(this.attrs.path);E[0][1]+=+e;E[0][2]+=+R;this.attr({path:E});
break}return this};aG[ba].animateWith=function(E,R,e,bd,S){N[E.id]&&(R.start=N[E.id].start);
return this.animate(R,e,bd,S)};aG[ba].animateAlong=aH();aG[ba].animateAlongBack=aH(1);
function aH(e){return function(S,R,E,be){var bd={back:e};av.is(E,"function")?(be=E):(bd.rot=E);
S&&S.constructor==aG&&(S=S.attrs.path);S&&(bd.along=S);return this.animate(bd,R,be)
}}aG[ba].onAnimation=function(e){this._run=e||0;return this};aG[ba].animate=function(bs,bj,bi,R){if(av.is(bi,"function")||!bi){R=bi||null
}var bn={},E={},bg={};for(var bk in bs){if(bs[X](bk)){if(ae[X](bk)){bn[bk]=this.attr(bk);
(bn[bk]==null)&&(bn[bk]=k[bk]);E[bk]=bs[bk];switch(ae[bk]){case"along":var bq=ax(bs[bk]),bl=H(bs[bk],bq*!!bs.back),S=this.getBBox();
bg[bk]=bq/bj;bg.tx=S.x;bg.ty=S.y;bg.sx=bl.x;bg.sy=bl.y;E.rot=bs.rot;E.back=bs.back;
E.len=bq;bs.rot&&(bg.r=ab(this.rotate())||0);break;case"number":bg[bk]=(E[bk]-bn[bk])/bj;
break;case"colour":bn[bk]=av.getRGB(bn[bk]);var bm=av.getRGB(E[bk]);bg[bk]={r:(bm.r-bn[bk].r)/bj,g:(bm.g-bn[bk].g)/bj,b:(bm.b-bn[bk].b)/bj};
break;case"path":var bd=M(bn[bk],E[bk]);bn[bk]=bd[0];var bh=bd[1];bg[bk]=[];for(var bp=0,bf=bn[bk][n];
bp<bf;bp++){bg[bk][bp]=[0];for(var bo=1,br=bn[bk][bp][n];bo<br;bo++){bg[bk][bp][bo]=(bh[bp][bo]-bn[bk][bp][bo])/bj
}}break;case"csv":var e=(bs[bk]+aB)[D](a),be=(bn[bk]+aB)[D](a);switch(bk){case"translation":bn[bk]=[0,0];
bg[bk]=[e[0]/bj,e[1]/bj];break;case"rotation":bn[bk]=(be[1]==e[1]&&be[2]==e[2])?be:[0,e[1],e[2]];
bg[bk]=[(e[0]-bn[bk][0])/bj,0,0];break;case"scale":bs[bk]=e;bn[bk]=(bn[bk]+aB)[D](a);
bg[bk]=[(e[0]-bn[bk][0])/bj,(e[1]-bn[bk][1])/bj,0,0];break;case"clip-rect":bn[bk]=(bn[bk]+aB)[D](a);
bg[bk]=[];bp=4;while(bp--){bg[bk][bp]=(e[bp]-bn[bk][bp])/bj}break}E[bk]=e}}}}this.stop();
this.in_animation=1;N[this.id]={start:bs.start||+new Date,ms:bj,easing:bi,from:bn,diff:bg,to:E,el:this,callback:R,t:{x:0,y:0}};
++N[n]==1&&a2();return this};aG[ba].stop=function(){N[this.id]&&N[n]--;delete N[this.id];
return this};aG[ba].translate=function(e,E){return this.attr({translation:e+" "+E})
};aG[ba][aK]=function(){return"Rapha\xebl\u2019s object"};av.ae=N;var Y=function(e){this.items=[];
this[n]=0;if(e){for(var E=0,R=e[n];E<R;E++){if(e[E]&&(e[E].constructor==aG||e[E].constructor==Y)){this[this.items[n]]=this.items[this.items[n]]=e[E];
this[n]++}}}};Y[ba][f]=function(){var S,e;for(var E=0,R=arguments[n];E<R;E++){S=arguments[E];
if(S&&(S.constructor==aG||S.constructor==Y)){e=this.items[n];this[e]=this.items[e]=S;
this[n]++}}return this};Y[ba].pop=function(){delete this[this[n]--];return this.items.pop()
};for(var C in aG[ba]){if(aG[ba][X](C)){Y[ba][C]=(function(e){return function(){for(var E=0,R=this.items[n];
E<R;E++){this.items[E][e][a8](this.items[E],arguments)}return this}})(C)}}Y[ba].attr=function(E,be){if(E&&av.is(E,"array")&&av.is(E[0],"object")){for(var e=0,bd=E[n];
e<bd;e++){this.items[e].attr(E[e])}}else{for(var R=0,S=this.items[n];R<S;R++){this.items[R].attr(E,be)
}}return this};Y[ba].animate=function(bd,E,bg,bf){(av.is(bg,"function")||!bg)&&(bf=bg||null);
var e=this.items[n],R=e,be=this,S;bf&&(S=function(){!--e&&bf.call(be)});this.items[--R].animate(bd,E,bg||S,S);
while(R--){this.items[R].animateWith(this.items[e-1],bd,E,bg||S,S)}return this};Y[ba].insertAfter=function(E){var e=this.items[n];
while(e--){this.items[e].insertAfter(E)}return this};Y[ba].getBBox=function(){var e=[],be=[],E=[],S=[];
for(var R=this.items[n];R--;){var bd=this.items[R].getBBox();e[f](bd.x);be[f](bd.y);
E[f](bd.x+bd.width);S[f](bd.y+bd.height)}e=aS[a8](0,e);be=aS[a8](0,be);return{x:e,y:be,width:h[a8](0,E)-e,height:h[a8](0,S)-be}
};Y[ba].clone=function(R){R=new Y;for(var e=0,E=this.items[n];e<E;e++){R[f](this.items[e].clone())
}return R};av.registerFont=function(E){if(!E.face){return E}this.fonts=this.fonts||{};
var S={w:E.w,face:{},glyphs:{}},R=E.face["font-family"];for(var bf in E.face){if(E.face[X](bf)){S.face[bf]=E.face[bf]
}}if(this.fonts[R]){this.fonts[R][f](S)}else{this.fonts[R]=[S]}if(!E.svg){S.face["units-per-em"]=L(E.face["units-per-em"],10);
for(var bd in E.glyphs){if(E.glyphs[X](bd)){var be=E.glyphs[bd];S.glyphs[bd]={w:be.w,k:{},d:be.d&&"M"+be.d[a0](/[mlcxtrv]/g,function(bg){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bg]||"M"
})+"z"};if(be.k){for(var e in be.k){if(be[X](e)){S.glyphs[bd].k[e]=be.k[e]}}}}}}return E
};a5[ba].getFont=function(bg,bh,E,S){S=S||"normal";E=E||"normal";bh=+bh||{normal:400,bold:700,lighter:300,bolder:800}[bh]||400;
var bd=av.fonts[bg];if(!bd){var R=new RegExp("(^|\\s)"+bg[a0](/[^\w\d\s+!~.:_-]/g,aB)+"(\\s|$)","i");
for(var e in av.fonts){if(av.fonts[X](e)){if(R.test(e)){bd=av.fonts[e];break}}}}var be;
if(bd){for(var bf=0,bi=bd[n];bf<bi;bf++){be=bd[bf];if(be.face["font-weight"]==bh&&(be.face["font-style"]==E||!be.face["font-style"])&&be.face["font-stretch"]==S){break
}}}return be};a5[ba].print=function(S,R,e,bf,bg,bp){bp=bp||"middle";var bl=this.set(),bo=(e+aB)[D](aB),bm=0,bi=aB,bq;
av.is(bf,"string")&&(bf=this.getFont(bf));if(bf){bq=(bg||16)/bf.face["units-per-em"];
var E=bf.face.bbox.split(a),be=+E[0],bh=+E[1]+(bp=="baseline"?E[3]-E[1]+(+bf.face.descent):(E[3]-E[1])/2);
for(var bk=0,bd=bo[n];bk<bd;bk++){var bj=bk&&bf.glyphs[bo[bk-1]]||{},bn=bf.glyphs[bo[bk]];
bm+=bk?(bj.w||bf.w)+(bj.k&&bj.k[bo[bk]]||0):0;bn&&bn.d&&bl[f](this.path(bn.d).attr({fill:"#000",stroke:"none",translation:[bm,0]}))
}bl.scale(bq,bq,be,bh).translate(S-be,R-bh)}return bl};var aX=/\{(\d+)\}/g;av.format=function(E,R){var e=av.is(R,"array")?[0][a3](R):arguments;
E&&av.is(E,"string")&&e[n]-1&&(E=E[a0](aX,function(bd,S){return e[++S]==null?aB:e[S]
}));return E||aB};av.ninja=function(){m.was?(Raphael=m.is):delete Raphael;return av
};av.el=aG[ba];return av})();(function(){Raphael.fn.g=Raphael.fn.g||{};Raphael.fn.g.markers={disc:"disc",o:"disc",flower:"flower",f:"flower",diamond:"diamond",d:"diamond",square:"square",s:"square",triangle:"triangle",t:"triangle",star:"star","*":"star",cross:"cross",x:"cross",plus:"plus","+":"plus",arrow:"arrow","->":"arrow"};
Raphael.fn.g.shim={stroke:"none",fill:"#000","fill-opacity":0};Raphael.fn.g.txtattr={font:"12px Arial, sans-serif"};
Raphael.fn.g.colors=[];var b=[0.6,0.2,0.05,0.1333,0.75,0];for(var a=0;a<10;a++){if(a<b.length){Raphael.fn.g.colors.push("hsb("+b[a]+", .75, .75)")
}else{Raphael.fn.g.colors.push("hsb("+b[a-b.length]+", 1, .5)")}}Raphael.fn.g.text=function(c,f,e){return this.text(c,f,e).attr(this.g.txtattr)
};Raphael.fn.g.labelise=function(c,f,e){if(c){return(c+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(g,j,h){if(j){return(+f).toFixed(j.replace(/^#+\.?/g,"").length)
}if(h){return(f*100/e).toFixed(h.replace(/^%+\.?/g,"").length)+"%"}})}else{return(+f).toFixed(0)
}};Raphael.fn.g.finger=function(k,j,e,l,f,g,h){if((f&&!l)||(!f&&!e)){return h?"":this.path()
}g={square:"square",sharp:"sharp",soft:"soft"}[g]||"round";var n;l=Math.round(l);
e=Math.round(e);k=Math.round(k);j=Math.round(j);switch(g){case"round":if(!f){var c=Math.floor(l/2);
if(e<c){c=e;n=["M",k+0.5,j+0.5-Math.floor(l/2),"l",0,0,"a",c,Math.floor(l/2),0,0,1,0,l,"l",0,0,"z"]
}else{n=["M",k+0.5,j+0.5-c,"l",e-c,0,"a",c,c,0,1,1,0,l,"l",c-e,0,"z"]}}else{var c=Math.floor(e/2);
if(l<c){c=l;n=["M",k-Math.floor(e/2),j,"l",0,0,"a",Math.floor(e/2),c,0,0,1,e,0,"l",0,0,"z"]
}else{n=["M",k-c,j,"l",0,c-l,"a",c,c,0,1,1,e,0,"l",0,l-c,"z"]}}break;case"sharp":if(!f){var m=Math.floor(l/2);
n=["M",k,j+m,"l",0,-l,Math.max(e-m,0),0,Math.min(m,e),m,-Math.min(m,e),m+(m*2<l),"z"]
}else{var m=Math.floor(e/2);n=["M",k+m,j,"l",-e,0,0,-Math.max(l-m,0),m,-Math.min(m,l),m,Math.min(m,l),m,"z"]
}break;case"square":if(!f){n=["M",k,j+Math.floor(l/2),"l",0,-l,e,0,0,l,"z"]}else{n=["M",k+Math.floor(e/2),j,"l",1-e,0,0,-l,e-1,0,"z"]
}break;case"soft":var c;if(!f){c=Math.min(e,Math.round(l/5));n=["M",k+0.5,j+0.5-Math.floor(l/2),"l",e-c,0,"a",c,c,0,0,1,c,c,"l",0,l-c*2,"a",c,c,0,0,1,-c,c,"l",c-e,0,"z"]
}else{c=Math.min(Math.round(e/5),l);n=["M",k-Math.floor(e/2),j,"l",0,c-l,"a",c,c,0,0,1,c,-c,"l",e-2*c,0,"a",c,c,0,0,1,c,c,"l",0,l-c,"z"]
}}if(h){return n.join(",")}else{return this.path(n)}};Raphael.fn.g.disc=function(c,f,e){return this.circle(c,f,e)
};Raphael.fn.g.line=function(c,f,e){return this.rect(c-e,f-e/5,2*e,2*e/5)};Raphael.fn.g.square=function(c,f,e){e=e*0.7;
return this.rect(c-e,f-e,2*e,2*e)};Raphael.fn.g.triangle=function(c,f,e){e*=1.75;
return this.path("M".concat(c,",",f,"m0-",e*0.58,"l",e*0.5,",",e*0.87,"-",e,",0z"))
};Raphael.fn.g.diamond=function(c,f,e){return this.path(["M",c,f-e,"l",e,e,-e,e,-e,-e,e,-e,"z"])
};Raphael.fn.g.flower=function(g,f,c,e){c=c*1.25;var l=c,k=l*0.5;e=+e<3||!e?5:e;var m=["M",g,f+k,"Q"],j;
for(var h=1;h<e*2+1;h++){j=h%2?l:k;m=m.concat([+(g+j*Math.sin(h*Math.PI/e)).toFixed(3),+(f+j*Math.cos(h*Math.PI/e)).toFixed(3)])
}m.push("z");return this.path(m.join(","))};Raphael.fn.g.star=function(c,k,j,e){e=e||j*0.5;
var h=["M",c,k+e,"L"],g;for(var f=1;f<10;f++){g=f%2?j:e;h=h.concat([(c+g*Math.sin(f*Math.PI*0.2)).toFixed(3),(k+g*Math.cos(f*Math.PI*0.2)).toFixed(3)])
}h.push("z");return this.path(h.join(","))};Raphael.fn.g.cross=function(c,f,e){e=e/2.5;
return this.path("M".concat(c-e,",",f,"l",[-e,-e,e,-e,e,e,e,-e,e,e,-e,e,e,e,-e,e,-e,-e,-e,e,-e,-e,"z"]))
};Raphael.fn.g.plus=function(c,f,e){e=e/2;return this.path("M".concat(c-e/2,",",f-e/2,"l",[0,-e,e,0,0,e,e,0,0,e,-e,0,0,e,-e,0,0,-e,-e,0,0,-e,"z"]))
};Raphael.fn.g.arrow=function(c,f,e){return this.path("M".concat(c-e*0.7,",",f-e*0.4,"l",[e*0.6,0,0,-e*0.4,e,e*0.8,-e,e*0.8,0,-e*0.4,-e*0.6,0],"z"))
};Raphael.fn.g.tag=function(c,l,k,j,g){j=j||0;g=g==null?5:g;k=k==null?"$9.99":k;var f=0.5522*g,e=this.set(),h=3;
e.push(this.path().attr({fill:"#000",stroke:"none"}));e.push(this.text(c,l,k).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){this.rotate(0,c,l);var n=this[1].getBBox();if(n.height>=g*2){this[0].attr({path:["M",c,l+g,"a",g,g,0,1,1,0,-g*2,g,g,0,1,1,0,g*2,"m",0,-g*2-h,"a",g+h,g+h,0,1,0,0,(g+h)*2,"L",c+g+h,l+n.height/2+h,"l",n.width+2*h,0,0,-n.height-2*h,-n.width-2*h,0,"L",c,l-g-h].join(",")})
}else{var m=Math.sqrt(Math.pow(g+h,2)-Math.pow(n.height/2+h,2));this[0].attr({path:["M",c,l+g,"c",-f,0,-g,f-g,-g,-g,0,-f,g-f,-g,g,-g,f,0,g,g-f,g,g,0,f,f-g,g,-g,g,"M",c+m,l-n.height/2-h,"a",g+h,g+h,0,1,0,0,n.height+2*h,"l",g+h-m+n.width+2*h,0,0,-n.height-2*h,"L",c+m,l-n.height/2-h].join(",")})
}this[1].attr({x:c+g+h+n.width/2,y:l});j=(360-j)%360;this.rotate(j,c,l);j>90&&j<270&&this[1].attr({x:c-g-h-n.width/2,y:l,rotation:[180+j,c,l]});
return this};e.update();return e};Raphael.fn.g.popupit=function(k,j,l,e,s){e=e==null?2:e;
s=s||5;k=Math.round(k)+0.5;j=Math.round(j)+0.5;var g=l.getBBox(),m=Math.round(g.width/2),f=Math.round(g.height/2),q=[0,m+s*2,0,-m-s*2],n=[-f*2-s*3,-f-s,0,-f-s],c=["M",k-q[e],j-n[e],"l",-s,(e==2)*-s,-Math.max(m-s,0),0,"a",s,s,0,0,1,-s,-s,"l",0,-Math.max(f-s,0),(e==3)*-s,-s,(e==3)*s,-s,0,-Math.max(f-s,0),"a",s,s,0,0,1,s,-s,"l",Math.max(m-s,0),0,s,!e*-s,s,!e*s,Math.max(m-s,0),0,"a",s,s,0,0,1,s,s,"l",0,Math.max(f-s,0),(e==1)*s,s,(e==1)*-s,s,0,Math.max(f-s,0),"a",s,s,0,0,1,-s,s,"l",-Math.max(m-s,0),0,"z"].join(","),o=[{x:k,y:j+s*2+f},{x:k-s*2-m,y:j},{x:k,y:j-s*2-f},{x:k+s*2+m,y:j}][e];
l.translate(o.x-m-g.x,o.y-f-g.y);return this.path(c).attr({fill:"#000",stroke:"none"}).insertBefore(l.node?l:l[0])
};Raphael.fn.g.popup=function(c,k,j,e,g){e=e==null?2:e;g=g||5;j=j||"$9.99";var f=this.set(),h=3;
f.push(this.path().attr({fill:"#000",stroke:"none"}));f.push(this.text(c,k,j).attr(this.g.txtattr).attr({fill:"#fff"}));
f.update=function(n,m,o){n=n||c;m=m||k;var s=this[1].getBBox(),t=s.width/2,q=s.height/2,x=[0,t+g*2,0,-t-g*2],u=[-q*2-g*3,-q-g,0,-q-g],l=["M",n-x[e],m-u[e],"l",-g,(e==2)*-g,-Math.max(t-g,0),0,"a",g,g,0,0,1,-g,-g,"l",0,-Math.max(q-g,0),(e==3)*-g,-g,(e==3)*g,-g,0,-Math.max(q-g,0),"a",g,g,0,0,1,g,-g,"l",Math.max(t-g,0),0,g,!e*-g,g,!e*g,Math.max(t-g,0),0,"a",g,g,0,0,1,g,g,"l",0,Math.max(q-g,0),(e==1)*g,g,(e==1)*-g,g,0,Math.max(q-g,0),"a",g,g,0,0,1,-g,g,"l",-Math.max(t-g,0),0,"z"].join(","),v=[{x:n,y:m+g*2+q},{x:n-g*2-t,y:m},{x:n,y:m-g*2-q},{x:n+g*2+t,y:m}][e];
if(o){this[0].animate({path:l},500,">");this[1].animate(v,500,">")}else{this[0].attr({path:l});
this[1].attr(v)}return this};return f.update(c,k)};Raphael.fn.g.flag=function(c,j,h,g){g=g||0;
h=h||"$9.99";var e=this.set(),f=3;e.push(this.path().attr({fill:"#000",stroke:"none"}));
e.push(this.text(c,j,h).attr(this.g.txtattr).attr({fill:"#fff"}));e.update=function(k,n){this.rotate(0,k,n);
var m=this[1].getBBox(),l=m.height/2;this[0].attr({path:["M",k,n,"l",l+f,-l-f,m.width+2*f,0,0,m.height+2*f,-m.width-2*f,0,"z"].join(",")});
this[1].attr({x:k+l+f+m.width/2,y:n});g=360-g;this.rotate(g,k,n);g>90&&g<270&&this[1].attr({x:k-r-f-m.width/2,y:n,rotation:[180+g,k,n]});
return this};return e.update(c,j)};Raphael.fn.g.label=function(c,g,f){var e=this.set();
e.push(this.rect(c,g,10,10).attr({stroke:"none",fill:"#000"}));e.push(this.text(c,g,f).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){var j=this[1].getBBox(),h=Math.min(j.width+10,j.height+10)/2;
this[0].attr({x:j.x-h/2,y:j.y-h/2,width:j.width+h,height:j.height+h,r:h})};e.update();
return e};Raphael.fn.g.labelit=function(f){var e=f.getBBox(),c=Math.min(20,e.width+10,e.height+10)/2;
return this.rect(e.x-c/2,e.y-c/2,e.width+c,e.height+c,c).attr({stroke:"none",fill:"#000"}).insertBefore(f[0])
};Raphael.fn.g.drop=function(c,j,h,f,g){f=f||30;g=g||0;var e=this.set();e.push(this.path(["M",c,j,"l",f,0,"A",f*0.4,f*0.4,0,1,0,c+f*0.7,j-f*0.7,"z"]).attr({fill:"#000",stroke:"none",rotation:[22.5-g,c,j]}));
g=(g+90)*Math.PI/180;e.push(this.text(c+f*Math.sin(g),j+f*Math.cos(g),h).attr(this.g.txtattr).attr({"font-size":f*12/30,fill:"#fff"}));
e.drop=e[0];e.text=e[1];return e};Raphael.fn.g.blob=function(e,l,k,j,g){j=(+j+1?j:45)+90;
g=g||12;var c=Math.PI/180,h=g*12/12;var f=this.set();f.push(this.path().attr({fill:"#000",stroke:"none"}));
f.push(this.text(e+g*Math.sin((j)*c),l+g*Math.cos((j)*c)-h/2,k).attr(this.g.txtattr).attr({"font-size":h,fill:"#fff"}));
f.update=function(s,q,x){s=s||e;q=q||l;var z=this[1].getBBox(),C=Math.max(z.width+h,g*25/12),y=Math.max(z.height+h,g*25/12),n=s+g*Math.sin((j-22.5)*c),A=q+g*Math.cos((j-22.5)*c),p=s+g*Math.sin((j+22.5)*c),B=q+g*Math.cos((j+22.5)*c),E=(p-n)/2,D=(B-A)/2,o=C/2,m=y/2,v=-Math.sqrt(Math.abs(o*o*m*m-o*o*D*D-m*m*E*E)/(o*o*D*D+m*m*E*E)),u=v*o*D/m+(p+n)/2,t=v*-m*E/o+(B+A)/2;
if(x){this.animate({x:u,y:t,path:["M",e,l,"L",p,B,"A",o,m,0,1,1,n,A,"z"].join(",")},500,">")
}else{this.attr({x:u,y:t,path:["M",e,l,"L",p,B,"A",o,m,0,1,1,n,A,"z"].join(",")})
}return this};f.update(e,l);return f};Raphael.fn.g.colorValue=function(g,f,e,c){return"hsb("+[Math.min((1-g/f)*0.4,1),e||0.75,c||0.75]+")"
};Raphael.fn.g.snapEnds=function(l,m,k){var h=l,n=m;if(h==n){return{from:h,to:n,power:0}
}function o(f){return Math.abs(f-0.5)<0.25?Math.floor(f)+0.5:Math.round(f)}var j=(n-h)/k,c=Math.floor(j),g=c,e=0;
if(c){while(g){e--;g=Math.floor(j*Math.pow(10,e))/Math.pow(10,e)}e++}else{while(!c){e=e||1;
c=Math.floor(j*Math.pow(10,e))/Math.pow(10,e);e++}e&&e--}var n=o(m*Math.pow(10,e))/Math.pow(10,e);
if(n<m){n=o((m+0.5)*Math.pow(10,e))/Math.pow(10,e)}var h=o((l-(e>0?0:0.5))*Math.pow(10,e))/Math.pow(10,e);
return{from:h,to:n,power:e}};Raphael.fn.g.axis=function(s,q,m,E,h,H,k,J,l,c){c=c==null?2:c;
l=l||"t";H=H||10;var D=l=="|"||l==" "?["M",s+0.5,q,"l",0,0.001]:k==1||k==3?["M",s+0.5,q,"l",0,-m]:["M",s,q+0.5,"l",m,0],v=this.g.snapEnds(E,h,H),I=v.from,z=v.to,G=v.power,F=0,A=this.set();
d=(z-I)/H;var p=I,o=G>0?G:0;u=m/H;if(+k==1||+k==3){var e=q,w=(k-1?1:-1)*(c+3+!!(k-1));
while(e>=q-m){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),e+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,e,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}));
p+=d;e-=u}if(Math.round(e+u-(q-m))){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),q-m+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,q-m,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}))
}}else{var g=s,p=I,o=G>0?G:0,w=(k?-1:1)*(c+9+!k),u=m/H,B=0,C=0;while(g<=s+m){l!="-"&&l!=" "&&(D=D.concat(["M",g+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(B=this.text(g,q+w,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr));
var n=B.getBBox();if(C>=n.x-5){A.pop(A.length-1).remove()}else{C=n.x+n.width}p+=d;
g+=u}if(Math.round(g-u-s-m)){l!="-"&&l!=" "&&(D=D.concat(["M",s+m+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(this.text(s+m,q+w,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr))
}}var K=this.path(D);K.text=A;K.all=this.set([K,A]);K.remove=function(){this.text.remove();
this.constructor.prototype.remove.call(this)};return K};Raphael.el.lighter=function(e){e=e||2;
var c=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);
c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);c[0].b=Math.min(c[0].b*e,1);c[0].s=c[0].s/e;
c[1].b=Math.min(c[1].b*e,1);c[1].s=c[1].s/e;this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.darker=function(e){e=e||2;var c=[this.attrs.fill,this.attrs.stroke];
this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);
c[0].s=Math.min(c[0].s*e,1);c[0].b=c[0].b/e;c[1].s=Math.min(c[1].s*e,1);c[1].b=c[1].b/e;
this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.original=function(){if(this.fs){this.attr({fill:this.fs[0],stroke:this.fs[1]});
delete this.fs}}})();Raphael.fn.g.linechart=function(L,K,a,c,u,t,E){function D(X,ab){var y=X.length/ab,Y=0,x=y,aa=0,Z=[];
while(Y<X.length){x--;if(x<0){aa+=X[Y]*(1+x);Z.push(aa/y);aa=X[Y++]*-x;x+=y}else{aa+=X[Y++]
}}return Z}E=E||{};if(!this.raphael.is(u[0],"array")){u=[u]}if(!this.raphael.is(t[0],"array")){t=[t]
}var Q=Array.prototype.concat.apply([],u),O=Array.prototype.concat.apply([],t),p=this.g.snapEnds(Math.min.apply(Math,Q),Math.max.apply(Math,Q),u[0].length-1),z=p.from,k=p.to,m=E.gutter||10,R=(a-m*2)/(k-z),I=this.g.snapEnds(Math.min.apply(Math,O),Math.max.apply(Math,O),t[0].length-1),w=I.from,h=I.to,P=(c-m*2)/(h-w),v=Math.max(u[0].length,t[0].length),o=E.symbol||"",M=E.colors||Raphael.fn.g.colors,J=this,q=null,l=null,V=this.set(),N=[];
for(var U=0,G=t.length;U<G;U++){v=Math.max(v,t[U].length)}var W=this.set();for(var U=0,G=t.length;
U<G;U++){if(E.shade){W.push(this.path().attr({stroke:"none",fill:M[U],opacity:E.nostroke?1:0.3}))
}if(t[U].length>a-2*m){t[U]=D(t[U],a-2*m);v=a-2*m}if(u[U]&&u[U].length>a-2*m){u[U]=D(u[U],a-2*m)
}}var A=this.set();if(E.axis){var g=(E.axis+"").split(/[,\s]+/);+g[0]&&A.push(this.g.axis(L+m,K+m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),2));
+g[1]&&A.push(this.g.axis(L+a-m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),3));
+g[2]&&A.push(this.g.axis(L+m,K+c-m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),0));
+g[3]&&A.push(this.g.axis(L+m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),1))
}var H=this.set(),S=this.set(),n;for(var U=0,G=t.length;U<G;U++){if(!E.nostroke){H.push(n=this.path().attr({stroke:M[U],"stroke-width":E.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":E.dash||""}))
}var b=this.raphael.is(o,"array")?o[U]:o,B=this.set();N=[];for(var T=0,s=t[U].length;
T<s;T++){var f=L+m+((u[U]||u[0])[T]-z)*R;var e=K+c-m-(t[U][T]-w)*P;(Raphael.is(b,"array")?b[T]:b)&&B.push(this.g[Raphael.fn.g.markers[this.raphael.is(b,"array")?b[T]:b]](f,e,(E.width||2)*3).attr({fill:M[U],stroke:"none"}));
N=N.concat([T?"L":"M",f,e])}S.push(B);if(E.shade){W[U].attr({path:N.concat(["L",f,K+c-m,"L",L+m+((u[U]||u[0])[0]-z)*R,K+c-m,"z"]).join(",")})
}!E.nostroke&&n.attr({path:N.join(",")})}function F(ag){var ad=[];for(var ae=0,ai=u.length;
ae<ai;ae++){ad=ad.concat(u[ae])}ad.sort();var aj=[],aa=[];for(var ae=0,ai=ad.length;
ae<ai;ae++){ad[ae]!=ad[ae-1]&&aj.push(ad[ae])&&aa.push(L+m+(ad[ae]-z)*R)}ad=aj;ai=ad.length;
var Z=ag||J.set();for(var ae=0;ae<ai;ae++){var Y=aa[ae]-(aa[ae]-(aa[ae-1]||L))/2,ah=((aa[ae+1]||L+a)-aa[ae])/2+(aa[ae]-(aa[ae-1]||L))/2,x;
ag?(x={}):Z.push(x=J.rect(Y-1,K,Math.max(ah+1,1),c).attr({stroke:"none",fill:"#000",opacity:0}));
x.values=[];x.symbols=J.set();x.y=[];x.x=aa[ae];x.axis=ad[ae];for(var ac=0,af=t.length;
ac<af;ac++){aj=u[ac]||u[0];for(var ab=0,y=aj.length;ab<y;ab++){if(aj[ab]==ad[ae]){x.values.push(t[ac][ab]);
x.y.push(K+c-m-(t[ac][ab]-w)*P);x.symbols.push(V.symbols[ac][ab])}}}ag&&ag.call(x)
}!ag&&(q=Z)}function C(ae){var aa=ae||J.set(),x;for(var ac=0,ag=t.length;ac<ag;ac++){for(var ab=0,ad=t[ac].length;
ab<ad;ab++){var Z=L+m+((u[ac]||u[0])[ab]-z)*R,af=L+m+((u[ac]||u[0])[ab?ab-1:1]-z)*R,y=K+c-m-(t[ac][ab]-w)*P;
ae?(x={}):aa.push(x=J.circle(Z,y,Math.abs(af-Z)/2).attr({stroke:"none",fill:"#000",opacity:0}));
x.x=Z;x.y=y;x.value=t[ac][ab];x.line=V.lines[ac];x.shade=V.shades[ac];x.symbol=V.symbols[ac][ab];
x.symbols=V.symbols[ac];x.axis=(u[ac]||u[0])[ab];ae&&ae.call(x)}}!ae&&(l=aa)}V.push(H,W,S,A,q,l);
V.lines=H;V.shades=W;V.symbols=S;V.axis=A;V.hoverColumn=function(x,j){!q&&F();q.mouseover(x).mouseout(j);
return this};V.clickColumn=function(j){!q&&F();q.click(j);return this};V.hrefColumn=function(Y){var Z=J.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof Y=="object"){for(var j in Y){for(var y=0,X=q.length;
y<X;y++){if(q[y].axis==j){q[y].attr("href",Y[j])}}}}!q&&F();for(var y=0,X=Z.length;
y<X;y++){q[y]&&q[y].attr("href",Z[y])}return this};V.hover=function(x,j){!l&&C();
l.mouseover(x).mouseout(j);return this};V.click=function(j){!l&&C();l.click(j);return this
};V.each=function(j){C(j);return this};V.eachColumn=function(j){F(j);return this};
return V};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("raphael")
}SC.TableDelegate={isTableDelegate:YES,tableShouldResizeColumnTo:function(f,e,b){var c=e.get("minWidth")||0,a=e.get("maxWidth")||b;
b=Math.max(c,b);b=Math.min(a,b);return b},tableShouldResizeWidthTo:function(e,b){var c=e.get("minWidth")||0,a=e.get("maxWidth")||b;
b=Math.max(c,b);b=Math.min(a,b);return b}};SC.SORT_ASCENDING="ascending";SC.SORT_DESCENDING="descending";
SC.TableColumn=SC.Object.extend({key:null,title:null,width:100,minWidth:16,maxWidth:700,escapeHTML:NO,formatter:null,isVisible:YES,isFlexible:NO,isReorderable:YES,isSortable:YES,icon:null,tableHeader:null,sortState:null,tableContent:null});
sc_require("views/list");SC.TableRowView=SC.View.extend({classNames:["sc-table-row"],cells:[],acceptsFirstResponder:YES,tableView:null,init:function(){this._sctrv_handleChildren()
},columns:function(){return this.get("tableView").get("columns")}.property(),prepareContext:function(a,b){arguments.callee.base.apply(this,arguments);
a.setClass("sel",this.get("isSelected"))},render:function(b,c){var a=[];a.push((this.get("contentIndex")%2===0)?"even":"odd");
b.addClass(a);arguments.callee.base.apply(this,arguments)},renderChildViews:function(e,f){var c=this.get("cells"),b,a;
for(a=0;a<c.get("length");a++){b=c.objectAt(a);e=e.begin(b.get("tagName"));b.prepareContext(e,f);
e=e.end()}return e},layoutChildViews:function(){var c=this.get("cells"),e=this.get("columns"),b,g,a;
var j=0,f,h=this.get("tableView").get("rowHeight");for(a=0;a<c.get("length");a++){b=c.objectAt(a);
g=e.objectAt(a);f=g.get("width");b.adjust({left:j,width:f,height:h});j+=f;b.updateLayout()
}},_sctrv_layoutForChildAtColumnIndex:function(b){var c=this.get("columns"),f=this.get("tableView").get("rowHeight"),e={},g=0,a;
for(a=0;a<b;a++){g+=c.objectAt(a).get("width")}return{left:g,width:c.objectAt(b).get("width"),height:f}
},_sctrv_createTableCell:function(b,c){var a=SC.TableCellView.create({column:b,content:c});
return a},_sctrv_handleSelection:function(){this.displayDidChange()}.observes("isSelected"),_sctrv_handleChildren:function(){var h=this.get("content"),f=this.get("columns");
this.removeAllChildren();var g,e,j,c=[],b,a;for(a=0;a<f.get("length");a++){g=f.objectAt(a);
e=g.get("key");j=h?h.getPath(e):"";b=this._sctrv_createTableCell(g,j);c.push(b);this.appendChild(b)
}this.set("cells",c)}});sc_require("views/table");SC.TableHeaderView=SC.View.extend({classNames:["sc-table-header"],displayProperties:["sortState","isInDragMode"],acceptsFirstResponder:YES,isInDragMode:NO,hasHorizontalScroller:NO,hasVerticalScroller:NO,childViews:["dragModeView"],dragModeView:SC.ListView.design({isVisible:NO,layout:{left:0,right:0,bottom:0},init:function(){var a=this.get("parentView");
if(a){a.addObserver("isInDragMode",this,"_scthv_dragModeDidChange")}},_scthv_dragModeDidChange:function(){}}),column:null,render:function(b,g){var f=this.get("column"),e=f.get("icon"),a;
var c=b.begin("span");if(e){a='<img src="%@" class="icon" />'.fmt(e);c.push(a)}else{c.push(this.get("label"))
}c.end()},init:function(){var a=this.get("column");a.addObserver("width",this,"_scthv_layoutDidChange");
a.addObserver("maxWidth",this,"_scthv_layoutDidChange");a.addObserver("minWidth",this,"_scthv_layoutDidChange");
a.addObserver("sortState",this,"_scthv_sortStateDidChange");a.addObserver("tableContent",this,"_scthv_tableContentDidChange");
return arguments.callee.base.apply(this,arguments)},sortState:function(){return this.get("column").get("sortState")
}.property(),mouseDown:function(b){var a=this.get("tableView");return a?a.mouseDownInTableHeaderView(b,this):arguments.callee.base.apply(this,arguments)
},mouseUp:function(b){var a=this.get("tableView");return a?a.mouseUpInTableHeaderView(b,this):arguments.callee.base.apply(this,arguments)
},mouseDragged:function(b){var a=this.get("tableView");return a?a.mouseDraggedInTableHeaderView(b,this):arguments.callee.base.apply(this,arguments)
},_scthv_dragViewForHeader:function(){var b=this.get("layer").cloneNode(true);var a=SC.View.create({layer:b,parentView:this});
SC.$(b).css("backgroundColor","transparent").css("border","none").css("top",0).css("left",0);
return a},_scthv_enterDragMode:function(){this.set("isInDragMode",YES)},_scthv_exitDragMode:function(){this.set("isInDragMode",NO)
},_scthv_dragModeViewDidChange:function(){var a=this.get("dragModeView");if(a&&a.set){a.set("tableHeadView",this);
a.set("tableView",this.get("tableView"))}}.observes("dragModeView"),_scthv_layoutDidChange:function(c,b,g,a){var f=this.get("parentView");
f.invokeOnce(f.layoutChildViews);var e=this.get("layout")},_scthv_tableContentDidChange:function(){var b=this.get("column").get("tableContent");
var a=this.get("parentView")._scthv_columnContentFromTableContent(b,this.get("columnIndex"));
this.set("content",a)},_scthv_sortStateDidChange:function(){SC.RunLoop.begin();var a=this.get("column").get("sortState");
var b=this.get("classNames");b.removeObject("sc-table-header-sort-asc");b.removeObject("sc-table-header-sort-desc");
b.removeObject("sc-table-header-sort-active");if(a!==null){b.push("sc-table-header-sort-active")
}if(a===SC.SORT_ASCENDING){b.push("sc-table-header-sort-asc")}if(a===SC.SORT_DESCENDING){b.push("sc-table-header-sort-desc")
}this.displayDidChange();this.invokeOnce("updateLayer");SC.RunLoop.end()}});sc_require("views/table");
sc_require("views/table_header");SC.TableHeadView=SC.View.extend({layout:{height:18,left:0,right:0,top:0},classNames:["sc-table-head"],cells:[],acceptsFirstResponder:YES,dragOrder:null,init:function(){this._scthv_handleChildren()
},columns:function(){return this.get("parentView").get("columns")}.property(),renderChildViews:function(e,f){var c=this.get("cells"),b,a;
for(a=0;a<c.get("length");a++){b=c.objectAt(a);e=e.begin(b.get("tagName"));b.prepareContext(e,f);
e=e.end()}return e},layoutChildViews:function(){var c=this.get("cells"),b,a;for(a=0;
a<c.get("length");a++){b=c.objectAt(a);b.adjust(this._scthv_layoutForHeaderAtColumnIndex(a));
b.updateLayout()}},_scthv_enterDragMode:function(){var b=[],c=this.get("columns"),a;
for(a=0;a<c.get("length");a++){b.push(c.objectAt(a).get("key"))}this.set("dragOrder",b)
},_scthv_changeDragOrder:function(c,e){var b=this.get("dragOrder"),a=b.objectAt(c);
b.removeAt(idx);b.insertAt(e,a)},_scthv_reorderDragColumnViews:function(){}.observes("dragOrder"),_scthv_columnContentFromTableContent:function(e,h){var g=this.get("columns").objectAt(h),f=g.get("key"),c=[],b;
if(!e){return c}var a=this.get("parentView"),j=e.get("length");for(b=0;b<j;b++){c.push(e.objectAt(b).get(f))
}return c},_scthv_layoutForHeaderAtColumnIndex:function(b){var c=this.get("columns"),f=this.get("parentView").get("rowHeight"),e={},g=0,a;
for(a=0;a<b;a++){g+=c.objectAt(a).get("width")}return{left:g,width:c.objectAt(b).get("width"),height:f}
},_scthv_handleChildren:function(){var b=this.get("columns");var e=this.get("parentView");
var c=e.get("content");var a,k,g,f,l=[],j,h;for(h=0;h<b.get("length");h++){a=b.objectAt(h);
k=a.get("key");g=a.get("label");f=this._scthv_columnContentFromTableContent(c,h);
j=this._scthv_createTableHeader(a,g,f,h);l.push(j)}this.set("cells",l);if(l.length>0){this.replaceAllChildren(l)
}},_scthv_createTableHeader:function(f,e,g,c){var b=this.get("parentView");var a=SC.TableHeaderView.create({column:f,label:e,content:g,tableView:b,columnIndex:c});
return a}});sc_require("views/list");sc_require("views/table_row");sc_require("views/table_head");
sc_require("mixins/table_delegate");SC.TableView=SC.ListView.extend(SC.TableDelegate,{classNames:["sc-table-view"],childViews:"tableHeadView scrollView".w(),scrollView:SC.ScrollView.design({isVisible:YES,layout:{left:-1,right:0,bottom:0,top:19},hasHorizontalScroller:NO,borderStyle:SC.BORDER_NONE,contentView:SC.View.design({}),_sv_offsetDidChange:function(){this.get("parentView")._sctv_scrollOffsetDidChange()
}.observes("verticalScrollOffset","horizontalScrollOffset")}),hasHorizontalScroller:NO,hasVerticalScroller:NO,selectOnMouseDown:NO,containerView:function(){var a=this.get("scrollView");
return(a&&a.get)?a.get("contentView"):null}.property("scrollView"),layout:{left:0,right:0,top:0,bottom:0},init:function(){window.table=this;
return arguments.callee.base.apply(this,arguments)},canReorderContent:NO,isInDragMode:NO,mouseDownInTableHeaderView:function(a,c){var b=c.get("column");
if(!b.get("isReorderable")&&!b.get("isSortable")){return NO}this._mouseDownEvent=a;
this._mouseDownTimer=SC.Timer.schedule({target:this,action:"_scthv_enterDragMode",interval:300});
return YES},mouseUpInTableHeaderView:function(b,g){var e=this.get("isInDragMode");
if(!e){var c=g.get("column");this.set("sortedColumn",c);var a=c.get("sortState");
var f=a===SC.SORT_ASCENDING?SC.SORT_DESCENDING:SC.SORT_ASCENDING;c.set("sortState",f)
}this._dragging=false;if(this._mouseDownTimer){this._mouseDownTimer.invalidate()}},mouseDraggedInTableHeaderView:function(a,c){SC.RunLoop.begin();
var b=this.get("isInDragMode");if(!b){return NO}if(!this._dragging){SC.Drag.start({event:this._mouseDownEvent,source:c,dragView:this._scthv_dragViewForHeader(),ghost:YES});
this._dragging=true}return arguments.callee.base.apply(this,arguments);SC.RunLoop.end()
},columns:[],flexibleColumn:null,sortedColumn:null,hasTableHead:YES,tableHeadView:SC.TableHeadView.design({layout:{top:0,left:0,right:0}}),tableHeadHeight:18,hasUniformRowHeights:YES,rowHeight:18,exampleView:SC.TableRowView,isInColumnDragMode:NO,filterKey:null,rowOffsetForContentIndex:function(c){var b=0,a;
if(this.get("hasUniformRowHeights")){return b+(this.get("rowHeight")*c)}else{for(a=0;
a<c;i++){b+=this.rowHeightForContentIndex(a)}return b}},rowHeightForContentIndex:function(a){if(this.get("hasUniformRowHeights")){return this.get("rowHeight")
}else{}},layoutForContentIndex:function(a){return{top:this.rowOffsetForContentIndex(a),height:this.rowHeightForContentIndex(a),left:0,right:0}
},createItemView:function(c,a,b){b.tableView=this;return c.create(b)},clippingFrame:function(){var b=this.get("containerView"),a=this.get("scrollView"),c=this.get("frame");
if(!a.get){return c}return{height:c.height,width:c.width,x:a.get("horizontalScrollOffset"),y:a.get("verticalScrollOffset")}
}.property("frame","content").cacheable(),_sctv_scrollOffsetDidChange:function(){this.notifyPropertyChange("clippingFrame")
},computeLayout:function(){var b=arguments.callee.base.apply(this,arguments),a=this.get("containerView"),e=this.get("frame");
var c=b.minHeight;delete b.minHeight;a.adjust("minHeight",c);a.layoutDidChange();
this.notifyPropertyChange("clippingFrame");return b},_sctv_columnsDidChange:function(){var b=this.get("columns"),c=this.get("content"),a;
for(a=0;a<b.get("length");a++){b.objectAt(a).set("tableContent",c)}this.get("tableHeadView")._scthv_handleChildren();
this.reload()}.observes("columns"),_sctv_adjustColumnWidthsOnResize:function(){var g=this.get("frame").width;
var h=this.get("content"),c=this.delegateFor("isTableDelegate",this.delegate,h);if(this.get("columns").length==0){return
}g=c.tableShouldResizeWidthTo(this,g);var f=this.get("columns"),j=0,a;for(var a=0;
a<f.length;a++){j+=f.objectAt(a).get("width")}if(g===0){g=j}var b=this.get("flexibleColumn")||this.get("columns").objectAt(this.get("columns").length-1);
var e=b.get("width")+(g-j);b.set("width",e)}.observes("frame"),_sctv_sortContent:function(){var b=this.get("sortedColumn");
var a=b.get("key");this.set("orderBy",a)},_sctv_sortedColumnDidChange:function(){var b=this.get("columns"),e=this.get("sortedColumn"),c,a;
for(a=0;a<b.get("length");a++){c=b.objectAt(a);if(c!==e){c.set("sortState",null)}}this.invokeOnce("_sctv_sortContent")
}.observes("sortedColumn")});sc_require("views/table_row");SC.TableCellView=SC.View.extend({classNames:["sc-table-cell"],column:null,escapeHTMLBinding:SC.Binding.oneWay(".column.escapeHTML"),formatter:SC.Binding.oneWay(".column.formatter"),displayValue:function(){var g=this.get("content");
var e=this.get("column").get("formatter");if(e){var f=(SC.typeOf(e)===SC.T_FUNCTION)?e(g,this):e.fieldValueForObject(g,this);
if(!SC.none(f)){g=f}}if(SC.typeOf(g)===SC.T_ARRAY){var c=[];for(var b=0;b<g.get("length");
b++){var a=g.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}c.push(a)}g=c.join(",")
}if(!SC.none(g)&&g.toString){g=g.toString()}if(this.get("escapeHTML")){g=SC.RenderContext.escapeHTML(g)
}return g}.property("content","escapeHTML","formatter").cacheable(),render:function(a,b){a.push(this.get("displayValue"))
},init:function(){var a=this.get("column");a.addObserver("width",this,"_sctcv_layoutDidChange");
a.addObserver("maxWidth",this,"_sctcv_layoutDidChange");a.addObserver("minWidth",this,"_sctcv_layoutDidChange")
},_sctcv_layoutDidChange:function(c,b,f,a){var e=this.get("parentView");SC.run(function(){e.layoutChildViews()
})}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/table")
};