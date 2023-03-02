import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  ProjectCard,
} from "components";
import { Banner } from "../../components";
const Users = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });
  const userData = data?.data ?? [];

  return <Typography fontWeight={700}>{userData.length}</Typography>;
};

export default Users;
