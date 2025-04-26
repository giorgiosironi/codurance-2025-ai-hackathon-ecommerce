import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import { fetchProducts } from "../store/slices/productsSlice";
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
    // TODO: Implement cart functionality
    console.log("Adding to cart:", product);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
          data-testid="loading-spinner"
        ></div>
      </div>
    );
  }

  if (status === "failed") {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        StyleDen Catalog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
