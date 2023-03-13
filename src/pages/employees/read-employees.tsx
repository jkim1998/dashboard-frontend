import { useList } from "@pankod/refine-core";
import { useState } from "react";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useDelete } from "@pankod/refine-core";
import { UserCard, CustomButton } from "components";
import { Error, Loading } from "../index";

const Agents = () => {
  const navigate = useNavigate();
  const { mutate } = useDelete();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError } = useList({
    resource: "users",
    config: {
      pagination: {
        current,
        pageSize,
      },
    },
  });
  const { data: TotalUser } = useList({
    resource: "users",
    config: {
      hasPagination: false,
    },
  });
  const allEmployees = data?.data ?? [];
  // const user = data?.total ?? 0;
  const user = TotalUser?.data ?? [];
  const totalUser = user.length;

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const startIdx = (current - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const employeesToShow = allEmployees.slice(startIdx, endIdx);

  const numPages = Math.ceil(totalUser / pageSize);
  const pageButtons = Array.from({ length: numPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <>
      <Box height="100%">
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            Employee List
          </Typography>
          <CustomButton
            title="Create User"
            handleClick={() => navigate("/register")}
            backgroundColor="#475BE8"
            color="#FCFCFC"
          />
        </Stack>
        <Stack>
          <Box
            mt="20px"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              backgroundColor: "#fcfcfc",
            }}
          >
            {employeesToShow.map((employee) => (
              <UserCard
                key={employee._id}
                id={employee._id}
                name={employee.name}
                email={employee.email}
                avatar={employee.avatar}
                numProject={employee.allProjects.length}
                phone={employee.phone}
                location={employee.location}
                role={employee.role}
              />
            ))}
          </Box>
        </Stack>
        <Box mt="20px" display="flex" justifyContent="center">
          <CustomButton
            title="<"
            handleClick={() => handlePageChange(current - 1)}
            disabled={current <= 1}
            backgroundColor={current <= 1 ? "#FFFFFF" : "#475BE8"}
            color="#FCFCFC"
          />
          {pageButtons.map((page) => (
            <CustomButton
              key={page}
              title={page.toString()}
              handleClick={() => setCurrent(page)}
              backgroundColor={current === page ? "#475BE8" : "#FCFCFC"}
              color={current === page ? "#FCFCFC" : "#475BE8"}
            />
          ))}
          <CustomButton
            title=">"
            handleClick={() => handlePageChange(current + 1)}
            disabled={current >= numPages}
            backgroundColor={current >= numPages ? "#FFFFFF" : "#475BE8"}
            color="#FCFCFC"
          />
        </Box>
      </Box>
    </>
  );
};

export default Agents;
