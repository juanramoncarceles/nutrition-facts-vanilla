// INTERFACE ELEMENTS

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

// FOOD LIST ELEMENTS

const toggleFoodList = document.getElementById('toggleFoodList');
const foodList = document.getElementById('foodList');
const foodListItems = document.getElementById('foodListItems');


// Global variables to store a reference to the current and previous food item.
let currentItem = undefined;
let previousItem = undefined;

for (let i = 0; i < foodListItems.children.length; i++) {
  foodListItems.children[i].addEventListener('click', (e) => {
    if (foodList.dataset.active === "true") {
      // This only will happen the first time.
      if (previousItem === undefined) {
        currentItem = e.currentTarget;
        currentItem.classList.add('selected');
        for (let i = 0; i < foodListItems.children.length; i++) {
          // All items that have not been chosed set transition to 0.
          if (foodListItems.children[i].id !== currentItem.id)
            foodListItems.children[i].style.transitionDuration = "0s";
        }
      } else {
        currentItem = e.currentTarget;
        currentItem.classList.add('selected');
        previousItem.classList.remove('selected');
        for (let i = 0; i < foodListItems.children.length; i++) {
          // All items that have not been chosed and that are not the previous set transition to 0.
          if (foodListItems.children[i].id !== currentItem.id && foodListItems.children[i].id !== previousItem.id) {
            foodListItems.children[i].style.transitionDuration = "0s";
          } else {
            foodListItems.children[i].style.transitionDuration = "1s";
          }
        }
      }
      updateValues(currentItem.id);
      closeFoodList();
    }
  });
}


function closeFoodList() {
  foodList.dataset.active = "false";
  foodList.classList.add('disabled');
  foodList.classList.remove('active');
  toggleFoodList.getElementsByClassName('crossIcon')[0].style.display = "none";
  toggleFoodList.getElementsByClassName('mgIcon')[0].style.display = "unset";
}

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
    for (let i = 0; i < foodListItems.children.length; i++) {
      if (currentItem.id !== foodListItems.children[i].id) {
        foodListItems.children[i].style.transitionDuration = "0s";
      }
    }
  }
});

// const foodItems = [
//   "almendras",
//   "berenjena",
//   "calabacin",
//   "calamar-sepia",
//   "cebolla",
//   "champiñon",
//   "espinacas",
//   "filete de vaca",
//   "garbanzos",
//   "banana",
//   "peanut",
//   "habas",
//   "huevo",
//   "lentejas",
//   "mantequilla",
//   "miel",
//   "nueces",
//   "salmon",
//   "pollo"
// ]

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


const caloriesMax = 578; // this shouldnt be hardcoded

function updateValues(food) {
  // Change title
  const strWithoutHyphens = food.replace(/-/g, ' ');
  foodTitle.innerHTML = strWithoutHyphens.charAt(0).toUpperCase() + strWithoutHyphens.slice(1);
  // Object with the food item values
  const foodValues = nutritionFacts[food];
  // Update calories
  caloriesBar.style.strokeDasharray = `${578 * (foodValues.calories / caloriesMax)}px 578px`;
  caloriesValue.style.fill = (foodValues.calories > caloriesMax / 2) ? "#000" : "#fff";
  caloriesValue.innerHTML = `${foodValues.calories} Kcal.`;
  // Update carbs
  carbsBar.style.strokeDasharray = `${foodValues.carbohydrate} 100`;
  carbsValue.style.opacity = 0;
  setTimeout(() => {
    carbsValue.innerHTML = `${foodValues.carbohydrate}g`;
    carbsValue.style.opacity = 1;
  }, 500);
  // Update protein
  proteinsBar.style.strokeDasharray = `${foodValues.protein} 100`;
  proteinsValue.style.opacity = 0;
  setTimeout(() => {
    proteinsValue.innerHTML = `${foodValues.protein}g`;
    proteinsValue.style.opacity = 1;
  }, 500);
  // Update fats
  fatsBar.style.strokeDasharray = `${foodValues.fat} 100`;
  fatsValue.style.opacity = 0;
  setTimeout(() => {
    fatsValue.innerHTML = `${foodValues.fat}g`;
    fatsValue.style.opacity = 1;
  }, 500);
  // Update fiber
  fiberBar.style.strokeDasharray = `${foodValues.fiber} 100`;
  fiberValue.style.opacity = 0;
  setTimeout(() => {
    fiberValue.innerHTML = `${foodValues.fiber}g`;
    fiberValue.style.opacity = 1;
  }, 500);
}

// FORM FILTER FOOD

const foodListInput = document.getElementById('foodListInput');

foodListInput.addEventListener('input', (e) => {
  filterFood(e.target.value);
});

function filterFood(keyword) {
  const string = keyword.toLowerCase();
  for (let i = 0; i < foodListItems.children.length; i++) {
    if (!foodListItems.children[i].id.includes(string)) {
      foodListItems.children[i].style.display = "none";
    } else {
      foodListItems.children[i].style.display = "unset";
    }
  }
}