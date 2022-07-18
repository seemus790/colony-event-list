import React, { FC } from "react";
import { MAINNET_BETACOLONY_ADDRESS } from "../../constants";
import { useEventDateTime } from "../../hooks/useEventDateTime";
import { ColonyInitialisedEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";

interface ColonyInitialisedEventCardProps {
  event: ColonyInitialisedEvent;
}

export const ColonyInitialisedEventCard: FC<
  ColonyInitialisedEventCardProps
> = ({ event }) => {
  const { date } = useEventDateTime({ event });
  const primary = "Congratulations! It's a beautiful baby colony!";

  return (
    <EventCard
      avatarAddress={MAINNET_BETACOLONY_ADDRESS}
      primary={primary}
      secondary={date}
    />
  );
};
