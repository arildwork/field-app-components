import { FACInputProps } from "./InputNumber";
import React, { FC } from "react";
import { InputText } from "primereact/inputtext";
import { v4 } from "uuid";
import { classNames } from "primereact/utils";
import styles from "./Input.module.scss";

const FACInputText: FC<FACInputProps> = ({
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
