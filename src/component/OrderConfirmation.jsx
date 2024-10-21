import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { useCart } from "../context/CartContext";

function OrderConfirmation() {
  const { getOrderDetails } = useCart();
  const { orderId } = useLocation().state || {};
  const { totalAmount, totalQuantity, cartItems } = getOrderDetails(); // Get order details

  return (
    <div className="container mx-auto my-5">
      <h1 className="font-medium text-3xl underline">Order Confirmation</h1>
      <h2 className="font-semibold text-xl mt-4">Thank you for your order!</h2>
      <p>
        Your order ID: <strong>#{orderId}</strong>
      </p>
      <div className="my-5">
        <h3 className="font-medium text-lg">Order Summary</h3>
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Amount: ${Math.round(totalAmount)}</p>
      </div>

      <h3 className="font-medium text-lg">Items Ordered:</h3>
      <ul className="list-disc pl-5">
        {cartItems.map((item) => (
          <li key={item.isbn13}>
            {item.title} - ${item.price} (Quantity: {item.quantity})
          </li>
        ))}
      </ul>

      <div className="flex justify-end my-5">
        <Link to={"/"}>
          <Button type="primary" className="w-40">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
