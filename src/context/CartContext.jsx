import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("cartItems");
    // console.log("itemsFromStorage=>", itemsFromStorage);
    if (itemsFromStorage) {
      setCartItems([...JSON.parse(itemsFromStorage)]);
      setIsLoaded(true);
      useContext;
    }
  }, []);

  function addItemToCart(item) {
    const arr = cartItems;

    const itemIndex = cartItems.findIndex((data) => data.isbn13 == item.isbn13);
    if (itemIndex == -1) {
      arr.push({ ...item, quantity: 1 });
    } else {
      arr[itemIndex].quantity++;
    }
    setCartItems([...arr]);
  }

  function lessQuantityFromCart(isbn13) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.isbn13 == isbn13);
    arr[itemIndex].quantity--;
    setCartItems([...arr]);
  }

  function removeItemFromCart(isbn13) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.isbn13 == isbn13);
    arr.splice(itemIndex, 1);
    setCartItems([...arr]);
  }

  function isItemAdded(isbn13) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.isbn13 == isbn13);
    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
  }
  function getOrderDetails() {
    const totalAmount = cartItems.reduce(
      (total, obj) => total + obj.quantity * obj.price,
      0
    );
    const totalQuantity = cartItems.reduce(
      (total, obj) => total + obj.quantity,
      0
    );

    return { totalAmount, totalQuantity, cartItems };
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addItemToCart,
        lessQuantityFromCart,
        removeItemFromCart,
        isItemAdded,
        getOrderDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;

export function useCart() {
  return useContext(CartContext);
}
