import { FC, ReactNode } from "react";
import { Dialog } from "primereact/dialog";
import styles from "./Module.module.scss";

export type FACModuleProps = {
  moduleIsVisible: boolean;
  moduleHide: () => void;
  moduleContent: ReactNode;
};

const FACModule: FC<FACModuleProps> = ({
  moduleIsVisible,
  moduleHide,
  moduleContent,
}) => {
  return (
    <Dialog
      blockScroll
      closable
      draggable={false}
      style={{ width: "50vw" }}
      visible={moduleIsVisible}
      onHide={moduleHide}
    >
      {moduleContent}
    </Dialog>
  );
};

export default FACModule;
