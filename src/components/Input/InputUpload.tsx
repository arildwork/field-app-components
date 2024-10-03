import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import { classNames } from "primereact/utils";
import React, { FC, useEffect, useRef, useState } from "react";
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
  required?: boolean;
  error?: string;
  touched?: boolean;
} & FileUploadProps;

const FACInputUpload: FC<FACInputUploadProps> = ({
  onFileSelect,
  inputMaxFileSize = 8 * 1024 * 1024,
  inputLabel,
  value,
  required,
  error,
  touched,
  ...rest
}) => {
  const uniqueID = v4();
  const fileUploadRef = useRef<FileUpload>(null);

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

  const handleClear = () => {
    onFileSelect(null);
    fileUploadRef.current?.clear();
  };

  // useEffect(() => {
  //   if (value === null) {
  //     fileUploadRef.current?.clear();
  //   }
  // }, [value]);

  console.log(value);

  return (
    <div className={styles.input}>
      {inputLabel && (
        <label htmlFor={uniqueID}>
          {required ? `${inputLabel} *` : inputLabel}
        </label>
      )}
      <div
        className={classNames(styles["input-wrapper"], {
          [styles["input-error"]]: error || touched,
        })}
      >
        <FileUpload
          ref={fileUploadRef}
          mode="basic"
          multiple={false}
          accept="application/pdf"
          maxFileSize={inputMaxFileSize}
          auto={false}
          customUpload
          chooseLabel="Select PDF file"
          onSelect={handleSelect}
          onClear={handleClear}
          {...rest}
        />
        {error || touched ? <ValidationImage fieldWithIcon /> : null}
        {error || touched ? <ValidationText text={error ? error : ""} /> : null}
      </div>
    </div>
  );
};

export default FACInputUpload;
