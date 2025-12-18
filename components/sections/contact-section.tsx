'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Sparkles, Bot } from 'lucide-react';

interface ContactSectionProps {
  onNext: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Smart responses based on keywords
const getSmartResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();
  
  // Greetings
  if (msg.match(/^(halo|hai|hi|hello|hey|helo|p|permisi|assalamualaikum|selamat)/)) {
    const greetings = [
      "Halo juga! 👋 Senang bertemu dengan Anda! Ada yang bisa saya bantu?",
      "Hai! Selamat datang di portfolio saya! Apa yang ingin Anda diskusikan?",
      "Hello! 😊 Terima kasih sudah mampir. Apa kabar?",
      "Halo! Saya Arif, web developer. Ada proyek menarik yang ingin dibahas?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Asking about projects/work
  if (msg.match(/(project|proyek|kerja|portfolio|kerjaan|bikin apa|buat apa)/)) {
    return "Saya sudah mengerjakan berbagai proyek web! 🚀 Ada website desa, PWA Muslim Lifestyle, platform puisi, dan masih banyak lagi. Silakan cek section Projects untuk detail lengkapnya!";
  }
  
  // Asking about skills/tech
  if (msg.match(/(skill|bisa apa|teknologi|tech|framework|bahasa|programming|coding)/)) {
    return "Saya fokus di Full Stack Development! 💻 Frontend: React, Next.js, TypeScript. Backend: Node.js, Python, PostgreSQL. Plus UI/UX design dengan Figma. Apa ada teknologi spesifik yang ingin ditanyakan?";
  }
  
  // Hiring/collaboration
  if (msg.match(/(hire|kerja sama|kolaborasi|freelance|available|tersedia|open)/)) {
    return "Yes, saya open untuk proyek freelance dan kolaborasi! 🤝 Silakan kirim detail proyeknya ke email: achmadarifh25@gmail.com atau langsung WA ke +62 895-0660-9757";
  }
  
  // Pricing
  if (msg.match(/(harga|price|tarif|biaya|cost|bayar|rate)/)) {
    return "Untuk harga tergantung kompleksitas proyek. 💰 Bisa mulai dari website sederhana hingga aplikasi kompleks. Yuk diskusi detail proyeknya dulu supaya bisa kasih estimasi yang pas!";
  }
  
  // Contact info
  if (msg.match(/(contact|kontak|hubungi|email|whatsapp|wa|telepon|phone)/)) {
    return "Bisa hubungi saya di:\n📧 Email: achmadarifh25@gmail.com\n📱 WA: +62 895-0660-9757\n📍 Lokasi: Malang, Indonesia\n\nSaya biasa response dalam 24 jam! ⚡";
  }
  
  // Thank you
  if (msg.match(/(terima kasih|thanks|thank you|makasih|thx|tq)/)) {
    return "Sama-sama! 😊 Senang bisa membantu. Jangan ragu untuk menghubungi kalau ada pertanyaan lain!";
  }
  
  // How are you
  if (msg.match(/(apa kabar|gimana|how are you|baik|sehat)/)) {
    return "Alhamdulillah baik! 😄 Sedang semangat coding nih. Anda sendiri gimana kabarnya?";
  }
  
  // Who are you
  if (msg.match(/(siapa|who|nama|name|introduce|perkenalan)/)) {
    return "Saya Arif Hidayat, Full Stack Web Developer dari Malang! 👨‍💻 Suka bikin website yang keren dan fungsional. Senang berkenalan dengan Anda!";
  }
  
  // Experience
  if (msg.match(/(pengalaman|experience|lama|berapa tahun)/)) {
    return "Saya mulai coding sejak 2019 dan terus berkembang sampai sekarang! 📚 Sudah handle berbagai proyek dari website company profile, PWA, hingga full-stack application.";
  }
  
  // Education
  if (msg.match(/(kuliah|pendidikan|education|belajar|sekolah|kampus)/)) {
    return "Saya mahasiswa Sistem Informasi dengan fokus di web development! 🎓 Selain kuliah, saya juga aktif belajar teknologi baru dan mengerjakan side projects.";
  }

  // Jokes/fun
  if (msg.match(/(joke|jokes|lucu|funny|haha|wkwk|lol)/)) {
    return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂";
  }
  
  // Default responses
  const defaults = [
    "Interesting! 🤔 Bisa ceritakan lebih detail tentang itu?",
    "Oke, saya paham! Ada hal lain yang ingin ditanyakan tentang saya atau proyek saya?",
    "Terima kasih sudah sharing! Kalau ada proyek yang ingin dibahas, saya siap bantu! 🚀",
    "Menarik! Feel free untuk tanya apa saja tentang web development atau proyek saya ya.",
    "Got it! Jangan ragu untuk diskusi lebih lanjut. Saya senang bisa membantu! 💡",
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
};

const initialMessages: Message[] = [
  { id: 1, text: "Halo! 👋 Saya Arif, Web Developer.", sender: 'bot', timestamp: new Date() },
  { id: 2, text: "Silakan tanya apa saja tentang saya, skill, atau proyek saya. Atau kalau mau diskusi kolaborasi, langsung aja!", sender: 'bot', timestamp: new Date() },
];

export function ContactSection({ onNext }: ContactSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getSmartResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickReplies = [
    "Halo!",
    "Skill apa saja?",
    "Open for hire?",
    "Lihat proyek",
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full relative z-10">
        {/* Left Column - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-slate-400">interactive chat</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text-code">
            Chat dengan Saya
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-12">
            Coba tanya apa saja! Saya akan merespons secara interaktif. 
            Tanya tentang skill, proyek, atau langsung ajak kolaborasi! 🚀
          </p>

          {/* Contact Methods */}
          <div className="space-y-4 sm:space-y-5 mb-8">
            {[
              { icon: Mail, label: 'Email', value: 'achmadarifh25@gmail.com', color: 'cyan' },
              { icon: Phone, label: 'WhatsApp', value: '+62 895-0660-9757', color: 'fuchsia' },
              { icon: MapPin, label: 'Lokasi', value: 'Malang, Indonesia', color: 'lime' },
            ].map((contact, index) => {
              const Icon = contact.icon;
              const colorMap = {
                cyan: 'from-cyan-500 to-blue-500',
                fuchsia: 'from-fuchsia-500 to-pink-500',
                lime: 'from-lime-500 to-green-500',
              };
              return (
                <motion.div
                  key={contact.label}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 card-hover-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[contact.color as keyof typeof colorMap]} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase">{contact.label}</p>
                    <p className="text-white font-medium">{contact.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { icon: Github, href: 'https://github.com/arifhidayat25' },
              { icon: Linkedin, href: 'https://linkedin.com/in/arifhidayat25' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Interactive Chat */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-4 px-6 py-4 bg-slate-800/80 border-b border-slate-700/50">
            <motion.div
              className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-lime-400 rounded-full border-2 border-slate-800"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">Arif.dev</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-lime-400">● Online</span>
                <span className="text-xs text-slate-500">• biasanya reply cepat</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-br-sm'
                      : 'bg-slate-800 border border-slate-700/50 text-slate-200 rounded-bl-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-slate-700/30 flex gap-2 overflow-x-auto">
            {quickReplies.map((reply) => (
              <motion.button
                key={reply}
                onClick={() => {
                  setInputValue(reply);
                }}
                className="flex-shrink-0 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {reply}
              </motion.button>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/50 bg-slate-800/50 flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 text-sm
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
            <motion.button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-xl flex items-center justify-center 
                         disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
              whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="font-mono text-xs text-slate-600">
          // Built with 💜 using Next.js &amp; Framer Motion
        </p>
      </motion.div>
    </div>
  );
}