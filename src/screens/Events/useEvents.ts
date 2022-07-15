import { useEffect, useState } from "react";
import { getLogs, getBlockTime, AnyColonyClient } from "@colony/colony-js";
import { Filter } from "@ethersproject/providers";
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
    case "TaskRoleUserSet":
      filter = client.filters.TaskRoleUserSet();
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

export function useEvents() {
  const [events, setEvents] = useState<ColonyEvent[]>([]);
  const [loading, setIsLoading] = useState(true);
  const { client } = useColonyClient();

  useEffect(() => {
    async function load() {
      if (!client) {
        return;
      }

      setIsLoading(true);

      const eventLogs = await Promise.all([
        getEventsByEventType(client, "ColonyInitialised"),
        getEventsByEventType(client, "DomainAdded"),
        // TODO: Here we hit insura rate limit (429 Too Many Requests)?
        // getEventsByEventType(client, "PayoutClaimed"),
        getEventsByEventType(client, "TaskRoleUserSet"),
      ]);

      const sortedEventLogs = eventLogs
        .flat()
        .sort((a, b) => b.logTime - a.logTime);

      setEvents(sortedEventLogs);

      setIsLoading(false);
    }

    load();
  }, [client]);

  return {
    events,
    loading,
  };
}
