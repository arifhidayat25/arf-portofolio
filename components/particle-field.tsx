'use client';

import { useMemo } from 'react';

// Particles generated once at module level using seeded values — no random on render
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 3) * 100,
      y: seededRandom(i * 3 + 1) * 100,
      size: seededRandom(i * 3 + 2) * 3 + 1,
      duration: seededRandom(i * 7) * 15 + 10,
      delay: seededRandom(i * 11) * 5,
      floatX: (Math.sin(i) * 40).toFixed(1),
    })),
  []);

  const shootingStars = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 17 + 100) * 100,
      y: seededRandom(i * 13 + 100) * 50,
      delay: i * 4,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white/20 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `particle-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
            // Inline var for CSS animation x movement
            ['--float-x' as string]: `${p.floatX}px`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animation: `shooting-star 3s ${s.delay}s ease-out infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      <style>{`
        @keyframes particle-float {
          0%   { transform: translate(0, 0) scale(0); opacity: 0; }
          20%  { opacity: 1; scale: 1; }
          50%  { transform: translate(var(--float-x, 30px), -60px) scale(1); opacity: 0.8; }
          80%  { opacity: 0.3; }
          100% { transform: translate(0, -100px) scale(0); opacity: 0; }
        }
        @keyframes shooting-star {
          0%   { transform: translate(0, 0) scale(0); opacity: 0; }
          10%  { opacity: 1; transform: scale(1); }
          100% { transform: translate(200px, 100px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}