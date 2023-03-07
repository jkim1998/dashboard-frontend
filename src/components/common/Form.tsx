import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from "@pankod/refine-mui";

import { useNavigate } from "@pankod/refine-react-router-v6";
import { FormProps } from "interfaces/common";
import { useList } from "@pankod/refine-core";
import CustomButton from "./CustomButton";

const Form = ({
  title,
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  photoUrl,
}: FormProps) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useList({ resource: "projects" });

  const allProjects = data?.data ?? [];
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        <CustomButton
          title="<"
          handleClick={() => navigate(`/${title}s`)}
          backgroundColor="#475be8"
          color="#fcfcfc"
        />
        {type} a {title}
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          {title !== "user" && (
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                  textTransform: "capitalize",
                }}
              >
                title
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("title", { required: true })}
              />
            </FormControl>
          )}
          {title === "project" && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              gap="100px"
            >
              <Box width="50%">
                {/* <FormControl> */}
                <FormHelperText
                  sx={{
                    width: "100%",
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                    textTransform: "capitalize",
                  }}
                >
                  github link
                </FormHelperText>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("github", { required: false })}
                />
                {/* </FormControl> */}
              </Box>
              <Box width="50%">
                {/* <FormControl> */}
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                    textTransform: "capitalize",
                  }}
                >
                  preview link
                </FormHelperText>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("preview", { required: false })}
                />
                {/* </FormControl> */}
              </Box>
            </Box>
          )}
          {title !== "user" && (
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                  textTransform: "capitalize",
                }}
              >
                description
              </FormHelperText>
              <TextareaAutosize
                minRows={5}
                required
                placeholder="Write description"
                color="info"
                style={{
                  width: "100%",
                  background: "transparent",
                  fontSize: "16px",
                  borderColor: "rgba(0,0,0,0.23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("description", { required: true })}
              />
            </FormControl>
          )}
          {title === "ticket" && (
            <>
              <Stack direction="row" gap={4}>
                <FormControl sx={{ flex: 1 }}>
                  <FormHelperText
                    sx={{
                      fontWeight: 500,
                      margin: "10px 0",
                      fontSize: 16,
                      color: "#11142d",
                    }}
                  >
                    Priority
                  </FormHelperText>
                  <Select
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    defaultValue="low"
                    {...register("priority", {
                      required: true,
                    })}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" gap={4}>
                <FormControl sx={{ flex: 1 }}>
                  <Select
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    defaultValue=""
                    {...register("project", {
                      required: true,
                    })}
                  >
                    {allProjects.map((project) => (
                      <MenuItem value={project._id}>{project.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </>
          )}
          {title === "project" && (
            <>
              <Stack direction="row" gap={4}>
                <FormControl sx={{ flex: 1 }}>
                  <FormHelperText
                    sx={{
                      fontWeight: 500,
                      margin: "10px 0",
                      fontSize: 16,
                      color: "#11142d",
                      textTransform: "capitalize",
                    }}
                  >
                    {title} type
                  </FormHelperText>
                  <Select
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    defaultValue="frontend"
                    {...register("projectType", {
                      required: true,
                    })}
                  >
                    <MenuItem value="frontend">Front End</MenuItem>
                    <MenuItem value="backend">Back End</MenuItem>
                    <MenuItem value="fullstack">Full Stack</MenuItem>
                    <MenuItem value="uiux">UI/UX</MenuItem>
                    <MenuItem value="etc">Others</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                    textTransform: "capitalize",
                  }}
                >
                  project owner
                </FormHelperText>
                <Select
                  variant="outlined"
                  color="info"
                  displayEmpty
                  required
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue=""
                  {...register("lead", {
                    required: true,
                  })}
                >
                  <MenuItem value="63f9232a4aecb8b197fe2435">
                    Jonathan Kim
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                    textTransform: "capitalize",
                  }}
                >
                  members
                </FormHelperText>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("members", { required: false })}
                />
              </FormControl>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                    textTransform: "capitalize",
                  }}
                >
                  tag
                </FormHelperText>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("tag", { required: false })}
                />
              </FormControl>
            </>
          )}

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                {title === "project" && "Project Photo"}
                {title === "ticket" && "Screenshot"}
                {title === "user" && "Avatar"}
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "white",
                  textTransform: "capitalize",
                  fontSize: 16,
                  background: "#2ed480",
                  "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                    background: "#dadefa",
                    transition: "all 0.4s ease-in-out",
                  },
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              name: {photoUrl.name}
            </Typography>
          </Stack>

          {/* user  */}
          {title === "user" && (
            <>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                    textTransform: "capitalize",
                  }}
                >
                  Name
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("name", { required: true })}
                />
              </FormControl>
              <Stack>
                <FormControl>
                  <FormHelperText
                    sx={{
                      fontWeight: 500,
                      margin: "10px 0",
                      fontSize: 16,
                      color: "#11142d",
                      textTransform: "capitalize",
                    }}
                  >
                    Email
                  </FormHelperText>
                  <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    color="info"
                    variant="outlined"
                    {...register("email", { required: true })}
                  />
                </FormControl>

                <FormControl>
                  <FormHelperText
                    sx={{
                      fontWeight: 500,
                      margin: "10px 0",
                      fontSize: 16,
                      color: "#11142d",
                      textTransform: "capitalize",
                    }}
                  >
                    Phone
                  </FormHelperText>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    color="info"
                    variant="outlined"
                    {...register("phone", { required: false })}
                  />
                </FormControl>
              </Stack>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                    textTransform: "capitalize",
                  }}
                >
                  Location
                </FormHelperText>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("location", { required: false })}
                />
              </FormControl>
            </>
          )}

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
