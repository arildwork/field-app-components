import FACButtonDark from "@/components/Button/ButtonDark";
import FACButtonLight from "@/components/Button/ButtonLight";
import { FC, FormEvent } from "react";
import FACInputText from "@/components/Input/InputText";
import { OptionsModel } from "@/components/Select/Select";
import styles from "@/components/Select/Select.module.scss";

export type AddDialogProps = {
  formOutput: (option: OptionsModel) => void;
  formClose: () => void;
};

const AddDialog: FC<AddDialogProps> = ({ formOutput, formClose }) => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements as HTMLFormControlsCollection;
    const nameInput = formElements.namedItem("name") as HTMLInputElement;
    const codeInput = formElements.namedItem("code") as HTMLInputElement;

    const formData: OptionsModel = {
      name: nameInput.value,
      code: codeInput.value,
    };

    console.log(formData);

    formOutput(formData);
    formClose();
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <FACInputText
        style={{ marginBottom: "20px" }}
        type="text"
        name="name"
        inputLabel="Name"
        inputPlaceholder="Name"
        required
      />
      <FACInputText
        style={{ marginBottom: "20px" }}
        type="text"
        name="code"
        inputLabel="Code"
        inputPlaceholder="Code"
        required
      />
      <div className={styles["form-action"]}>
        <FACButtonLight
          buttonType="button"
          buttonText="Cancel"
          buttonAction={formClose}
        />
        <FACButtonDark
          buttonType="submit"
          buttonText="Save"
          buttonAction={() => console.log("submit")}
        />
      </div>
    </form>
  );
};

export default AddDialog;
