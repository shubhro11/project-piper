import { Music2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='border-t border-white/10 px-5 pt-8 pb-5 md:px-8'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between'>
        <Link to={"/home"}>
          <div className='flex items-center justify-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-slate-950'>
              {/* <Music2 size={22} className="rotate-350" /> */}
              <span className='text-2xl leading-none'>♪</span>
            </div>

            <div>
              <h3 className='font-bold'>Piper</h3>
              <p className='text-sm text-slate-400'>
                Stream music. Support artists.
              </p>
            </div>
          </div>
        </Link>

        <div className='flex flex-wrap justify-center items-center gap-5 text-sm text-slate-400'>
          <Link to='' className='transition hover:text-white'>
            Privacy
          </Link>
          <Link to='' className='transition hover:text-white'>
            Terms
          </Link>
          <Link to='' className='transition hover:text-white'>
            Contact
          </Link>
        </div>

        <p className='text-sm text-center text-slate-500'>
          © {new Date().getFullYear()} Piper. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
