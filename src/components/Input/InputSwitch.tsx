import React, { FC } from "react";
import styles from "./Input.module.scss";
import { SelectButton, SelectButtonProps } from "primereact/selectbutton";
import { OptionsModel } from "@/components/Select/Select";

export type FACInputSwitchProps = {
  inputValue: OptionsModel;
  inputOptions: OptionsModel[];
} & SelectButtonProps;

const FACInputSwitch: FC<FACInputSwitchProps> = ({
  inputValue,
  inputOptions,
  onChange,
  ...rest
}) => {
  return (
    <div className={styles["input-switch"]}>
      <SelectButton
        value={inputValue}
        options={inputOptions}
        optionLabel="name"
        onChange={onChange}
        allowEmpty={false}
        {...rest}
      />
    </div>
  );
};

export default FACInputSwitch;
