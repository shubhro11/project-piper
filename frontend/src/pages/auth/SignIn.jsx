import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import GoogleSvg from "../../assets/googlelogo.svg";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/thunks/user.thunk";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { loginLoading } = useSelector((state) => state.user);

  // Form Hook
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Sign In - Submit Handler
  const SubmitHandler = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast("Logged in successfully", {
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
        <title>Piper</title>
      </Helmet>

      <div>
        <div className='min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden'>
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
                  Welcome back
                </h2>
                <p className='text-sm text-center text-slate-400 mt-1'>
                  Please enter email and password to access.
                </p>
              </div>

              <button
                type='button'
                className='w-full gap-3 leading-none text-slate-200 bg-white/[0.07] hover:bg-white/10 active:bg-white/[0.14] mt-1 flex items-center justify-center h-12 rounded-full border border-white/10 transition'
              >
                <img src={GoogleSvg} alt='googleLogo' className='w-5 h-5' />
                <span className='text-sm'>Sign In with Google</span>
              </button>

              <div className='flex items-center gap-4 w-full my-1.5'>
                <div className='w-full h-px bg-white/10'></div>

                <p className='w-full text-nowrap text-sm text-slate-500'>
                  or sign in with email
                </p>

                <div className='w-full h-px bg-white/10'></div>
              </div>

              <div className='w-full flex flex-col gap-2.5'>
                {/* Email Input */}
                <div className='w-full flex flex-col gap-1'>
                  <div
                    className={`flex items-center w-full bg-white/5 border transition-all duration-200 ${
                      errors.email
                        ? "border-red-400"
                        : "border-white/10 focus-within:border-amber-300/70"
                    } h-12 rounded-full overflow-hidden px-4 gap-3 transition`}
                  >
                    <span>
                      <Mail
                        strokeWidth={1.75}
                        size={20}
                        className={`transition-all duration-200 ${
                          errors.email ? "text-red-400" : "text-amber-300/70"
                        }`}
                      />
                    </span>
                    <input
                      type='email'
                      placeholder={
                        errors.email ? `${errors.email.message}` : "Email Id"
                      }
                      className={`bg-transparent transition-all duration-200 text-slate-100 ${
                        errors.email
                          ? "placeholder-red-400"
                          : "placeholder-slate-500"
                      } outline-none text-sm w-full h-full`}
                      {...register("email", {
                        required: "Email is required",
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
                    className={`flex items-center w-full bg-white/5 border transition-all duration-200 ${
                      errors.password
                        ? "border-red-400"
                        : "border-white/10 focus-within:border-amber-300/70"
                    } h-12 rounded-full overflow-hidden px-4 gap-3 transition`}
                  >
                    <span>
                      <Lock
                        strokeWidth={1.75}
                        size={20}
                        className={`transition-all duration-200 ${
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
                      className={`bg-transparent text-slate-100 transition-all duration-200 ${
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

              <div className='w-full flex items-center justify-between mt-2 text-slate-400'>
                <div className='flex items-center gap-2'>
                  <input
                    className='h-5 accent-amber-400'
                    type='checkbox'
                    id='checkbox'
                  />
                  <label className='text-sm text-slate-400' htmlFor='checkbox'>
                    Remember me
                  </label>
                </div>
                <Link
                  className='text-sm underline text-slate-400 hover:text-amber-300'
                  href='#'
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type='submit'
                disabled={loginLoading}
                className={`${
                  loginLoading
                    ? "cursor-not-allowed bg-slate-700 text-slate-400"
                    : "cursor-pointer bg-amber-400 text-slate-950 hover:bg-amber-300 active:bg-amber-500"
                } w-full h-11 rounded-full transition font-semibold`}
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>

              <p className='text-slate-400 text-sm mt-1'>
                Don't have an account?{" "}
                <Link
                  className='text-amber-300 hover:text-amber-200 hover:underline'
                  to='/signup'
                >
                  Sign Up
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

export default SignIn;
