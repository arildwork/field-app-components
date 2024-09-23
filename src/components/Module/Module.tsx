import { FC, ReactNode } from "react";
import { Dialog, DialogProps } from "primereact/dialog";
import styles from "./Module.module.scss";

export type FACModuleProps = {
  visible: boolean;
  onHide: () => void;
  moduleContent?: ReactNode;
} & DialogProps;

const FACModule: FC<FACModuleProps> = ({
  visible,
  onHide,
  moduleContent,
  ...rest
}) => {
  return (
    <Dialog
      className={styles.module}
      blockScroll
      closable
      draggable={false}
      style={{ width: "500px" }}
      visible={visible}
      onHide={onHide}
      {...rest}
    >
      {moduleContent}
    </Dialog>
  );
};

export default FACModule;
