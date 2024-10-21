import { createContext, useContext, useState, useEffect } from "react";

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from local storage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  console.log("context user==>", localStorage.getItem("user"));

  useEffect(() => {
    // Save user state to local storage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Clear local storage if user is null
    }
  }, [user]);

  return (
    <FirebaseContext.Provider value={{ user, setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  return useContext(FirebaseContext);
}
