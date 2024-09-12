import moment from 'config/moment/moment-config';
import { useSupplierRuleSystem } from 'hooks/SupplierRuleSystem/SupplierRuleSystem';
import useAppTranslation from 'hooks/useAppTranslation';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';
import type { FC, JSX } from 'react';
import styles from './ScrollableCalendar.module.scss';

export type ScrollableCalendarDayProps = {
  currentDate: Date;
  isActive: boolean;
  isToday: boolean;
  isDisabled: boolean;
  handleDateClick: (date: Date) => void;
  isLoading: boolean;
};

const ScrollableCalendarDay: FC<ScrollableCalendarDayProps> = ({
  currentDate,
  isActive,
  isToday,
  isDisabled,
  handleDateClick,
  isLoading,
}): JSX.Element => {
  const { language, tCommon } = useAppTranslation(['common']);
  const supplierRules = useSupplierRuleSystem();

  const message = tCommon('supplierRules.earliestPlacingTime');

  return (
    <div className={classNames(styles.day)}>
      {isLoading ? (
        <Skeleton height='14.4px' />
      ) : (
        <div className={styles.name}>
          {moment(currentDate).locale(language).format('ddd')}
        </div>
      )}
      {isLoading ? (
        <Skeleton
          className={classNames(styles.date, styles['date-disabled'])}
          height='30px'
          width='30px'
        />
      ) : (
        <>
          {!isDisabled ? (
            <div
              className={classNames(
                styles.date,
                isActive && styles.active,
                isToday && styles.today
              )}
              onClick={() => handleDateClick(currentDate)}>
              {moment(currentDate).format('D')}
            </div>
          ) : (
            <div
              className={classNames(styles.date, styles['date-disabled'])}
              onClick={() => supplierRules.showModal(message)}>
              {moment(currentDate).format('D')}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ScrollableCalendarDay;
