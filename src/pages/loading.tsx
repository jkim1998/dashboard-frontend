import { Box, CircularProgress } from "@pankod/refine-mui";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
