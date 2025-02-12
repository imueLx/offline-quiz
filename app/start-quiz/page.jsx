"use client";
import { Suspense, useEffect, useState, useRef } from "react";

import { AiOutlineLoading3Quarters, AiOutlineReload } from "react-icons/ai";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoneQuiz from "../../components/DoneQuiz";
import EnterNickname from "../../components/EnterNickname";
import HardQuiz from "../../components/HardQuiz";
import Quiz from "../../components/Quiz";

import { fetchQuestionsFromIDB } from "../../utils/indexedDB";

const StartQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState("1");
  const [difficulty, setDifficulty] = useState("easy");
  const [isNicknameEntered, setIsNicknameEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  // Fetch questions when quiz starts
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const filteredQuestions = await fetchQuestionsFromIDB(
          difficulty,
          level
        );

        if (filteredQuestions.length > 0) {
          setQuestions(filteredQuestions);
        } else {
          console.error(
            `No questions found for difficulty "${difficulty}" and level "${level}"`
          );
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isQuizStarted) {
      fetchQuestions();
    }
  }, [isQuizStarted, difficulty, level]);

  useEffect(() => {
    if (isQuizStarted) {
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isQuizStarted]);

  const handleFinish = (finalScore) => {
    const scorePercentage = Math.round((finalScore / questions.length) * 100);
    setScore(scorePercentage);
    setIsQuizFinished(true);
    toast.success("Congratulations! You've finished the quiz!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await submitScore({ nickname, score, difficulty });
      if (response.errMsg) {
        throw new Error(response.errMsg);
      }
      console.log("Score submitted successfully:", response.message);
      toast.success("Score submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error submitting score:", error);
      toast.error("Error submitting score. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      setIsNicknameEntered(true);
      setIsQuizStarted(true);
    } else {
      toast.error("Please enter a nickname", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleRestart = () => {
    toast.info(
      <div>
        Are you sure you want to restart the quiz?
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => {
              toast.dismiss();
              toast.info("Restarting quiz...", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000); // 3 seconds delay before restarting
            }}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              padding: "5px 10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen h-full overflow-auto py-16 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <audio ref={audioRef} src="/background-music-quiz.mp3" loop />
      {isQuizStarted && (
        <div>
          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="absolute top-4 left-4 text-white text-2xl bg-gray-700 p-2 rounded-full hover:bg-gray-700"
          >
            <AiOutlineReload />
          </button>

          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      )}
      <div className="w-full flex-grow flex flex-col items-center justify-center">
        {isNicknameEntered ? (
          loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <p className="text-xl font-semibold text-gray-800">
                  {level === "99"
                    ? "Loading Special Set Questions..."
                    : `Loading Set ${level} Questions...`}
                </p>
                <div className="mt-4 animate-spin text-4xl text-gray-900">
                  <AiOutlineLoading3Quarters />
                </div>
              </div>
            </div>
          ) : questions.length > 0 ? (
            isQuizFinished ? (
              <DoneQuiz
                score={score}
                questions={questions}
                handleSubmit={handleSubmit}
              />
            ) : (
              <Suspense fallback={<div>Loading Set {level} Questions...</div>}>
                {difficulty === "easy" ? (
                  <Quiz
                    questions={questions}
                    setNumber={level}
                    mode={difficulty}
                    onFinish={handleFinish}
                  />
                ) : (
                  <HardQuiz
                    questions={questions}
                    setNumber={level}
                    mode={difficulty}
                    onFinish={handleFinish}
                  />
                )}
              </Suspense>
            )
          ) : (
            <div>No questions available.</div>
          )
        ) : (
          <EnterNickname
            nickname={nickname}
            setNickname={setNickname}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            level={level}
            setLevel={setLevel}
            handleNicknameSubmit={handleNicknameSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default StartQuiz;
