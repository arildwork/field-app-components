import React, { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const FACButton: FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default FACButton;
