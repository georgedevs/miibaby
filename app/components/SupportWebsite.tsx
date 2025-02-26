'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Volume2, VolumeX } from 'lucide-react';

const LoveWebsite = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const quotes = [
    "Every moment with you feels like magic 🌟",
    "You make my heart skip a beat every single day ✨",
    "You're the most beautiful part of my world 💫",
    "My story became perfect the day you entered it 📖",
    "Your smile is my favorite view 👑",
    "Loving you is the easiest thing I've ever done 🌈",
    "You're my favorite hello and my hardest goodbye 💖",
    "With you, forever doesn't seem long enough 🌺"
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    const handleScroll = () => setScrollY(window.scrollY);
    
    // Initialize window size
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 font-dancing">
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
          <Volume2 className="w-6 h-6 text-red-500" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-500" />
        )}
      </motion.button>

      {/* Floating backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating hearts */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 7 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="text-red-300 w-8 h-8" />
          </motion.div>
        ))}

        {/* Sparkles */}
        {windowSize.width > 0 && [...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{ 
              x: Math.random() * windowSize.width, 
              y: Math.random() * windowSize.height 
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
          <h1 className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500 mb-8 pb-4">
            Hey Baby !!!!!
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            I want you to know that I love you with all my heart. You make every day brighter just by being you 💖
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
            className="group relative px-10 py-6 rounded-2xl bg-gradient-to-r from-red-400 to-pink-400 text-white text-xl transition-all duration-300"
          >
            <span className="relative z-10">Click for a love note! ❤️</span>
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

      {/* Love Messages Carousel */}
      <div className="py-24 overflow-hidden bg-gradient-to-r from-red-50 via-pink-50 to-red-50">
        <h2 className="text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500 mb-16">
          All the ways I love you... ❤️
        </h2>
        
        <div className="relative">
          <div className="flex animate-slide">
            {[
              "Your smile lights up my world",
              "Your laughter is my favorite sound",
              "Your love makes me stronger",
              "You're my dream come true",
              "You're perfect just as you are",
              "Every day with you is special"
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
      <footer className="relative py-24 text-center bg-gradient-to-b from-transparent to-red-100/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto px-6"
        >
          <p className="text-3xl text-gray-700 mb-6">
            Today, tomorrow, and forever...
          </p>
          <p className="text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
            I will always love you ❤️
          </p>
          
          <motion.div
            className="mt-12 flex justify-center space-x-4"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Heart className="text-red-500 w-8 h-8 animate-pulse" />
            <Star className="text-pink-400 w-8 h-8 animate-sparkle" />
            <Heart className="text-red-500 w-8 h-8 animate-pulse" />
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
};

export default LoveWebsite;