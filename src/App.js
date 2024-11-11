import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import RecipeList from "./components/ReceipeList";
import fetchRecipes from "./utils/api";
import RecipeDetails from "./components/ReceipDeatils";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [filters, setFilters] = useState({ time: null, mood: null });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleSearch = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients to search for recipes.");
      setRecipes([]);
      return;
    }
    setError("");
    const results = await fetchRecipes(ingredients);
    if (results.length === 0) {
      setError("No recipes found with the entered ingredients.");
    }
    setRecipes(results);
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    recognition.start();

    recognition.onresult = (event) => {
      const spokenIngredients = event.results[0][0].transcript;
      setIngredients(spokenIngredients);
      handleSearch();
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
      setError("There was an error with voice recognition. Please try again.");
    };
  };

  return (
    <div className="lg:p-6 sm:pt-2 bg-gradient-to-br from-gray-900 to-gray-700 text-white min-h-screen font-inter flex flex-col items-center">
      <div className="w-full max-w-4xl glass-effect lg:p-8 p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-wide text-blue-400">
          Taylor's Cooking Assistant
        </h1>
        <SearchBar
          ingredients={ingredients}
          setIngredients={setIngredients}
          onSearch={handleSearch}
          onVoiceInput={handleVoiceInput}
        />
        <Filters filters={filters} setFilters={setFilters} />
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        {/* Render RecipeList for recipes */}
        <RecipeList recipes={recipes} setSelectedRecipe={setSelectedRecipe} />

        {/* Popup Modal for Recipe Details */}
        {selectedRecipe && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50"
            onClick={() => setSelectedRecipe(null)}
          >
            <div
              className="bg-gray-800 p-6 rounded-lg shadow-lg w-full h-full sm:w-full md:w-full lg:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-center text-4xl mt-4">Full Deatils of Ingredients</h2>
              {selectedRecipe?.strYoutube && (
                <div className="mt-4 w-full h-[350px] rounded-lg mb-10">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${
                      selectedRecipe.strYoutube.split("=")[1]
                    }`}
                    title="Recipe Video"
                    frameBorder="10"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {selectedRecipe?.strMeal ? (
                <RecipeDetails
                  recipe={selectedRecipe}
                  close={() => setSelectedRecipe(null)}
                />
              ) : (
                <p className="text-center text-red-400">
                  Recipe details not found.
                </p>
              )}

              {/* Render Video if `strYoutube` is available */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
