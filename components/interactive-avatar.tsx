'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface InteractiveAvatarProps {
  mousePosition: { x: number; y: number };
}

const ORBITS = [
  { emoji: '💻', radius: 120, duration: 16, delay: 0 },
  { emoji: '✨', radius: 100, duration: 13, delay: 6 },
];

const FLOATERS = [
  { emoji: '⚡', pos: '-top-4 -right-4', bg: 'bg-yellow-400', size: 'w-8 h-8', yAmp: 5, dur: 4 },
  { emoji: '🎨', pos: '-bottom-4 -left-4', bg: 'bg-pink-400', size: 'w-10 h-10', yAmp: 3, dur: 3 },
];

export function InteractiveAvatar({ mousePosition }: InteractiveAvatarProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // Throttled parallax via ref — no setState per frame
  const parallaxRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  // Update parallax ref without re-render
  const parallaxX = windowSize.width ? (mousePosition.x - windowSize.width / 2) * 0.015 : 0;
  const parallaxY = windowSize.height ? (mousePosition.y - windowSize.height / 2) * 0.015 : 0;

  return (
    <div ref={containerRef} className="relative">
      {/* Main Avatar Container */}
      <motion.div
        className="relative w-80 h-80 md:w-96 md:h-96"
        animate={{ x: parallaxX, y: parallaxY }}
        transition={{ type: 'spring', stiffness: 60, damping: 25 }}
      >
        {/* Breathing glow — single pulse */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/20 via-blue-400/20 to-teal-400/20 blur-xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Avatar Image */}
        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.4)' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-violet-500 via-blue-500 to-teal-500 flex items-center justify-center">
            <motion.div
              className="text-8xl md:text-9xl"
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              👨‍💻
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
        </motion.div>

        {/* Floating badges — reduced to 2 */}
        {FLOATERS.map((f, i) => (
          <motion.div
            key={i}
            className={`absolute ${f.pos} ${f.size} ${f.bg} rounded-full flex items-center justify-center shadow-lg`}
            animate={{ y: [-f.yAmp, f.yAmp, -f.yAmp] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut' }}
          >
            {f.emoji}
          </motion.div>
        ))}
      </motion.div>

      {/* Orbiting elements — reduced to 2, no stagger delay issues */}
      <div className="absolute inset-0 pointer-events-none">
        {ORBITS.map((orbit, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
            style={{ left: '50%', top: '50%', marginLeft: -16, marginTop: -16 }}
            animate={{
              x: [
                Math.cos(0) * orbit.radius,
                Math.cos(Math.PI / 2) * orbit.radius,
                Math.cos(Math.PI) * orbit.radius,
                Math.cos((3 * Math.PI) / 2) * orbit.radius,
                Math.cos(2 * Math.PI) * orbit.radius,
              ],
              y: [
                Math.sin(0) * orbit.radius,
                Math.sin(Math.PI / 2) * orbit.radius,
                Math.sin(Math.PI) * orbit.radius,
                Math.sin((3 * Math.PI) / 2) * orbit.radius,
                Math.sin(2 * Math.PI) * orbit.radius,
              ],
            }}
            transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear', delay: orbit.delay }}
          >
            <span className="text-sm">{orbit.emoji}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}