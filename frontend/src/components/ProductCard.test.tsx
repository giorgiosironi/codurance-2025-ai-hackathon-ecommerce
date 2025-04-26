import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "./ProductCard";

const mockProduct = {
  id: 1,
  name: "Test Product",
  price: 99.99,
  category: "Test Category",
  image: "test-image.jpg",
  brand: "Test Brand",
  year: 2024,
  season: "Spring",
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
  });

  it("calls onAddToCart when Add to Cart button is clicked", () => {
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
