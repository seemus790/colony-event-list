import { ColonyEvent } from "../types/colonyEvent";

interface UseEventDateTimeOptions {
  event: ColonyEvent;
}

export const useEventDateTime = ({ event }: UseEventDateTimeOptions) => {
  const date = new Date(event.logTime);
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });

  return {
    date: `${day} ${month}`,
  };
};
