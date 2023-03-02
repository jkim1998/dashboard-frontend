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

interface TicketDetailsProps {
  id: string;
  title: string;
  description: string;
  creator: string;
  priority: string;
  project: string;
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
    project,
  }: TicketDetailsProps) => {
    const ticketArr = [id, title, description, creator, priority, project].map(
      String
    );
    setTicketID(ticketArr);
    if (ticketID) {
      console.log("asdfasd: ", ticketID);
    }
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
          }}
        >
          <TableContainer
            style={{ width: "100%" }}
            // component={Link}
          >
            <Table>
              <TableHead style={{ width: "100%" }}>
                <TableCell
                  align="center"
                  style={{
                    width: "4%",
                    backgroundColor: "green",
                  }}
                >
                  id
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: "6%",
                    backgroundColor: "red",
                  }}
                >
                  priority
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: "10%",
                    backgroundColor: "blue",
                  }}
                >
                  title
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: "20%",
                    backgroundColor: "yellow",
                  }}
                >
                  project
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: "40%",
                    backgroundColor: "brown",
                  }}
                >
                  Summary
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: "20%",
                    backgroundColor: "skyblue",
                  }}
                >
                  creator
                </TableCell>
              </TableHead>
            </Table>
            {ticketData.map((ticket) => (
              <Table key={ticket._id}>
                <TicketCard
                  id={ticket._id}
                  title={ticket.title}
                  description={ticket.description}
                  creator={ticket.creator}
                  priority={ticket.priority}
                  project={ticket.project}
                  onClick={() =>
                    showDetail({
                      id: ticket._id,
                      title: ticket.title,
                      description: ticket.description,
                      creator: ticket.creator,
                      priority: ticket.priority,
                      project: ticket.project,
                    })
                  }
                />
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
            project={ticketID?.[5]}
          />
        )}
      </Box>
    </>
  );
};

export default ReadTickets;
