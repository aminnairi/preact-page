import { render } from "preact"
import { PageProvider } from "./sources"
import { Main } from "./main"
import { pages } from "./pages"

const rootElement = document.getElementById("root")

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("Root element not found")
}

render(
  <PageProvider pages={pages} base="/preact-page">
    <Main />
  </PageProvider>,
  rootElement
)

