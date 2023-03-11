import React, { useState } from "react";

import { Refine, AuthProvider, AuthPage } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";

import {
  Home,
  Login,
  Message,
  MyProfile,
  CreateEmployee,
  ReadEmployees,
  ReadEmployeeProfile,
  UpdateEmployees,
  CreateProject,
  ReadProject,
  ReadProjectDetails,
  UpdateProject,
  ReadTickets,
  CreateTicket,
  UpdateTickets,
} from "./pages";
interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
  userid: string;
}
interface LoginParams {
  email?: string;
  password?: string;
  remember?: boolean;
  providerName?: string;
  credential?: string;
}
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const [error, setError] = useState("");
  const authProvider: AuthProvider = {
    login: async ({
      email,
      password,
      remember,
      providerName,
      credential,
    }: LoginParams) => {
      if (credential) {
        // Login with credential logic
        const profileObj = credential ? parseJwt(credential) : null;

        if (profileObj) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
            })
          );
        }

        localStorage.setItem("token", `${credential}`);

        return Promise.resolve();
      } else if (email && password) {
        // Login with email/password logic
        const url = `http://localhost:8080/api/v1/users?email=${email}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          const users = await response.json();
          const user = users.find((user: User) => user.email === email);
          if (user) {
            if (user.password === password) {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar,
                  userid: user._id,
                })
              );
              localStorage.setItem("token", `${user.token}`);
              return Promise.resolve();
            } else {
              setError("Incorrect Password");
              console.log(error);
              return Promise.reject();
            }
          } else {
            setError("User not found");
            console.log(error);
            return Promise.reject();
          }
        } else {
          const error = await response.json();
          console.log(
            `User with email ${email} does not exist in the collection`
          );
          return Promise.reject();
        }
      } else {
        return Promise.reject("No login credentials provided");
      }
    },
   
    register: async ({ email, password, providerName }) => {
      let url;
      let body;

      // switch (providerName) {
      //   case "google":
      //     url = "http://localhost:8080/api/v1/users";
      //     body = JSON.stringify({ access_token: password });
      //     break;
      //   case "github":
      //     url = "http://localhost:8080/api/v1/users";
      //     body = JSON.stringify({ access_token: password });
      //     break;
      //   default:
      url = "http://localhost:8080/api/v1/users";
      body = JSON.stringify({ email, password });
      // }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log("4");
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "name",
            email: data.email,
            userid: data._id,
          })
        );
        localStorage.setItem("token", `${data.token}`);
        return Promise.resolve();
      } else {
        console.log("failed to register");
        return Promise.reject();
      }
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          // dataProvider={dataProvider("https://dashboard-server-aq1z.onrender.com/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "projects",
              create: CreateProject,
              list: ReadProject,
              show: ReadProjectDetails,
              edit: UpdateProject,
              icon: <VillaOutlined />,
            },
            {
              name: "users",
              // create: CreateEmployee,
              list: ReadEmployees,
              show: ReadEmployeeProfile,
              edit: UpdateEmployees,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "tickets",
              create: CreateTicket,
              list: ReadTickets,
              edit: UpdateTickets,
              icon: <StarOutlineRounded />,
            },
            {
              name: "messages",
              list: Message,
              icon: <ChatBubbleOutline />,
            },
            {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          // routerProvider={routerProvider}
          routerProvider={{
            ...routerProvider,
            routes: [
              { path: "/", element: <Login /> },
              {
                path: "/register",
                element: <AuthPage type="register" />,
              },
              {
                path: "/forgot-password",
                element: <AuthPage type="forgotPassword" />,
              },
            ],
          }}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
