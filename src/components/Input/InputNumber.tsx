import React, { FC, ReactNode } from "react";
import { v4 } from "uuid";
import { classNames } from "primereact/utils";
import styles from "./Input.module.scss";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";

export type FACInputNumberProps = {
  inputLabel?: string;
  inputPlaceholder?: string;
  inputIcon?: ReactNode;
  inputClassname?: string;
} & InputNumberProps;

const FACInputNumber: FC<FACInputNumberProps> = ({
  value,
  onChange,
  inputLabel,
  inputPlaceholder,
  inputIcon,
  inputClassname,
  ...rest
}) => {
  const uniqueID = v4();

  return (
    <div
      className={classNames(styles.input, {
        [styles["input-icon"]]: inputIcon,
      })}
    >
      {inputLabel && <label htmlFor={uniqueID}>{inputLabel}</label>}
      <InputNumber
        className={classNames(inputClassname)}
        id={uniqueID}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {inputIcon && <div className={styles.icon}>{inputIcon}</div>}
    </div>
  );
};

export default FACInputNumber;
