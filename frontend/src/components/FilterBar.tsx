import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  setFilters,
  clearFilters,
  fetchProducts,
} from "../store/slices/productsSlice";
import { FilterParams } from "../api/productsApi";

export const FilterBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.products.filters);

  const [localFilters, setLocalFilters] = useState<FilterParams>(filters);

  // Update local filters when Redux filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...localFilters };

    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }

    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    dispatch(fetchProducts(localFilters));
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    dispatch(clearFilters());
    dispatch(fetchProducts());
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filter Products</h2>
        <button
          onClick={handleClearFilters}
          className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors"
        >
          Clear Filters
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="filter-group">
          <label
            htmlFor="masterCategory"
            className="block text-sm font-medium mb-1"
          >
            Category
          </label>
          <select
            id="masterCategory"
            value={localFilters.masterCategory || ""}
            onChange={(e) =>
              handleFilterChange("masterCategory", e.target.value)
            }
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            <option value="Apparel">Apparel</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Subcategory Filter */}
        <div className="filter-group">
          <label
            htmlFor="subCategory"
            className="block text-sm font-medium mb-1"
          >
            Subcategory
          </label>
          <select
            id="subCategory"
            value={localFilters.subCategory || ""}
            onChange={(e) => handleFilterChange("subCategory", e.target.value)}
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Subcategories</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Dress">Dress</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div className="filter-group">
          <label htmlFor="gender" className="block text-sm font-medium mb-1">
            Gender
          </label>
          <select
            id="gender"
            value={localFilters.gender || ""}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Genders</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Color Filter */}
        <div className="filter-group">
          <label
            htmlFor="baseColour"
            className="block text-sm font-medium mb-1"
          >
            Color
          </label>
          <select
            id="baseColour"
            value={localFilters.baseColour || ""}
            onChange={(e) => handleFilterChange("baseColour", e.target.value)}
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Colors</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
          </select>
        </div>

        {/* Season Filter */}
        <div className="filter-group">
          <label htmlFor="season" className="block text-sm font-medium mb-1">
            Season
          </label>
          <select
            id="season"
            value={localFilters.season || ""}
            onChange={(e) => handleFilterChange("season", e.target.value)}
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Seasons</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Fall">Fall</option>
          </select>
        </div>

        {/* Usage Filter */}
        <div className="filter-group">
          <label htmlFor="usage" className="block text-sm font-medium mb-1">
            Usage
          </label>
          <select
            id="usage"
            value={localFilters.usage || ""}
            onChange={(e) => handleFilterChange("usage", e.target.value)}
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Usages</option>
            <option value="Casual">Casual</option>
            <option value="Ethnic">Ethnic</option>
            <option value="Formal">Formal</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={applyFilters}
          className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
