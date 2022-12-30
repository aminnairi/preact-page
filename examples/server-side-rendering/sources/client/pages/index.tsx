import { lazy } from "preact/compat"
import { PagesInterface } from "preact-page"

const HomePage = lazy(() => import("./home"))
const UserPage = lazy(() => import("./user"))

export const pages: PagesInterface = [
  {
    path: "/",
    title: () => "Home page",
    description: () => "This is the home page",
    element: <HomePage />
  },
  {
    path: "/user/:user",
    title: ({ user }) => `User#${user} details page`,
    description: ({ user }) => `This is the user#${user} details page`,
    element: <UserPage />
  }
]
