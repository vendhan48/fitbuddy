import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIPulseProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showSparkle?: boolean;
  className?: string;
}

export const AIPulse: React.FC<AIPulseProps> = ({ 
  label = 'AI Powered', 
  size = 'sm', 
  showSparkle = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <div 
      className={`inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 font-semibold tracking-wide ${sizeClasses[size]} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <span className={`absolute inline-flex rounded-full bg-emerald-400 opacity-75 animate-ping ${dotSizes[size]}`} />
        <span className={`relative inline-flex rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 ${dotSizes[size]}`} />
      </div>
      
      {showSparkle && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
      {label && <span>{label}</span>}
    </div>
  );
};

export default AIPulse;
