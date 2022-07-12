import React from "react";
import { TaskRoleUserSetEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";

interface TaskRoleUserSetEventCardProps {
  event: TaskRoleUserSetEvent;
}

export function TaskRoleUserSetEventCard({
  event,
}: TaskRoleUserSetEventCardProps) {
  return (
    <EventCard event={event}>
      <h1>$ROLE role assigned to user $USERADDRESS in domain $DOMAINID </h1>
    </EventCard>
  );
}
