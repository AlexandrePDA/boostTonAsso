"use client";
import React from "react";

const MinimalTest = () => {
  const handleClick = () => {
    console.log("Button clicked!");
    alert("Button clicked!");
  };

  return (
    <div>
      <p>Test the button:</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default MinimalTest;
