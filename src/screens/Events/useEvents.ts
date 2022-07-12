import { useEffect, useState } from "react";
import { getLogs, getBlockTime } from "@colony/colony-js";
import { Filter } from "@ethersproject/providers";
import { geColonytClient, provider } from "../../helpers/geColonytClient";
import { ColonyEvent } from "../../types/colonyEvent";

async function getEventsByEventType(type: ColonyEvent["type"]) {
  const client = await geColonytClient();

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
}

export function useEvents() {
  const [error, setError] = useState<Error>();
  const [events, setEvents] = useState<ColonyEvent[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      const eventLogs = await Promise.all([
        getEventsByEventType("ColonyInitialised"),
        getEventsByEventType("DomainAdded"),
        // TODO: Here we hit insura rate limit (429 Too Many Requests)?
        // getEventsByEventType("PayoutClaimed"),
        getEventsByEventType("TaskRoleUserSet"),
      ]);

      const sortedEventLogs = eventLogs
        .flat()
        .sort((a, b) => b.logTime - a.logTime);

      setEvents(sortedEventLogs);

      setIsLoading(false);
    }

    load();
  }, [setError]);

  return {
    error,
    events,
    loading,
  };
}
