(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46cee381"],{"081b":function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return s}));var r=n("9ab4"),i=void 0,o=function(e,t,n,o,s){return r["__awaiter"](i,void 0,void 0,(function(){var i;return r["__generator"](this,(function(r){switch(r.label){case 0:if(e)return[2,e.attachViewToDom(t,n,s,o)];if("string"!==typeof n&&!(n instanceof HTMLElement))throw new Error("framework delegate is missing");return i="string"===typeof n?t.ownerDocument&&t.ownerDocument.createElement(n):n,o&&o.forEach((function(e){return i.classList.add(e)})),s&&Object.assign(i,s),t.appendChild(i),i.componentOnReady?[4,i.componentOnReady()]:[3,2];case 1:r.sent(),r.label=2;case 2:return[2,i]}}))}))},s=function(e,t){if(t){if(e){var n=t.parentElement;return e.removeViewFromDom(n,t)}t.remove()}return Promise.resolve()}},9342:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return i}));var r=function(){function e(e,t){this.x=e,this.y=t}return e}(),i=function(e,t,n,r,i){var a=s(e.y,t.y,n.y,r.y,i);return o(e.x,t.x,n.x,r.x,a[0])},o=function(e,t,n,r,i){var o=3*t*Math.pow(i-1,2),s=-3*n*i+3*n+r*i,a=e*Math.pow(i-1,3);return i*(o+i*s)-a},s=function(e,t,n,r,i){e-=i,t-=i,n-=i,r-=i;var o=u(r-3*n+3*t-e,3*n-6*t+3*e,3*t-3*e,e);return o.filter((function(e){return e>=0&&e<=1}))},a=function(e,t,n){var r=t*t-4*e*n;return r<0?[]:[(-t+Math.sqrt(r))/(2*e),(-t-Math.sqrt(r))/(2*e)]},u=function(e,t,n,r){if(0===e)return a(t,n,r);t/=e,n/=e,r/=e;var i=(3*n-t*t)/3,o=(2*t*t*t-9*t*n+27*r)/27;if(0===i)return[Math.pow(-o,1/3)];if(0===o)return[Math.sqrt(-i),-Math.sqrt(-i)];var s=Math.pow(o/2,2)+Math.pow(i/3,3);if(0===s)return[Math.pow(o/2,.5)-t/3];if(s>0)return[Math.pow(-o/2+Math.sqrt(s),1/3)-Math.pow(o/2+Math.sqrt(s),1/3)-t/3];var u=Math.sqrt(Math.pow(-i/3,3)),c=Math.acos(-o/(2*Math.sqrt(Math.pow(-i/3,3)))),h=2*Math.pow(u,1/3);return[h*Math.cos(c/3)-t/3,h*Math.cos((c+2*Math.PI)/3)-t/3,h*Math.cos((c+4*Math.PI)/3)-t/3]}},"975a":function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return d})),n.d(t,"e",(function(){return p})),n.d(t,"f",(function(){return o})),n.d(t,"g",(function(){return i})),n.d(t,"h",(function(){return l})),n.d(t,"i",(function(){return c})),n.d(t,"j",(function(){return h})),n.d(t,"k",(function(){return s}));var r=function(e){"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,32)},i=function(e){return!!e.shadowRoot&&!!e.attachShadow},o=function(e){var t=e.closest("ion-item");return t?t.querySelector("ion-label"):null},s=function(e,t,n,r,o){if(e||i(t)){var s=t.querySelector("input.aux-input");s||(s=t.ownerDocument.createElement("input"),s.type="hidden",s.classList.add("aux-input"),t.appendChild(s)),s.disabled=o,s.name=n,s.value=r||""}},a=function(e,t,n){return Math.max(e,Math.min(t,n))},u=function(e,t){if(!e){var n="ASSERT: "+t;throw console.error(n),new Error(n)}},c=function(e){return e.timeStamp||Date.now()},h=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var n=t[0];return{x:n.clientX,y:n.clientY}}if(void 0!==e.pageX)return{x:e.pageX,y:e.pageY}}return{x:0,y:0}},l=function(e){var t="rtl"===document.dir;switch(e){case"start":return t;case"end":return!t;default:throw new Error('"'+e+'" is not a valid value for [side]. Use "start" or "end" instead.')}},d=function(e,t){var n=e._original||e;return{_original:e,emit:p(n.emit.bind(n),t)}},p=function(e,t){var n;return void 0===t&&(t=0),function(){for(var r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];clearTimeout(n),n=setTimeout.apply(void 0,[e,t].concat(r))}}},"9c3e":function(e,t,n){"use strict";n.r(t),n.d(t,"ion_nav",(function(){return g})),n.d(t,"ion_nav_link",(function(){return y})),n.d(t,"ion_nav_pop",(function(){return _})),n.d(t,"ion_nav_push",(function(){return O})),n.d(t,"ion_nav_set_root",(function(){return j}));var r=n("9ab4"),i=n("421c"),o=n("0b9b"),s=n("2691"),a=n("975a"),u=n("081b"),c=n("fa89"),h=n("9342"),l=1,d=2,p=3,v=function(){function e(e,t){this.component=e,this.params=t,this.state=l}return e.prototype.init=function(e){return r["__awaiter"](this,void 0,void 0,(function(){var t,n;return r["__generator"](this,(function(r){switch(r.label){case 0:return this.state=d,this.element?[3,2]:(t=this.component,n=this,[4,Object(u["a"])(this.delegate,e,t,["ion-page","ion-page-invisible"],this.params)]);case 1:n.element=r.sent(),r.label=2;case 2:return[2]}}))}))},e.prototype._destroy=function(){Object(a["b"])(this.state!==p,"view state must be ATTACHED");var e=this.element;e&&(this.delegate?this.delegate.removeViewFromDom(e.parentElement,e):e.remove()),this.nav=void 0,this.state=p},e}(),f=function(e,t,n){if(!e)return!1;if(e.component!==t)return!1;var r=e.params;if(r===n)return!0;if(!r&&!n)return!0;if(!r||!n)return!1;var i=Object.keys(r),o=Object.keys(n);if(i.length!==o.length)return!1;for(var s=0,a=i;s<a.length;s++){var u=a[s];if(r[u]!==n[u])return!1}return!0},m=function(e,t){return e?e instanceof v?e:new v(e,t):null},b=function(e){return e.map((function(e){return e instanceof v?e:"page"in e?m(e.page,e.params):m(e,void 0)})).filter((function(e){return null!==e}))},g=function(){function e(e){Object(i["l"])(this,e),this.transInstr=[],this.animationEnabled=!0,this.useRouter=!1,this.isTransitioning=!1,this.destroyed=!1,this.views=[],this.animated=!0,this.ionNavWillLoad=Object(i["d"])(this,"ionNavWillLoad",7),this.ionNavWillChange=Object(i["d"])(this,"ionNavWillChange",3),this.ionNavDidChange=Object(i["d"])(this,"ionNavDidChange",3)}return e.prototype.swipeGestureChanged=function(){this.gesture&&this.gesture.setDisabled(!0!==this.swipeGesture)},e.prototype.rootChanged=function(){void 0!==this.root&&(this.useRouter||this.setRoot(this.root,this.rootParams))},e.prototype.componentWillLoad=function(){if(this.useRouter=!!document.querySelector("ion-router")&&!this.el.closest("[no-router]"),void 0===this.swipeGesture){var e=Object(i["e"])(this);this.swipeGesture=o["b"].getBoolean("swipeBackEnabled","ios"===e)}this.ionNavWillLoad.emit()},e.prototype.componentDidLoad=function(){return r["__awaiter"](this,void 0,void 0,(function(){var e;return r["__generator"](this,(function(t){switch(t.label){case 0:return this.rootChanged(),e=this,[4,n.e("chunk-2d0d30f7").then(n.bind(null,"5ac8"))];case 1:return e.gesture=t.sent().createSwipeBackGesture(this.el,this.canStart.bind(this),this.onStart.bind(this),this.onMove.bind(this),this.onEnd.bind(this)),this.swipeGestureChanged(),[2]}}))}))},e.prototype.componentDidUnload=function(){for(var e=0,t=this.views;e<t.length;e++){var n=t[e];Object(c["b"])(n.element,s["e"]),n._destroy()}this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.transInstr.length=this.views.length=0,this.destroyed=!0},e.prototype.push=function(e,t,n,r){return this.queueTrns({insertStart:-1,insertViews:[{page:e,params:t}],opts:n},r)},e.prototype.insert=function(e,t,n,r,i){return this.queueTrns({insertStart:e,insertViews:[{page:t,params:n}],opts:r},i)},e.prototype.insertPages=function(e,t,n,r){return this.queueTrns({insertStart:e,insertViews:t,opts:n},r)},e.prototype.pop=function(e,t){return this.queueTrns({removeStart:-1,removeCount:1,opts:e},t)},e.prototype.popTo=function(e,t,n){var r={removeStart:-1,removeCount:-1,opts:t};return"object"===typeof e&&e.component?(r.removeView=e,r.removeStart=1):"number"===typeof e&&(r.removeStart=e+1),this.queueTrns(r,n)},e.prototype.popToRoot=function(e,t){return this.queueTrns({removeStart:1,removeCount:-1,opts:e},t)},e.prototype.removeIndex=function(e,t,n,r){return void 0===t&&(t=1),this.queueTrns({removeStart:e,removeCount:t,opts:n},r)},e.prototype.setRoot=function(e,t,n,r){return this.setPages([{page:e,params:t}],n,r)},e.prototype.setPages=function(e,t,n){return null==t&&(t={}),!0!==t.animated&&(t.animated=!1),this.queueTrns({insertStart:0,insertViews:e,removeStart:0,removeCount:-1,opts:t},n)},e.prototype.setRouteId=function(e,t,n){var i,o=this,s=this.getActiveSync();if(f(s,e,t))return Promise.resolve({changed:!1,element:s.element});var a,u=new Promise((function(e){return i=e})),c={updateURL:!1,viewIsReady:function(e){var t,n=new Promise((function(e){return t=e}));return i({changed:!0,element:e,markVisible:function(){return r["__awaiter"](o,void 0,void 0,(function(){return r["__generator"](this,(function(e){switch(e.label){case 0:return t(),[4,a];case 1:return e.sent(),[2]}}))}))}}),n}};if("root"===n)a=this.setRoot(e,t,c);else{var h=this.views.find((function(n){return f(n,e,t)}));h?a=this.popTo(h,Object.assign({},c,{direction:"back"})):"forward"===n?a=this.push(e,t,c):"back"===n&&(a=this.setRoot(e,t,Object.assign({},c,{direction:"back",animated:!0})))}return u},e.prototype.getRouteId=function(){return r["__awaiter"](this,void 0,void 0,(function(){var e;return r["__generator"](this,(function(t){return e=this.getActiveSync(),[2,e?{id:e.element.tagName,params:e.params,element:e.element}:void 0]}))}))},e.prototype.getActive=function(){return Promise.resolve(this.getActiveSync())},e.prototype.getByIndex=function(e){return Promise.resolve(this.views[e])},e.prototype.canGoBack=function(e){return Promise.resolve(this.canGoBackSync(e))},e.prototype.getPrevious=function(e){return Promise.resolve(this.getPreviousSync(e))},e.prototype.getLength=function(){return this.views.length},e.prototype.getActiveSync=function(){return this.views[this.views.length-1]},e.prototype.canGoBackSync=function(e){return void 0===e&&(e=this.getActiveSync()),!(!e||!this.getPreviousSync(e))},e.prototype.getPreviousSync=function(e){if(void 0===e&&(e=this.getActiveSync()),e){var t=this.views,n=t.indexOf(e);return n>0?t[n-1]:void 0}},e.prototype.queueTrns=function(e,t){if(this.isTransitioning&&null!=e.opts&&e.opts.skipIfBusy)return Promise.resolve(!1);var n=new Promise((function(t,n){e.resolve=t,e.reject=n}));return e.done=t,e.insertViews&&0===e.insertViews.length&&(e.insertViews=void 0),this.transInstr.push(e),this.nextTrns(),n},e.prototype.success=function(e,t){if(this.destroyed)this.fireError("nav controller was destroyed",t);else if(t.done&&t.done(e.hasCompleted,e.requiresTransition,e.enteringView,e.leavingView,e.direction),t.resolve(e.hasCompleted),!1!==t.opts.updateURL&&this.useRouter){var n=document.querySelector("ion-router");if(n){var r="back"===e.direction?"back":"forward";n.navChanged(r)}}},e.prototype.failed=function(e,t){this.destroyed?this.fireError("nav controller was destroyed",t):(this.transInstr.length=0,this.fireError(e,t))},e.prototype.fireError=function(e,t){t.done&&t.done(!1,!1,e),t.reject&&!this.destroyed?t.reject(e):t.resolve(!1)},e.prototype.nextTrns=function(){if(this.isTransitioning)return!1;var e=this.transInstr.shift();return!!e&&(this.runTransition(e),!0)},e.prototype.runTransition=function(e){return r["__awaiter"](this,void 0,void 0,(function(){var t,n,i,o,s,a;return r["__generator"](this,(function(r){switch(r.label){case 0:if(r.trys.push([0,6,,7]),this.ionNavWillChange.emit(),this.isTransitioning=!0,this.prepareTI(e),t=this.getActiveSync(),n=this.getEnteringView(e,t),!t&&!n)throw new Error("no views in the stack to be removed");return n&&n.state===l?[4,n.init(this.el)]:[3,2];case 1:r.sent(),r.label=2;case 2:return this.postViewInit(n,t,e),i=(e.enteringRequiresTransition||e.leavingRequiresTransition)&&n!==t,i?[4,this.transition(n,t,e)]:[3,4];case 3:return s=r.sent(),[3,5];case 4:s={hasCompleted:!0,requiresTransition:!1},r.label=5;case 5:return o=s,this.success(o,e),this.ionNavDidChange.emit(),[3,7];case 6:return a=r.sent(),this.failed(a,e),[3,7];case 7:return this.isTransitioning=!1,this.nextTrns(),[2]}}))}))},e.prototype.prepareTI=function(e){var t=this.views.length;if(e.opts=e.opts||{},void 0===e.opts.delegate&&(e.opts.delegate=this.delegate),void 0!==e.removeView){Object(a["b"])(void 0!==e.removeStart,"removeView needs removeStart"),Object(a["b"])(void 0!==e.removeCount,"removeView needs removeCount");var n=this.views.indexOf(e.removeView);if(n<0)throw new Error("removeView was not found");e.removeStart+=n}void 0!==e.removeStart&&(e.removeStart<0&&(e.removeStart=t-1),e.removeCount<0&&(e.removeCount=t-e.removeStart),e.leavingRequiresTransition=e.removeCount>0&&e.removeStart+e.removeCount===t),e.insertViews&&((e.insertStart<0||e.insertStart>t)&&(e.insertStart=t),e.enteringRequiresTransition=e.insertStart===t);var r=e.insertViews;if(r){Object(a["b"])(r.length>0,"length can not be zero");var i=b(r);if(0===i.length)throw new Error("invalid views to insert");for(var o=0,s=i;o<s.length;o++){var u=s[o];u.delegate=e.opts.delegate;var c=u.nav;if(c&&c!==this)throw new Error("inserted view was already inserted");if(u.state===p)throw new Error("inserted view was already destroyed")}e.insertViews=i}},e.prototype.getEnteringView=function(e,t){var n=e.insertViews;if(void 0!==n)return n[n.length-1];var r=e.removeStart;if(void 0!==r)for(var i=this.views,o=r+e.removeCount,s=i.length-1;s>=0;s--){var a=i[s];if((s<r||s>=o)&&a!==t)return a}},e.prototype.postViewInit=function(e,t,n){Object(a["b"])(t||e,"Both leavingView and enteringView are null"),Object(a["b"])(n.resolve,"resolve must be valid"),Object(a["b"])(n.reject,"reject must be valid");var r,i=n.opts,o=n.insertViews,u=n.removeStart,h=n.removeCount;if(void 0!==u&&void 0!==h){Object(a["b"])(u>=0,"removeStart can not be negative"),Object(a["b"])(h>=0,"removeCount can not be negative"),r=[];for(var l=0;l<h;l++){var d=this.views[l+u];d&&d!==e&&d!==t&&r.push(d)}i.direction=i.direction||"back"}var p=this.views.length+(void 0!==o?o.length:0)-(void 0!==h?h:0);if(Object(a["b"])(p>=0,"final balance can not be negative"),0===p)throw console.warn("You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.",this,this.el),new Error("navigation stack needs at least one root page");if(o){for(var v=n.insertStart,f=0,m=o;f<m.length;f++){d=m[f];this.insertViewAt(d,v),v++}n.enteringRequiresTransition&&(i.direction=i.direction||"forward")}if(r&&r.length>0){for(var b=0,g=r;b<g.length;b++){d=g[b];Object(c["b"])(d.element,s["c"]),Object(c["b"])(d.element,s["d"]),Object(c["b"])(d.element,s["e"])}for(var w=0,y=r;w<y.length;w++){d=y[w];this.destroyView(d)}}},e.prototype.transition=function(e,t,n){return r["__awaiter"](this,void 0,void 0,(function(){var s,a,u,h,l,d,p,v=this;return r["__generator"](this,(function(r){switch(r.label){case 0:return s=n.opts,a=s.progressAnimation?function(e){return v.sbAni=e}:void 0,u=Object(i["e"])(this),h=e.element,l=t&&t.element,d=Object.assign({mode:u,showGoBack:this.canGoBackSync(e),baseEl:this.el,animationBuilder:this.animation||s.animationBuilder||o["b"].get("navAnimation"),progressCallback:a,animated:this.animated&&o["b"].getBoolean("animated",!0),enteringEl:h,leavingEl:l},s),[4,Object(c["d"])(d)];case 1:return p=r.sent().hasCompleted,[2,this.transitionFinish(p,e,t,s)]}}))}))},e.prototype.transitionFinish=function(e,t,n,r){var i=e?t:n;return i&&this.cleanup(i),{hasCompleted:e,requiresTransition:!0,enteringView:t,leavingView:n,direction:r.direction}},e.prototype.insertViewAt=function(e,t){var n=this.views,r=n.indexOf(e);r>-1?(Object(a["b"])(e.nav===this,"view is not part of the nav"),n.splice(t,0,n.splice(r,1)[0])):(Object(a["b"])(!e.nav,"nav is used"),e.nav=this,n.splice(t,0,e))},e.prototype.removeView=function(e){Object(a["b"])(e.state===d||e.state===p,"view state should be loaded or destroyed");var t=this.views,n=t.indexOf(e);Object(a["b"])(n>-1,"view must be part of the stack"),n>=0&&t.splice(n,1)},e.prototype.destroyView=function(e){e._destroy(),this.removeView(e)},e.prototype.cleanup=function(e){if(!this.destroyed)for(var t=this.views,n=t.indexOf(e),r=t.length-1;r>=0;r--){var i=t[r],o=i.element;r>n?(Object(c["b"])(o,s["e"]),this.destroyView(i)):r<n&&Object(c["c"])(o,!0)}},e.prototype.canStart=function(){return!!this.swipeGesture&&!this.isTransitioning&&0===this.transInstr.length&&this.animationEnabled&&this.canGoBackSync()},e.prototype.onStart=function(){this.queueTrns({removeStart:-1,removeCount:1,opts:{direction:"back",progressAnimation:!0}},void 0)},e.prototype.onMove=function(e){this.sbAni&&this.sbAni.progressStep(e)},e.prototype.onEnd=function(e,t,n){var r=this;if(this.sbAni){this.animationEnabled=!1,this.sbAni.onFinish((function(){r.animationEnabled=!0}),{oneTimeCallback:!0});var i=e?-.001:.001;e?i+=Object(h["b"])(new h["a"](0,0),new h["a"](.32,.72),new h["a"](0,1),new h["a"](1,1),t):(this.sbAni.easing("cubic-bezier(1, 0, 0.68, 0.28)"),i+=Object(h["b"])(new h["a"](0,0),new h["a"](1,0),new h["a"](.68,.28),new h["a"](1,1),t)),this.sbAni.progressEnd(e,i,n)}},e.prototype.render=function(){return Object(i["i"])("slot",null)},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["f"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{swipeGesture:["swipeGestureChanged"],root:["rootChanged"]}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"},enumerable:!0,configurable:!0}),e}(),w=function(e,t,n,r){var i=e.closest("ion-nav");if(i)if("forward"===t){if(void 0!==n)return i.push(n,r,{skipIfBusy:!0})}else if("root"===t){if(void 0!==n)return i.setRoot(n,r,{skipIfBusy:!0})}else if("back"===t)return i.pop({skipIfBusy:!0});return Promise.resolve(!1)},y=function(){function e(e){var t=this;Object(i["l"])(this,e),this.routerDirection="forward",this.onClick=function(){return w(t.el,t.routerDirection,t.component,t.componentProps)}}return e.prototype.render=function(){return Object(i["i"])(i["a"],{onClick:this.onClick})},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["f"])(this)},enumerable:!0,configurable:!0}),e}(),_=function(){function e(e){var t=this;Object(i["l"])(this,e),this.pop=function(){return w(t.el,"back")}}return e.prototype.componentDidLoad=function(){console.warn('[DEPRECATED][ion-nav-pop] <ion-nav-pop> is deprecated. Use `<ion-nav-link routerDirection="back">` instead.')},e.prototype.render=function(){return Object(i["i"])(i["a"],{onClick:this.pop})},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["f"])(this)},enumerable:!0,configurable:!0}),e}(),O=function(){function e(e){var t=this;Object(i["l"])(this,e),this.push=function(){return w(t.el,"forward",t.component,t.componentProps)}}return e.prototype.componentDidLoad=function(){console.warn('[DEPRECATED][ion-nav-push] `<ion-nav-push component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent">` instead.')},e.prototype.render=function(){return Object(i["i"])(i["a"],{onClick:this.push})},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["f"])(this)},enumerable:!0,configurable:!0}),e}(),j=function(){function e(e){var t=this;Object(i["l"])(this,e),this.setRoot=function(){return w(t.el,"root",t.component,t.componentProps)}}return e.prototype.componentDidLoad=function(){console.warn('[DEPRECATED][ion-nav-set-root] `<ion-nav-set-root component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent" routerDirection="root">` instead.')},e.prototype.render=function(){return Object(i["i"])(i["a"],{onClick:this.setRoot})},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["f"])(this)},enumerable:!0,configurable:!0}),e}()},fa89:function(e,t,n){"use strict";n.d(t,"a",(function(){return j})),n.d(t,"b",(function(){return _})),n.d(t,"c",(function(){return E})),n.d(t,"d",(function(){return c}));var r=n("9ab4"),i=n("421c"),o=n("2691"),s=void 0,a=function(){return n.e("chunk-2d0c90db").then(n.bind(null,"5802"))},u=function(){return n.e("chunk-2d20f7d2").then(n.bind(null,"b49c"))},c=function(e){return new Promise((function(t,n){Object(i["m"])((function(){h(e),l(e).then((function(n){n.animation&&n.animation.destroy(),d(e),t(n)}),(function(t){d(e),n(t)}))}))}))},h=function(e){var t=e.enteringEl,n=e.leavingEl;C(t,n,e.direction),e.showGoBack?t.classList.add("can-go-back"):t.classList.remove("can-go-back"),E(t,!1),n&&E(n,!1)},l=function(e){return r["__awaiter"](s,void 0,void 0,(function(){var t,n;return r["__generator"](this,(function(r){switch(r.label){case 0:return[4,p(e)];case 1:return t=r.sent(),n=t?v(t,e):f(e),[2,n]}}))}))},d=function(e){var t=e.enteringEl,n=e.leavingEl;t.classList.remove("ion-page-invisible"),void 0!==n&&n.classList.remove("ion-page-invisible")},p=function(e){return r["__awaiter"](s,void 0,void 0,(function(){var t,n;return r["__generator"](this,(function(r){switch(r.label){case 0:return e.leavingEl&&e.animated&&0!==e.duration?e.animationBuilder?[2,e.animationBuilder]:"ios"!==e.mode?[3,2]:[4,a()]:[2,void 0];case 1:return n=r.sent().iosTransitionAnimation,[3,4];case 2:return[4,u()];case 3:n=r.sent().mdTransitionAnimation,r.label=4;case 4:return t=n,[2,t]}}))}))},v=function(e,t){return r["__awaiter"](s,void 0,void 0,(function(){var i,o,s;return r["__generator"](this,(function(r){switch(r.label){case 0:return[4,m(t,!0)];case 1:r.sent(),r.label=2;case 2:return r.trys.push([2,5,,6]),[4,n.e("chunk-2d225460").then(n.bind(null,"e461"))];case 3:return o=r.sent(),[4,o.create(e,t.baseEl,t)];case 4:return i=r.sent(),[3,6];case 5:return r.sent(),i=e(t.baseEl,t),[3,6];case 6:return w(t.enteringEl,t.leavingEl),[4,g(i,t)];case 7:return s=r.sent(),i.hasCompleted=s,t.progressCallback&&t.progressCallback(void 0),i.hasCompleted&&y(t.enteringEl,t.leavingEl),[2,{hasCompleted:i.hasCompleted,animation:i}]}}))}))},f=function(e){return r["__awaiter"](s,void 0,void 0,(function(){var t,n;return r["__generator"](this,(function(r){switch(r.label){case 0:return t=e.enteringEl,n=e.leavingEl,[4,m(e,!1)];case 1:return r.sent(),w(t,n),y(t,n),[2,{hasCompleted:!0}]}}))}))},m=function(e,t){return r["__awaiter"](s,void 0,void 0,(function(){var n,i;return r["__generator"](this,(function(r){switch(r.label){case 0:return n=void 0!==e.deepWait?e.deepWait:t,i=n?[j(e.enteringEl),j(e.leavingEl)]:[O(e.enteringEl),O(e.leavingEl)],[4,Promise.all(i)];case 1:return r.sent(),[4,b(e.viewIsReady,e.enteringEl)];case 2:return r.sent(),[2]}}))}))},b=function(e,t){return r["__awaiter"](s,void 0,void 0,(function(){return r["__generator"](this,(function(n){switch(n.label){case 0:return e?[4,e(t)]:[3,2];case 1:n.sent(),n.label=2;case 2:return[2]}}))}))},g=function(e,t){var n=t.progressCallback,r=new Promise((function(t){return e.onFinish(t)}));return n?(e.progressStart(!0),n(e)):e.play(),r},w=function(e,t){_(t,o["c"]),_(e,o["a"])},y=function(e,t){_(e,o["b"]),_(t,o["d"])},_=function(e,t){if(e){var n=new CustomEvent(t,{bubbles:!1,cancelable:!1});e.dispatchEvent(n)}},O=function(e){return e&&e.componentOnReady?e.componentOnReady():Promise.resolve()},j=function(e){return r["__awaiter"](s,void 0,void 0,(function(){var t,n;return r["__generator"](this,(function(r){switch(r.label){case 0:return t=e,t?null==t.componentOnReady?[3,2]:[4,t.componentOnReady()]:[3,4];case 1:if(n=r.sent(),null!=n)return[2];r.label=2;case 2:return[4,Promise.all(Array.from(t.children).map(j))];case 3:r.sent(),r.label=4;case 4:return[2]}}))}))},E=function(e,t){t?(e.setAttribute("aria-hidden","true"),e.classList.add("ion-page-hidden")):(e.hidden=!1,e.removeAttribute("aria-hidden"),e.classList.remove("ion-page-hidden"))},C=function(e,t,n){void 0!==e&&(e.style.zIndex="back"===n?"99":"101"),void 0!==t&&(t.style.zIndex="100")}}}]);
//# sourceMappingURL=chunk-46cee381.5678af09.js.map