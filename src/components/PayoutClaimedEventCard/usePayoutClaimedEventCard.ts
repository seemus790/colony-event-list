import { BigNumber } from "ethers";
import { addressToTokenSymbol } from "../../helpers/addressToTokenSymbol";
import { useColonyClient } from "../../providers/ColonyClientProvider/ColonyClientProvider";
import { PayoutClaimedEvent } from "../../types/colonyEvent";
import { AnyColonyClient } from "@colony/colony-js/*";
import usePromise from "react-promise-suspense";
import { useEventDateTime } from "../../hooks/useEventDateTime";

const wei = BigNumber.from(10);

const loadUserAddress = async (
  client: AnyColonyClient,
  fundingPotId: string
) => {
  if (!client) {
    return;
  }

  const { associatedTypeId } = await client.getFundingPot(fundingPotId);

  const { recipient } = await client.getPayment(associatedTypeId);

  return recipient;
};

interface UsePayoutClaimedEventCardOptions {
  event: PayoutClaimedEvent;
}

export const usePayoutClaimedEventCard = ({
  event,
}: UsePayoutClaimedEventCardOptions) => {
  const { client } = useColonyClient();
  const { date } = useEventDateTime({ event });
  const amount = event.parsedLog.args.amount.div(wei.pow(18)).toString();
  const token = addressToTokenSymbol(event.parsedLog.args.token as string);
  const fundingPotId = event.parsedLog.args.fundingPotId.toString();
  const userAddress = usePromise(loadUserAddress, [client, fundingPotId]);

  return {
    amount,
    fundingPotId,
    token,
    userAddress,
    date,
  };
};
