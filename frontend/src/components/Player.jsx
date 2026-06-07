import React, { useState } from "react";
import AlbumArt from "../assets/dummy.jpg";
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Repeat1,
  RepeatOff,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume,
  Volume1,
  Volume2,
  VolumeOff,
  VolumeX,
} from "lucide-react";

const Player = () => {
  const [likedTrack, setLikedTrack] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [mute, setMute] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");

  const handleMute = () => {
    if (!mute) {
      setPreviousVolume(volume);
      setVolume(0);
      setMute(true);
    } else {
      setVolume(previousVolume);
      setMute(false);
    }
  };

  const handleRepeat = () => {
    setRepeatMode((prev) =>
      prev === "off" ? "all" : prev === "all" ? "one" : "off"
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 text-slate-300 select-none">
      
      {/* Mobile-Only Top Edge Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-slate-800 md:hidden">
        <div className="h-full bg-indigo-500 w-1/3 rounded-r-full"></div>
      </div>

      <div className="flex items-center justify-between h-16 md:h-24 px-4 md:px-6">
        
        {/* LEFT: Track Info (Expands on Mobile) */}
        <div className="flex items-center justify-between w-full md:w-1/4 md:min-w-50 md:justify-start gap-3 md:gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-md overflow-hidden shadow-lg shadow-black/40 shrink-0">
              <img src={AlbumArt} alt="Album Art" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col truncate">
              <h1 className="text-sm font-semibold text-slate-50 truncate hover:underline cursor-pointer">
                Track Title
              </h1>
              <span className="text-xs text-slate-400 truncate hover:underline cursor-pointer md:mt-0.5">
                Track Artist
              </span>
            </div>
          </div>

          {/* Mobile-Only Controls (Heart + Play/Pause) */}
          <div className="flex md:hidden items-center gap-4 shrink-0 pr-2">
            <button onClick={() => setLikedTrack(!likedTrack)} className="focus:outline-none">
              <Heart
                size={20}
                className={`transition-colors duration-300 ${
                  likedTrack ? "fill-indigo-500 text-indigo-500" : "text-slate-400"
                }`}
              />
            </button>
            <button onClick={() => setPlaying(!playing)} className="text-white focus:outline-none">
              {playing ? (
                <Pause size={24} strokeWidth={2.5} className="fill-current" />
              ) : (
                <Play size={24} strokeWidth={2.5} className="fill-current" />
              )}
            </button>
          </div>

          {/* Desktop-Only Heart */}
          <button
            onClick={() => setLikedTrack(!likedTrack)}
            className="hidden md:block ml-2 transition-transform hover:scale-110 focus:outline-none"
          >
            <Heart
              size={20}
              className={`transition-colors duration-300 ${
                likedTrack ? "fill-indigo-500 text-indigo-500" : "text-slate-400 hover:text-slate-100"
              }`}
            />
          </button>
        </div>

        {/* CENTER: Main Controls & Progress Bar (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2 w-2/4 max-w-2xl">
          {/* Buttons */}
          <div className="flex items-center gap-6">
            <button onClick={() => setShuffle(!shuffle)} className="focus:outline-none">
              <Shuffle
                size={18}
                strokeWidth={2}
                className={`transition-colors ${
                  shuffle ? "text-indigo-400" : "text-slate-400 hover:text-slate-100"
                }`}
              />
            </button>
            
            <button className="text-slate-400 hover:text-slate-100 transition-colors focus:outline-none">
              <SkipBack size={24} strokeWidth={2} />
            </button>

            <button
              onClick={() => setPlaying(!playing)}
              className="flex items-center justify-center w-10 h-10 bg-white text-slate-900 rounded-full hover:scale-105 hover:bg-indigo-50 transition-all shadow-md focus:outline-none"
            >
              {playing ? (
                <Pause size={20} strokeWidth={2.5} className="fill-current" />
              ) : (
                <Play size={20} strokeWidth={2.5} className="fill-current ml-0.5" />
              )}
            </button>

            <button className="text-slate-400 hover:text-slate-100 transition-colors focus:outline-none">
              <SkipForward size={24} strokeWidth={2} />
            </button>

            <button onClick={handleRepeat} className="focus:outline-none">
              {repeatMode === "off" ? (
                <RepeatOff size={18} strokeWidth={2} className="text-slate-400 hover:text-slate-100 transition-colors" />
              ) : repeatMode === "one" ? (
                <Repeat1 size={18} strokeWidth={2} className="text-indigo-400 transition-colors" />
              ) : (
                <Repeat size={18} strokeWidth={2} className="text-indigo-400 transition-colors" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center w-full gap-3 text-xs font-medium text-slate-400">
            <span className="w-10 text-right">0:00</span>
            <div className="relative flex-1 h-1.5 bg-slate-700 rounded-full cursor-pointer group">
              <div className="absolute top-0 left-0 h-full bg-slate-200 group-hover:bg-indigo-400 rounded-full w-1/3 transition-colors">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-sm transition-opacity"></div>
              </div>
            </div>
            <span className="w-10 text-left">9:99</span>
          </div>
        </div>

        {/* RIGHT: Volume & Extras (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4 min-w-50">
          <button onClick={handleMute} className="text-slate-400 hover:text-slate-100 transition-colors focus:outline-none">
            {mute ? (
              <VolumeOff size={20} strokeWidth={2} />
            ) : volume === 0 ? (
              <VolumeX size={20} strokeWidth={2} />
            ) : volume <= 5 ? (
              <Volume size={20} strokeWidth={2} />
            ) : volume <= 50 ? (
              <Volume1 size={20} strokeWidth={2} />
            ) : (
              <Volume2 size={20} strokeWidth={2} />
            )}
          </button>

          <div className="w-24 flex items-center group">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                const newVolume = Number(e.target.value);
                setVolume(newVolume);
                setMute(newVolume === 0);
              }}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-300 hover:accent-indigo-400 transition-all outline-none"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Player;