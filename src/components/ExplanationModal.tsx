import React from 'react';
import { X, CheckCircle, Lightbulb } from 'lucide-react';
import { ExplanationData } from '../types';
import { InteractiveLinearSlider } from './graphs/InteractiveLinearSlider';
import { InteractiveParabolaTangent } from './graphs/InteractiveParabolaTangent';
import { InteractiveBasketballGraph } from './graphs/InteractiveBasketballGraph';
import { InteractiveHtmlQuizGraph } from './graphs/InteractiveHtmlQuizGraph';
import { PolynomialCurveGraph } from './graphs/PolynomialCurveGraph';
import { ExtremaCurveGraph } from './graphs/ExtremaCurveGraph';
import { MathJaxView } from './MathJaxView';
import { MathText } from './MathText';

interface ExplanationModalProps {
  isOpen: boolean;
  explanation: ExplanationData;
  onClose: () => void;
  onContinue?: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({
  isOpen,
  explanation,
  onClose,
  onContinue,
}) => {
  if (!isOpen) return null;

  const renderGraph = () => {
    switch (explanation.graphType) {
      case 'linear':
        return (
          <InteractiveLinearSlider
            initialM={explanation.graphParams?.defaultM || 0.5}
            interactive={true}
            showTitle={false}
          />
        );
      case 'parabola':
        return (
          <InteractiveParabolaTangent
            initialA={explanation.graphParams?.targetA || 3.2}
            interactive={false}
            showSlopeLabel={true}
            highlightPeak={explanation.graphParams?.highlightPeak || false}
          />
        );
      case 'basketball':
        return <InteractiveBasketballGraph initialT={2.0} interactive={false} />;
      case 'html_rate':
        return <InteractiveHtmlQuizGraph initialT={5} interactive={false} />;
      case 'polynomial':
        return (
          <PolynomialCurveGraph
            inverted={explanation.graphParams?.inverted || false}
            highlightCriticalPoints={true}
          />
        );
      case 'extrema':
        return (
          <ExtremaCurveGraph
            singlePeak={explanation.graphParams?.singlePeak || false}
            highlightLabels={true}
            highlightAbsolute={explanation.graphParams?.highlightAbsolute || true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div
        id="explanation-dialog"
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col gap-4 text-neutral-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg text-white">
              {explanation.title || 'Penjelasan Konsep'}
            </h3>
          </div>

          <button
            id="btn-close-explanation-modal"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Visual Graph if applicable */}
        {explanation.graphType && (
          <div className="w-full flex justify-center bg-neutral-950/60 rounded-2xl border border-neutral-800 p-2 my-1">
            {renderGraph()}
          </div>
        )}

        {/* Formula Card if available */}
        {explanation.formula && (
          <div className="w-full py-2.5 px-4 bg-neutral-950/70 border border-neutral-800 rounded-xl text-center text-blue-400">
            <MathJaxView math={explanation.formula} display={true} className="text-base font-semibold" />
          </div>
        )}

        {/* Explanation Text */}
        <div className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-2 whitespace-pre-line font-teachers">
          <MathText text={explanation.text} />
        </div>

        {/* Steps List if available */}
        {explanation.steps && explanation.steps.length > 0 && (
          <div className="space-y-1.5 pt-2">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-teachers">Langkah Analisis:</h4>
            {explanation.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300 font-teachers">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 font-math">
                  {idx + 1}
                </span>
                <span><MathText text={step} /></span>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-end gap-3 mt-2">
          <button
            id="btn-modal-got-it"
            onClick={() => {
              onClose();
              if (onContinue) onContinue();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-full text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>Lanjutkan</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
