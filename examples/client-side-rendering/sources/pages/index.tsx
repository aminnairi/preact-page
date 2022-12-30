import { PagesInterface } from "preact-page";
import HomePage from "./home"
import UserPage from "./user"
import OldPage from "./old"

export const pages: PagesInterface = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/old",
    element: <OldPage />
  },
  {
    path: "/user/:user",
    element: <UserPage />
  }
]
