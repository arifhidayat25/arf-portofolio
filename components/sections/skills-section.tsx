'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, Database, Palette, Smartphone, 
  Globe, Zap, Brain, Users 
} from 'lucide-react';

interface SkillsSectionProps {
  onNext: () => void;
}

const skills = [
  {
    id: 1,
    name: 'Frontend',
    icon: Code2,
    level: 95,
    color: 'from-violet-400 to-purple-600',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    description: 'Membangun antarmuka pengguna yang indah dan responsif dengan framework modern dan praktik terbaik.',
  },
  {
    id: 2,
    name: 'Backend',
    icon: Database,
    level: 85,
    color: 'from-blue-400 to-cyan-600',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    description: 'Membuat aplikasi server-side yang kuat dan mengelola arsitektur database yang kompleks.',
  },
  {
    id: 3,
    name: 'Desain',
    icon: Palette,
    level: 80,
    color: 'from-pink-400 to-rose-600',
    technologies: ['Figma', 'Adobe Suite', 'Framer', 'Principle'],
    description: 'Menciptakan pengalaman pengguna yang intuitif dengan fokus pada estetika dan kegunaan.',
  },
  {
    id: 4,
    name: 'Mobile',
    icon: Smartphone,
    level: 10,
    color: 'from-green-400 to-emerald-600',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    description: 'Mengembangkan aplikasi mobile lintas platform dengan performa native.',
  },
  {
    id: 5,
    name: 'DevOps',
    icon: Globe,
    level: 20,
    color: 'from-orange-400 to-red-600',
    technologies: ['Docker', 'AWS', 'GitHub Actions', 'Kubernetes'],
    description: 'Menyederhanakan proses deployment dan mengelola infrastruktur cloud.',
  },
  {
    id: 6,
    name: 'AI/ML',
    icon: Brain,
    level: 90,
    color: 'from-teal-400 to-blue-600',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Hugging Face'],
    description: 'Mengimplementasikan solusi cerdas dengan machine learning dan teknologi AI.',
  },
  {
    id: 7,
    name: 'Performa',
    icon: Zap,
    level: 70,
    color: 'from-yellow-400 to-orange-600',
    technologies: ['Optimasi', 'Caching', 'CDN', 'Monitoring'],
    description: 'Mengoptimalkan aplikasi untuk kecepatan dan efisiensi maksimal.',
  },
  {
    id: 8,
    name: 'Kolaborasi',
    icon: Users,
    level: 95,
    color: 'from-indigo-400 to-purple-600',
    technologies: ['Git', 'Agile', 'Slack', 'Notion'],
    description: 'Bekerja efektif dalam tim dengan alat kolaborasi modern dan metodologi.',
  },
];

export function SkillsSection({ onNext }: SkillsSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (skillId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  };

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
            Keahlian & Keunggulan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Klik pada kartu keahlian untuk menemukan teknologi yang saya gunakan
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isFlipped = flippedCards.has(skill.id);
            
            return (
              <motion.div
                key={skill.id}
                className="relative h-64 cursor-pointer perspective-1000"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredSkill(skill.id)}
                onHoverEnd={() => setHoveredSkill(null)}
                onClick={() => handleCardClick(skill.id)}
              >
                <motion.div
                  className="relative w-full h-full transform-style-preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {/* Front of card */}
                  <motion.div
                    className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl border border-border/50 p-6 flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center mb-4`}
                      animate={hoveredSkill === skill.id ? { rotate: 360, scale: 1.1 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      />
                    </div>
                    
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </motion.div>

                  {/* Back of card */}
                  <motion.div
                    className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 flex flex-col justify-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="text-lg font-bold mb-3 text-center">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      {skill.description}
                    </p>
                    <div className="space-y-2">
                      {skill.technologies.map((tech, i) => (
                        <motion.div
                          key={tech}
                          className="text-xs bg-primary/20 rounded-full px-3 py-1 text-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isFlipped ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Orbiting icons */}
        <motion.div className="relative mt-16 flex justify-center">
          <div className="relative w-32 h-32">
            {[Code2, Database, Palette, Zap].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                  x: [
                    Math.cos((index * Math.PI) / 2) * 60,
                    Math.cos((index * Math.PI) / 2 + Math.PI / 4) * 60,
                    Math.cos((index * Math.PI) / 2 + Math.PI / 2) * 60,
                    Math.cos((index * Math.PI) / 2 + (3 * Math.PI) / 4) * 60,
                    Math.cos((index * Math.PI) / 2 + Math.PI) * 60,
                  ],
                  y: [
                    Math.sin((index * Math.PI) / 2) * 60,
                    Math.sin((index * Math.PI) / 2 + Math.PI / 4) * 60,
                    Math.sin((index * Math.PI) / 2 + Math.PI / 2) * 60,
                    Math.sin((index * Math.PI) / 2 + (3 * Math.PI) / 4) * 60,
                    Math.sin((index * Math.PI) / 2 + Math.PI) * 60,
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={onNext}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Proyek Saya
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}