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

const ReadTickets = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useList({ resource: "tickets" });

  const ticketData = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Tickets
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CustomButton
            title="Add Ticket"
            handleClick={() => navigate("/tickets/create")}
            backgroundColor="#475be8"
            color="#fcfcfc"
            icon={<Add />}
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
          <TableContainer
          // component={Link}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">title</TableCell>
                  <TableCell align="right">id</TableCell>
                  <TableCell align="right">creator</TableCell>
                  <TableCell align="right">project</TableCell>
                </TableRow>
              </TableHead>
              {ticketData.map((ticket) => (
                <>
                  <TicketCard
                    key={ticket._id}
                    id={ticket._id}
                    title={ticket.title}
                    description={ticket.description}
                    creator={ticket.creator}
                  />
                </>
              ))}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default ReadTickets;
