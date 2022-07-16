import React from "react";
import { ValueText } from "../ValueText/ValueText";
import { EventCard } from "../EventCard/EventCard";
import { DomainAddedEvent } from "../../types/colonyEvent";

interface DomainAddedEventCardProps {
  event: DomainAddedEvent;
}

export function DomainAddedEventCard({ event }: DomainAddedEventCardProps) {
  // TODO: Can we type `args`?
  const domainId = event.parsedLog.args.domainId.toString();

  return (
    <EventCard event={event}>
      <span>
        Domain <ValueText>{domainId}</ValueText> added.
      </span>
    </EventCard>
  );
}
