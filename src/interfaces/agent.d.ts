import { BaseKey } from "@pankod/refine-core";

export interface AgentCardProp {
  id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  noOfProperties: number;
}

export interface TicketCardProp {
  id?: BaseKey | undefined;
  title: string;
  description: string;
  creator: string;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}