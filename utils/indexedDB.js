import { openDB } from "idb";

const DB_NAME = "quizDB";
const EASY_STORE_NAME = "easy-questions";
const HARD_STORE_NAME = "hard-questions";

// Initialize IndexedDB with separate stores for easy and hard questions
export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(EASY_STORE_NAME)) {
        db.createObjectStore(EASY_STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(HARD_STORE_NAME)) {
        db.createObjectStore(HARD_STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Save questions to IndexedDB (store them based on mode)
export const saveQuestionsToIDB = async (questions, mode) => {
  try {
    const db = await initDB();
    const storeName = mode === "difficult" ? HARD_STORE_NAME : EASY_STORE_NAME;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    // Clear old questions to avoid duplicates
    await store.clear();
    questions.forEach((question) => store.put(question));
    await tx.done;

    console.log(
      `Questions for mode "${mode}" saved to ${storeName} successfully.`
    );
  } catch (error) {
    console.error("Error saving questions to IndexedDB:", error);
  }
};

// Fetch questions from IndexedDB (mode-specific, with optional level filtering)
export const fetchQuestionsFromIDB = async (mode, level = null) => {
  try {
    const db = await initDB();
    const storeName = mode === "difficult" ? HARD_STORE_NAME : EASY_STORE_NAME;
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);

    // Fetch all questions
    const allQuestions = await store.getAll();

    // If a level is specified, filter by level
    if (level) {
      const filteredQuestions = allQuestions.filter((q) => q.level === level);
      return filteredQuestions;
    }

    // Return all questions if no level is provided
    return allQuestions;
  } catch (error) {
    console.error("Error fetching questions from IndexedDB:", error);
    return [];
  }
};
