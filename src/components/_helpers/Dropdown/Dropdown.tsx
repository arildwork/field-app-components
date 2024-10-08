import type { DropdownProps as PRDropdownProps } from "primereact/dropdown";
import { Dropdown as PRDropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import type { FC, JSX } from "react";
import styles from "./Dropdown.module.scss";

export interface DropdownProps extends PRDropdownProps {
  optionsLoading?: boolean;
  valueLoading?: boolean;
  insideLoading?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  className,
  panelClassName,
  optionsLoading,
  valueLoading,
  pt,
  ...props
}): JSX.Element => {
  return (
    <PRDropdown
      appendTo="self"
      emptyMessage={optionsLoading ? <div>loading</div> : "No results"}
      filterPlaceholder="Filter results"
      emptyFilterMessage="No results"
      valueTemplate={props.valueTemplate}
      loading={valueLoading}
      {...props}
      pt={{
        root: { className: classNames(styles.dropdown, className) },
        input: {
          className: classNames(styles.input, {
            [`${styles.loading}`]: valueLoading,
          }),
        },
        clearIcon: { className: styles["clear-icon"] },
        trigger: {
          className: classNames(styles.trigger, {
            [`${styles.loading}`]: valueLoading,
          }),
        },
        panel: {
          className: classNames(styles.panel, panelClassName),
        },

        item: {
          className: styles.item,
        },
        ...pt,
      }}
    />
  );
};

export default Dropdown;
