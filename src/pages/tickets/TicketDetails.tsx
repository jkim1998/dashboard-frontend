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
import { MouseEvent } from "react";

import { ProjectCard, CustomButton, TicketCard } from "components";
import { Error, Loading } from "../index";
import { ProjectImage } from "assets";
interface Item {
  title: string;
}

interface ChildComponentProps {
  items: Item[];
}

interface TicketDetailsProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  id?: string | undefined;
  title?: string | undefined;
  priority?: string | undefined;
  description?: string | undefined;
  creator?: string | undefined;
  project?: string | undefined;
  screenshot?: string | undefined;
}

const styles = {
  tableHead: {
    backgroundColor: "#f2f2f2",
    color: "white",
  },
};

const TicketDetails: React.FC<TicketDetailsProps> = ({
  onClick,
  id,
  title,
  description,
  creator,
  priority,
  project,
  screenshot,
}) => {
  const navigate = useNavigate();
  // const { data, isLoading, isError } = useList({ resource: "tickets" });
  // const [showDetail, setDetail] = useState(false);

  // const ticketData = data?.data ?? [];

  // const toggleDetail = () => {
  //   setDetail(!showDetail);
  // };
  // if (isLoading) return <Loading />;
  // if (isError) return <Error />;
  return (
    <Box
      borderRadius="15px"
      padding="20px"
      marginTop={5}
      bgcolor="#FCFCFC"
      width="100%"
      max-height="80%"
    >
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
      >
        <Stack display="flex" flexDirection="row" marginLeft={5} gap={5}>
          <Typography marginBottom={5}>{id}</Typography>
          <Typography>Priority: {priority}</Typography>
        </Stack>
        <Button onClick={onClick as (event: MouseEvent) => void}>x</Button>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        bgcolor="red"
        width="100%"
        gap={5}
      >
        <img src={ProjectImage} width={350} />
        {/* {props.items.map((item) => (
          <Typography>Ticket#: {item.title}</Typography>
        ))} */}
        <Typography>Description: {description}</Typography>
        <Typography>Creator: {creator}</Typography>
        <Typography>Project#: {project} </Typography>
      </Stack>
    </Box>
  );
};

export default TicketDetails;
