import { useList } from "@pankod/refine-core";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { AgentCard, CustomButton } from "components";
import { Error, Loading } from "../index";

const Agents = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useList({ resource: "users" });

  const allEmployees = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Box>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            Employee List
          </Typography>
          <CustomButton
            title="Create User"
            handleClick={() => navigate("/users/create")}
            backgroundColor="#475BE8"
            color="#FCFCFC"
          />
        </Stack>

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
              numProject={employee.allProjects.length}
              phone={employee.phone}
              location={employee.location}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Agents;
