import { lazy } from "preact/compat"
import { PageParameters, PagesInterface, withParameters } from "preact-page"

const HomePage = lazy(() => import("./home"))
const UserPage = lazy(() => import("./user"))

export const route = {
  home: "/",
  user: {
    plain: "/user/:user",
    computed: (parameters: PageParameters) => withParameters(route.user.plain, parameters)
  }
}

export const pages: PagesInterface = [
  {
    path: route.home,
    title: () => "Home page",
    description: () => "This is the home page",
    element: <HomePage />
  },
  {
    path: route.user.plain,
    title: ({ user }) => `User#${user} details page`,
    description: ({ user }) => `This is the user#${user} details page`,
    element: <UserPage />
  }
]
