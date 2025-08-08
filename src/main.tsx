// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Correct relative import
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { FormBuilderProvider } from "./context/FormBuilderContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <FormBuilderProvider>
          <App />
        </FormBuilderProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
