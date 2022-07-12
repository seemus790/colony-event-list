import React from "react";
import { ColonyRole } from "@colony/colony-js";
import { EventCard } from "../EventCard/EventCard";
import { DomainAddedEvent } from "../../types/colonyEvent";

interface DomainAddedEventCardProps {
  event: DomainAddedEvent;
}

export function DomainAddedEventCard({ event }: DomainAddedEventCardProps) {
  // TODO: Can we type `args`?
  const domainId = event.parsedLog.args?.domainId.toNumber();

  return (
    <EventCard event={event}>
      <h1>Domain {ColonyRole[domainId]} added.</h1>
    </EventCard>
  );
}
