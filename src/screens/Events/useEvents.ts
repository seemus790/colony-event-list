import { useEffect, useState } from "react";
import { getColonyClient, getLogs } from "@colony/colony-js";
import { geColonytClient } from "../../helpers/geColonytClient";
import { LogDescription } from "@ethersproject/abi/lib/interface";
import { Log } from "@ethersproject/abstract-provider";

export function useEvents() {
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [events, setEvents] = useState<
    {
      rawEventLog: Log;
      parsedEventLog: LogDescription;
    }[]
  >([]);

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      const client = await geColonytClient();
      const eventFilter = client.filters.PayoutClaimed();
      const eventLogs = await getLogs(client, eventFilter);
      const parsedLogs = eventLogs.map((eventLog) => ({
        rawEventLog: eventLog,
        parsedEventLog: client.interface.parseLog(eventLog),
      }));

      setEvents(parsedLogs);

      console.log({ parsedLogs });

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
