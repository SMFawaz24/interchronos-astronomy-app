import React from 'react';
import { Heart, Github, Star } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 text-center py-12 px-4 mt-16">
      <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-slate-300">Crafted with</span>
          <span className="text-2xl">🌟</span>
          <span className="text-slate-300">by Cosmic Developers - Fawaz and Chitranshi</span>
        </div>
        
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Powered by Wikipedia API</span>
          </div>
          <div className="w-px h-4 bg-slate-600"></div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Github className="w-4 h-4" />
            <span>Open Source</span>
          </div>
        </div>
        
        <p className="text-sm text-slate-500">
          Exploring the intersection of time and space, one astronomical event at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;