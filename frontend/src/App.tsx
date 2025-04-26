import { Provider } from "react-redux";
import { store } from "./store/store";
import { ProductCatalog } from "./pages/ProductCatalog";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <ProductCatalog />
      </div>
    </Provider>
  );
}

export default App;
