import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuantityFromCart } =
    useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.price,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );
  return (
    <div className="container mx-auto my-5 ">
      <h1 className="font-medium text-3xl underline">Cart Items</h1>

      <div className="flex gap-5 my-5">
        <div className="font-grow flex flex-col  border p-4 justify-center">
          <h1>Total Quantity</h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl ">
            {totalQuantity}
          </h1>
        </div>
      </div>
      <div className="flex gap-5 my-5">
        <div className="font-grow flex flex-col  border p-4 justify-center">
          <h1>Total Amount </h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl ">
            ${Math.round(totalAmount)}
          </h1>
        </div>
      </div>
      {cartItems.map((data) => (
        <div
          key={data.isbn13}
          className="flex max-sm:flex-col item-center border my-4 mt-10" 
        >
          <Image src={data.image} height={400} width={400} />
          <div className="flex flex-col pl-10">
            <h1 className="font-medium text-xl mb-0">
              {data.title} {`(${data.price})`}
            </h1>
            <h1 className="font-normal text-lg mb-2 ">{data.total}</h1>
            <h1 className="font-normal text-lg mb-2 ">Price: {data.price}</h1>
            <div className="flex gap-3 items-center mt-1">
              <Button
                onClick={() => addItemToCart(data)}
                icon={<PlusOutlined />}
              ></Button>

              <h1 className="text-xl "> {data.quantity}</h1>
              <Button
                danger
                icon={<MinusOutlined />}
                onClick={() => lessQuantityFromCart(data.isbn13)}
                disabled={data.quantity === 1}
              ></Button>
            </div>

            <Button
              onClick={() => removeItemFromCart(data.isbn13)}
              danger
              className="w-40 my-4"
            >
              Remove item{" "}
            </Button>
          </div>
        </div>
      ))}

      <div className="font-grow flex flex-col  border p-4 justify-center">
        <Link to={"/checkout"}>Checkout</Link>
      </div>
    </div>
  );
}

export default Cart;
