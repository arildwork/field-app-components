import React, { FC, ReactNode } from "react";
import { v4 } from "uuid";
import { classNames } from "primereact/utils";
import styles from "./Input.module.scss";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";

export type FACInputNumberProps = {
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: number | null | undefined;
  inputAction?: (e: InputNumberProps) => void;
  inputIcon?: ReactNode;
  inputClassname?: string;
} & InputNumberProps;

const FACInputNumber: FC<FACInputNumberProps> = ({
  inputLabel,
  inputPlaceholder,
  inputValue,
  inputAction,
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
        value={inputValue}
        onChange={inputAction}
        {...rest}
      />
      {inputIcon && <div className={styles.icon}>{inputIcon}</div>}
    </div>
  );
};

export default FACInputNumber;
