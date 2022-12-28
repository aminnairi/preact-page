/**
 * MIT License
 * 
 * Copyright (c) 2022 Amin NAIRI
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { ComponentChildren, createContext, Fragment, FunctionComponent, JSX } from "preact"
import { useCallback, useContext, useEffect, useMemo, useState } from "preact/hooks"
import { lazy, Suspense } from "preact/compat"

export const withParameters = (path: string, parameters: Record<string, string>) => {
  return Object.entries(parameters).reduce((computedPath, [parameterName, parameterValue]) => {
    return computedPath.replace(`:${parameterName}`, parameterValue)
  }, path)
}

export const join = (...paths: Array<string>) => {
  return "/" + paths.filter(Boolean).map(path => {
    return path.split(/\/+/g).filter(Boolean).join("/")
  }).filter(Boolean).join("/")
}

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

export const matchParameters = (route: string, path: string): PageParameters => {
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

export type PageParameters = Record<string, string | undefined>

export interface PageMetaInterface {
  name: string
  content: string
}

export interface PageInterface {
  path: string
  title?: (parameters: PageParameters) => string
  description?: (parameters: PageParameters) => string
  metas?: Array<(parameters: PageParameters) => PageMetaInterface>
  element: ComponentChildren
}

export type PagesInterface = Array<PageInterface>

export interface PageContextInterface {
  parameters: PageParameters
  page?: PageInterface
  pageLink: (path: string, replace?: boolean) => void
  pageBack: () => void
  pageForward: () => void
  pageGo: (offset: number) => void
  ready: boolean
  url: URL
  baseUrl: string
}

export const PageContext = createContext<PageContextInterface>({
  parameters: {},
  page: {
    path: "",
    title: () => "",
    description: () => "",
    metas: [],
    element: () => null
  },
  url: new URL("http://localhost"),
  pageLink: () => {},
  pageBack: () => {},
  pageForward: () => {},
  pageGo: () => {},
  ready: false,
  baseUrl: ""
})

export interface PageProviderInterface {
  pages: PagesInterface
  scrollRestauration?: ScrollRestoration
  base?: string
}

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
      const titleElement = document.querySelector("title")
      const descriptionElement = document.querySelector("meta[name='description']")

      if (page.title) {
        if (titleElement) {
          titleElement.innerText = page.title(parameters)
        } else {
          const titleElement = document.createElement("title")
          titleElement.innerText = page.title(parameters)
          document.head.appendChild(titleElement)
        }
      }

      if (page.description) {
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
          }
        })
      }
    }
  }, [page, parameters])

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}

export interface PageStaticProviderInterface extends PageProviderInterface {
  path: string
}

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

export interface PageViewInterface {
  fallback?: ComponentChildren
  loading?: ComponentChildren
}

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

export const usePageLink = () => useContext(PageContext).pageLink

export const usePageBack = () => useContext(PageContext).pageBack

export const usePageForward = () => useContext(PageContext).pageForward

export const usePageGo = () => useContext(PageContext).pageGo

export const useReady = () => useContext(PageContext).ready

export const useBaseUrl = () => useContext(PageContext).baseUrl

export const usePage = () => useContext(PageContext).page

export interface PageLinkProps {
  path: string
  replace?: boolean
  activeClassName?: string
}

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

export const PageMetas: FunctionComponent = () => {
  const page = usePage()
  const pageParameters = usePageParameters()

  if (!page || !page.metas) {
    return null
  }

  return (
    <Fragment>
      {page.metas.map(getPageMeta => {
        const pageMeta = getPageMeta(pageParameters)

        return (
          <meta name={pageMeta.name} content={pageMeta.content} />
          )
      })}
    </Fragment> 
  )
}

export const PageLink: FunctionComponent<PageLinkProps> = ({ path, replace, activeClassName, children }) => {
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

export const usePageParameters = () => {
  return useContext(PageContext).parameters
}

export const usePageQuery = (): Record<string, string | undefined> => {
  const queries = useContext(PageContext).url.searchParams
  const entries = [...queries]
  const initialQueries = {}

  const unpollutedQueries = entries.reduce((previousQueries, [query, value]) => {
    if (query in previousQueries) {
      return previousQueries
    }

    return {
      ...previousQueries,
      [query]: value
    }
  }, initialQueries)

  return unpollutedQueries
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

export interface PageLazyInterface {
  path: string
  fallback: ComponentChildren
}

export const PageLazy = ({ path, fallback }: PageLazyInterface) => {
  const Component = lazy(() => import(path))
  
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  )
}
