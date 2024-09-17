import React, { FC } from "react";
import styles from "./Input.module.scss";

export type InputProps = {
  label: string;
  type: "text" | "number" | "password";
};

const FACInput: FC<InputProps> = ({ label, type }) => {
  return (
    <div className={styles.background}>
      <label>{label}</label>
      <input type={type} />
    </div>
  );
};

export default FACInput;
