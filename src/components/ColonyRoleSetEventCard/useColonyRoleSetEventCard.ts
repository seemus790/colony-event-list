import { ColonyRole } from "@colony/colony-js";
import { ColonyRoleSetEvent } from "../../types/colonyEvent";

interface UseColonyRoleSetEventCardOptions {
  event: ColonyRoleSetEvent;
}

export const useColonyRoleSetEventCard = ({
  event,
}: UseColonyRoleSetEventCardOptions) => {
  const role = ColonyRole[event.parsedLog.args.role];
  const userAddress = event.parsedLog.args.user;
  const domainId = event.parsedLog.args.domainId.toString();

  return {
    role,
    userAddress,
    domainId,
  };
};
