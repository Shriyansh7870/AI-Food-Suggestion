import React from "react";

function SearchBar({ ingredients, setIngredients, onSearch, onVoiceInput }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full">
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (e.g., chicken, rice)"
        className="flex-grow p-2 border rounded-lg text-black"
      />
      <div className="flex gap-4 mt-4 sm:mt-0 sm:flex-row sm:w-auto w-full">
        <button
          onClick={onSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Search
        </button>
        <button
          onClick={onVoiceInput}
          className="bg-white text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          aria-label="Voice Input"
        >
          🎙️
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
