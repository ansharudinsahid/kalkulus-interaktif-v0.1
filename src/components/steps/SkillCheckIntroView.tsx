import React from 'react';
import { StepData } from '../../types';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { playSuccessSound } from '../../utils/audio';

interface SkillCheckIntroViewProps {
  step: StepData;
  onContinue: () => void;
}

export const SkillCheckIntroView: React.FC<SkillCheckIntroViewProps> = ({ step, onContinue }) => {
  React.useEffect(() => {
    playSuccessSound();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-400 py-6 select-none">
      {/* Animated Glowing Badge Container */}
      <div className="relative my-6 flex items-center justify-center">
        {/* Pulsing Outer Rings */}
        <div className="absolute w-36 h-36 rounded-full bg-emerald-500/10 animate-ping opacity-60 pointer-events-none" />
        <div className="absolute w-48 h-48 rounded-full border border-emerald-500/20 animate-pulse pointer-events-none" />

        {/* Central Shield/Badge */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 shadow-[0_0_40px_rgba(16,185,129,0.4)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-neutral-950 flex flex-col items-center justify-center text-emerald-400">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Sparkle Badges */}
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-spin" />
        <Sparkles className="absolute -bottom-1 -left-2 w-5 h-5 text-teal-300 animate-pulse" />
      </div>

      {/* Subtitle tag */}
      <div className="px-4 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-2">
        {step.subtitle || 'Skill Check'}
      </div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
        {step.title || 'Uji Kemampuan'}
      </h2>

      {/* Description */}
      <p className="text-neutral-400 text-sm sm:text-base max-w-md mb-8">
        {step.content?.[0] || 'Saatnya menguji pemahaman konsep yang telah kamu pelajari!'}
      </p>

      {/* Start Skill Check Button */}
      <button
        id="btn-start-skill-check"
        onClick={onContinue}
        className="w-full max-w-xs py-3.5 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-base transition-all shadow-xl shadow-emerald-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <span>Mulai Uji Kemampuan</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
