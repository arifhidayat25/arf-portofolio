'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { CodeBackground } from '@/components/code-background';
import { TerminalWindow } from '@/components/terminal-window';
import profileData from '@/data/profile.json';

interface HeroSectionProps {
  onNext: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
}

const roles = profileData.roles;
const fullName = profileData.name;
const description = profileData.description;
const techStack = profileData.techStack;
const social = profileData.social;

export function HeroSection({ onNext, onNavigateToProjects, onNavigateToContact }: HeroSectionProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Typing effect for name
  useEffect(() => {
    if (displayedName.length < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayedName(fullName.substring(0, displayedName.length + 1));
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
      setTimeout(() => setShowContent(true), 500);
    }
  }, [displayedName]);

  // Role rotation
  useEffect(() => {
    if (!isTypingComplete) return;
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(roleTimer);
  }, [isTypingComplete]);

  const handleProjectsClick = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    } else {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Code Rain Background */}
      <CodeBackground density={25} speed={20} opacity={0.1} />
      
      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        <TerminalWindow title="welcome.js" className="backdrop-blur-md">
          {/* Terminal Content */}
          <div className="space-y-4 font-mono">
            {/* Comment line */}
            <motion.p 
              className="text-slate-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {'// Hello, World! Welcome to my portfolio'}
            </motion.p>
            
            {/* Main name output */}
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-400">console</span>
              <span className="text-slate-400">.</span>
              <span className="text-cyan-400">log</span>
              <span className="text-slate-400">(</span>
              <span className="text-lime-400">&quot;</span>
              <motion.span 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-lime-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {displayedName}
                {!isTypingComplete && (
                  <motion.span
                    className="inline-block w-3 h-12 sm:h-16 md:h-20 bg-lime-400 ml-1 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}
              </motion.span>
              <span className="text-lime-400">&quot;</span>
              <span className="text-slate-400">);</span>
            </div>

            {/* Role definition */}
            <AnimatePresence mode="wait">
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-fuchsia-400">const</span>
                    <span className="text-orange-400">role</span>
                    <span className="text-slate-400">=</span>
                    <div className="relative h-7 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentRoleIndex}
                          className="text-lime-400"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          &quot;{roles[currentRoleIndex]}&quot;
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-slate-400">;</span>
                  </div>

                  {/* Description as comment */}
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
                    {`/* ${description} */`}
                  </p>

                  {/* Function call buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <motion.button
                      onClick={handleProjectsClick}
                      className="group relative px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg font-mono text-cyan-400 
                                 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Terminal className="w-4 h-4" />
                        <span>$ explore --projects</span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                    
                    <motion.button
                      onClick={handleContactClick}
                      className="group relative px-6 py-3 bg-fuchsia-500/20 border border-fuchsia-500/50 rounded-lg font-mono text-fuchsia-400
                                 hover:bg-fuchsia-500/30 hover:border-fuchsia-400 transition-all duration-300 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>$ connect --now</span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/20 to-fuchsia-500/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </div>

                  {/* Social links */}
                  <div className="pt-6 flex gap-4">
                    {[
                      { icon: Github, href: social.github, color: 'hover:text-white' },
                      { icon: Linkedin, href: social.linkedin, color: 'hover:text-blue-400' },
                      { icon: Mail, href: `mailto:${social.email}`, color: 'hover:text-cyan-400' },
                    ].map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-slate-400 ${item.color} transition-colors`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TerminalWindow>

        {/* Tech stack floating badges */}
        <motion.div 
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs font-mono text-slate-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={showContent ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                borderColor: 'hsl(var(--cyan))',
                color: 'hsl(var(--cyan))'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={onNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-mono">scroll.down()</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </div>
  );
}