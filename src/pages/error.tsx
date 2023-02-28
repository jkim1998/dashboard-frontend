import React from "react";
import { Box, CircularProgress, Typography } from "@pankod/refine-mui";

const Error = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    //   height="100%"
      width="100%"
      bgcolor="black"
    >
      <Typography>500 Server Error</Typography>
      <Typography>Opps, something went wrong.</Typography>
      <Typography>
        Try refreshing the page and if it still doesn't work,
      </Typography>
      <Typography>please contact Jonathankim980@gmail.com</Typography>
    </Box>
  );
};

export default Error;
