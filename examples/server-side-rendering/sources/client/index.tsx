import { hydrate } from "preact"
import { PageProvider } from "preact-page"
import { Main } from "./main"
import { pages } from "./pages"

const rootElement = document.getElementById("root")

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("Root element not found")
}

hydrate(
  <PageProvider pages={pages}>
    <Main />
  </PageProvider>,
  rootElement
)
