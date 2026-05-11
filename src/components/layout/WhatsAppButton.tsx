"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "9910620810";
  const whatsappUrl = `https://wa.me/919910620810`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden w-72"
          >
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="text-primary-foreground font-medium flex items-center gap-2">
                <MessageCircle size={20} className="text-accent" />
                Chat with us
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Close chat window"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Hi there! 👋 How can we help you today? We typically reply within a few minutes.
              </div>
              <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground dark:text-accent">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">WhatsApp Number</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 tracking-wide">{phoneNumber}</div>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition-colors text-center shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
              >
                Open WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-accent shadow-xl shadow-black/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-neutral-950 border border-accent/20"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsing Ripple Effect */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/40 -z-10"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/20 -z-10"
              animate={{ scale: [1, 2.4], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
          </>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
