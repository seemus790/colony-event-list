import { Log } from "@ethersproject/abstract-provider";
import { LogDescription } from "@ethersproject/abi/lib/interface";

interface Event {
  logTime: number;
  rawLog: Log;
  parsedLog: LogDescription;
}

export interface ColonyInitialisedEvent extends Event {
  type: "ColonyInitialised";
}

export interface DomainAddedEvent extends Event {
  type: "DomainAdded";
}

export interface PayoutClaimedEvent extends Event {
  type: "PayoutClaimed";
}

export interface ColonyRoleSetEvent extends Event {
  type: "ColonyRoleSet";
}

export type ColonyEvent =
  | ColonyInitialisedEvent
  | DomainAddedEvent
  | PayoutClaimedEvent
  | ColonyRoleSetEvent;
