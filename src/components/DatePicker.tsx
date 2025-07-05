import React from 'react';
import { Calendar, Search, Star, Telescope, Rocket, Satellite, Globe } from 'lucide-react';
import SolarSystemModel from './SolarSystemModel';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  isLoading: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, isLoading }) => {
  const famousAstronomers = [
    {
      name: "Galileo Galilei",
      icon: <Telescope className="w-8 h-8 text-amber-400" />,
      symbolImage: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      contribution: "Father of observational astronomy",
      period: "1564-1642",
      achievement: "First to use telescope for astronomy",
      bgGradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-400/30"
    },
    {
      name: "Carl Sagan",
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      symbolImage: "https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      contribution: "Popularized astronomy and space exploration",
      period: "1934-1996",
      achievement: "Cosmos series and planetary science",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-400/30"
    },
    {
      name: "Edwin Hubble",
      icon: <Star className="w-8 h-8 text-purple-400" />,
      symbolImage: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      contribution: "Discovered the expanding universe",
      period: "1889-1953",
      achievement: "Hubble's Law and galaxy classification",
      bgGradient: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-400/30"
    },
    {
      name: "Katherine Johnson",
      icon: <Rocket className="w-8 h-8 text-emerald-400" />,
      symbolImage: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      contribution: "NASA mathematician and space pioneer",
      period: "1918-2020",
      achievement: "Apollo mission trajectory calculations",
      bgGradient: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-400/30"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Date Navigator */}
      <div className="glass-effect rounded-2xl p-8 stellar-glow">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            Date Navigator
          </h2>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            disabled={isLoading}
            className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
          <p className="text-sm text-slate-300 text-center">
            🌌 Select any date to explore astronomical events from history
          </p>
        </div>
      </div>

      {/* Solar System Model */}
      <SolarSystemModel />

      {/* Famous Astronomers with Symbolic Representations */}
      <div className="glass-effect rounded-2xl p-6 stellar-glow">
        <div className="flex items-center gap-3 mb-6">
          <Telescope className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            Astronomy Pioneers
          </h3>
        </div>
        
        <div className="space-y-4">
          {famousAstronomers.map((astronomer, index) => (
            <div 
              key={astronomer.name}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${astronomer.bgGradient} p-4 hover:scale-[1.02] transition-all duration-300 border ${astronomer.borderColor} animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                {/* Symbolic Icon and Image */}
                <div className="relative flex-shrink-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-600 group-hover:border-opacity-50 transition-all duration-300">
                    <img 
                      src={astronomer.symbolImage}
                      alt={`Symbol representing ${astronomer.name}'s work`}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                    <div className="absolute top-1 right-1 bg-slate-900/80 rounded-full p-1">
                      {astronomer.icon}
                    </div>
                  </div>
                  <div className="absolute -top-1 -left-1">
                    <Star className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  </div>
                </div>

                {/* Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {astronomer.name}
                    </h4>
                    <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
                      {astronomer.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-tight mb-2 group-hover:text-slate-200 transition-colors duration-300">
                    {astronomer.contribution}
                  </p>
                  <div className="flex items-center gap-2">
                    <Satellite className="w-3 h-3 text-slate-500" />
                    <p className="text-xs text-slate-400 italic">
                      {astronomer.achievement}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Icons represent each pioneer's primary contribution to astronomy and space exploration
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;