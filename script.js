const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('mealList');

searchButton.addEventListener('click', searchMeal);

function searchMeal() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
    }

    // Clear previous results
    mealList.innerHTML = '';

    // Fetch meals from TheMeal API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals === null) {
                alert('No meals found. Please try another search term.');
            } else {
                displayMeals(data.meals);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayMeals(meals) {
    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.classList.add('meal-item');
        mealItem.innerHTML = `
            <div class="meal-thumbnail">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="meal-details">
                <h2>${meal.strMeal}</h2>
                <p>${meal.strInstructions}</p>
            </div>
        `;
        mealList.appendChild(mealItem);
    });
}
