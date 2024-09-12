import React, { FC } from "react";

interface InputProps {
  label: string;
  type: "text" | "number" | "password";
}

const FACInput: FC<InputProps> = ({ label, type }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} />
    </div>
  );
};

export default FACInput;
