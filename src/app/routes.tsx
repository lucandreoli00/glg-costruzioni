import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { Login } from "./components/Login";
import { SetPassword } from "./components/SetPassword";
import { Portale } from "./components/Portale";
import { PortaleDettaglio } from "./components/PortaleDettaglio";
import { Admin } from "./components/Admin";
import { AdminCantiere } from "./components/AdminCantiere";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "chi-siamo", Component: About },
      { path: "servizi", Component: Services },
      { path: "contatti", Component: Contact },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/set-password",
    Component: SetPassword,
  },

  {
    path: "/portale",
    Component: Portale,
  },
  {
    path: "/portale/:id",
    Component: PortaleDettaglio,
  },
  {
    path: "/admin",
    Component: Admin,
  },
  {
    path: "admin/cantiere/:id",
    Component: AdminCantiere,
  },
]);
