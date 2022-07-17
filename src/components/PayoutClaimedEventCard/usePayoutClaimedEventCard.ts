import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { addressToTokenSymbol } from "../../helpers/addressToTokenSymbol";
import { useColonyClient } from "../../providers/ColonyClientProvider/ColonyClientProvider";
import { PayoutClaimedEvent } from "../../types/colonyEvent";

const wei = BigNumber.from(10);

interface UsePayoutClaimedEventCardOptions {
  event: PayoutClaimedEvent;
}

export const usePayoutClaimedEventCard = ({
  event,
}: UsePayoutClaimedEventCardOptions) => {
  const { client } = useColonyClient();
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState<string>();

  const amount = event.parsedLog.args.amount.div(wei.pow(18)).toString();
  // TODO: Can we type `args`?
  const token = addressToTokenSymbol(event.parsedLog.args.token as string);
  const fundingPotId = event.parsedLog.args.fundingPotId.toString();

  useEffect(() => {
    setLoading(true);

    const loadUserAddress = async () => {
      if (!client) {
        return;
      }

      const { associatedTypeId } = await client.getFundingPot(fundingPotId);

      const { recipient } = await client.getPayment(associatedTypeId);

      setUserAddress(recipient);

      setLoading(false);
    };

    loadUserAddress();
  }, [client, fundingPotId, setLoading, setUserAddress]);

  return {
    amount,
    fundingPotId,
    loading,
    token,
    userAddress,
  };
};
