import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { useGetIdentity } from "@pankod/refine-core";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@pankod/refine-mui";
import { useList } from "@pankod/refine-core";
import { Link } from "@pankod/refine-react-router-v6";

import { TicketCardProp, InfoBarProps } from "interfaces/agent";
import FindUserWithID from "components/query/FindUserWithID";
interface ChildProps {
  onData: (data: string) => void;
}
function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);

const TicketCard = ({
  num,
  id,
  title,
  description,
  creator,
  priority,
  project,
  onClick,
}: TicketCardProp) => {
  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    // if (currentUser.email === email) return "/my-profile";

    return `/tickets/show/${id}`;
  };
  return (
    <TableBody
      onClick={onClick}
      sx={{
        width: "100%",
        height: "50%",
        cursor: "pointer",
        background: "transparent",
        // background: "blue",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
          background: "#dadefa",
          transition: "all 0.4s ease-in-out",
        },
      }}
    >
      <TableCell
        align="left"
        style={{
          width: "4%",
          position: "relative",
        }}
      >
        <Typography
          style={{
            position: "absolute",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {num}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "10%",
          position: "relative",
        }}
      >
        <Typography
          style={{
            position: "absolute",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {priority ? priority : "urgent"}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "10%",
          position: "relative",
        }}
      >
        <Typography
          style={{
            position: "absolute",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "20%",
        }}
      >
        {project ? project : "project 444"}
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "34%",
          position: "relative",
        }}
      >
        <Typography
          style={{
            position: "absolute",
            width: "95%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingLeft: 0,
          }}
        >
          {description}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "20%",
          position: "relative",
        }}
      >
        <Typography
          style={{
            position: "absolute",
            width: "90%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {typeof creator === "string" ? FindUserWithID(creator) : ""}
        </Typography>
      </TableCell>
      {/* <TableCell align="right">{project}</TableCell> */}
    </TableBody>
  );
};

export default TicketCard;
