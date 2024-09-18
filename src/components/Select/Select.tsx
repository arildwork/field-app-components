import { DropdownChangeEvent, DropdownProps } from "primereact/dropdown";
import { FC } from "react";
import Dropdown from "@/components/_helpers/Dropdown/Dropdown";
import "./Select.module.scss";

export type FCASelectProps = {
  value: OptionsModel | null;
  options: OptionsModel[];
  optionLabel: "name" | "code";
  setValue: (e: DropdownChangeEvent) => void;
  filter?: boolean;
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
  ...rest
}) => {
  return (
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
};

export default FACSelect;
