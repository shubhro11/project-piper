import { Eye, EyeOff, Lock, Mail, Type } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import GoogleSvg from "../assets/googlelogo.svg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const SubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className='min-h-screen w-full flex flex-col items-center justify-center'>
        <div className='w-[90%] sm:w-110 md:w-120 px-4 sm:px-8 py-12 bg-white/6 border border-white/10 rounded-3xl'>
          <form
            onSubmit={handleSubmit(SubmitHandler)}
            className='w-full flex flex-col items-center justify-center gap-4'
          >
            <div>
              <h2 className='text-3xl text-center text-gray-200 font-medium'>
                Create an Account
              </h2>
              <p className='text-sm text-center text-gray-300/60 mt-1'>
                Fill in the details below to create your account
              </p>
            </div>

            <button
              type='button'
              className='w-full gap-3 leading-none text-gray-200 bg-gray-500/50 hover:bg-gray-600/50 active:bg-gray-700/50 mt-1 flex items-center justify-center h-12 rounded-full'
            >
              <img src={GoogleSvg} alt='googleLogo' className='w-5 h-5' />
              <span className='text-sm'>Sign Up with Google</span>
            </button>

            <div className='flex items-center gap-4 w-full my-1.5'>
              <div className='w-full h-px bg-gray-300/60'></div>

              <p className='w-full text-nowrap text-sm text-gray-300/60'>
                or sign in with email
              </p>

              <div className='w-full h-px bg-gray-300/60'></div>
            </div>

            <div className='w-full flex flex-col gap-2.5'>
              {/* FirstName Input */}
              <div className='w-full flex flex-col gap-1'>
                <div
                  className={`flex items-center w-full bg-white/5 border ${errors.firstName ? "border-red-400" : "border-white/10 focus-within:border-indigo-400/60"} h-12 rounded-full overflow-hidden px-4 gap-3`}
                >
                  <span>
                    <Type
                      strokeWidth={1.75}
                      size={20}
                      className={`${errors.firstName ? "text-red-400" : "text-gray-500"}`}
                    />
                  </span>
                  <input
                    type='text'
                    placeholder='Enter Your First Name'
                    autoComplete={
                      "given-name" === undefined ? "off" : "given-name"
                    }
                    className={`bg-transparent text-gray-200  ${errors.firstName ? "placeholder-red-400" : "placeholder-gray-300/60"} outline-none text-sm w-full h-full`}
                    {...register("firstName", {
                      required: "First Name is required",
                      pattern: {
                        message: "Please enter your first Name",
                      },
                    })}
                  />
                </div>
                {errors.firstName && (
                  <span className='text-red-400 text-xs leading-none self-end'>
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* LastName Input */}
              <div className='w-full flex flex-col gap-1'>
                <div
                  className={`flex items-center w-full bg-white/5 border ${errors.lastName ? "border-red-400" : "border-white/10 focus-within:border-indigo-400/60"} h-12 rounded-full overflow-hidden px-4 gap-3`}
                >
                  <span>
                    <Type
                      strokeWidth={1.75}
                      size={20}
                      className={`${errors.lastName ? "text-red-400" : "text-gray-500"}`}
                    />
                  </span>
                  <input
                    type='text'
                    placeholder='Enter Your Last Name'
                    className={`bg-transparent text-gray-200  ${errors.lastName ? "placeholder-red-400" : "placeholder-gray-300/60"} outline-none text-sm w-full h-full`}
                    {...register("lastName", {
                      required: "Last Name is required",
                      pattern: {
                        message: "Please enter your Last Name",
                      },
                    })}
                  />
                </div>
                {errors.lastName && (
                  <span className='text-red-400 text-xs leading-none self-end'>
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className='w-full flex flex-col gap-1'>
                <div
                  className={`flex items-center w-full bg-white/5 border ${errors.email ? "border-red-400" : "border-white/10 focus-within:border-indigo-400/60"} h-12 rounded-full overflow-hidden px-4 gap-3`}
                >
                  <span>
                    <Mail
                      strokeWidth={1.75}
                      size={20}
                      className={`${errors.email ? "text-red-400" : "text-gray-500"}`}
                    />
                  </span>
                  <input
                    type='email'
                    placeholder='Email Id'
                    className={`bg-transparent text-gray-200  ${errors.email ? "placeholder-red-400" : "placeholder-gray-300/60"} outline-none text-sm w-full h-full`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className='text-red-400 text-xs leading-none self-end'>
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className='w-full flex flex-col gap-1'>
                <div
                  className={`flex items-center w-full  bg-white/5 border ${errors.password ? "border-red-400" : "border-white/10 focus-within:border-indigo-400/60"} h-12 rounded-full overflow-hidden px-4 gap-3`}
                >
                  <span>
                    <Lock
                      strokeWidth={1.75}
                      size={20}
                      className={`${errors.password ? "text-red-400" : "text-gray-500"}`}
                    />
                  </span>
                  <input
                    type={!showPassword ? "password" : "text"}
                    placeholder='Password'
                    className={`bg-transparent text-gray-200  ${errors.password ? "placeholder-red-400" : "placeholder-gray-300/60"} outline-none text-sm w-full h-full`}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain an uppercase letter, a number, and a special character",
                      },
                    })}
                  />
                  <span
                    className='p-1.5 hover:bg-gray-800 rounded'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff
                        strokeWidth={1.75}
                        size={20}
                        className='text-gray-500'
                      />
                    ) : (
                      <Eye
                        strokeWidth={1.75}
                        size={20}
                        className='text-gray-500'
                      />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <span className='text-red-400 text-xs leading-none self-end'>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div className='w-full mt-2 flex gap-2'>
              <input
                className='h-5 accent-indigo-500'
                type='checkbox'
                id='checkbox'
                required
              />
              <label className='text-sm text-gray-300/60' htmlFor='checkbox'>
                By clicking on sign in, you agree to our Terms of Service and
                Privacy Policy.
              </label>
            </div>

            <button
              type='submit'
              className='w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity'
            >
              Sign Up
            </button>
            <p className='text-gray-300/60 text-sm mt-1'>
              Already have an account?{" "}
              <Link className='text-indigo-400 hover:underline' to='/signin'>
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
