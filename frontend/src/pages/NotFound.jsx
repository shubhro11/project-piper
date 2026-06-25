import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user)
  console.log(user)
  return (
    <>
      <Helmet>
        <title>Error - Piper</title>
      </Helmet>

      <div className='w-screen min-h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center text-sm max-md:px-4'>
          <h1 className='text-8xl md:text-9xl font-bold text-indigo-500'>
            404
          </h1>
          <div className='h-1 w-16 rounded bg-indigo-500 my-5 md:my-7'></div>
          <p className='text-2xl md:text-3xl font-bold text-gray-400'>
            Page Not Found
          </p>
          <p className='text-sm md:text-base mt-4 text-gray-500 max-w-md text-center'>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <div className='flex items-center gap-4 mt-6'>
            <button
              onClick={() => navigate("/")}
              className={`${user ? "hidden" : "block"} group inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10`}
            >
              <span className='group-hover:-translate-x-1 transition-all duration-200 ease-in-out'>
                <ArrowLeft size={18} />
              </span>
              Return to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className='group inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-300'
            >
              Go Back
              <span className='group-hover:translate-x-1 transition-all duration-200 ease-in-out'>
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
