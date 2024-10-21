import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebase/FirebaseContext";
import { createFirebaseAccount } from "../../firebase/firebaseActions";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageFile, setImageFile] = useState(null); // State for the image file

  const navigate = useNavigate();
  const { setUser } = useFirebase();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Set the image file state
    }
  };

  const handleSubmit = async (values) => {
    const formData = {
      firstName: name,
      lastName: "", // Add this field if you need it
      email,
      phoneNumber,
      password,
      confirmPassword,
      imageFile,
    };

    try {
      const user = await createFirebaseAccount(formData); // Removed `auth` parameter
      setUser(user); // Set user info after account creation
      navigate("/"); // Redirect after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle error (e.g., show message to user)
    }
  };

  return (
    <div className="my-5 flex justify-center w-full">
      <div className="sm:w-[350px]">
        <h1 className="font-medium text-3xl underline">Sign Up</h1>
        <Form onFinish={handleSubmit} className="mt-5">
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
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
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="imageFile"
            rules={[
              { required: true, message: "Please upload your profile image!" },
            ]}
          >
            <Input type="file" onChange={handleImageChange} accept="image/*" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-slate-600 text-white"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/auth/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
