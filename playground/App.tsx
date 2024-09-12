import React from "react";
import FACButton from "../src/components/Button/Button";

function App() {
  return (
    <div>
      <h1>Field App Components Playground</h1>
      <FACButton label="Click Me" onClick={() => alert("Button Clicked!")} />
    </div>
  );
}

export default App;
