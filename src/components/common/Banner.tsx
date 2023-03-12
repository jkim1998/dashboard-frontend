import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@pankod/refine-mui";

import { BannerProps } from "interfaces/project.d";

const Banner = ({ id, name, email, avatar, allProjects }: BannerProps) => {
  return (
    <>
      <Typography key="id" fontWeight={700}>
        {id}
      </Typography>
      <Typography key="projects">Active Projects</Typography>
    </>
  );
};

export default Banner;
