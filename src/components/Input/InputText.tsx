import React, { FC, ReactNode } from "react";
import { InputText, InputTextProps } from "primereact/inputtext";
import { v4 } from "uuid";
import { classNames } from "primereact/utils";
import styles from "./Input.module.scss";

export type FACInputTextProps = {
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: string | null | undefined;
  inputAction?: (e: InputTextProps) => void;
  inputIcon?: ReactNode;
  inputClassname?: string;
} & InputTextProps;

const FACInputText: FC<FACInputTextProps> = ({
  inputLabel,
  inputPlaceholder,
  inputValue,
  inputAction,
  inputIcon,
  inputClassname,
  required,
  ...rest
}) => {
  const uniqueID = v4();

  return (
    <div
      className={classNames(styles.input, {
        [styles["input-icon"]]: inputIcon,
      })}
    >
      {inputLabel && (
        <label htmlFor={uniqueID}>
          {required ? `${inputLabel}*` : inputLabel}
        </label>
      )}
      <InputText
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

export default FACInputText;
