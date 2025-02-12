import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DoneQuiz = ({ score, questions, handleSubmit }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const correctAnswers = Math.round((score / 100) * questions.length);
  const wrongAnswers = questions.length - correctAnswers;

  const handleScoreSubmit = async () => {
    setIsLoading(true);
    await handleSubmit();
    setTimeout(() => {
      router.push("/leaderboard");
    }, 3000); // Simulating a delay for the loading effect
  };

  return (
    <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Quiz Finished!
        </h2>
        <div className="bg-gray-100 p-6 rounded-xl shadow-inner space-y-4">
          <p className="text-xl text-gray-700">
            Your score: <span className="font-semibold">{score}</span>%
          </p>
          <p className="text-xl text-gray-700">
            Total questions:{" "}
            <span className="font-semibold">{questions.length}</span>
          </p>
          <p className="text-xl text-gray-700">
            Correct answers:{" "}
            <span className="font-semibold">{correctAnswers}</span>
          </p>
          <p className="text-xl text-gray-700">
            Wrong answers: <span className="font-semibold">{wrongAnswers}</span>
          </p>
        </div>
        <button
          onClick={handleScoreSubmit}
          className={`mt-6 w-full py-3 px-6 rounded-lg transition duration-200 ${
            isLoading
              ? "bg-teal-300 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600"
          } text-white`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Score"}
        </button>
        <Link
          href="/"
          className="mt-4 block w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200 text-center"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default DoneQuiz;
