import React, { FC } from "react";
import { Calendar, CalendarBaseProps } from "primereact/calendar";
import moment from "@/config/MomentConfig";
import styles from "./Calendar.module.scss";
import { PrimeIcons } from "primereact/api";
import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import { classNames } from "primereact/utils";

export type FACCalendarProps = {
  value: string | null;
  labelText: string;
  onDateClick: (date: string) => void;
  language: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
} & CalendarBaseProps;

const FACCalendar: FC<FACCalendarProps> = ({
  value,
  labelText,
  onDateClick,
  language,
  error,
  touched,
  minDate,
  maxDate,
  required,
  ...rest
}) => {
  return (
    <div className={styles.calendar}>
      {labelText && <label>{required ? `${labelText} *` : labelText}</label>}
      <div
        className={classNames(styles["calendar-wrapper"], {
          [styles["error-calendar"]]: error && touched,
        })}
      >
        <Calendar
          className={styles["calendar-input"]}
          value={value ? moment(value).toDate() : null}
          onChange={(e) => onDateClick(moment(e.value).toISOString())}
          locale={language}
          dateFormat="dd.mm.yy"
          showButtonBar
          minDate={minDate}
          maxDate={maxDate}
          {...rest}
        />
        <div className={styles["calendar-icon"]}>
          <i className={PrimeIcons.CALENDAR} />
        </div>
        {error && touched ? <ValidationImage fieldWithIcon /> : null}
      </div>
      {error && touched ? <ValidationText text={error} /> : null}
    </div>
  );
};

export default FACCalendar;
