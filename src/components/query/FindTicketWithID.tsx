import { useList } from "@pankod/refine-core";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  creator: string;
  priority: string;
  __v: number;
}

function FindTicketWithID(id: string) {
  const { data, isLoading, isError } = useList<Ticket>({
    resource: "tickets",
  });
  const ticketData = data?.data ?? [];
  const ticket = ticketData.find((ticket) => ticket._id === id);

  return ticket ? ticket.title : "";
}

export default FindTicketWithID;
