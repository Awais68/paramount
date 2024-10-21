import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CartContextProvider from "./context/CartContext.jsx";
import { FirebaseContextProvider } from "./firebase/FirebaseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <FirebaseContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </FirebaseContextProvider>
  </StrictMode>
);
