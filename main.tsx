import { Fragment } from "preact"
import { PageView } from "preact-page"
import { NotFoundPage } from "./pages/not-found"
import { Header } from "./components/header"

export const Main = () => {
  return (
    <Fragment>
      <Header />
      <PageView fallback={<NotFoundPage />} />
    </Fragment>
  )
}
