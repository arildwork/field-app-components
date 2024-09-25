import React, { FC } from "react";
import { Button } from "primereact/button";
import { FACButtonProps } from "@/components/Button/ButtonLight";
import { classNames } from "primereact/utils";
import styles from "./Button.module.scss";

const FACButtonDark: FC<FACButtonProps> = ({
  buttonText,
  buttonAction,
  buttonIcon,
  buttonType,
  buttonClassname,
  ...rest
}) => {
  return (
    <Button
      type={buttonType}
      className={classNames(
        styles.button,
        styles["button-dark"],
        buttonClassname,
      )}
      label={buttonText}
      onClick={buttonAction}
      icon={buttonIcon}
      {...rest}
    />
  );
};

export default FACButtonDark;
