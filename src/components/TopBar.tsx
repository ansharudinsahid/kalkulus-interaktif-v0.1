import React from 'react';
import { X, Zap, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { toggleSound, isSoundEnabled } from '../utils/audio';

interface TopBarProps {
  currentStepIndex: number;
  totalSteps: number;
  totalXp: number;
  chapterTitle: string;
  onOpenCourseMap: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentStepIndex,
  totalSteps,
  totalXp,
  chapterTitle,
  onOpenCourseMap,
}) => {
  const [soundOn, setSoundOn] = React.useState<boolean>(isSoundEnabled());

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const progressPercent = Math.min(100, Math.max(5, ((currentStepIndex + 1) / totalSteps) * 100));

  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 z-40 select-none">
      {/* Left Action: Close / Course Map */}
      <button
        id="btn-course-menu"
        onClick={onOpenCourseMap}
        className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-all flex items-center gap-1.5 focus:outline-none"
        title="Daftar Materi Pelajaran"
      >
        <X className="w-5 h-5" />
        <span className="hidden sm:inline text-xs font-medium text-neutral-400">Materi</span>
      </button>

      {/* Center: Progress Bar with Dots */}
      <div className="flex-1 max-w-xl flex items-center gap-2">
        <div className="relative w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Indicator Dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                (currentStepIndex + 1) / totalSteps >= (i + 1) / 4
                  ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                  : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Controls: Sound & Energy / XP */}
      <div className="flex items-center gap-2.5">
        <button
          id="btn-toggle-sound"
          onClick={handleToggleSound}
          className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-all focus:outline-none"
          title={soundOn ? 'Suara Aktif' : 'Suara Mati'}
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
        </button>

        <div
          id="xp-badge"
          className="flex items-center gap-1 px-3 py-1.5 bg-neutral-900 border border-emerald-900/60 rounded-full text-emerald-400 text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <span>{totalXp}</span>
          <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />
        </div>
      </div>
    </header>
  );
};
