import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";

import { Profile } from "components";

import { Error, Loading } from "../index";
const EmployeeProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });


  const myProfile = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Profile
      type="Employee"
      id={myProfile._id}
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      projects={myProfile.allProjects}
      phone={myProfile.phone}
      location={myProfile.location}
    />
  );
};

export default EmployeeProfile;
