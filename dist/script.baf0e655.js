// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/script.js":[function(require,module,exports) {
///////////////////////////////////////////////////////////////////////////////
/////////////////////////// GLOBAL PROPERTIES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Store a reference to the current food item.
var currentItem = undefined; ///////////////////////////////////////////////////////////////////////////////
////////////////////////////// UI STRUCTURE ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// DOM elements reference.

var foodTitle = document.getElementById('foodTitle');
var foodImage = document.getElementById('selectedFoodImage');
var caloriesBar = document.getElementById('caloriesBar');
var caloriesValue = document.getElementById('caloriesValue');
var carbsBar = document.getElementById('carbsBar');
var carbsValue = document.getElementById('carbsValue');
var proteinsBar = document.getElementById('proteinsBar');
var proteinsValue = document.getElementById('proteinsValue');
var fatsBar = document.getElementById('fatsBar');
var fatsValue = document.getElementById('fatsValue');
var fiberBar = document.getElementById('fiberBar');
var fiberValue = document.getElementById('fiberValue');
var caloriesMax = 578; // TODO: this shouldnt be hardcoded

/**
 * Updates the UI to show the values of the food item provided.
 * @param {HTMLElement} foodItem The image element that represents the item.
 */

function updateValues(foodItem) {
  // Set food title
  foodTitle.innerText = foodItem.dataset.name; // Object with the food item values

  var foodValues = nutritionFacts[foodItem.id]; // eslint-disable-line no-use-before-define
  // Update calories

  caloriesBar.style.strokeDasharray = "".concat(578 * (foodValues.calories / caloriesMax), "px 578px");
  caloriesValue.style.fill = foodValues.calories > caloriesMax / 2 ? '#000' : '#fff';
  caloriesValue.innerHTML = "".concat(foodValues.calories, " Kcal.");
  var updateTextDelay = 500;
  /**
   * Updates a bar element of the UI.
   * @param {SVGElement} barElement 
   * @param {SVGElement} textElement 
   * @param {number} value Value should be between 0 and 100.
   * @param {number} updateTextDelay 
   */

  function updateBar(barElement, textElement, value) {
    var updateTextDelay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    barElement.style.strokeDasharray = "".concat(value, " 100");
    textElement.style.opacity = 0;
    setTimeout(function () {
      textElement.innerHTML = "".concat(value, "g");
      textElement.style.opacity = 1;
    }, updateTextDelay);
  } // Update carbs.


  updateBar(carbsBar, carbsValue, foodValues.carbohydrate, updateTextDelay); // Update proteins.

  updateBar(proteinsBar, proteinsValue, foodValues.protein, updateTextDelay); // Update fats.

  updateBar(fatsBar, fatsValue, foodValues.fat, updateTextDelay); // Update fiber.

  updateBar(fiberBar, fiberValue, foodValues.fiber, updateTextDelay);
} ///////////////////////////////////////////////////////////////////////////////
////////////////////////// FILTER FOOD FORM ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// DOM elements reference.


var foodListInput = document.getElementById('foodListInput');
var foodListItems = document.getElementById('foodListItems');
/**
 * Hiddes all the foodListItems children that doesn't include the keyword on
 * the data-name.
 * @param {string} keyword 
 */

function filterFood(keyword) {
  var string = keyword.toLowerCase();

  for (var i = 0; i < foodListItems.children.length; i++) {
    if (!foodListItems.children[i].dataset.name.toLowerCase().includes(string)) {
      foodListItems.children[i].style.display = 'none';
    } else {
      foodListItems.children[i].style.display = 'unset';
    }
  }
}

foodListInput.addEventListener('input', function (e) {
  filterFood(e.target.value);
});
/**
 * Clears the filter input.
 */

function clearFilter() {
  foodListInput.value = '';
  foodListInput.dispatchEvent(new Event('input'));
} ///////////////////////////////////////////////////////////////////////////////
///////////////////////////// THE FOOD LIST ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// DOM elements reference.


var toggleFoodList = document.getElementById('toggleFoodList');
var foodList = document.getElementById('foodList');
/**
 * Closes the food list.
 */

function closeFoodList() {
  foodList.dataset.active = 'false';
  foodList.classList.add('disabled');
  foodList.classList.remove('active');
  foodImage.classList.add('active');
  toggleFoodList.classList.remove('active');
  clearFilter();
}
/**
 * Opens the food list.
 */


function openFoodList() {
  foodList.dataset.active = 'true';
  foodList.classList.remove('disabled');
  foodList.classList.add('active');
  foodImage.classList.remove('transition', 'active');
  toggleFoodList.classList.add('active');
}
/**
 * If the item is not already seleceted it selects it, closes the food list and updates the UI values.
 * @param {HTMLImageElement} item A food item in the list.
 */


function selectFoodItem(item) {
  if (!item.classList.contains('selected')) {
    if (currentItem) currentItem.classList.remove('selected');
    currentItem = item;
    currentItem.classList.add('selected');
    foodImage.href.baseVal = currentItem.src;
    foodImage.classList.add('transition');
    closeFoodList();
    updateValues(currentItem);
  }
} // Food items click handler.


for (var i = 0; i < foodListItems.children.length; i++) {
  foodListItems.children[i].addEventListener('click', function (e) {
    return selectFoodItem(e.currentTarget);
  });
} // Food list toggle handler.


toggleFoodList.addEventListener('click', function () {
  if (foodList.dataset.active === 'false') openFoodList();else closeFoodList();
}); ///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// FOOD DATA ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Names should match with the ids of the food items.

var nutritionFacts = {
  avocado: {
    calories: 223,
    carbohydrate: 2,
    protein: 4,
    fat: 22,
    fiber: 3
  },
  banana: {
    calories: 121,
    carbohydrate: 31.8,
    protein: 1.3,
    fat: 0.37,
    fiber: 2.3
  },
  broccoli: {
    calories: 23,
    carbohydrate: 2,
    protein: 3,
    fat: 0,
    fiber: 4
  },
  cowMilk: {
    calories: 60,
    carbohydrate: 5,
    protein: 3,
    fat: 3,
    fiber: 0
  },
  peanuts: {
    calories: 570,
    carbohydrate: 9,
    protein: 24,
    fat: 49,
    fiber: 8
  }
}; // TODO
//   almond
//   squid
//   onion
//   bread
//   mushroom
//   spinach
//   chickpea
//   beans
//   egg
//   butter
//   salmon
//   honey
//   walnut
//   cow steak
//   chicken
},{}],"../../../../../../home/juanramon/.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60994" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../home/juanramon/.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/script.js"], null)
//# sourceMappingURL=/script.baf0e655.js.map