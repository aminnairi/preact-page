import { Fragment, FunctionComponent } from "preact"
import { Suspense } from "preact/compat"
import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"
import { PageViewInterface } from "../types/page-view"

export const PageView: FunctionComponent<PageViewInterface> = ({ fallback, loading }) => {
  const { page } = useContext(PageContext)

  if (page?.element) {
    if (loading) {
      return (
        <Suspense fallback={loading}>
          {page.element}
        </Suspense>
      )
    }

    return (
      <Suspense fallback={null}>
        {page.element}
      </Suspense>
    )
  }

  if (fallback) {
    return (
      <Fragment>
        {fallback}
      </Fragment>
    )
  }

  return null
}
