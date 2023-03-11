import { useList } from "@pankod/refine-core";
import { Typography } from "@pankod/refine-mui";
const Tickets = () => {
  const { data, isLoading, isError } = useList({
    resource: "tickets",
  });
  const ticketData = data?.data ?? [];
  return <Typography fontWeight={700}>{ticketData.length}</Typography>;
};

export default Tickets;
