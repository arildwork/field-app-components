import React, { FC } from "react";
import styles from "./Input.module.scss";
import {
  SelectButton,
  SelectButtonChangeEvent,
  SelectButtonProps,
} from "primereact/selectbutton";
import { OptionsModel } from "@/components/Select/Select";

export type FACInputSwitchProps = {
  inputValue: OptionsModel;
  inputOptions: OptionsModel[];
  inputAction: (e: SelectButtonChangeEvent) => void;
} & SelectButtonProps;

const FACInputSwitch: FC<FACInputSwitchProps> = ({
  inputValue,
  inputOptions,
  inputAction,
  ...rest
}) => {
  return (
    <div className={styles["input-switch"]}>
      <SelectButton
        value={inputValue}
        options={inputOptions}
        optionLabel="name"
        onChange={inputAction}
        allowEmpty={false}
        {...rest}
      />
    </div>
  );
};

export default FACInputSwitch;
