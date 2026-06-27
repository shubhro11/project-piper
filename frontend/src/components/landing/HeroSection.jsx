import { ArrowRight, Headphones, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className='relative min-h-screen px-5 pt-32 md:px-8'>
      <div className='absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl' />
      <div className='absolute right-0 top-52 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl' />

      <div className='relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2'>
        <div>
          <div className="flex flex-col justify-center items-center lg:items-start">
            <div className='mb-6 inline-flex justify-center items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-amber-200'>
              <Radio size={16} />
              <h2 className='text-sm'>
                Built for listeners and independent artists
              </h2>
            </div>

            <h1 className='max-w-3xl text-center lg:text-left text-5xl font-black leading-tight tracking-tight md:text-7xl'>
              Stream music.
              <span className='block text-center lg:text-left bg-linear-to-r from-amber-300 via-orange-300 to-pink-400 bg-clip-text text-transparent'>
                Track every play.
              </span>
            </h1>

            <p className='mt-6 mx-auto lg:mx-0 lg:text-left max-w-xl text-center  text-base leading-8 text-slate-300 md:text-lg'>
              Piper is a modern music platform where listeners discover fresh
              tracks and artists get a clean dashboard to upload songs, monitor
              playtimes, and understand what their audience loves.
            </p>

            <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row'>
              <button
                onClick={() => navigate("/signup")}
                className='group inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-300 cursor-pointer'
              >
                Explore Piper
                <span className='group-hover:translate-x-1 transition-all duration-200 ease-in-out'>
                <ArrowRight size={18} />
              </span>
              </button>
            </div>
          </div>

          <div className='mt-10 flex justify-center lg:justify-start flex-wrap gap-6 text-sm text-slate-400'>
            <div className='flex items-center gap-2'>
              <Headphones size={18} className='text-amber-300' />
              High quality streaming
            </div>

            <div className='flex items-center gap-2'>
              <Radio size={18} className='text-amber-300' />
              Artist-first analytics
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute -inset-4 rounded-4xl bg-linear-to-br from-amber-400/20 to-purple-500/20 blur-2xl' />

          <div className='max-w-120 mx-auto relative rounded-4xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl'>
            <div className='rounded-3xl bg-slate-900 p-5'>
              <div className='mb-5 flex items-center justify-between'>
                <div>
                  <p className='text-sm text-slate-400'>Now playing</p>
                  <h3 className='text-xl font-bold'>Midnight Pulse</h3>
                </div>

                <div className='rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950'>
                  LIVE
                </div>
              </div>

              <div className='mb-6 aspect-square rounded-3xl bg-linear-to-br from-amber-300 via-orange-500 to-fuchsia-600 p-6'>
                <div className='flex h-full flex-col justify-end rounded-lg border border-white/20 bg-black/20 p-5 backdrop-blur-sm'>
                  <p className='text-sm text-white/80'>Piper Originals</p>
                  <h2 className='mt-1 text-3xl font-black'>Echo City</h2>
                </div>
              </div>

              <div className='mb-5 flex h-16 items-end gap-2'>
                {[35, 70, 45, 90, 55, 80, 38, 65, 95, 42, 75, 50].map(
                  (height, index) => (
                    <div
                      key={index}
                      className='w-full rounded-full bg-amber-300/80'
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>

              <div className='space-y-3'>
                {["Neon Roads", "Afterlight", "Blue Frequency"].map(
                  (track, index) => (
                    <div
                      key={track}
                      className='flex items-center justify-between rounded-2xl bg-white/4 px-4 py-3'
                    >
                      <div>
                        <p className='font-medium'>{track}</p>
                        <p className='text-xs text-slate-400'>
                          {index + 1}. Piper Artist
                        </p>
                      </div>

                      <p className='text-sm text-amber-300'>
                        {index === 0 ? "3:41" : index === 1 ? "2:58" : "4:12"}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
