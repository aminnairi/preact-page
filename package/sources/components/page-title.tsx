import { FunctionComponent } from "preact"
import { usePage } from "../hooks/page"
import { usePageParameters } from "../hooks/page-parameters"

export const PageTitle: FunctionComponent = () => {
  const page = usePage()
  const pageParameters = usePageParameters()

  if (!page || !page.title) {
    return null
  }

  return (
    <title>{page.title(pageParameters)}</title>
  )
}

