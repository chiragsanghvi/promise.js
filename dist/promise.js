/*Copyright (c) Kaerus 2012 (kaerus.com), Anders Elo <anders @ kaerus com>*/
(function(e){"use strict";function o(){if(!(this instanceof o))return new o}if(typeof exports=="object")typeof module!==undefined&&module.exports&&(exports=module.exports=o),exports.Promise=o;else if(typeof define=="function"&&define.amd)define("promise",[],function(){return o});else{if(typeof e!="object")throw"Unable to export Promise";e.Promise=o}if(typeof e.setImmediate!="function")if(typeof e.process!="undefined"&&e.process&&typeof e.process.nextTick=="function")e.setImmediate=e.process.nextTick;else if(e.vertx&&typeof e.vertx.runOnLoop=="function")e.setImmediate=e.vertx.runOnLoop;else if(typeof e.MessageChannel!="undefined"){var t=[],n=new e.MessageChannel;n.port1.onmessage=function(){t.shift()()},e.setImmediate=function(e){t[t.length]=e,n.port2.postMessage()}}else{if(typeof e.setTimeout!="function")throw"No candidate for setImmediate";e.setImmediate=e.setTimeout}var r=0,i=1,s=2;o.prototype.resolve=function(){var e,t,n=this.state,s=this.resolved;while(e=this.calls.shift()){t=e[r];if(typeof e[this.state]=="function"){try{s=e[this.state](this.resolved)}catch(u){t.reject(u);continue}if(s instanceof o||s&&typeof s.then=="function"){s.then(function(e){t.fulfill(e)},function(e){t.reject(e)});continue}n=i}t.state=n,t.resolved=s,t.calls&&t.resolve()}},o.prototype.then=function(t,n){var r=this,i=new o;return this.calls||(this.calls=[]),this.calls[this.calls.length]=[i,t,n],this.resolved&&e.setImmediate(function(){r.resolve()}),i},o.prototype.spread=function(e,t){function n(t){return Array.isArray(t)||(t=[t]),e.apply(null,t)}return this.then(n,t)},o.prototype.fulfill=function(e){if(this.state)return;return arguments.length>1&&(e=[].slice.call(arguments)),this.state=i,this.resolved=e,this.calls&&this.resolve(),this},o.prototype.reject=function(e){if(this.state)return;return this.state=s,this.resolved=e,this.calls&&this.resolve(),this},o.prototype.when=function(t){function s(t,n){var r;return n instanceof o||n&&typeof n.then=="function"?n.then(function(e){t.fulfill(e)},function(e){t.reject(e)}):e.setImmediate(function(){try{r=n.call(t),t.fulfill(r)}catch(e){t.reject(e)}}),t}function u(e,n){return s(e,t[n]).then(function(e){i[n]=e}),function(){return e}}var n,r=n=this,i=[];if(!Array.isArray(t))return s(this,t);for(var a=0;a<t.length;a++)n=r,r=n.then(u(n,a));return n.then(function(){return i})},o.prototype.attach=function(e){return this.attached=e,this},o.prototype.abort=function(e){return this.attached&&typeof this.attached.abort=="function"&&this.attached.abort(),this.reject(e),this},o.prototype.timeout=function(e,t){var n=this;return t||(t=function(){n.abort("timed out")}),e!==null?this.timer=setTimeout(t,e):this.timer&&(clearTimeout(this.timer),this.timer=undefined),this}})(global||window||this);