import { Headphones, Heart, ListMusic } from "lucide-react";

const ListenerExperienceSection = () => {
  const cards = [
    {
      icon: Headphones,
      title: "Smooth listening",
      text: "A clean music experience with tracks, albums, artists, and playlists made easy to explore.",
    },
    {
      icon: Heart,
      title: "Discover new artists",
      text: "Piper highlights upcoming creators so listeners can find fresh music before it becomes mainstream.",
    },
    {
      icon: ListMusic,
      title: "Playlist ready",
      text: "Build your listening flow with curated songs and collections designed for every mood.",
    },
  ];

  return (
    <section id="discover" className="px-5 py-18 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-4xl border border-white/10 bg-linear-to-br from-white/8 to-white/2 p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Listener Experience
              </p>

              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Not just another music app.
              </h2>

              <p className="mt-5 text-slate-300 leading-8">
                Piper keeps the listener experience minimal, fast, and focused.
                No clutter, no confusing screens — just music, discovery, and
                artists worth following.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-3xl bg-slate-950/70 p-6"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                      <Icon size={22} />
                    </div>

                    <h3 className="font-bold">{card.title}</h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListenerExperienceSection;