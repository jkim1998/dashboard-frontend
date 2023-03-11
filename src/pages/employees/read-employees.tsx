import { useList } from "@pankod/refine-core";
import { useState } from "react";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { UserCard, CustomButton } from "components";
import { Error, Loading } from "../index";

const PAGE_SIZE = 5;

const Agents = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useList({ resource: "users" });

  const allEmployees = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const employeesToShow = allEmployees.slice(startIdx, endIdx);

  const numPages = Math.ceil(allEmployees.length / PAGE_SIZE);
  const pageButtons = Array.from({ length: numPages }, (_, i) => i + 1);

  const totalPage = Math.ceil(allEmployees.length / PAGE_SIZE);
  console.log(totalPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box>
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

        <Box mt="20px" display="flex" justifyContent="center">
          <CustomButton
            title="<"
            handleClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            backgroundColor="#475BE8"
            color="#FCFCFC"
          />
          {pageButtons.map((page) => (
            <CustomButton
              key={page}
              title={page.toString()}
              handleClick={() => setCurrentPage(page)}
              backgroundColor={currentPage === page ? "#475BE8" : "#FCFCFC"}
              color={currentPage === page ? "#FCFCFC" : "#475BE8"}
            />
          ))}
          <CustomButton
            title=">"
            handleClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPage}
            backgroundColor="#475BE8"
            color="#FCFCFC"
          />
        </Box>
      </Box>
    </>
  );
};

export default Agents;
