import { FunctionComponent } from "preact"
import { useState, useMemo, useCallback, useEffect } from "preact/hooks"
import { join } from "../library/join"
import { match } from "../library/match"
import { matchParameters } from "../library/match-parameters"
import { PageContext } from "../contexts/page"
import { PageProviderInterface } from "../types/page-provider"

export const PageProvider: FunctionComponent<PageProviderInterface> = ({ children, pages, scrollRestauration, base }) => {
  const [url, setUrl] = useState(new URL(window.location.href))
  const [ready, setReady] = useState(false)

  const baseUrl = useMemo(() => {
    return base || ""
  }, [base])

  const pageUpdate = useCallback(() => {
    window.dispatchEvent(new CustomEvent("popstate"))
  }, [])

  const pageLink = useCallback((wantedPath: string, replace?: boolean) => {
    const currentPath = join(url.pathname, url.search, url.hash)
    const wantedPathWithBase = join(baseUrl, wantedPath)

    if (currentPath !== wantedPathWithBase) {
      if (replace) {
        window.history.replaceState(wantedPathWithBase, wantedPathWithBase, wantedPathWithBase)
      } else {
        window.history.pushState(wantedPathWithBase, wantedPathWithBase, wantedPathWithBase)
      }

      pageUpdate()
    }
  }, [url, pageUpdate, baseUrl])

  const pageBack = useCallback(() => {
    window.history.back()
    pageUpdate()
  }, [pageUpdate])

  const pageForward = useCallback(() => {
    window.history.forward()
    pageUpdate()
  }, [pageUpdate])

  const pageGo = useCallback((offset: number) => {
    window.history.go(offset)
    pageUpdate()
  }, [pageUpdate])

  const page = useMemo(() => {
    return pages.find(page => {
      const pathWithBase = join(baseUrl, page.path)

      return match(pathWithBase, url.pathname)
    })
  }, [url, pages, baseUrl])

  const parameters = useMemo(() => {
    if (!page) {
      return {}
    }

    const pagePathWithBase = join(baseUrl, page.path)

    return matchParameters(pagePathWithBase, url.pathname)
  }, [page, url, baseUrl])

  const value = useMemo(() => ({
    parameters,
    page,
    pageLink,
    pageBack,
    pageForward,
    pageGo,
    ready,
    url,
    baseUrl,
  }), [parameters, page, pageLink, pageBack, pageForward, pageGo, ready, url, baseUrl])

  useEffect(() => {
    if (scrollRestauration) {
      window.history.scrollRestoration = scrollRestauration
    } else {
      window.history.scrollRestoration = "auto"
    }
  }, [scrollRestauration])

  useEffect(() => {
    const onWindowPopstate = () => {
      setUrl(new URL(window.location.href))
    }

    window.addEventListener("popstate", onWindowPopstate)
    setReady(true)

    return () => {
      window.removeEventListener("popstate", onWindowPopstate)
      setReady(false)
    }
  }, [])

  useEffect(() => {
    if (page) {

      if (page.title) {
        const titleElement = document.querySelector("title")

        if (titleElement) {
          titleElement.innerText = page.title(parameters)
        } else {
          const titleElement = document.createElement("title")
          titleElement.innerText = page.title(parameters)
          document.head.appendChild(titleElement)
        }
      }

      if (page.description) {
        const descriptionElement = document.querySelector("meta[name='description']")

        if (descriptionElement) {
          descriptionElement.setAttribute("content", page.description(parameters))
        } else {
          const descriptionElement = document.createElement("meta")
          descriptionElement.setAttribute("name", "description")
          descriptionElement.setAttribute("content", page.description(parameters))
          document.head.appendChild(descriptionElement)
        }
      }

      if (page.metas) {
        page.metas.forEach(getPageMeta => {
          const pageMeta = getPageMeta(parameters)
          const pageMetaElement = document.querySelector(`meta[name="${pageMeta.name}"]`)

          if (pageMetaElement) {
            pageMetaElement.setAttribute("content", pageMeta.content)
          } else {
            const pageMetaElement = document.createElement("meta")
            pageMetaElement.setAttribute("name", pageMeta.name)
            pageMetaElement.setAttribute("content", pageMeta.content)
            document.head.appendChild(pageMetaElement)
          }
        })
      }
    }

    return () => {
      if (page) {
        if (page.title) {
          const titleElement = document.querySelector("title")

          if (titleElement) {
            titleElement.innerText = ""
          }
        }

        if (page.description) {
          const descriptionElement = document.querySelector("meta[name='description']")

          if (descriptionElement) {
            document.head.removeChild(descriptionElement)
          }
        }

        if (page.metas) {
          page.metas.forEach(getPageMeta => {
            const pageMeta = getPageMeta(parameters)
            const pageMetaElement = document.querySelector(`meta[name="${pageMeta.name}"]`)

            if (pageMetaElement) {
              document.head.removeChild(pageMetaElement)
            }
          })
        }
      }
      
    }
  }, [page, parameters])

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}
