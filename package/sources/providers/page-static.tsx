import { FunctionComponent } from "preact"
import { useState, useMemo, useCallback } from "preact/hooks"
import { join } from "../library/join"
import { match } from "../library/match"
import { matchParameters } from "../library/match-parameters"
import { PageContext } from "../contexts/page"
import { PageStaticProviderInterface } from "../types/page-static-provider"

export const PageStaticProvider: FunctionComponent<PageStaticProviderInterface> = ({ pages, scrollRestauration, base, path, children }) => {
  const [url, setUrl] = useState(new URL("http://localhost" + join(path)))

  const baseUrl = useMemo(() => {
    return join(base ?? "")
  }, [base])

  const page = useMemo(() => {
    return pages.find(page => {
      const pagePathWithBaseUrl = join(baseUrl, page.path)
      return match(pagePathWithBaseUrl, url.pathname)
    })
  }, [url, pages, baseUrl])

  const parameters = useMemo(() => {
    if (!page) {
      return {}
    }

    const pagePathWithBase = join(baseUrl, page.path)

    return matchParameters(pagePathWithBase, url.pathname)
  }, [page, url, baseUrl])

  const ready = useMemo(() => true, [])

  const pageLink = useCallback(() => {}, [])

  const pageBack = useCallback(() => {}, [])

  const pageForward = useCallback(() => {}, [])

  const pageGo = useCallback(() => {}, [])

  const value = useMemo(() => ({
    url,
    ready,
    pageLink,
    pageBack,
    pageForward,
    pageGo,
    parameters,
    baseUrl,
    page,
  }), [url, ready, pageLink, pageBack, pageForward, pageGo, parameters, baseUrl, page])

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}
