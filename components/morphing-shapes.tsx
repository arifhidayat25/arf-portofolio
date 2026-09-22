'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface MorphingShapesProps {
  mousePosition: { x: number; y: number };
}

const shapes = [
  { id: 1, size: 380, color: 'bg-violet-500/10', blur: 'blur-2xl' },
  { id: 2, size: 280, color: 'bg-blue-500/10', blur: 'blur-xl' },
  { id: 3, size: 300, color: 'bg-teal-500/10', blur: 'blur-2xl' },
];

export function MorphingShapes({ mousePosition }: MorphingShapesProps) {
  // Throttle mouse position — only update state at most 30fps via rAF
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const latestMouse = useRef(mousePosition);

  useEffect(() => {
    latestMouse.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      setSmoothMouse(prev => ({
        x: prev.x + (latestMouse.current.x - prev.x) * 0.05,
        y: prev.y + (latestMouse.current.y - prev.y) * 0.05,
      }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full ${shape.color} ${shape.blur}`}
          style={{ width: shape.size, height: shape.size }}
          animate={{
            x: smoothMouse.x * (0.03 + shape.id * 0.01) + shape.id * 150,
            y: smoothMouse.y * (0.03 + shape.id * 0.01) + shape.id * 80,
            scale: [1, 1.15, 0.9, 1],
            borderRadius: [
              '50%',
              '45% 55% 60% 40%',
              '55% 45% 40% 60%',
              '50%',
            ],
          }}
          transition={{
            x: { type: 'spring', stiffness: 20, damping: 15 },
            y: { type: 'spring', stiffness: 20, damping: 15 },
            scale: { duration: 10 + shape.id * 2, repeat: Infinity, ease: 'easeInOut' },
            borderRadius: { duration: 12 + shape.id * 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </div>
  );
}