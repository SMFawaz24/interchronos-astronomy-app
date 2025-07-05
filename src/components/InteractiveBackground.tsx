import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'asteroid' | 'comet' | 'star';
  rotation: number;
  rotationSpeed: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  angle: number;
  speed: number;
  orbitRadius: number;
  centerX: number;
  centerY: number;
  color: string;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const rocketRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, visible: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 30; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          type: Math.random() < 0.4 ? 'asteroid' : Math.random() < 0.7 ? 'comet' : 'star',
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.1
        });
      }
    };

    // Initialize planets
    const initPlanets = () => {
      planetsRef.current = [
        {
          x: 0, y: 0, radius: 8, angle: 0, speed: 0.02, orbitRadius: 150,
          centerX: canvas.width * 0.2, centerY: canvas.height * 0.3,
          color: '#ff6b6b'
        },
        {
          x: 0, y: 0, radius: 12, angle: Math.PI, speed: 0.015, orbitRadius: 200,
          centerX: canvas.width * 0.8, centerY: canvas.height * 0.7,
          color: '#4ecdc4'
        },
        {
          x: 0, y: 0, radius: 6, angle: Math.PI / 2, speed: 0.025, orbitRadius: 100,
          centerX: canvas.width * 0.6, centerY: canvas.height * 0.2,
          color: '#45b7d1'
        }
      ];
    };

    initParticles();
    initPlanets();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newMousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setMousePos(newMousePos);

      // Trigger rocket movement
      rocketRef.current.targetX = newMousePos.x;
      rocketRef.current.targetY = newMousePos.y;
      rocketRef.current.visible = true;
    };

    const handleMouseLeave = () => {
      rocketRef.current.visible = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction - attract particles
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle based on type
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        if (particle.type === 'asteroid') {
          ctx.fillStyle = '#8b5a3c';
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const radius = particle.size * (0.8 + Math.random() * 0.4);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else if (particle.type === 'comet') {
          // Comet head
          ctx.fillStyle = '#87ceeb';
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Comet tail
          ctx.strokeStyle = 'rgba(135, 206, 235, 0.5)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-particle.vx * 10, -particle.vy * 10);
          ctx.stroke();
        } else {
          // Twinkling star
          const twinkle = Math.sin(Date.now() * 0.01 + index) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + twinkle * 0.5})`;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * (0.5 + twinkle * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // Draw and update planets
      planetsRef.current.forEach(planet => {
        planet.angle += planet.speed;
        planet.x = planet.centerX + Math.cos(planet.angle) * planet.orbitRadius;
        planet.y = planet.centerY + Math.sin(planet.angle) * planet.orbitRadius;

        // Draw orbit path
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(planet.centerX, planet.centerY, planet.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw planet
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fill();

        // Planet glow
        const gradient = ctx.createRadialGradient(
          planet.x, planet.y, 0,
          planet.x, planet.y, planet.radius * 2
        );
        gradient.addColorStop(0, `${planet.color}40`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw rocket following mouse
      if (rocketRef.current.visible) {
        const rocket = rocketRef.current;
        
        // Smooth movement towards target
        rocket.x += (rocket.targetX - rocket.x) * 0.1;
        rocket.y += (rocket.targetY - rocket.y) * 0.1;

        ctx.save();
        ctx.translate(rocket.x, rocket.y);
        
        // Calculate rotation based on movement direction
        const angle = Math.atan2(rocket.targetY - rocket.y, rocket.targetX - rocket.x);
        ctx.rotate(angle + Math.PI / 2);

        // Draw rocket
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(-8, 15);
        ctx.lineTo(0, 10);
        ctx.lineTo(8, 15);
        ctx.closePath();
        ctx.fill();

        // Rocket flame
        ctx.fillStyle = '#ffa500';
        ctx.beginPath();
        ctx.moveTo(-3, 15);
        ctx.lineTo(0, 25 + Math.random() * 5);
        ctx.lineTo(3, 15);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default InteractiveBackground;