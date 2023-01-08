import { createContext } from "preact"
import { PageContextInterface } from "../types/page-context"

export const PageContext = createContext<PageContextInterface>({
  parameters: {},
  page: {
    path: "",
    title: () => "",
    description: () => "",
    metas: [],
    element: () => null
  },
  url: new URL("http://localhost"),
  pageLink: () => {},
  pageBack: () => {},
  pageForward: () => {},
  pageGo: () => {},
  ready: false,
  baseUrl: ""
})
