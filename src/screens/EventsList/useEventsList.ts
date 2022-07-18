import { getLogs, getBlockTime, AnyColonyClient } from "@colony/colony-js";
import { Filter } from "@ethersproject/providers";
import usePromise from "react-promise-suspense";
import { ColonyEvent } from "../../types/colonyEvent";
import {
  useColonyClient,
  provider,
} from "../../providers/ColonyClientProvider/ColonyClientProvider";

const getEventsByEventType = async (
  client: AnyColonyClient,
  type: ColonyEvent["type"]
) => {
  let filter: Filter;

  switch (type) {
    case "ColonyInitialised":
      filter = client.filters.ColonyInitialised();
      break;
    case "DomainAdded":
      filter = client.filters.DomainAdded();
      break;
    case "PayoutClaimed":
      filter = client.filters.PayoutClaimed();
      break;
    case "ColonyRoleSet":
      // TODO: Something wrong with the library types?
      // Property 'ColonyRoleSet' does not exist on type ...
      filter = (client.filters as any).ColonyRoleSet();
      break;
    default:
      throw new Error("ERR:UNKNOWN_EVENT_TYPE");
  }

  const logs = await getLogs(client, filter);

  return await Promise.all(
    logs.map(async (log) => ({
      type,
      logTime: await getBlockTime(provider, log.blockHash),
      rawLog: log,
      parsedLog: client.interface.parseLog(log),
    }))
  );
};

const loadEvents = async (client: AnyColonyClient) => {
  if (!client) {
    return [];
  }

  const eventLogs = await Promise.all([
    getEventsByEventType(client, "ColonyInitialised"),
    getEventsByEventType(client, "DomainAdded"),
    getEventsByEventType(client, "PayoutClaimed"),
    getEventsByEventType(client, "ColonyRoleSet"),
  ]);

  const sortedEventLogs = eventLogs
    .flat()
    .sort((a, b) => b.logTime - a.logTime);

  return sortedEventLogs;
};

export const useEventsList = () => {
  const { client } = useColonyClient();
  const events = usePromise(loadEvents, [client]) as ColonyEvent[];

  return {
    events,
  };
};
