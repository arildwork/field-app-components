import React, { FC } from "react";
import { classNames } from "primereact/utils";
import styles from "./Button.module.scss";
import { Button, ButtonProps } from "primereact/button";

export type FACButtonIconProps = {
  buttonClassname?: string;
  color?: "default" | "red" | "blue";
} & ButtonProps;

const FACButtonIcon: FC<FACButtonIconProps> = ({
  buttonClassname,
  color = "default",
  type = "button",
  ...rest
}) => {
  return (
    <Button
      type={type}
      className={classNames(
        styles.button,
        styles["button-icon"],
        buttonClassname,
        {
          [styles["button-icon-red"]]: color === "red",
          [styles["button-icon-blue"]]: color === "blue",
        },
      )}
      {...rest}
    />
  );
};

export default FACButtonIcon;
