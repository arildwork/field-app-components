import React, { FC } from "react";
import styles from "./Button.module.scss";
import { Button, ButtonProps } from "primereact/button";
import { classNames } from "primereact/utils";

export type FACButtonLightProps = {
  buttonLabel?: string;
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
    <>
      {children ? (
        <Button
          type={type}
          className={classNames(
            styles.button,
            styles["button-light"],
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
            styles["button-light"],
            buttonClassname,
          )}
          label={buttonLabel}
          {...rest}
        />
      )}
    </>
  );
};

export default FACButtonLight;
