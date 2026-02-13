
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Music, Loader2, Briefcase, ChevronDown } from 'lucide-react';
import LyricDisplay from './components/LyricDisplay';
import Visualizer from './components/Visualizer';
import IntroVisualizer from './components/IntroVisualizer';
import Portfolio from './components/Portfolio';
import { LYRICS } from './constants/lyrics';
import { PlayerState } from './types';

const VIDEO_ID = 'YMG6Z8yKFXM';

const App: React.FC = () => {
  const ytPlayerRef = useRef<any>(null);
  const [state, setState] = useState<PlayerState>({
    currentTime: 0,
    isPlaying: false,
    duration: 0
  });
  const [isReady, setIsReady] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  useEffect(() => {
    const initPlayer = () => {
      if (!(window as any).YT || !(window as any).YT.Player) return;
      
      try {
        new (window as any).YT.Player('yt-player-element', {
          height: '100',
          width: '100',
          videoId: VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              ytPlayerRef.current = event.target;
              setIsReady(true);
              setState(prev => ({ ...prev, duration: event.target.getDuration() }));
            },
            onStateChange: (event: any) => {
              const playerState = event.data;
              setState(prev => ({
                ...prev,
                isPlaying: playerState === (window as any).YT.PlayerState.PLAYING
              }));
            },
            onError: (e: any) => console.error("YouTube Error:", e.data)
          }
        });
      } catch (err) {
        console.error("YT Player Init Err:", err);
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    const updateProgress = () => {
      if (ytPlayerRef.current && state.isPlaying) {
        const current = ytPlayerRef.current.getCurrentTime();
        setState(prev => {
          if (Math.abs(prev.currentTime - current) < 0.05) return prev;
          return { ...prev, currentTime: current };
        });
      }
      rafId = requestAnimationFrame(updateProgress);
    };
    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, [state.isPlaying]);

  const togglePlay = () => {
    if (!ytPlayerRef.current) return;
    if (state.isPlaying) {
      ytPlayerRef.current.pauseVideo();
    } else {
      ytPlayerRef.current.playVideo();
      setShowStartOverlay(false);
    }
  };

  const handleStart = () => {
    if (isReady && ytPlayerRef.current) {
      ytPlayerRef.current.playVideo();
      setShowStartOverlay(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    ytPlayerRef.current?.seekTo(time, true);
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const isIntroActive = state.currentTime < 14.5;

  return (
    <div className={`relative h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#050505] text-white font-inter transition-all duration-700 ${isPortfolioOpen ? 'scale-90 opacity-40 blur-[50px]' : 'scale-100 opacity-100'}`}>
      <Visualizer isPlaying={state.isPlaying} />
      
      <IntroVisualizer currentTime={state.currentTime} isPlaying={state.isPlaying} />
      
      <div className="fixed opacity-0 pointer-events-none z-[-100]">
        <div id="yt-player-element"></div>
      </div>

      {showStartOverlay && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-1000">
          <div className="absolute inset-0 overflow-hidden opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.1)_0%,transparent_70%)] animate-pulse" />
          </div>
          
          <div className="text-center space-y-12 p-16 relative">
            <div className="relative group cursor-pointer" onClick={handleStart}>
              <div className="absolute -inset-8 bg-yellow-400/20 rounded-full blur-3xl animate-pulse group-hover:bg-yellow-400/40 transition-all" />
              <div className="w-32 h-32 bg-yellow-400 rounded-[35%] mx-auto flex items-center justify-center rotate-12 group-hover:rotate-[30deg] transition-transform duration-500 shadow-2xl">
                <Music className="w-16 h-16 text-black" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl font-oswald font-black uppercase tracking-tighter italic animate-in slide-in-from-bottom duration-700">
                C&C <span className="text-yellow-400">CRAFT</span>
              </h1>
              <p className="text-white/40 font-bold tracking-[0.6em] uppercase text-xs animate-in fade-in duration-1000 delay-300">
                Digital Engineering x Street Art
              </p>
            </div>

            <button 
              onClick={handleStart}
              disabled={!isReady}
              className="group relative px-20 py-6 bg-white text-black font-black uppercase tracking-[0.3em] rounded-full hover:bg-yellow-400 hover:scale-110 active:scale-95 transition-all disabled:opacity-20 flex items-center gap-6 mx-auto shadow-[0_20px_60px_rgba(255,255,255,0.1)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-4">
                {isReady ? (
                  <> <Play size={28} fill="black" /> DROP THE BEAT </>
                ) : (
                  <> <Loader2 className="animate-spin" /> SYNCING... </>
                )}
              </span>
            </button>
          </div>
          
          <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-30 animate-bounce">
            <span className="text-[10px] font-black tracking-widest uppercase">Scroll Down to start</span>
            <ChevronDown size={20} />
          </div>
        </div>
      )}

      {!isIntroActive && !showStartOverlay && (
        <button 
          onClick={() => setIsPortfolioOpen(true)}
          className="fixed bottom-36 right-10 z-[60] group flex items-center gap-4 bg-white text-black pl-8 pr-6 py-5 rounded-full font-black uppercase tracking-[0.2em] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:bg-yellow-400 hover:scale-110 active:scale-95 transition-all animate-in slide-in-from-right duration-500"
        >
          <Briefcase size={22} /> 
          <span>Explore Craft</span>
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <ChevronDown size={16} className="-rotate-90" />
          </div>
        </button>
      )}

      <header className="z-40 w-full p-10 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-1000 ${state.isPlaying ? 'bg-yellow-400 rotate-[15deg] shadow-2xl' : 'bg-white/5'}`}>
            <Music className={`w-7 h-7 ${state.isPlaying ? 'text-black' : 'text-white'}`} />
          </div>
          <div className="space-y-1">
            <h2 className="font-oswald text-2xl uppercase font-bold tracking-tight leading-none italic">
              C&C <span className="text-yellow-400">Engine</span>
            </h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${state.isPlaying ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`} />
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">
                {isIntroActive ? 'Cinematic Build-up' : 'Live Syncronization'}
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsPortfolioOpen(true)}
          className="bg-white/5 hover:bg-white/10 hover:border-white/20 border border-white/5 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all hidden lg:block backdrop-blur-md"
        >
          Full Portfolio View
        </button>
      </header>

      <main className={`flex-grow w-full max-w-7xl mx-auto flex items-center justify-center relative transition-all duration-1000 ${isIntroActive ? 'opacity-0 scale-75 blur-2xl' : 'opacity-100 scale-100'}`}>
        <LyricDisplay lyrics={LYRICS} currentTime={state.currentTime} isPlaying={state.isPlaying} />
      </main>

      <footer className="z-40 w-full p-12 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-white/20 w-16 tabular-nums">{formatTime(state.currentTime)}</span>
            <div className="relative flex-grow group h-10 flex items-center">
              <input
                type="range"
                min="0"
                max={state.duration || 0}
                value={state.currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-yellow-400 hover:h-1.5 transition-all"
              />
              <div 
                className="absolute left-0 h-1 bg-yellow-400 rounded-full pointer-events-none shadow-[0_0_20px_rgba(250,204,21,0.6)]" 
                style={{ width: `${state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-white/20 w-16 text-right tabular-nums">{formatTime(state.duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-20">
            <button 
              onClick={() => ytPlayerRef.current?.seekTo(Math.max(0, state.currentTime - 10))} 
              className="text-white/20 hover:text-white transition-all hover:scale-150 p-4"
            >
              <RotateCcw className="w-8 h-8 -scale-x-100" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="group relative w-28 h-28 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 active:scale-90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-5" />
              {state.isPlaying ? <Pause size={44} fill="black" /> : <Play size={44} className="ml-2" fill="black" />}
            </button>

            <button 
              onClick={() => ytPlayerRef.current?.seekTo(0)} 
              className="text-white/20 hover:text-white transition-all hover:scale-150 p-4"
            >
              <RotateCcw className="w-8 h-8" />
            </button>
          </div>
        </div>
      </footer>

      <Portfolio isOpen={isPortfolioOpen} onClose={() => setIsPortfolioOpen(false)} />
    </div>
  );
};

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default App;
