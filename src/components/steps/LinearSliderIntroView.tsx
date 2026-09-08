import React, { useState } from 'react';
import { StepData } from '../../types';
import { InteractiveLinearSlider } from '../graphs/InteractiveLinearSlider';
import { MathJaxView } from '../MathJaxView';
import { MathText, isFormulaBlock } from '../MathText';
import { ArrowRight, Sparkles, Sliders } from 'lucide-react';

interface LinearSliderIntroViewProps {
  step: StepData;
  onContinue: () => void;
}

export const LinearSliderIntroView: React.FC<LinearSliderIntroViewProps> = ({
  step,
  onContinue,
}) => {
  const [currentM, setCurrentM] = useState<number>(step.initialSliderValue ?? 1);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-6 animate-in fade-in duration-300">
      {/* Desktop 2-column layout, Mobile stacked layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
        
        {/* Left Column: Text, Explanation & Action Button */}
        <div className="md:col-span-6 flex flex-col justify-center text-left space-y-4">
          
          {/* Header & Title */}
          <div>
            {step.title && (
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-teachers">
                <MathText text={step.title} />
              </h1>
            )}
            {step.subtitle && (
              <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed font-teachers">
                <MathText text={step.subtitle} />
              </p>
            )}
          </div>

          {/* Text Content */}
          {step.content && step.content.length > 0 && (
            <div className="space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-teachers">
              {step.content.map((paragraph, idx) => {
                if (isFormulaBlock(paragraph)) {
                  return (
                    <div
                      key={idx}
                      className="inline-block bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-blue-400 font-semibold text-lg shadow-sm"
                    >
                      <MathJaxView math={paragraph} inline={true} />
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-neutral-300">
                    <MathText text={paragraph} />
                  </p>
                );
              })}
            </div>
          )}

          {/* Interactive Hint Card */}
          <div className="bg-neutral-900/70 border border-neutral-800/90 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
              <Sliders className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-white block">Eksplorasi Gradien</span>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Ubah nilai <MathJaxView math="m" inline={true} className="text-blue-400 font-bold" /> pada grafik di sebelah kanan untuk melihat pengaruh tanda positif, nol, dan negatif terhadap arah kemiringan garis.
              </p>
            </div>
          </div>

          {/* Continue CTA Button (Desktop View) */}
          <div className="pt-2 hidden md:block">
            <button
              id="btn-intro-continue-desktop"
              onClick={onContinue}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Graph & Controls */}
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-neutral-900/40 border border-neutral-800/80 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col items-center">
            <InteractiveLinearSlider
              initialM={step.initialSliderValue ?? 1}
              interactive={true}
              onMChange={(val) => setCurrentM(val)}
              showTitle={true}
            />
          </div>

          {/* Continue CTA Button (Mobile View) */}
          <div className="w-full mt-6 md:hidden">
            <button
              id="btn-intro-continue-mobile"
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
