import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import { ChangeEvent, FC, ReactNode, useRef } from "react";
import { v4 } from "uuid";
import { classNames } from "primereact/utils";
import styles from "./Input.module.scss";
import {
  InputNumber,
  InputNumberChangeEvent,
  InputNumberProps,
} from "primereact/inputnumber";
import { PrimeIcons } from "primereact/api";

export type FACInputNumberProps = {
  inputLabel?: string;
  inputPlaceholder?: string;
  inputIcon?: ReactNode;
  inputClassname?: string;
  error?: string;
  touched?: boolean;
  allowClear?: boolean;
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
  allowClear = false,
  ...rest
}) => {
  const uniqueID = useRef(v4());
  const hasError = error && touched;

  const handleClearInput = () => {
    if (onChange) {
      onChange({
        value: null,
      } as InputNumberChangeEvent);
    }
  };

  return (
    <div
      className={classNames(styles.input, {
        [styles["input-icon"]]: inputIcon,
      })}
    >
      {inputLabel && (
        <label htmlFor={uniqueID.current}>
          {required ? `${inputLabel} *` : inputLabel}
        </label>
      )}
      <div
        className={classNames(styles["input-wrapper"], {
          [styles["input-error"]]: error && touched,
        })}
      >
        <InputNumber
          className={classNames(inputClassname)}
          id={uniqueID.current}
          placeholder={inputPlaceholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {allowClear && value !== null && value !== undefined && (
          <button
            type="button"
            className={styles["clear-button"]}
            onClick={handleClearInput}
          >
            <i className={PrimeIcons.TIMES}></i>
          </button>
        )}
        {hasError ? (
          <ValidationImage fieldWithIcon />
        ) : (
          inputIcon && <div className={styles.icon}>{inputIcon}</div>
        )}
        {hasError ? <ValidationText text={error ? error : ""} /> : null}
      </div>
    </div>
  );
};

export default FACInputNumber;
