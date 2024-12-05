import React, { FC } from "react";
import styles from "./Time.module.scss";
import { PrimeIcons } from "primereact/api";
import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import { classNames } from "primereact/utils";

export type FACTimeProps = {
  value: string;
  labelText: string;
  onDateClick: (date: string) => void;
  date?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
};

const FACTime: FC<FACTimeProps> = ({
  value,
  labelText,
  onDateClick,
  date,
  error,
  touched,
  required,
}) => {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    const [hours, minutes] = timeValue.split(":");

    if (timeValue) {
      const now = date ? new Date(date) : new Date();
      now.setHours(Number(hours), Number(minutes), 0, 0);
      onDateClick(now.toISOString());
    }
  };

  const formattedTime = value
    ? new Date(value).toISOString().slice(11, 16)
    : "";

  return (
    <div className={styles.time}>
      {labelText && <label>{required ? `${labelText} *` : labelText}</label>}
      <div
        className={classNames(styles["time-wrapper"], {
          [styles["error-time"]]: error && touched,
        })}
      >
        <input
          type="time"
          className={styles["time-input"]}
          value={formattedTime}
          onChange={handleTimeChange}
        />
        <div className={styles["time-icon"]}>
          <i className={PrimeIcons.CLOCK} />
        </div>
        {error && touched ? <ValidationImage fieldWithIcon /> : null}
      </div>
      {error && touched ? <ValidationText text={error} /> : null}
    </div>
  );
};

export default FACTime;
