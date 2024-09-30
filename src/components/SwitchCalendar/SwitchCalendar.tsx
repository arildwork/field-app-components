import type { FC, JSX, ReactNode } from "react";
import { useLayoutEffect, useState } from "react";
import moment from "moment";
import {
  CalendarDateTemplateEvent,
  CalendarPropsSingle,
} from "primereact/calendar";
import { PrimeIcons } from "primereact/api";
import type { Nullable } from "primereact/ts-helpers";
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
  value: Nullable<Date>;
  labelText: string;
  minDate: Date;
  maxDate: Date;
  isMandatory?: boolean;
  dateTemplate: (date: CalendarDateTemplateEvent) => ReactNode;
  error?: string;
  onDateClick: (date: Date) => void;
  language: string;
  translationKeywords: CalendarTranslationKeywords;
  direction: "forward" | "backward";
} & CalendarPropsSingle;

export type CalendarTranslationKeywords = {
  actionsCalendarView: string;
  actionsWeekView: string;
  tooltipPreviousWeek: string;
  tooltipNextWeek: string;
  calendarPlaceholder: string;
  errorFillOutField: string;
};

const FACSwitchCalendar: FC<FCASwitchCalendarProps> = ({
  value,
  labelText,
  minDate,
  maxDate,
  isMandatory,
  dateTemplate,
  error,
  onDateClick,
  language,
  translationKeywords,
  direction,
  ...rest
}): JSX.Element => {
  const [startDate, setStartDate] = useState<Date>();
  const [defaultCalendar, setDefaultCalendar] = useState(true);
  const [disabledDayModal, setDisabledDayModal] = useState(false);

  const uniqueId = v4();

  const errorClassName = error ? styles["error-input"] : undefined;
  const getLabelText = () => `${labelText} ${isMandatory ? "*" : ""}`;
  const computedDate = moment(value).locale(language);
  const todayDate = moment().locale(language);
  const effectiveMinDate =
    direction === "forward" ? todayDate.toDate() : minDate;

  const handlePreviousClick = () => {
    const previousStartDate = moment(startDate).subtract(7, "days").toDate();
    if (moment(previousStartDate).isSameOrAfter(effectiveMinDate, "day")) {
      setStartDate(previousStartDate);
    }
  };

  const handleNextClick = () => {
    const nextStartDate = moment(startDate).add(7, "days").toDate();
    if (direction === "forward") {
      setStartDate(nextStartDate);
    } else if (moment(nextStartDate).isSameOrBefore(todayDate, "day")) {
      setStartDate(nextStartDate);
    }
  };

  const renderWeekDays = () => {
    const weekDays: JSX.Element[] = [];
    const minDateStartOfWeek = moment(startDate).startOf("week");
    const daysOffset = moment(startDate).diff(minDateStartOfWeek, "days");

    for (let i = 0; i < 7; i++) {
      const currentDate = minDateStartOfWeek
        .clone()
        .add(i + daysOffset, "days")
        .toDate();
      const isActive = !!value && moment(currentDate).isSame(value, "day");
      const isToday = moment(currentDate).isSame(todayDate, "day");
      const isDisabled =
        direction === "forward"
          ? moment(currentDate).isBefore(todayDate, "day")
          : moment(currentDate).isAfter(todayDate, "day");

      weekDays.push(
        <SwitchCalendarDay
          key={i}
          currentDate={currentDate}
          isActive={isActive}
          isToday={isToday}
          isDisabled={isDisabled}
          handleDateClick={onDateClick}
          language={language}
          handleDisableDateClick={() => setDisabledDayModal(true)}
        />,
      );
    }

    return weekDays;
  };

  useLayoutEffect(() => {
    const today = moment().startOf("day");
    setStartDate(today.toDate());
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

            <button
              type="button"
              id={`previous-week-${uniqueId}`}
              onClick={handlePreviousClick}
              disabled={moment(startDate).isSameOrBefore(
                effectiveMinDate,
                "day",
              )}
              className={styles["scroll-btn"]}
              data-pr-tooltip={translationKeywords.tooltipPreviousWeek}
            >
              <i className={PrimeIcons.ANGLE_LEFT} />
            </button>
            <Tooltip target={`#previous-week-${uniqueId}`} position="bottom" />

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
            {error ? <ValidationImage /> : null}
          </div>
        ) : (
          <div
            className={classNames(
              styles["calendar-container"],
              styles.simplified,
              errorClassName,
            )}
          >
            <Calendar
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              locale={language}
              dateFormat="dd.mm.yy"
              dateTemplate={dateTemplate}
              placeholder={translationKeywords.calendarPlaceholder}
              baseZIndex={30}
              className={styles["scrollable-calendar-input"]}
              showIcon
              {...rest}
            />
            {error ? <ValidationImage fieldWithIcon /> : null}
          </div>
        )}
      </div>
      {error ? (
        <ValidationText text={translationKeywords.errorFillOutField} />
      ) : null}
      <FACModule
        visible={disabledDayModal}
        onHide={() => setDisabledDayModal(false)}
        moduleContent={<p>Please select another date</p>}
        header={<h4>This date is not available</h4>}
      />
    </div>
  );
};

export default FACSwitchCalendar;
