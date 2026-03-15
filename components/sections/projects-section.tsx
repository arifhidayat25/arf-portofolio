'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, Star, GitFork, Code2 } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface ProjectsSectionProps {
  onNext: () => void;
}

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  language: string;
  languageColor: string;
  github: string;
  live: string;
  stars: number;
  forks: number;
}

const projects: Project[] = projectsData.projects;

export function ProjectsSection({ onNext }: ProjectsSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const handlePrevious = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
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
            <Code2 className="w-4 h-4 text-fuchsia-400" />
            <span className="text-sm font-mono text-slate-400">~/repositories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text-code">
            Proyek Unggulan
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Koleksi project yang telah saya kerjakan &amp; bangun
          </p>
        </motion.div>

        {/* Projects Grid - GitHub Style Cards */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <motion.button
            onClick={handlePrevious}
            className="absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Project Cards Carousel */}
          <div className="overflow-hidden mx-8 sm:mx-12">
            <motion.div
              className="flex"
              animate={{ x: `-${currentProject * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0 px-2">
                  <motion.div
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden card-hover-glow"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 sm:h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    {/* Project Content - GitHub Style */}
                    <div className="p-5">
                      {/* Repo header */}
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <h3 className="text-lg font-mono font-bold text-cyan-400 hover:underline cursor-pointer">
                          {project.title}
                        </h3>
                        <span className="px-2 py-0.5 text-xs border border-slate-600 rounded-full text-slate-400">
                          Public
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-slate-700/50 border border-slate-600/50 rounded-full text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Footer - Language & Stats */}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: project.languageColor }}
                          />
                          <span>{project.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          <span>{project.forks}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4 pt-4 border-t border-slate-700/50">
                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          className="flex-1 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg font-mono text-sm text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Details
                        </motion.button>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentProject 
                    ? 'bg-cyan-400 w-6' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Next button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            onClick={onNext}
            className="group px-6 py-3 bg-fuchsia-500/20 border border-fuchsia-500/50 rounded-lg font-mono text-fuchsia-400
                       hover:bg-fuchsia-500/30 hover:border-fuchsia-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              $ open --contact
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-lg text-white">{selectedProject.title}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <div 
                  className="text-slate-300 mb-6 space-y-2 [&_a]:text-cyan-400 [&_a]:underline hover:[&_a]:text-cyan-300"
                  dangerouslySetInnerHTML={{ __html: selectedProject.fullDescription.replace(/\n/g, '<br/>') }}
                />

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-sm text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-cyan-500 text-slate-900 font-mono font-medium rounded-lg text-center hover:bg-cyan-400 transition-colors"
                  >
                    View Live Demo
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-2 text-slate-300 hover:border-slate-600 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}