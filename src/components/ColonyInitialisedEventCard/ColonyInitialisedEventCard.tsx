import React from "react";
import { ColonyInitialisedEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";

interface ColonyInitialisedEventCardProps {
  event: ColonyInitialisedEvent;
}

export function ColonyInitialisedEventCard({
  event,
}: ColonyInitialisedEventCardProps) {
  return (
    <EventCard event={event}>
      <h1>Congratulations! It's a beautiful baby colony!</h1>
    </EventCard>
  );
}
