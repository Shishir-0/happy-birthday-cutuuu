import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart } from 'lucide-react';
import type { CutiePageConfig } from '../types/config';

interface FollowGameSectionProps {
  config: CutiePageConfig;
  onNext: () => void;
}

export default function FollowGameSection({ config, onNext }: FollowGameSectionProps) {
  const gameData = config.game;
  const [accepted, setAccepted] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setTyping(true);
    
    setTimeout(() => {
      setTyping(false);
      setShowNotification(true);
    }, 2000);

    setTimeout(() => {
      onNext();
    }, 5000);
  };

  const username = gameData?.partnerUsername || config.person.partnerUsername || 'ft.partner';
  const avatarInitial = username.replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase() || 'P';

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
      style={{ backgroundColor: config.theme.mode === 'dark' ? '#0F172A' : '#F9FAFB' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
    >
      {/* Phone Mockup Frame */}
      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl border-8 border-gray-200/80 h-[78vh] max-h-[640px] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="pt-10 pb-3 px-6 border-b flex items-center justify-between bg-white z-10">
          <div className="font-bold text-gray-900 text-base">{gameData?.title || 'Follow Requests'}</div>
          <div className="text-sm font-semibold" style={{ color: config.theme.primary }}>Clear</div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col relative">
          <AnimatePresence>
            {!accepted && (
              <motion.div
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3.5 mb-4"
              >
                <div 
                  className="w-13 h-13 rounded-full p-[2px] flex-shrink-0"
                  style={{ backgroundImage: `linear-gradient(to top right, ${config.theme.primary}, ${config.theme.accent})` }}
                >
                  <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden flex items-center justify-center font-bold text-lg" style={{ color: config.theme.secondary }}>
                    {avatarInitial}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">{username}</div>
                  <div className="text-gray-400 text-xs truncate">{gameData?.pendingDurationText || 'pending request'}</div>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button 
                    onClick={handleAccept}
                    className="text-white text-xs font-bold py-1.5 px-3.5 rounded-lg active:scale-95 transition-transform shadow-sm"
                    style={{ backgroundColor: config.theme.primary }}
                  >
                    {gameData?.acceptButtonText || 'Confirm'}
                  </button>
                  <button className="bg-gray-100 text-gray-600 text-xs font-bold py-1 px-3 rounded-lg">
                    Delete
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {accepted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col items-center text-center space-y-4 px-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                >
                  <CheckCircle2 size={58} style={{ color: config.theme.primary }} />
                </motion.div>
                <div className="font-handwritten text-2xl text-gray-800 leading-snug">
                  {gameData?.successMessage || 'main character approved your existence ✨'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 left-4 bg-white px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Lockscreen Notification Popup */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 16 }}
              exit={{ opacity: 0, y: -100 }}
              className="absolute top-0 left-3 right-3 bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-white flex items-start gap-3 z-50 text-left"
            >
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                style={{ backgroundColor: config.theme.primary }}
              >
                <Heart size={18} fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-[11px] uppercase tracking-wide opacity-70 text-gray-700">
                    {gameData?.notificationTitle || 'Message'}
                  </span>
                  <span className="text-[10px] opacity-50 text-gray-500">now</span>
                </div>
                <div className="font-semibold text-xs mt-0.5 leading-tight text-gray-900 truncate">
                  {gameData?.notificationMessage || `${username} sent you a message 💌`}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
