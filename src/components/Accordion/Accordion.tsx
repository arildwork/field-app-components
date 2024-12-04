import React, { FC } from "react";
import {
  Accordion,
  AccordionProps,
  AccordionTab,
  AccordionTabProps,
} from "primereact/accordion";
import { PrimeIcons } from "primereact/api";
import styles from "./Accordion.module.scss";
import {
  ValidationImage,
  ValidationText,
} from "@/components/_helpers/ValidationErrors/ValidationErrors";
import { classNames } from "primereact/utils";

export type FACAccordionProps = {
  error?: string | string[];
  touched?: boolean;
  required?: boolean;
} & AccordionProps &
  AccordionTabProps;

const FACAccordion: FC<FACAccordionProps> = ({
  header,
  children,
  error,
  touched,
  required,
  ...rest
}) => {
  return (
    <div
      className={classNames(styles.accordion, {
        [styles["accordion-error"]]: error && touched,
      })}
    >
      <Accordion
        multiple={true}
        collapseIcon={PrimeIcons.ANGLE_UP}
        expandIcon={PrimeIcons.ANGLE_DOWN}
        activeIndex={0}
      >
        <AccordionTab header={required ? `${header} *` : header} {...rest}>
          {children}
        </AccordionTab>
      </Accordion>
      {error && touched ? (
        <ValidationImage
          extraClass={styles["validation-image"]}
          fieldWithIcon
        />
      ) : null}
      {error && touched ? <ValidationText text={error ? error : ""} /> : null}
    </div>
  );
};

export default FACAccordion;
