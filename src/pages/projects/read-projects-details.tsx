/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";

import { CustomButton } from "components";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const projectDetails = data?.data ?? {};
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === projectDetails.lead.email;

  const handleDeleteProject = () => {
    const response = confirm("Are you sure you want to delete this project?");
    if (response) {
      mutate(
        {
          resource: "projects",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/projects");
          },
        }
      );
    }
  };

  return (
    <Box borderRadius="15px" padding="20px" bgcolor="#FCFCFC" width="100%">
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Details
      </Typography>

      <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
        <CustomButton
          title={!isCurrentUser ? "Message" : "Edit"}
          backgroundColor="#475BE8"
          color="#FCFCFC"
          fullWidth
          icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
          handleClick={() => {
            if (isCurrentUser) {
              navigate(`/projects/edit/${projectDetails._id}`);
            }
          }}
        />
        <CustomButton
          title={!isCurrentUser ? "Call" : "Delete"}
          backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
          color="#FCFCFC"
          fullWidth
          icon={!isCurrentUser ? <Phone /> : <Delete />}
          handleClick={() => {
            if (isCurrentUser) handleDeleteProject();
          }}
        />
      </Stack>
      <Box
        mt="20px"
        display="flex"
        // flexDirection={{ xs: "column", lg: "row" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
        width="100%"
      >
        <Box
          flex={1}
          flexDirection="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={projectDetails.photo}
            alt="project_details-img"
            width="100%"
            style={{ objectFit: "cover", borderRadius: "10px" }}
            className="project_details-img"
          />

          <Box mt="15px">
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142D"
                textTransform="capitalize"
              >
                {projectDetails.projectType}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  {projectDetails.title}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color="#808191">
                    {projectDetails.location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  1111111
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">
                    bbbbb
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191">
                {projectDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        ></Box>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
