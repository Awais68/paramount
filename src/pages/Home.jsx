import { Button, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";

function Home() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.itbook.store/1.0/new")
      .then((res) => setProduct(res.data.books));
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between my-10">
        <h1 className="text-3xl">Find your Best Books</h1>
        <Link to={"/products"}>
          <Button>See All</Button>
        </Link>
      </div>

      <Row gutter={16} justify={"center"}>
        {product?.map((data) => (
          // console.log("data=>", data),
          <ProductCard key={data.isbn13} item={data} />
        ))}
      </Row>
    </div>
  );
}

export default Home;
