import React, { FC } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = {
  label: string;
  onClick: () => void;
};

const FACButton: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default FACButton;
