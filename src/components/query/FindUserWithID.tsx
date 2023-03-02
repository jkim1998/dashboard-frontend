import { useList } from "@pankod/refine-core";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  allProperties: any[];
  __v: number;
}

function FindUserWithID(id: string) {
  const { data, isLoading, isError } = useList<User>({
    resource: "users",
  });
  const userData = data?.data ?? [];

  const user = userData.find((user) => user._id === id);

  return user ? user.name : "";
}

export default FindUserWithID;
