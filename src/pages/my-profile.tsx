import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile } from "components";
import { Error, Loading } from "./index";

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });
  console.log("qq", user);
  const myProfile = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const user1 = JSON.parse(localStorage.getItem("user") as string);
  console.log(user1);
  return (
    <>
      <Profile
        type="My"
        name={myProfile.name}
        email={myProfile.email}
        avatar={myProfile.avatar}
        projects={myProfile.allProjects}
        phone={myProfile.phone}
        location={myProfile.location}
      />
    </>
  );
};

export default MyProfile;
