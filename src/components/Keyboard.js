import React from "react";
import "./Keyboard.css";

function Keyboard({ activeKey, errors }) {
  const keys = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="keyboard">
      {keys.map((key) => (
        <div
          key={key}
          className={`key ${key === activeKey ? "active" : ""} ${
            errors.includes(key) ? "error" : ""
          }`}
        >
          {key}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
