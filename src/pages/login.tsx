import { useEffect, useRef } from "react";
import { useLogin, AuthPage, useNavigation } from "@pankod/refine-core";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
  Container,
} from "@pankod/refine-mui";

import { Icon } from "../assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleLogin = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");
      console.log(codeParam);
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }
      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  const GithubLogin = () => {
    // try {
    //   window.location.assign(
    //     "https://github.com/login/oauth/authorize?client_id=" +
    //       process.env.REACT_APP_GITHUB_CLIENT_ID
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    return (
      <Box>
        <Button
          sx={{ display: "flex", width: 180, height: 30, bgcolor: "red" }}
        >
          Sign in as Github
        </Button>
      </Box>
    );
  };

  const TestAdmin = () => {
    return (
      <Box>
        <Button
          sx={{ display: "flex", width: 180, height: 30, bgcolor: "red" }}
        >
          Test Admin
        </Button>
      </Box>
    );
  };

  const TestUser = () => {
    return (
      <Box>
        <Button
          sx={{ display: "flex", width: 180, height: 30, bgcolor: "red" }}
        >
          Test User
        </Button>
      </Box>
    );
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <AuthPage type="login"/>
      {/* <AuthPage type="register"/> */}
      {/* <AuthPage type="forgotPassword"/> */}
      {/* <div>
        <img src={Icon} alt="Logo" width={400}/>
      </div>
      <Box borderRadius="15px" width={600} padding="20px">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack width="100%" direction="column" gap={2}>
            <FormHelperText
              sx={{
                width: "100%",
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
                textTransform: "capitalize",
              }}
            >
              Email
            </FormHelperText>
            <TextField
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
            />
          </Stack>
          <Stack width="100%" direction="column" gap={2}>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
                textTransform: "capitalize",
              }}
            >
              password
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
            />
          </Stack>
          <Typography
            fontSize={14}
            color="#808191"
            sx={{ wordBreak: "break-all" }}
          ></Typography>
        </form>
      </Box> */}

      <Box
        borderRadius="15px"
        width={600}
        padding="20px"
        marginTop={5}
        bgcolor="green"
      >
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          paddingY={5}
        >
          <GoogleLogin />
          <GithubLogin />
        </Stack>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          paddingY={5}
        >
          <TestAdmin />
          <TestUser />
        </Stack>
      </Box>
    </Box>
  );
};
