import { useList } from "@pankod/refine-core";
import { Typography, Box } from "@pankod/refine-mui";
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

const boxStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  py: 2,
  gap: 2,
  borderRadius: "10px",
  minHeight: "110px",
  fontSize: 14,
  color: "#ffffff",
  fontWeight: 800,
};

const font = {
  fontWeight: 900,  
  color: "white",
  textShadow: "2px 2px 4px #000000",
};

const Banners = () => {
  const {
    data: TotalProject,
    isLoading,
    error,
  } = useList<Project>({ resource: "projects" });

  const { data: TotalTicket } = useList<Ticket>({ resource: "tickets" });
  const { data: TotalUser } = useList<User>({ resource: "users" });

  const project: Project[] = TotalProject?.data ?? [];
  const ticket: Ticket[] = TotalTicket?.data ?? [];
  const user: User[] = TotalUser?.data ?? [];

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const DataCard = [
    {
      title: "Active Projects",
      data: `${project.length}`,
      color: "#6699ff",
    },
    {
      title: "Tickets",
      data: `${ticket.length}`,
      color: "#ff9900",
    },
    {
      title: "Users",
      data: `${user.length}`,
      color: "#00cc99",
    },
    {
      title: "Analytics",
      data: 999,
      color: "#cc00cc",
    },
  ];
  return (
    <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
      {DataCard.map((data) => (
        <Box
          sx={{
            ...boxStyle,
            bgcolor: `${data.color}`,
          }}
        >
          <Typography sx={{ ...font }}>{data.data}</Typography>
          <Typography sx={{ ...font }}>{data.title}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Banners;
