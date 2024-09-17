import type { DropdownProps as PRDropdownProps } from "primereact/dropdown";
import { Dropdown as PRDropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";
import { classNames } from "primereact/utils";
import type { FC, JSX } from "react";
import styles from "./Dropdown.module.scss";

export interface DropdownProps extends PRDropdownProps {
  optionsLoading?: boolean;
  valueLoading?: boolean;
  dataTest?: string;
  insideLoading?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  className,
  panelClassName,
  optionsLoading,
  valueLoading,
  dataTest,
  pt,
  ...props
}): JSX.Element => {
  return (
    <PRDropdown
      appendTo="self"
      style={{ maxWidth: "100%" }}
      emptyMessage={
        optionsLoading ? (
          <div>loading</div>
        ) : (
          "newTranslation.common.filters.search.noResults"
        )
      }
      filterPlaceholder={"newTranslation.common.filters.search.placeholder"}
      emptyFilterMessage={"newTranslation.common.filters.search.noResults"}
      data-test={`${dataTest}-dropdown`}
      valueTemplate={props.valueTemplate}
      loading={valueLoading}
      loadingIcon={<Skeleton height="10px" width="100px" />}
      {...props}
      pt={{
        root: { className: classNames(styles.dropdown, className) },
        input: {
          className: classNames(styles.input, {
            [`${styles.loading}`]: valueLoading,
          }),
          "data-test": `${dataTest}-dropdown-input`,
        },
        clearIcon: { className: styles["clear-icon"] },
        trigger: {
          className: classNames(styles.trigger, {
            [`${styles.loading}`]: valueLoading,
          }),
          "data-test": `${dataTest}-dropdown-trigger`,
        },
        panel: {
          className: classNames(
            styles.panel,
            `t-${dataTest}-dropdown-panel`,
            panelClassName
          ),
        },

        item: {
          className: styles.item,
          "data-test": `${dataTest}-dropdown-item`,
        },
        list: { "data-test": `${dataTest}-dropdown-list` },
        ...pt,
      }}
    />
  );
};

export default Dropdown;
