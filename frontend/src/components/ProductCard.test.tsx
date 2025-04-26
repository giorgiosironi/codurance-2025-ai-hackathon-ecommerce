import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "./ProductCard";

const mockProduct = {
  id: 1,
  productDisplayName: "Test Product",
  masterCategory: "Apparel",
  subCategory: "Topwear",
  articleType: "Tshirts",
  baseColour: "Blue",
  gender: "Men",
  season: "Summer",
  year: 2024,
  usage: "Casual",
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(
      screen.getByText(/Category: Apparel - Topwear/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Type: Tshirts/i)).toBeInTheDocument();
    expect(screen.getByText(/Color: Blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Men/i)).toBeInTheDocument();
    expect(screen.getByText(/Season: Summer/i)).toBeInTheDocument();
    expect(screen.getByText(/Year: 2024/i)).toBeInTheDocument();
    expect(screen.getByText("Casual")).toBeInTheDocument();
  });

  it("calls onAddToCart when Add to Cart button is clicked", () => {
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
