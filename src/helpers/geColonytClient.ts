import { getColonyNetworkClient, Network } from "@colony/colony-js";
import { Wallet, providers } from "ethers";

const MAINNET_NETWORK_ADDRESS = "0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef";

const MAINNET_BETACOLONY_ADDRESS = "0x869814034d96544f3C62DE2aC22448ed79Ac8e70";

export const provider = new providers.InfuraProvider();

// Wallet used for demo purpose
const wallet = Wallet.createRandom().connect(provider);

export async function geColonytClient() {
  const colonyNetworkClient = getColonyNetworkClient(Network.Mainnet, wallet, {
    networkAddress: MAINNET_NETWORK_ADDRESS,
  });

  const colonyClient = await colonyNetworkClient.getColonyClient(
    MAINNET_BETACOLONY_ADDRESS
  );

  return colonyClient;
}
