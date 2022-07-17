import React, { FC, ReactNode } from "react";
import styles from "./ValueText.module.css";

export interface ValueTextProps {
  children?: ReactNode;
}

export const ValueText: FC<ValueTextProps> = ({ children }) => {
  return <span className={styles.root}>{children}</span>;
};
