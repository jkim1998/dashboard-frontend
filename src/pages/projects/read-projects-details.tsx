import React, { useState } from "react";
/* eslint-disable no-restricted-globals */
import { Avatar, Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";

import { CustomButton } from "components";
import { Error, Loading } from "../index";

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
  const [dropdown, setDropdown] = useState(false);

  const { data, isLoading, isError } = queryResult;

  const projectDetails = data?.data ?? {};
  console.log(data);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

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

  const toggleDropDown = () => {
    setDropdown(!dropdown);
  };

  return (
    <Box borderRadius="15px" padding="20px" bgcolor="#FCFCFC" width="100%">
      <Box>
        <Typography
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          fontSize={25}
          fontWeight={700}
          color="#11142D"
        >
          <CustomButton
            title={"<"}
            backgroundColor={"blue"}
            color="#FCFCFC"
            handleClick={() => {
              navigate("/projects");
            }}
          />
          {projectDetails.title}
          <CustomButton
            title={""}
            backgroundColor={"#d42e2e"}
            color="#FCFCFC"
            icon={dropdown ? <ArrowDropUp /> : <ArrowDropDown />}
            handleClick={() => {
              toggleDropDown();
            }}
          />
        </Typography>
        {dropdown && (
          <Stack
            mt="25px"
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            flexWrap="wrap"
            gap={2}
          >
            <CustomButton
              title={!isCurrentUser ? "Message" : "Edit"}
              backgroundColor="#475BE8"
              color="#FCFCFC"
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
              icon={!isCurrentUser ? <Phone /> : <Delete />}
              handleClick={() => {
                if (isCurrentUser) handleDeleteProject();
              }}
            />
          </Stack>
        )}
      </Box>
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
                {projectDetails.title}
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
                  textTransform="capitalize"
                >
                  {projectDetails.projectType}
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column">
                <Stack
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Avatar src={projectDetails.lead.avatar} />
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">
                    {projectDetails.lead.name}
                  </Typography>
                </Stack>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  {projectDetails.members.map((n: any) => (
                    <Typography fontSize={14} color="#808191">
                      {n}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              {projectDetails.github && (
                <Typography>github: {projectDetails.github}</Typography>
              )}
              {projectDetails.preview && (
                <Typography>preview: {projectDetails.preview}</Typography>
              )}
            </Stack>
            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description:
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
