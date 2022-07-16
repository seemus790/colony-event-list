import React, { ReactNode } from "react";
import styles from "./ValueText.module.css";

export interface ValueTextProps {
  children?: ReactNode;
}

export function ValueText({ children }: ValueTextProps) {
  return <span className={styles.root}>{children}</span>;
}
