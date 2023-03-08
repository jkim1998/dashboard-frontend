import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import { useList, useOne, HttpError } from "@pankod/refine-core";
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
  TablePagination,
  Button,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";

import { Link } from "@pankod/refine-react-router-v6";
import { ProjectCard, CustomButton, TicketCard } from "components";
import { Error, Loading } from "../index";

import TicketDetails from "./TicketDetails";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import FindUserWithID from "components/query/FindUserWithID";

interface TicketDetailsProps {
  id: string;
  title: string;
  description: string;
  creator: string;
  priority: string;
  project: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  allProperties: any[];
  __v: number;
}

const ReadTickets = () => {
  const navigate = useNavigate();
  const [ticketID, setTicketID] = useState<string[] | undefined>(undefined);
  const [userID, setUserID] = useState();
  const { data, isLoading, isError } = useList({ resource: "tickets" });
  const [detail, setDetail] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const ticketData = data?.data ?? [];
  const totalCount = ticketData.length;

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    setDetail(true);
  };

  const hideDetail = () => {
    setDetail(false);
  };

  // console.log("qqqqq:", ticketData[0].creator);
  // console.log("asdfa:", totalCount);
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  let sortedData = [...ticketData];
  if (sortColumn) {
    sortedData = sortedData.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  return (
    <>
      <Box
        sx={{
          p: 1,
          overflow: "hidden",
        }}
      >
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
            height: "100%",
            background: "#fcfcfc",
            borderRadius: "15px",
          }}
        >
          <TableContainer
            style={{ width: "100%", height: "100%" }}
            // component={Link}
          >
            <Table>
              <TableHead style={{ width: "100%" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      width: "4%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      id
                      {sortColumn === "id" && sortDirection === "asc" && (
                        <KeyboardArrowUpIcon />
                      )}
                      {sortColumn === "id" && sortDirection === "desc" && (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "6%",
                      alignItems: "center",
                    }}
                    onClick={() => handleSort("priority")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      priority
                      {sortColumn === "priority" && sortDirection === "asc" && (
                        <KeyboardArrowUpIcon />
                      )}
                      {sortColumn === "priority" &&
                        sortDirection === "desc" && <KeyboardArrowDownIcon />}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "10%",
                    }}
                    onClick={() => handleSort("title")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          background: "transparent",
                          "&:hover": {
                            boxShadow:
                              "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                            background: "#dadefa",
                            transition: "all 0.4s ease-in-out",
                          },
                        }}
                      >
                        title
                      </Typography>
                      {sortColumn === "title" && sortDirection === "asc" && (
                        <KeyboardArrowUpIcon />
                      )}
                      {sortColumn === "title" && sortDirection === "desc" && (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "20%",
                    }}
                    onClick={() => handleSort("project")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      project
                      {sortColumn === "project" && sortDirection === "asc" && (
                        <KeyboardArrowUpIcon />
                      )}
                      {sortColumn === "project" && sortDirection === "desc" && (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "40%",
                    }}
                  >
                    Summary
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "20%",
                    }}
                    onClick={() => handleSort("creator")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      creator
                      {sortColumn === "creator" && sortDirection === "asc" && (
                        <KeyboardArrowUpIcon />
                      )}
                      {sortColumn === "creator" && sortDirection === "desc" && (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket, index) => {
                const num = index + 1;
                return (
                  <Table key={ticket._id} width="100%">
                    <TicketCard
                      num={num}
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
                );
              })}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Box>
      <Box>
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
