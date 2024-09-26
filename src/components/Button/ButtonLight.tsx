import React, { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import { Button, ButtonProps } from "primereact/button";
import { classNames } from "primereact/utils";

export type FACButtonLightProps = {
  buttonLabel: string;
  buttonClassname?: string;
} & ButtonProps;

const FACButtonLight: FC<FACButtonLightProps> = ({
  buttonLabel,
  buttonClassname,
  type = "button",
  children,
  ...rest
}) => {
  return (
    <Button
      type={type}
      className={classNames(
        styles.button,
        styles["button-light"],
        buttonClassname
      )}
      label={buttonLabel}
      {...rest}
    >
      {children && children}
    </Button>
  );
};

export default FACButtonLight;
