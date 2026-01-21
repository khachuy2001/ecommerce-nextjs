'use client';

import React, { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  description?: string;
}

interface ProductComparisonAIProps {
  products: Product[];
  onClose?: () => void;
}

interface ComparisonResult {
  comparison: string;
  bestValue: string;
  bestFeatures: string;
}

const ProductComparisonAI: React.FC<ProductComparisonAIProps> = ({
  products,
  onClose,
}) => {
  const [analysis, setAnalysis] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/compare-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error('Failed to compare products');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      console.error('Error:', err);
      setError('Unable to analyze products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-shop_dark_green">
          AI Product Comparison
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        )}
      </div>

      {/* Product List */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Comparing:</h3>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="flex justify-between items-center">
              <span className="text-gray-800">{product.name}</span>
              <span className="font-bold text-shop_dark_green">
                ${product.price}
                {product.discount && (
                  <span className="text-red-500 text-sm ml-2">
                    {product.discount}% off
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Analysis Section */}
      {analysis && (
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">Comparison</h3>
            <p className="text-blue-800 text-sm">{analysis.comparison}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-900 mb-2">Best Value</h3>
              <p className="text-green-800 text-sm">{analysis.bestValue}</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-900 mb-2">
                Best Features
              </h3>
              <p className="text-purple-800 text-sm">{analysis.bestFeatures}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCompare}
          disabled={loading}
          className="flex-1 bg-shop_dark_green text-white py-2 rounded-lg font-semibold hover:bg-shop_btn_dark_green disabled:opacity-50 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze with AI'}
        </button>
      </div>
    </div>
  );
};

export default ProductComparisonAI;
