import React, { FC, ReactNode, useState } from "react";
import FACSelect, { FCASelectProps, OptionsModel } from "./Select";
import AddDialog from "./_helpers/AddDialog";
import FACModule from "@/components/Module/Module";
import { PrimeIcons } from "primereact/api";
import { v4 } from "uuid";
import styles from "./Select.module.scss";
import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import { classNames } from "primereact/utils";

export type FCASelectWithAddProps = {
  modalHeader?: ReactNode;
  updatedOptions: (option: OptionsModel) => void;
  selectWithAddLabel?: string;
  error?: string;
  touched?: boolean;
} & FCASelectProps;

const FACSelectWithAdd: FC<FCASelectWithAddProps> = ({
  value,
  options,
  optionLabel,
  setValue,
  modalHeader,
  updatedOptions,
  selectWithAddLabel,
  required,
  error,
  touched,
  ...rest
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const uniqueID = v4();

  return (
    <div className={styles["select-with-add-wrapper"]}>
      {selectWithAddLabel && (
        <label htmlFor={uniqueID}>
          {required ? `${selectWithAddLabel} *` : selectWithAddLabel}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <div
          className={classNames(styles["select-with-add"], {
            [styles["select-error"]]: error && touched,
          })}
        >
          <FACSelect
            id={uniqueID}
            value={value}
            options={options}
            optionLabel={optionLabel}
            setValue={setValue}
            {...rest}
          />
          <button
            type="button"
            className={styles["add-button"]}
            onClick={() => setModalVisible(true)}
          >
            <i className={PrimeIcons.PLUS}></i>
          </button>
        </div>
        {error && touched ? <ValidationImage fieldWithDoubleIcon /> : null}
        {error && touched ? <ValidationText text={error ? error : ""} /> : null}
      </div>
      <FACModule
        header={modalHeader}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        moduleContent={
          <AddDialog
            formOutput={updatedOptions}
            formClose={() => setModalVisible(false)}
          />
        }
      />
    </div>
  );
};

export default FACSelectWithAdd;
