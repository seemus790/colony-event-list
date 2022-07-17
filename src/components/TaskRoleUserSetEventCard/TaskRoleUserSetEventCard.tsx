import React, { FC } from "react";
import { TaskRoleUserSetEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";
import { ValueText } from "../ValueText/ValueText";

interface TaskRoleUserSetEventCardProps {
  event: TaskRoleUserSetEvent;
}

export const TaskRoleUserSetEventCard: FC<TaskRoleUserSetEventCardProps> = ({
  event,
}) => {
  const role = "role";
  const userAddress = "userAddress";
  const domainId = "domainId";

  return (
    <EventCard event={event}>
      <span>
        <ValueText>{role}</ValueText> role assigned to user{" "}
        <ValueText>{userAddress}</ValueText> in domain{" "}
        <ValueText>{domainId}</ValueText>
      </span>
    </EventCard>
  );
};
