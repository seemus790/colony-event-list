import React, { ReactNode } from "react";
import Blockies from "react-blockies";
import { ColonyEvent } from "../../types/colonyEvent";
import styles from "./EventCard.module.css";

export interface EventCardProps {
  event: ColonyEvent;
  children?: ReactNode;
}

export function EventCard({ event, children }: EventCardProps) {
  const date = new Date(event.logTime);

  return (
    <div className={styles.root}>
      <Blockies
        className={styles.avatar}
        scale={1}
        seed={event.rawLog.transactionHash}
        size={37}
      />
      <div className={styles.primary}>{children}</div>
      <time dateTime={date.toISOString()} className={styles.secondary}>
        {date.toLocaleString("en-US", { day: "numeric" })}{" "}
        {date.toLocaleString("en-US", { month: "short" })}
      </time>
    </div>
  );
}
