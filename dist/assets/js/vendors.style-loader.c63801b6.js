(self.webpackChunkreact_boilerplate=self.webpackChunkreact_boilerplate||[]).push([[357],{695:e=>{"use strict";var t={};e.exports=function(e){if("undefined"===typeof t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}t[e]=r}return t[e]}},379:e=>{"use strict";var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var o={},i=[],u=0;u<e.length;u++){var c=e[u],s=n.base?c[0]+n.base:c[0],f=o[s]||0,p="".concat(s," ").concat(f);o[s]=f+1;var d=r(p),l={css:c[1],media:c[2],sourceMap:c[3]};-1!==d?(t[d].references++,t[d].updater(l)):t.push({identifier:p,updater:a(l,n),references:1}),i.push(p)}return i}function a(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r.update(e=t)}else r.remove()}}e.exports=function(e,a){var o=n(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var u=r(o[i]);t[u].references--}for(var c=n(e,a),s=0;s<o.length;s++){var f=r(o[s]);0===t[f].references&&(t[f].updater(),t.splice(f,1))}o=c}}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t),t}},795:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n=r.css,a=r.media,o=r.sourceMap;a?e.setAttribute("media",a):e.removeAttribute("media"),o&&"undefined"!==typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(n,e)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}}}]);