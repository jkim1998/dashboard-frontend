import { Typography, Box } from "@pankod/refine-mui";
import TotalNumbers from "./TotalNumbers";
import TicketGraph from "./TicketGraph";
import Banners from "./Banners";
import PieCharts from "./TicketPieCharts";
import LatestProjects from "./LatestProjects";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user") as string);

  return (
    <>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          {user ? `Welcome ${user.name}` : "Dashboard"}
        </Typography>
        <Banners />

        <Box mt="20px" display="flex" flexWrap="wrap" gap={3}>
          <TicketGraph />
          <TotalNumbers />
        </Box>
        <PieCharts />
        <LatestProjects />
      </Box>
    </>
  );
};

export default Home;
