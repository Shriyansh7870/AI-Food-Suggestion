import React from "react";

function RecipeList({ recipes, setSelectedRecipe }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg hover:bg-gray-700"
          onClick={() => setSelectedRecipe(recipe)}
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="rounded-lg mb-2 w-full h-40 object-cover"
          />
          <h2 className="text-lg font-semibold text-blue-300">
            {recipe.strMeal}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
