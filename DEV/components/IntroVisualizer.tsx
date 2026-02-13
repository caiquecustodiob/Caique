
import React from 'react';
import { Terminal, Sun, Code2, Zap } from 'lucide-react';

interface IntroVisualizerProps {
  currentTime: number;
  isPlaying: boolean;
}

const IntroVisualizer: React.FC<IntroVisualizerProps> = ({ currentTime, isPlaying }) => {
  if (currentTime >= 16 || !isPlaying) return null;

  const isTechStage = currentTime >= 2.5 && currentTime < 7;
  const isProjectStage = currentTime >= 7 && currentTime < 13;
  const isNordesteStage = currentTime >= 13 && currentTime < 16;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Background Glitch Flash */}
      <div className={`absolute inset-0 transition-all duration-75 ${currentTime % 0.5 < 0.1 ? 'bg-white/5' : 'bg-transparent'}`} />

      {/* 1. TECH STACK (2.5s - 7s) */}
      {isTechStage && (
        <div className="flex flex-wrap justify-center gap-10 max-w-4xl px-10">
          {[
            { label: 'JS', color: 'bg-[#F7DF1E]', delay: '0s' },
            { label: 'PYTHON', color: 'bg-[#3776AB]', delay: '0.1s' },
            { label: 'NODE', color: 'bg-[#339933]', delay: '0.2s' },
            { label: 'HTML5', color: 'bg-[#E34F26]', delay: '0.3s' },
            { label: 'CSS3', color: 'bg-[#1572B6]', delay: '0.4s' }
          ].map((tech, i) => (
            <div 
              key={i}
              className={`p-8 ${tech.color} text-black rounded-3xl animate-tech-pop shadow-2xl`}
              style={{ animationDelay: tech.delay }}
            >
              <span className="font-oswald font-black text-5xl italic">{tech.label}</span>
            </div>
          ))}
          <div className="w-full flex justify-center mt-10 animate-pulse">
            <Zap className="w-20 h-20 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}

      {/* 2. PROJECT REVEAL (7s - 13s) */}
      {isProjectStage && (
        <div className="w-full h-full flex items-center justify-center bg-black/40">
          <div className="relative text-center w-full px-4">
             {currentTime >= 7 && currentTime < 8.5 && (
               <div className="animate-project-reveal">
                 <h2 className="text-[12vw] font-black italic tracking-tighter text-white drop-shadow-2xl">PRD</h2>
                 <div className="bg-yellow-400 text-black px-6 py-1 inline-block font-bold text-xl skew-x-[-10deg]">NORDESTE OPERATIONS</div>
               </div>
             )}
             {currentTime >= 8.5 && currentTime < 10 && (
               <div className="animate-project-reveal">
                 <h2 className="text-[12vw] font-black italic tracking-tighter text-red-600">RH+</h2>
                 <div className="bg-white text-black px-6 py-1 inline-block font-bold text-xl skew-x-[-10deg]">GENTE & GESTÃO</div>
               </div>
             )}
             {currentTime >= 10 && currentTime < 11.5 && (
               <div className="animate-project-reveal">
                 <h2 className="text-[12vw] font-black italic tracking-tighter text-blue-500">MATRIZLOG</h2>
                 <div className="bg-blue-600 text-white px-6 py-1 inline-block font-bold text-xl skew-x-[-10deg]">LOGÍSTICA SMART</div>
               </div>
             )}
             {currentTime >= 11.5 && currentTime < 13 && (
               <div className="animate-project-reveal">
                 <h2 className="text-[9vw] font-black italic tracking-tighter text-green-500 leading-none">POPDEMANUTENÇÃO</h2>
                 <div className="bg-white text-black px-6 py-1 inline-block font-bold text-xl skew-x-[-10deg]">TÉCNICA AVANÇADA</div>
               </div>
             )}
          </div>
        </div>
      )}

      {/* 3. NORDESTE POWER FINAL (13s - 16s) */}
      {isNordesteStage && (
        <div className="flex flex-col items-center gap-6">
           <div className="relative">
             <Sun className="w-48 h-48 text-yellow-500 animate-spin-slow opacity-20 absolute -inset-10 blur-xl" />
             <Sun className="w-48 h-48 text-yellow-400 animate-spin-slow" />
           </div>
           <div className="space-y-0 text-center">
             <h1 className="text-[15vw] font-black text-white italic tracking-tighter skew-x-[-15deg] leading-none animate-bounce">NORDESTE</h1>
             <div className="bg-yellow-400 text-black px-10 py-3 font-black text-6xl italic transform -rotate-2">NO TOPO</div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes tech-pop {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          70% { transform: scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes project-reveal {
          0% { transform: scale(2) skewX(20deg); opacity: 0; filter: blur(50px); }
          20% { transform: scale(0.9) skewX(-10deg); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1) skewX(0deg); opacity: 1; }
        }
        .animate-tech-pop {
          animation: tech-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-project-reveal {
          animation: project-reveal 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default IntroVisualizer;
