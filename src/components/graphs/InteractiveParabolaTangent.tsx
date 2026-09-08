import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MathJaxView } from '../MathJaxView';

interface InteractiveParabolaTangentProps {
  initialA?: number; // 0 to 4
  interactive?: boolean;
  onAChange?: (a: number, slope: number) => void;
  showSlopeLabel?: boolean;
  highlightPeak?: boolean;
}

export const InteractiveParabolaTangent: React.FC<InteractiveParabolaTangentProps> = ({
  initialA = 1.2,
  interactive = true,
  onAChange,
  showSlopeLabel = true,
  highlightPeak = false,
}) => {
  const [a, setA] = useState<number>(initialA);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Parabola domain: x in [0, 4], peak at x=2, y = - (x - 2)^2 + 4 => y(0)=0, y(2)=4, y(4)=0
  // Slope: f'(x) = -2*(x - 2) = -2x + 4. At x=1.2, f'(1.2) = 1.6; at x=2, f'=0; at x=3.2, f' = -2.4.
  const currentSlope = -2 * (a - 2);

  // Coordinate mapping into SVG viewBox="0 0 340 280"
  // Origin (0,0) -> SVG (40, 230)
  // Max X (4,0) -> SVG (280, 230) -> Scale X = 60 px per unit
  // Peak (2,4) -> SVG (160, 50) -> Scale Y = 45 px per unit
  const originX = 40;
  const originY = 230;
  const scaleX = 60;
  const scaleY = 45;

  const toSvgX = (xVal: number) => originX + xVal * scaleX;
  const toSvgY = (yVal: number) => originY - yVal * scaleY;

  // Path points for parabola: y = -(x-2)^2 + 4
  const curvePoints: string[] = [];
  for (let xVal = 0; xVal <= 4.05; xVal += 0.1) {
    const yVal = -(xVal - 2) * (xVal - 2) + 4;
    curvePoints.push(`${toSvgX(xVal)},${toSvgY(yVal)}`);
  }
  const curveD = `M ${curvePoints.join(' L ')}`;

  // Current contact point on the curve
  const currentY = -(a - 2) * (a - 2) + 4;
  const ptX = toSvgX(a);
  const ptY = toSvgY(currentY);

  // Tangent line endpoints in SVG:
  // dx = 0.8 units in math
  const tLen = 0.75;
  const tanX1 = toSvgX(a - tLen);
  const tanY1 = toSvgY(currentY - currentSlope * tLen);
  const tanX2 = toSvgX(a + tLen);
  const tanY2 = toSvgY(currentY + currentSlope * tLen);

  const updateAFromClientX = useCallback(
    (clientX: number) => {
      if (!svgRef.current) return;
      const ctm = svgRef.current.getScreenCTM();
      if (!ctm) return;
      const svgX = (clientX - ctm.e) / ctm.a;
      let newA = (svgX - originX) / scaleX;
      newA = Math.max(0.1, Math.min(3.9, newA));
      setA(newA);
      if (onAChange) {
        onAChange(newA, -2 * (newA - 2));
      }
    },
    [onAChange, originX, scaleX]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateAFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateAFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (onAChange) {
      onAChange(a, currentSlope);
    }
  }, [a]);

  return (
    <div className="flex flex-col items-center justify-center my-3 select-none">
      {/* Slope Header */}
      {showSlopeLabel && (
        <div className="flex items-center gap-2 mb-2 px-3 py-1 bg-neutral-900/80 border border-neutral-800 rounded-full text-sm">
          <span className="w-4 h-1 bg-amber-500 rounded-full inline-block"></span>
          <MathJaxView
            math={`f'(a) = ${Math.abs(currentSlope) < 0.15 ? '0.0' : currentSlope > 0 ? `+${currentSlope.toFixed(1)}` : currentSlope.toFixed(1)}`}
            inline={true}
            className="text-sm font-semibold"
          />
          <span
            className={`font-semibold text-xs ${
              Math.abs(currentSlope) < 0.15
                ? 'text-emerald-400'
                : currentSlope > 0
                ? 'text-blue-400'
                : 'text-amber-400'
            }`}
          >
            {Math.abs(currentSlope) < 0.15
              ? '(Nol)'
              : currentSlope > 0
              ? '(Positif)'
              : '(Negatif)'}
          </span>
        </div>
      )}

      <div className="relative w-full max-w-[380px] aspect-[4/3] bg-neutral-950/40 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-center overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 340 280"
          className="w-full h-full cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <defs>
            <marker
              id="arrow-w"
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
          {/* Y Axis */}
          <line
            x1={originX}
            y1={originY}
            x2={originX}
            y2={25}
            stroke="#ffffff"
            strokeWidth="2"
            markerEnd="url(#arrow-w)"
          />
          {/* X Axis */}
          <line
            x1={originX}
            y1={originY}
            x2={310}
            y2={originY}
            stroke="#ffffff"
            strokeWidth="2"
            markerEnd="url(#arrow-w)"
          />

          {/* Parabola Curve */}
          <path d={curveD} fill="none" stroke="#3B82F6" strokeWidth="3" />

          {/* Dotted projection lines to point on curve */}
          <line
            x1={ptX}
            y1={originY}
            x2={ptX}
            y2={ptY}
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Tangent Line */}
          <line
            x1={tanX1}
            y1={tanY1}
            x2={tanX2}
            y2={tanY2}
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Tangent point on curve */}
          <circle cx={ptX} cy={ptY} r="5.5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2.5" />

          {/* Highlight Peak marker if requested */}
          {highlightPeak && (
            <g transform={`translate(${toSvgX(2)}, ${toSvgY(4)})`}>
              <circle cx="0" cy="0" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <line
                x1={toSvgX(2)}
                y1={originY}
                x2={toSvgX(2)}
                y2={toSvgY(4)}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <text x="0" y="-12" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
                Puncak (x = 2)
              </text>
            </g>
          )}

          {/* Label 'a' on x axis */}
          <text
            x={ptX}
            y={originY + 18}
            fill="#ffffff"
            className="font-math"
            fontStyle="italic"
            fontSize="15"
            fontWeight="bold"
            textAnchor="middle"
          >
            a
          </text>

          {/* Draggable teardrop handle on X axis */}
          {interactive && (
            <g
              transform={`translate(${ptX}, ${originY + 34})`}
              className="cursor-grab active:cursor-grabbing"
            >
              {/* Invisible large hit area */}
              <circle cx="0" cy="0" r="24" fill="transparent" />
              {/* Handle outer circle & pointer */}
              <circle cx="0" cy="0" r="14" fill="#ffffff" />
              <polygon points="-7,-4 7,-4 0,-14" fill="#ffffff" />
              <circle cx="0" cy="0" r="9" fill="#3B82F6" />
            </g>
          )}
        </svg>
      </div>

      {interactive && (
        <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Geser titik <MathJaxView math="a" inline={true} className="font-bold text-white" /> ke kiri atau kanan
        </div>
      )}
    </div>
  );
};
