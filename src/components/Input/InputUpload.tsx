import React, { FC } from "react";
import {
  FileUpload,
  FileUploadProps,
  FileUploadSelectEvent,
} from "primereact/fileupload";
import { v4 } from "uuid";
import styles from "./Input.module.scss";

export type FACInputUploadProps = {
  onFileSelect: (file: File | null) => void;
  inputMaxFileSize?: number;
  inputLabel?: string;
} & FileUploadProps;

const FACInputUpload: FC<FACInputUploadProps> = ({
  onFileSelect,
  inputMaxFileSize = 8 * 1024 * 1024,
  inputLabel,
  ...rest
}) => {
  const uniqueID = v4();

  const handleSelect = (e: FileUploadSelectEvent) => {
    const file = e.files && e.files[0];

    if (!file) return;
    if (file.type !== "application/pdf") {
      onFileSelect(null);
      return;
    }
    if (file.size > inputMaxFileSize) {
      onFileSelect(null);
      return;
    }
    onFileSelect(file);
  };

  return (
    <div className={styles.input}>
      {inputLabel && <label htmlFor={uniqueID}>{inputLabel}</label>}
      <FileUpload
        mode="basic"
        multiple={false}
        accept="application/pdf"
        maxFileSize={inputMaxFileSize}
        auto={false}
        customUpload
        onSelect={handleSelect}
        chooseLabel="Select PDF file"
        {...rest}
      />
    </div>
  );
};

export default FACInputUpload;
