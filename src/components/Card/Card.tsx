import { FC, PropsWithChildren } from "react";
import styles from "./Card.module.scss";

const FACCard: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default FACCard;
