import React, { FC, Suspense } from "react";
import { ColonyInitialisedEventCard } from "../../components/ColonyInitialisedEventCard/ColonyInitialisedEventCard";
import { DomainAddedEventCard } from "../../components/DomainAddedEventCard/DomainAddedEventCard";
import { PayoutClaimedEventCard } from "../../components/PayoutClaimedEventCard/PayoutClaimedEventCard";
import { ColonyRoleSetEventCard } from "../../components/ColonyRoleSetEventCard/ColonyRoleSetEventCard";
import { ColonyEvent } from "../../types/colonyEvent";
import { useEventsList } from "./useEventsList";
import styles from "./EventsList.module.css";
import { EventCard } from "../../components/EventCard/EventCard";

const renderEvent = (event: ColonyEvent) => {
  switch (event.type) {
    case "ColonyInitialised":
      return <ColonyInitialisedEventCard event={event} />;
    case "DomainAdded":
      return <DomainAddedEventCard event={event} />;
    case "PayoutClaimed":
      return <PayoutClaimedEventCard event={event} />;
    case "ColonyRoleSet":
      return <ColonyRoleSetEventCard event={event} />;
    default:
      return null;
  }
};

export const EventsList: FC = () => {
  const { events } = useEventsList();

  return (
    <div className={styles.root}>
      <ol className={styles.list}>
        {events.map((event) => (
          <li key={event.rawLog.transactionHash} className={styles.listItem}>
            <Suspense fallback={<EventCard />}>{renderEvent(event)}</Suspense>
          </li>
        ))}
      </ol>
    </div>
  );
};
