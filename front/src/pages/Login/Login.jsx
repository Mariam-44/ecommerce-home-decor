import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { object, string } from "yup";
import { UserContext } from "../../components/context/User.context";

export default function Login({ isOpen, toggleLogin }) {
  const { setToken } = useContext(UserContext);
  const [incorrectError, setIncorrectError] = useState(null);

  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    username: string()
      .required("Name is required")
      .min(3, "Name can't be less than 3 characters")
      .max(16, "Name cannot be more than 16 characters"),
    password: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password should be at least 8 characters long with one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  async function sendDataToLogin(values) {
    try {
      const options = {
        url: "http://localhost:5236/api/Account/login", // Replace with your backend URL
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.token) {
        localStorage.setItem("token", data.token); // Store token in local storage
        setToken(data.token); // Update context
      }
    } catch (error) {
      setIncorrectError(error.response?.data?.message || "Login failed.");
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 z-20 bg-white shadow-lg rounded-l-xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-5 relative">
        <button
          onClick={toggleLogin}
          className="text-black text-2xl font-bold focus:outline-none absolute right-7"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="text-lg font-bold mb-4 mt-10">Log into your account</h2>
        <p className="text-sm text-zinc-400 font-semibold">
          Get a more personalized experience where you don't need to fill in
          your information every time.
        </p>
        <form className="space-y-9 pt-7" onSubmit={formik.handleSubmit}>
          <div>
            <label className="text-zinc-400 font-semibold text-sm">
              Username
            </label>
            <input
              type="text"
              className="form-control mt-2"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="username"
            />
            {formik.errors.username && formik.touched.username && (
              <p className="text-red-800 text-sm mt-2 ps-2">
                *{formik.errors.username}
              </p>
            )}
          </div>
          <div>
            <label className="text-zinc-400 font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              className="form-control mt-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-800 text-sm mt-2 ps-2">
                *{formik.errors.password}
              </p>
            )}
            {incorrectError && (
              <p className="text-red-800 text-sm mt-2 ps-2">
                *{incorrectError}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-full bg-black"
          >
            Login
          </button>
          <div className="flex gap-2 items-center justify-center pb-8">
            <div className="border-zinc-300 border w-20"></div>
            <p className="text-sm text-zinc-500">New here?</p>
            <div className="border-zinc-300 border w-20"></div>
          </div>
          <Link to="/signup">
            <button
              type="button"
              className="w-full text-black border border-zinc-500 py-2 rounded-full"
            >
              Create Account
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
