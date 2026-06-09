import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Discover = () => {
  const [playlists, setPlaylists] = useState([
    { name: "Chill Vibes", totalTracks: 32, color: "bg-emerald-600" },
    { name: "Focus Beats", totalTracks: 24, color: "bg-purple-600" },
    { name: "Acoustic", totalTracks: 18, color: "bg-olive-600" },
    { name: "Party", totalTracks: 70, color: "bg-lime-600" },
    { name: "R&B", totalTracks: 28, color: "bg-amber-600" },
    { name: "Metal", totalTracks: 36, color: "bg-red-600" },
  ]);

  return (
    <div className='flex h-screen'>
      <div className='w-full flex-1 px-16 py-32 overflow-y-scroll scrollbar-custom scrollbar-gutter-both'>
        <section className='flex flex-col gap-4 md:flex-row mb-6 justify-between'>
          <div>
            <h1 className='text-3xl'>Discover</h1>
            <p className='text-gray-400'>Trending playlists and new releases</p>
          </div>

          <div className='flex flex-col gap-4 p-6 bg-slate-800 rounded-3xl'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl'>Playlists</h1>
              <button className='self-end py-2 px-3 text-sm bg-blue-500 rounded'>
                View All
              </button>
            </div>
            
            <div className='grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5  gap-4'>

              {playlists.map((playlist) => {
                return (
                  <div className={`${playlist.color} p-4 rounded-2xl flex flex-col`}>
                    <h1 className='font-medium'>{playlist.name}</h1>
                    <span className='text-sm text-white/70'>{playlist.totalTracks} tracks</span>
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        <section className='p-6 bg-slate-800 rounded-3xl'>
          <div className='mx-auto w-full flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl'>Musics</h1>
              <button className='self-end py-2 px-3 text-sm bg-blue-500 rounded'>
                View All
              </button>
            </div>

            <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6'>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Electronics'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/electronics2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-blue-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>
                      Electronics
                    </h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Clothing'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/fashion2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-pink-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>Clothing</h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Books'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/books2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-amber-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>Books</h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/kitchen2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-emerald-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>
                      Home &amp; Kitchen
                    </h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Electronics'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/electronics2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-blue-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>
                      Electronics
                    </h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Clothing'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/fashion2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-pink-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>Clothing</h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Books'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/books2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-amber-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>Books</h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/kitchen2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-emerald-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>
                      Home &amp; Kitchen
                    </h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Electronics'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/electronics2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-blue-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>
                      Electronics
                    </h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Clothing'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/fashion2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-pink-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>Clothing</h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  alt='Books'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/books2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-amber-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>Books</h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
              <Link className='group relative block aspect-square overflow-hidden rounded-2xl'>
                <img
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  src='https://picsum.photos/seed/kitchen2/600/400'
                />
                <div className='absolute inset-0 bg-linear-to-t from-emerald-700/75 to-transparent'></div>
                <div className='absolute inset-0 flex items-end p-5'>
                  <div>
                    <h3 className='text-base font-bold text-white'>
                      Home &amp; Kitchen
                    </h3>
                    <p className='mt-0.5 text-xs text-white/70 transition-colors group-hover:text-white'>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Discover;
