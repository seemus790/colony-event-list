import React, { FC, ReactNode } from "react";
import Blockies from "react-blockies";
import { AvatarSkeleton } from "../Skeleton/AvatarSkeleton";
import { TextSkeleton } from "../Skeleton/TextSkeleton";
import styles from "./EventCard.module.css";

export interface EventCardProps {
  avatarAddress?: string;
  primary?: ReactNode;
  secondary?: ReactNode;
}

export const EventCard: FC<EventCardProps> = ({
  avatarAddress,
  primary,
  secondary,
}) => (
  <div className={styles.root}>
    <div className={styles.avatar}>
      {avatarAddress ? (
        <Blockies scale={1} size={37} seed={avatarAddress} />
      ) : (
        <AvatarSkeleton />
      )}
    </div>
    <div className={styles.primary}>{primary ? primary : <TextSkeleton />}</div>
    <time className={styles.secondary}>
      {secondary ? secondary : <TextSkeleton />}
    </time>
  </div>
);
