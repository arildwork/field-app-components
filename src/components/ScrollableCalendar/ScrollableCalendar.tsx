// import moment from "config/moment/moment-config";
import { useFormikContext } from "formik";
import useAppTranslation from "hooks/useAppTranslation";
import { useViewportChangeDetection } from "hooks/ViewportChangeDetection";
// import { PRCalendar } from "next/components/PRComponents";
// import PRTooltip from "next/components/PRComponents/PRTooltip/PRTooltip";
// import {
//   ValidationImage,
//   ValidationText,
// } from "next/components/ValidationErrors/ValidationErrors";
import type {
  CAPFormikData,
  SAGFormikData,
} from "next/pages/OrderingForms/common/dataTypes/formikDataTypes";
import { PrimeIcons } from "primereact/api";
import type {
  CalendarDateTemplateEvent,
  CalendarPropsSingle,
} from "primereact/calendar";
import { Skeleton } from "primereact/skeleton";
import type { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import type { FC, JSX, ReactNode } from "react";
import { useLayoutEffect, useState } from "react";
import { v4 } from "uuid";
import styles from "./ScrollableCalendar.module.scss";
import ScrollableCalendarDay from "./ScrollableCalendarDay";

export type ScrollableCalendarProps = {
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
} & Omit<CalendarPropsSingle, "id">;

const ScrollableCalendar: FC<ScrollableCalendarProps> = ({
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
  ...rest
}): JSX.Element => {
  const [startDate, setStartDate] = useState(minDate);
  const [defaultCalendar, setDefaultCalendar] = useState(true);
  // const { language, tCommon } = useAppTranslation(['common']);
  // const { setFieldValue } = useFormikContext<CAPFormikData | SAGFormikData>();
  // const { isMobileView } = useViewportChangeDetection();

  const uniqueId = v4();

  const errorClassName = error && touched ? styles["error-input"] : undefined;
  const getLabelText = () => `${labelText} ${isMandatory ? "*" : ""}`;
  // const computedDate = moment(value).locale(language);
  // const todayDate = moment().locale(language);

  const handleDateClick = (date: Date) => {
    // setFieldValue(id, date);
  };

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
        <ScrollableCalendarDay
          key={i}
          currentDate={currentDate}
          isActive={isActive}
          isToday={isToday}
          isDisabled={isDisabled}
          handleDateClick={handleDateClick}
          isLoading={isLoading}
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
                  ? tCommon("actions.calendarView")
                  : tCommon("actions.weekView")
              }
            >
              {defaultCalendar ? (
                <i className={PrimeIcons.CALENDAR} />
              ) : (
                <i className={PrimeIcons.CALENDAR_TIMES} />
              )}
            </button>
            {!isMobileView() ? (
              <PRTooltip
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
                  data-pr-tooltip={tCommon("calendar.timePeriods.previousWeek")}
                >
                  <i className={PrimeIcons.ANGLE_LEFT} />
                </button>
                {!isMobileView() ? (
                  <PRTooltip
                    target={`#previous-week-${uniqueId}`}
                    position="bottom"
                  />
                ) : null}
                <button
                  id={`next-week-${uniqueId}`}
                  onClick={handleNextClick}
                  disabled={isLoading}
                  className={styles["scroll-btn"]}
                  data-pr-tooltip={tCommon("calendar.timePeriods.nextWeek")}
                >
                  <i className={PrimeIcons.ANGLE_RIGHT} />
                </button>
                {!isMobileView() ? (
                  <PRTooltip
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
            <PRCalendar
              id={id}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              locale={language}
              dateFormat="dd.mm.yy"
              dateTemplate={dateTemplate}
              placeholder={tCommon("calendar.chooseDay")}
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
          text={tCommon("errorMessages.fillOutMandatoryField")}
          dataTest={`${dataTest}`}
        />
      ) : null}
    </div>
  );
};

export default ScrollableCalendar;
