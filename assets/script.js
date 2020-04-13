///////////////////////////////////////////////////////////////////////////////
/////////////////////////// GLOBAL PROPERTIES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Store a reference to the current and previous food item.
let currentItem = undefined;
let previousItem = undefined;


///////////////////////////////////////////////////////////////////////////////
///////////////////////////// THE FOOD LIST ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// DOM elements reference.
const toggleFoodList = document.getElementById('toggleFoodList');
const foodList = document.getElementById('foodList');
const foodListItems = document.getElementById('foodListItems');

// Food item click handler setup.
for (let i = 0; i < foodListItems.children.length; i++) {
  foodListItems.children[i].addEventListener('click', (e) => {
    if (foodList.dataset.active === "true" && !e.currentTarget.classList.contains('selected')) {
      if (previousItem === undefined) { // This only will happen the first time an item is selected.
        currentItem = e.currentTarget;
        currentItem.classList.add('selected');
      } else {
        currentItem = e.currentTarget;
        currentItem.classList.add('selected');
        previousItem.classList.remove('selected');
      }
      updateValues(currentItem);
      closeFoodList();
    }
  });
}

/**
 * Closes the food list.
 */
function closeFoodList() {
  foodList.dataset.active = "false";
  foodList.classList.add('disabled');
  foodList.classList.remove('active');
  toggleFoodList.getElementsByClassName('crossIcon')[0].style.display = "none";
  toggleFoodList.getElementsByClassName('mgIcon')[0].style.display = "unset";
}

// Food list toggle click handler setup.
toggleFoodList.addEventListener('click', () => {
  if (foodList.dataset.active === "false") {
    if (currentItem) previousItem = currentItem;
    foodList.dataset.active = "true";
    foodList.classList.remove('disabled');
    foodList.classList.add('active');
    toggleFoodList.getElementsByClassName('mgIcon')[0].style.display = "none";
    toggleFoodList.getElementsByClassName('crossIcon')[0].style.display = "unset";
  } else {
    closeFoodList();
  }
});


///////////////////////////////////////////////////////////////////////////////
////////////////////////////// UI STRUCTURE ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// DOM elements reference.
const foodTitle = document.getElementById('foodTitle');
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
  const foodValues = nutritionFacts[foodItem.id];
  // Update calories
  caloriesBar.style.strokeDasharray = `${578 * (foodValues.calories / caloriesMax)}px 578px`;
  caloriesValue.style.fill = (foodValues.calories > caloriesMax / 2) ? "#000" : "#fff";
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

foodListInput.addEventListener('input', (e) => {
  filterFood(e.target.value);
});

function filterFood(keyword) {
  const string = keyword.toLowerCase();
  for (let i = 0; i < foodListItems.children.length; i++) {
    if (!foodListItems.children[i].dataset.name.toLowerCase().includes(string)) {
      foodListItems.children[i].style.display = "none";
    } else {
      foodListItems.children[i].style.display = "unset";
    }
  }
}


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
}

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