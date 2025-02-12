import { useEffect } from "react";
import { openDB } from "idb";

export default function OfflineQuestions() {
  useEffect(() => {
    const fetchAndStoreData = async () => {
      try {
        // Open or create IndexedDB
        const db = await openDB("QuestionsDB", 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("questions")) {
              db.createObjectStore("questions", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("hardquestions")) {
              db.createObjectStore("hardquestions", { keyPath: "id" });
            }
          },
        });

        // Fetch easy questions (questions.json)
        const easyResponse = await fetch("/questions.json");
        const easyData = await easyResponse.json();

        // Store easy questions in IndexedDB
        const easyTx = db.transaction("questions", "readwrite");
        const easyStore = easyTx.objectStore("questions");
        await easyStore.clear();
        easyData.forEach((item) => easyStore.put(item));
        await easyTx.done;

        // Fetch hard questions (hardquestions.json)
        const hardResponse = await fetch("/hardquestions.json");
        const hardData = await hardResponse.json();

        // Store hard questions in IndexedDB
        const hardTx = db.transaction("hardquestions", "readwrite");
        const hardStore = hardTx.objectStore("hardquestions");
        await hardStore.clear();
        hardData.forEach((item) => hardStore.put(item));
        await hardTx.done;

        console.log("Easy and hard questions successfully stored in IndexedDB");
      } catch (error) {
        console.error("Error fetching or storing data:", error);
      }
    };

    fetchAndStoreData();
  }, []);

  return <h1>Questions will be stored offline in IndexedDB!</h1>;
}
