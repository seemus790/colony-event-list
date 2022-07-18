import React, { FC } from "react";
import { PayoutClaimedEvent } from "../../types/colonyEvent";
import { EventCard } from "../EventCard/EventCard";
import { ValueText } from "../ValueText/ValueText";
import { usePayoutClaimedEventCard } from "./usePayoutClaimedEventCard";

interface PayoutClaimedEventCardProps {
  event: PayoutClaimedEvent;
}

export const PayoutClaimedEventCard: FC<PayoutClaimedEventCardProps> = ({
  event,
}) => {
  const { amount, fundingPotId, token, userAddress } =
    usePayoutClaimedEventCard({ event });

  return (
    <EventCard event={event} avatarAddress={userAddress}>
      <span>
        User <ValueText>{userAddress}</ValueText> claimed{" "}
        <ValueText>{amount}</ValueText> <ValueText>{token}</ValueText> payout
        from pot <ValueText>{fundingPotId}</ValueText>.
      </span>
    </EventCard>
  );
};
