'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TypewriterText } from '@/components/typewriter-text';
import { MorphingShapes } from '@/components/morphing-shapes';
import { ParticleField } from '@/components/particle-field';
import { InteractiveAvatar } from '@/components/interactive-avatar';

interface HeroSectionProps {
  onNext: () => void;
}

const roles = ['Developer', 'Designer', 'Creator', 'Innovator'];

export function HeroSection({ onNext }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(roleTimer);
  }, []);

  const handleNameHover = () => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setSparkles(newSparkles);
    
    setTimeout(() => setSparkles([]), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Field Background */}
      <ParticleField />

      {/* Background Morphing Shapes */}
      <MorphingShapes mousePosition={mousePosition} />

      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(29, 78, 216, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(29, 78, 216, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(15, 118, 110, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(15, 118, 110, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(29, 78, 216, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-6">
        {/* Left Side - Text Content */}
        <div className="flex-1 text-left">
          <motion.div
            className="relative inline-block mb-6"
            onHoverStart={handleNameHover}
            whileHover={{ scale: 1.02 }}
          >
            <TypewriterText
              text="A R F I D"
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-teal-400 bg-clip-text text-transparent block"
              delay={0.5}
              speed={100}
            />
            
            {/* Sparkles */}
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  opacity: [1, 1, 0],
                  rotate: 360 
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            ))}
            
            {/* Neon glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-blue-400/20 to-teal-400/20 blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Animated Role Text */}
          <div className="mb-8">
            <motion.span
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              Creative{' '}
            </motion.span>
            <div className="inline-block relative h-8 md:h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  className="absolute text-xl md:text-2xl font-semibold bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {roles[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.span
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              {' '}& Digital Artist
            </motion.span>
          </div>

          {/* Description */}
          <motion.p
            className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
           Membangun pengalaman digital yang menyatukan kreativitas dengan teknologi terkini.
              Antusias menghadirkan antarmuka imersif dan menghidupkan ide lewat baris kode.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              Jelajahi Karya saya 
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border-2 border-primary/50 text-primary rounded-full font-semibold text-lg hover:bg-primary/10 transition-colors"
              whileHover={{ 
                scale: 1.05,
                borderColor: "hsl(var(--primary))",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              Mari Terhubung
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side - Interactive Avatar */}
        <div className="flex-1 flex justify-center items-center">
          <InteractiveAvatar mousePosition={mousePosition} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={onNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/50 hover:border-primary transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-6 h-6" />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-violet-400 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-6 h-6 bg-teal-400 rounded-full"
        animate={{
          y: [10, -10, 10],
          opacity: [0.5, 1, 0.5],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full"
        animate={{
          x: [-5, 5, -5],
          y: [-5, 5, -5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}