import warningIcon from "@/assets/images/warning-icon.svg";
import { classNames } from "primereact/utils";
import type { FC, JSX } from "react";
import styles from "./ValidationErrors.module.scss";

type ValidationTextProps = {
  text: string;
  dataTest?: string;
};

type ValidationImageProps = {
  fieldWithIcon?: boolean;
  fieldWithDoubleIcon?: boolean;
  dataTest?: string;
};

export const ValidationText: FC<ValidationTextProps> = ({
  text,
  dataTest,
}): JSX.Element => (
  <div
    data-test={`${dataTest}-validation-text`}
    className={styles["validation-text"]}
  >
    <p>{text}</p>
  </div>
);

export const ValidationImage: FC<ValidationImageProps> = ({
  fieldWithIcon,
  fieldWithDoubleIcon,
  dataTest,
}): JSX.Element => (
  <div
    data-test={`${dataTest}-validation-image`}
    className={classNames(styles["validation-image"], {
      [styles["validation-image-icon"]]: fieldWithIcon,
      [styles["validation-image-double-icon"]]: fieldWithDoubleIcon,
    })}
  >
    <img src={warningIcon} alt="" />
  </div>
);
