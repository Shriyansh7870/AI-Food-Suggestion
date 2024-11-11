import React from "react";

function Filters({ filters, setFilters }) {
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex gap-4 mb-4 text-black">
      <select
        value={filters.time || ""}
        onChange={(e) => handleFilterChange("time", e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="">Select Time</option>
        <option value="quick">Quick (Under 30 min)</option>
      </select>

      <select
        value={filters.mood || ""}
        onChange={(e) => handleFilterChange("mood", e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="">Select Mood</option>
        <option value="comfort">Comfort Food</option>
        <option value="healthy">Healthy</option>
      </select>
    </div>
  );
}

export default Filters;
