import React from 'react';
import { SessionInfo, Person } from '../types';

interface DayCellProps {
  date: Date;
  sessionInfo: SessionInfo | undefined;
  onSessionToggle: (dateKey: string, person: Person) => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, sessionInfo, onSessionToggle }) => {
  const dateKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
  
  const isDaf = sessionInfo?.daf ?? false;
  const isTom = sessionInfo?.tom ?? false;

  let bgClass = 'bg-white';
  if (isDaf && isTom) {
    bgClass = 'bg-gradient-to-br from-blue-400 to-green-400';
  } else if (isDaf) {
    bgClass = 'bg-blue-400';
  } else if (isTom) {
    bgClass = 'bg-green-400';
  }
  
  const textColor = (isDaf || isTom) ? 'text-white' : 'text-gray-700';

  const handleToggle = (e: React.MouseEvent, person: Person) => {
    e.stopPropagation();
    onSessionToggle(dateKey, person);
  };
  
  return (
    <div 
      className={`relative rounded-lg shadow-sm aspect-square flex flex-col justify-between p-2 transition-colors duration-200 ${bgClass}`}
    >
      <span className={`font-semibold ${textColor}`}>{date.getUTCDate()}</span>
      <div className="flex justify-end items-center space-x-1">
        <button 
          aria-label={`Toggle Daf session for ${date.toLocaleDateString()}`}
          onClick={(e) => handleToggle(e, 'daf')}
          className={`rounded-full text-xs font-bold flex items-center justify-center transition-all ${isDaf ? 'w-7 h-7 bg-white text-blue-500 ring-2 ring-white' : 'w-5 h-5 bg-gray-200/80 text-gray-500 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400'}`}
        >
          D
        </button>
        <button 
          aria-label={`Toggle Tom session for ${date.toLocaleDateString()}`}
          onClick={(e) => handleToggle(e, 'tom')}
          className={`rounded-full text-xs font-bold flex items-center justify-center transition-all ${isTom ? 'w-7 h-7 bg-white text-green-600 ring-2 ring-white' : 'w-5 h-5 bg-gray-200/80 text-gray-500 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400'}`}
        >
          T
        </button>
      </div>
    </div>
  );
};

export default DayCell;
