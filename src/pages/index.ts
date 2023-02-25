import Home from "./home";
import { Login } from "./login";
import MyProfile from "./my-profile";

//employee
import Agents from "./employees/read-employees";
import AgentProfile from "./employees/read-employees-detail";

//projects
import CreateProperty from "./projects/create-property";
import AllProperties from "./projects/read-projects";
import PropertyDetails from "./projects/read-projects-details";
import EditProperty from "./projects/update-projects";

//tickets
import Tickets from "./tickets/read-tickets";
import CreateTicket from "./tickets/create-ticket";

export {
  AgentProfile,
  Agents,
  AllProperties,
  CreateProperty,
  Home,
  Login,
  MyProfile,
  PropertyDetails,
  EditProperty,
  Tickets,
  CreateTicket,
};
