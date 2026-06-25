import { useState } from "react";
import { Menu, X, Music2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Discover", href: "#discover" },
  { label: "Artists", href: "#artists" },
  { label: "Analytics", href: "#analytics" },
  { label: "Create", href: "#create" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className='fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-xl drop-shadow-xl drop-shadow-slate-950/75'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8'>
          <Link to='/home' className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'>
              {/* Changed rotate-350 to a valid standard class or arbitrary value */}
              <Music2 size={22} className='-rotate-12' />
            </div>

            <div>
              <h1 className='text-xl font-bold tracking-tight'>Piper</h1>
              <p className='text-xs text-slate-400'>Music for everyone</p>
            </div>
          </Link>

          <div className='hidden items-center gap-6 md:flex'>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className='text-sm text-slate-300 transition hover:text-white'
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className='hidden items-center gap-3 md:flex'>
            <Link
              to='/signin'
              className='rounded-full px-5 py-2 text-sm text-slate-300 transition hover:text-white'
            >
              Sign in
            </Link>

            <button
              onClick={() => navigate("/signup")}
              className='cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300'
            >
              Start Listening
            </button>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setOpen(true)}
            className='md:hidden rounded-xl border border-white/10 p-2 text-white transition hover:bg-white/5'
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-55 bg-black/60 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 z-60 h-screen w-64 bg-slate-950/90 px-5 py-4 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-end'>
            <button
              onClick={() => setOpen(false)}
              className='md:hidden rounded-xl border border-white/10 p-2 text-white transition hover:bg-white/5'
            >
              <X size={22} />
            </button>
          </div>

          <div className='mt-6 flex flex-col items-center justify-center gap-6'>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className='self-end pr-3 text-lg text-slate-300 transition hover:text-white'
              >
                {link.label}
              </a>
            ))}

            <div className='mt-3 flex w-full flex-col gap-3'>
              <Link
                to='/signin'
                onClick={() => setOpen(false)}
                className='w-full rounded-full border border-white/10 px-5 py-3 text-center text-base text-slate-300 transition hover:bg-white/5 hover:text-white'
              >
                Sign in
              </Link>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/signup");
                }}
                className='w-full rounded-full bg-amber-400 px-5 py-3 text-center text-basez font-semibold text-slate-950 transition hover:bg-amber-300'
              >
                Start listening
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
