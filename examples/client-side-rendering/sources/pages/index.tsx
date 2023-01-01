import { PagesInterface } from "preact-page";
import HomePage from "./home"
import UserPage from "./user"
import OldPage from "./old"

export const pages: PagesInterface = [
  {
    path: "/",
    element: <HomePage />,
    metas: [
      () => ({ name: "robots", content: "nofollow, noindex" })
    ]
  },
  {
    path: "/old",
    element: <OldPage />,
    metas: [
      () => ({ name: "robots", content: "nofollow, noindex" })
    ]
  },
  {
    path: "/user/:user",
    element: <UserPage />,
    metas: [
      () => ({ name: "robots", content: "nofollow, noindex" })
    ],
  }
]
