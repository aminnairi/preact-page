import { ComponentChildren, createContext, FunctionComponent, JSX } from "preact"
import { useCallback, useContext, useEffect, useMemo, useState } from "preact/hooks"

export const match = (route: string, path: string): boolean => {
  const routeParts = new URL(`http://localhost/${route}`).pathname.split("/").filter(Boolean)
  const pathParts = new URL(`http://localhost/${path}`).pathname.split("/").filter(Boolean)

  if (routeParts.length !== pathParts.length) {
    return false
  }

  return routeParts.every((routePart, routePartIndex) => {
    if (routePart.startsWith(":")) {
      return true
    }

    const pathPart = pathParts[routePartIndex]

    return routePart === pathPart
  })
}

export const matchParameters = (route: string, path: string): Record<string, string | undefined> => {
  const routeParts = new URL(`http://localhost/${route}`).pathname.split("/").filter(Boolean)
  const pathParts = new URL(`http://localhost/${path}`).pathname.split("/").filter(Boolean)
  const parameters = {}

  return routeParts.reduce((previousParameters, routePart, routePartIndex) => {
    if (routePart.startsWith(":")) {
      return {
        ...previousParameters,
        [`${routePart.slice(1)}`]: pathParts[routePartIndex]
      }
    }

    return parameters
  }, parameters)
}

export interface PageInterface {
  path: string
  element: ComponentChildren
}

export type PagesInterface = Array<PageInterface>

export interface PageContextInterface {
  parameters: Record<string, string | undefined>
  page?: PageInterface
  pageLink: (path: string, replace?: boolean) => void
  pageBack: () => void
  pageForward: () => void
  pageGo: (offset: number) => void
  ready: boolean
  url: URL
}

export const PageContext = createContext<PageContextInterface>({
  parameters: {},
  page: {
    path: "",
    element: () => null
  },
  url: new URL("http://localhost"),
  pageLink: () => {},
  pageBack: () => {},
  pageForward: () => {},
  pageGo: () => {},
  ready: false
})

export interface PageProviderInterface {
  pages: PagesInterface
  scrollRestauration?: ScrollRestoration
}

export const PageProvider: FunctionComponent<PageProviderInterface> = ({ children, pages, scrollRestauration }) => {
  const [url, setUrl] = useState(new URL(window.location.href))
  const [ready, setReady] = useState(false)

  const pageUpdate = useCallback(() => {
    window.dispatchEvent(new CustomEvent("popstate"))
  }, [])

  const pageLink = useCallback((wantedPath: string, replace?: boolean) => {
    if (url.pathname !== wantedPath) {
      if (replace) {
        window.history.replaceState(wantedPath, wantedPath, wantedPath)
      } else {
        window.history.pushState(wantedPath, wantedPath, wantedPath)
      }

      pageUpdate()
    }
  }, [url, pageUpdate])

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
      return match(page.path, url.pathname)
    })
  }, [url, pages])

  const parameters = useMemo(() => {
    return matchParameters(page?.path ?? "", url.pathname)
  }, [page, url])

  const value = useMemo(() => ({
    parameters,
    page,
    pageLink,
    pageBack,
    pageForward,
    pageGo,
    ready,
    url
  }), [parameters, page, pageLink, pageBack, pageForward, pageGo, ready, url])

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

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}

export interface PageViewInterface {
  fallback: ComponentChildren
}

export const PageView: FunctionComponent<PageViewInterface> = ({ fallback }) => {
  const { page } = useContext(PageContext)

  if (page?.element) {
    return page.element as JSX.Element
  }

  return fallback as JSX.Element
}

export const usePageLink = () => useContext(PageContext).pageLink

export const usePageBack = () => useContext(PageContext).pageBack

export const usePageForward = () => useContext(PageContext).pageForward

export const usePageGo = () => useContext(PageContext).pageGo

export const useReady = () => useContext(PageContext).ready

export interface PageLinkProps {
  path: string
  replace?: boolean
  activeClassName?: string
}

export const PageLink: FunctionComponent<PageLinkProps> = ({ path, replace, activeClassName, children }) => {
  const pageLink = usePageLink()
  const page = useContext(PageContext).page

  const isActivePath = useMemo(() => {
    if (!page) {
      return false
    } 

    return match(page.path, path)
  }, [page, path])

  const className = useMemo(() => {
    if (!isActivePath) {
      return ""
    }

    if (!activeClassName) {
      return ""
    }

    return activeClassName
  }, [isActivePath])

  const handleClick: JSX.MouseEventHandler<HTMLAnchorElement> = useCallback((event) => {
    event.preventDefault()
    pageLink(path, replace || false)
  }, [path, replace, pageLink])

  return (
    <a
      href={path}
      onClick={handleClick}
      className={className}>
      {children}
    </a>
  )
}

export const usePageParameters = () => {
  return useContext(PageContext).parameters
}

export const usePageSearchParameters = (): Record<string, string | undefined> => {
  const searchParameters = useContext(PageContext).url.searchParams
  const searchParametersEntries = [...searchParameters]
  const initialSearchParameters = {}

  const unpollutedSearchParameters = searchParametersEntries.reduce((previousSearchParameters, [searchParameterName, searchParameterValue]) => {
    if (searchParameterName in previousSearchParameters) {
      return previousSearchParameters
    }

    return {
      ...previousSearchParameters,
      [searchParameterName]: searchParameterValue
    }
  }, initialSearchParameters)

  return unpollutedSearchParameters
}

export const usePageHash = () => {
  return useContext(PageContext).url.hash
}

export const usePageHost = () => {
  return useContext(PageContext).url.host
}

export const usePageHostName = () => {
  return useContext(PageContext).url.hostname
}

export const usePageUrl = () => {
  return useContext(PageContext).url.href
}

export const usePageOrigin = () => {
  return useContext(PageContext).url.origin
}

export const usePagePassword = () => {
  return useContext(PageContext).url.password
}

export const usePageUserName = () => {
  return useContext(PageContext).url.username
}

export const usePagePath = () => {
  return useContext(PageContext).url.pathname
}

export const usePageProtocol = () => {
  return useContext(PageContext).url.protocol
}

export const usePagePort = () => {
  return useContext(PageContext).url.port
}

export interface PageRedirectInterface {
  path: string
  replace?: boolean
}

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

export const PageBack: FunctionComponent = () => {
  const pageBack = usePageBack()
  const ready = useReady()

  useEffect(() => {
    if (ready) {
      pageBack()
    }
  }, [pageBack, ready])

  return null
}

export const PageForward: FunctionComponent = () => {
  const pageForward = usePageForward()
  const ready = useReady()

  useEffect(() => {
    if (ready) {
      pageForward()
    }
  }, [pageForward])

  return null
}

export interface PageGoInterface {
  offset: number
}

export const PageGo: FunctionComponent<PageGoInterface> = ({ offset }) => {
  const pageGo = usePageGo()
  const ready = useReady()

  useEffect(() => {
    if (ready) {
      pageGo(offset)
    }
  }, [offset, pageGo])

  return null
}
