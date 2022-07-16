import React from "react";
import { PayoutClaimedEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";
import { ValueText } from "../ValueText/ValueText";

interface PayoutClaimedEventCardProps {
  event: PayoutClaimedEvent;
}

export function PayoutClaimedEventCard({ event }: PayoutClaimedEventCardProps) {
  // TODO: Can we type `args`?
  const userAddress = "userAddress";
  const amount = event.parsedLog.args.amount.toString();
  const token = event.parsedLog.args.token;
  const fundingPotId = event.parsedLog.args.fundingPotId.toString();

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
