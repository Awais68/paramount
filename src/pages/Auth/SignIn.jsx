import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useFirebase } from "../../firebase/FirebaseContext";
import { signInUser } from "../../firebase/firebaseActions";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useFirebase(); // Context to set user state
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const user = await signInUser(values.email, values.password);
      setUser(user); // Set user info after successful login
      navigate("/"); // Redirect after successful sign-in
    } catch (error) {
      console.error("Sign-in error:", error.message);
      // Handle error (e.g., show message to user)
    }
  };

  return (
    <div className="my-5 flex justify-center w-full">
      <div className="sm:w-[350px]">
        <h1 className="font-medium text-3xl underline">Sign In</h1>
        <Form onFinish={handleSubmit} className="mt-5">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-slate-600 text-white"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/auth/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
