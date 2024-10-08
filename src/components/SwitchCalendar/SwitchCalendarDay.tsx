import moment from "moment";
import { classNames } from "primereact/utils";
import type { FC, JSX } from "react";
import styles from "./SwitchCalendar.module.scss";

export type ScrollableCalendarDayProps = {
  currentDate: string;
  isActive: boolean;
  isToday: boolean;
  isDisabled: boolean;
  handleDateClick: (date: string) => void;
  handleDisableDateClick: () => void;
  language: string;
};

const SwitchCalendarDay: FC<ScrollableCalendarDayProps> = ({
  currentDate,
  isActive,
  isToday,
  isDisabled,
  handleDateClick,
  handleDisableDateClick,
  language,
}): JSX.Element => {
  return (
    <div className={classNames(styles.day)}>
      <div className={styles.name}>
        {moment(currentDate).locale(language).format("ddd")}
      </div>
      {!isDisabled ? (
        <div
          className={classNames(
            styles.date,
            isActive && styles.active,
            isToday && styles.today
          )}
          onClick={() => handleDateClick(currentDate)}
        >
          {moment(currentDate).format("D")}
        </div>
      ) : (
        <div
          className={classNames(styles.date, styles["date-disabled"])}
          onClick={handleDisableDateClick}
        >
          {moment(currentDate).format("D")}
        </div>
      )}
    </div>
  );
};

export default SwitchCalendarDay;
