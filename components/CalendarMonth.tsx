import React from 'react';
import { Sessions, Person } from '../types';
import DayCell from './DayCell';

interface CalendarMonthProps {
  year: number;
  month: number; // 0-indexed
  sessions: Sessions;
  onSessionToggle: (dateKey: string, person: Person) => void;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ year, month, sessions, onSessionToggle }) => {
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getWorkingDaysInMonth = (year: number, month: number) => {
    const days = [];
    const date = new Date(Date.UTC(year, month, 1));
    while (date.getUTCMonth() === month) {
      const dayOfWeek = date.getUTCDay(); // Sunday - 0, ... Saturday - 6
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(new Date(date));
      }
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
  };

  const workingDays = getWorkingDaysInMonth(year, month);
  
  const firstWorkingDay = workingDays.length > 0 ? workingDays[0].getUTCDay() : 1; 
  const startOffset = firstWorkingDay - 1; 

  const placeholders = Array.from({ length: startOffset }, (_, i) => <div key={`placeholder-${i}`} />);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">{`${monthName} ${year}`}</h2>
      <div className="grid grid-cols-5 gap-2 text-center text-xs font-semibold text-gray-500 mb-2 uppercase">
        {weekdays.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-5 gap-1.5 flex-grow">
        {placeholders}
        {workingDays.map((day) => {
            const dateKey = `${day.getUTCFullYear()}-${String(day.getUTCMonth() + 1).padStart(2, '0')}-${String(day.getUTCDate()).padStart(2, '0')}`;
            return (
              <DayCell
                key={day.toISOString()}
                date={day}
                sessionInfo={sessions[dateKey]}
                onSessionToggle={onSessionToggle}
              />
            );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;
