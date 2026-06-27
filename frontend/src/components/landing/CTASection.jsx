import { ArrowRight, Music2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section id="create" className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-slate-900 p-8 text-center md:p-14">
        <div className="flex justify-center items-center mx-auto mb-6 h-16 w-16 rounded-3xl bg-linear-to-br from-amber-300 to-orange-500">
          {/* <Music2 size={28} className="text-slate-950 rotate-350" /> */}
          <span className='text-4xl leading-none text-black'>♪</span>
        </div>

        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
          Ready to build your sound on Piper?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-300 leading-8">
          Start listening today or join as an artist to upload your tracks and
          see exactly how people play your music.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
              onClick={() => navigate("/register-artist")}
              className='group inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-300 cursor-pointer'
            >
              Register as an Artist
              <span className='group-hover:translate-x-1 transition-all duration-200 ease-in-out'>
                <ArrowRight size={18} />
              </span>
            </button>
          <button
            onClick={() => navigate("/signup")}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-300 cursor-pointer"
          >
            Join Piper
            <span className='group-hover:translate-x-1 transition-all duration-200 ease-in-out'>
                <ArrowRight size={18} />
              </span>
          </button>

          
        </div>
      </div>
    </section>
  );
};

export default CTASection;