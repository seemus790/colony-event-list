import React, { FC } from "react";
import { ValueText } from "../ValueText/ValueText";
import { EventCard } from "../EventCard/EventCard";
import { DomainAddedEvent } from "../../types/colonyEvent";
import { useEventDateTime } from "../../hooks/useEventDateTime";
import { MAINNET_BETACOLONY_ADDRESS } from "../../constants";

interface DomainAddedEventCardProps {
  event: DomainAddedEvent;
}

export const DomainAddedEventCard: FC<DomainAddedEventCardProps> = ({
  event,
}) => {
  const { date } = useEventDateTime({ event });
  const domainId = event.parsedLog.args.domainId.toString();
  const primary = (
    <>
      Domain <ValueText>{domainId}</ValueText> added.
    </>
  );

  return (
    <EventCard
      avatarAddress={MAINNET_BETACOLONY_ADDRESS}
      primary={primary}
      secondary={date}
    />
  );
};
