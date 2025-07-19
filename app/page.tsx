'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const GameCashTeaser: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    // Reset timer on page visit
    setTimeLeft(180);
    setIsExpired(false);
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime <= 1) {
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const buttonVariants: Variants = {
    idle: {
      scale: 1,
      boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)"
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 30px rgba(34, 197, 94, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const gameIcons = ['🎮', '🕹️', '🎯', '🎲', '🃏', '🎰'];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-50 animate-pulse delay-500"></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl opacity-40 animate-pulse delay-1000"></div>
      </div>

      {/* Floating Game Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {gameIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: index * 0.5 }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 h-full flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Logo */}
        <motion.header variants={itemVariants} className="flex justify-between items-center mb-8 sm:mb-12 lg:mb-16">
          <div className="text-xl sm:text-2xl font-bold text-white">
            <span className="text-green-400">GameCash</span> Pro
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg sm:text-xl">🎮</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center px-2">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-green-300 font-semibold text-sm sm:text-base mr-2">
                  🎮💸 NEW OPPORTUNITY
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  HOT
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                Get Paid to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  Play Games
                </span>{' '}
                <br />
                on Your Phone!
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
              No experience needed. Just your{' '}
              <span className="text-cyan-400 font-semibold">smartphone + data</span>{' '}
              = 💰 daily earnings!
              <br />
              <span className="text-green-400 font-semibold">
                Thousands are already cashing out, why not you?
              </span>
            </motion.p>

            {/* Benefits List */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: '', text: 'No capital', color: 'text-green-400' },
                  { icon: '', text: 'No referrals', color: 'text-cyan-400' },
                  { icon: '', text: 'No stress', color: 'text-purple-400' }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl">{benefit.icon}</span>
                      <span className={`font-semibold ${benefit.color}`}>{benefit.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
              <AnimatePresence>
                {!isExpired ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2 sm:mr-3"
                    ></motion.div>
                    <span className="text-red-400 font-medium text-sm sm:text-base lg:text-lg">
                      🔔 Limited spots available! {formatTime(timeLeft)}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-2 sm:mr-3"
                    ></motion.div>
                    <span className="text-orange-300 font-medium text-sm sm:text-base lg:text-lg">
                      💰 Start Earning Now - Join Today!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA Button */}
            <a href="https://chat.whatsapp.com/CJTj9bjKs4R5FEtjnRtRL0">
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <motion.button
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-full shadow-2xl border-2 border-green-400/50 relative overflow-hidden group w-full sm:w-auto max-w-sm sm:max-w-none"
                type="button"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.6 }}
                ></motion.div>
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.892 3.486"/>
                  </svg>
                  <span className="whitespace-nowrap">Join WhatsApp Group Now</span>
                  <motion.div
                    className="ml-1 sm:ml-2 flex-shrink-0"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>
            </a>

            {/* Earnings Showcase */}
            {/* <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/20 rounded-2xl px-6 py-4 max-w-2xl mx-auto">
                <div className="text-green-300 text-sm mb-2 font-medium">💰 Today's Top Earners</div>
                <div className="flex justify-between items-center text-white">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-green-400">₦15,000</div>
                    <div className="text-xs text-gray-300">Sarah M.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-cyan-400">₦12,500</div>
                    <div className="text-xs text-gray-300">David K.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-purple-400">₦18,200</div>
                    <div className="text-xs text-gray-300">Amina J.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-yellow-400">₦9,800</div>
                    <div className="text-xs text-gray-300">John O.</div>
                  </div>
                </div>
              </div>
            </motion.div> */}

            {/* Trust Indicators */}
            {/* <motion.div variants={itemVariants} className="text-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block border border-white/10">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-white">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2 text-lg">🎮</span>
                    <span className="text-sm font-medium">50+ Games Available</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-cyan-400 mr-2 text-lg">👥</span>
                    <span className="text-sm font-medium">10,000+ Active Players</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-2 text-lg">💰</span>
                    <span className="text-sm font-medium">Daily Payouts</span>
                  </div>
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameCashTeaser;