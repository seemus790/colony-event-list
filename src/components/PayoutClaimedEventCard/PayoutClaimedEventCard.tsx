import React from "react";
import { PayoutClaimedEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";
import { ValueText } from "../ValueText/ValueText";
import { usePayoutClaimedEventCard } from "./usePayoutClaimedEventCard";

interface PayoutClaimedEventCardProps {
  event: PayoutClaimedEvent;
}

export function PayoutClaimedEventCard({ event }: PayoutClaimedEventCardProps) {
  const { amount, fundingPotId, token, userAddress } =
    usePayoutClaimedEventCard({ event });

  return (
    <EventCard event={event}>
      <span>
        User <ValueText>{userAddress}</ValueText> claimed{" "}
        <ValueText>{amount}</ValueText> <ValueText>{token}</ValueText> payout
        from pot <ValueText>{fundingPotId}</ValueText>.
      </span>
    </EventCard>
  );
}
