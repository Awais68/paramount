import { useContext, useId } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";

import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.price,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    // const orderId = useId; // Generate a unique order ID
    navigate("/order-confirmation");
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="font-medium text-3xl underline">Checkout</h1>

      <div className="flex gap-5 my-5">
        <div className="font-grow flex flex-col border p-4 justify-center">
          <h1>Total Quantity</h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl ">
            {totalQuantity}
          </h1>
        </div>
        <div className="font-grow flex flex-col border p-4 justify-center">
          <h1>Total Amount</h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl ">
            ${Math.round(totalAmount)}
          </h1>
        </div>
      </div>

      {cartItems.map((data) => (
        <div
          key={data.isbn13}
          className="flex max-sm:flex-col item-center border my-2 p-3"
        >
          <Image src={data.image} height={400} width={350} />
          <div className="flex flex-col pl-5">
            <h1 className="font-medium text-xl mb-2">
              {data.title} {`(${data.subtitle})`}
            </h1>
            <h1 className="font-normal text-lg mb-2">{data.subtitle}</h1>
            <h1 className="font-normal text-lg mb-2">Price: ${data.price}</h1>
          </div>
        </div>
      ))}

      <div className="flex justify-end my-5">
        <Button type="primary" className="w-40" onClick={handleConfirmOrder}>
          Confirm Order
        </Button>
      </div>
    </div>
  );
}

export default Checkout;
