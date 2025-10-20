'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProjectsSectionProps {
  onNext: () => void;
}

const projects = [
  {
    id: 1,
    title: 'Website Desa',
    description: 'Platform desa modern ',
    fullDescription: 'Solusi e-commerce komprehensif yang dibangun dengan Next.js dan Node.js, menampilkan algoritma machine learning untuk rekomendasi produk yang dipersonalisasi, pelacakan inventori real-time, dan integrasi pembayaran yang mulus. Platform ini mencakup dashboard admin, analitik pelanggan, dan desain yang responsif mobile.',
    image: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fdesa-website-lake.vercel.app%2F?w=1280&h=720',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://desa-website-lake.vercel.app/',
    category: 'Full Stack',
  },

  {
    id: 2,
    title: 'Muslim Lifestyle PWA',
    description: 'Sebuah Progressive Web App (PWA) yang dirancang untuk membantu aktivitas ibadah harian umat Muslim. Aplikasi ini kaya fitur, modern, dan dapat diinstal di perangkat Anda untuk akses offline.',
    fullDescription: 'PWA Ibadah Harian Muslim adalah aplikasi web progresif (Progressive Web App) yang dirancang khusus untuk membantu umat Muslim dalam menjalankan ibadah sehari-hari dengan lebih mudah, teratur, dan nyaman. Dibangun dengan teknologi modern yang mendukung akses offline, instalasi langsung di perangkat, dan tampilan responsif, aplikasi ini menghadirkan pengalaman seperti aplikasi mobile tanpa perlu mengunduh dari Play Store atau App Store.',
    image: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fdaily-muslim.netlify.app%2F?w=1280&h=720',
    technologies: ['React', 'Framer Motion', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://daily-muslim.netlify.app/',
    category: 'Frontend',
  },

   {
    id: 3,
    title: 'Web Puisi',
    description: 'Website puisi interaktif dengan visualisasi data dan fitur komunitas.',
    fullDescription: 'Situs web puisi interaktif yang menggabungkan visualisasi data dinamis dan fitur komunitas untuk penulis dan pembaca. Dibangun dengan React dan D3.js, menampilkan pembuat puisi kolaboratif, analitik pembaca, dan integrasi media sosial.',
    image: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fweb-puisi-react.vercel.app%2F?w=1280&h=720es.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'supabase', 'next-auth', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://web-puisi-react.vercel.app/',
    category: 'Full stack',
  },

  {
    id: 4,
    title: 'Platform Portfolio CMS',
    description: 'Pembuat portfolio interaktif untuk seniman dan desainer dengan animasi kustom dan integrasi CMS.',
    fullDescription: 'Platform portfolio inovatif yang memungkinkan profesional kreatif untuk memamerkan karya mereka dengan animasi menakjubkan dan elemen interaktif. Dibangun dengan React dan Framer Motion, menampilkan pembuat drag-and-drop, tema kustom, dan manajemen konten yang mulus.',
    image: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fcompany-profile-cms-brown.vercel.app%2F?w=1280&h=720https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Framer Motion', 'Supabase', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://company-profile-cms-brown.vercel.app/',
    category: 'Frontend',
  },
  {
    id: 4,
    title: 'Web Puisi',
    description: 'Website puisi interaktif dengan visualisasi data dan fitur komunitas.',
    fullDescription: 'Situs web puisi interaktif yang menggabungkan visualisasi data dinamis dan fitur komunitas untuk penulis dan pembaca. Dibangun dengan React dan D3.js, menampilkan pembuat puisi kolaboratif, analitik pembaca, dan integrasi media sosial.',
    image: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fweb-puisi-react.vercel.app%2F?w=1280&h=720es.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'supabase', 'next-auth', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://web-puisi-react.vercel.app/',
    category: 'Full stack',
  },
  
];

export function ProjectsSection({ onNext }: ProjectsSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handlePrevious = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handlePrevious();
    } else if (info.offset.x < -100) {
      handleNext();
    }
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
            Proyek Unggulan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Geser kiri atau kanan untuk menjelajahi karya terbaru saya, atau klik untuk melihat detail
          </p>
        </motion.div>

        {/* Project Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${currentProject * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="w-full flex-shrink-0 px-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 overflow-hidden shadow-2xl">
                  {/* Project Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <motion.div
                      className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.category}
                    </motion.div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <motion.h3
                      className="text-2xl font-bold mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-muted-foreground mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Technologies */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.7 + techIndex * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Lihat Detail
                      </motion.button>
                      
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentProject ? 'bg-primary' : 'bg-muted'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

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
            Baca Testimoni
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-muted-foreground mb-6">{selectedProject.fullDescription}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
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
                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium text-center hover:bg-primary/90 transition-colors"
                  >
                    Lihat Proyek Live
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-full font-medium transition-colors flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Kode Sumber
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