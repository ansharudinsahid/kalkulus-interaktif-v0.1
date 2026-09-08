import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Zap, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playCompleteSound } from '../../utils/audio';

interface LessonCompleteViewProps {
  chapterTitle: string;
  totalXp: number;
  onRestart: () => void;
  onNextChapter?: () => void;
  hasNextChapter: boolean;
}

export const LessonCompleteView: React.FC<LessonCompleteViewProps> = ({
  chapterTitle,
  totalXp,
  onRestart,
  onNextChapter,
  hasNextChapter,
}) => {
  useEffect(() => {
    playCompleteSound();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-400 py-6 select-none">
      {/* Trophy & Glow */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-[0_0_50px_rgba(245,158,11,0.35)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-neutral-950 flex flex-col items-center justify-center text-amber-400">
            <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
        <CheckCircle2 className="w-4 h-4" />
        <span>Tuntas 100%</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Pelajaran Selesai!
      </h2>

      <p className="text-neutral-400 text-sm max-w-sm mb-6">
        Selamat! Kamu telah menyelesaikan modul{' '}
        <span className="text-neutral-200 font-semibold">{chapterTitle}</span> dengan sangat baik.
      </p>

      {/* Rewards Summary Card */}
      <div className="w-full max-w-xs bg-neutral-900/90 border border-neutral-800 rounded-3xl p-5 mb-8 flex items-center justify-around shadow-lg">
        <div className="flex flex-col items-center">
          <span className="text-xs text-neutral-400 font-medium">Total Skor</span>
          <div className="flex items-center gap-1 text-emerald-400 font-extrabold text-2xl mt-1">
            <span>+{totalXp}</span>
            <Zap className="w-5 h-5 fill-emerald-400" />
          </div>
        </div>

        <div className="h-10 w-px bg-neutral-800" />

        <div className="flex flex-col items-center">
          <span className="text-xs text-neutral-400 font-medium">Akurasi</span>
          <span className="text-blue-400 font-extrabold text-2xl mt-1">100%</span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {hasNextChapter && onNextChapter && (
          <button
            id="btn-go-next-chapter"
            onClick={onNextChapter}
            className="w-full py-3.5 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-base transition-all shadow-xl shadow-emerald-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Lanjut ke Bab Berikutnya</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        <button
          id="btn-restart-lesson"
          onClick={onRestart}
          className="w-full py-3 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-neutral-400" />
          <span>Ulangi Pelajaran Ini</span>
        </button>
      </div>
    </div>
  );
};
