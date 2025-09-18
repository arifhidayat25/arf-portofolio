'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 0, label: 'Beranda', icon: '🏠' },
  { id: 1, label: 'Tentang', icon: '👨‍💻' },
  { id: 2, label: 'Keahlian', icon: '⚡' },
  { id: 3, label: 'Proyek', icon: '🚀' },
  { id: 4, label: 'Ulasan', icon: '💬' },
  { id: 5, label: 'Kontak', icon: '📧' },
];

interface NavigationProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40"
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
  );
}