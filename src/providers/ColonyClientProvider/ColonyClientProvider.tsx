import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AnyColonyClient,
  getColonyNetworkClient,
  Network,
} from "@colony/colony-js";
import { Wallet, providers } from "ethers";
import {
  MAINNET_BETACOLONY_ADDRESS,
  MAINNET_NETWORK_ADDRESS,
} from "../../constatns";

export const provider = new providers.InfuraProvider();

const ColonyClientContext = createContext<{
  client?: AnyColonyClient;
}>({});

interface ColonyClientProviderProps {
  mainnetNetworkAddress?: string;
  mainnetBetaColonyAddress?: string;
  children?: ReactNode;
}

export function ColonyClientProvider({
  children,
  mainnetBetaColonyAddress = MAINNET_BETACOLONY_ADDRESS,
  mainnetNetworkAddress = MAINNET_NETWORK_ADDRESS,
}: ColonyClientProviderProps) {
  const wallet = useMemo(() => Wallet.createRandom().connect(provider), []);

  const colonyNetworkClient = useMemo(
    () =>
      getColonyNetworkClient(Network.Mainnet, wallet, {
        networkAddress: mainnetNetworkAddress,
      }),
    [wallet, mainnetNetworkAddress]
  );

  const [client, setClient] = useState<AnyColonyClient>();

  const loadColonyClient = useCallback(async () => {
    const colonyClient = await colonyNetworkClient.getColonyClient(
      mainnetBetaColonyAddress
    );

    setClient(colonyClient);
  }, [colonyNetworkClient, mainnetBetaColonyAddress]);

  useEffect(() => {
    loadColonyClient();
  }, [loadColonyClient]);

  return (
    <ColonyClientContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </ColonyClientContext.Provider>
  );
}

export const useColonyClient = () => useContext(ColonyClientContext);
