import { DropdownChangeEvent } from "primereact/dropdown";
import { FC, ReactNode } from "react";
import Dropdown from "@/components/_helpers/Dropdown/Dropdown";
import "./Select.module.scss";

export type FCASelectProps = {
  value: OptionsModel | null;
  options: OptionsModel[];
  optionLabel: "name" | "code";
  setValue: (e: DropdownChangeEvent) => void;
  valueTemplate?: ReactNode;
  itemTemplate?: ReactNode;
  filter?: boolean;
};

export type OptionsModel = {
  name: string;
  code: string;
};

const FACSelect: FC<FCASelectProps> = ({
  value,
  options,
  optionLabel,
  setValue,
  valueTemplate,
  filter,
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
      valueTemplate={(option: OptionsModel, props) =>
        option ? option.name : props.placeholder
      }
      itemTemplate={(option: OptionsModel) => option.name}
      className="w-full md:w-14rem"
    />
  );
};

export default FACSelect;
