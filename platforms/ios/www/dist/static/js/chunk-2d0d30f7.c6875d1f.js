(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d30f7"],{"5ac8":function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return a}));var r=n("bb79"),a=function(t,e,n,a,i){var o=t.ownerDocument.defaultView,c=function(t){return t.startX<=50&&e()},u=function(t){var e=t.deltaX,n=e/o.innerWidth;a(n)},d=function(t){var e=t.deltaX,n=o.innerWidth,r=e/n,a=t.velocityX,c=n/2,u=a>=0&&(a>.2||t.deltaX>c),d=u?1-r:r,s=d*n,w=0;if(s>5){var f=s/Math.abs(a);w=Math.min(f,540)}i(u,r<=0?.01:r,w)};return Object(r["createGesture"])({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:c,onStart:n,onMove:u,onEnd:d})}}}]);
//# sourceMappingURL=chunk-2d0d30f7.c6875d1f.js.map