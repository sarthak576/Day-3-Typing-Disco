import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Keyboard from "./components/Keyboard";
import "./App.css";

const passages = {
  easy: ["apple", "banana", "cat", "dog", "egg"],
  medium: [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests are a fun way to measure your speed.",
  ],
  hard: [
    "React is a JavaScript library for building user interfaces.",
    "Advanced applications require structured designs and dynamic updates.",
  ],
};

function App() {
  const [selectedPassage, setSelectedPassage] = useState("");
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [difficulty, setDifficulty] = useState("medium");
  const [errors, setErrors] = useState([]); // Initialize errors as an array
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [goalWPM, setGoalWPM] = useState(50);
  const [streak, setStreak] = useState(0);

  // Select a random passage based on difficulty
  useEffect(() => {
    const randomPassage =
      passages[difficulty][Math.floor(Math.random() * passages[difficulty].length)];
    setSelectedPassage(randomPassage);
  }, [difficulty]);

  // Calculate Words Per Minute (WPM)
  const calculateWPM = () => {
    const wordsTyped = typedText.trim().split(" ").filter(Boolean).length;
    setWpm(((wordsTyped / (60 - timeLeft)) * 60).toFixed(2));
  };

  // Handle user typing input
  const handleTextChange = (e) => {
    const input = e.target.value;
    setTypedText(input);

    const errorIndices = [];
    input.split("").forEach((char, idx) => {
      if (char !== selectedPassage[idx]) errorIndices.push(idx); // Track indices of errors
    });

    setErrors(errorIndices); // Update errors state with indices
    setAccuracy(((input.length - errorIndices.length) / input.length) * 100 || 100);
    calculateWPM();
  };

  // Track streak based on WPM goal
  useEffect(() => {
    if (wpm >= goalWPM) setStreak((prev) => prev + 1);
  }, [wpm]);

  // Restart the test
  const restartTest = () => {
    setTypedText("");
    setTimeLeft(60);
    setErrors([]);
    setAccuracy(100);
    setWpm(0);
    const randomPassage =
      passages[difficulty][Math.floor(Math.random() * passages[difficulty].length)];
    setSelectedPassage(randomPassage);
  };

  return (
    <div className="App">
      <h1>Advanced Typing Test</h1>
      <div className="difficulty-selector">
        <label>Select Difficulty: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="goal-setting">
        <label>Set WPM Goal: </label>
        <input
          type="number"
          value={goalWPM}
          onChange={(e) => setGoalWPM(Number(e.target.value))}
        /> 
      </div>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <div className="passage">
        {selectedPassage.split("").map((char, idx) => (
          <span
            key={idx}
            className={
              idx < typedText.length
                ? typedText[idx] === char
                  ? "correct"
                  : "incorrect"
                : ""
            }
          >
            {char}
          </span>
        ))}
      </div>
      <textarea
        value={typedText}
        onChange={handleTextChange}
        placeholder="Start typing here..."
      ></textarea>
      <Keyboard activeKey={typedText.slice(-1)} errors={errors} />
      <div className="metrics">
        <p>Speed: {wpm} WPM</p>
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
        <p>Errors: {errors.length}</p>
      </div>
      {streak >= 5 && <div className="badge">🏆 You're on fire! Streak: {streak}</div>}
      <button onClick={restartTest} className="restart-button">
        Restart Test
      </button>
    </div>
  );
}

export default App;
