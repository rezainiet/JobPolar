import React, { useContext, useState } from "react";
import { FaFacebookF, FaGoogle, FaLinkedin, FaInstagram } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false); // Changed null to false
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await login(email, password);
      const user = result.user;
      console.log(user);
      alert("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage("Please provide valid email & password!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const result = await signUpWithGmail();
      const user = result.user;
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white  shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-center">Login to Your Account</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 border  focus:outline-none focus:ring focus:border-blue-300"
              id="email"
              type="email"
              placeholder="name@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border  focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              type="password"
              placeholder="****"
            />
            {errorMessage && (
              <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <span className="animate-spin text-sm">
                    <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="Loading..." width={30} />
                  </span>
                  <p className="ml-1">Signing in...</p>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
            <a
              className="text-blue-500 hover:text-blue-800 text-sm bg-gray-100 py-2 px-3 rounded-md transition duration-300 ease-in-out"
              href="sign-up"
            >
              Create Account
            </a>
          </div>

        </form>
        <hr className="my-4" />
        <p className="mb-5 cursor-pointer border inline-block py-2 px-3">Forgot Password ?</p>
        <p className="text-center mb-4">Sign up with Social</p>
        <div className="flex items-center justify-center space-x-4">
          <button
            className="bg-blue text-white p-3 rounded-full hover:bg-blue focus:outline-none"
            type="button"
            onClick={handleRegister}
          >
            <FaGoogle />
          </button>
          <button
            className="bg-blue text-white p-3 rounded-full hover:bg-orange focus:outline-none"
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
            className="bg-blue text-white p-3 rounded-full hover:bg-yellow focus:outline-none"
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

export default Login;
