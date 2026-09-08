import React from 'react';
import { MathJaxView } from './MathJaxView';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Checks if a string is a standalone formula block rather than a prose sentence.
 */
export function isFormulaBlock(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (trimmed.includes('\n') || trimmed.startsWith('•') || trimmed.startsWith('- ')) {
    return false;
  }

  // Count natural prose words (words with 3+ letters not belonging to LaTeX / math notation)
  const words = trimmed.match(/\b[a-zA-Z]{3,}\b/g);
  if (words) {
    const mathKeywords = new Set(['lim', 'frac', 'text', 'implies', 'to', 'sin', 'cos', 'tan']);
    const nonMathWords = words.filter((w) => !mathKeywords.has(w.toLowerCase()));
    // If there are 2 or more regular words, it's definitely a prose sentence, not a pure formula block
    if (nonMathWords.length >= 2) {
      return false;
    }
  }

  // Check if it's an algebraic formula or equation
  const hasFormulaChar =
    trimmed.includes('=') ||
    trimmed.startsWith('\\frac') ||
    trimmed.startsWith('\\lim') ||
    trimmed.startsWith('=') ||
    /^[fghFGH]'\([a-zA-Z0-9]+\)/.test(trimmed) ||
    /^[fghFGH]\([a-zA-Z0-9]+\)/.test(trimmed);

  return hasFormulaChar;
}

/**
 * If a text string does not have explicit $ delimiters,
 * automatically detect and wrap math tokens in $...$
 */
export function autoWrapMath(text: string): string {
  if (text.includes('$')) return text;

  let res = text;

  // Specific common calculus patterns:
  // f'(x) = 0, f'(x) > 0, f'(x) < 0, f'(2) = 0, etc.
  res = res.replace(/\b([fgh]'\([a-zA-Z0-9]+\)\s*(?:=|!=|<|>|<=|>=)\s*[-+]?[a-zA-Z0-9]+(?:\^[0-9]+)?(?:\([0-9]+\))?(?:[-+*\/][a-zA-Z0-9]+(?:\^[0-9]+)?(?:\([0-9]+\))?)*)\b/g, '$$$1$$');

  // f'(x), f'(a), f'(1), f'(2), f'
  res = res.replace(/(?<!\$)\b([fgh]'(?:\([a-zA-Z0-9]+\))?)(?!\$)/g, '$$$1$$');

  // f(x), f(b), g(t), h(t), f(0), g(0), g(10)
  res = res.replace(/(?<!\$)\b([fgh]\([a-zA-Z0-9]+\))(?!\$)/g, '$$$1$$');

  // Variable equalities like: x = a, x = 0, x = 1, x = 2, x = 3, x = -1, x = -2, t = 0, t = 10, m = 0, m > 0, m < 0
  res = res.replace(/(?<!\$)\b([a-zA-Z]\s*(?:=|<|>|<=|>=)\s*[-+]?[a-zA-Z0-9]+)(?!\$)/g, '$$$1$$');

  // Isolated variables in context: e.g. " ketika f ", " pada f ", " nilai f "
  res = res.replace(/(\s)\b([fmabxt])\b(\s)/g, '$1$$$2$$$3');

  return res;
}

/**
 * MathText renders mixed text:
 * - Regular words are rendered in standard Teachers font.
 * - Math segments wrapped in $...$ are rendered using MathJaxView in MathJax font.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Ensure math expressions are wrapped with $...$
  const processedText = autoWrapMath(text);

  // Split by $
  const parts = processedText.split('$');

  if (parts.length === 1) {
    return <span className={`font-teachers ${className}`}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Odd indices are math expressions
        if (index % 2 === 1) {
          return (
            <MathJaxView
              key={index}
              math={part}
              inline={true}
              className="text-blue-300 font-medium px-0.5"
            />
          );
        }

        // Even indices are regular text in Teachers font
        return (
          <span key={index} className="font-teachers">
            {part}
          </span>
        );
      })}
    </span>
  );
};

