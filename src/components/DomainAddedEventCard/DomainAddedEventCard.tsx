import React, { FC } from "react";
import { ValueText } from "../ValueText/ValueText";
import { EventCard } from "../EventCard/EventCard";
import { DomainAddedEvent } from "../../types/colonyEvent";

interface DomainAddedEventCardProps {
  event: DomainAddedEvent;
}

export const DomainAddedEventCard: FC<DomainAddedEventCardProps> = ({
  event,
}) => {
  const domainId = event.parsedLog.args.domainId.toString();

  return (
    <EventCard event={event}>
      <span>
        Domain <ValueText>{domainId}</ValueText> added.
      </span>
    </EventCard>
  );
};
