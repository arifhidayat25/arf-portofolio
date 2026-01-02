'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GitCommit, GitBranch, Code, Briefcase, GraduationCap, Rocket, Award, Star, Heart } from 'lucide-react';
import profileData from '@/data/profile.json';

interface AboutSectionProps {
  onNext: () => void;
}

// Icon mapping
const iconMap: Record<string, any> = {
  Rocket, Briefcase, GraduationCap, Code, Award, Star, Heart
};

// Transform journey data from JSON
const commits = profileData.journey.map(item => ({
  ...item,
  icon: iconMap[item.icon] || Rocket
}));

export function AboutSection({ onNext }: AboutSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-slate-400">git log --oneline --graph</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text-code">
            Perjalanan Saya
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-mono">
            // From curious beginner to passionate developer
          </p>
        </motion.div>

        {/* Git Log Timeline */}
        <div className="relative">
          {/* Main branch line */}
          <motion.div
            className="absolute left-6 sm:left-8 top-0 w-0.5 bg-gradient-to-b from-cyan-500 via-fuchsia-500 to-lime-500"
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          {/* Commits */}
          <div className="space-y-6">
            {commits.map((commit, index) => {
              const Icon = commit.icon;
              return (
                <motion.div
                  key={commit.hash}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Commit dot */}
                  <motion.div
                    className="absolute left-4 sm:left-6 w-4 h-4 bg-slate-900 border-2 border-cyan-500 rounded-full"
                    whileHover={{ scale: 1.3, borderColor: 'hsl(var(--lime))' }}
                  >
                    <div className="absolute inset-0 bg-cyan-500/30 rounded-full animate-ping" />
                  </motion.div>

                  {/* Commit Card */}
                  <motion.div
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden card-hover-glow"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Commit header */}
                    <div className="px-4 sm:px-6 py-3 bg-slate-800/80 border-b border-slate-700/50 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <GitCommit className="w-4 h-4 text-cyan-400" />
                        <span className="font-mono text-sm text-amber-400">{commit.hash}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-500">|</span>
                      <span className="font-mono text-xs text-slate-400">{commit.date}</span>
                      <span className="px-2 py-0.5 bg-fuchsia-500/20 border border-fuchsia-500/50 rounded text-xs font-mono text-fuchsia-400">
                        {commit.branch}
                      </span>
                    </div>

                    {/* Commit body */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="p-3 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 rounded-lg border border-cyan-500/30"
                          whileHover={{ rotate: 10 }}
                        >
                          <Icon className="w-6 h-6 text-cyan-400" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-mono">
                            {commit.title}
                          </h3>
                          <p className="text-slate-400 text-sm mb-3">
                            {commit.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs font-mono">
                            <span className="text-lime-400">+{commit.additions}</span>
                            {commit.deletions > 0 && (
                              <span className="text-red-400">-{commit.deletions}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={onNext}
            className="group px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg font-mono text-cyan-400
                       hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              $ view --skills
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