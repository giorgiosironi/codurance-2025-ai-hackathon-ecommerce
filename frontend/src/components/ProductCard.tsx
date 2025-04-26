import React, { useState } from "react";
import { Product, productsApi } from "../api/productsApi";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);

  // Generate a random pastel color for the product card background
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 95%)`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ backgroundColor: getRandomPastelColor() }}
    >
      <div className="aspect-w-1 aspect-h-1 w-full">
        {!imageError ? (
          <img
            src={productsApi.getProductImageUrl(product.id)}
            alt={product.productDisplayName}
            onError={handleImageError}
            className="w-full h-64 object-cover object-center"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <div className="text-center p-4">
              <span className="text-5xl">🛍️</span>
              <p className="mt-2 text-sm font-medium text-gray-600">
                No image available
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {product.productDisplayName}
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div>
            <span className="font-semibold">Category:</span>{" "}
            {product.masterCategory}
          </div>
          <div>
            <span className="font-semibold">Subcategory:</span>{" "}
            {product.subCategory}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {product.articleType}
          </div>
          <div>
            <span className="font-semibold">Color:</span> {product.baseColour}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {product.gender}
          </div>
          <div>
            <span className="font-semibold">Season:</span> {product.season}
          </div>
          <div>
            <span className="font-semibold">Year:</span> {product.year}
          </div>
          <div>
            <span className="font-semibold">Usage:</span> {product.usage}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            {product.usage}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-indigo-700 transition-colors duration-300 font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
