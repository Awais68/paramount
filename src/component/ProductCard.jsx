import { Card, Col, Image, Button } from "antd";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const { addItemToCart, isItemAdded } = useCart();
  const foundItem = isItemAdded(item.isbn13);
  // console.log("itemIndex", foundItem?.id);
  const handleAddCart = () => {
    addItemToCart(item);
  };
  return (
    
    <Col sm={24} md={12} lg={8} xl={6}>
      <div className="rounded-3xl shadow-lg  h-full  my-2 border-2 bg-slate-100  flex flex-col items-center justify-center">
        <Image preview={false} src={item.image} height={350} width={350} />

        <div className="flex justify-between p-1 w-full text-center">
          <h1 className="text-center align-middle text-3xl flex-1">
            {item.title}
          </h1>
        </div>
        <div className="flex justify-between w-2/3">
          <h1 className="font-semibold text-lg">{item.price}</h1>
          <h1 className="font-semibold text-lg">{item.isbn13}</h1>
        </div>
        <Button
          disabled={foundItem ? true : false}
          onClick={() => handleAddCart()}
          className="my-2 rounded-2xl border hover:bg-blue-400"
        >
          Add To Cart
        </Button>
      </div>
    </Col>
  );
};

export default ProductCard;
