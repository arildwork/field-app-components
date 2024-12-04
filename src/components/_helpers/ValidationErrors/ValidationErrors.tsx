import warningIcon from "@/assets/images/warning-icon.svg";
import { classNames } from "primereact/utils";
import type { FC, JSX } from "react";
import styles from "./ValidationErrors.module.scss";

type ValidationTextProps = {
  text: string | string[];
};

type ValidationImageProps = {
  extraClass?: string;
  fieldWithIcon?: boolean;
  fieldWithLeftIcon?: boolean;
  fieldWithDoubleIcon?: boolean;
};

export const ValidationText: FC<ValidationTextProps> = ({
  text,
}): JSX.Element => (
  <div className={styles["validation-text"]}>
    {Array.isArray(text) ? (
      text.length > 0 && (
        <>
          {text.map((t, index) => (
            <p key={index}>{t}</p>
          ))}
        </>
      )
    ) : (
      <p>{text}</p>
    )}
  </div>
);

export const ValidationImage: FC<ValidationImageProps> = ({
  extraClass,
  fieldWithIcon,
  fieldWithLeftIcon,
  fieldWithDoubleIcon,
}): JSX.Element => (
  <div
    className={classNames(styles["validation-image"], extraClass, {
      [styles["validation-image-icon"]]: fieldWithIcon,
      [styles["validation-image-left-icon"]]: fieldWithLeftIcon,
      [styles["validation-image-double-icon"]]: fieldWithDoubleIcon,
    })}
  >
    <img src={warningIcon} alt="" />
  </div>
);
