
import React from 'react';
import { LyricLine } from '../types';

interface LyricDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
  isPlaying: boolean;
}

const LyricDisplay: React.FC<LyricDisplayProps> = ({ lyrics, currentTime, isPlaying }) => {
  const activeIndex = lyrics.reduce((acc, lyric, index) => {
    return lyric.time <= currentTime ? index : acc;
  }, -1);

  const activeLyric = activeIndex >= 0 ? lyrics[activeIndex] : null;
  const nextLyric = activeIndex + 1 < lyrics.length ? lyrics[activeIndex + 1] : null;

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 h-full pointer-events-none select-none">
      <div className="relative space-y-12 transition-all duration-700 ease-out">
        {/* Previous Lyric (Fading out) */}
        <div className="opacity-10 text-xl md:text-3xl font-oswald uppercase tracking-tighter transform -translate-y-8 scale-90 blur-[2px] transition-all duration-500">
          {activeIndex > 0 && lyrics[activeIndex - 1].text}
        </div>

        {/* Current Lyric with Rhythm Effect */}
        <div className="relative group">
          <h1 
            key={activeIndex}
            className={`
              transition-all duration-300 transform
              ${activeLyric?.isStrong 
                ? 'text-7xl md:text-9xl font-black text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]' 
                : 'text-5xl md:text-7xl font-bold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]'}
              font-oswald uppercase leading-none tracking-tighter
              ${isPlaying ? 'animate-pulse-subtle' : ''}
            `}
            style={{
              animation: isPlaying ? 'beat 0.5s infinite alternate' : 'none'
            }}
          >
            {activeLyric?.text || "PREPARE-SE"}
          </h1>
          
          {/* Subtle reflection/glitch effect for strong lyrics */}
          {activeLyric?.isStrong && (
            <h1 className="absolute inset-0 text-7xl md:text-9xl font-black text-white/10 blur-xl scale-110 -z-10 animate-pulse">
              {activeLyric.text}
            </h1>
          )}
        </div>

        {/* Next Lyric (Preview) */}
        <div className="opacity-30 text-2xl md:text-4xl font-oswald text-gray-400 tracking-tight transform translate-y-8 transition-all duration-500 italic">
          {nextLyric?.text}
        </div>
      </div>

      <style>{`
        @keyframes beat {
          from { transform: scale(1); filter: brightness(1); }
          to { transform: scale(1.02); filter: brightness(1.2); }
        }
        .animate-pulse-subtle {
          animation: beat 0.5s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default LyricDisplay;
