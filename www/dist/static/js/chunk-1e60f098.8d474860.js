(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e60f098"],{"081b":function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return a}));var i=n("9ab4"),r=void 0,o=function(t,e,n,o,a){return i["__awaiter"](r,void 0,void 0,(function(){var r;return i["__generator"](this,(function(i){switch(i.label){case 0:if(t)return[2,t.attachViewToDom(e,n,a,o)];if("string"!==typeof n&&!(n instanceof HTMLElement))throw new Error("framework delegate is missing");return r="string"===typeof n?e.ownerDocument&&e.ownerDocument.createElement(n):n,o&&o.forEach((function(t){return r.classList.add(t)})),a&&Object.assign(r,a),e.appendChild(r),r.componentOnReady?[4,r.componentOnReady()]:[3,2];case 1:i.sent(),i.label=2;case 2:return[2,r]}}))}))},a=function(t,e){if(e){if(t){var n=e.parentElement;return t.removeViewFromDom(n,e)}e.remove()}return Promise.resolve()}},6725:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_tab",(function(){return a})),n.d(e,"ion_tabs",(function(){return s}));var i=n("9ab4"),r=n("421c"),o=(n("0b9b"),n("081b")),a=function(){function t(t){Object(r["l"])(this,t),this.loaded=!1,this.active=!1}return t.prototype.componentWillLoad=function(){},t.prototype.setActive=function(){return i["__awaiter"](this,void 0,void 0,(function(){return i["__generator"](this,(function(t){switch(t.label){case 0:return[4,this.prepareLazyLoaded()];case 1:return t.sent(),this.active=!0,[2]}}))}))},t.prototype.prepareLazyLoaded=function(){return i["__awaiter"](this,void 0,void 0,(function(){return i["__generator"](this,(function(t){if(!this.loaded&&null!=this.component){this.loaded=!0;try{return[2,Object(o["a"])(this.delegate,this.el,this.component,["ion-page"])]}catch(e){console.error(e)}}return[2,void 0]}))}))},t.prototype.render=function(){var t=this,e=t.tab,n=t.active,i=t.component;return Object(r["i"])(r["a"],{role:"tabpanel","aria-hidden":n?null:"true","aria-labelledby":"tab-button-"+e,class:{"ion-page":void 0===i,"tab-hidden":!n}},Object(r["i"])("slot",null))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(r["f"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host(.tab-hidden){display:none!important}"},enumerable:!0,configurable:!0}),t}(),s=function(){function t(t){var e=this;Object(r["l"])(this,t),this.transitioning=!1,this.useRouter=!1,this.onTabClicked=function(t){var n=t.detail,i=n.href,r=n.tab;if(e.useRouter&&void 0!==i){var o=document.querySelector("ion-router");o&&o.push(i)}else e.select(r)},this.ionNavWillLoad=Object(r["d"])(this,"ionNavWillLoad",7),this.ionTabsWillChange=Object(r["d"])(this,"ionTabsWillChange",3),this.ionTabsDidChange=Object(r["d"])(this,"ionTabsDidChange",3)}return t.prototype.componentWillLoad=function(){return i["__awaiter"](this,void 0,void 0,(function(){var t;return i["__generator"](this,(function(e){switch(e.label){case 0:return this.useRouter||(this.useRouter=!!document.querySelector("ion-router")&&!this.el.closest("[no-router]")),this.useRouter?[3,2]:(t=this.tabs,[4,this.select(t[0])]);case 1:e.sent(),e.label=2;case 2:return this.ionNavWillLoad.emit(),[2]}}))}))},t.prototype.componentWillRender=function(){var t=this.el.querySelector("ion-tab-bar");if(t){var e=this.selectedTab?this.selectedTab.tab:void 0;t.selectedTab=e}},t.prototype.select=function(t){return i["__awaiter"](this,void 0,void 0,(function(){var e;return i["__generator"](this,(function(n){switch(n.label){case 0:return[4,this.getTab(t)];case 1:return e=n.sent(),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,!1];case 2:return n.sent(),[4,this.notifyRouter()];case 3:return n.sent(),this.tabSwitch(),[2,!0]}}))}))},t.prototype.getTab=function(t){return i["__awaiter"](this,void 0,void 0,(function(){var e;return i["__generator"](this,(function(n){return e="string"===typeof t?this.tabs.find((function(e){return e.tab===t})):t,e||console.error('tab with id: "'+e+'" does not exist'),[2,e]}))}))},t.prototype.getSelected=function(){return Promise.resolve(this.selectedTab?this.selectedTab.tab:void 0)},t.prototype.setRouteId=function(t){return i["__awaiter"](this,void 0,void 0,(function(){var e,n=this;return i["__generator"](this,(function(i){switch(i.label){case 0:return[4,this.getTab(t)];case 1:return e=i.sent(),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,{changed:!1,element:this.selectedTab}];case 2:return i.sent(),[2,{changed:!0,element:this.selectedTab,markVisible:function(){return n.tabSwitch()}}]}}))}))},t.prototype.getRouteId=function(){return i["__awaiter"](this,void 0,void 0,(function(){var t;return i["__generator"](this,(function(e){return t=this.selectedTab&&this.selectedTab.tab,[2,void 0!==t?{id:t,element:this.selectedTab}:void 0]}))}))},t.prototype.setActive=function(t){return this.transitioning?Promise.reject("transitioning already happening"):(this.transitioning=!0,this.leavingTab=this.selectedTab,this.selectedTab=t,this.ionTabsWillChange.emit({tab:t.tab}),t.setActive())},t.prototype.tabSwitch=function(){var t=this.selectedTab,e=this.leavingTab;this.leavingTab=void 0,this.transitioning=!1,t&&e!==t&&(e&&(e.active=!1),this.ionTabsDidChange.emit({tab:t.tab}))},t.prototype.notifyRouter=function(){if(this.useRouter){var t=document.querySelector("ion-router");if(t)return t.navChanged("forward")}return Promise.resolve(!1)},t.prototype.shouldSwitch=function(t){var e=this.selectedTab;return void 0!==t&&t!==e&&!this.transitioning},Object.defineProperty(t.prototype,"tabs",{get:function(){return Array.from(this.el.querySelectorAll("ion-tab"))},enumerable:!0,configurable:!0}),t.prototype.render=function(){return Object(r["i"])(r["a"],{onIonTabButtonClick:this.onTabClicked},Object(r["i"])("slot",{name:"top"}),Object(r["i"])("div",{class:"tabs-inner"},Object(r["i"])("slot",null)),Object(r["i"])("slot",{name:"bottom"}))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(r["f"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;z-index:0}.tabs-inner,:host{contain:layout size style}.tabs-inner{position:relative;-ms-flex:1;flex:1}"},enumerable:!0,configurable:!0}),t}()}}]);
//# sourceMappingURL=chunk-1e60f098.8d474860.js.map