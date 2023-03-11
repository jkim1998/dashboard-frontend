import { useList } from "@pankod/refine-core";
import { Typography } from "@pankod/refine-mui";
export const CountUsers = () => {
  const { data, isLoading, isError } = useList({
    resource: "projects",
    config: {
      filters: [
        {
          field: "title",
          operator: "contains",
          value: "project",
        },
      ],
      pagination: {
        pageSize: 13,
      },
    },
  });
  const userData = data?.data ?? [];
  return <Typography fontWeight={700}>{userData.length}</Typography>;
};

export const Users = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });
  const userData = data?.data ?? [];

  return <Typography fontWeight={700}>{userData.length}</Typography>;
};
