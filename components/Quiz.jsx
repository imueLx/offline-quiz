"use client";

import { useState, useEffect } from "react";
import { FaLightbulb, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Quiz = ({ questions, onFinish, setNumber, mode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(60); // 60 seconds for each question
  const [checked, setChecked] = useState(false); // State to track if the answer has been checked

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleNextQuestion = () => {
    setTimer(60);
    setChecked(false); // Reset checked state
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimer(60);
      setChecked(false); // Reset checked state
    }
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleCheckAnswer = () => {
    setChecked(true);
  };

  const handleFinish = () => {
    const score = calculateScore();
    onFinish(score);
  };

  const calculateScore = () => {
    return questions.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  // Convert setNumber to human-readable format
  const setDisplayName =
    setNumber === "1" || setNumber === 1
      ? "Set One"
      : setNumber === "2"
      ? "Set Two"
      : setNumber === "3"
      ? "Set Three"
      : setNumber === "4"
      ? "Set Four"
      : setNumber === "99"
      ? "Special Set"
      : `Set ${setNumber}`;
  const modeDisplayName = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <div className="relative max-w-4xl w-full bg-white rounded-lg shadow-md p-6 sm:py-8 sm:px-12 space-y-4 overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div className="text-lg font-semibold text-gray-800">
          Time left: {timer}s
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">
          {setDisplayName}
        </div>
        <div className="text-lg font-semibold text-gray-800">
          Mode: {modeDisplayName}
        </div>
      </div>
      <div className="text-gray-900 text-xl font-medium mb-4">
        {currentQuestion.question}
      </div>
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrectAnswer = option === currentQuestion.answer;
          const isSelectedAnswer =
            selectedAnswers[currentQuestionIndex] === option;
          const isChecked = checked;

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={`block w-full p-3 text-left rounded-md border transition duration-200 ${
                isChecked && isSelectedAnswer && !isCorrectAnswer
                  ? "bg-red-500 text-white"
                  : isChecked && isCorrectAnswer
                  ? "bg-green-500 text-white"
                  : isSelectedAnswer
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
              disabled={isChecked}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between mt-4 space-x-4 items-center">
        <button
          onClick={handlePreviousQuestion}
          className="flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
          disabled={currentQuestionIndex === 0}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="flex items-center">
          <button
            onClick={handleCheckAnswer}
            className="text-yellow-500 hover:text-yellow-600 transition duration-200"
            disabled={checked}
          >
            <FaLightbulb size={24} />
          </button>
        </div>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
