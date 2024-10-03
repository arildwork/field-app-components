import FACButtonDark from "@/components/Button/ButtonDark";
import FACButtonLight from "@/components/Button/ButtonLight";
import { FC, useState } from "react";
import FACInputText from "@/components/Input/InputText";
import { OptionsModel } from "@/components/Select/Select";
import styles from "@/components/Select/Select.module.scss";

export type AddDialogProps = {
  formOutput: (option: OptionsModel) => void;
  formClose: () => void;
};

const AddDialog: FC<AddDialogProps> = ({ formOutput, formClose }) => {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submitHandler = () => {
    if (!name.trim() || !code.trim()) {
      setError("Both Name and Code are required!");
      return;
    }

    const formData: OptionsModel = {
      name,
      code,
    };

    formOutput(formData);
    formClose();
  };

  return (
    <div className={styles.form}>
      <FACInputText
        type="text"
        name="name"
        inputLabel="Name"
        inputPlaceholder="Name"
        required
        value={name}
        error={error}
        touched={!!error}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError("");
        }}
      />
      <div style={{ marginBottom: "20px" }}></div>
      <FACInputText
        type="text"
        name="code"
        inputLabel="Code"
        inputPlaceholder="Code"
        required
        value={code}
        error={error}
        touched={!!error}
        onChange={(e) => {
          setCode(e.target.value);
          if (error) setError("");
        }}
      />
      <div className={styles["form-action"]}>
        <FACButtonLight
          type="button"
          buttonLabel="Cancel"
          onClick={formClose}
        />
        <FACButtonDark
          type="button"
          buttonLabel="Save"
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};

export default AddDialog;
