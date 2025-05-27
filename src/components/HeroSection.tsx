
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-700 to-blue-600">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-emerald-300 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `pulse 3s ease-in-out infinite ${particle.delay}s, float 6s ease-in-out infinite ${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Earth visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shadow-2xl animate-pulse">
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-300 to-blue-400 opacity-80" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-emerald-200 to-blue-300 opacity-60" />
          
          {/* Continents representation */}
          <div className="absolute top-12 left-16 w-20 h-16 bg-emerald-600 rounded-full opacity-70" />
          <div className="absolute bottom-20 right-12 w-16 h-12 bg-emerald-600 rounded-lg opacity-70" />
          <div className="absolute top-1/2 left-8 w-12 h-20 bg-emerald-600 rounded-full opacity-70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-300">
            Earth Story
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-emerald-100 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Transform your sustainability journey into an inspiring adventure
        </p>
        
        <p className="text-lg mb-12 text-emerald-200 animate-fade-in" style={{ animationDelay: '1s' }}>
          Discover your carbon footprint through interactive stories and unlock your potential for positive impact
        </p>

        <Button 
          size="lg" 
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: '1.5s' }}
        >
          Begin Your Earth Story
        </Button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `
      }} />
    </section>
  );
};

export default HeroSection;
