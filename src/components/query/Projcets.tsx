import { useList } from "@pankod/refine-core";
import { Typography } from "@pankod/refine-mui";
import { Banner } from "../../components";
const Projects = () => {
  const { data, isLoading, isError } = useList({
    resource: "projects",
  });
  const projectData = data?.data ?? [];
  return <Typography fontWeight={700}>{projectData.length}</Typography>;
};

export default Projects;
