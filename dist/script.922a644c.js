parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"nq4D":[function(require,module,exports) {
var e=void 0,t=document.getElementById("foodTitle"),a=document.getElementById("selectedFoodImage"),n=document.getElementById("caloriesBar"),c=document.getElementById("caloriesValue"),s=document.getElementById("carbsBar"),i=document.getElementById("carbsValue"),o=document.getElementById("proteinsBar"),r=document.getElementById("proteinsValue"),d=document.getElementById("fatsBar"),l=document.getElementById("fatsValue"),m=document.getElementById("fiberBar"),u=document.getElementById("fiberValue"),f=578;function y(e){t.innerText=e.dataset.name;var a=T[e.id];n.style.strokeDasharray="".concat(a.calories/f*578,"px 578px"),c.style.fill=a.calories>f/2?"#000":"#fff",c.innerHTML="".concat(a.calories," Kcal.");function y(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;e.style.strokeDasharray="".concat(a," 100"),t.style.opacity=0,setTimeout(function(){t.innerHTML="".concat(a,"g"),t.style.opacity=1},n)}y(s,i,a.carbohydrate,500),y(o,r,a.protein,500),y(d,l,a.fat,500),y(m,u,a.fiber,500)}var v=document.getElementById("toggleFoodList"),g=document.getElementById("foodList"),L=document.getElementById("foodListItems");function b(){g.dataset.active="false",g.classList.add("disabled"),g.classList.remove("active"),a.classList.add("active"),v.classList.remove("active")}function B(){g.dataset.active="true",g.classList.remove("disabled"),g.classList.add("active"),a.classList.remove("transition","active"),v.classList.add("active")}function E(t){t.classList.contains("selected")||(e&&e.classList.remove("selected"),(e=t).classList.add("selected"),a.href.baseVal=e.src,a.classList.add("transition"),b(),y(e))}for(var I=0;I<L.children.length;I++)L.children[I].addEventListener("click",function(e){return E(e.currentTarget)});v.addEventListener("click",function(){"false"===g.dataset.active?B():b()});var h=document.getElementById("foodListInput");function p(e){for(var t=e.toLowerCase(),a=0;a<L.children.length;a++)L.children[a].dataset.name.toLowerCase().includes(t)?L.children[a].style.display="unset":L.children[a].style.display="none"}h.addEventListener("input",function(e){p(e.target.value)});var T={avocado:{calories:223,carbohydrate:2,protein:4,fat:22,fiber:3},banana:{calories:121,carbohydrate:31.8,protein:1.3,fat:.37,fiber:2.3},broccoli:{calories:23,carbohydrate:2,protein:3,fat:0,fiber:4},cowMilk:{calories:60,carbohydrate:5,protein:3,fat:3,fiber:0},peanuts:{calories:570,carbohydrate:9,protein:24,fat:49,fiber:8}};
},{}]},{},["nq4D"], null)
//# sourceMappingURL=/script.922a644c.js.map