import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  ProjectCard,
} from "components";
import { Banner } from "../../components";
const Tickets = () => {
  const { data, isLoading, isError } = useList({
    resource: "tickets",
  });
  const ticketData = data?.data ?? [];
  return <Typography fontWeight={700}>{ticketData.length}</Typography>;
};

export default Tickets;
