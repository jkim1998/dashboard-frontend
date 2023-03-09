import { Email, Phone, Place } from "@mui/icons-material";
import { Box, Stack, Typography } from "@pankod/refine-mui";

import { ProfileProps, ProjectProps } from "interfaces/common";
import ProjectCard from "./ProjectCard";
import { CustomButton, TicketCard } from "components";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const Profile = ({
  type,
  name,
  avatar,
  email,
  projects,
  phone,
  location,
}: ProfileProps) => (
  <Box>
    <Stack direction="row" justifyContent="space-between">
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        {type} Profile
      </Typography>
      <CustomButton
        title={"edit"}
        backgroundColor={"#d42e2e"}
        color="#FCFCFC"
        // icon={dropdown ? <ArrowDropUp /> : <ArrowDropDown />}
        handleClick={() => {
          // editTicket();
        }}
      />
    </Stack>

    <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        width="100%"
        bgcolor="blue"
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2.5,
        }}
      >
        <img
          src={
            checkImage(avatar)
              ? avatar
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
          }
          width={170}
          height={160}
          alt="user_profile"
          className="my_profile_user-img"
        />
        <Box
          flex={1}
          sx={{
            marginTop: { md: "58px" },
            marginLeft: { xs: "20px", md: "0px" },
          }}
        >
          <Box
            flex={1}
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap="20px"
          >
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="30px"
            >
              <Stack direction="column">
                <Typography fontSize={22} fontWeight={600} color="#11142D">
                  {name}
                </Typography>
                <Typography fontSize={16} color="#808191">
                  Developer
                </Typography>
              </Stack>

              <Stack direction="column" gap="30px">
                <Stack gap="15px">
                  <Typography fontSize={14} fontWeight={500} color="#808191">
                    Address
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap="10px"
                  >
                    <Place sx={{ color: "#11142D" }} />
                    <Typography fontSize={14} color="#11142D">
                      {location}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                  <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">
                      Phone Number
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="10px"
                    >
                      <Phone sx={{ color: "#11142D" }} />
                      <Typography fontSize={14} color="#11142D" noWrap>
                        {phone}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">
                      Email
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="10px"
                    >
                      <Email sx={{ color: "#11142D" }} />
                      <Typography fontSize={14} color="#11142D">
                        {email}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    {projects.length > 0 && (
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
        <Typography fontSize={18} fontWeight={600} color="#11142D">
          {type} Properties
        </Typography>

        <Box
          mt={2.5}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2.5,
          }}
        >
          {projects?.map((project: ProjectProps) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.title}
              github={project.github}
              preview={project.preview}
              description={project.description}
              projectType={project.projectType}
              members={project.members}
              tag={project.tag}
              lead={project.lead}
              photo={project.photo}
            />
          ))}
        </Box>
      </Box>
    )}
  </Box>
);

export default Profile;
