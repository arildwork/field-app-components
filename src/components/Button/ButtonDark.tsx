import React, { FC } from "react";
import { Button, ButtonProps } from "primereact/button";
import { classNames } from "primereact/utils";
import styles from "./Button.module.scss";

export type FACButtonDarkProps = {
  buttonLabel: string;
  buttonClassname?: string;
} & ButtonProps;

const FACButtonDark: FC<FACButtonDarkProps> = ({
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
        styles["button-dark"],
        buttonClassname
      )}
      label={buttonLabel}
      {...rest}
    >
      {children && children}
    </Button>
  );
};

export default FACButtonDark;
