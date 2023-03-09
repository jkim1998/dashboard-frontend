import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { Error, Loading } from "./index";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  ProjectCard,
} from "components";

import { Projects, CountUsers, Tickets } from "../components/query";
interface Project {
  _id: string;
  title: string;
  description: string;
}
const Home = () => {
  const {
    data: aaa,
    isLoading: loadingProject,
    error: errorProject,
  } = useList<Project>({ resource: "projects" });

  const allProjects: Project[] = aaa?.data ?? [];
  const { data, isLoading, isError } = useList({
    resource: "projects",
    config: {
      pagination: {
        pageSize: 3,
      },
    },
  });
  const projectData = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <Box
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#6699ff"
          color="#ffffff"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          borderRadius="10px"
          minHeight="110px"
        >
          <Projects />
          <Typography>Active Projects</Typography>
        </Box>
        <Box
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#ffcc00"
          color="#ffffff"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          borderRadius="10px"
          minHeight="110px"
        >
          <Tickets />
          <Typography>Unassigned Tickets</Typography>
        </Box>
        <Box
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#66ff66"
          color="#ffffff"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          borderRadius="10px"
          minHeight="110px"
        >
          <Tickets />
          <Typography>Completed Tickets</Typography>
        </Box>
        <Box
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#ff6600"
          color="#ffffff"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          borderRadius="10px"
          minHeight="110px"
        >
          <Typography fontWeight={700}>34563</Typography>
          <Typography>Analytics</Typography>
        </Box>
      </Box>
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={3}>
        <PieChart
          title="Ticket Completion"
          series={[65, 25, 10]}
          colors={["#009933", "#ff0066", "#e7e713"]}
          labels={["completed", "in progress", "new"]}
        />
        <PieChart
          title="Ticket by type"
          series={[50, 40, 10]}
          colors={["#33cc33", "#9933ff", "#0000cc"]}
          labels={["Function Failure", "UI/UX", "others"]}
        />
        <PieChart
          title="Ticekts by Priority"
          series={[5, 25, 70]}
          colors={["#000000", "#ff0000", "#e7e713"]}
          labels={["urgent", "high", "low"]}
        />
      </Box>
      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Projects
        </Typography>
        <Box
          mt={2.5}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {projectData.map((property) => (
            <ProjectCard
              key={property._id}
              id={property._id}
              title={property.title}
              description={property.description}
              github={property.github}
              preview={property.preview}
              tag={property.tag}
              projectType={property.projectType}
              members={property.members}
              photo={property.photo}
              lead={property.lead}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
