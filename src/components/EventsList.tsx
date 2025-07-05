import React from 'react';
import { Telescope, AlertCircle, Sparkles, Rocket, Calendar, Clock, Star } from 'lucide-react';
import EventCard from './EventCard';

interface Event {
  year: number;
  text: string;
  pages?: Array<{
    content_urls?: {
      desktop?: {
        page?: string;
      };
    };
  }>;
}

interface EventsListProps {
  events: Event[];
  selectedDate: string;
  isLoading: boolean;
}

const EventsList: React.FC<EventsListProps> = ({ events, selectedDate, isLoading }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Today';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventStats = () => {
    if (events.length === 0) return null;
    
    const decades = events.reduce((acc, event) => {
      const decade = Math.floor(event.year / 10) * 10;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const mostActiveDecade = Object.entries(decades).reduce((a, b) => 
      decades[parseInt(a[0])] > decades[parseInt(b[0])] ? a : b
    );

    return {
      totalEvents: events.length,
      earliestYear: Math.min(...events.map(e => e.year)),
      latestYear: Math.max(...events.map(e => e.year)),
      mostActiveDecade: `${mostActiveDecade[0]}s`,
      timeSpan: Math.max(...events.map(e => e.year)) - Math.min(...events.map(e => e.year))
    };
  };

  const stats = getEventStats();

  if (isLoading) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center stellar-glow min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Telescope className="w-20 h-20 text-blue-400 animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Star className="w-6 h-6 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-white mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>
              Scanning the Cosmos
            </h3>
            <p className="text-slate-400 text-lg">Searching for astronomical events across time and space...</p>
          </div>
          <div className="flex gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-8 stellar-glow min-h-[700px] flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Rocket className="w-8 h-8 text-purple-400" />
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            Astronomical Events
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-400" />
          <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-400/30">
            <span className="text-purple-300 font-medium">{formatDate(selectedDate)}</span>
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-16">
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <AlertCircle className="w-20 h-20 text-slate-500" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-yellow-400 opacity-50" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Star className="w-5 h-5 text-blue-400 opacity-30" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-300 mb-3">
                  No Astronomical Events Found
                </h3>
                <p className="text-slate-500 max-w-lg text-lg leading-relaxed">
                  The cosmos was quiet on this date, or perhaps these astronomical events haven't been recorded in our stellar database yet. Try selecting a different date to explore other cosmic milestones.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Historical records vary</span>
                </div>
                <div className="w-px h-4 bg-slate-600"></div>
                <div className="flex items-center gap-2">
                  <Telescope className="w-4 h-4" />
                  <span>Database continuously updated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Statistics Section */}
          {stats && (
            <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.totalEvents}</div>
                <div className="text-xs text-slate-400 mt-1">Total Events</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.timeSpan}</div>
                <div className="text-xs text-slate-400 mt-1">Years Span</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-emerald-500/20 text-center">
                <div className="text-2xl font-bold text-emerald-400">{stats.earliestYear}</div>
                <div className="text-xs text-slate-400 mt-1">Earliest</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20 text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.latestYear}</div>
                <div className="text-xs text-slate-400 mt-1">Latest</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl p-4 border border-yellow-500/20 text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.mostActiveDecade}</div>
                <div className="text-xs text-slate-400 mt-1">Most Active</div>
              </div>
            </div>
          )}

          {/* Events Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">
                Cosmic Timeline
              </h3>
            </div>
            <div className="text-sm text-slate-400">
              Sorted by year (newest first)
            </div>
          </div>
          
          {/* Events List with Enhanced Scrolling */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto pr-3 space-y-6 custom-scrollbar">
              {events.map((event, index) => (
                <EventCard key={`${event.year}-${index}`} event={event} index={index} />
              ))}
              
              {/* End of timeline indicator */}
              <div className="text-center py-8 border-t border-slate-700/50">
                <div className="flex items-center justify-center gap-3 text-slate-500">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">End of cosmic timeline for this date</span>
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Explore other dates to discover more astronomical milestones
                </p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-slate-700/30">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Telescope className="w-4 h-4" />
                <span>Data sourced from Wikipedia</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Updated continuously</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsList;