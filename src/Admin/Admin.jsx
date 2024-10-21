import { useState } from "react";
import { FaUser } from "react-icons/fa"; // User icon
import { IoChevronDown, IoChevronUp } from "react-icons/io5"; // Chevron icons
import { AiOutlineClose } from "react-icons/ai"; // Close (X) icon

// Mock data for users and orders
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    orders: [
      { id: 101, product: "Laptop", price: 999 },
      { id: 102, product: "Mouse", price: 29 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    orders: [{ id: 201, product: "Keyboard", price: 79 }],
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    orders: [
      { id: 301, product: "Monitor", price: 299 },
      { id: 302, product: "Headphones", price: 99 },
      { id: 303, product: "Webcam", price: 59 },
    ],
  },
];

export default function Admin() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <ul className="divide-y divide-gray-200">
            {mockUsers?.map((user) => (
              <li key={user.id} className="py-4">
                <button
                  onClick={() => handleUserClick(user)}
                  className="w-full text-left flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition duration-150 ease-in-out"
                >
                  <div className="flex items-center">
                    <FaUser className="h-6 w-6 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                  {selectedUser === user ? (
                    <IoChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <IoChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {selectedUser === user && showUserDetails && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">User Details</h3>
                      <button
                        onClick={() => setShowUserDetails(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <AiOutlineClose className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mb-2">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <h4 className="font-semibold mt-4 mb-2">Orders:</h4>
                    <ul className="space-y-2">
                      {user.orders.map((order) => (
                        <li
                          key={order.id}
                          className="bg-white p-3 rounded-md shadow-sm"
                        >
                          <p>
                            <strong>Order ID:</strong> {order.id}
                          </p>
                          <p>
                            <strong>Product:</strong> {order.product}
                          </p>
                          <p>
                            <strong>Price:</strong> ${order.price}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
