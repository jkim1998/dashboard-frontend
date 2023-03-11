import { useList } from "@pankod/refine-core";
import { Typography, Box } from "@pankod/refine-mui";
import { ProjectCard } from "components";
import { Error, Loading } from "../index";

const LatestProjects = () => {
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
  );
};

export default LatestProjects;
