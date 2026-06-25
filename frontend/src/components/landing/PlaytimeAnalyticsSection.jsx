import { Clock3, TrendingUp, Users, Play } from "lucide-react";

const PlaytimeAnalyticsSection = () => {
  const stats = [
    {
      label: "Total playtime",
      value: "48.2k hrs",
      icon: Clock3,
    },
    {
      label: "Monthly plays",
      value: "1.3M",
      icon: Play,
    },
    {
      label: "New listeners",
      value: "24.8k",
      icon: Users,
    },
    {
      label: "Growth",
      value: "+32%",
      icon: TrendingUp,
    },
  ];

  const tracks = [
    {
      title: "Midnight Pulse",
      playtime: "12.4k hrs",
      width: "92%",
    },
    {
      title: "Neon Roads",
      playtime: "9.8k hrs",
      width: "76%",
    },
    {
      title: "Afterlight",
      playtime: "7.1k hrs",
      width: "61%",
    },
    {
      title: "Blue Frequency",
      playtime: "5.6k hrs",
      width: "48%",
    },
  ];

  return (
    <section id="analytics" className="px-5 py-18 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Playtime Analytics
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Know which tracks are actually being played.
          </h2>

          <p className="mt-5 text-slate-300 leading-8">
            Artists can track total playtime, popular songs, listener growth,
            and performance trends. This helps artists understand what works
            instead of guessing.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-[1.3rem] border border-white/10 bg-white/4 p-5"
                >
                  <Icon className="mb-4 text-amber-300" size={22} />
                  <h3 className="text-2xl font-black">{stat.value}</h3>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-4xl border border-white/10 bg-white/4 p-4 shadow-2xl">
          <div className="rounded-3xl bg-slate-900 p-5 md:p-7">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-400">Artist Dashboard</p>
                <h3 className="text-2xl font-black">Track Playtimes</h3>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                Live data
              </div>
            </div>

            <div className="mb-8 rounded-3xl border border-white/10 bg-white/3 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-400">Weekly listening graph</p>
                <p className="text-sm text-amber-300">+18.7%</p>
              </div>

              <div className="flex h-44 items-end gap-3">
                {[45, 65, 52, 80, 68, 95, 74].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-2xl bg-linear-to-t from-amber-500/40 to-amber-300"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="mt-4 grid grid-cols-7 text-center text-xs text-slate-500">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <span key={`${day}-${index}`}>{day}</span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {tracks.map((track, index) => (
                <div key={track.title}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {index + 1}. {track.title}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm text-slate-300">
                      {track.playtime}
                    </p>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-300"
                      style={{ width: track.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaytimeAnalyticsSection;