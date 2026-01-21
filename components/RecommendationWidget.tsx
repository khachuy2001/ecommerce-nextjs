'use client';

import React, { useState } from 'react';
import ProductRecommendations from './ProductRecommendations';

const RecommendationWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [budget, setBudget] = useState<number | undefined>();
  const [category, setCategory] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userQuery || budget || category) {
      setIsOpen(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded-lg shadow-md mb-6 border border-shop_light_green"
      >
        <h2 className="text-2xl font-bold text-shop_dark_green mb-4">
          🤖 Find Perfect Products with AI
        </h2>

        <div className="space-y-4">
          {/* Query Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What are you looking for?
            </label>
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g., 'Best laptop for gaming under $1000'"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shop_dark_green"
            />
          </div>

          {/* Budget Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Budget (Optional)
            </label>
            <input
              type="number"
              value={budget || ''}
              onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Max price in $"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shop_dark_green"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category (Optional)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shop_dark_green"
            >
              <option value="">All Categories</option>
              <option value="gadget">Gadgets</option>
              <option value="appliances">Appliances</option>
              <option value="refrigerators">Refrigerators</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-shop_dark_green text-white py-3 rounded-lg font-bold hover:bg-shop_btn_dark_green transition-colors text-lg"
          >
            Get AI Recommendations
          </button>
        </div>
      </form>

      {/* Recommendations Display */}
      {isOpen && (
        <ProductRecommendations
          userQuery={userQuery}
          budget={budget}
          category={category}
          title="Your Personalized Recommendations"
        />
      )}
    </div>
  );
};

export default RecommendationWidget;
