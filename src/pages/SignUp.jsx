import React, { useContext, useState } from "react";
import { FaGoogle, FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { createUser, signUpWithGmail } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const phone = form.phone.value;

    try {
      const success = await createUser(email, password);

      if (success) {
        // Make a POST request to the server
        const response = await fetch("http://localhost:5000/register-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, phone }),
        });

        // Check if the request was successful
        if (response.ok) {
          alert("Sign up successful!");
          navigate(from, { replace: true });
        } else {
          throw new Error("Failed to register on the server.");
        }
      }
    } catch (error) {
      setErrorMessage("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <form onSubmit={handleSignUp}>
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Create an Account
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              id="email"
              type="email"
              placeholder="name@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              id="name"
              type="text"
              placeholder="Ex: John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              id="phone"
              type="text"
              placeholder="Ex: +14500000000"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              type="password"
              placeholder="******"
            />
            {errorMessage && (
              <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>
            <a href="/login"className="bg-slate-100 text-sm py-2 px-3 rounded">Already have an Account?</a>
          </div>
        </form>
        <hr className="my-4" />
        <p className="text-center mb-4">Sign up with Social</p>
        <div className="flex items-center justify-center space-x-4">
          <button
            className="bg-blue text-white p-3 rounded-full hover:bg-blue focus:outline-none"
            type="button"
            onClick={signUpWithGmail}
          >
            <FaGoogle />
          </button>
          <button
            className="bg-blue text-white p-3 rounded-full hover:bg-blue focus:outline-none"
            type="button"
          >
            <FaFacebookF />
          </button>
          <button
            className="bg-blue text-white p-3 rounded-full hover:bg-blue focus:outline-none"
            type="button"
          >
            <FaLinkedin />
          </button>
          <button
            className="bg-blue text-white p-3 rounded-full hover:bg-blue focus:outline-none"
            type="button"
          >
            <FaInstagram />
          </button>
        </div>
        <p className="text-center mt-4 text-gray-500 text-xs">
          &copy;2023 JobPortal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
