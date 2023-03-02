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
import { Link } from "@pankod/refine-react-router-v6";

import { TicketCardProp, InfoBarProps } from "interfaces/agent";
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
      style={{
        width: "100%",
      }}
    >
      <TableCell
        align="center"
        style={{
          width: "4%",
          backgroundColor: "green",
        }}
      >
        {111}
      </TableCell>
      <TableCell
        align="center"
        style={{
          width: "6%",
          backgroundColor: "red",
        }}
      >
        {priority ? priority : "urgent"}
      </TableCell>
      <TableCell
        align="center"
        style={{
          width: "10%",
          backgroundColor: "blue",
        }}
      >
        {title}
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "20%",
          backgroundColor: "yellow",
        }}
      >
        {project ? project : "project 444"}
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "40%",
          backgroundColor: "brown",
        }}
      >
        {description}
      </TableCell>
      <TableCell
        align="left"
        style={{
          width: "20%",
          backgroundColor: "skyblue",
        }}
      >
        {creator}
      </TableCell>
      {/* <TableCell align="right">{project}</TableCell> */}
    </TableBody>
  );
};

export default TicketCard;
