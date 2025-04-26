import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import { FilterBar } from "../components/FilterBar";
import { CartButton } from "../components/CartButton";
import { CartModal } from "../components/CartModal";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { RootState, AppDispatch } from "../store/store";
import { Product } from "../api/productsApi";

export const ProductCatalog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"
            data-testid="loading-spinner"
          ></div>
          <p className="text-xl font-medium text-indigo-700">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Products
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-indigo-800">
              StyleDen Catalog
            </h1>
            <CartButton />
          </div>
          <p className="text-lg text-gray-600">
            Discover the latest fashion trends and styles
          </p>
        </header>

        {/* Filter Bar */}
        <FilterBar />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && status === "succeeded" && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">🛍️</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal />
    </div>
  );
};
