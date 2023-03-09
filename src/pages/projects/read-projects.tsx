import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  bgcolor,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useEffect, useMemo } from "react";

import { ProjectCard, CustomButton } from "components";

import { Error, Loading } from "../index";
import { response } from "express";

const ReadProjects = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allProjects = data?.data ?? [];

  const numTicket = sorter.find((item) => item.field === "numticket")?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: numTicket === "asc" ? "desc" : "asc" }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      projectType:
        logicalFilters.find((item) => item.field === "projectType")?.value ||
        "",
    };
  }, [filters]);
  // useEffect(() => {
  //   const numProject = async () => {
  //     const response = await fetch("http://localhost:8080/api/v1/projects");
  //     const totalCount = response.headers.get("x-total-count");
  //     console.log(totalCount);
  //   };

  //   numProject();
  // }, []);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%">
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProjects.length ? "There are no projects" : "All projects"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              <CustomButton
                title={`Sort  ${numTicket === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("")}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilterValues.projectType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "projectType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {["Front End", "Back End", "Full Stack", "UI/UX"].map(
                  (type) => (
                    <MenuItem
                      key={type}
                      value={type
                        .trim()
                        .replace("/", "")
                        .replace(/\s+/g, "")
                        .toLowerCase()}
                    >
                      {type}
                    </MenuItem>
                  )
                )}
              </Select>
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <CustomButton
                title="Add Project"
                handleClick={() => navigate("/projects/create")}
                backgroundColor="#475be8"
                color="#fcfcfc"
                icon={<Add />}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        maxHeight="100%"
      >
        <Box
          my="20px"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 3,
            "@media (max-width: 768px)": {
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            },
            "@media (max-width: 480px)": {
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            },
          }}
        >
          {allProjects?.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.title}
              github={project.github}
              preview={project.preview}
              description={project.description}
              projectType={project.projectType}
              tag={project.tag}
              photo={project.photo}
              lead={project.lead}
              members={project.members}
            />
          ))}
        </Box>
      </Box>

      {allProjects.length > 0 && (
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={3}
          flexWrap="wrap"
        >
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
          >
            Page
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={(e) =>
              setPageSize(e.target.value ? Number(e.target.value) : 10)
            }
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default ReadProjects;
