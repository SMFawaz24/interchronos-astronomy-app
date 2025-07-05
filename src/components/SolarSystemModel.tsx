import React, { useEffect, useRef } from 'react';
import { Info } from 'lucide-react';

interface Planet {
  name: string;
  distance: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  info: string;
}

const SolarSystemModel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const planetsRef = useRef<Planet[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize planets with realistic relative sizes and distances
    planetsRef.current = [
      { name: 'Mercury', distance: 40, size: 3, color: '#8C7853', speed: 0.04, angle: 0, info: 'Closest to Sun' },
      { name: 'Venus', distance: 55, size: 4, color: '#FFC649', speed: 0.035, angle: Math.PI / 4, info: 'Hottest planet' },
      { name: 'Earth', distance: 70, size: 4.5, color: '#6B93D6', speed: 0.03, angle: Math.PI / 2, info: 'Our home planet' },
      { name: 'Mars', distance: 85, size: 3.5, color: '#CD5C5C', speed: 0.025, angle: Math.PI, info: 'The Red Planet' },
      { name: 'Jupiter', distance: 110, size: 12, color: '#D8CA9D', speed: 0.015, angle: Math.PI * 1.2, info: 'Largest planet' },
      { name: 'Saturn', distance: 135, size: 10, color: '#FAD5A5', speed: 0.012, angle: Math.PI * 1.5, info: 'Has prominent rings' },
      { name: 'Uranus', distance: 155, size: 7, color: '#4FD0E7', speed: 0.008, angle: Math.PI * 1.8, info: 'Ice giant' },
      { name: 'Neptune', distance: 175, size: 6.5, color: '#4B70DD', speed: 0.006, angle: Math.PI * 2, info: 'Windiest planet' }
    ];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background space
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw orbital paths
      planetsRef.current.forEach(planet => {
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw Sun
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 15);
      sunGradient.addColorStop(0, '#FFD700');
      sunGradient.addColorStop(0.7, '#FFA500');
      sunGradient.addColorStop(1, '#FF6347');
      
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fill();

      // Sun glow effect
      const sunGlow = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 30);
      sunGlow.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
      sunGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();

      // Draw and update planets
      planetsRef.current.forEach(planet => {
        planet.angle += planet.speed;
        
        const x = centerX + Math.cos(planet.angle) * planet.distance;
        const y = centerY + Math.sin(planet.angle) * planet.distance;

        // Planet shadow/glow
        const planetGlow = ctx.createRadialGradient(x, y, 0, x, y, planet.size * 2);
        planetGlow.addColorStop(0, `${planet.color}80`);
        planetGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = planetGlow;
        ctx.beginPath();
        ctx.arc(x, y, planet.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw planet
        const planetGradient = ctx.createRadialGradient(x - planet.size/3, y - planet.size/3, 0, x, y, planet.size);
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(1, `${planet.color}CC`);
        
        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // Special effects for specific planets
        if (planet.name === 'Saturn') {
          // Draw Saturn's rings
          ctx.strokeStyle = 'rgba(250, 213, 165, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(x, y, planet.size * 1.8, planet.size * 0.3, planet.angle, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Planet labels
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, x, y + planet.size + 15);
      });

      // Draw Sun label
      ctx.fillStyle = '#FCD34D';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Sun', centerX, centerY + 35);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="glass-effect rounded-2xl p-6 stellar-glow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
        <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
          Solar System Model
        </h3>
        <Info className="w-4 h-4 text-slate-400" />
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-auto rounded-xl border border-slate-600/30"
        />
        
        <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            <span className="text-slate-300">Inner Planets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span className="text-slate-300">Gas Giants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-slate-300">Ice Giants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-px bg-slate-400"></div>
            <span className="text-slate-300">Orbits</span>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 mt-3 text-center">
          Real-time orbital simulation • Not to scale
        </p>
      </div>
    </div>
  );
};

export default SolarSystemModel;