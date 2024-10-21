import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Image } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useFirebase } from "../firebase/FirebaseContext";
import { getUserImageURL } from "../firebase/firebaseActions";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useFirebase();
  const { cartItems } = useContext(CartContext);
  const [imageUrl, setImageUrl] = useState();
  const logout = () => {
    setUser(null);
  };
  useEffect(() => {
    console.log("imageurl===> ", imageUrl);
    if (user) {
      // setImageUrl();
      getUserImageURL(user.uid).then((data) => setImageUrl(data));
    }
    return;
  }, [user]);

  return (
    <header className="text-gray-600 body-font border shadow-lg">
      <div className="container mx-auto flex flex-wrap p-3 max-sm:flex-col sm:flex-row items-center sm:justify-center">
        <Link to={"/"} className="mr-4">
          <Image
            height={50}
            width={50}
            className="rounded-full"
            preview={true}
            src={imageUrl}
          />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center ">
          <Link to="products" className="mr-5 hover:text-blue-500">
            Products
          </Link>
          <Link to="about" className="mr-5 hover:text-green-300">
            About
          </Link>
          <Link to="order" className="mr-5 hover:text-yellow-500">
            Orders
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Avatar size={50} icon={<UserOutlined />} src={imageUrl} />
              <Button onClick={() => logout()}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/auth/login")}>Login</Button>
              <Button onClick={() => navigate("/auth/signup")}>Signup</Button>
            </>
          )}
          <Link to={"/cart"}>
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined style={{ fontSize: 40 }} />
            </Badge>
          </Link>
          <img src={imageUrl} className="w-10 h-10 " alt="" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
