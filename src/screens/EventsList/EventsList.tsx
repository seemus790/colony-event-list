import React from "react";
import { ColonyInitialisedEventCard } from "../../components/ColonyInitialisedEventCard/ColonyInitialisedEventCard";
import { DomainAddedEventCard } from "../../components/DomainAddedEventCard/DomainAddedEventCard";
import { PayoutClaimedEventCard } from "../../components/PayoutClaimedEventCard/PayoutClaimedEventCard";
import { TaskRoleUserSetEventCard } from "../../components/TaskRoleUserSetEventCard/TaskRoleUserSetEventCard";
import { ColonyEvent } from "../../types/colonyEvent";
import { useEventsList } from "./useEventsList";
import styles from "./EventsList.module.css";

function renderEvent(event: ColonyEvent) {
  switch (event.type) {
    case "ColonyInitialised":
      return <ColonyInitialisedEventCard event={event} />;
    case "DomainAdded":
      return <DomainAddedEventCard event={event} />;
    case "PayoutClaimed":
      return <PayoutClaimedEventCard event={event} />;
    case "TaskRoleUserSet":
      return <TaskRoleUserSetEventCard event={event} />;
    default:
      return null;
  }
}

export function EventsList() {
  const { events } = useEventsList();

  return (
    <div className={styles.root}>
      <ol className={styles.list}>
        {events.map((event) => (
          <li key={event.rawLog.transactionHash} className={styles.listItem}>
            {renderEvent(event)}
          </li>
        ))}
      </ol>
    </div>
  );
}
