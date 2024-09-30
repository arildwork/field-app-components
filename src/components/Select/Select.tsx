import { DropdownChangeEvent, DropdownProps } from "primereact/dropdown";
import React, { FC, ReactNode } from "react";
import Dropdown from "@/components/_helpers/Dropdown/Dropdown";
import styles from "./Select.module.scss";
import { v4 } from "uuid";

export type FCASelectProps = {
  value: OptionsModel | null;
  options: OptionsModel[];
  optionLabel: "name" | "code";
  setValue: (e: DropdownChangeEvent) => void;
  filter?: boolean;
  icon?: ReactNode;
  selectLabel?: string;
} & DropdownProps;

export type OptionsModel = {
  name: string;
  code: string;
};

const FACSelect: FC<FCASelectProps> = ({
  value,
  options,
  optionLabel,
  setValue,
  filter,
  icon,
  selectLabel,
  ...rest
}) => {
  const uniqueID = v4();

  const DropdownComponent: FC = () => (
    <Dropdown
      id={uniqueID}
      value={value}
      onChange={setValue}
      options={options}
      optionLabel={optionLabel}
      placeholder="Select a Country"
      filter={filter}
      showClear={filter}
      className="w-full md:w-14rem"
      {...rest}
    />
  );

  return (
    <div className={styles["select-wrapper"]}>
      {selectLabel && <label htmlFor={uniqueID}>{selectLabel}</label>}
      {icon ? (
        <div className={styles.select}>
          <div className={styles.icon}>{icon}</div>
          <DropdownComponent />
        </div>
      ) : (
        <DropdownComponent />
      )}
    </div>
  );
};

export default FACSelect;
