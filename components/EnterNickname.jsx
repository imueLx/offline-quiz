import React from "react";
import Link from "next/link";

const EnterNickname = ({
  nickname,
  setNickname,
  difficulty,
  setDifficulty,
  level,
  setLevel,
  handleNicknameSubmit,
}) => {
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Enter Your Nickname
        </h2>
        <p className="text-gray-600 mt-2">
          Please provide a nickname to start the quiz.
        </p>
      </div>
      <label className="block">
        <span className="text-gray-700">Nickname</span>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        />
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Difficulty</span>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        >
          <option value="easy">Easy Mode</option>
          <option value="difficult">Difficult Mode</option>
        </select>
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Choose Set of Questions</span>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
        >
          {difficulty === "easy" ? (
            <>
              <option value="1">Set One</option>
              <option value="2">Set Two</option>
              <option value="3">Set Three</option>
              <option value="4">Set Four</option>
            </>
          ) : (
            <>
              <option value="1">Set One</option>
              <option value="2">Set Two</option>
              <option value="3">Set Three</option>
              <option value="4">Set Four</option>
              <option value="99">Special Set</option>
            </>
          )}
        </select>
      </label>
      <button
        onClick={handleNicknameSubmit}
        className="mt-6 w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition duration-200"
      >
        Start Quiz
      </button>
      <Link
        href="/"
        className="mt-1 block w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200 text-center"
      >
        Go Back
      </Link>
    </div>
  );
};

export default EnterNickname;
