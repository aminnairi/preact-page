import { FunctionComponent, JSX } from "preact"
import { useMemo, useCallback } from "preact/hooks"
import { join } from "../library/join"
import { PageLinkInterface } from "../types/page-link"
import { usePageLink } from "../hooks/page-link"
import { useBaseUrl } from "../hooks/base-url"
import { usePagePath } from "../hooks/page-path"

export const PageLink: FunctionComponent<PageLinkInterface> = ({ path, replace, activeClassName, children }) => {
  const pageLink = usePageLink()
  const pagePath = usePagePath()
  const baseUrl = useBaseUrl()
  const pathWithBaseUrl = useMemo(() => join(baseUrl, path), [baseUrl])

  const isActivePath = useMemo(() => {
    return pagePath === pathWithBaseUrl
  }, [pagePath, pathWithBaseUrl])

  const className = useMemo(() => {
    if (isActivePath && activeClassName) {
      return activeClassName
    }

    return ""
  }, [isActivePath])

  const handleClick: JSX.MouseEventHandler<HTMLAnchorElement> = useCallback((event) => {
    event.preventDefault()
    pageLink(path, replace || false)
  }, [path, replace, pageLink])

  return (
    <a
      href={pathWithBaseUrl}
      onClick={handleClick}
      className={className}>
      {children}
    </a>
  )
}

