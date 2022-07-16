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
      <span>Congratulations! It's a beautiful baby colony!</span>
    </EventCard>
  );
}
