import React, { ReactNode } from "react";
import { ColonyEvent } from "../../types/colonyEvent";

export interface EventCardProps {
  event: ColonyEvent;
  children?: ReactNode;
}

export function EventCard({ event, children }: EventCardProps) {
  const date = new Date(event.logTime);

  return (
    <div>
      {children}
      <p>{event.rawLog.blockHash}</p>
      <p>
        {date.toLocaleString("en-US", { day: "numeric" })}{" "}
        {date.toLocaleString("en-US", { month: "short" })}
      </p>
    </div>
  );
}
