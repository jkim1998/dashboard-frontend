import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import { AgentCard, CustomButton } from "components";

const Agents = () => {
  const { data, isLoading, isError } = useList({ resource: "users" });

  const allEmployees = data?.data ?? [];

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Agents List
        </Typography>

        <Box
          mt="20px"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            backgroundColor: "#fcfcfc",
          }}
        >
          {allEmployees.map((employee) => (
            <AgentCard
              key={employee._id}
              id={employee._id}
              name={employee.name}
              email={employee.email}
              avatar={employee.avatar}
              noOfProperties={employee.allProperties.length}
            />
          ))}
        </Box>
        <CustomButton
          title="Create User"
          backgroundColor="#475BE8"
          color="#FCFCFC"
        />
      </Box>
    </>
  );
};

export default Agents;
