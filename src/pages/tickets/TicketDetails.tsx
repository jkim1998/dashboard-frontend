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
  styled,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";
import { MouseEvent } from "react";

import { ProjectCard, CustomButton, TicketCard } from "components";
import { Error, Loading } from "../index";
import { ProjectImage } from "assets";
import FindUserWithID from "components/query/FindUserWithID";

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
const AnimatedBox = styled(Box)`
  animation-name: changeColor;
  animation-duration: 3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @keyframes changeColor {
    from {
      background-color: #dadefa;
    }
    to {
      background-color: #fcfcfc;
    }
  }
`;

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
  return (
    <AnimatedBox
      borderRadius="15px"
      padding="20px"
      marginTop={5}
      width="100%"
      max-height="80%"
      textTransform="capitalize"
    >
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        marginBottom={3}
      >
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={5}
          width="100%"
        >
          <Typography>id: {id}</Typography>
          <Typography>priority: {priority}</Typography>
          <Typography>project#: {project} </Typography>
          <Typography>
            creator:
            {typeof creator === "string" ? FindUserWithID(creator) : ""}
          </Typography>
        </Stack>
        <Button onClick={onClick as (event: MouseEvent) => void}>x</Button>
      </Stack>
      <Stack display="flex" flexDirection="row" width="100%" gap={5}>
        <img src={screenshot ? screenshot : ProjectImage} width={350} />
        <Typography paddingTop={3} textTransform="none">
          {description}
        </Typography>
      </Stack>
    </AnimatedBox>
  );
};

export default TicketDetails;
