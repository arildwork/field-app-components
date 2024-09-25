import { FC, ReactNode } from "react";
import styles from "./Card.module.scss";
import { classNames } from "primereact/utils";

export type FACCardProps = {
  children: ReactNode;
  className?: string;
};

const FACCard: FC<FACCardProps> = ({ children, className }) => {
  return <div className={classNames(styles.card, className)}>{children}</div>;
};

export default FACCard;
