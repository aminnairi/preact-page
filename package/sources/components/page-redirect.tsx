import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { usePageLink } from "../hooks/page-link"
import { useReady } from "../hooks/ready"
import { PageRedirectInterface } from "../types/page-redirect"

export const PageRedirect: FunctionComponent<PageRedirectInterface> = ({ path, replace }) => {
  const pageLink = usePageLink()
  const ready = useReady()

  useEffect(() => {
    if (ready) {
      pageLink(path, replace || false)
    }
  }, [path, replace, pageLink, ready])

  return null
}

