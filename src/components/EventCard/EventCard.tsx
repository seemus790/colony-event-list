import React, { FC, ReactNode } from "react";
import Blockies from "react-blockies";
import { ColonyEvent } from "../../types/colonyEvent";
import { AvatarSkeleton } from "../Skeleton/AvatarSkeleton";
import { TextSkeleton } from "../Skeleton/TextSkeleton";
import styles from "./EventCard.module.css";

export interface EventCardProps {
  event: ColonyEvent;
  children?: ReactNode;
  loading?: boolean;
  avatarAddress?: string;
}

export const EventCard: FC<EventCardProps> = ({
  event,
  children,
  loading = false,
  avatarAddress,
}) => {
  const date = new Date(event.logTime);
  const dateTime = date.toISOString();
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const avatar = loading ? (
    <AvatarSkeleton />
  ) : (
    <Blockies
      scale={1}
      seed={avatarAddress ?? event.rawLog.transactionHash}
      size={37}
    />
  );
  const primary = loading ? <TextSkeleton /> : children;

  return (
    <div className={styles.root}>
      <div className={styles.avatar}>{avatar}</div>
      <div className={styles.primary}>{primary}</div>
      <time dateTime={dateTime} className={styles.secondary}>
        {day} {month}
      </time>
    </div>
  );
};
