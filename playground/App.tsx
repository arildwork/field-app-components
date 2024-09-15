import React from "react";
import FACButton from "../src/components/Button/Button";
import FACInput from "../src/components/Input/Input";

function App() {
  return (
    <div>
      <h1>Field App Components Playground</h1>
      <FACButton label="Click Me" onClick={() => alert("Button Clicked!")} />
      <FACInput label='test input' type="password" />
    </div>
  );
}

export default App;
