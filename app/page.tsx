'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { client } from '@/lib/sanity';

interface GameCashData {
  brandName: string;
  brandHighlight: string;
  badge: string;
  badgeHot: string;
  mainHeading: string;
  highlightedText: string;
  description1: string;
  highlightedPhone: string;
  description2: string;
  bottomText: string;
  benefit1: string;
  benefit2: string;
  benefit3: string;
  buttonText: string;
  buttonLink: string;
  expiredMessage: string;
}

const GameCashTeaser: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [gameCashData, setGameCashData] = useState<GameCashData | null>(null);

  // Fetch GameCash data from Sanity
  useEffect(() => {
    client
      .fetch(`*[_type == "gameCash"][0]{
        brandName,
        brandHighlight,
        badge,
        badgeHot,
        mainHeading,
        highlightedText,
        description1,
        highlightedPhone,
        description2,
        bottomText,
        benefit1,
        benefit2,
        benefit3,
        buttonText,
        buttonLink,
        expiredMessage
      }`)
      .then((data: GameCashData) => setGameCashData(data))
      .catch(console.error);
  }, []);

  // Simulated countdown - resets on every page refresh
  useEffect(() => {
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

  // Dynamic button styles based on button text
  const getDynamicButtonStyles = (buttonText: string) => {
    const isWhatsApp = buttonText.toLowerCase().includes('whatsapp');
    const isTelegram = buttonText.toLowerCase().includes('telegram');
    
    if (isTelegram) {
      return {
        gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
        hoverGradient: "from-blue-400 to-blue-500",
        shadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
        hoverShadow: "0 8px 30px rgba(59, 130, 246, 0.5)",
        border: "border-blue-400/50",
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        )
      };
    }
    
    // Default to WhatsApp (green)
    return {
      gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
      hoverGradient: "from-emerald-400 to-green-500",
      shadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
      hoverShadow: "0 8px 30px rgba(34, 197, 94, 0.5)",
      border: "border-green-400/50",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.892 3.486"/>
        </svg>
      )
    };
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

  const getDynamicButtonVariants = (buttonText: string): Variants => {
    const styles = getDynamicButtonStyles(buttonText);
    
    return {
      idle: {
        scale: 1,
        boxShadow: styles.shadow
      },
      hover: {
        scale: 1.05,
        boxShadow: styles.hoverShadow,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      },
      tap: {
        scale: 0.95
      }
    };
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

  // Static game icons
  const gameIcons = ['🎮', '🕹️', '🎯', '🎲', '🃏', '🎰'];

  // Loading state
  if (!gameCashData) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-cyan-900 relative overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const buttonStyles = getDynamicButtonStyles(gameCashData.buttonText);
  const dynamicButtonVariants = getDynamicButtonVariants(gameCashData.buttonText);

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
            <span className="text-green-400">{gameCashData.brandHighlight}</span> {gameCashData.brandName}
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
                  {gameCashData.badge}
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {gameCashData.badgeHot}
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                {gameCashData.mainHeading}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  {gameCashData.highlightedText}
                </span>{' '}
                <br />
                on Your Phone!
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
              {gameCashData.description1}{' '}
              <span className="text-cyan-400 font-semibold">{gameCashData.highlightedPhone}</span>{' '}
              = 💰 {gameCashData.description2}
              <br />
              <span className="text-green-400 font-semibold">
                {gameCashData.bottomText}
              </span>
            </motion.p>

            {/* Benefits List */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: '', text: gameCashData.benefit1, color: 'text-green-400' },
                  { icon: '', text: gameCashData.benefit2, color: 'text-cyan-400' },
                  { icon: '', text: gameCashData.benefit3, color: 'text-purple-400' }
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
            <motion.div variants={itemVariants} className="mb-4 sm:mb-10">
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
                      {gameCashData.expiredMessage}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Dynamic CTA Button */}
            <Link href={gameCashData.buttonLink}>
              <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
                <motion.button
                  variants={dynamicButtonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className={`${buttonStyles.gradient} text-white font-bold text-sm sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-full shadow-2xl border-2 ${buttonStyles.border} relative overflow-hidden group w-full sm:w-auto max-w-sm sm:max-w-none`}
                  type="button"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${buttonStyles.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.6 }}
                  ></motion.div>
                  <span className="relative z-10 flex items-center justify-center">
                    {buttonStyles.icon}
                    <span className="whitespace-nowrap">{gameCashData.buttonText}</span>
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
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameCashTeaser;