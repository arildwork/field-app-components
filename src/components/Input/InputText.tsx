import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import React, { FC, ReactNode } from "react";
import { InputText, InputTextProps } from "primereact/inputtext";
import { v4 } from "uuid";
import { classNames } from "primereact/utils";
import styles from "./Input.module.scss";

export type FACInputTextProps = {
  inputLabel?: string;
  inputPlaceholder?: string;
  inputIcon?: ReactNode;
  inputClassname?: string;
  error?: string;
  touched?: boolean;
} & InputTextProps;

const FACInputText: FC<FACInputTextProps> = ({
  value,
  onChange,
  inputLabel,
  inputPlaceholder,
  inputIcon,
  inputClassname,
  required,
  error,
  touched,
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
          {required ? `${inputLabel} *` : inputLabel}
        </label>
      )}
      <div
        className={classNames(styles["input-wrapper"], {
          [styles["input-error"]]: error || touched,
        })}
      >
        <InputText
          className={classNames(inputClassname)}
          id={uniqueID}
          placeholder={inputPlaceholder}
          value={value}
          onChange={onChange}
          required={required}
          {...rest}
        />
        {error || touched ? (
          <ValidationImage />
        ) : (
          inputIcon && <div className={styles.icon}>{inputIcon}</div>
        )}
        {error || touched ? <ValidationText text={error ? error : ""} /> : null}
      </div>
    </div>
  );
};

export default FACInputText;
