import React from "react";
import { useEvents } from "./useEvents";

export function Events() {
  const { events } = useEvents();

  return (
    <ul>
      {events.map((event) => (
        <li key={event.rawEventLog.transactionHash}>
          {event.rawEventLog.transactionHash}
        </li>
      ))}
    </ul>
  );
}
