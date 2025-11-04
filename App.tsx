import React, { useState, useCallback } from 'react';
import CalendarMonth from './components/CalendarMonth';
import { Sessions, Person } from './types';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<Sessions>({});

  const handleSessionToggle = useCallback((dateKey: string, person: Person) => {
    setSessions(prevSessions => {
      const newSessions = { ...prevSessions };
      const daySessions = newSessions[dateKey] || { daf: false, tom: false };
      
      const updatedDaySessions = {
        ...daySessions,
        [person]: !daySessions[person],
      };

      // FIX: Corrected a typo from `updatedDayДTom` to `updatedDaySessions.tom`.
      if (!updatedDaySessions.daf && !updatedDaySessions.tom) {
        delete newSessions[dateKey];
      } else {
        newSessions[dateKey] = updatedDaySessions;
      }
      
      return newSessions;
    });
  }, []);

  const getMonthsToDisplay = () => {
    const months: { year: number, month: number }[] = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;

    months.push({ year: currentYear, month: 10 }); // Month is 0-indexed, so 10 is November
    months.push({ year: currentYear, month: 11 }); // 11 is December

    for (let i = 0; i < 12; i++) {
      months.push({ year: nextYear, month: i });
    }

    return months;
  };

  const monthsToDisplay = getMonthsToDisplay();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Session Calendar</h1>
        <p className="text-lg text-gray-600 mt-2">Track delivery days for Daf and Tom</p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-blue-400 mr-2 border border-blue-500"></span>
            <span>Daf</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-400 mr-2 border border-green-500"></span>
            <span>Tom</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-green-400 mr-2 border border-gray-400"></span>
            <span>Both</span>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {monthsToDisplay.map(({ year, month }) => (
            <CalendarMonth
              key={`${year}-${month}`}
              year={year}
              month={month}
              sessions={sessions}
              onSessionToggle={handleSessionToggle}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
