
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Music, Loader2 } from 'lucide-react';
import LyricDisplay from './components/LyricDisplay';
import Visualizer from './components/Visualizer';
import IntroVisualizer from './components/IntroVisualizer';
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

  // Inicialização segura do YouTube
  useEffect(() => {
    const initPlayer = () => {
      if (!(window as any).YT || !(window as any).YT.Player) return;
      
      try {
        new (window as any).YT.Player('yt-player-element', {
          height: '100', // Tamanho mínimo para evitar suspensão do browser
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
              setState(prev => ({
                ...prev,
                isPlaying: event.data === (window as any).YT.PlayerState.PLAYING
              }));
            },
            onError: (e: any) => {
              console.error("YouTube Player Error Code:", e.data);
            }
          }
        });
      } catch (err) {
        console.error("Erro ao instanciar YT Player:", err);
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

  const isIntroActive = state.currentTime < 16;

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#050505] text-white font-inter">
      <Visualizer isPlaying={state.isPlaying} />
      
      <IntroVisualizer currentTime={state.currentTime} isPlaying={state.isPlaying} />
      
      {/* Container invisível mas presente para o YouTube */}
      <div className="fixed opacity-0 pointer-events-none z-[-100]">
        <div id="yt-player-element"></div>
      </div>

      {showStartOverlay && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl transition-all duration-1000">
          <div className="text-center space-y-10 p-12 border border-white/5 rounded-[40px] bg-white/[0.02] shadow-2xl">
            <div className="w-28 h-28 bg-yellow-400 rounded-full mx-auto flex items-center justify-center animate-pulse shadow-[0_0_80px_rgba(250,204,21,0.2)]">
              <Music className="w-12 h-12 text-black" />
            </div>
            <div className="space-y-3">
              <h1 className="text-6xl font-oswald font-black uppercase tracking-tighter italic">NORDESTE TECH</h1>
              <p className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-xs opacity-70">Sincronia Total | Dev Pride</p>
            </div>
            <button 
              onClick={handleStart}
              disabled={!isReady}
              className="group px-14 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-yellow-400 hover:scale-110 active:scale-95 transition-all disabled:opacity-30 flex items-center gap-4 mx-auto"
            >
              {isReady ? (
                <> <Play size={24} fill="black" className="group-hover:scale-125 transition-transform" /> Iniciar Experiência </>
              ) : (
                <> <Loader2 className="animate-spin" /> Conectando API </>
              )}
            </button>
          </div>
        </div>
      )}

      <header className="z-40 w-full p-8 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-700 ${state.isPlaying ? 'bg-yellow-400 rotate-[15deg] shadow-[0_0_20px_rgba(250,204,21,0.4)]' : 'bg-white/5'}`}>
            <Music className={`w-6 h-6 ${state.isPlaying ? 'text-black' : 'text-white'}`} />
          </div>
          <div>
            <h2 className="font-oswald text-xl uppercase font-bold tracking-tight leading-none mb-1">Portfolio x Lyrics</h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${state.isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-black">
                {isIntroActive ? 'Intro Sequence Active' : 'Live Syncing Lyrics'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-grow w-full max-w-6xl mx-auto flex items-center justify-center relative transition-all duration-700 ${isIntroActive ? 'opacity-10 scale-95 blur-md' : 'opacity-100 scale-100 blur-0'}`}>
        <LyricDisplay lyrics={LYRICS} currentTime={state.currentTime} isPlaying={state.isPlaying} />
      </main>

      <footer className="z-40 w-full p-10 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-mono text-white/30 tabular-nums">{formatTime(state.currentTime)}</span>
            <div className="relative flex-grow group h-8 flex items-center">
              <input
                type="range"
                min="0"
                max={state.duration || 0}
                value={state.currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-400"
              />
              <div 
                className="absolute left-0 h-1 bg-yellow-400 rounded-full pointer-events-none transition-all duration-100 shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                style={{ width: `${state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-white/30 tabular-nums">{formatTime(state.duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-16">
            <button onClick={() => ytPlayerRef.current?.seekTo(Math.max(0, state.currentTime - 10))} className="text-white/20 hover:text-white transition-all hover:scale-125">
              <RotateCcw className="w-7 h-7 -scale-x-100" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="group relative w-24 h-24 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 active:scale-90 transition-all shadow-[0_15px_40px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-5 group-hover:opacity-10" />
              {state.isPlaying ? <Pause size={36} fill="black" /> : <Play size={36} className="ml-1" fill="black" />}
            </button>

            <button onClick={() => ytPlayerRef.current?.seekTo(0)} className="text-white/20 hover:text-white transition-all hover:scale-125">
              <RotateCcw className="w-7 h-7" />
            </button>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-10 right-10 text-[10vh] font-black text-white/[0.02] select-none pointer-events-none font-oswald italic uppercase leading-none">
        Nordeste <br/> Power
      </div>
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
