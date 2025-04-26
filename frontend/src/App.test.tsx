import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./store/slices/productsSlice";
import App from "./App";
import { vi } from "vitest";

// Mock the ProductCatalog component
vi.mock("./pages/ProductCatalog", () => ({
  ProductCatalog: () => (
    <div data-testid="product-catalog">ProductCatalog Component</div>
  ),
}));

describe("App", () => {
  it("renders the app with ProductCatalog", () => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId("product-catalog")).toBeInTheDocument();
  });
});
