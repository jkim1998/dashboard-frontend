import { useEffect, useRef } from "react";
import { useLogin, AuthPage } from "@pankod/refine-core";
import {
  Box,
  Button,
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
      // console.log(codeParam);
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
      <AuthPage
        type="login"
        wrapperProps={{
          style: {
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
           
          },
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="15px"
        width={300}
        padding="10px"
        marginTop={5}
        gap={2}
      >
        <GoogleLogin />
        {/* <GithubLogin /> */}
        <TestAdmin />
        <TestUser />
      </Box>
    </Box>
  );
};
