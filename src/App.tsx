import React, { useState, useEffect } from 'react';
import StarField from './components/StarField';
import InteractiveBackground from './components/InteractiveBackground';
import Header from './components/Header';
import DatePicker from './components/DatePicker';
import EventsList from './components/EventsList';
import Footer from './components/Footer';
import useAstronomicalEvents from './hooks/useAstronomicalEvents';

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const { events, isLoading, loadEventsForDate, loadTodaysEvents } = useAstronomicalEvents();

  useEffect(() => {
    // Set today's date as default
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    setSelectedDate(todayString);
    loadTodaysEvents();
  }, [loadTodaysEvents]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (date) {
      loadEventsForDate(date);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <InteractiveBackground />
      
      <div className="relative z-10 pointer-events-auto">
        <div className="container mx-auto px-4 max-w-7xl">
          <Header />
          
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <DatePicker 
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                isLoading={isLoading}
              />
            </div>
            
            <div className="lg:col-span-3">
              <EventsList 
                events={events}
                selectedDate={selectedDate}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;