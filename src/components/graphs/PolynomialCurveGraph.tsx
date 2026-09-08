import React from 'react';

interface PolynomialCurveGraphProps {
  inverted?: boolean;
  highlightCriticalPoints?: boolean;
  interactive?: boolean;
}

export const PolynomialCurveGraph: React.FC<PolynomialCurveGraphProps> = ({
  inverted = false,
  highlightCriticalPoints = true,
}) => {
  // Function: f(x) = x^4 - 2x^2 + 1. Minima at x = -1 (y=0), x = 1 (y=0), Maximum at x = 0 (y=1).
  // Inverted: f(x) = - (x^4 - 2x^2 + 1). Maxima at x = -1, 1 (y=0), Minimum at x = 0 (y=-1).
  // SVG coordinates:
  // Center is (170, 140)
  // X domain: -1.7 to 1.7
  // Scale X: 65 px per unit
  // Scale Y: 60 px per unit

  const cx = 170;
  const cy = inverted ? 110 : 170;
  const scaleX = 65;
  const scaleY = 60;

  const points: string[] = [];
  const minX = -1.65;
  const maxX = 1.65;
  const step = 0.05;

  for (let xVal = minX; xVal <= maxX + 0.01; xVal += step) {
    let yVal = Math.pow(xVal, 4) - 2 * Math.pow(xVal, 2) + 1;
    if (inverted) yVal = -yVal;

    const svgX = cx + xVal * scaleX;
    const svgY = cy - yVal * scaleY;
    points.push(`${svgX},${svgY}`);
  }

  const pathD = `M ${points.join(' L ')}`;

  return (
    <div className="flex flex-col items-center justify-center my-3 select-none">
      <div className="relative w-full max-w-[360px] aspect-[4/3.2] bg-neutral-950/40 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-center">
        <svg viewBox="0 0 340 260" className="w-full h-full">
          <defs>
            <marker
              id="arrow-poly"
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
            x1={cx}
            y1={240}
            x2={cx}
            y2={20}
            stroke="#ffffff"
            strokeWidth="1.8"
            markerEnd="url(#arrow-poly)"
          />
          <text x={cx} y={15} fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" className="font-math">
            f
          </text>

          {/* X Axis */}
          <line
            x1={20}
            y1={cy}
            x2={320}
            y2={cy}
            stroke="#ffffff"
            strokeWidth="1.8"
            markerEnd="url(#arrow-poly)"
          />
          <text x={328} y={cy + 4} fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="start" className="font-math">
            x
          </text>

          {/* X Axis Ticks (-1, 0, 1) */}
          <line
            x1={cx - scaleX}
            y1={cy - 4}
            x2={cx - scaleX}
            y2={cy + 4}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <text
            x={cx - scaleX}
            y={inverted ? cy - 10 : cy + 18}
            fill="#ffffff"
            fontSize="12"
            textAnchor="middle"
            className="font-math"
          >
            -1
          </text>

          <line
            x1={cx + scaleX}
            y1={cy - 4}
            x2={cx + scaleX}
            y2={cy + 4}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <text
            x={cx + scaleX}
            y={inverted ? cy - 10 : cy + 18}
            fill="#ffffff"
            fontSize="12"
            textAnchor="middle"
            className="font-math"
          >
            1
          </text>

          {/* Y Axis Ticks */}
          {!inverted && (
            <>
              <line x1={cx - 4} y1={cy - scaleY} x2={cx + 4} y2={cy - scaleY} stroke="#ffffff" strokeWidth="1.5" />
              <text x={cx - 10} y={cy - scaleY + 4} fill="#ffffff" fontSize="12" textAnchor="end" className="font-math">
                1
              </text>
              <line x1={cx - 4} y1={cy - 2 * scaleY} x2={cx + 4} y2={cy - 2 * scaleY} stroke="#ffffff" strokeWidth="1.5" />
              <text x={cx - 10} y={cy - 2 * scaleY + 4} fill="#ffffff" fontSize="12" textAnchor="end" className="font-math">
                2
              </text>
              <line x1={cx - 4} y1={cy - 3 * scaleY} x2={cx + 4} y2={cy - 3 * scaleY} stroke="#ffffff" strokeWidth="1.5" />
              <text x={cx - 10} y={cy - 3 * scaleY + 4} fill="#ffffff" fontSize="12" textAnchor="end" className="font-math">
                3
              </text>
              <line x1={cx - 4} y1={cy - 4 * scaleY} x2={cx + 4} y2={cy - 4 * scaleY} stroke="#ffffff" strokeWidth="1.5" />
              <text x={cx - 10} y={cy - 4 * scaleY + 4} fill="#ffffff" fontSize="12" textAnchor="end" className="font-math">
                4
              </text>
            </>
          )}

          {inverted && (
            <>
              <line x1={cx - 4} y1={cy + scaleY} x2={cx + 4} y2={cy + scaleY} stroke="#ffffff" strokeWidth="1.5" />
              <text x={cx - 10} y={cy + scaleY + 4} fill="#ffffff" fontSize="12" textAnchor="end" className="font-math">
                -1
              </text>
              <line x1={cx - 4} y1={cy - scaleY} x2={cx + 4} y2={cy - scaleY} stroke="#ffffff" strokeWidth="1.5" />
              <text x={cx - 10} y={cy - scaleY + 4} fill="#ffffff" fontSize="12" textAnchor="end" className="font-math">
                1
              </text>
            </>
          )}

          {/* Polynomial Curve */}
          <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="3" />

          {/* Critical Point Markers */}
          {highlightCriticalPoints && (
            <>
              {/* x = -1 */}
              <circle
                cx={cx - scaleX}
                cy={inverted ? cy : cy}
                r="5"
                fill="#3B82F6"
                stroke="#ffffff"
                strokeWidth="2"
              />
              {/* x = 0 */}
              <circle
                cx={cx}
                cy={inverted ? cy + scaleY : cy - scaleY}
                r="5"
                fill="#3B82F6"
                stroke="#ffffff"
                strokeWidth="2"
              />
              {/* x = 1 */}
              <circle
                cx={cx + scaleX}
                cy={inverted ? cy : cy}
                r="5"
                fill="#3B82F6"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};
