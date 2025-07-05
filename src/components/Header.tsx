import React from 'react';
import { Rocket, Calendar, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-10 text-center py-12 px-4">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="relative">
          <Rocket className="w-12 h-12 text-blue-400 floating-animation" />
          <div className="absolute -top-1 -right-1">
            <Star className="w-4 h-4 text-yellow-400 twinkle" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400" 
            style={{ fontFamily: 'Orbitron, monospace' }}>
          InterChronos
        </h1>
        <div className="relative">
          <Calendar className="w-12 h-12 text-purple-400 floating-animation" style={{ animationDelay: '1s' }} />
          <div className="absolute -top-1 -left-1">
            <Star className="w-4 h-4 text-cyan-400 twinkle" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
      
      <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
        Journey through time and discover the astronomical events that shaped our universe
      </p>
      
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
        <Star className="w-4 h-4 text-yellow-400" />
        <span>Explore cosmic history</span>
        <Star className="w-4 h-4 text-blue-400" />
        <span>One date at a time</span>
        <Star className="w-4 h-4 text-purple-400" />
      </div>
    </header>
  );
};

export default Header;