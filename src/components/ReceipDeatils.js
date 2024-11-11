import React, { useState } from "react";

function RecipeDetails({ recipe, close }) {
  const [isReading, setIsReading] = useState(false);

  if (!recipe) return null;

  const readRecipeAloud = () => {
    const {
      strInstructions,
      strMeal,
      strIngredient1,
      strIngredient2,
      strIngredient3,
    } = recipe;

    window.speechSynthesis.cancel();
    const recipeText = `
      Recipe for ${strMeal}. 
      Ingredients include: ${strIngredient1}, ${strIngredient2}, ${strIngredient3}, and more.
      Instructions: ${strInstructions}
    `;
    const utterance = new SpeechSynthesisUtterance(recipeText);
    window.speechSynthesis.speak(utterance);

  
    setIsReading(true);

    utterance.onend = () => {
      setIsReading(false);
    };
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  return (
    <div className="recipe-details">
      <h2 className="text-xl font-bold text-center mb-4">{recipe.strMeal}</h2>
      <p>
        <strong>Instructions:</strong> {recipe.strInstructions}
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul className="flex flex-row gap-2 flex-wrap">
        {Object.keys(recipe)
          .filter((key) => key.startsWith("strIngredient") && recipe[key])
          .map((key) => (
            <li key={key}>{recipe[key]}</li>
          ))}
      </ul>

      {/* YouTube video embed */}

      <div className="flex lg:justify-between gap-2  ">
      <button
        onClick={readRecipeAloud}
        disabled={isReading} 
        className="bg-white text-black px-4 py-2 rounded-lg mt-4"
      >
        🎤 Read Recipe Aloud
      </button>
      <button
        onClick={stopAudio}
        disabled={!isReading} // Disable if no audio is playing
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        🛑 Stop Audio
      </button>
      <button
        onClick={close}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Close
      </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
