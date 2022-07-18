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
  const { role, domainId, userAddress, date } = useColonyRoleSetEventCard({
    event,
  });
  const primary = (
    <>
      <ValueText>{role}</ValueText> role assigned to user{" "}
      <ValueText>{userAddress}</ValueText> in domain{" "}
      <ValueText>{domainId}</ValueText>
    </>
  );

  return (
    <EventCard avatarAddress={userAddress} primary={primary} secondary={date} />
  );
};
