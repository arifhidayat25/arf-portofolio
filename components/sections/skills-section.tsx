'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, Database, Palette, Smartphone, 
  Globe, Zap, Brain, GitBranch, Server, Layout
} from 'lucide-react';

interface SkillsSectionProps {
  onNext: () => void;
}

const categories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React', level: 95, color: '#61DAFB' },
      { name: 'Next.js', level: 90, color: '#000000' },
      { name: 'TypeScript', level: 88, color: '#3178C6' },
      { name: 'Tailwind CSS', level: 92, color: '#06B6D4' },
      { name: 'Framer Motion', level: 85, color: '#FF0066' },
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 85, color: '#339933' },
      { name: 'Python', level: 75, color: '#3776AB' },
      { name: 'PostgreSQL', level: 80, color: '#4169E1' },
      { name: 'MongoDB', level: 78, color: '#47A248' },
      { name: 'REST API', level: 88, color: '#FF6B6B' },
    ]
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: GitBranch,
    skills: [
      { name: 'Git', level: 90, color: '#F05032' },
      { name: 'Docker', level: 65, color: '#2496ED' },
      { name: 'Figma', level: 80, color: '#F24E1E' },
      { name: 'VS Code', level: 95, color: '#007ACC' },
      { name: 'Linux', level: 70, color: '#FCC624' },
    ]
  }
];

const allSkillsFlat = {
  frontend: [
    { icon: Code2, name: 'Frontend', level: 95, color: 'from-cyan-400 to-blue-500', description: 'React, Next.js, TypeScript' },
    { icon: Palette, name: 'UI/UX', level: 80, color: 'from-pink-400 to-rose-500', description: 'Figma, Design Systems' },
  ],
  backend: [
    { icon: Database, name: 'Backend', level: 85, color: 'from-green-400 to-emerald-500', description: 'Node.js, Python, APIs' },
    { icon: Server, name: 'Database', level: 82, color: 'from-violet-400 to-purple-500', description: 'PostgreSQL, MongoDB' },
  ],
  other: [
    { icon: Smartphone, name: 'Mobile', level: 60, color: 'from-orange-400 to-red-500', description: 'React Native, Flutter' },
    { icon: Globe, name: 'DevOps', level: 65, color: 'from-teal-400 to-cyan-500', description: 'Docker, AWS, CI/CD' },
    { icon: Brain, name: 'AI/ML', level: 70, color: 'from-fuchsia-400 to-pink-500', description: 'OpenAI, TensorFlow' },
    { icon: Zap, name: 'Performance', level: 78, color: 'from-amber-400 to-orange-500', description: 'Optimization, Caching' },
  ]
};

export function SkillsSection({ onNext }: SkillsSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeSkills = categories.find(c => c.id === activeCategory)?.skills || [];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
            <Zap className="w-4 h-4 text-lime-400" />
            <span className="text-sm font-mono text-slate-400">package.json → dependencies</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text-code">
            Tech Stack
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Technologies I work with to build amazing digital experiences
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-2 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:border-slate-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Display - Terminal Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="flex-1 text-center text-sm text-slate-400 font-mono">
              skills.json
            </span>
          </div>

          {/* Skills List */}
          <div className="p-6 font-mono">
            <div className="text-slate-500 mb-4">{`{`}</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="pl-4 space-y-4"
              >
                <div className="text-fuchsia-400">&quot;{activeCategory}&quot;: {`{`}</div>
                {activeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="pl-4 group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">&quot;{skill.name}&quot;</span>
                        <span className="text-slate-500">:</span>
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        {/* Progress bar */}
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden max-w-xs">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                        <span className="text-lime-400 text-sm">{skill.level}%</span>
                      </div>
                    </div>
                    {index < activeSkills.length - 1 && (
                      <span className="text-slate-500">,</span>
                    )}
                  </motion.div>
                ))}
                <div className="text-fuchsia-400">{`}`}</div>
              </motion.div>
            </AnimatePresence>
            <div className="text-slate-500 mt-4">{`}`}</div>
          </div>
        </motion.div>

        {/* Quick Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {allSkillsFlat.other.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 card-hover-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-mono text-white font-medium">{skill.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{skill.description}</p>
              </motion.div>
            );
          })}
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
            className="group px-6 py-3 bg-lime-500/20 border border-lime-500/50 rounded-lg font-mono text-lime-400
                       hover:bg-lime-500/30 hover:border-lime-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              $ show --projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}