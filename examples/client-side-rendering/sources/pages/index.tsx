import { PagesInterface, PageParameters, withParameters } from "preact-page";
import HomePage from "./home"
import UserPage from "./user"
import OldPage from "./old"

export const route = {
  home: "/",
  old: "/old",
  user: {
    plain: "/user/:user",
    computed: (parameters: PageParameters) => withParameters(route.user.plain, parameters)
  }
}

export const pages: PagesInterface = [
  {
    path: route.home,
    element: <HomePage />,
    metas: [
      () => ({ name: "robots", content: "follow, index" })
    ]
  },
  {
    path: route.old,
    element: <OldPage />,
    metas: [
      () => ({ name: "robots", content: "follow, index" })
    ]
  },
  {
    path: route.user.plain,
    element: <UserPage />,
    metas: [
      () => ({ name: "robots", content: "follow, index" })
    ],
  }
]
