import type { FC, JSX, ReactNode } from "react";
import { useLayoutEffect, useState } from "react";
import moment from "moment";
import { CalendarDateTemplateEvent } from "primereact/calendar";
import { PrimeIcons } from "primereact/api";
import { classNames } from "primereact/utils";
import { v4 } from "uuid";
import styles from "./SwitchCalendar.module.scss";
import SwitchCalendarDay from "./SwitchCalendarDay";
import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import Tooltip from "@/components/_helpers/Tooltip/Tooltip";
import { Calendar } from "@/components/_helpers/Calendar/Calendar";
import FACModule from "@/components/Module/Module";

export type FCASwitchCalendarProps = {
  value: string;
  labelText: string;
  minDate: string;
  maxDate: string;
  isMandatory?: boolean;
  dateTemplate: (date: CalendarDateTemplateEvent) => ReactNode;
  error?: string;
  touched?: boolean;
  onDateClick: (date: string) => void;
  language: string;
  translationKeywords: CalendarTranslationKeywords;
  direction: "forward" | "backward";
};

export type CalendarTranslationKeywords = {
  actionsCalendarView: string;
  actionsWeekView: string;
  tooltipPreviousWeek: string;
  tooltipNextWeek: string;
  calendarPlaceholder: string;
};

const FACSwitchCalendar: FC<FCASwitchCalendarProps> = ({
  value,
  labelText,
  minDate,
  maxDate,
  isMandatory,
  dateTemplate,
  error,
  touched,
  onDateClick,
  language,
  translationKeywords,
  direction,
  ...rest
}): JSX.Element => {
  const [startDate, setStartDate] = useState<string>("");
  const [defaultCalendar, setDefaultCalendar] = useState(true);
  const [disabledDayModal, setDisabledDayModal] = useState(false);

  const uniqueId = v4();

  const errorClassName = error && touched ? styles["error-input"] : undefined;
  const getLabelText = () => `${labelText} ${isMandatory ? "*" : ""}`;
  const computedDate = moment(value).locale(language);
  const todayDate = moment().locale(language);
  const effectiveMinDate =
    direction === "forward" ? todayDate.toISOString() : minDate;

  const handlePreviousClick = () => {
    const previousStartDate = moment(startDate).subtract(7, "days");

    if (moment(previousStartDate).isSameOrAfter(effectiveMinDate, "day")) {
      setStartDate(previousStartDate.toISOString());
    }
  };

  const handleNextClick = () => {
    const nextStartDate = moment(startDate).add(7, "days");
    if (direction === "forward") {
      setStartDate(nextStartDate.toISOString());
    } else if (moment(nextStartDate).isSameOrBefore(todayDate, "day")) {
      setStartDate(nextStartDate.toISOString());
    }
  };

  const renderWeekDays = () => {
    const weekDays: JSX.Element[] = [];
    const minDateStartOfWeek = moment(startDate).startOf("week");
    const daysOffset = moment(startDate).diff(minDateStartOfWeek, "days");

    for (let i = 0; i < 7; i++) {
      const currentDate = minDateStartOfWeek
        .clone()
        .add(i + daysOffset, "days");
      const isActive = !!value && moment(currentDate).isSame(value, "day");
      const isToday = moment(currentDate).isSame(todayDate, "day");
      const isDisabled =
        direction === "forward"
          ? moment(currentDate).isBefore(todayDate, "day")
          : moment(currentDate).isAfter(todayDate, "day");

      weekDays.push(
        <SwitchCalendarDay
          key={i}
          currentDate={currentDate.toISOString()}
          isActive={isActive}
          isToday={isToday}
          isDisabled={isDisabled}
          handleDateClick={onDateClick}
          language={language}
          handleDisableDateClick={() => setDisabledDayModal(true)}
        />
      );
    }

    return weekDays;
  };

  useLayoutEffect(() => {
    const today = moment().startOf("day");
    setStartDate(today.toISOString());
  }, []);

  return (
    <div className={styles["scrollable-calendar"]}>
      <div className={styles.row}>
        <div className={classNames(styles.row, styles["calendar-header"])}>
          <label>{getLabelText()}</label>
          <div>
            <button
              type="button"
              id={`switch-calendar-view-${uniqueId}`}
              className={styles["calendar-btn"]}
              onClick={() => setDefaultCalendar((prev) => !prev)}
              data-pr-tooltip={
                defaultCalendar
                  ? translationKeywords.actionsCalendarView
                  : translationKeywords.actionsWeekView
              }
            >
              {defaultCalendar ? (
                <i className={PrimeIcons.CALENDAR} />
              ) : (
                <i className={PrimeIcons.CALENDAR_TIMES} />
              )}
            </button>
            <Tooltip
              target={`#switch-calendar-view-${uniqueId}`}
              position="bottom"
            />

            {defaultCalendar && (
              <>
                <button
                  type="button"
                  id={`previous-week-${uniqueId}`}
                  onClick={handlePreviousClick}
                  disabled={moment(startDate).isSameOrBefore(
                    effectiveMinDate,
                    "day"
                  )}
                  className={styles["scroll-btn"]}
                  data-pr-tooltip={translationKeywords.tooltipPreviousWeek}
                >
                  <i className={PrimeIcons.ANGLE_LEFT} />
                </button>
                <Tooltip
                  target={`#previous-week-${uniqueId}`}
                  position="bottom"
                />

                <button
                  type="button"
                  id={`next-week-${uniqueId}`}
                  onClick={handleNextClick}
                  disabled={
                    direction === "backward"
                      ? moment(startDate).isSameOrAfter(todayDate, "day")
                      : false
                  }
                  className={styles["scroll-btn"]}
                  data-pr-tooltip={translationKeywords.tooltipNextWeek}
                >
                  <i className={PrimeIcons.ANGLE_RIGHT} />
                </button>
                <Tooltip target={`#next-week-${uniqueId}`} position="bottom" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.row}>
        {defaultCalendar ? (
          <div
            className={classNames(styles["calendar-container"], errorClassName)}
          >
            <h6
              className={classNames(styles["calendar-title"], {
                [styles["title-valid"]]: !!value,
              })}
            >
              {computedDate.isValid()
                ? computedDate.format("D MMMM Y")
                : todayDate.format("D MMMM Y")}
            </h6>

            <div className={styles["week-day"]}>{renderWeekDays()}</div>
            {error && touched ? <ValidationImage /> : null}
          </div>
        ) : (
          <div
            className={classNames(
              styles["calendar-container"],
              styles.simplified,
              errorClassName
            )}
          >
            <Calendar
              value={moment(value).toDate()}
              minDate={moment(minDate).toDate()}
              maxDate={moment(maxDate).toDate()}
              locale={language}
              dateFormat="dd.mm.yy"
              dateTemplate={dateTemplate}
              placeholder={translationKeywords.calendarPlaceholder}
              baseZIndex={30}
              className={styles["scrollable-calendar-input"]}
              showIcon
              onChange={(e) => onDateClick(moment(e.value).toISOString())}
              {...rest}
            />
            {error && touched ? <ValidationImage fieldWithIcon /> : null}
          </div>
        )}
      </div>
      {error && touched ? <ValidationText text={error} /> : null}
      <FACModule
        visible={disabledDayModal}
        onHide={() => setDisabledDayModal(false)}
        moduleContent="Please select another date"
        header="This date is not available"
      />
    </div>
  );
};

export default FACSwitchCalendar;
