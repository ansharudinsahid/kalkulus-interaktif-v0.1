import React from 'react';
import { X, BookOpen, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import { COURSE_CHAPTERS } from '../data/courseData';

interface CourseSelectorModalProps {
  isOpen: boolean;
  activeChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  onClose: () => void;
}

export const CourseSelectorModal: React.FC<CourseSelectorModalProps> = ({
  isOpen,
  activeChapterId,
  onSelectChapter,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="course-map-dialog"
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col gap-4 text-neutral-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg text-white">Daftar Modul Kalkulus Interaktif</h3>
          </div>

          <button
            id="btn-close-course-map"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-neutral-400">
          Pilih modul pembelajaran yang ingin kamu pelajari atau latih secara interaktif:
        </p>

        {/* Chapters List */}
        <div className="space-y-3 my-2">
          {COURSE_CHAPTERS.map((chapter, idx) => {
            const isActive = chapter.id === activeChapterId;

            return (
              <button
                key={chapter.id}
                id={`btn-select-chapter-${idx + 1}`}
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onClose();
                }}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 focus:outline-none ${
                  isActive
                    ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10'
                    : 'bg-neutral-950/60 border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900/80'
                }`}
              >
                {/* Chapter Badge Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 ${
                    chapter.badge.includes("'") || chapter.badge.includes('(') ? 'font-math text-lg' : ''
                  } ${
                    isActive
                      ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {chapter.badge}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-white truncate">
                      {chapter.title}
                    </h4>
                    {isActive && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Sedang Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {chapter.description}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                      +{chapter.totalXp} XP
                    </span>
                    <span>•</span>
                    <span>{chapter.steps.length} Langkah</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-neutral-500 self-center shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
