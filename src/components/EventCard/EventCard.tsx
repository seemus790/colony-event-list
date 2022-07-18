import React, { FC, ReactNode } from "react";
import Blockies from "react-blockies";
import { ColonyEvent } from "../../types/colonyEvent";
import styles from "./EventCard.module.css";

export interface EventCardProps {
  event: ColonyEvent;
  children?: ReactNode;
  avatarAddress?: string;
}

export const EventCard: FC<EventCardProps> = ({
  event,
  children,
  avatarAddress,
}) => {
  const date = new Date(event.logTime);
  const dateTime = date.toISOString();
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
    <div className={styles.root}>
      <div className={styles.avatar}>
        <Blockies
          scale={1}
          seed={avatarAddress ?? event.rawLog.transactionHash}
          size={37}
        />
      </div>
      <div className={styles.primary}>{children}</div>
      <time dateTime={dateTime} className={styles.secondary}>
        {day} {month}
      </time>
    </div>
  );
};
