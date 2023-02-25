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

const AgentCard = ({ id, title, description, creator }: TicketCardProp) => {
  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    // if (currentUser.email === email) return "/my-profile";

    return `/tickets/show/${id}`;
  };

  return (
    <TableBody>
      <TableCell align="right">{title}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{creator}</TableCell>
      <TableCell align="right">{id}</TableCell>
    </TableBody>
  );
};

export default AgentCard;
