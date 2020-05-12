///////////////////////////////////////////////////////////////////////////////
/////////////////////////// GLOBAL PROPERTIES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Store a reference to the current food item.
let currentItem = undefined;

///////////////////////////////////////////////////////////////////////////////
////////////////////////////// UI STRUCTURE ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// DOM elements reference.
const foodTitle = document.getElementById('foodTitle');
const foodImage = document.getElementById('selectedFoodImage');
const caloriesBar = document.getElementById('caloriesBar');
const caloriesValue = document.getElementById('caloriesValue');
const carbsBar = document.getElementById('carbsBar');
const carbsValue = document.getElementById('carbsValue');
const proteinsBar = document.getElementById('proteinsBar');
const proteinsValue = document.getElementById('proteinsValue');
const fatsBar = document.getElementById('fatsBar');
const fatsValue = document.getElementById('fatsValue');
const fiberBar = document.getElementById('fiberBar');
const fiberValue = document.getElementById('fiberValue');

const caloriesMax = 578; // TODO: this shouldnt be hardcoded

/**
 * Updates the UI to show the values of the food item provided.
 * @param {HTMLElement} foodItem The image element that represents the item.
 */
function updateValues(foodItem) {
  // Set food title
  foodTitle.innerText = foodItem.dataset.name;
  // Object with the food item values
  const foodValues = nutritionFacts[foodItem.id]; // eslint-disable-line no-use-before-define
  // Update calories
  caloriesBar.style.strokeDasharray = `${578 * (foodValues.calories / caloriesMax)}px 578px`;
  caloriesValue.style.fill = (foodValues.calories > caloriesMax / 2) ? '#000' : '#fff';
  caloriesValue.innerHTML = `${foodValues.calories} Kcal.`;

  const updateTextDelay = 500;

  /**
   * Updates a bar element of the UI.
   * @param {SVGElement} barElement 
   * @param {SVGElement} textElement 
   * @param {number} value Value should be between 0 and 100.
   * @param {number} updateTextDelay 
   */
  function updateBar(barElement, textElement, value, updateTextDelay = 0) {
    barElement.style.strokeDasharray = `${value} 100`;
    textElement.style.opacity = 0;
    setTimeout(() => {
      textElement.innerHTML = `${value}g`;
      textElement.style.opacity = 1;
    }, updateTextDelay);
  }

  // Update carbs.
  updateBar(carbsBar, carbsValue, foodValues.carbohydrate, updateTextDelay);
  // Update proteins.
  updateBar(proteinsBar, proteinsValue, foodValues.protein, updateTextDelay);
  // Update fats.
  updateBar(fatsBar, fatsValue, foodValues.fat, updateTextDelay);
  // Update fiber.
  updateBar(fiberBar, fiberValue, foodValues.fiber, updateTextDelay);
}


///////////////////////////////////////////////////////////////////////////////
////////////////////////// FILTER FOOD FORM ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// DOM elements reference.
const foodListInput = document.getElementById('foodListInput');
const foodListItems = document.getElementById('foodListItems');

/**
 * Hiddes all the foodListItems children that doesn't include the keyword on
 * the data-name.
 * @param {string} keyword 
 */
function filterFood(keyword) {
  const string = keyword.toLowerCase();
  for (let i = 0; i < foodListItems.children.length; i++) {
    if (!foodListItems.children[i].dataset.name.toLowerCase().includes(string)) {
      foodListItems.children[i].style.display = 'none';
    } else {
      foodListItems.children[i].style.display = 'unset';
    }
  }
}

foodListInput.addEventListener('input', (e) => {
  filterFood(e.target.value);
});

/**
 * Clears the filter input.
 */
function clearFilter() {
  foodListInput.value = '';
  foodListInput.dispatchEvent(new Event('input'));
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////// THE FOOD LIST ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// DOM elements reference.
const toggleFoodList = document.getElementById('toggleFoodList');
const foodList = document.getElementById('foodList');

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
}

// Food items click handler.
for (let i = 0; i < foodListItems.children.length; i++) {
  foodListItems.children[i].addEventListener('click', e => selectFoodItem(e.currentTarget));
}

// Food list toggle handler.
toggleFoodList.addEventListener('click', () => {
  if (foodList.dataset.active === 'false')
    openFoodList();
  else
    closeFoodList();
});


///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// FOOD DATA ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Names should match with the ids of the food items.
const nutritionFacts = {
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
};

// TODO
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