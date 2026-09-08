import React, { useState, useEffect } from 'react';
import { COURSE_CHAPTERS } from './data/courseData';
import { TopBar } from './components/TopBar';
import { BottomFeedbackBar } from './components/BottomFeedbackBar';
import { ExplanationModal } from './components/ExplanationModal';
import { CourseSelectorModal } from './components/CourseSelectorModal';
import { QuestionStepView } from './components/steps/QuestionStepView';
import { TextStepView } from './components/steps/TextStepView';
import { SkillCheckIntroView } from './components/steps/SkillCheckIntroView';
import { LessonCompleteView } from './components/steps/LessonCompleteView';
import { LinearSliderIntroView } from './components/steps/LinearSliderIntroView';
import { playClickSound, playSuccessSound, playErrorSound } from './utils/audio';

export function App() {
  const [activeChapterId, setActiveChapterId] = useState<string>('chapter-1');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);
  const [isCourseMapOpen, setIsCourseMapOpen] = useState<boolean>(false);
  const [userTotalXp, setUserTotalXp] = useState<number>(0);

  const currentChapter =
    COURSE_CHAPTERS.find((c) => c.id === activeChapterId) || COURSE_CHAPTERS[0];
  const steps = currentChapter.steps;
  const currentStep = steps[currentStepIndex] || steps[0];
  const isLastStep = currentStepIndex >= steps.length - 1;

  // Reset step state when chapter or step index changes
  const resetStepState = () => {
    setSelectedOptionId(null);
    setIsChecked(false);
    setIsCorrect(null);
    setIsWhyModalOpen(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (isChecked) return;
    playClickSound();
    setSelectedOptionId(optionId);
  };

  const handleCheck = () => {
    if (!selectedOptionId || isChecked) return;

    const chosenOption = currentStep.options?.find((opt) => opt.id === selectedOptionId);
    const correct = Boolean(chosenOption?.isCorrect);

    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      playSuccessSound();
      setUserTotalXp((prev) => prev + currentStep.xpReward);
    } else {
      playErrorSound();
    }
  };

  const handleContinue = () => {
    playClickSound();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      resetStepState();
    } else {
      // Reached the end of chapter
      resetStepState();
    }
  };

  const handleTryAgain = () => {
    playClickSound();
    setIsChecked(false);
    setIsCorrect(null);
    setSelectedOptionId(null);
  };

  const handleSeeAnswer = () => {
    playClickSound();
    if (currentStep.correctOptionId) {
      setSelectedOptionId(currentStep.correctOptionId);
      setIsChecked(true);
      setIsCorrect(false);
      setIsWhyModalOpen(true);
    }
  };

  const handleRestartChapter = () => {
    playClickSound();
    setCurrentStepIndex(0);
    resetStepState();
  };

  const handleNextChapter = () => {
    playClickSound();
    const currentIndex = COURSE_CHAPTERS.findIndex((c) => c.id === activeChapterId);
    if (currentIndex < COURSE_CHAPTERS.length - 1) {
      const nextChapter = COURSE_CHAPTERS[currentIndex + 1];
      setActiveChapterId(nextChapter.id);
      setCurrentStepIndex(0);
      resetStepState();
    }
  };

  const handleSelectChapterFromMap = (chapterId: string) => {
    playClickSound();
    setActiveChapterId(chapterId);
    setCurrentStepIndex(0);
    resetStepState();
  };

  const isQuestionType =
    currentStep.type !== 'text' &&
    currentStep.type !== 'skill_check_intro' &&
    currentStep.type !== 'lesson_complete';

  const isIntroType = currentStep.type === 'linear_slider_intro';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-neutral-950 font-sans">
      {/* Top Header */}
      <TopBar
        currentStepIndex={currentStepIndex}
        totalSteps={steps.length}
        totalXp={userTotalXp}
        chapterTitle={currentChapter.title}
        onOpenCourseMap={() => setIsCourseMapOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-6 overflow-y-auto max-w-5xl mx-auto w-full">
        {/* Step Type 1: Lesson Completed */}
        {currentStep.type === 'lesson_complete' && (
          <LessonCompleteView
            chapterTitle={currentChapter.title}
            totalXp={currentChapter.totalXp}
            onRestart={handleRestartChapter}
            onNextChapter={handleNextChapter}
            hasNextChapter={
              COURSE_CHAPTERS.findIndex((c) => c.id === activeChapterId) <
              COURSE_CHAPTERS.length - 1
            }
          />
        )}

        {/* Step Type 2: Skill Check Intro */}
        {currentStep.type === 'skill_check_intro' && (
          <SkillCheckIntroView step={currentStep} onContinue={handleContinue} />
        )}

        {/* Step Type 3: Pure Text / Concept Step */}
        {currentStep.type === 'text' && (
          <TextStepView step={currentStep} onContinue={handleContinue} />
        )}

        {/* Step Type 4: Interactive Slider Intro (Desktop: text left, graph right) */}
        {isIntroType && (
          <LinearSliderIntroView
            step={currentStep}
            onContinue={handleContinue}
          />
        )}

        {/* Step Type 5: Question Step with Multiple Choice & Feedback */}
        {isQuestionType && !isIntroType && (
          <QuestionStepView
            step={currentStep}
            selectedOptionId={selectedOptionId}
            isChecked={isChecked}
            onSelectOption={handleSelectOption}
          />
        )}
      </main>

      {/* Bottom Feedback Bar for interactive questions */}
      {isQuestionType && !isIntroType && (
        <BottomFeedbackBar
          isChecked={isChecked}
          isCorrect={isCorrect}
          selectedOptionId={selectedOptionId}
          isLastStep={isLastStep}
          onCheck={handleCheck}
          onContinue={handleContinue}
          onTryAgain={handleTryAgain}
          onSeeAnswer={handleSeeAnswer}
          onOpenWhyModal={() => setIsWhyModalOpen(true)}
        />
      )}

      {/* Explanation "Mengapa?" Modal */}
      <ExplanationModal
        isOpen={isWhyModalOpen}
        explanation={currentStep.explanation}
        onClose={() => setIsWhyModalOpen(false)}
        onContinue={() => {
          setIsWhyModalOpen(false);
        }}
      />

      {/* Course Map & Chapter Switcher Modal */}
      <CourseSelectorModal
        isOpen={isCourseMapOpen}
        activeChapterId={activeChapterId}
        onSelectChapter={handleSelectChapterFromMap}
        onClose={() => setIsCourseMapOpen(false)}
      />
    </div>
  );
}

export default App;
