import type { CalendarProps } from "primereact/calendar";
import { Calendar as PRCalendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import type { FC, JSX } from "react";
import styles from "./Calendar.module.scss";

const HelperCalendar: FC<CalendarProps> = ({
  className,
  pt,
  ...props
}): JSX.Element => (
  <PRCalendar
    {...props}
    pt={{
      root: {
        className: classNames(styles.calendar, className),
      },
      input: { root: { className: styles.input } },
      dropdownButton: { root: { className: styles["dropdown-button"] } },
      dayLabel: { className: styles["day-label"] },
      ...pt,
    }}
  />
);

export default HelperCalendar;
