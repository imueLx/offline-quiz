"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaCheck,
  FaTimes,
  FaRedo,
  FaArrowRight,
  FaArrowLeft,
  FaHeart,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HardQuiz = ({ questions, onFinish, setNumber, mode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [toastShown, setToastShown] = useState(false);
  const timerRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (answers[currentQuestionIndex]) {
      const { selectedAnswer, showExplanation, correctAnswer, wrongAnswer } =
        answers[currentQuestionIndex];
      setSelectedAnswer(selectedAnswer);
      setShowExplanation(showExplanation);
      setCorrectAnswer(correctAnswer);
      setWrongAnswer(wrongAnswer);
    } else {
      setSelectedAnswer(null);
      setShowExplanation(false);
      setCorrectAnswer(null);
      setWrongAnswer(null);
    }

    setTimeLeft(30);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleCheckAnswer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    const isCorrect = selectedAnswer === currentQuestion.answer;
    setShowExplanation(true);
    setCorrectAnswer(currentQuestion.answer);
    setWrongAnswer(isCorrect ? null : selectedAnswer);

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      selectedAnswer,
      showExplanation: true,
      correctAnswer: currentQuestion.answer,
      wrongAnswer: isCorrect ? null : selectedAnswer,
    };
    setAnswers(newAnswers);

    if (!isCorrect) {
      setLives((prevLives) => {
        if (prevLives === 1 && !toastShown) {
          setToastShown(true);
          // Use a timeout to delay the toast error and handleRestart call
          setTimeout(() => {
            toast.error("You have run out of attempts!", {
              position: "top-center",
              autoClose: true,
              closeOnClick: true,
              draggable: false,
              onClose: handleRestart,
            });
          }, 0);
        }
        return prevLives - 1;
      });
    }

    clearInterval(timerRef.current);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    const score = calculateScore();
    onFinish(score);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswer(null);
    setWrongAnswer(null);
    setAnswers([]);
    setLives(3);
    setTimeLeft(30);
    setToastShown(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleCheckAnswer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswer(null);
    setWrongAnswer(null);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = null;
    setAnswers(newAnswers);
    setTimeLeft(30);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleCheckAnswer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const calculateScore = () => {
    return answers.reduce((acc, answer, index) => {
      if (answer && answer.selectedAnswer === questions[index].answer) {
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
    <div className="relative max-w-4xl w-full bg-gray-100 rounded-lg shadow-lg p-6 sm:py-8 sm:px-12 space-y-6 overflow-y-auto max-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-700">
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div className="text-lg font-semibold text-gray-700">
          {setDisplayName}
        </div>
        <div className="text-lg font-semibold text-gray-700">
          Mode: {modeDisplayName}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-700">
          Time Left: {timeLeft}s
        </div>
        <div className="flex items-center">
          {Array.from({ length: lives }).map((_, index) => (
            <FaHeart key={index} className="text-red-500 mr-1" />
          ))}
        </div>
      </div>
      <div className="text-gray-900 text-xl font-medium mb-4">
        {currentQuestion.question}
      </div>
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer && showExplanation;
          const isWrong =
            option === selectedAnswer &&
            selectedAnswer !== correctAnswer &&
            showExplanation;

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={`block w-full p-3 text-left rounded-md border transition duration-200 ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              } ${
                isCorrect
                  ? "bg-green-500 text-white"
                  : isWrong
                  ? "bg-red-500 text-white"
                  : ""
              }`}
              disabled={showExplanation}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <div className="bg-gray-200 p-4 rounded-md text-gray-900">
          <p className="mb-2">
            {selectedAnswer === currentQuestion.answer ? (
              <span className="text-green-500 flex items-center">
                <FaCheck className="mr-2" />
                Correct! Well done.
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <FaTimes className="mr-2" />
                Wrong.
              </span>
            )}
            {selectedAnswer !== currentQuestion.answer && (
              <span className="text-gray-900 ml-2">
                The correct answer is: {currentQuestion.answer}
              </span>
            )}
          </p>
          <p className="text-gray-700 font-medium">Explanation:</p>
          <p className="text-gray-700">{currentQuestion.rationale}</p>
        </div>
      )}
      <div className="flex justify-between mt-4 space-x-4 items-center">
        <button
          onClick={handlePreviousQuestion}
          className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
          disabled={currentQuestionIndex === 0}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="flex space-x-4">
          {showExplanation && selectedAnswer !== currentQuestion.answer ? (
            <button
              onClick={handleTryAgain}
              className="flex items-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
            >
              Try Again <FaRedo className="ml-2" />
            </button>
          ) : showExplanation && selectedAnswer === currentQuestion.answer ? (
            <button
              onClick={handleNextQuestion}
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next <FaArrowRight className="ml-2" />
                </>
              ) : (
                "Finish"
              )}
            </button>
          ) : (
            <button
              onClick={handleCheckAnswer}
              className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              disabled={selectedAnswer === null}
            >
              Check Answer <FaCheck className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HardQuiz;
