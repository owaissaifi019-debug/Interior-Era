"use client";

import { useRef, useEffect, useState } from "react";
import { Armchair, LampFloor, Sofa, Bed, LampDesk, Coffee, Monitor, Flower2, Lightbulb, Box, Paintbrush } from "lucide-react";

const ICONS = [Armchair, LampFloor, Sofa, Bed, LampDesk, Coffee, Monitor, Flower2, Lightbulb, Box, Paintbrush];
const PARTICLE_COUNT = 60; // Dense field of interior items

export default function AntigravityItems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [initialized, setInitialized] = useState(false);

  // Store particle data outside react state to avoid re-renders during animation
  const particlesData = useRef(
    Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: 0, y: 0, baseX: 0, baseY: 0, vx: 0, vy: 0,
      iconIndex: Math.floor(Math.random() * ICONS.length),
      size: 30 + Math.random() * 50, // Random sizes between 30px and 80px
      opacity: 0.2 + Math.random() * 0.4, // Subtle opacity
    }))
  );

  useEffect(() => {
    // Initial random positions inside window, slightly overflowing
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    particlesData.current.forEach((p) => {
      p.x = Math.random() * (width + 200) - 100;
      p.y = Math.random() * (height + 200) - 100;
      p.baseX = p.x;
      p.baseY = p.y;
    });
    setInitialized(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseLeave = () => {
      // Move mouse ref way off screen so items return
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    const animate = () => {
      const mouse = mouseRef.current;
      const repelRadius = 350; // Large radius so it clears the cursor area nicely
      const repelForce = 5; // Strong push away
      const returnForce = 0.04; // Slow, elegant return
      const friction = 0.85; // Friction to prevent infinite oscillation

      particlesData.current.forEach((p, i) => {
        const el = elementsRef.current[i];
        if (!el) return;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius && mouse.x !== -1000) {
          const force = (repelRadius - dist) / repelRadius; // 0 to 1
          // Exponential force for snappier repulsion when very close
          const pushX = (dx / dist) * Math.pow(force, 1.5) * repelForce * 10;
          const pushY = (dy / dist) * Math.pow(force, 1.5) * repelForce * 10;

          p.vx -= pushX;
          p.vy -= pushY;
        }

        // Return to base position
        p.vx += (p.baseX - p.x) * returnForce;
        p.vy += (p.baseY - p.y) * returnForce;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Apply hardware-accelerated transform
        el.style.transform = `translate3d(${p.x - p.size/2}px, ${p.y - p.size/2}px, 0) rotate(${p.vx * 2}deg)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {initialized && particlesData.current.map((p, i) => {
        const Icon = ICONS[p.iconIndex];
        return (
          <div
            key={i}
            ref={el => { elementsRef.current[i] = el; }}
            className="absolute top-0 left-0 text-white/80 flex items-center justify-center will-change-transform drop-shadow-2xl"
            style={{ 
              width: p.size, 
              height: p.size,
              opacity: p.opacity,
            }}
          >
            <Icon width="100%" height="100%" strokeWidth={1.5} />
          </div>
        );
      })}
    </div>
  );
}
