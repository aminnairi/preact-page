import { PageRedirect } from "preact-page"
import { route } from "../pages"

export default () => {
  return (
    <PageRedirect path={route.home} />
  )
}
