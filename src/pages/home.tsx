import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  ProjectCard,
} from "components";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "projects",
    config: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  const projectData = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

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
          bgcolor="#fcfcfc"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          borderRadius="0px"
          minHeight="110px"
        >
          <Typography>16</Typography>
          <Typography>Active Projects</Typography>
        </Box>
        <Box
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#fcfcfc"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          minHeight="110px"
        >
          <Typography>99</Typography>
          <Typography>Total Tickets</Typography>
        </Box>
        <Box
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#fcfcfc"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          minHeight="110px"
        >
          <Typography>14</Typography>
          <Typography>Unassigned Tickets</Typography>
        </Box>
        <Box
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#fcfcfc"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={2}
          gap={2}
          minHeight="110px"
        >
          <Typography>34563</Typography>
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
          value={684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Ticket Assignment"
          value={550}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Ticekts by Priority"
          value={5684}
          series={[65, 25, 10]}
          colors={["#275be8", "#c4e8ef", "red"]}
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
              description={property.photo}
              github={property.photo}
              preview={property.photo}
              tag={property.photo}
              projectType={property.photo}
              members={property.photo}
              photo={property.photo}
              lead={property.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
