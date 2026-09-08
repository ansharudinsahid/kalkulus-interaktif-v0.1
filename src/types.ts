export type StepType = 
  | 'text'
  | 'linear_slider_intro'
  | 'question_linear_slope'
  | 'parabola_tangent_question'
  | 'derivative_graph_question'
  | 'highest_point_tangent_question'
  | 'basketball_toss_question'
  | 'polynomial_roots_question'
  | 'critical_points_intro_question'
  | 'extrema_count_question'
  | 'factored_derivative_question'
  | 'skill_check_intro'
  | 'skill_check_inverted_curve'
  | 'skill_check_single_peak'
  | 'skill_check_two_factors'
  | 'html_linear_rate_question'
  | 'lesson_complete';

export interface OptionItem {
  id: string;
  label: string;
  isCorrect: boolean;
  explanationNote?: string;
}

export interface ExplanationData {
  title: string;
  text: string;
  formula?: string;
  graphType?: 'linear' | 'parabola' | 'polynomial' | 'extrema' | 'html_rate' | 'basketball';
  graphParams?: Record<string, any>;
  steps?: string[];
}

export interface StepData {
  id: string;
  type: StepType;
  title?: string;
  subtitle?: string;
  content?: string[];
  mathFormulas?: string[];
  question?: string;
  options?: OptionItem[];
  correctOptionId?: string;
  explanation: ExplanationData;
  xpReward: number;
  initialSliderValue?: number;
  tags?: string[];
}

export interface LessonChapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  totalXp: number;
  steps: StepData[];
}
