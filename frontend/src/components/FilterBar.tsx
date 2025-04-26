import React from "react";

export const FilterBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
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
            htmlFor="subcategory"
            className="block text-sm font-medium mb-1"
          >
            Subcategory
          </label>
          <select
            id="subcategory"
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
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Color
          </label>
          <select
            id="color"
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
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Usage</option>
            <option value="Casual">Casual</option>
            <option value="Ethnic">Ethnic</option>
            <option value="Formal">Formal</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Year Filter */}
        <div className="filter-group">
          <label htmlFor="year" className="block text-sm font-medium mb-1">
            Year
          </label>
          <select
            id="year"
            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className="filter-group flex items-end">
          <button className="w-full bg-white text-indigo-600 font-bold py-2 px-4 rounded-md hover:bg-indigo-100 transition-colors duration-300">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
