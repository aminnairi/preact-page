import { PagesInterface } from "preact-page";
import { HomePage } from "./home"
import { AboutPage } from "./about";
import { UserPage } from "./user";
import { UsersPage } from "./users";

export const pages: PagesInterface = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/users",
    element: <UsersPage />
  },
  {
    path: "/users/:user",
    element: <UserPage />
  }
]
