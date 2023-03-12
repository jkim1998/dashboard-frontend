import { Box, Stack, Typography } from "@pankod/refine-mui";
import { MdEngineering, MdGroups2 } from "react-icons/md";
import { IoMdContact, IoMdPerson } from "react-icons/io";
import { useList } from "@pankod/refine-core";
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
  title: string;
  description: string;
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
  const { data: TotalUser } = useList<User>({ resource: "users" });
  const { data: developers } = useList<User>({ resource: "users" });
  const { data: ProjectManager } = useList<User>({ resource: "users" });

  const project: Project[] = TotalProject?.data ?? [];
  const ticket: Ticket[] = TotalTicket?.data ?? [];
  const user: User[] = TotalUser?.data ?? [];
  const dev: User[] = developers?.data ?? [];
  const pm: User[] = ProjectManager?.data ?? [];

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const userRole = [
    {
      icon: <IoMdContact style={{ fontSize: 30 }} />,
      role: "Project Manager",
      data: "Jonathan Kim",
    },
    {
      icon: <MdEngineering style={{ fontSize: 30 }} />,
      role: "Developers",
      data: 999,
    },
    {
      icon: <IoMdPerson style={{ fontSize: 30 }} />,
      role: "Admin",
      data: 999,
    },
    { icon: <MdGroups2 style={{ fontSize: 30 }} />, role: "Users", data: 999 },
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
