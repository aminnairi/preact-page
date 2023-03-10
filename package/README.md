# preact-page
 
History Web API implementation for Preact written in TypeScript

[![NPM](https://badgen.net/npm/v/preact-page)](https://npmjs.com/package/preact-page) [![Bundlephobia](https://badgen.net/bundlephobia/minzip/preact-page)](https://bundlephobia.com/package/preact-page@latest) [![Types](https://badgen.net/npm/types/preact-page)](https://github.com/aminnairi/preact-page/blob/development/package.json#L10) ![Snyk](https://badgen.net/snyk/aminnairi/preact-page) ![Treeshaking](https://badgen.net/bundlephobia/tree-shaking/preact-page)

## Summary

- [Summary](#summary)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Template Scafolding](#template-scafolding)
  - [Client-side rendering](#client-side-rendering)
  - [Server-side rendering](#server-side-rendering)
- [API](#api)
  - [PageProvider](#pageprovider)
    - [Interface](#interface)
    - [Example](#example)
  - [PageView](#pageview)
    - [Interface](#interface-1)
    - [Example](#example-1)
  - [PageLink](#pagelink)
    - [Interface](#interface-2)
    - [Example](#example-2)
  - [PageRedirect](#pageredirect)
    - [Interface](#interface-3)
    - [Example](#example-3)
  - [PageBack](#pageback)
    - [Interface](#interface-4)
    - [Example](#example-4)
  - [PageForward](#pageforward)
    - [Interface](#interface-5)
    - [Example](#example-5)
  - [PageGo](#pagego)
    - [Interface](#interface-6)
    - [Example](#example-6)
  - [PageStaticProvider](#pagestaticprovider)
    - [Interface](#interface-7)
    - [Example](#example-7)
  - [PageTitle](#pagetitle)
    - [Interface](#interface-8)
    - [Example](#example-8)
  - [PageDescription](#pagedescription)
    - [Interface](#interface-9)
    - [Example](#example-9)
  - [PageMetas](#pagemetas)
    - [Interface](#interface-10)
    - [Example](#example-10)
  - [usePageLink](#usepagelink)
    - [Interface](#interface-11)
    - [Example](#example-11)
  - [usePageBack](#usepageback)
    - [Interface](#interface-12)
    - [Example](#example-12)
  - [usePageFoward](#usepagefoward)
    - [Interface](#interface-13)
    - [Example](#example-13)
  - [usePageGo](#usepagego)
    - [Interface](#interface-14)
    - [Example](#example-14)
  - [usePageParameters](#usepageparameters)
    - [Interface](#interface-15)
    - [Example](#example-15)
  - [useBaseUrl](#usebaseurl)
    - [Interface](#interface-16)
    - [Example](#example-16)
  - [usePageQuery](#usepagequery)
    - [Interface](#interface-17)
    - [Example](#example-17)
  - [usePageHash](#usepagehash)
    - [Interface](#interface-18)
    - [Example](#example-18)
  - [usePageHost](#usepagehost)
    - [Interface](#interface-19)
    - [Example](#example-19)
  - [usePageHostName](#usepagehostname)
    - [Interface](#interface-20)
    - [Example](#example-20)
  - [usePageUrl](#usepageurl)
    - [Interface](#interface-21)
    - [Example](#example-21)
  - [usePageOrigin](#usepageorigin)
    - [Interface](#interface-22)
    - [Example](#example-22)
  - [usePagePassword](#usepagepassword)
    - [Interface](#interface-23)
    - [Example](#example-23)
  - [usePageUserName](#usepageusername)
    - [Interface](#interface-24)
    - [Example](#example-24)
  - [usePagePath](#usepagepath)
    - [Interface](#interface-25)
    - [Example](#example-25)
  - [usePageProtocol](#usepageprotocol)
    - [Interface](#interface-26)
    - [Example](#example-26)
  - [usePagePort](#usepageport)
    - [Interface](#interface-27)
    - [Example](#example-27)
  - [usePage](#usepage)
    - [Interface](#interface-28)
    - [Example](#example-28)
  - [match](#match)
    - [Interface](#interface-29)
    - [Example](#example-29)
  - [matchParameters](#matchparameters)
    - [Interface](#interface-30)
    - [Example](#example-30)
  - [join](#join)
    - [Interface](#interface-31)
    - [Example](#example-31)
  - [withParameters](#withparameters)
    - [Interface](#interface-32)
    - [Example](#example-32)
  - [useReady](#useready)
    - [Interface](#interface-33)
    - [Example](#example-33)
- [Issues](#issues)
- [Changelog](#changelog)
- [Code of conduct](#code-of-conduct)
- [Contributing](#contributing)
- [License](#license)
- [Security](#security)

## Requirements

- [Node](https://nodejs.org)
- [NPM](https://www.npmjs.com/)
- [Preact](https://www.npmjs.com/package/preact)

[Summary](#summary)

## Installation

```bash
npm install preact-page
```

[Summary](#summary)

## Usage

```tsx
import { render } from "preact"
import { Main } from "./main"
import { pages } from "./pages"
import { PageProvider } from "preact-page"

const rootElement = document.getElementById("root")

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("Root element not found")
}

render(
  <PageProvider pages={pages}>
    <Main />
  </PageProvider>,
  rootElement
)

```

```tsx
import { PageView } from "preact-page"

export const Main = () => {
  return (
    <PageView />
  )
}
```

```tsx
export default () => {
  return (
    <h1>Home page</h1>
  )
}
```

```tsx
import { PagesInterface } from "preact-page"
import HomePage from "./home"

export const pages: PagesInterface = [
  {
    path: "/",
    element: <HomePage />
  }
]
```

[Summary](#summary)

## Examples

See [`examples`](https://github.com/aminnairi/preact-page/tree/development/examples).

## Template Scafolding

After you finished reviewing the examples, you can choose to work from one or another by following the steps bellow.

### Client-side rendering

```bash
npx degit aminnairi/preact-page/examples/client-side-rendering my-project
cd my-project
npm install --save --save-exact preact-page
```

### Server-side rendering

```bash
npx degit aminnairi/preact-page/examples/server-side-rendering my-project
cd my-project
npm install --save --save-exact preact-page
```

## API

[Summary](#summary)

### PageProvider

This is the component that should be on top of all of the components in which you wish to use the other library's components & hooks. You can also set a base URL in case you are using this router in a sub-page like GitHub Pages or GitLab Pages. Routes do not have to use the base URL in the `pages` array since it is automatically handled by all the components & hooks for you. Any title, description or meta is automatically added for you so you don't have to do anything for this part.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent, ComponentChildren } from "preact"

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

export interface PageProviderInterface {
    pages: PagesInterface
    scrollRestauration?: ScrollRestoration
    base: string
}

export declare const PageProvider: FunctionComponent<PageProviderInterface>
```

[Summary](#summary)

#### Example

```tsx
import { render } from "preact"
import { PageProvider } from "preact-page"
import { Main } from "./main"
import { pages } from "./pages"

const rootElement = document.getElementById("root")

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("Root element not found")
}

render(
  <PageProvider pages={pages} base="/preact-page">
    <Main />
  </PageProvider>,
  rootElement
)
```

```tsx
import { PagesInterface } from "preact-page"
import HomePage from "./home"
import AboutPage from "./about"
import UserPage from "./user"
import UsersPage from "./users"

export const pages: PagesInterface = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/users",
    element: <UsersPage />
  },
  {
    path: "/users/:user",
    element: <UserPage />
  }
]
```

With lazy loaded routes.

```tsx
import { PagesInterface } from "preact-page"
import { lazy } from "preact/compat"

const HomePage = lazy(() => import("./home"))
const AboutPage = lazy(() => import("./about"))
const UserPage = lazy(() => import("./user"))
const UsersPage = lazy(() => import("./users"))

export const pages: PagesInterface = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/users",
    element: <UsersPage />
  },
  {
    path: "/users/:user",
    element: <UserPage />
  }
]
```

You can also provide a title.

```tsx
import { PagesInterface } from "preact-page"
import HomePage from "./home"
import AboutPage from "./about"
import UserPage from "./user"
import UsersPage from "./users"

export const pages: PagesInterface = [
  {
    path: "/",
    title: (pageParameters) => "Home",
    element: <HomePage />
  },
  {
    path: "/about",
    title: (pageParameters) => "About",
    element: <AboutPage />
  },
  {
    path: "/users",
    title: (pageParameters) => "Users",
    element: <UsersPage />
  },
  {
    path: "/users/:user",
    title: ({ user }) => `User#${user}`
    element: <UserPage />
  }
]
```

And a description.

```tsx
import { PagesInterface } from "preact-page"
import HomePage from "./home"
import AboutPage from "./about"
import UserPage from "./user"
import UsersPage from "./users"

export const pages: PagesInterface = [
  {
    path: "/",
    title: (pageParameters) => "Home",
    description: (pageParameters) => "Home page description",
    element: <HomePage />
  },
  {
    path: "/about",
    title: (pageParameters) => "About",
    description: (pageParameters) => "About page description",
    element: <AboutPage />
  },
  {
    path: "/users",
    title: (pageParameters) => "Users",
    description: (pageParameters) => "Users page description",
    element: <UsersPage />
  },
  {
    path: "/users/:user",
    title: ({ user }) => `User#${user}`
    description: ({ user }) => `User#${user} details page description`,
    element: <UserPage />
  }
]
```

And even some additional per-page metas.

```tsx
import { PagesInterface } from "preact-page"
import HomePage from "./home"
import AboutPage from "./about"
import UserPage from "./user"
import UsersPage from "./users"

export const pages: PagesInterface = [
  {
    path: "/",
    title: (pageParameters) => "Home",
    description: (pageParameters) => "Home page description",
    metas: [
      (pageParameters) => ({ name: "theme-color", content: "#ffffff" })
    ],
    element: <HomePage />
  },
  {
    path: "/about",
    title: (pageParameters) => "About",
    description: (pageParameters) => "About page description",
    metas: [
      (pageParameters) => ({ name: "theme-color", content: "#000000" })
    ],
    element: <AboutPage />
  },
  {
    path: "/users",
    title: (pageParameters) => "Users",
    description: (pageParameters) => "Users page description",
    metas: [
      (pageParameters) => ({ name: "theme-color", content: "#ffffff" })
    ],
    element: <UsersPage />
  },
  {
    path: "/users/:user",
    title: ({ user }) => `User#${user}`
    description: ({ user }) => `User#${user} details page description`,
    metas: [
      ({ user }) => ({
        name: "theme-color",
        content: user === "1" ? "#ff00ff" : "#ffffff"
      })
    ],
    element: <UserPage />
  }
]
```

[Summary](#summary)

### PageView

This is where the library will inject the matching element for a given path. You can add a property to control what to show whenever no pages matches the current path.

[Summary](#summary)

#### Interface

```typescript
import { ComponentChildrenn, FunctionComponent } from "preact"

export interface PageViewInterface {
    fallback?: ComponentChildren
    loading?: ComponentChildren
}

export declare const PageView: FunctionComponent<PageViewInterface>
```

[Summary](#summary)

#### Example

```tsx
import { PageView } from "preact-page"

export const Main = () => {
  return (
    <PageView />
  )
}
```

With a fallback page

```tsx
export default () => {
  return (
    <h1>Not found</h1>
  )
}
```

```tsx
import { PageView } from "preact-page"
import NotFoundPage from "./pages/not-found"

export const Main = () => {
  return (
    <PageView fallback={<NotFoundPage />} />
  )
}
```

With a loading page for lazy pages.

```tsx
export const Loading = () => {
  return (
    <h1>Loading...</h1>
  )
}
```

```tsx
import { PageView } from "preact-page"
import { Loading } from "./components/loading"

export const Main = () => {
  return (
    <PageView loading={<Loading />} />
  )
}
```

[Summary](#summary)

### PageLink

This is the component you may use to redirect the user to another page on click. This component renders an anchor tag with respect for the `href` attribute and prevent the default behavior of the browser that would otherwise reload the page entirely. Lastly, you can add a class name that will be added only when the route matches the path of the current link.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export interface PageLinkInterface {
    path: string
    replace?: boolean
    activeClassName?: string
}

export declare const PageLink: FunctionComponent<PageLinkInterface>
```

[Summary](#summary)

#### Example

```tsx
import { PageLink } from "preact-page"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <PageLink path="/" replace>
              Home
            </PageLink>
          </li>
          <li>
            <PageLink path="/about" activeClassName="active">
              About
            </PageLink>
          </li>
          <li>
            <PageLink path="/users/123">
              User
            </PageLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

[Summary](#summary)

### PageRedirect

This is the component you may use if you would like to redirect the user when the page is not accessible anymore or has been moved for instance. You can redirect to any page and you can also replace the history of the browser if you want. This is particularly useful if redirectiig the user after a logout for instance.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export interface PageRedirectInterface {
    path: string
    replace?: boolean
}

export declare const PageRedirect: FunctionComponent<PageRedirectInterface>
```

[Summary](#summary)

#### Example

```tsx
import { PageRedirect } from "preact-page"

export default () => {
  return (
    <PageRedirect path="/" />
  )
}
```

```tsx
import { PageRedirect } from "preact-page"

export default () => {
  return (
    <PageRedirect path="/login" replace />
  )
}
```

[Summary](#summary)

### PageBack

This component let's you navigate back in the history if there is an entry available.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export declare const PageBack: FunctionComponent
```

[Summary](#summary)

#### Example

```tsx
import { PageBack } from "preact-page"

export default () => {
  return (
    <PageBack />
  )
}
```

[Summary](#summary)

### PageForward

This component let's you navigate forward in the history if there is an entry available.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export declare const PageForward: FunctionComponent
```

[Summary](#summary)

#### Example

```tsx
import { PageForward } from "preact-page"

export default () => {
  return (
    <PageForward />
  )
}
```

[Summary](#summary)

### PageGo

This component let's you navigate in any direction of any page count of your choice in the history.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export interface PageGoInterface {
    offset: number
}

export declare const PageGo: FunctionComponent<PageGoInterface>
```

[Summary](#summary)

#### Example

```tsx
import { PageGo } from "preact-page"

export default () => {
  return (
    <PageGo offset={2} />
  )
}
```

```tsx
import { PageGo } from "preact-page"

export default () => {
  return (
    <PageGo offset={-2} />
  )
}
```

[Summary](#summary)

### PageStaticProvider

This commponent let's you render your pages statically by giving it the path you want to render. Sounds not very interesting from the point-of-view of a client-side application which is supposed to be dynamic and not static so do not use it on the client-side. However, from the point-of-view of a server-side rendering, this is great because it let's you map your HTTP server's request path to your view. In simple terms, this simply means that you can pre-render your page from the server and hydrate it afterwards from the client.

[Summary](#summary)

#### Interface

```typescript
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

export interface PageProviderInterface {
    pages: PagesInterface
    scrollRestauration?: ScrollRestoration
    base?: string
}

export interface PageStaticProviderInterface extends PageProviderInterface {
    path: string
}

export declare const PageStaticProvider: FunctionComponent<PageStaticProviderInterface>
```

[Summary](#summary)

#### Example

```bash
npm install express preact-ssr-prepass preact-render-to-string
```

```tsx
import express from "express"
import prepass from "preact-ssr-prepass"
import { PageStaticProvider } from "preact-page"
import { render } from "preact-render-to-string"
import { Main } from "../client/main"
import { pages } from "../client/pages"

const server = express()

server.get("/api/users", (request, response) => {
  response.json({
    success: true,
    users: []
  })
})

server.use(express.static("build/client"))

server.all("*", async (request, response) => {
  const virtualDom = (
    <PageStaticProvider pages={pages} path={request.url}>
      <html lang="en-US">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="App description" />
          <title>App</title>
          <script src="/index.js" type="module"></script>
        </head>
        <body>
          <div id="root">
            <Main />
          </div>
        </body>
      </html>
    </PageStaticProvider>
  )
  
  await prepass(virtualDom)
  
  response.set("Content-Type", "text/html").send("<!DOCTYPE html>" + render(virtualDom))
})

server.listen(8000, () => {
  console.log("Server listening on http://localhost:8000")
})
```

```tsx
import { hydrate } from "preact"
import { PageProvider } from "preact-page"
import { Main } from "./main"
import { pages } from "./pages"

const rootElement = document.getElementById("root")

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("Root element not found")
}

hydrate(
  <PageProvider pages={pages}>
    <Main />
  </PageProvider>,
  rootElement
)
```

[Summary](#summary)

### PageTitle

This component let's you use the page title set in the `pages` array of the provider directly into your markup. This is pretty much useful only when doing server-side rendering as displaying the markup for a meta is not necessary when using the client-side provider and is done automatically for you.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export declare const PageTitle: FunctionComponent
```

[Summary](#summary)

#### Example

```bash
npm install express preact-ssr-prepass preact-render-to-string
```

```tsx
import express from "express"
import prepass from "preact-ssr-prepass"
import { PageStaticProvider, PageTitle } from "preact-page"
import { render } from "preact-render-to-string"
import { Main } from "../client/main"
import { pages } from "../client/pages"

const server = express()

server.get("/api/users", (request, response) => {
  response.json({
    success: true,
    users: []
  })
})

server.use(express.static("build/client"))

server.all("*", async (request, response) => {
  const virtualDom = (
    <PageStaticProvider pages={pages} path={request.url}>
      <html lang="en-US">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <PageTitle />
          <script src="/index.js" type="module"></script>
        </head>
        <body>
          <div id="root">
            <Main />
          </div>
        </body>
      </html>
    </PageStaticProvider>
  )
  
  await prepass(virtualDom)
  
  response.set("Content-Type", "text/html").send("<!DOCTYPE html>" + render(virtualDom))
})

server.listen(8000, () => {
  console.log("Server listening on http://localhost:8000")
})
```

[Summary](#summary)

### PageDescription

This component let's you use the page description set in the `pages` array of the provider directly into your markup. This is pretty much useful only when doing server-side rendering as displaying the markup for a meta is not necessary when using the client-side provider and is done automatically for you.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export declare const PageDescription: FunctionComponent
```

[Summary](#summary)

#### Example

```bash
npm install express preact-ssr-prepass preact-render-to-string
```

```tsx
import express from "express"
import prepass from "preact-ssr-prepass"
import { PageStaticProvider, PageDescription } from "preact-page"
import { render } from "preact-render-to-string"
import { Main } from "../client/main"
import { pages } from "../client/pages"

const server = express()

server.get("/api/users", (request, response) => {
  response.json({
    success: true,
    users: []
  })
})

server.use(express.static("build/client"))

server.all("*", async (request, response) => {
  const virtualDom = (
    <PageStaticProvider pages={pages} path={request.url}>
      <html lang="en-US">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <PageDescription />
          <script src="/index.js" type="module"></script>
        </head>
        <body>
          <div id="root">
            <Main />
          </div>
        </body>
      </html>
    </PageStaticProvider>
  )
  
  await prepass(virtualDom)
  
  response.set("Content-Type", "text/html").send("<!DOCTYPE html>" + render(virtualDom))
})

server.listen(8000, () => {
  console.log("Server listening on http://localhost:8000")
})
```

[Summary](#summary)

### PageMetas

This component let's you use the metas set in the `pages` array of the provider directly into your markup. This is pretty much useful only when doing server-side rendering as displaying the markup for a meta is not necessary when using the client-side provider and is done automatically for you.

[Summary](#summary)

#### Interface

```typescript
import { FunctionComponent } from "preact"

export declare const PageMetas: FunctionComponent
```

[Summary](#summary)

#### Example

```bash
npm install express preact-ssr-prepass preact-render-to-string
```

```tsx
import express from "express"
import prepass from "preact-ssr-prepass"
import { PageStaticProvider, PageMetas } from "preact-page"
import { render } from "preact-render-to-string"
import { Main } from "../client/main"
import { pages } from "../client/pages"

const server = express()

server.get("/api/users", (request, response) => {
  response.json({
    success: true,
    users: []
  })
})

server.use(express.static("build/client"))

server.all("*", async (request, response) => {
  const virtualDom = (
    <PageStaticProvider pages={pages} path={request.url}>
      <html lang="en-US">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <PageMetas />
          <script src="/index.js" type="module"></script>
        </head>
        <body>
          <div id="root">
            <Main />
          </div>
        </body>
      </html>
    </PageStaticProvider>
  )
  
  await prepass(virtualDom)
  
  response.set("Content-Type", "text/html").send("<!DOCTYPE html>" + render(virtualDom))
})

server.listen(8000, () => {
  console.log("Server listening on http://localhost:8000")
})
```

[Summary](#summary)

### usePageLink

This hook let's you use the function that is used internally by the `<PageLink>` component to navigate programmatically in the history. Note that if you are using a base URL, you don't have to account for the base URL in the given path to the `pageLink` function since it is handled automatically for you at runtime.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageLink: () => (path: string, replace?: boolean) => void
```

[Summary](#summary)

#### Example

```tsx
import { usePageLink } from "preact-page"

export const HomeButton = () => {
  const pageLink = usePageLink()
  
  return (
    <button onClick={() => pageLink("/")}>
      Home
    </button>
  )
}
```

```tsx
import { usePageLink } from "preact-page"

export const LogoutButton = () => {
  const pageLink = usePageLink()
  
  return (
    <button onClick={() => pageLink("/login", true)}>
      Logout
    </button>
  )
}
```

[Summary](#summary)

### usePageBack

This hook let's you programmatically navigate back in the history.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageBack: () => () => void
```

[Summary](#summary)

#### Example

```tsx
import { usePageBack } from "preact-page"

export const BackButton = () => {
  const pageBack = usePageBack()
  
  return (
    <button onClick={pageBack}>
      Back
    </button>
  )
}
```

[Summary](#summary)

### usePageFoward

This hook let's you programmatically navigate back in the history.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageForward: () => () => void
```

[Summary](#summary)

#### Example

```tsx
import { usePageForward } from "preact-page"

export const ForwardButton = () => {
  const pageForward = usePageForward()
  
  return (
    <button onClick={pageForward}>
      Forward
    </button>
  )
}
```

[Summary](#summary)

### usePageGo

This hook let's you programmatically navigate in any direction of your choice in any count in the history.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageGo: () => (offset: number) => void
```

[Summary](#summary)

#### Example


```tsx
import { usePageGo } from "preact-page"

export const GoBackButton = () => {
  const pageGo = usePageGo()
  
  return (
    <button onClick={() => pageGo(-2)}>
      Go Back Two Pages
    </button>
  )
}
```

[Summary](#summary)

### usePageParameters

This hook let's you use the parameters that have been setup when adding a route. A parameter is something that looks like `:user` or `:article` in a path like `/users/:user` or `/articles/:article`. Since it may be easy to make a mistake when updating the route, the return value is a record that may define a string for a given property, or not. In this case, you have to account for possible case where the parameter might be undefined (when updating the route parameter's name).

[Summary](#summary)

#### Interface

```typescript
export type PageParameters = Record<string, string | undefined>

export declare const usePageParameters: () => PageParameters
```

[Summary](#summary)

#### Example

```tsx
import { usePageParameters } from "preact-page"

export default () => {
  const { user } = usePageParameters()

  return (
    <h1>User#{user ?? "unknown"}</h1>
  )
}
```

[Summary](#summary)

### useBaseUrl

Let's you access the base url defined in the provider.

[Summary](#summary)

#### Interface

```typescript
export declare const useBaseUrl: () => string
```

[Summary](#summary)

#### Example

```tsx
import { useBaseUrl } from "preact-page"

export default () => {
  const baseUrl = useBaseUrl()
  
  return (
    <p>Base url is {baseUrl}</p>
  )
}
```

[Summary](#summary)

### usePageQuery

This hook let's you use the query parameters of the URL, for instance if the URL looks like `https://domain.com/page?query=something`, the query would be equal to `?query=something`. In this case, this hook let's you access the query as a record of string. Note that a query might not always be there, even if the route matches so you have to account for cases where the query might be `undefined`.

> Note: this hook will apply parameter pollution cleaning, making it remove any duplicate queries in the URL. If the URL looks like `https://domain.com?sort=date&sort=name&sort=email`, the `sort` query parameter will be equal to `date` which is the first encountered parameter in the URL. This prevents [HTTP Parameter Pollution](https://en.wikipedia.org/wiki/HTTP_parameter_pollution) and makes it impossible for an attacker to inject more parameters in the URL afterwards. If you need to get all of the parameters, even the duplicated ones, use the `new URLSearchParams(window.location.search)` and use the `URLSearchParams.prototype.entries` method on it, although it is really not recommended at all for security reasons.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageQuery: () => Record<string, string | undefined>
```

[Summary](#summary)

#### Example

```tsx
import { usePageQuery } from "preact-page"

export default () => {
  const { sort } = usePageQuery()

  return (
    <p>Users sorted by {sort ?? "date"}</p>
  )
}
```

[Summary](#summary)

### usePageHash

This hook let's you access the hash in the URL. For instance, if the URL looks like `https://domain.com/oauth/login/return#token`, the hash (or fragment) would be equal to `token` in this case. This is useful when dealing with OAuth2 login flow where a token might be set in the hash part of your URL for instance.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageHash: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePageHash } from "preact-page"

const OAuthLoginPage = () => {
  const token = usePageHash()

  return (
    <p>Token is {token}</p>
  )
}
```

[Summary](#summary)

### usePageHost

This hook let's you access the host of your URL. For instance, if the URL looks like `https://domain.com:8000/page`, the host would be `domain.com:8000` including the port.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageHost: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePageHost } from "preact-page"

const HomePage = () => {
  const host = usePageHost()

  return (
    <p>Host is {host}</p>
  )
}
```

[Summary](#summary)

### usePageHostName

This hook let's you access the host of your URL. For instance, if the URL looks like `https://domain.com:8000/page`, the host would be `domain.com` ignoring the port.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageHostName: () => string
```

[Summary](#summary)

#### Example

```tsx
import { Fragment } from "preact"
import { usePageHostName } from "preact-page"

const HomePage = () => {
  const hostName = usePageHostName()

  return (
    <p>Host name is {hostName}</p>
  )
}
```

[Summary](#summary)

### usePageUrl

This hook let's you access the full URL, meaning everything from the protocol up until the hash.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageUrl: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePageUrl } from "preact-page"

const HomePage = () => {
  const url = usePageUrl()

  return (
    <p>Url is {url}</p>
  )
}
```

[Summary](#summary)

### usePageOrigin

This hook let's you access the origin of the request. For instance, if the URL looks like `https://domain.com:8000/page`, the origin would be equal to `https://domain.com:8000`.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageOrigin: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePageUrl } from "preact-page"

const HomePage = () => {
  const url = usePageUrl()

  return (
    <p>Url is {url}</p>
  )
}
```

[Summary](#summary)

### usePagePassword

This hook let's you access the password of a URL. Though it is rarely useful in the context of a client-side application, you can access it. For instance, if the URL looks like `https://username:password@domain.com/page`, the password would be equal to `password`.

[Summary](#summary)

#### Interface

```typescript
export declare const usePagePassword: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePagePassword } from "preact-page"

const HomePage = () => {
  const password = usePagePassword()

  return (
    <p>Password is {password}</p>
  )
}
```

[Summary](#summary)

### usePageUserName

This hook let's you access the user name of a URL. Though it is rarely useful in the context of a client-side application, you can access it. For instance, if the URL looks like `https://username:password@domain.com/page`, the user name would be equal to `username`.

[Summary](#summary)

#### Interface

```typescript
export declare const usePageUserName: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePageUserName } from "preact-page"

const HomePage = () => {
  const userName = usePageUserName()

  return (
    <p>User name is {userName}</p>
  )
}
```

[Summary](#summary)

### usePagePath

This hook let's you access the path of a URL. For instance, if the URL looks like `https://domain.com/resources/users?sort=date#token`, the path would be equal to `/resources/users`.

[Summary](#summary)

#### Interface

```typescript
export declare const usePagePath: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePagePath } from "preact-page"

const HomePage = () => {
  const path = usePagePath()

  return (
    <p>Path is {path}</p>
  )
}
```

[Summary](#summary)

### usePageProtocol

This hook let's you access the protocol of a URL. For instance, if the URL looks like `https://domain.com`, the domain would be equal to `https:` (without the double-slashes at the end but with a semi-colon).

[Summary](#summary)

#### Interface

```typescript
export declare const usePageProtocol: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePageProtocol } from "preact-page"

const HomePage = () => {
  const protocol = usePageProtocol()

  return (
    <p>Protocol is {protocol}</p>
  )
}
```

[Summary](#summary)

### usePagePort

This hook let's you access the port of a URL. For instance, if the URL looks like `https://domain.com:8000/page`, the port would be equal to `8000`.

[Summary](#summary)

#### Interface

```typescript
export declare const usePagePort: () => string
```

[Summary](#summary)

#### Example

```tsx
import { usePagePort } from "preact-page"

const HomePage = () => {
  const port = usePagePort()

  return (
    <p>Port is {port}</p>
  )
}
```

[Summary](#summary)

### usePage

This hooks let's you get the page that is currently matched by the provider. This is a hook that is useful internally for working with server side render for instance, but this might not be very interesting to use from the point-of-view of the user of this library. This is still available for completeness.

[Summary](#summary)

#### Interface

```typescript
import { ComponentChildren } from "preact"

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

export declare const usePage: () => PageInterface | undefined
```

[Summary](#summary)

#### Example

```tsx
import { usePage } from "preact-page"

export default () => {
  const page = usePage()
  
  useEffect(() => {
    if (page) {
      console.log(page.path)
    }
  }, [page])

  return (
    <h1>Home page</h1>
  )
}
```

[Summary](#summary)

### match

This function let's you match a URL that looks like a path you set in the `pages` like `/users/:user` with some parameters eventually. It will be matched against another path which is a concrete path, like the path of your URL. This function is used internally to match URLs and should not be used in a regular basis. It is exposed for completeness purposes and in the hope that it may be useful if you need to extend the capabilities of this library.

[Summary](#summary)

#### Interface

```typescript
export declare const match: (route: string, path: string) => boolean
```

[Summary](#summary)

#### Example

```typescript
import { match } from "preact-page"

match("/users/:user", "/users") === false
match("/users/:user", "/users/123") === true
match("/users/:user", "/users/123/articles") === false
```

[Summary](#summary)

### matchParameters

This function let's you get the parameters of a URL that looks like a path you set in the `pages` like `/users/:user` with some parameters eventually. It will be matched against another path which is a concrete path, like the path of your URL. This function is used internally to match URLs and should not be used in a regular basis. It is exposed for completeness purposes and in the hope that it may be useful if you need to extend the capabilities of this library.

[Summary](#summary)

#### Interface

```typescript
export type PageParameters = Record<string, string | undefined>

export declare const matchParameters: (route: string, path: string) => PageParameters
```

[Summary](#summary)

#### Example

```typescript
import { matchParameters } from "preact-page"

matchParameters("/users/:user", "/users") === {}
matchParameters("/users/:user", "/users/123") === {"user": "123"}
matchParameters("/users/:user", "/users/123/articles") === {"user", "123"}
```

[Summary](#summary)

### join

This function let's you join multiple path, without the headache of handling dangling or multiple slashes. This function is used internally to join URLs and should not be used in a regular basis. It is exposed for completeness purposes and in the hope that it may be useful if you need to extend the capabilities of this library.

[Summary](#summary)

#### Interface

```typescript
export declare const join: (...paths: Array<string>) => string
```

[Summary](#summary)

#### Example

```tsx
import { join } from "preact-page"

join("", "/articles/") === "/articles"
join("/preact-page", "/") === "/preact-page"
join("/preact-page", "/users/123/") === "/preact-page/users/123"
```

[Summary](#summary)

### withParameters

This function let's you replace a parameterized route with the wanted parameters. This is useful in case where you need to create paths that are based on a dynamic path like a user details page for instance.

[Summary](#summary)

#### Interface

```typescript
export declare const withParameters: (path: string, parameters: Record<string, string>) => string
```

[Summary](#summary)

#### Example

```typescript
import { withParameters } from "preact-page"

withParameters("/users/:user", {}) === "/users/:user"
withParameters("/users/:user", { user: "123" }) === "/users/123"
withParameters("/users/:id", { user: "123" }) === "/users/:id"
```

[Summary](#summary)

### useReady

This hook let's you know whenever the provider is ready to listen for route changes. This is useful if you want to programmatically handle the History API, but still want to get the reactivity of this library. Though it is available and exposed for completeness, it should not be used in a regular basis.

[Summary](#summary)

#### Interface

```typescript
export declare const useReady: () => boolean
```

[Summary](#summary)

#### Example

```tsx
import { useReady } from "preact-page"

const HomePage = () => {
  const ready = useReady()

  return (
    <p>Ready to listen to page updates? {ready ? "Yes" : "No"}</p>
  )
}
```

[Summary](#summary)

## Issues

See [`issues`](https://github.com/aminnairi/preact-page/issues).

[Summary](#summary)

## Changelog

See [`CHANGELOG.md`](https://github.com/aminnairi/preact-page/blob/development/CHANGELOG.md).

[Summary](#summary)

## Code of conduct

See [`CODE_OF_CONDUCT`](https://github.com/aminnairi/preact-page/blob/development/CODE_OF_CONDUCT.md).

[Summary](#summary)

## Contributing

See [`CONTRIBUTING.md`](https://github.com/aminnairi/preact-page/blob/development/CONTRIBUTING.md).

[Summary](#summary)

## License

See [`LICENSE`](https://github.com/aminnairi/preact-page/blob/development/LICENSE).

[Summary](#summary)

## Security

See [`SECURITY.md`](https://github.com/aminnairi/preact-page/blob/development/SECURITY.md).

[Summary](#summary)
