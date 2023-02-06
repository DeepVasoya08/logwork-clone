import React, { useState } from "react";
import "./Timer.css";

export default function Timer({ time }) {
  return (
    <div className="timer">
        <span className="digits">
        {("0" + Math.floor((time / 3.6e+6) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
}
