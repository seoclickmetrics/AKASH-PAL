
import React from 'react';
import { ContentStatus } from '../../types';

interface BadgeProps {
  status: ContentStatus | string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case ContentStatus.PUBLISHED:
        return 'bg-green-100 text-green-700 border-green-200';
      case ContentStatus.WRITING:
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case ContentStatus.PLANNED:
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case ContentStatus.UPDATE_REQUIRED:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
};
