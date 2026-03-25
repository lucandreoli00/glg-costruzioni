import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";

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
]);
