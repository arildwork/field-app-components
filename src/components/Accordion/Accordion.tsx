import { FC } from "react";
import {
  Accordion,
  AccordionProps,
  AccordionTab,
  AccordionTabProps,
} from "primereact/accordion";
import { PrimeIcons } from "primereact/api";
import styles from "./Accordion.module.scss";

const FACAccordion: FC<AccordionProps & AccordionTabProps> = ({
  header,
  children,
  ...rest
}) => {
  return (
    <div className={styles.accordion}>
      <Accordion
        multiple={true}
        collapseIcon={PrimeIcons.ANGLE_UP}
        expandIcon={PrimeIcons.ANGLE_DOWN}
        activeIndex={0}
      >
        <AccordionTab header={header} {...rest}>
          {children}
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default FACAccordion;
