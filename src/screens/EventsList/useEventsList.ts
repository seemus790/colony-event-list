import { useEffect, useRef, useState } from "react";
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
      // TODO: Here we hit insura rate limit (429 Too Many Requests)?
      logTime: await getBlockTime(provider, log.blockHash),
      rawLog: log,
      parsedLog: client.interface.parseLog(log),
    }))
  );
};

export function useEventsList() {
  // TODO: Use suspense for data fetching
  // For now we use a ref to avoid double `useEffec` call
  const canceled = useRef(false);
  const [events, setEvents] = useState<ColonyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { client } = useColonyClient();

  useEffect(() => {
    async function load() {
      if (!client || canceled.current) {
        return;
      }

      setLoading(true);

      canceled.current = true;

      const eventLogs = await Promise.all([
        getEventsByEventType(client, "ColonyInitialised"),
        getEventsByEventType(client, "DomainAdded"),
        getEventsByEventType(client, "PayoutClaimed"),
        getEventsByEventType(client, "TaskRoleUserSet"),
      ]);

      const sortedEventLogs = eventLogs
        .flat()
        .sort((a, b) => b.logTime - a.logTime);

      setEvents(sortedEventLogs);

      setLoading(false);
    }

    load();
  }, [client]);

  return {
    events,
    loading,
  };
}
