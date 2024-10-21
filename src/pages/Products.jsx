import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Pagination, Row, Select } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Pages from "../component/Pagination";

function Products() {
  const { cartItems, addItemToCart, isItemAdded } = useContext(CartContext);
  // console.log("cartItems==>", cartItems);

  const [products, setProducts] = useState([]);
  const [categories, chosenCategory] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.itbook.store/1.0/new")
      .then((res) => setProducts(res.data.books));
    // .then(console.log);
  }, []);

  useEffect(() => {
    searchBooks();
  }, [search]);

  const searchBooks = () => {
    if (search) {
      fetch(`https://api.itbook.store/1.0/search/${search}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("serch ka responce a rha hai", data);
          setProducts(data.books);
        });
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className="flex flex-col flex-wrap max-sm:justify-center max-sm:text-center gap-2 justify-between my-5">
          <h1 className=" font-medium text-3xl underline">
            All your derious IT Books Here !!!{" "}
          </h1>
          <div className="sm:flex sm:items-center max-sm:flex-col gap-2 px-4 h-10">
            <Input
              type="text"
              className={"flex-1 h-10"}
              placeholder="Search"
              className=""
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              className={"flex-1  h-10"}
              showSearch
              placeholder="Select Category"
              filtwerOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={categories.map((item) => {
                return { label: item.name, value: item.slug };
              })}
            />
            <Button icon={<SearchOutlined />} className="  flex-1 h-10">
              Search
            </Button>
          </div>
        </div>
        <Row gutter={16} justify={"center"}>
          {products?.map((data) => (
            <ProductCard key={data.isbn13} item={data} />
          ))}
        </Row>
        <div className="flex justify-center p-10 bg-gray-100 my-5 ">
          <Pagination
            onChange={(num) => {
              setSkip((num - 1) * 5);
            }}
            defaultCurrent={1}
            pageSize={5}
            total={total}
          />
        </div>
      </div>
    </>
  );
}

export default Products;
