import React, { useState, useRef, useCallback } from 'react';
import { MathJaxView } from '../MathJaxView';

interface InteractiveBasketballGraphProps {
  initialT?: number;
  interactive?: boolean;
  onTChange?: (t: number) => void;
}

export const InteractiveBasketballGraph: React.FC<InteractiveBasketballGraphProps> = ({
  initialT = 2.0, // At the peak (t=2)
  interactive = true,
  onTChange,
}) => {
  const [t, setT] = useState<number>(initialT);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Height function: h(t) = -(t-2)^2 + 4.
  // Peak at t = 2, h(2) = 4.
  // Velocity v(t) = h'(t) = -2*(t-2) = -2t + 4. At t=2, v=0.
  const currentHeight = -(t - 2) * (t - 2) + 4;
  const currentVelocity = -2 * (t - 2);

  const originX = 60;
  const originY = 220;
  const scaleX = 55;
  const scaleY = 40;

  const toSvgX = (tVal: number) => originX + tVal * scaleX;
  const toSvgY = (hVal: number) => originY - hVal * scaleY;

  // Parabola curve points
  const points: string[] = [];
  for (let xVal = 0; xVal <= 4.05; xVal += 0.1) {
    const yVal = -(xVal - 2) * (xVal - 2) + 4;
    points.push(`${toSvgX(xVal)},${toSvgY(yVal)}`);
  }
  const curveD = `M ${points.join(' L ')}`;

  const ballX = toSvgX(t);
  const ballY = toSvgY(currentHeight);

  // Tangent line for velocity
  const tLen = 0.7;
  const tanX1 = toSvgX(t - tLen);
  const tanY1 = toSvgY(currentHeight - currentVelocity * tLen);
  const tanX2 = toSvgX(t + tLen);
  const tanY2 = toSvgY(currentHeight + currentVelocity * tLen);

  const updateTFromClientX = useCallback(
    (clientX: number) => {
      if (!svgRef.current) return;
      const ctm = svgRef.current.getScreenCTM();
      if (!ctm) return;
      const svgX = (clientX - ctm.e) / ctm.a;
      let newT = (svgX - originX) / scaleX;
      newT = Math.max(0.1, Math.min(3.9, newT));
      setT(newT);
      if (onTChange) onTChange(newT);
    },
    [onTChange, originX, scaleX]
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
      <div className="relative w-full max-w-[380px] aspect-[4/3] bg-neutral-950/40 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-center overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 340 270"
          className="w-full h-full cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <defs>
            <marker
              id="arrow-bb"
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
          <line
            x1={originX}
            y1={originY}
            x2={originX}
            y2={30}
            stroke="#ffffff"
            strokeWidth="2"
            markerEnd="url(#arrow-bb)"
          />
          <text x={originX} y={20} fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" className="font-math">
            h
          </text>

          <line
            x1={originX}
            y1={originY}
            x2={300}
            y2={originY}
            stroke="#ffffff"
            strokeWidth="2"
            markerEnd="url(#arrow-bb)"
          />
          <text x={315} y={originY + 4} fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="start" className="font-math">
            t
          </text>

          {/* Launch Hand Icon */}
          <g transform={`translate(${originX - 30}, ${originY - 60}) scale(0.65)`}>
            {/* Forearm */}
            <path d="M10 50 L25 50 L22 85 L7 85 Z" fill="#b45309" />
            {/* Fist/Palm */}
            <path
              d="M10 20 C10 10 25 10 25 20 L27 50 L8 50 Z"
              fill="#d97706"
              stroke="#92400e"
              strokeWidth="2"
            />
            {/* Thumb */}
            <path d="M8 28 C3 28 3 40 8 42 Z" fill="#d97706" />
          </g>

          {/* Basketball Icon */}
          <g transform={`translate(${ballX - 18}, ${ballY - 18}) scale(0.85)`}>
            <circle cx="20" cy="20" r="18" fill="#ea580c" stroke="#9a3412" strokeWidth="2.5" />
            {/* Ball Ribs */}
            <line x1="2" y1="20" x2="38" y2="20" stroke="#7c2d12" strokeWidth="1.8" />
            <line x1="20" y1="2" x2="20" y2="38" stroke="#7c2d12" strokeWidth="1.8" />
            <path
              d="M7 7 C18 13 18 27 7 33"
              fill="none"
              stroke="#7c2d12"
              strokeWidth="1.8"
            />
            <path
              d="M33 7 C22 13 22 27 33 33"
              fill="none"
              stroke="#7c2d12"
              strokeWidth="1.8"
            />
          </g>

          {/* Parabola Trajectory */}
          <path d={curveD} fill="none" stroke="#3B82F6" strokeWidth="3" />

          {/* Projection Lines */}
          <line
            x1={ballX}
            y1={originY}
            x2={ballX}
            y2={ballY}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          <line
            x1={originX}
            y1={ballY}
            x2={ballX}
            y2={ballY}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Tangent Line representing Velocity */}
          <line
            x1={tanX1}
            y1={tanY1}
            x2={tanX2}
            y2={tanY2}
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Tangent point */}
          <circle cx={ballX} cy={ballY} r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />

          {/* Draggable Teardrop Handle */}
          {interactive && (
            <g
              transform={`translate(${ballX}, ${originY + 28})`}
              className="cursor-grab active:cursor-grabbing"
            >
              <circle cx="0" cy="0" r="22" fill="transparent" />
              <circle cx="0" cy="0" r="14" fill="#ffffff" />
              <polygon points="-6,-3 6,-3 0,-13" fill="#ffffff" />
              <circle cx="0" cy="0" r="8" fill="#3B82F6" />
            </g>
          )}
        </svg>
      </div>

      {interactive && (
        <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Geser titik kontrol pada sumbu waktu <MathJaxView math="t" inline={true} className="font-bold text-white" />
        </div>
      )}
    </div>
  );
};
