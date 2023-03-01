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
  Button,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";

import { Link } from "@pankod/refine-react-router-v6";
import { ProjectCard, CustomButton, TicketCard } from "components";
import { Error, Loading } from "../index";

import TicketDetails from "./TicketDetails";

const styles = {
  tableHead: {
    backgroundColor: "blue",
    color: "white",
    width: "100%",
  },
  tableHead1: {
    backgroundColor: "green",
    color: "white",
    width: "100%",
  },
  tableHead2: {
    display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    backgroundColor: "purple",
    color: "white",
    width: "100%",
  },
};

interface TicketDetailsProps {
  id: string;
  title: string;
  description: string;
  creator: string;
  priority: string;
}

const ReadTickets = () => {
  const navigate = useNavigate();
  const [ticketID, setTicketID] = useState<string[] | undefined>(undefined);
  const { data, isLoading, isError } = useList({ resource: "tickets" });
  const [detail, setDetail] = useState(false);

  const ticketData = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const toggleDetail = () => {
    setDetail(!detail);
  };

  const showDetail = ({
    id,
    title,
    description,
    creator,
    priority,
  }: TicketDetailsProps) => {
    const ticketArr = [id, title, description, creator, priority].map(String);
    setTicketID(ticketArr);
    // if (ticketID) {
    //   console.log("asdfasd: ", ticketID[0]);
    // }
    setDetail(true);
  };

  const hideDetail = () => {
    setDetail(false);
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
            backgroundColor: "yellow",
          }}
        >
          <Button onClick={() => toggleDetail()}>x</Button>
          <TableContainer
            style={styles.tableHead}
            // component={Link}
          >
            <TableHead style={styles.tableHead1}>
              <TableRow style={styles.tableHead2}>
                <TableCell style={styles.tableHead1} align="right">
                  priority
                </TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">creator</TableCell>
                <TableCell align="right">project</TableCell>
              </TableRow>
            </TableHead>
            {ticketData.map((ticket) => (
              <Table key={ticket._id}>
                <TableBody>
                  <TableRow>
                    <TicketCard
                      id={ticket._id}
                      title={ticket.title}
                      description={ticket.description}
                      creator={ticket.creator}
                      priority={ticket.priority}
                      onClick={() =>
                        showDetail({
                          id: ticket._id,
                          title: ticket.title,
                          description: ticket.description,
                          creator: ticket.creator,
                          priority: ticket.priority,
                        })
                      }
                    />
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </TableContainer>
        </Box>
      </Box>
      <Box height="50%">
        {detail && (
          <TicketDetails
            onClick={hideDetail}
            id={ticketID?.[0]}
            title={ticketID?.[1]}
            description={ticketID?.[2]}
            creator={ticketID?.[3]}
            priority={ticketID?.[4]}
          />
        )}
      </Box>
    </>
  );
};

export default ReadTickets;
