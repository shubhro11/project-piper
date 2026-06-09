import { House, Settings } from "lucide-react";
import React, { useState } from "react";

import PiperLogo from "../assets/piper.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function logoutHandler() {
    navigate("/signin");
  }

  return (
    <nav>
      <div className='absolute top-0 z-50 w-full bg-slate-900/95 py-4 px-8 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex gap-2 items-center w-26'>
          <img src={PiperLogo} className='w-10 ' />

          <h1 className='text-2xl'>Piper</h1>
        </div>

        {/* Center Menu */}
        <div>
          <ul className='text-white flex gap-5 leading-none'>
            <li>
              <House strokeWidth={1.5} size={20} />
            </li>
            <li>New Releases</li>
            <li>Artists</li>
            <li>Top Charts</li>
          </ul>
        </div>

        {/* Sign Up Buttons */}

        <div className='flex items-center gap-6'>
          {/* <div>
            <Settings strokeWidth={1.75} />
          </div> */}

          <div className='relative w-26 flex justify-end'>
            <div
              onClick={() => setOpen((prev) => !prev)}
              className='bg-emerald-700 w-10 h-10 text-lg rounded-lg font-medium flex justify-center items-center cursor-pointer'
            >
              <h2 className='leading-none text-white'>A</h2>
            </div>

            {open && (
              <ul className='absolute p-2 overflow-hidden top-full right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-lg shadow-lg z-50'>
                <li
                  onClick={() => setOpen((prev) => !prev)}
                  className='px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer'
                >
                  New File
                </li>
                <li
                  onClick={() => setOpen((prev) => !prev)}
                  className='px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer'
                >
                  Copy Link
                </li>
                <li
                  onClick={() => setOpen((prev) => !prev)}
                  className='px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer'
                >
                  Settings
                </li>
                <div className='w-full h-px rounded bg-gray-300/50 my-2'></div>
                <li
                  onClick={() => {
                    setOpen((prev) => !prev);
                    logoutHandler();
                  }}
                  className='px-4 py-2 text-sm text-red-500 hover:bg-red-500/20 rounded cursor-pointer'
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
