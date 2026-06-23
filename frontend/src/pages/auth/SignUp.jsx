import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Eye, EyeOff, Lock, Mail, Type } from "lucide-react";
import GoogleSvg from "../../assets/googlelogo.svg";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/thunks/user.thunk";
import { Helmet } from "react-helmet-async";


const SignUp = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { registerLoading } = useSelector((state) => state.user);

  // Form Hook
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Sign Up - Submit Handler
  const SubmitHandler = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast("Registered successfully", {
        className: "!bg-amber-500 !text-slate-950",
        progressClassName: "!bg-orange-300",
      });

      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up - Piper</title>
      </Helmet>

      <div>
        <div className='min-h-screen py-4 sm:py-0 w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden'>
          {/* Background Glow */}
          <div className='absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/20 blur-3xl rounded-full'></div>
          <div className='absolute bottom-20 right-10 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full'></div>

          <div className='relative w-[90%] sm:w-110 md:w-120 px-4 sm:px-8 py-12 bg-white/6 border border-amber-300/10 rounded-3xl shadow-2xl shadow-black/30 backdrop-blur-xl'>
            <form
              onSubmit={handleSubmit(SubmitHandler)}
              className='w-full flex flex-col items-center justify-center gap-4'
            >
              <div>
                <h2 className='text-3xl text-center text-white font-semibold'>
                  Create an Account
                </h2>
                <p className='text-sm text-center text-slate-400 mt-1'>
                  Fill in the details below to create your account
                </p>
              </div>

              <button
                type='button'
                className='w-full gap-3 leading-none text-slate-200 bg-white/[0.07] hover:bg-white/10 active:bg-white/[0.14] mt-1 flex items-center justify-center h-12 rounded-full border border-white/10 transition'
              >
                <img src={GoogleSvg} alt='googleLogo' className='w-5 h-5' />
                <span className='text-sm'>Sign Up with Google</span>
              </button>

              <div className='flex items-center gap-4 w-full my-1.5'>
                <div className='w-full h-px bg-white/10'></div>

                <p className='w-full text-nowrap text-sm text-slate-500'>
                  or sign up with email
                </p>

                <div className='w-full h-px bg-white/10'></div>
              </div>

              <div className='w-full flex flex-col gap-2.5'>
                {/* FirstName Input */}
                <div className='w-full flex flex-col gap-1'>
                  <div
                    className={`flex items-center w-full bg-white/5 border ${
                      errors.firstName
                        ? "border-red-400"
                        : "border-white/10 focus-within:border-amber-300/70"
                    } h-12 rounded-full overflow-hidden px-4 gap-3 transition`}
                  >
                    <span>
                      <Type
                        strokeWidth={1.75}
                        size={20}
                        className={`${
                          errors.firstName
                            ? "text-red-400"
                            : "text-amber-300/70"
                        }`}
                      />
                    </span>
                    <input
                      type='text'
                      placeholder={
                        errors.firstName
                          ? `${errors.firstName.message}`
                          : "First Name"
                      }
                      autoComplete={
                        "given-name" === undefined ? "off" : "given-name"
                      }
                      className={`bg-transparent text-slate-100 ${
                        errors.firstName
                          ? "placeholder-red-400"
                          : "placeholder-slate-500"
                      } outline-none text-sm w-full h-full`}
                      {...register("firstName", {
                        required: "First Name is required",
                        pattern: {
                          message: "Please enter your first Name",
                        },
                      })}
                    />
                  </div>
                </div>

                {/* LastName Input */}
                <div className='w-full flex flex-col gap-1'>
                  <div
                    className={`flex items-center w-full bg-white/5 border ${
                      errors.lastName
                        ? "border-red-400"
                        : "border-white/10 focus-within:border-amber-300/70"
                    } h-12 rounded-full overflow-hidden px-4 gap-3 transition`}
                  >
                    <span>
                      <Type
                        strokeWidth={1.75}
                        size={20}
                        className={`${
                          errors.lastName ? "text-red-400" : "text-amber-300/70"
                        }`}
                      />
                    </span>
                    <input
                      type='text'
                      placeholder={
                        errors.lastName
                          ? `${errors.lastName.message}`
                          : "Last Name"
                      }
                      className={`bg-transparent text-slate-100 ${
                        errors.lastName
                          ? "placeholder-red-400"
                          : "placeholder-slate-500"
                      } outline-none text-sm w-full h-full`}
                      {...register("lastName", {
                        required: "Last Name is required",
                        pattern: {
                          message: "Please enter your Last Name",
                        },
                      })}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className='w-full flex flex-col gap-1'>
                  <div
                    className={`flex items-center w-full bg-white/5 border ${
                      errors.email
                        ? "border-red-400"
                        : "border-white/10 focus-within:border-amber-300/70"
                    } h-12 rounded-full overflow-hidden px-4 gap-3 transition`}
                  >
                    <span>
                      <Mail
                        strokeWidth={1.75}
                        size={20}
                        className={`${
                          errors.email ? "text-red-400" : "text-amber-300/70"
                        }`}
                      />
                    </span>
                    <input
                      type='email'
                      placeholder={
                        errors.email ? `${errors.email.message}` : "Email Id"
                      }
                      className={`bg-transparent text-slate-100 ${
                        errors.email
                          ? "placeholder-red-400"
                          : "placeholder-slate-500"
                      } outline-none text-sm w-full h-full`}
                      {...register("email", {
                        required: "Email Id is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className='w-full flex flex-col gap-1'>
                  <div
                    className={`flex items-center w-full bg-white/5 border ${
                      errors.password
                        ? "border-red-400"
                        : "border-white/10 focus-within:border-amber-300/70"
                    } h-12 rounded-full overflow-hidden px-4 gap-3 transition`}
                  >
                    <span>
                      <Lock
                        strokeWidth={1.75}
                        size={20}
                        className={`${
                          errors.password ? "text-red-400" : "text-amber-300/70"
                        }`}
                      />
                    </span>
                    <input
                      type={!showPassword ? "password" : "text"}
                      placeholder={
                        errors.password
                          ? `${errors.password.message}`
                          : "Password"
                      }
                      className={`bg-transparent text-slate-100 ${
                        errors.password
                          ? "placeholder-red-400"
                          : "placeholder-slate-500"
                      } outline-none text-sm w-full h-full`}
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
                      className='p-1.5 hover:bg-white/10 rounded cursor-pointer transition'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff
                          strokeWidth={1.75}
                          size={20}
                          className='text-slate-400'
                        />
                      ) : (
                        <Eye
                          strokeWidth={1.75}
                          size={20}
                          className='text-slate-400'
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className='w-full mt-2 flex gap-2'>
                <input
                  className='h-5 accent-amber-400'
                  type='checkbox'
                  id='checkbox'
                  required
                />
                <label className='text-sm text-slate-400' htmlFor='checkbox'>
                  By clicking on sign in, you agree to our Terms of Service and
                  Privacy Policy.
                </label>
              </div>

              <button
                type='submit'
                disabled={registerLoading}
                className={`${
                  registerLoading
                    ? "cursor-not-allowed bg-slate-700 text-slate-400"
                    : "cursor-pointer bg-amber-400 text-slate-950 hover:bg-amber-300 active:bg-amber-500"
                } w-full h-11 rounded-full transition font-semibold`}
              >
                {registerLoading ? "Signing up..." : "Sign Up"}
              </button>

              <p className='text-slate-400 text-sm mt-1'>
                Already have an account?{" "}
                <Link
                  className='text-amber-300 hover:text-amber-200 hover:underline'
                  to='/signin'
                >
                  Sign In
                </Link>
              </p>

              <p className='text-slate-400 text-sm mt-1'>
                <Link
                  className='text-amber-300 hover:text-amber-200 hover:underline'
                  to='/'
                >
                  Back to home
                </Link>
              </p>


            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
