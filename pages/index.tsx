import { PagesInterface } from "../sources";
import { HomePage } from "./home"
import { AboutPage } from "./about";
import { UserPage } from "./user";
import { UsersPage } from "./users";
import { OldPage } from "./old"

export const path = {
  home: "/",
  about: "/about",
  users: "/users",
  old: "/old",
  user: {
    plain: "/user/:user",
    computed(parameters: Record<string, string> = {}) {
      return Object.entries(parameters).reduce((computedPath, [parameterName, parameterValue]) => {
        return computedPath.replace(`:${parameterName}`, parameterValue)
      }, this.plain)
    }
  }
}

export const pages: PagesInterface = [
  {
    path: path.home,
    element: <HomePage />
  },
  {
    path: path.about,
    element: <AboutPage />
    },
  {
    path: path.users,
    element: <UsersPage />
    },
  {
    path: path.user.plain,
    element: <UserPage />
    },
  {
    path: path.old,
    element: <OldPage />
  }
]
