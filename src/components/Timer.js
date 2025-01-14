// Timer component to handle countdown or stopwatch functionality
import React, { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft]);

  return <div className="timer">Time Left: {timeLeft}s</div>;
};

export default Timer;
