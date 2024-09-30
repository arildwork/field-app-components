import React, { FC, useEffect } from "react";
import {
  FileUpload,
  FileUploadProps,
  FileUploadSelectEvent,
} from "primereact/fileupload";
import { v4 } from "uuid";
import styles from "./Input.module.scss";

export type FACInputUploadProps = {
  onFileSelect: (file: File | null | undefined) => void;
  inputMaxFileSize?: number;
  inputLabel?: string;
  value?: File | null;
} & FileUploadProps;

const FACInputUpload: FC<FACInputUploadProps> = ({
  onFileSelect,
  inputMaxFileSize = 8 * 1024 * 1024,
  inputLabel,
  value,
  ...rest
}) => {
  const uniqueID = v4();

  const handleSelect = (e: FileUploadSelectEvent) => {
    const selectedFile = e.files && e.files[0];

    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      onFileSelect(null);
      return;
    }
    if (selectedFile.size > inputMaxFileSize) {
      onFileSelect(null);
      return;
    }
    onFileSelect(selectedFile);
  };

  useEffect(() => {
    onFileSelect(value);
  }, [value]);

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
        chooseLabel="Select PDF file"
        onSelect={handleSelect}
        onClear={() => {
          onFileSelect(null);
        }}
        {...rest}
      />
    </div>
  );
};

export default FACInputUpload;
