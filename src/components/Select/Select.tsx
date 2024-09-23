import { DropdownChangeEvent, DropdownProps } from "primereact/dropdown";
import React, { FC, ReactNode } from "react";
import Dropdown from "@/components/_helpers/Dropdown/Dropdown";
import styles from "./Select.module.scss";

export type FCASelectProps = {
  value: OptionsModel | null;
  options: OptionsModel[];
  optionLabel: "name" | "code";
  setValue: (e: DropdownChangeEvent) => void;
  filter?: boolean;
  icon?: ReactNode;
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
  ...rest
}) => {
  const DropdownComponent: FC = () => (
    <Dropdown
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
    <>
      {icon ? (
        <div className={styles.select}>
          <div className={styles.icon}>{icon}</div>
          <DropdownComponent />
        </div>
      ) : (
        <DropdownComponent />
      )}
    </>
  );
};

export default FACSelect;
