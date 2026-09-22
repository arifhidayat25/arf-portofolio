'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/navigation';

// Lazy load section components — only load when needed
const HeroSection = lazy(() => import('@/components/sections/hero-section').then(m => ({ default: m.HeroSection })));
const AboutSection = lazy(() => import('@/components/sections/about-section').then(m => ({ default: m.AboutSection })));
const SkillsSection = lazy(() => import('@/components/sections/skills-section').then(m => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import('@/components/sections/projects-section').then(m => ({ default: m.ProjectsSection })));
const ContactSection = lazy(() => import('@/components/sections/contact-section').then(m => ({ default: m.ContactSection })));

const sections = [
  { id: 'hero', component: HeroSection },
  { id: 'about', component: AboutSection },
  { id: 'skills', component: SkillsSection },
  { id: 'projects', component: ProjectsSection },
  { id: 'contact', component: ContactSection },
];

// Minimal section fallback
function SectionFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced from 2000ms → 600ms — enough for first paint
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
  };

  const handleNavigateToProjects = () => setCurrentSection(3);
  const handleNavigateToContact = () => setCurrentSection(4);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {sections.map((section, index) => {
                const Component = section.component;
                return currentSection === index ? (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="min-h-screen"
                  >
                    <Suspense fallback={<SectionFallback />}>
                      {index === 0 ? (
                        <Component
                          onNext={() => handleSectionChange(index + 1)}
                          onNavigateToProjects={handleNavigateToProjects}
                          onNavigateToContact={handleNavigateToContact}
                        />
                      ) : (
                        <Component onNext={() => handleSectionChange(index + 1)} />
                      )}
                    </Suspense>
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
