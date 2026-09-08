import React, { useState } from 'react';
import { MathJaxView } from '../MathJaxView';

interface InteractiveLinearSliderProps {
  initialM?: number;
  interactive?: boolean;
  onMChange?: (m: number) => void;
  showTitle?: boolean;
}

export const InteractiveLinearSlider: React.FC<InteractiveLinearSliderProps> = ({
  initialM = 1,
  interactive = true,
  onMChange,
  showTitle = true,
}) => {
  const [m, setM] = useState<number>(initialM);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setM(val);
    if (onMChange) onMChange(val);
  };

  // SVG coordinate transformation:
  // Center is (150, 120)
  const cx = 150;
  const cy = 120;
  const length = 90;

  // For y = mx: when x changes by dx, y changes by m*dx
  // In SVG, positive y is downward, so y_svg = cy - m * dx
  const x1 = cx - length;
  const y1 = cy + m * length; // -m * (-length) = +m*length in mathematical Cartesian -> down in SVG
  const x2 = cx + length;
  const y2 = cy - m * length;

  return (
    <div className="flex flex-col items-center justify-center my-3 select-none">
      {showTitle && (
        <div className="text-center mb-2">
          <MathJaxView math="f(x) = mx" display={true} className="text-xl text-neutral-300 font-semibold" />
        </div>
      )}

      <div className="relative w-full max-w-[340px] aspect-[4/3] bg-neutral-950/40 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-center">
        <svg viewBox="0 0 300 240" className="w-full h-full">
          {/* Grid lines or subtle markings */}
          <defs>
            <marker
              id="arrow-head"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,1 L7,4 L0,7 Z" fill="#ffffff" />
            </marker>
          </defs>

          {/* Y-Axis */}
          <line
            x1="150"
            y1="220"
            x2="150"
            y2="20"
            stroke="#ffffff"
            strokeWidth="2"
            markerEnd="url(#arrow-head)"
          />
          {/* X-Axis */}
          <line
            x1="20"
            y1="120"
            x2="280"
            y2="120"
            stroke="#ffffff"
            strokeWidth="2"
            markerEnd="url(#arrow-head)"
          />

          {/* Dynamic Line f(x) = mx */}
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#3B82F6"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Origin Point */}
          <circle cx="150" cy="120" r="4.5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </div>

      {/* Slider Control */}
      {interactive && (
        <div className="w-full max-w-[280px] mt-4 flex flex-col items-center">
          <div className="w-full flex justify-between text-xs font-semibold text-neutral-400 mb-1 px-1">
            <span>-1</span>
            <span>0</span>
            <span>1</span>
          </div>

          <div className="relative w-full flex items-center">
            <MathJaxView math="m" inline={true} className="text-neutral-300 mr-3 text-base font-bold" />
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={m}
              onChange={handleSliderChange}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
            />
          </div>

          <div className="mt-2 text-xs font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40 px-3 py-1 rounded-full flex items-center justify-center gap-1">
            <MathJaxView math={`m = ${m > 0 ? `+${m.toFixed(2)}` : m.toFixed(2)}`} inline={true} className="font-semibold text-sm" />
            <span>{m > 0 ? '(Fungsi Naik)' : m < 0 ? '(Fungsi Turun)' : '(Garis Datar)'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
