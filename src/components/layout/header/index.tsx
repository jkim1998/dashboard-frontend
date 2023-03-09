import React, { useContext, useState } from "react";
import { useGetIdentity, useLogout } from "@pankod/refine-core";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  Box,
} from "@pankod/refine-mui";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import { ColorModeContext } from "contexts";

export const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);
  const { mutate: mutateLogout } = useLogout();
  const navigate = useNavigate();
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity();
  const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return shouldRenderHeader ? (
    <AppBar color="default" position="sticky" elevation={1}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
          <Stack
            position="relative"
            display="inline-block"
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
            width="fit-content"
            onClick={() => toggleMenu()}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Stack
              direction="row"
              gap="16px"
              alignItems="center"
              justifyContent="center"
            >
              {user?.name ? (
                <Typography variant="subtitle2">{user?.name}</Typography>
              ) : null}
              {user?.avatar ? (
                <Avatar src={user?.avatar} alt={user?.name} />
              ) : null}
            </Stack>
            {menu && (
              <Box
                sx={{
                  bgcolor: "yellow",
                  position: "absolute",
                  padding: "5px",
                  zIndex: 1,
                  width: "100%",
                  left: 0,
                }}
              >
                <Button onClick={() => navigate("/my-profile")}>
                  My Profile
                </Button>
                <Typography>hello</Typography>
                <Typography>hello</Typography>
                <Button onClick={() => mutateLogout()}>Logout</Button>
              </Box>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
