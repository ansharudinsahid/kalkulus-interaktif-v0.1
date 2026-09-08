import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, HelpCircle, ArrowRight, RotateCcw, Eye } from 'lucide-react';

interface BottomFeedbackBarProps {
  isChecked: boolean;
  isCorrect: boolean | null;
  selectedOptionId: string | null;
  isLastStep: boolean;
  onCheck: () => void;
  onContinue: () => void;
  onTryAgain: () => void;
  onSeeAnswer: () => void;
  onOpenWhyModal: () => void;
}

export const BottomFeedbackBar: React.FC<BottomFeedbackBarProps> = ({
  isChecked,
  isCorrect,
  selectedOptionId,
  isLastStep,
  onCheck,
  onContinue,
  onTryAgain,
  onSeeAnswer,
  onOpenWhyModal,
}) => {
  return (
    <div className="w-full bg-neutral-950/90 backdrop-blur-md border-t border-neutral-800/80 py-3.5 px-4 sm:px-8 transition-all duration-300 z-30">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 min-h-[56px]">
        {/* State 1: Before Checking (Active Check Button) */}
        {!isChecked && (
          <div className="w-full flex justify-center">
            <button
              id="btn-action-check"
              disabled={!selectedOptionId}
              onClick={onCheck}
              className={`w-full max-w-sm py-3.5 px-8 rounded-full font-bold text-base transition-all duration-200 shadow-lg ${
                selectedOptionId
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 cursor-pointer shadow-emerald-500/20 active:scale-[0.98]'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
              }`}
            >
              Periksa
            </button>
          </div>
        )}

        {/* State 2: After Checking (Correct or Incorrect Feedback) */}
        {isChecked && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left Status Tag */}
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <div
                  id="status-correct-badge"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-emerald-400 font-bold text-sm sm:text-base shadow-[0_0_15px_rgba(16,185,129,0.25)] animate-in fade-in zoom-in duration-200"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center font-extrabold text-xs">
                    ✓
                  </div>
                  <span>Tepat Sekali!</span>
                </div>
              ) : (
                <div
                  id="status-incorrect-badge"
                  className="flex items-center gap-2 px-4 py-2 bg-rose-950/80 border border-rose-500/60 rounded-2xl text-rose-400 font-bold text-sm sm:text-base shadow-[0_0_15px_rgba(244,63,94,0.25)] animate-in fade-in zoom-in duration-200"
                >
                  <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center font-extrabold text-xs">
                    ✕
                  </div>
                  <span>Kurang tepat.</span>
                </div>
              )}
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {/* If incorrect, provide "Lihat Jawaban" or "Coba Lagi" */}
              {!isCorrect && (
                <>
                  <button
                    id="btn-see-answer"
                    onClick={onSeeAnswer}
                    className="flex-1 sm:flex-none py-2.5 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-semibold text-sm transition-all focus:outline-none flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4 text-neutral-400" />
                    <span>Lihat Jawaban</span>
                  </button>

                  <button
                    id="btn-try-again"
                    onClick={onTryAgain}
                    className="flex-1 sm:flex-none py-2.5 px-5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold text-sm transition-all focus:outline-none flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span>Coba Lagi</span>
                  </button>
                </>
              )}

              {/* "Mengapa?" (Why?) Explanation Modal trigger */}
              <button
                id="btn-why-modal"
                onClick={onOpenWhyModal}
                className="flex-1 sm:flex-none py-2.5 px-5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-sm transition-all focus:outline-none flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-blue-400" />
                <span>Mengapa?</span>
              </button>

              {/* Continue / Finish Button */}
              <button
                id="btn-continue-next"
                onClick={onContinue}
                className="flex-1 sm:flex-none py-2.5 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>{isLastStep ? 'Selesai' : 'Lanjutkan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
