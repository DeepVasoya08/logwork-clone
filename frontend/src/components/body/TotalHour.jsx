import React from "react";

const TotalHour = ({ time }) => {
  return (
    <>
      <span className="text-3xl font-bold">
        {("0" + Math.floor((time / 3.6e6) % 60)).slice(-2)}:
      </span>
      <span className="text-3xl font-bold">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="text-3xl font-bold">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    </>
  );
};

export default TotalHour;
