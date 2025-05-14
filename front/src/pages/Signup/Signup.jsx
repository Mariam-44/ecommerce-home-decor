import Sign from '../../assets/images/sign7.jpg'; 
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup"; 

export default function SignUp() {
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const phoneRegex = /^\+20\d{10}$/;
  const [accountexistError, setAccountExistError] = useState(null);

  const validationSchema = object({
    username: string()
      .required("Name is required")
      .min(3, "Name can't be less than 3 characters")
      .max(16, "Name can not be more than 16 characters"),
    email: string()
      .required("Email is required")
      .email("Email is not valid"),
    password: string()
      .required("Password is required")
      .matches(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
    numberPhone: string()
      .required("Phone is required")
      .matches(phoneRegex, "Phone must be a valid Egyptian number"),
  });

  async function sendDataToRegister(values) {
    try {
      const payload = {
        Username: values.username,
        Email: values.email,
        Password: values.password,
        NumberPhone: values.numberPhone,
      };

      const { data } = await axios.post("http://localhost:5236/api/Account/register", payload);
      console.log(data);

      if (data.message === "User registered successfully with default role 'User'") {
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      if (error.response?.data && Array.isArray(error.response.data)) {
        const errorMessage = error.response.data.map(err => err.description).join(", ");
        setAccountExistError(errorMessage);
      } else if (typeof error.response?.data === "string") {
        setAccountExistError(error.response.data); // backend returned plain string like "Invalid email format."
      } else {
        setAccountExistError("An unknown error occurred.");
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      numberPhone: ""
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <section className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex w-[90%] max-w-4xl shadow bg-white rounded-md overflow-hidden">
        {/* Form Section */}
        <div className="signUp-content flex flex-col justify-center ps-12 pe-8 w-1/2 bg-white">
          <h2 className="font-bold text-3xl">Create account</h2>
          <span className="text-gray-400 text-[12px] pt-1">Join now to our home decoration website</span>

          <form className="space-y-4 pt-2 w-full" onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div className="username flex flex-col space-y-1">
              <label htmlFor="username" className="text-sm font-bold">Name*</label>
              <input
                className="sign-form py-1 bg-white placeholder:text-[12px]"
                type="text"
                name="username"
                placeholder="Enter your name"
                onBlur={formik.handleBlur}
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <p className="text-red-600 mt-1 text-sm">*{formik.errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="email flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-bold">Email Address*</label>
              <input
                className="sign-form py-1 bg-white placeholder:text-[12px]"
                type="text"
                name="email"
                placeholder="Enter your email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-600 mt-1 text-sm">*{formik.errors.email}</p>
              )}
              {accountexistError && (
                <p className="text-red-600 mt-1 text-sm">*{accountexistError}</p>
              )}
            </div>

            {/* Password */}
            <div className="password flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-bold">Password*</label>
              <input
                className="sign-form py-1 bg-white placeholder:text-[12px]"
                type="password"
                name="password"
                placeholder="Create your password"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-600 mt-1 text-sm">*{formik.errors.password}</p>
              )}
            </div>

            {/* Phone */}
            <div className="phone flex flex-col space-y-1">
              <label htmlFor="numberPhone" className="text-sm font-bold">Phone*</label>
              <input
                className="sign-form py-1 bg-white placeholder:text-[12px]"
                type="tel"
                name="numberPhone"
                placeholder="Enter your phone"
                onBlur={formik.handleBlur}
                value={formik.values.numberPhone}
                onChange={formik.handleChange}
              />
              {formik.errors.numberPhone && formik.touched.numberPhone && (
                <p className="text-red-600 mt-1 text-sm">*{formik.errors.numberPhone}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex pb-3 justify-center">
              <button type="submit" className="sign-btn py-2 text-sm">
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-1/2">
          <img src={Sign} alt="Sign Up" className="w-full min-h-96 object-cover" />
        </div>
      </div>
    </section>
  );
}
