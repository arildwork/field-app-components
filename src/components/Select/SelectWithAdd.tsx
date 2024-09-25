import { FC, ReactNode, useState } from "react";
import FACSelect, { FCASelectProps, OptionsModel } from "./Select";
import AddDialog from "./_helpers/AddDialog";
import styles from "./Select.module.scss";
import FACModule from "@/components/Module/Module";
import { PrimeIcons } from "primereact/api";

export type FCASelectWithAddProps = {
  modalHeader?: ReactNode;
  updatedOptions: (option: OptionsModel) => void;
} & FCASelectProps;

const FACSelectWithAdd: FC<FCASelectWithAddProps> = ({
  value,
  options,
  optionLabel,
  setValue,
  modalHeader,
  updatedOptions,
  ...rest
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <div className={styles["select-with-add"]}>
        <FACSelect
          value={value}
          options={options}
          optionLabel={optionLabel}
          setValue={setValue}
          {...rest}
        />
        <button
          className={styles["add-button"]}
          onClick={() => setModalVisible(true)}
        >
          <i className={PrimeIcons.PLUS}></i>
        </button>
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
    </>
  );
};

export default FACSelectWithAdd;
