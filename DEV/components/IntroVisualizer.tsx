
import React from 'react';
import { Terminal, Sun, Code2, Zap, Rocket, Cpu, Database, Shield } from 'lucide-react';

interface IntroVisualizerProps {
  currentTime: number;
  isPlaying: boolean;
}

const IntroVisualizer: React.FC<IntroVisualizerProps> = ({ currentTime, isPlaying }) => {
  if (currentTime >= 16 || !isPlaying) return null;

  // Fases da Intro (0-14s)
  const isPhase1 = currentTime >= 0 && currentTime < 4; // Code Rain / Initialization
  const isPhase2 = currentTime >= 4 && currentTime < 8; // Tech Stack Explosion
  const isPhase3 = currentTime >= 8 && currentTime < 12; // Project Rapid Cut
  const isPhase4 = currentTime >= 12 && currentTime < 14.5; // Final Drop Build-up

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden bg-black/40">
      {/* Background Pulse Layer */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`absolute inset-0 bg-yellow-500/5 mix-blend-overlay ${currentTime % 0.4 < 0.2 ? 'opacity-20' : 'opacity-0'}`} />
      </div>

      {/* PHASE 1: INITIALIZING (0-4s) */}
      {isPhase1 && (
        <div className="flex flex-col items-center gap-6 animate-in zoom-in-50 duration-500">
          <div className="relative">
            <Cpu className="w-24 h-24 text-yellow-400 animate-pulse" />
            <div className="absolute inset-0 animate-ping bg-yellow-400/20 rounded-full" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-4xl font-oswald font-black italic tracking-[0.5em] text-white">INITIALIZING</h2>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 transition-all duration-100" 
                style={{ width: `${(currentTime / 4) * 100}%` }} 
              />
            </div>
          </div>
          <div className="font-mono text-[10px] text-yellow-400/50 flex gap-4">
            <span>[ SYSTEM: ACTIVE ]</span>
            <span>[ BY: CAIQUE ]</span>
            <span>[ STACK: MERN ]</span>
          </div>
        </div>
      )}

      {/* PHASE 2: TECH STACK EXPLOSION (4-8s) */}
      {isPhase2 && (
        <div className="relative w-full h-full flex items-center justify-center">
          {[
            { icon: <Code2 />, label: 'JS', top: '20%', left: '20%', color: 'text-yellow-400' },
            { icon: <Database />, label: 'NODE', top: '70%', left: '15%', color: 'text-green-500' },
            { icon: <Shield />, label: 'PYTHON', top: '15%', left: '75%', color: 'text-blue-500' },
            { icon: <Rocket />, label: 'HTML5', top: '75%', left: '80%', color: 'text-orange-500' },
            { icon: <Zap />, label: 'REACT', top: '45%', left: '50%', color: 'text-cyan-400' },
          ].map((item, i) => (
            <div 
              key={i}
              className={`absolute flex flex-col items-center animate-float-tech transition-all duration-700 ${item.color}`}
              style={{ 
                top: item.top, 
                left: item.left, 
                animationDelay: `${i * 0.2}s`,
                transform: `scale(${1 + Math.sin(currentTime * 2) * 0.1})`
              }}
            >
              <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
                {item.icon}
              </div>
              <span className="mt-2 font-black text-xs tracking-widest">{item.label}</span>
            </div>
          ))}
          <h1 className="text-[10vw] font-oswald font-black text-white/10 italic leading-none select-none">
            DEVELOPMENT POWER
          </h1>
        </div>
      )}

      {/* PHASE 3: PROJECT RAPID CUT (8-12s) */}
      {isPhase3 && (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="text-center relative">
            <div className="absolute inset-0 bg-yellow-400 blur-[100px] opacity-20 animate-pulse" />
            
            {currentTime >= 8 && currentTime < 9 && (
              <div className="animate-reveal-project-fast">
                <h3 className="text-9xl font-black italic tracking-tighter text-white">PRD</h3>
                <p className="text-yellow-400 font-bold tracking-[1em]">LOGÍSTICA</p>
              </div>
            )}
            {currentTime >= 9 && currentTime < 10 && (
              <div className="animate-reveal-project-fast">
                <h3 className="text-9xl font-black italic tracking-tighter text-red-600">RH+</h3>
                <p className="text-white font-bold tracking-[1em]">GESTÃO</p>
              </div>
            )}
            {currentTime >= 10 && currentTime < 11 && (
              <div className="animate-reveal-project-fast">
                <h3 className="text-9xl font-black italic tracking-tighter text-blue-500">MATRIZLOG</h3>
                <p className="text-white font-bold tracking-[0.5em]">DISTRIBUIÇÃO</p>
              </div>
            )}
            {currentTime >= 11 && currentTime < 12 && (
              <div className="animate-reveal-project-fast">
                <h3 className="text-7xl md:text-9xl font-black italic tracking-tighter text-green-500">POP MANUTENÇÃO</h3>
                <p className="text-white font-bold tracking-[0.5em]">EFICIÊNCIA</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHASE 4: FINAL DROP BUILD-UP (12-14.5s) */}
      {isPhase4 && (
        <div className="flex flex-col items-center justify-center w-full h-full bg-yellow-400/5 backdrop-blur-[2px]">
          <div className="relative animate-shake-intense">
            <h2 className="text-[15vw] font-oswald font-black italic tracking-tighter text-white leading-none">C&C CRAFT</h2>
            <div className="absolute -bottom-4 right-0 bg-white text-black px-6 py-2 font-black text-3xl skew-x-[-12deg]">READY?</div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[1px] bg-yellow-400 rotate-45 animate-scanline" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[1px] bg-yellow-400 -rotate-45 animate-scanline" />
        </div>
      )}

      <style>{`
        @keyframes float-tech {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes reveal-project-fast {
          0% { transform: scale(0.5) blur(20px); opacity: 0; }
          10% { transform: scale(1.2); opacity: 1; blur(0px); }
          90% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5) blur(40px); opacity: 0; }
        }
        @keyframes shake-intense {
          0% { transform: translate(0,0); }
          10% { transform: translate(-5px, 5px) rotate(-1deg); }
          20% { transform: translate(5px, -5px) rotate(1deg); }
          30% { transform: translate(-10px, 0px); }
          40% { transform: translate(10px, 0px); }
          100% { transform: translate(0,0); }
        }
        @keyframes scanline {
          0% { opacity: 0; width: 0; }
          50% { opacity: 1; width: 200vw; }
          100% { opacity: 0; width: 300vw; }
        }
        .animate-float-tech {
          animation: float-tech 3s ease-in-out infinite;
        }
        .animate-reveal-project-fast {
          animation: reveal-project-fast 1s ease-out forwards;
        }
        .animate-shake-intense {
          animation: shake-intense 0.1s linear infinite;
        }
        .animate-scanline {
          animation: scanline 0.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default IntroVisualizer;
