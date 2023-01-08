import { PageParameters } from "./page-parameters"
import { PageInterface } from "./page"

export interface PageContextInterface {
  parameters: PageParameters
  page?: PageInterface
  pageLink: (path: string, replace?: boolean) => void
  pageBack: () => void
  pageForward: () => void
  pageGo: (offset: number) => void
  ready: boolean
  url: URL
  baseUrl: string
}
