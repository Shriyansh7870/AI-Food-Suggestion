const fetchRecipes = async (ingredients) => {
  try {
    // First, get the list of meals based on ingredients
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
    );
    const data = await response.json();
    const meals = data.meals || [];

    // For each meal, fetch full details by ID
    const detailedMeals = await Promise.all(
      meals.map(async (meal) => {
        const detailResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const detailData = await detailResponse.json();
        return detailData.meals[0]; // Return the detailed meal object
      })
    );

    console.log("Fetched detailed meals:", detailedMeals);
    return detailedMeals;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export default fetchRecipes;
