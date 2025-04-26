import React from "react";
import { Product } from "../api/productsApi";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 flex items-center justify-center">
        {/* Placeholder for product image */}
        <div className="text-gray-400 text-center p-4">
          <span className="text-4xl">🛍️</span>
          <p className="mt-2 text-sm">No image available</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.productDisplayName}
        </h3>
        <div className="text-sm text-gray-600 mb-2">
          <p>
            <span className="font-medium">Category:</span>{" "}
            {product.masterCategory} - {product.subCategory}
          </p>
          <p>
            <span className="font-medium">Type:</span> {product.articleType}
          </p>
          <p>
            <span className="font-medium">Color:</span> {product.baseColour}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {product.gender}
          </p>
          <p>
            <span className="font-medium">Season:</span> {product.season}
          </p>
          <p>
            <span className="font-medium">Year:</span> {product.year}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            {product.usage}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
