import { Add } from "@mui/icons-material";
import { useList } from "@pankod/refine-core";
import { useTable } from "@pankod/refine-core";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";

import { ProjectCard, CustomButton, TicketCard } from "components";
import { Error, Loading } from "../index";
import { ProjectImage } from "assets";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useList({ resource: "tickets" });

  const ticketData = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <Box
      borderRadius="15px"
      padding="20px"
      marginTop={5}
      bgcolor="#FCFCFC"
      width="100%"
      max-height="80%"
    >
      <Stack display="flex" flexDirection="row" marginLeft={5} gap={5}>
        <Typography marginBottom={5}>Ticket #</Typography>
        <Typography>Priority</Typography>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        bgcolor="red"
        width="100%"
        gap={5}
      >
        <img src={ProjectImage} width={350} />
        <Typography>Ticket#</Typography>
        <Typography>Description</Typography>
        <Typography>Creator</Typography>
        <Typography>Project#</Typography>
      </Stack>
    </Box>
  );
};

export default TicketDetails;
