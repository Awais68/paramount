import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Dashboard from "./pages/DashBoard";
import Order from "./pages/order";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import OrderConfirmation from "./component/OrderConfirmation";
import Admin from "./Admin/Admin";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./Admin/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth">
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:isbn13" element={<ProductDetails />} />
            <Route path="order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="/admin" element={<Layout />}>
            <Route index element={<Admin />} />
          </Route>

          <Route path="*" element={<div>error</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
