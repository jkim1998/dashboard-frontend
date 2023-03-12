import { useState } from "react";
/* eslint-disable no-restricted-globals */
import {
  Box,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { Add } from "@mui/icons-material";
import { useList } from "@pankod/refine-core";
import { Error, Loading } from "../index";
import { CustomButton, TicketCard } from "components";

const ProjectTicket = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("bb");
  const { data, isLoading, isError } = useList({
    resource: "tickets",
    config: {
      filters: [
        {
          field: "title",
          operator: "eq",
          // operator: "contains",
          value: "test",
        },
      ],
    },
  });

  const ticketData = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Box
      borderRadius="15px"
      marginTop="20px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="100%"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">creator</TableCell>
                <TableCell align="right">project</TableCell>
              </TableRow>
            </TableHead>
            {ticketData.map((ticket) => (
              <TicketCard
                key={ticket._id}
                title={ticket.title}
                description={ticket.description}
                type={ticket.type}
                status={ticket.status}
                creator={ticket.creator}
                priority={ticket.priority}
                project={ticket.project}
              />
            ))}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProjectTicket;
