
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      time += isPlaying ? 0.05 : 0.01;
      
      // Clear with slight trail
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw "Twist" lines
      ctx.beginPath();
      ctx.strokeStyle = isPlaying ? 'rgba(250, 204, 21, 0.05)' : 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 40; i++) {
        const angle = (i / 20) * Math.PI + time * 0.2;
        const radius = 100 + i * 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Dynamic Orbs
      for (let i = 0; i < 5; i++) {
        const orbitAngle = time * 0.5 + (i * Math.PI * 2) / 5;
        const orbitRadius = 200 + Math.sin(time) * 50;
        const ox = centerX + Math.cos(orbitAngle) * orbitRadius;
        const oy = centerY + Math.sin(orbitAngle) * orbitRadius;

        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, 150);
        gradient.addColorStop(0, isPlaying ? 'rgba(250, 204, 21, 0.1)' : 'rgba(255,255,255,0.05)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
    </div>
  );
};

export default Visualizer;
