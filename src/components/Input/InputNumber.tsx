import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
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
  error?: string;
  touched?: boolean;
} & InputNumberProps;

const FACInputNumber: FC<FACInputNumberProps> = ({
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
        <InputNumber
          className={classNames(inputClassname)}
          id={uniqueID}
          placeholder={inputPlaceholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {error || touched ? (
          <ValidationImage fieldWithIcon />
        ) : (
          inputIcon && <div className={styles.icon}>{inputIcon}</div>
        )}
        {error || touched ? <ValidationText text={error ? error : ""} /> : null}
      </div>
    </div>
  );
};

export default FACInputNumber;
