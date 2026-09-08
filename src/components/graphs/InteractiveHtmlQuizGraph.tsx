import React, { useState, useRef, useCallback } from 'react';
import { MathJaxView } from '../MathJaxView';

interface InteractiveHtmlQuizGraphProps {
  initialT?: number;
  interactive?: boolean;
  onTChange?: (t: number, gVal: number) => void;
}

export const InteractiveHtmlQuizGraph: React.FC<InteractiveHtmlQuizGraphProps> = ({
  initialT = 5,
  interactive = true,
  onTChange,
}) => {
  const [t, setT] = useState<number>(initialT);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const originX = 200;
  const originY = 350;
  const scaleX = 20;
  const scaleY = 1;
  const rate = -20;
  const base = 200;

  const currentX = originX + t * scaleX;
  const currentG = t * rate + base;
  const currentY = originY - currentG * scaleY;

  const updateTFromClientX = useCallback(
    (clientX: number) => {
      if (!svgRef.current) return;
      const ctm = svgRef.current.getScreenCTM();
      if (!ctm) return;
      const svgX = (clientX - ctm.e) / ctm.a;
      let newT = (svgX - originX) / scaleX;
      newT = Math.max(0, Math.min(10.5, newT));
      setT(newT);
      if (onTChange) {
        onTChange(newT, newT * rate + base);
      }
    },
    [onTChange, originX, scaleX, rate, base]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateTFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateTFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center my-3 select-none">
      <div className="relative w-full max-w-[420px] aspect-[4/3.5] bg-neutral-950/40 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-center overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="140 70 330 350"
          className="w-full h-full cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Static Layer */}
          <g id="static-layer">
            {/* Y Axis: g(t) */}
            <line x1="200" y1="350" x2="200" y2="100" stroke="#ffffff" strokeWidth="2" />
            <polygon points="194,110 200,95 206,110" fill="#ffffff" />
            <text x="200" y="80" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle" className="font-math">
              g(t)
            </text>

            {/* X Axis: t */}
            <line x1="200" y1="350" x2="440" y2="350" stroke="#ffffff" strokeWidth="2" />
            <polygon points="430,344 445,350 430,356" fill="#ffffff" />
            <text x="460" y="350" fill="#ffffff" fontWeight="bold" fontSize="15" dominantBaseline="middle" className="font-math">
              t
            </text>

            {/* Y Ticks */}
            <line x1="195" y1="250" x2="205" y2="250" stroke="#ffffff" strokeWidth="1" />
            <text x="185" y="250" fill="#ffffff" fontSize="14" textAnchor="end" dominantBaseline="middle" className="font-math">
              100
            </text>

            <line x1="195" y1="150" x2="205" y2="150" stroke="#ffffff" strokeWidth="1" />
            <text x="185" y="150" fill="#ffffff" fontSize="14" textAnchor="end" dominantBaseline="middle" className="font-math">
              200
            </text>

            {/* X Ticks */}
            <line x1="220" y1="345" x2="220" y2="355" stroke="#ffffff" strokeWidth="1" />
            <line x1="240" y1="345" x2="240" y2="355" stroke="#ffffff" strokeWidth="1" />
            <line x1="260" y1="345" x2="260" y2="355" stroke="#ffffff" strokeWidth="1" />
            <line x1="280" y1="345" x2="280" y2="355" stroke="#ffffff" strokeWidth="1" />

            <line x1="300" y1="345" x2="300" y2="355" stroke="#ffffff" strokeWidth="1" />
            <text x="300" y="375" fill="#ffffff" fontSize="14" textAnchor="middle" dominantBaseline="middle" className="font-math">
              5
            </text>

            <line x1="320" y1="345" x2="320" y2="355" stroke="#ffffff" strokeWidth="1" />
            <line x1="340" y1="345" x2="340" y2="355" stroke="#ffffff" strokeWidth="1" />
            <line x1="360" y1="345" x2="360" y2="355" stroke="#ffffff" strokeWidth="1" />
            <line x1="380" y1="345" x2="380" y2="355" stroke="#ffffff" strokeWidth="1" />

            <line x1="400" y1="345" x2="400" y2="355" stroke="#ffffff" strokeWidth="1" />
            <text x="400" y="375" fill="#ffffff" fontSize="14" textAnchor="middle" dominantBaseline="middle" className="font-math">
              10
            </text>

            {/* Blue Function Line */}
            <line x1="200" y1="150" x2="410" y2="360" stroke="#3B82F6" strokeWidth="3" />
          </g>

          {/* Dynamic Layer */}
          <g id="dynamic-layer">
            <line
              x1={currentX}
              y1="350"
              x2={currentX}
              y2={currentY}
              stroke="#888888"
              strokeWidth="2"
              strokeDasharray="6,6"
            />
            <line
              x1="200"
              y1={currentY}
              x2={currentX}
              y2={currentY}
              stroke="#888888"
              strokeWidth="2"
              strokeDasharray="6,6"
            />
            <circle cx={currentX} cy={currentY} r="6" fill="#3B82F6" stroke="#ffffff" strokeWidth="2.5" />

            {/* Draggable Handle */}
            {interactive && (
              <g transform={`translate(${currentX}, 390)`} className="cursor-grab active:cursor-grabbing">
                <circle cx="0" cy="-10" r="30" fill="transparent" />
                <polygon points="-10,-5 10,-5 0,-22" fill="#ffffff" />
                <circle cx="0" cy="0" r="16" fill="#ffffff" />
                <circle cx="0" cy="0" r="10" fill="#3B82F6" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {interactive && (
        <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Geser lingkaran <MathJaxView math="t" inline={true} className="font-bold text-white" /> untuk mengamati koordinat
        </div>
      )}
    </div>
  );
};
