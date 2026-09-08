import React from 'react';

interface ExtremaCurveGraphProps {
  singlePeak?: boolean;
  highlightLabels?: boolean;
  highlightAbsolute?: boolean;
}

export const ExtremaCurveGraph: React.FC<ExtremaCurveGraphProps> = ({
  singlePeak = false,
  highlightLabels = false,
  highlightAbsolute = false,
}) => {
  // SVG coordinates: 340 x 260
  // Multi-extrema wave curve:
  // Starts on left (x=50, y=90), goes down to local min (x=110, y=140), climbs to local max (x=160, y=120),
  // goes down to absolute min (x=210, y=180), then rises high up (x=260, y=110).
  // Single-peak curve (from skill check 2):
  // Starts low on left, climbs up through inflection/local dip to high absolute peak (x=220, y=40), then drops down past x axis.

  return (
    <div className="flex flex-col items-center justify-center my-3 select-none">
      <div className="relative w-full max-w-[360px] aspect-[4/3.2] bg-neutral-950/40 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-center">
        <svg viewBox="0 0 340 260" className="w-full h-full">
          <defs>
            <marker
              id="arrow-ext"
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
            x1="50"
            y1="230"
            x2="50"
            y2="30"
            stroke="#ffffff"
            strokeWidth="1.8"
            markerEnd="url(#arrow-ext)"
          />
          {/* X Axis */}
          <line
            x1="40"
            y1="210"
            x2="310"
            y2="210"
            stroke="#ffffff"
            strokeWidth="1.8"
            markerEnd="url(#arrow-ext)"
          />

          {/* Multi-Extrema Curve (Question 2 from Video) */}
          {!singlePeak && (
            <>
              {/* Smooth Bezier Path */}
              <path
                d="M 50,90 C 80,100 90,130 115,130 C 135,130 145,115 165,115 C 185,115 195,185 220,185 C 240,185 250,110 260,110"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Point 1: Left local extremum (x=115, y=130) */}
              <circle cx="115" cy="130" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />

              {/* Point 2: Middle local maximum (x=165, y=115) */}
              <circle cx="165" cy="115" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />

              {/* Point 3: Absolute Minimum (x=220, y=185) */}
              <circle cx="220" cy="185" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />

              {/* Modal Explanation Highlights */}
              {(highlightLabels || highlightAbsolute) && (
                <g className="text-xs">
                  {/* Local Extrema Label with pointer */}
                  <text x="140" y="85" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Ekstrim Lokal
                  </text>
                  <line x1="140" y1="92" x2="160" y2="108" stroke="#9ca3af" strokeWidth="1.5" />
                  <line x1="135" y1="92" x2="118" y2="122" stroke="#9ca3af" strokeWidth="1.5" />

                  {/* Absolute Minimum Label */}
                  <text x="220" y="215" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Minimum Absolut
                  </text>
                  <line x1="220" y1="202" x2="220" y2="192" stroke="#9ca3af" strokeWidth="1.5" />
                </g>
              )}
            </>
          )}

          {/* Single Peak Curve (Skill Check 2 from Video) */}
          {singlePeak && (
            <>
              {/* Curve with single global peak */}
              <path
                d="M 50,190 C 80,180 110,135 125,135 C 135,135 145,140 160,115 C 180,80 200,35 220,35 C 235,35 245,170 255,230"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Local inflections */}
              <circle cx="125" cy="135" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="155" cy="135" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />

              {/* Global/Absolute Peak (x=220, y=35) */}
              <circle cx="220" cy="35" r="5.5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />

              {(highlightLabels || highlightAbsolute) && (
                <g className="text-xs">
                  <text x="220" y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Maksimum Absolut
                  </text>
                  <line x1="220" y1="23" x2="220" y2="30" stroke="#9ca3af" strokeWidth="1.5" />
                </g>
              )}
            </>
          )}
        </svg>
      </div>
    </div>
  );
};
