(self.webpackChunkreact_boilerplate=self.webpackChunkreact_boilerplate||[]).push([[179],{899:(t,e,n)=>{"use strict";var r=n(796),i=n(294),s=n(935),o=n(137),c=n(610),a=n(991),l=n(255),u=n(724),d=n(608),f=n(757),v=n.n(f);n(325);function h(t){return(0,r.Z)("article",{className:"list__item"},void 0,(0,r.Z)("div",{},void 0,(0,r.Z)("img",{src:t.item.imgPath,alt:t.item.title}),(0,r.Z)("button",{onClick:t.onClick},void 0,"+")),(0,r.Z)("p",{className:"list__item__price"},void 0,"$",t.item.price.toFixed(2)),(0,r.Z)("h3",{},void 0,t.item.title),(0,r.Z)("p",{className:"list__item__description"},void 0,t.item.description))}function p(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=(0,d.Z)(t);if(e){var i=(0,d.Z)(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(0,u.Z)(this,n)}}var g,m,Z=function(t){(0,l.Z)(n,t);var e=p(n);function n(){return(0,c.Z)(this,n),e.apply(this,arguments)}return(0,a.Z)(n,[{key:"renderItems",value:function(t,e){return null===t||void 0===t?void 0:t.map((function(t){return(0,r.Z)(h,{item:t,onClick:function(){return e(t)}},t.id)}))}},{key:"render",value:function(){var t=this.renderItems(this.props.items,this.props.onAdd);return(0,r.Z)("main",{},void 0,(0,r.Z)("h1",{},void 0,this.props.title),(0,r.Z)("div",{className:"list"},void 0,t))}}]),n}(i.Component);function y(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=(0,d.Z)(t);if(e){var i=(0,d.Z)(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(0,u.Z)(this,n)}}var k,C,b=function(t){(0,l.Z)(n,t);var e=y(n);function n(){return(0,c.Z)(this,n),e.apply(this,arguments)}return(0,a.Z)(n,[{key:"renderTags",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=n?t:t.slice(0,2);return null===i||void 0===i?void 0:i.map((function(t){return(0,r.Z)("button",{className:t.isActive?"tag_active":"tag",onClick:function(){return e(t.id)}},t.id,"#",t.name)}))}},{key:"render",value:function(){var t=this,e=this.renderTags(this.props.tags,this.props.onSwitch,this.props.all);return(0,r.Z)("div",{className:"filters"},void 0,g||(g=(0,r.Z)("p",{className:"filters__header"},void 0,"filters")),(0,r.Z)("p",{},void 0,e,(0,r.Z)("button",{className:"all",onClick:function(){return t.props.onSwitchAll()}},void 0,m||(m=(0,r.Z)("img",{src:"./src/static/svg/settings.svg",alt:"dish.svg"})),"".concat(this.props.all?"hide":"all"," filters"))))}}]),n}(i.Component);function A(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=(0,d.Z)(t);if(e){var i=(0,d.Z)(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(0,u.Z)(this,n)}}var R,w,_,N=function(t){(0,l.Z)(n,t);var e=A(n);function n(){return(0,c.Z)(this,n),e.apply(this,arguments)}return(0,a.Z)(n,[{key:"getOrdersCount",value:function(t){var e,n,r,i;return(null===(e=t.ordered)||void 0===e?void 0:e.length)+(null===(n=t.baking)||void 0===n?void 0:n.length)+(null===(r=t.finishing)||void 0===r?void 0:r.length)+(null===(i=t.served)||void 0===i?void 0:i.length)}},{key:"render",value:function(){return(0,r.Z)("button",{className:"orders"},void 0,k||(k=(0,r.Z)("div",{className:"circle"})),C||(C=(0,r.Z)("img",{src:"./src/static/svg/dish.svg",alt:"dish.svg"})),(0,r.Z)("p",{},void 0,"order status",(0,r.Z)("div",{className:"count"},void 0,this.getOrdersCount(this.props.orders))))}}]),n}(i.Component);function S(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=(0,d.Z)(t);if(e){var i=(0,d.Z)(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(0,u.Z)(this,n)}}var O=function(t){(0,l.Z)(i,t);var e,n=S(i);function i(t){var e;(0,c.Z)(this,i),(e=n.call(this,t)).domain="http://localhost:8080/";var r=e.getCategoriesFromServer();return e.state={orders:{ordered:[],baking:[],finishing:[],served:[]},selectedCategory:"0",filters:[{id:"0",name:"vegetarian",isActive:!1},{id:"1",name:"vegan",isActive:!1},{id:"2",name:"tag0",isActive:!1},{id:"3",name:"tag1",isActive:!1},{id:"4",name:"tag2",isActive:!1}],isAllFilters:!1,categories:r},e}return(0,a.Z)(i,[{key:"getCategoriesFromServer",value:(e=(0,o.Z)(v().mark((function t(){var e,n;return v().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e="".concat(this.domain,"categories"),n=null,t.next=4,fetch(e,{method:"GET"}).then((function(t){return console.log(t),console.log(t.body),t.body})).then((function(t){console.log(t),n=t})).catch(console.error);case 4:return t.abrupt("return",n);case 5:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"changeCategory",value:function(t){this.setState({selectedCategory:t})}},{key:"getOrdersCount",value:function(){var t=this.state.orders;return t.ordered.length+t.baking.length+t.finishing.length+t.served.length}},{key:"addOrder",value:function(t){var e=Object.assign({},this.state.orders);e.baking.push(t),this.setState({orders:e})}},{key:"switchFilter",value:function(t){var e=this.state.filters.slice(),n=e.findIndex((function(e){return e.id===t}));e[n].isActive=!e[n].isActive,this.setState({filters:e})}},{key:"switchDisplayAll",value:function(){var t=this.state.isAllFilters;t=!t,this.setState({isAllFilters:t})}},{key:"categoriesList",value:function(t){var e=this;return this.state.categories.map((function(n){var i=t===n.id?"\u2014"+n.title:n.title;return(0,r.Z)("li",{},n.id,t===n.id?R||(R=(0,r.Z)("div",{className:"side-nav__marker"})):"",(0,r.Z)("button",{onClick:function(){return e.changeCategory(n.id)}},void 0,(0,r.Z)("h2",{},void 0,i)))}))}},{key:"render",value:function(){var t=this,e=this.state.selectedCategory,n=this.categoriesList(e),i=this.state.categories.find((function(t){return t.id===e})),s=this.state.filters.filter((function(t){return t.isActive})).map((function(t){return t.id})),o=null===i||void 0===i?void 0:i.items.slice(),c=s.length>0?null===o||void 0===o?void 0:o.filter((function(t){var e=t.tags.filter((function(t){return s.includes(t)}));return e.length>0&&e.length<=t.tags.length&&e.length===s.length})):o;return(0,r.Z)("div",{className:"app"},void 0,(0,r.Z)("nav",{className:"side-nav"},void 0,w||(w=(0,r.Z)("h1",{},void 0,"P.")),_||(_=(0,r.Z)("p",{},void 0,"categories")),(0,r.Z)("ul",{},void 0,n)),(0,r.Z)("div",{className:"main"},void 0,(0,r.Z)("header",{},void 0,(0,r.Z)(b,{tags:this.state.filters,onSwitch:function(e){return t.switchFilter(e)},onSwitchAll:function(){return t.switchDisplayAll()},all:this.state.isAllFilters}),(0,r.Z)(N,{orders:this.state.orders})),(0,r.Z)(Z,{items:c,title:null===i||void 0===i?void 0:i.title,onAdd:function(e){return t.addOrder(e)}})))}}]),i}(i.Component),x=n(379),B=n.n(x),F=n(795),T=n.n(F),P=n(695),I=n.n(P),E=n(216),D=n.n(E),L=n(424),j={styleTagTransform:function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}},setAttributes:function(t){var e=n.nc;e&&t.setAttribute("nonce",e)},insert:function(t){var e=I()("head");if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");e.appendChild(t)}};j.domAPI=T(),j.insertStyleElement=D();B()(L.Z,j);L.Z&&L.Z.locals&&L.Z.locals;s.render((0,r.Z)(O,{}),document.getElementById("root"))},424:(t,e,n)=>{"use strict";n.d(e,{Z:()=>s});var r=n(645),i=n.n(r)()((function(t){return t[1]}));i.push([t.id,"html {\r\n    width: 100vw;\r\n    height: 100vh;\r\n    overflow-y: hidden;\r\n    overflow-x: hidden;\r\n}\r\n\r\nbody {\r\n    padding: 0;\r\n    margin: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n",""]);const s=i}},t=>{"use strict";t.O(0,[578,357,510,905,532,190,805,410,183,698,279],(()=>{return e=899,t(t.s=e);var e}));t.O()}]);