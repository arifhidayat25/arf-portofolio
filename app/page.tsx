
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Navigation } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

const sections = [
  { id: 'hero', component: HeroSection },
  { id: 'about', component: AboutSection },
  { id: 'skills', component: SkillsSection },
  { id: 'projects', component: ProjectsSection },
  { id: 'contact', component: ContactSection },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
  };

  // Fungsi navigasi khusus untuk Hero Section
  const handleNavigateToProjects = () => {
    setCurrentSection(3); // Projects section index
  };

  const handleNavigateToContact = () => {
    setCurrentSection(5); // Contact section index
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation 
            currentSection={currentSection} 
            onSectionChange={handleSectionChange}
          />
          
          <ThemeToggle />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {sections.map((section, index) => {
                const Component = section.component;
                return currentSection === index ? (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="min-h-screen"
                  >
                    {index === 0 ? (
                      // Hero section dengan navigasi khusus
                      <Component 
                        onNext={() => handleSectionChange(index + 1)} 
                        onNavigateToProjects={handleNavigateToProjects}
                        onNavigateToContact={handleNavigateToContact}
                      />
                    ) : (
                      // Section lainnya
                      <Component onNext={() => handleSectionChange(index + 1)} />
                    )}
                  </motion.div>
                ) : null;
              })}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </div>
  );
}
