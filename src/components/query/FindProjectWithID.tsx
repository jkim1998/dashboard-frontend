import { useList } from "@pankod/refine-core";

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  photo: string;
  lead: string;
  members: any[];
  tag: any[];
  __v: number;
}

function FindProjectWithID(id: string) {
  const { data, isLoading, isError } = useList<Project>({
    resource: "projects",
  });
  const projectData = data?.data ?? [];
  const project = projectData.find((project) => project._id === id);

  return project ? project.title : "";
}

export default FindProjectWithID;
