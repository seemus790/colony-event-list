import { ColonyRole } from "@colony/colony-js";
import { useEventDateTime } from "../../hooks/useEventDateTime";
import { ColonyRoleSetEvent } from "../../types/colonyEvent";

interface UseColonyRoleSetEventCardOptions {
  event: ColonyRoleSetEvent;
}

export const useColonyRoleSetEventCard = ({
  event,
}: UseColonyRoleSetEventCardOptions) => {
  const { date } = useEventDateTime({ event });
  const role = ColonyRole[event.parsedLog.args.role];
  const userAddress = event.parsedLog.args.user;
  const domainId = event.parsedLog.args.domainId.toString();

  return {
    date,
    domainId,
    role,
    userAddress,
  };
};
