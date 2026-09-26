import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimer: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 my-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Note:</strong> FitBuddy provides general fitness and wellness guidance and is not a substitute for professional medical advice.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900 shadow-xs my-4">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">
        <strong className="font-semibold block text-amber-950 mb-0.5">Medical Safety & Wellness Disclaimer</strong>
        FitBuddy provides general fitness and wellness guidance and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before initiating any new workout routine or nutritional regimen.
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
