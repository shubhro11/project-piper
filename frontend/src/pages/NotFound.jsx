import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
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
              onClick={() => navigate("/home")}
              className='w-40 py-3 active:scale-95 transition text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700'
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
