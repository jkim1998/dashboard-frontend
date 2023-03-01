import React, { useState } from "react";
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

import { Link } from "@pankod/refine-react-router-v6";
import { ProjectCard, CustomButton, TicketCard } from "components";
import { Error, Loading } from "../index";

import TicketDetails from "./TicketDetails";

const ReadTickets = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useList({ resource: "tickets" });
  const [ticketID, setTicketID] = useState();
  const [showDetail, setDetail] = useState(false);

  const ticketData = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const toggleDetail = () => {
    setDetail(!showDetail);
  };

  return (
    <>
      <Box height="50%">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            Tickets
          </Typography>
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
            {ticketData.map((ticket) => (
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              component={Link}
              to={`/projects/show/${ticket._id}`}
            >
              {/* <TableHead>
                <TableRow>
                  <TableCell align="right">priority</TableCell>
                  <TableCell align="right">title</TableCell>
                  <TableCell align="right">id</TableCell>
                  <TableCell align="right">creator</TableCell>
                  <TableCell align="right">project</TableCell>
                </TableRow>
              </TableHead> */}
                <>
                  <TicketCard
                    key={ticket._id}
                    id={ticket._id}
                    title={ticket.title}
                    description={ticket.description}
                    creator={ticket.creator}
                    priority={ticket.priority}
                  />
                </>
            </Table>
              ))}
          </TableContainer>
        </Box>
      </Box>
      <Box height="50%">
        <TicketDetails />
      </Box>
    </>
  );
};

export default ReadTickets;
