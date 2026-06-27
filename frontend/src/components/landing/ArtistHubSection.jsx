import {
  ArrowRight,
  BarChart3,
  CloudUpload,
  Music,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: CloudUpload,
    title: "Upload tracks easily",
    text: "Artists can upload music, cover art, genre, release year, language, and explicit tags from one clean panel.",
  },
  {
    icon: BarChart3,
    title: "Track performance",
    text: "View total plays, average playtime, top tracks, and audience activity without opening multiple tools.",
  },
  {
    icon: Music,
    title: "Manage releases",
    text: "Keep your songs organized with track details, cover previews, and release metadata.",
  },
  {
    icon: ShieldCheck,
    title: "Artist identity",
    text: "Use your stage name, verified artist profile, and dashboard access built for creators.",
  },
];

const ArtistHubSection = () => {
  const navigate = useNavigate();

  return (
    <section id='artists' className='px-5 py-24 md:px-8'>
      <div className='mx-auto max-w-7xl'>

        <div className='mb-12 w-full flex flex-col lg:flex-row justify-between gap-4'>
          <div className='max-w-2xl'>
            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300'>
              Artist Hub
            </p>

            <h2 className='text-4xl font-black tracking-tight md:text-5xl'>
              A dashboard that feels made for artists.
            </h2>

            <p className='mt-5 text-slate-300 leading-8'>
              Piper gives artists a dedicated space to publish tracks and
              monitor how listeners interact with their music.
            </p>
          </div>

          <div className='flex flex-row lg:flex-col gap-3'>
          <button
              onClick={() => navigate("/signin")}
              className='group lg:order-2 inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10 cursor-pointer'
            >
              Open Artist Dashboard
              <span className='group-hover:translate-x-1 transition-all duration-200 ease-in-out'>
                <ArrowRight size={18} />
              </span>
            </button>
            <button
              onClick={() => navigate("/register-artist")}
              className='group lg:order-1 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-300 cursor-pointer'
            >
              Register as an Artist
              <span className='group-hover:translate-x-1 transition-all duration-200 ease-in-out'>
                <ArrowRight size={18} />
              </span>
            </button>
            
          </div>
        </div>

        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className='rounded-3xl border border-white/10 bg-white/4 p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]'
              >
                <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300'>
                  <Icon size={22} />
                </div>

                <h3 className='text-lg font-bold'>{feature.title}</h3>

                <p className='mt-3 text-sm leading-7 text-slate-400'>
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArtistHubSection;
