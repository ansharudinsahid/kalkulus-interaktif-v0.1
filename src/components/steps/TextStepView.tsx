import React from 'react';
import { StepData } from '../../types';
import { ArrowRight, BookOpen } from 'lucide-react';

import { MathJaxView } from '../MathJaxView';
import { MathText, isFormulaBlock } from '../MathText';

interface TextStepViewProps {
  step: StepData;
  onContinue: () => void;
}

export const TextStepView: React.FC<TextStepViewProps> = ({ step, onContinue }) => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center animate-in fade-in duration-300 py-4">
      {/* Icon Badge */}
      <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 mb-4 shadow-lg shadow-blue-500/5">
        <BookOpen className="w-7 h-7" />
      </div>

      {/* Title */}
      {step.title && (
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-3 font-teachers">
          <MathText text={step.title} />
        </h2>
      )}

      {/* Content paragraphs */}
      <div className="w-full bg-neutral-900/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-7 space-y-4 my-2 text-neutral-300 text-sm sm:text-base leading-relaxed">
        {step.content?.map((paragraph, idx) => {
          if (isFormulaBlock(paragraph)) {
            return (
              <div
                key={idx}
                className="w-full py-3 px-4 bg-neutral-950/80 border border-neutral-800 rounded-2xl text-center text-blue-400 shadow-inner my-2"
              >
                <MathJaxView math={paragraph} display={true} className="text-base sm:text-lg font-semibold" />
              </div>
            );
          }

          return (
            <p key={idx} className="text-neutral-200 font-teachers leading-relaxed">
              <MathText text={paragraph} />
            </p>
          );
        })}
      </div>

      {/* Continue Action */}
      <div className="w-full max-w-sm mt-6 flex justify-center">
        <button
          id="btn-text-step-continue"
          onClick={onContinue}
          className="w-full py-3.5 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Lanjutkan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
