'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Code, Coffee } from 'lucide-react';

interface AboutSectionProps {
  onNext: () => void;
}

const timelineItems = [
  {
    year: '2019',
    title: 'Memulai Belajar Kode',
    description: 'Memulai perjalanan dengan HTML, CSS, dan JavaScript',
    icon: Code,
    avatar: '👶',
  },
  {
    year: '2022',
    title: 'Mahasiswa Universitas',
    description: 'Jurusan Sistem Informasi, fokus pada pengembangan web',
    icon: Calendar,
    avatar: '🎓',
  },
  {
    year: '2025',
    title: 'Magang Pertama',
    description: 'Frontend Developer di ITSK Dr Soepraoen',
    icon: MapPin,
    avatar: '💻',
  },
  {
    year: '2025',
    title: 'Full Stack Developer',
    description: 'Membangun aplikasi yang dapat diskalakan dengan teknologi modern',
    icon: Coffee,
    avatar: '🚀',
  },
];

export function AboutSection({ onNext }: AboutSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
            Perjalanan Saya
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dari pemula yang penasaran hingga developer yang penuh semangat, inilah bagaimana cerita saya berlangsung
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-px h-full w-px bg-gradient-to-b from-violet-400 via-blue-400 to-teal-400"
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.year}
                className={`relative flex items-center ${
                  isEven ? 'justify-start' : 'justify-end'
                } mb-16`}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              >
                {/* Content */}
                <motion.div
                  className={`w-80 ${isEven ? 'mr-8 text-right' : 'ml-8 text-left'}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-3xl">{item.avatar}</span>
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-primary font-semibold">{item.year}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>

                {/* Icon in center */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-background"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Parallax background elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-violet-500/10 rounded-full blur-xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-xl"
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Next button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={onNext}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Keahlian Saya
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}