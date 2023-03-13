import { Box, Pagination, Stack, Typography } from "@pankod/refine-mui";
import { MdEngineering, MdGroups2 } from "react-icons/md";
import { IoMdContact, IoMdPerson } from "react-icons/io";
import { useList, HttpError } from "@pankod/refine-core";
import { Error, Loading } from "../index";

interface Project {
  _id: string;
  title: string;
  description: string;
}

interface Ticket {
  _id: string;
  title: string;
  description: string;
}

interface User {
  _id: string;
  name: string;
  role: string;
}

const columnBorder = {
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid #669999",
  paddingBottom: 1,
};

const iconBox = {
  border: "1px solid #669999",
  borderRadius: "10px",
  padding: 1,
  marginRight: 1,
};

const stackColumn = {
  direction: "column",
  paddingLeft: 1,
};

const font = {
  fontWeight: 700,
};

const TotalNumbers = () => {
  const {
    data: TotalProject,
    isLoading,
    error,
  } = useList<Project>({ resource: "projects" });

  const { data: TotalTicket } = useList<Ticket>({ resource: "tickets" });
  const { data: TotalUser } = useList<User>({
    resource: "users",
    config: {
      hasPagination: false,
    },
  });
  const { data: Admin } = useList<User, HttpError>({
    resource: "users",
    config: {
      hasPagination: false,
      filters: [{ field: "role", operator: "eq", value: "admin" }],
    },
  });
  const { data: Developer } = useList<User>({
    resource: "users",
    config: {
      hasPagination: false,
      filters: [
        {
          field: "role",
          operator: "eq",
          value: "admin",
        },
      ],
    },
  });
  const { data: projectManagers } = useList<User>({
    resource: "users",
    config: {
      pagination: {
        pageSize: 1,
      },
      filters: [{ field: "role", operator: "eq", value: "project manager" }],
    },
  });

  const project: Project[] = TotalProject?.data ?? [];
  const ticket: Ticket[] = TotalTicket?.data ?? [];
  const user: User[] = TotalUser?.data ?? [];
  const admin: User[] = Admin?.data ?? [];
  const dev: User[] = Developer?.data ?? [];
  const projectManager = projectManagers?.data?.[0];

  console.log("admin:", admin);
  // console.log("user:", user.length);
  // console.log("dev:", dev.length);
  // console.log("on:", pm.length);
  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const userRole = [
    {
      icon: <IoMdContact style={{ fontSize: 30 }} />,
      role: "Project Manager",
      data: "Jonathan Kim",
      // data: projectManager?.name,
    },
    {
      icon: <MdEngineering style={{ fontSize: 30 }} />,
      role: "Developers",
      data: dev.length,
    },
    {
      icon: <IoMdPerson style={{ fontSize: 30 }} />,
      role: "Admin",
      data: admin.length,
    },
    {
      icon: <MdGroups2 style={{ fontSize: 30 }} />,
      role: "Users",
      data: user.length,
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      borderRadius="15px"
      minWidth={490}
      p={4}
      bgcolor="#fcfcfc"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Users by role
      </Typography>

      <Stack marginTop="20px" direction="column" gap={4}>
        {userRole.map((data) => (
          <Box sx={{ ...columnBorder }} key={data.role}>
            <Box sx={{ ...iconBox }}>{data.icon}</Box>
            <Stack sx={{ ...stackColumn }}>
              <Typography sx={{ ...font }}>{data.role}</Typography>
              <Typography sx={{ ...font }}>{data.data}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TotalNumbers;
