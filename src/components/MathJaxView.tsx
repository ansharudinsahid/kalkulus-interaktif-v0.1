import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
      typesetClear?: (elements?: HTMLElement[]) => void;
      startup?: {
        promise?: Promise<void>;
      };
    };
  }
}

/**
 * Converts plaintext calculus expressions to standard LaTeX syntax.
 */
export function formatToLaTeX(input: string): string {
  let s = input.trim();

  // Strip trailing periods or commas commonly found in sentences
  if (s.endsWith('.') || s.endsWith(',')) {
    s = s.slice(0, -1).trim();
  }

  // Convert unicode superscripts
  s = s.replace(/²/g, '^2').replace(/³/g, '^3').replace(/⁴/g, '^4');

  // Convert arrows
  s = s.replace(/→/g, '\\to ').replace(/⇒/g, '\\implies ');

  // Convert bracketed fractions: [ A ] / [ B ]
  s = s.replace(/\[\s*([^\]]+)\s*\]\s*\/\s*\[\s*([^\]]+)\s*\]/g, '\\frac{$1}{$2}');
  s = s.replace(/\(\s*([^)]+)\s*\)\s*\/\s*\(\s*([^)]+)\s*\)/g, '\\frac{$1}{$2}');

  // Convert limit expressions like: lim (b -> x) or lim (b \to x)
  s = s.replace(/lim\s*\(\s*([a-zA-Z])\s*(?:\\to|->|→)\s*([a-zA-Z0-9])\s*\)/g, '\\lim_{$1 \\to $2}');

  // Convert single-fraction numbers like -1/3 to -\frac{1}{3}
  s = s.replace(/(?:^|\s)([-+]?)(\d+)\/(\d+)(?:$|\s)/g, ' $1\\frac{$2}{$3} ');

  return s.trim();
}

interface MathJaxViewProps {
  math: string;
  display?: boolean;
  inline?: boolean;
  className?: string;
}

export const MathJaxView: React.FC<MathJaxViewProps> = ({
  math,
  display = false,
  inline = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  const isDisplay = display && !inline;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const formatted = formatToLaTeX(math);
    const texString = isDisplay ? `\\[ ${formatted} \\]` : `\\( ${formatted} \\)`;

    // Put raw TeX into element so MathJax can typeset it
    el.innerHTML = texString;

    const doTypeset = () => {
      if (!el || !window.MathJax?.typesetPromise) return;
      try {
        window.MathJax.typesetClear?.([el]);
        window.MathJax.typesetPromise([el]).catch(() => {});
      } catch (e) {
        // Safe fallback
      }
    };

    if (window.MathJax?.typesetPromise) {
      doTypeset();
    } else if (window.MathJax?.startup?.promise) {
      window.MathJax.startup.promise.then(doTypeset);
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.MathJax?.typesetPromise) {
          clearInterval(interval);
          doTypeset();
        } else if (attempts > 30) {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [math, isDisplay]);

  const formattedFallback = formatToLaTeX(math);

  return (
    <span
      ref={containerRef}
      className={`font-math select-text ${isDisplay ? 'block my-1 text-center' : 'inline-block align-middle'} ${className}`}
    >
      {formattedFallback}
    </span>
  );
};
