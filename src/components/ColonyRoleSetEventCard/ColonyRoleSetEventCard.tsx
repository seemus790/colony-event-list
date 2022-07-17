import React, { FC } from "react";
import { ColonyRoleSetEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";
import { ValueText } from "../ValueText/ValueText";
import { useColonyRoleSetEventCard } from "./useColonyRoleSetEventCard";

interface ColonyRoleSetEventCardProps {
  event: ColonyRoleSetEvent;
}

export const ColonyRoleSetEventCard: FC<ColonyRoleSetEventCardProps> = ({
  event,
}) => {
  const { role, domainId, userAddress } = useColonyRoleSetEventCard({ event });

  return (
    <EventCard event={event} avatarAddress={userAddress}>
      <span>
        <ValueText>{role}</ValueText> role assigned to user{" "}
        <ValueText>{userAddress}</ValueText> in domain{" "}
        <ValueText>{domainId}</ValueText>
      </span>
    </EventCard>
  );
};
