import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import { useList } from "@pankod/refine-core";
import { useTable } from "@pankod/refine-core";
import {
  useDelete,
  useGetIdentity,
  useShow,
  useOne,
} from "@pankod/refine-core";
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
import FindProjectWithID from "components/query/FindProjectWithID";

interface TicketDetailsProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  id?: string;
  title?: string | undefined;
  priority?: string | undefined;
  description?: string | undefined;
  type?: string | undefined;
  status?: string | undefined;
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
  type,
  status,
  creator,
  priority,
  project,
  screenshot,
}) => {
  const navigate = useNavigate();
  const { mutate } = useDelete();
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];
  const isCurrentUser = myProfile._id === creator;

  const editTicket = (ticketID: string) => {
    navigate(`/tickets/edit/${ticketID}`);
  };

  const handleDeleteProject = () => {
    const response = window.confirm(
      "Are you sure you want to delete this Ticket?"
    );
    if (response) {
      mutate(
        {
          resource: "tickets",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/tickets");
            // console.log("successfully deleted ticket");
          },
          onError: () => {
            // console.log("error occured")
          },
        }
      );
    }
  };
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
          <Typography>type: {type}</Typography>
          <Typography>
            project#:
            {typeof project === "string" ? FindProjectWithID(project) : ""}
          </Typography>
          <Typography>
            creator:
            {typeof creator === "string" ? FindUserWithID(creator) : ""}
          </Typography>
        </Stack>
        <Stack direction="row">
          {isCurrentUser ? (
            <>
              <CustomButton
                title={"Edit"}
                backgroundColor={"#d42e2e"}
                color="#FCFCFC"
                // icon={dropdown ? <ArrowDropUp /> : <ArrowDropDown />}
                handleClick={() => {
                  editTicket(id ? id : "");
                }}
              />
              <CustomButton
                title={"delete"}
                backgroundColor={"#d42e2e"}
                color="#FCFCFC"
                // icon={dropdown ? <ArrowDropUp /> : <ArrowDropDown />}
                handleClick={() => {
                  handleDeleteProject();
                }}
              />
            </>
          ) : (
            <CustomButton
              title={"Request edit"}
              backgroundColor={"#d42e2e"}
              color="#FCFCFC"
              // icon={dropdown ? <ArrowDropUp /> : <ArrowDropDown />}
              handleClick={() => {
                editTicket(id ? id : "");
              }}
            />
          )}
          <Button onClick={onClick as (event: MouseEvent) => void}>x</Button>
        </Stack>
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
