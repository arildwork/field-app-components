import { DropdownChangeEvent, DropdownProps } from "primereact/dropdown";
import React, { FC, ReactNode } from "react";
import Dropdown from "@/components/_helpers/Dropdown/Dropdown";
import styles from "./Select.module.scss";
import { v4 } from "uuid";
import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import { classNames } from "primereact/utils";

export type FCASelectProps = {
  value: OptionsModel | null;
  options: OptionsModel[];
  optionLabel: "name" | "code";
  setValue: (e: DropdownChangeEvent) => void;
  filter?: boolean;
  icon?: ReactNode;
  selectLabel?: string;
  error?: string;
  touched?: boolean;
} & DropdownProps;

export type OptionsModel = {
  name: string;
  code: string;
};

const FACSelect: FC<FCASelectProps> = ({
  value,
  options,
  optionLabel,
  setValue,
  filter,
  icon,
  selectLabel,
  required,
  error,
  touched,
  ...rest
}) => {
  const uniqueID = v4();

  const DropdownComponent: FC = () => (
    <Dropdown
      id={uniqueID}
      value={value}
      onChange={setValue}
      options={options}
      optionLabel={optionLabel}
      placeholder="Select a Country"
      filter={filter}
      showClear={filter}
      {...rest}
    />
  );

  return (
    <div className={styles["select-wrapper"]}>
      {selectLabel && (
        <label htmlFor={uniqueID}>
          {required ? `${selectLabel} *` : selectLabel}
        </label>
      )}
      {icon ? (
        <div style={{ position: "relative" }}>
          <div
            className={classNames(styles.select, {
              [styles["select-error"]]: error && touched,
            })}
          >
            {error && touched ? (
              <ValidationImage fieldWithLeftIcon />
            ) : (
              icon && <div className={styles.icon}>{icon}</div>
            )}
            <DropdownComponent />
          </div>
          {error && touched ? (
            <ValidationText text={error ? error : ""} />
          ) : null}
        </div>
      ) : (
        <div
          className={classNames(styles["select-no-icon"], {
            [styles["select-error"]]: error && touched,
          })}
        >
          <DropdownComponent />
          {error && touched ? <ValidationImage fieldWithIcon /> : null}
          {error && touched ? (
            <ValidationText text={error ? error : ""} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FACSelect;
