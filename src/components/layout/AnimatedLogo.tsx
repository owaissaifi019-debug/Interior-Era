"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Armchair, Lamp, Bed, Flower2, LampFloor, Lightbulb } from "lucide-react";
import Link from "next/link";

const ICONS = [Armchair, Lamp, Bed, Flower2, LampFloor, Lightbulb];

export default function AnimatedLogo() {
  const [items, setItems] = useState<{ id: number; Icon: any; x: number; y: number; rotate: number }[]>([]);

  const handleClick = () => {
    const newItems = Array.from({ length: 8 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5);
      const distance = 150 + Math.random() * 200; // Increased distance
      return {
        id: Date.now() + i,
        Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotate: 180 + Math.random() * 360, // More rotation
      };
    });

    setItems((prev) => [...prev, ...newItems]);

    // Clean up items after animation (matched to duration)
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => !newItems.find((ni) => ni.id === item.id)));
    }, 3000); // Increased timeout
  };

  return (
    <div className="relative inline-block">
      <Link
        href="/"
        className="font-serif text-2xl font-bold tracking-wider relative z-10 transition-transform active:scale-95 duration-200 block"
        onClick={handleClick}
      >
        INTERIOR ERA
      </Link>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1.2, 0],
                x: item.x,
                y: item.y,
                rotate: item.rotate,
              }}
              transition={{ 
                duration: 2.5, // Increased duration for slower motion
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.1, 0.8, 1] // Stays visible longer
              }}
              className="absolute text-accent/90"
            >
              <item.Icon size={28} strokeWidth={1} /> 
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
