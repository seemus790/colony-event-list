import React, { FC } from "react";
import { ColonyInitialisedEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";

interface ColonyInitialisedEventCardProps {
  event: ColonyInitialisedEvent;
}

export const ColonyInitialisedEventCard: FC<
  ColonyInitialisedEventCardProps
> = ({ event }) => {
  return (
    <EventCard event={event}>
      <span>Congratulations! It's a beautiful baby colony!</span>
    </EventCard>
  );
};
