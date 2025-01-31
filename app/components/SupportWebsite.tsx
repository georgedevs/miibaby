'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Music, Volume2, VolumeX } from 'lucide-react';

const SupportWebsite = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const quotes = [
    "Every heartbreak is a stepping stone to something beautiful 🌟",
    "Your worth isn't defined by someone else's inability to see it ✨",
    "The right person will love you without hesitation 💫",
    "This chapter may be ending, but your story is far from over 📖",
    "You're not just strong, you're resilient and magnificent 👑",
    "Sometimes the wrong person helps you find the right path 🌈",
    "Your heart may be broken, but your spirit is unbreakable 💪",
    "The best revenge is living your best life 🌺"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setShowQuote(true);
  };

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 font-dancing">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="/relaxing-background-music.mp3"  
      />
      
      {/* Music Control Button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-4 rounded-full bg-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-pink-500" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-500" />
        )}
      </motion.button>

      {/* Floating backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating circles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-pink-200/20 to-purple-200/20 backdrop-blur-3xl"
            style={{
              width: Math.random() * 200 + 100 + 'px',
              height: Math.random() * 200 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="text-pink-200 w-3 h-3" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative pt-32 px-6 text-center"
        style={parallaxStyle}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8 pb-4">
            Hey Atiyyah !!!!!
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Just a little reminder that you&apos;re absolutely incredible, and this moment 
            is just a chapter in your beautiful story 💖
          </p>
        </motion.div>
      </motion.div>

      {/* Interactive Quote Section */}
      <div className="relative z-10 py-24 px-6 backdrop-blur-sm bg-white/30">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getRandomQuote}
            className="group relative px-10 py-6 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xl transition-all duration-300"
          >
            <span className="relative z-10">Need some love? Click me! ✨</span>
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>

          <AnimatePresence mode="wait">
            {showQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 p-8 rounded-3xl bg-white/40 backdrop-blur-md shadow-xl"
              >
                <p className="text-2xl text-gray-800">
                  {currentQuote}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Supportive Messages Carousel */}
      <div className="py-24 overflow-hidden bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50">
        <h2 className="text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-16">
          Remember these truths... 🌟
        </h2>
        
        <div className="relative">
          <div className="flex animate-slide">
            {[
              "You are worthy of great love",
              "Your heart will heal and grow stronger",
              "Better days are coming",
              "You deserve the world",
              "This pain is temporary",
              "You're never alone"
            ].map((text, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 px-8 py-6 mx-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg"
              >
                <p className="text-xl text-gray-700 whitespace-nowrap">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <footer className="relative py-24 text-center bg-gradient-to-b from-transparent to-pink-100/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto px-6"
        >
          <p className="text-3xl text-gray-700 mb-6">
            No matter where life takes us...
          </p>
          <p className="text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            I&apos;ll always be here for you 💕
          </p>
          
          <motion.div
            className="mt-12 flex justify-center space-x-4"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Heart className="text-pink-400 w-8 h-8 animate-pulse" />
            <Star className="text-purple-400 w-8 h-8 animate-sparkle" />
            <Heart className="text-pink-400 w-8 h-8 animate-pulse" />
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
};

export default SupportWebsite;

