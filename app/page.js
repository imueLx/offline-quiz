"use client";

import Hero from "../components/Hero";
import questions from "../data/questions.json";
import hardQuestions from "../data/hardquestions.json";
import { useEffect } from "react";
import { saveQuestionsToIDB } from "../utils/indexedDB";

const Home = () => {
  useEffect(() => {
    // Preload questions to IndexedDB
    const preloadQuestions = async () => {
      try {
        await saveQuestionsToIDB(questions, "easy");
        await saveQuestionsToIDB(hardQuestions, "hard");
        console.log("Questions preloaded into IndexedDB.");
      } catch (error) {
        console.error("Error preloading questions to IndexedDB:", error);
      }
    };

    preloadQuestions();
  }, []);

  return (
    <>
      <Hero />
    </>
  );
};

export default Home;
