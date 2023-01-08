import { FunctionComponent } from "preact"
import { usePage } from "../hooks/page"
import { usePageParameters } from "../hooks/page-parameters"

export const PageDescription: FunctionComponent = () => {
  const page = usePage()
  const pageParameters = usePageParameters()

  if (!page || !page.description) {
    return null
  }

  return (
    <meta name="description" content={page.description(pageParameters)} />
  )
}

