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

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
  title,
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  screenshot,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
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
                    defaultValue="apartment"
                    {...register("projectType", {
                      required: true,
                    })}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
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
                    }}
                  >
                    {title} Type
                  </FormHelperText>
                  <Select
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    defaultValue="apartment"
                    {...register("projectType", {
                      required: true,
                    })}
                  >
                    <MenuItem value="frontend">Frond End</MenuItem>
                    <MenuItem value="backend">Back End</MenuItem>
                    <MenuItem value="fullstack">Full Stack</MenuItem>
                    <MenuItem value="uiux">UI/UX</MenuItem>
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
                  }}
                >
                  Tag
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("location", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  Lead
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("location", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  Members
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register("location", { required: true })}
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
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                  border: "1px solid black",
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
              {screenshot?.name}
            </Typography>
          </Stack>

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
