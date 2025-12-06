'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin, MessageCircle, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onNext: () => void;
}

const chatMessages = [
  { id: 1, text: "Halo! Saya Arif 👋", sender: 'arif', delay: 0.5 },
  { id: 2, text: "Siap untuk menciptakan sesuatu yang luar biasa bersama?", sender: 'alex', delay: 1 },
  { id: 3, text: "Mari mulai percakapan!", sender: 'alex', delay: 1.5 },
];

export function ContactSection({ onNext }: ContactSectionProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentInput, setCurrentInput] = useState<'name' | 'email' | 'message' | 'done'>('name');
  const [userMessages, setUserMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputSubmit = (value: string) => {
    if (!value.trim()) return;

    setUserMessages(prev => [...prev, { text: value, sender: 'user' }]);
    
    setTimeout(() => {
      if (currentInput === 'name') {
        setFormData(prev => ({ ...prev, name: value }));
        setCurrentInput('email');
        setUserMessages(prev => [...prev, { text: "Bagus! Apa alamat email Anda?", sender: 'alex' }]);
      } else if (currentInput === 'email') {
        setFormData(prev => ({ ...prev, email: value }));
        setCurrentInput('message');
        setUserMessages(prev => [...prev, { text: "Sempurna! Sekarang ceritakan tentang proyek Anda:", sender: 'alex' }]);
      } else if (currentInput === 'message') {
        setFormData(prev => ({ ...prev, message: value }));
        setCurrentInput('done');
        setUserMessages(prev => [...prev, { 
          text: "Luar biasa! Saya akan menghubungi Anda dalam 24 jam. Terima kasih telah menghubungi! 🚀", 
          sender: 'alex' 
        }]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 1000);
  };

  const getPlaceholder = () => {
    switch (currentInput) {
      case 'name': return "Nama Anda...";
      case 'email': return "email.anda@contoh.com";
      case 'message': return "Ceritakan tentang proyek Anda...";
      default: return "Terima kasih atas pesan Anda!";
    }
  };

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 pb-20 sm:pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'][Math.floor(Math.random() * 4)],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  y: [0, -200, -400],
                  rotate: [0, 180, 360],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
            Mari Terhubung
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12">
            Siap untuk mewujudkan ide-ide Anda? Mari mulai percakapan dan ciptakan sesuatu yang luar biasa bersama.
          </p>

          {/* Contact Methods */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            {[
              { icon: Mail, label: 'Email', value: 'achmadarifh25@gmail.com', color: 'from-blue-400 to-cyan-600' },
              { icon: Phone, label: 'Telepon', value: '+62 895-0660-9757', color: 'from-green-400 to-emerald-600' },
              { icon: MapPin, label: 'Lokasi', value: 'Malang, Indonesia', color: 'from-purple-400 to-pink-600' },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.label}
                  className="flex items-center gap-4 p-4 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold">{contact.label}</p>
                    <p className="text-muted-foreground">{contact.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-4 sm:p-6 md:p-8 shadow-2xl"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/30">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-violet-400 to-teal-400 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold">Arif Kreatif</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Sedang online</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 sm:h-80 overflow-y-auto mb-4 sm:mb-6 space-y-4">
            {/* Initial messages */}
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: msg.delay }}
              >
                <div className="bg-primary/20 text-foreground rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs">
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Dynamic messages */}
            {userMessages.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className={`rounded-2xl px-4 py-2 max-w-xs ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-primary/20 text-foreground rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <AnimatePresence mode="wait">
            {currentInput !== 'done' ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ChatInput
                  placeholder={getPlaceholder()}
                  onSubmit={handleInputSubmit}
                  disabled={false}
                />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-400 font-medium"
              >
                <Sparkles className="w-5 h-5" />
                Pesan berhasil dikirim!
                <Sparkles className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function ChatInput({ placeholder, onSubmit, disabled }: { 
  placeholder: string; 
  onSubmit: (value: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-muted/50 border border-border/50 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      <motion.button
        type="submit"
        disabled={disabled || !value.trim()}
        className="w-12 h-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Send className="w-5 h-5" />
      </motion.button>
    </form>
  );
}