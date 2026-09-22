'use client';

import { useEffect, useState, useMemo } from 'react';

interface CodeBackgroundProps {
  density?: number;
  speed?: number;
  opacity?: number;
}

const codeChars = [
  '{', '}', '(', ')', '[', ']', '<', '>',
  ';', ':', '=', '+', '-', '&', '|',
  '0', '1', 'const', 'let', 'fn', '=>',
  'if', 'return', 'true', 'null', 'async', 'await'
];

// Seeded pseudo-random to avoid re-randomizing on every render
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function CodeBackground({
  density = 12,
  speed = 18,
  opacity = 0.12,
}: CodeBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const columns = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      x: (i / density) * 100 + sr(i * 5) * 4,
      chars: Array.from(
        { length: 8 + Math.floor(sr(i * 7) * 6) },
        (_, j) => codeChars[Math.floor(sr(i * 13 + j) * codeChars.length)]
      ),
      duration: speed + sr(i * 3) * 8,
      delay: -(sr(i * 11) * speed), // negative delay = start mid-animation (no all-at-once drop)
      colOpacity: opacity * (0.5 + sr(i * 17) * 0.5),
    }));
  }, [density, speed, opacity, mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute font-mono text-xs text-cyan-500/20 whitespace-nowrap"
          style={{
            left: `${col.x}%`,
            opacity: col.colOpacity,
            animation: `code-rain-fall ${col.duration}s ${col.delay}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {col.chars.map((char, i) => (
            <div
              key={i}
              className="leading-6"
              style={{
                opacity: 1 - (i / col.chars.length) * 0.7,
                color: i === 0 ? 'hsl(186 100% 50% / 0.6)' : undefined,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <style>{`
        @keyframes code-rain-fall {
          from { transform: translateY(-100%); }
          to   { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}
