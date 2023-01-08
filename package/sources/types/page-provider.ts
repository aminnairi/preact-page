import { PagesInterface } from "./pages"

export interface PageProviderInterface {
  pages: PagesInterface
  scrollRestauration?: ScrollRestoration
  base?: string
}
