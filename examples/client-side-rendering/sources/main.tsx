import { Fragment } from "preact"
import { PageView } from "preact-page"
import { Header } from "./components/header"
import NotFoundPage from "./pages/not-found"

export const Main = () => {
  return (
    <Fragment>
      <Header />
      <PageView fallback={<NotFoundPage />} />
    </Fragment>
  )
}
