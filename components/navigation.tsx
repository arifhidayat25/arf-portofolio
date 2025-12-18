'use client';

import { motion } from 'framer-motion';
import { Home, User, Code2, Briefcase, Mail, Terminal } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
}

const navItems = [
  { id: 0, name: 'Home', icon: Home, shortcut: '~' },
  { id: 1, name: 'About', icon: User, shortcut: 'a' },
  { id: 2, name: 'Skills', icon: Code2, shortcut: 's' },
  { id: 3, name: 'Projects', icon: Briefcase, shortcut: 'p' },
  { id: 4, name: 'Contact', icon: Mail, shortcut: 'c' },
];

export function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40"
    >
      {/* Terminal-style nav container */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/50 p-2 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-1.5 px-2 py-2 mb-2 border-b border-slate-700/50">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] font-mono text-slate-500">nav</span>
        </div>

        {/* Nav items */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: isActive ? 0 : 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                </motion.div>

                {/* Label (visible on hover) */}
                <span className={`text-xs font-mono hidden sm:block ${isActive ? 'text-cyan-400' : ''}`}>
                  {item.name}
                </span>

                {/* Shortcut key badge */}
                <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded border hidden sm:block ${
                  isActive 
                    ? 'border-cyan-500/50 text-cyan-400/70 bg-cyan-500/10' 
                    : 'border-slate-700 text-slate-600 group-hover:border-slate-600 group-hover:text-slate-500'
                }`}>
                  {item.shortcut}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="mt-3 pt-2 border-t border-slate-700/50">
          <div className="flex justify-center gap-1">
            {navItems.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentSection 
                    ? 'w-4 bg-cyan-400' 
                    : i < currentSection 
                      ? 'w-1.5 bg-cyan-400/40' 
                      : 'w-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}