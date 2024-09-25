import React, { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

export type FACButtonProps = {
  buttonText: string;
  buttonAction: () => void;
  buttonIcon?: ReactNode;
  buttonType?: "button" | "submit" | "reset";
  buttonClassname?: string;
};

const FACButtonLight: FC<FACButtonProps> = ({
  buttonText,
  buttonAction,
  buttonIcon,
  buttonType = "button",
  buttonClassname,
  ...rest
}) => {
  return (
    <Button
      type={buttonType}
      className={classNames(
        styles.button,
        styles["button-light"],
        buttonClassname,
      )}
      label={buttonText}
      onClick={buttonAction}
      icon={buttonIcon}
      {...rest}
    />
  );
};

export default FACButtonLight;
