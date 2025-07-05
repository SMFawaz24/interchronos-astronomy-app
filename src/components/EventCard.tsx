import React from 'react';
import { ExternalLink, Clock, BookOpen, Rocket, Telescope, Satellite } from 'lucide-react';

interface EventCardProps {
  event: {
    year: number;
    text: string;
    pages?: Array<{
      content_urls?: {
        desktop?: {
          page?: string;
        };
      };
    }>;
  };
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const hasLink = event.pages?.[0]?.content_urls?.desktop?.page;
  
  // Determine icon based on event content
  const getEventIcon = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('rocket') || lowerText.includes('launch') || lowerText.includes('apollo') || lowerText.includes('mission')) {
      return <Rocket className="w-5 h-5 text-orange-400" />;
    } else if (lowerText.includes('telescope') || lowerText.includes('observatory') || lowerText.includes('hubble')) {
      return <Telescope className="w-5 h-5 text-purple-400" />;
    } else if (lowerText.includes('satellite') || lowerText.includes('sputnik') || lowerText.includes('orbit')) {
      return <Satellite className="w-5 h-5 text-cyan-400" />;
    }
    return <Clock className="w-5 h-5 text-blue-400" />;
  };

  // Determine significance level for styling
  const getSignificanceLevel = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('first') || lowerText.includes('apollo 11') || lowerText.includes('sputnik') || lowerText.includes('hubble')) {
      return 'legendary';
    } else if (lowerText.includes('successful') || lowerText.includes('launched') || lowerText.includes('discovered')) {
      return 'major';
    }
    return 'significant';
  };

  const significance = getSignificanceLevel(event.text);
  
  const cardStyles = {
    legendary: 'border-l-4 border-gradient-to-b from-yellow-400 to-orange-500 bg-gradient-to-br from-yellow-500/10 to-orange-500/10',
    major: 'border-l-4 border-gradient-to-b from-blue-400 to-purple-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10',
    significant: 'border-l-4 border-gradient-to-b from-cyan-400 to-blue-500 bg-gradient-to-br from-cyan-500/10 to-blue-500/10'
  };

  const borderColors = {
    legendary: '#fbbf24',
    major: '#60a5fa',
    significant: '#06b6d4'
  };
  
  return (
    <div 
      className={`glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-500 group transform hover:scale-[1.02] hover:shadow-2xl ${cardStyles[significance]} animate-fade-in-up`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        borderLeftColor: borderColors[significance]
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-full border border-slate-500/30">
            {getEventIcon(event.text)}
            <span className="text-sm font-semibold text-slate-200" style={{ fontFamily: 'Orbitron, monospace' }}>
              {event.year} CE
            </span>
          </div>
          {significance === 'legendary' && (
            <div className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30">
              <span className="text-xs font-bold text-yellow-300">LEGENDARY</span>
            </div>
          )}
        </div>
        
        {hasLink && (
          <a
            href={event.pages[0].content_urls.desktop.page}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors duration-300 text-sm text-slate-300 hover:text-white group/link"
          >
            <BookOpen className="w-4 h-4" />
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
          </a>
        )}
      </div>
      
      <p className="text-slate-200 leading-relaxed text-base group-hover:text-white transition-colors duration-300">
        {event.text}
      </p>
      
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default EventCard;