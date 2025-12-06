'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 0, label: 'Beranda', icon: '🏠' },
  { id: 1, label: 'Tentang', icon: '👨‍💻' },
  { id: 2, label: 'Keahlian', icon: '⚡' },
  { id: 3, label: 'Proyek', icon: '🚀' },
  { id: 4, label: 'Kontak', icon: '📧' },
];

interface NavigationProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  return (
    <>
      {/* Desktop Navigation - Sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden md:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-40"
      >
        <div className="flex flex-col space-y-4 bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "relative w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-colors",
                currentSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-white/10 text-muted-foreground"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {currentSection === item.id && (
                <motion.div
                  layoutId="navHighlight"
                  className="absolute inset-0 bg-primary rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation - Bottom Bar */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe"
      >
        <div className="flex justify-around items-center bg-black/40 backdrop-blur-md border-t border-white/10 px-2 py-3">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px]",
                currentSection === item.id
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {currentSection === item.id && (
                <motion.div
                  layoutId="navHighlightMobile"
                  className="absolute inset-0 bg-primary/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}