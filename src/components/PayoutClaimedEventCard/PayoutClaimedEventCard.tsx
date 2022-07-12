import React from "react";
import { PayoutClaimedEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";

interface PayoutClaimedEventCardProps {
  event: PayoutClaimedEvent;
}

export function PayoutClaimedEventCard({ event }: PayoutClaimedEventCardProps) {
  return (
    <EventCard event={event}>
      <h1>
        User $USERADDRESS claimed $AMOUNT $TOKEN payout from pot $FUNDINGPOTID.
      </h1>
    </EventCard>
  );
}
