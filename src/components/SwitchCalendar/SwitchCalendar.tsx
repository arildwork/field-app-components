import moment from "moment";
import { PrimeIcons } from "primereact/api";
import {
  CalendarDateTemplateEvent,
  CalendarPropsSingle,
} from "primereact/calendar";
import { Skeleton } from "primereact/skeleton";
import type { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import type { FC, JSX, ReactNode } from "react";
import { useLayoutEffect, useState } from "react";
import { v4 } from "uuid";
import styles from "./SwitchCalendar.module.scss";
import SwitchCalendarDay from "./SwitchCalendarDay";
import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import Tooltip from "@/components/_helpers/Tooltip/Tooltip";
import { Calendar } from "@/components/_helpers/Calendar/Calendar";

export type FCASwitchCalendarProps = {
  id: string;
  value: Nullable<Date>;
  labelText: string;
  minDate: Date;
  maxDate: Date;
  isMandatory?: boolean;
  isLoading?: boolean;
  dateTemplate: (date: CalendarDateTemplateEvent) => ReactNode;
  error?: string;
  touched: boolean;
  dataTest?: string;
  onDateClick: (date: Date) => void;
  isMobileView: boolean;
  language: string;
  translationKeywords: CalendarTranslationKeywords;
} & Omit<CalendarPropsSingle, "id">;

export type CalendarTranslationKeywords = {
  actionsCalendarView: string;
  actionsWeekView: string;
  tooltipPreviousWeek: string;
  tooltipNextWeek: string;
  calendarPlaceholder: string;
  errorFillOutField: string;
};

const FACSwitchCalendar: FC<FCASwitchCalendarProps> = ({
  id,
  value,
  labelText,
  minDate,
  maxDate,
  isMandatory,
  dateTemplate,
  error,
  touched,
  isLoading,
  dataTest,
  onDateClick,
  isMobileView,
  language,
  translationKeywords,
  ...rest
}): JSX.Element => {
  const [startDate, setStartDate] = useState(minDate);
  const [defaultCalendar, setDefaultCalendar] = useState(true);

  const uniqueId = v4();

  const errorClassName = error && touched ? styles["error-input"] : undefined;
  const getLabelText = () => `${labelText} ${isMandatory ? "*" : ""}`;
  const computedDate = moment(value).locale(language);
  const todayDate = moment().locale(language);

  const handlePreviousClick = () => {
    const previousStartDate = moment(startDate).subtract(7, "days").toDate();
    if (moment(previousStartDate).isSameOrAfter(minDate, "day")) {
      setStartDate(previousStartDate);
    }
  };

  const handleNextClick = () => {
    const nextStartDate = moment(startDate).add(7, "days").toDate();
    setStartDate(nextStartDate);
  };

  const renderWeekDays = (isLoading: boolean = false) => {
    const weekDays: JSX.Element[] = [];
    const minDateStartOfWeek = moment(startDate).startOf("week");
    const daysOffset = moment(startDate).diff(minDateStartOfWeek, "days");

    for (let i = 0; i < 7; i++) {
      const currentDate = minDateStartOfWeek
        .clone()
        .add(i + daysOffset, "days")
        .toDate();
      const isActive = !!value && moment(currentDate).isSame(value, "day");
      const isToday = moment(currentDate).isSame(new Date(), "day");
      const isDisabled = moment(currentDate).isAfter(maxDate, "day");

      weekDays.push(
        <SwitchCalendarDay
          key={i}
          currentDate={currentDate}
          isActive={isActive}
          isToday={isToday}
          isDisabled={isDisabled}
          handleDateClick={onDateClick}
          isLoading={isLoading}
          language={language}
        />
      );
    }

    return weekDays;
  };

  useLayoutEffect(() => {
    setStartDate(minDate);
  }, [minDate]);

  return (
    <div
      className={styles["scrollable-calendar"]}
      data-test={`${dataTest}-scrollable`}
    >
      <div className={styles.row}>
        <div className={classNames(styles.row, styles["calendar-header"])}>
          <label>{getLabelText()}</label>
          <div>
            <button
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
            {!isMobileView ? (
              <Tooltip
                target={`#switch-calendar-view-${uniqueId}`}
                position="bottom"
              />
            ) : null}
            {defaultCalendar ? (
              <>
                <button
                  id={`previous-week-${uniqueId}`}
                  onClick={handlePreviousClick}
                  disabled={
                    moment(startDate).isSameOrBefore(minDate, "day") ||
                    isLoading
                  }
                  className={styles["scroll-btn"]}
                  data-pr-tooltip={translationKeywords.tooltipPreviousWeek}
                >
                  <i className={PrimeIcons.ANGLE_LEFT} />
                </button>
                {!isMobileView ? (
                  <Tooltip
                    target={`#previous-week-${uniqueId}`}
                    position="bottom"
                  />
                ) : null}
                <button
                  id={`next-week-${uniqueId}`}
                  onClick={handleNextClick}
                  disabled={isLoading}
                  className={styles["scroll-btn"]}
                  data-pr-tooltip={translationKeywords.tooltipNextWeek}
                >
                  <i className={PrimeIcons.ANGLE_RIGHT} />
                </button>
                {!isMobileView ? (
                  <Tooltip
                    target={`#next-week-${uniqueId}`}
                    position="bottom"
                  />
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.row}>
        {defaultCalendar ? (
          <div
            className={classNames(styles["calendar-container"], errorClassName)}
          >
            {isLoading ? (
              <Skeleton
                className={styles["calendar-title"]}
                height="14px"
                width="112px"
              />
            ) : (
              <h6
                className={classNames(styles["calendar-title"], {
                  [styles["title-valid"]]: !!value,
                })}
              >
                {computedDate.isValid()
                  ? computedDate.format("D MMMM Y")
                  : todayDate.format("D MMMM Y")}
              </h6>
            )}
            <div className={styles["week-day"]}>
              {renderWeekDays(isLoading)}
            </div>
            {error && touched ? <ValidationImage dataTest={dataTest} /> : null}
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
              id={id}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              locale={language}
              dateFormat="dd.mm.yy"
              dateTemplate={dateTemplate}
              placeholder={translationKeywords.calendarPlaceholder}
              disabled={isLoading}
              baseZIndex={30}
              className={styles["scrollable-calendar-input"]}
              pt={{ panel: { style: { zIndex: 31 } } }}
              {...rest}
            />
            {error && touched ? (
              <ValidationImage fieldWithIcon dataTest={dataTest} />
            ) : null}
          </div>
        )}
      </div>
      {error && touched ? (
        <ValidationText
          text={translationKeywords.errorFillOutField}
          dataTest={`${dataTest}`}
        />
      ) : null}
    </div>
  );
};

export default FACSwitchCalendar;
