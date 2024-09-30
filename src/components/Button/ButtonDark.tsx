import React, { FC } from "react";
import { Button, ButtonProps } from "primereact/button";
import { classNames } from "primereact/utils";
import styles from "./Button.module.scss";

export type FACButtonDarkProps = {
  buttonLabel?: string;
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
    <>
      {children ? (
        <Button
          type={type}
          className={classNames(
            styles.button,
            styles["button-dark"],
            buttonClassname,
          )}
          {...rest}
        >
          {children}
        </Button>
      ) : (
        <Button
          type={type}
          className={classNames(
            styles.button,
            styles["button-dark"],
            buttonClassname,
          )}
          label={buttonLabel}
          {...rest}
        />
      )}
    </>
  );
};

export default FACButtonDark;
