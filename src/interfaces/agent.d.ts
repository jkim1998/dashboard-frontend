import { BaseKey } from "@pankod/refine-core";

export interface AgentCardProp {
  id?: BaseKey | undefined;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  numProject: number;
}

export interface TicketCardProp {
  num?: number | undefined;
  id?: BaseKey | undefined;
  title: string;
  description: string;
  creator?: string;
  priority: string;
  project: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
