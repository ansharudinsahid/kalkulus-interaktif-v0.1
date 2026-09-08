import React from 'react';
import { Check, X } from 'lucide-react';
import { StepData, OptionItem } from '../../types';
import { MathJaxView } from '../MathJaxView';
import { MathText, isFormulaBlock } from '../MathText';
import { InteractiveLinearSlider } from '../graphs/InteractiveLinearSlider';
import { InteractiveParabolaTangent } from '../graphs/InteractiveParabolaTangent';
import { InteractiveBasketballGraph } from '../graphs/InteractiveBasketballGraph';
import { InteractiveHtmlQuizGraph } from '../graphs/InteractiveHtmlQuizGraph';
import { PolynomialCurveGraph } from '../graphs/PolynomialCurveGraph';
import { ExtremaCurveGraph } from '../graphs/ExtremaCurveGraph';

interface QuestionStepViewProps {
  step: StepData;
  selectedOptionId: string | null;
  isChecked: boolean;
  onSelectOption: (optionId: string) => void;
}

export const QuestionStepView: React.FC<QuestionStepViewProps> = ({
  step,
  selectedOptionId,
  isChecked,
  onSelectOption,
}) => {
  const renderVisualGraph = () => {
    switch (step.type) {
      case 'linear_slider_intro':
      case 'question_linear_slope':
        return (
          <InteractiveLinearSlider
            initialM={step.initialSliderValue ?? 1}
            interactive={true}
          />
        );

      case 'parabola_tangent_question':
        return (
          <InteractiveParabolaTangent
            initialA={3.2}
            interactive={true}
            showSlopeLabel={true}
          />
        );

      case 'derivative_graph_question':
        return (
          <div className="flex flex-col items-center justify-center my-3 select-none">
            <div className="relative w-full max-w-[340px] aspect-[4/3] bg-neutral-950/40 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-center">
              <svg viewBox="0 0 300 240" className="w-full h-full">
                <defs>
                  <marker
                    id="arrow-dg"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 Z" fill="#ffffff" />
                  </marker>
                </defs>
                {/* Axes */}
                <line x1="150" y1="220" x2="150" y2="20" stroke="#ffffff" strokeWidth="2" markerEnd="url(#arrow-dg)" />
                <text x="150" y="15" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" className="font-math">
                  f'
                </text>

                <line x1="20" y1="120" x2="280" y2="120" stroke="#ffffff" strokeWidth="2" markerEnd="url(#arrow-dg)" />
                <text x="290" y="125" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="start" className="font-math">
                  x
                </text>

                {/* Line f'(x) = -2x + 4. At x=0, f'=4; at x=2, f'=0; at x=4, f'=-4 */}
                <line x1="60" y1="30" x2="240" y2="210" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" />

                {/* Root at (2,0) */}
                <circle cx="150" cy="120" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
                <text x="165" y="112" fill="#ffffff" fontSize="12" fontWeight="bold" className="font-math">
                  2
                </text>
              </svg>
            </div>
            <div className="text-sm text-neutral-400 mt-2 font-math">
              <MathJaxView math="f'(x) = -2x + 4" inline={true} />
            </div>
          </div>
        );

      case 'highest_point_tangent_question':
        return (
          <InteractiveParabolaTangent
            initialA={2.0}
            interactive={false}
            showSlopeLabel={true}
            highlightPeak={true}
          />
        );

      case 'basketball_toss_question':
        return <InteractiveBasketballGraph initialT={2.0} interactive={true} />;

      case 'critical_points_intro_question':
        return <PolynomialCurveGraph inverted={false} highlightCriticalPoints={true} />;

      case 'extrema_count_question':
        return <ExtremaCurveGraph singlePeak={false} highlightLabels={false} />;

      case 'skill_check_inverted_curve':
        return <PolynomialCurveGraph inverted={true} highlightCriticalPoints={true} />;

      case 'skill_check_single_peak':
        return <ExtremaCurveGraph singlePeak={true} highlightLabels={false} />;

      case 'html_linear_rate_question':
        return <InteractiveHtmlQuizGraph initialT={5} interactive={true} />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center animate-in fade-in duration-300">
      {/* Title & Subtitle if provided */}
      {step.title && (
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-1 font-teachers">
          <MathText text={step.title} />
        </h2>
      )}

      {step.subtitle && (
        <p className="text-sm text-neutral-400 text-center mb-3 max-w-md font-teachers">
          <MathText text={step.subtitle} />
        </p>
      )}

      {/* Content Text Blocks */}
      {step.content && step.content.length > 0 && (
        <div className="w-full text-center text-sm sm:text-base text-neutral-300 space-y-1.5 mb-3 font-normal font-teachers">
          {step.content.map((paragraph, idx) => {
            if (isFormulaBlock(paragraph)) {
              return (
                <div key={idx} className="py-1">
                  <MathJaxView
                    math={paragraph}
                    display={true}
                    className="text-blue-400 font-semibold text-base sm:text-lg"
                  />
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                <MathText text={paragraph} />
              </p>
            );
          })}
        </div>
      )}

      {/* Concept Tags / Cards if provided (e.g. Local vs Absolute definition) */}
      {step.tags && step.tags.length > 0 && (
        <div className="w-full space-y-2 mb-3">
          {step.tags.map((tagText, i) => (
            <div
              key={i}
              className="w-full p-3 bg-neutral-900/90 border border-neutral-800 rounded-2xl text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 shadow-sm font-teachers"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5"></div>
              <p className="leading-relaxed"><MathText text={tagText} /></p>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Visual Graph */}
      {renderVisualGraph()}

      {/* Question Prompt */}
      {step.question && (
        <div className="w-full my-4 text-center font-teachers">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
            <MathText text={step.question} />
          </h3>
        </div>
      )}

      {/* Multiple Choice Options Grid */}
      {step.options && step.options.length > 0 && (
        <div
          className={`w-full grid gap-3 ${
            step.options.length === 2
              ? 'grid-cols-2'
              : step.options.length === 3
              ? 'grid-cols-3'
              : step.options.length === 4
              ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {step.options.map((option: OptionItem) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.isCorrect;
            const isMath = !/[a-zA-Z]{3,}/.test(option.label);

            let cardStyle = 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-neutral-700';

            if (!isChecked) {
              if (isSelected) {
                cardStyle = 'bg-blue-950/40 border-blue-500 text-white ring-2 ring-blue-500/50 shadow-md shadow-blue-500/10';
              }
            } else {
              // Evaluated state
              if (isSelected) {
                if (isCorrectOption) {
                  cardStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50';
                } else {
                  cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-300 ring-2 ring-rose-500/50';
                }
              } else if (isCorrectOption) {
                // Highlight the correct answer if user got it wrong
                cardStyle = 'bg-emerald-950/30 border-emerald-500/80 text-emerald-400 border-dashed';
              } else {
                cardStyle = 'bg-neutral-950/40 border-neutral-900 text-neutral-600 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                id={`option-${option.id}`}
                disabled={isChecked}
                onClick={() => onSelectOption(option.id)}
                className={`relative w-full py-4 px-3 rounded-2xl border-2 font-medium text-sm sm:text-base flex items-center justify-center text-center transition-all duration-200 select-none cursor-pointer focus:outline-none min-h-[56px] ${cardStyle}`}
              >
                {/* Option Label - MathJax strictly for math, Teachers for words */}
                {isMath ? (
                  <MathJaxView math={option.label} inline={true} className="font-semibold text-base sm:text-lg" />
                ) : (
                  <span className="font-semibold">{option.label}</span>
                )}

                {/* Checked Badge in Top-Right Corner */}
                {isChecked && isSelected && (
                  <div
                    className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold shadow-md ${
                      isCorrectOption
                        ? 'bg-emerald-500 text-neutral-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {isCorrectOption ? '✓' : '✕'}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
