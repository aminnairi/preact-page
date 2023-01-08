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
import { ComponentChildren } from "preact"
import { lazy, Suspense } from "preact/compat"

// TypeScript Types
export type { PageParameters } from "./types/page-parameters"
export type { PageMetaInterface } from "./types/page-meta"
export type { PageInterface } from "./types/page"
export type { PagesInterface } from "./types/pages"
export type { PageContextInterface } from "./types/page-context"
export type { PageProviderInterface } from "./types/page-provider"
export type { PageStaticProviderInterface } from "./types/page-static-provider"
export type { PageViewInterface } from "./types/page-view"
export type { PageLinkInterface } from "./types/page-link"
export type { PageRedirectInterface } from "./types/page-redirect"
export type { PageGoInterface } from "./types/page-go"

// Utilities
export { withParameters } from "./library/with-parameters"
export { join } from "./library/join"
export { match } from "./library/match"
export { matchParameters } from "./library/match-parameters"

// Contexts
export { PageContext } from "./contexts/page"

// Providers
export { PageProvider } from "./providers/page"
export { PageStaticProvider } from "./providers/page-static"

// Hooks
export { usePageLink } from "./hooks/page-link"
export { usePageBack } from "./hooks/page-back"
export { usePageForward } from "./hooks/page-forward"
export { usePageGo } from "./hooks/page-go"
export { useReady } from "./hooks/ready"
export { useBaseUrl } from "./hooks/base-url"
export { usePage } from "./hooks/page"
export { usePageParameters } from "./hooks/page-parameters"
export { usePageQuery } from "./hooks/page-query"
export { usePageHash } from "./hooks/page-hash"
export { usePageHost } from "./hooks/page-host"
export { usePageHostName } from "./hooks/page-host-name"
export { usePageUrl } from "./hooks/page-url"
export { usePageOrigin } from "./hooks/page-origin"
export { usePagePassword } from "./hooks/page-password"
export { usePageUserName } from "./hooks/page-user-name"
export { usePagePath } from "./hooks/page-path"
export { usePageProtocol } from "./hooks/page-protocol"
export { usePagePort } from "./hooks/page-port"

// Components
export { PageDescription } from "./components/page-description"
export { PageMetas } from "./components/page-metas"
export { PageLink } from "./components/page-link"
export { PageRedirect } from "./components/page-redirect"
export { PageBack } from "./components/page-back"
export { PageForward } from "./components/page-forward"
export { PageGo } from "./components/page-go"
export { PageView } from "./components/page-view"
export { PageTitle } from "./components/page-title"

// To delete in the next episode
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
