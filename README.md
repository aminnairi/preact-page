# preact-page
 
History Web API implementation for Preact written in TypeScript

[![NPM](https://badgen.net/npm/v/preact-page)](https://npmjs.com/package/preact-page) ![Bundlephobia](https://badgen.net/bundlephobia/minzip/preact-page) ![Snyk](https://badgen.net/snyk/aminnairi/preact-page)

## Requirements

- [Node](https://nodejs.org)
- [NPM](https://www.npmjs.com/)
- [Preact](https://www.npmjs.com/package/preact)

## Installation

```bash
npm install preact-page
```

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
import { Fragment } from "preact"
import { PageView } from "preact-page"
import { NotFoundPage } from "./pages/not-found"

export const Main = () => {
  return (
    <Fragment>
      <PageView fallback={<NotFoundPage />} />
    </Fragment>
  )
}
```

```tsx
export const HomePage = () => {
  return (
    <h1>Home page</h1>
  )
}
```

```tsx
export const NotFoundPage = () => {
  return (
    <h1>Not found</h1>
  )
}
```

```tsx
import { HomePage } from "./home"
import { AboutPage } from "./about";
import { UserPage } from "./user";
import { PagesInterface } from "preact-page";

export const pages: PagesInterface = [
  {
    path: "/",
    element: <HomePage />
  }
]
```

## API

### PageProvider

This is the component that should be on top of all of the components in which you wish to use the other library's components & hooks.

#### Interface

```typescript
import { FunctionComponent } from "preact"

export interface PageInterface {
    path: string;
    element: ComponentChildren;
}

export type PagesInterface = Array<PageInterface>;

export interface PageProviderInterface {
    pages: PagesInterface;
    scrollRestauration?: ScrollRestoration;
}

export declare const PageProvider: FunctionComponent<PageProviderInterface>;
```

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
  <PageProvider pages={pages}>
    <Main />
  </PageProvider>,
  rootElement
)
```

```tsx
import { HomePage } from "./home"
import { AboutPage } from "./about";
import { UserPage } from "./user";
import { UsersPage } from "./users";

export const pages = [
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

### PageView

This is where the library will inject the matching element for a given path. You can add a property to control what to show whenever no pages matches the current path.

#### Interface

```typescript
import { ComponentChildrenn, FunctionComponent } from "preact"

export interface PageViewInterface {
    fallback: ComponentChildren;
}

export declare const PageView: FunctionComponent<PageViewInterface>;
```

#### Example

```tsx
import { Fragment } from "preact"
import { PageView } from "preact-page"
import { NotFoundPage } from "./pages/not-found"

export const Main = () => {
  return (
    <PageView fallback={<NotFoundPage />} />
  )
}
```

```tsx
export const NotFoundPage = () => {
  return (
    <h1>Not found</h1>
  )
}
```

### PageLink

This is the component you may use to redirect the user to another page on click. This component renders an anchor tag with respect for the `href` attribute and prevent the default behavior of the browser that would otherwise reload the page entirely. Lastly, you can add a class name that will be added only when the route matches the path of the current link.

#### Interface

```typescript
import { FunctionComponent } from "preact"

export interface PageLinkProps {
    path: string;
    replace?: boolean;
    activeClassName?: string;
}

export declare const PageLink: FunctionComponent<PageLinkProps>;
```

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

### PageRedirect

This is the component you may use if you would like to redirect the user when the page is not accessible anymore or has been moved for instance. You can redirect to any page and you can also replace the history of the browser if you want. This is particularly useful if redirectiig the user after a logout for instance.

#### Interface

```typescript
import { FunctionComponent } from "preact"

export interface PageRedirectInterface {
    path: string;
    replace?: boolean;
}

export declare const PageRedirect: FunctionComponent<PageRedirectInterface>;
```

#### Example

```tsx
export const OldPage = () => {
  return (
    <PageRedirect path="/" />
  )
}
```

```tsx
import { PageRedirect } from "preact-page"

export const LogoutPage = () => {
  return (
    <PageRedirect path="/login" replace={true} />
  )
}
```

### PageBack

#### Interface

```typescript
import { FunctionComponent } from "preact"

export declare const PageBack: FunctionComponent;
```

#### Example

```tsx
import { PageBack } from "preact-page"

export const AdministrationPage = () => {
  return (
    <PageBack />
  )
}
```

### PageForward

#### Interface

```typescript
import { FunctionComponent } from "preact"

export declare const PageForward: FunctionComponent;
```

#### Example

```tsx
import { PageForward } from "preact-page"

export const AdministrationPage = () => {
  return (
    <PageForward />
  )
}
```

### PageGo

#### Interface

```typescript
import { FunctionComponent } from "preact"

export interface PageGoInterface {
    offset: number;
}

export declare const PageGo: FunctionComponent<PageGoInterface>;
```

#### Example

```tsx
import { PageGo } from "preact-page"

export const AdministrationPage = () => {
  return (
    <PageGo offset={2} />
  )
}
```

```tsx
import { PageGo } from "preact-page"

export const BlogPage = () => {
  return (
    <PageGo offset={-2} />
  )
}
```

### usePageLink

#### Interface

```typescript
export declare const usePageLink: () => (path: string, replace?: boolean) => void;
```

#### Example

```tsx
import { useCallback } from "preact/hooks"
import { usePageLink } from "preact-page"

export const HomeButton = () => {
  const pageLink = usePageLink()
  
  const homePageLink = useCallback(() => {
    pageLink("/")
  }, [pageLink])
  
  return (
    <button onClick={homePageLink}>Home</button>
  )
}
```

```tsx
import { useCallback } from "preact/hooks"
import { usePageLink } from "preact-page"

export const LogoutButton = () => {
  const pageLink = usePageLink()
  
  const logoutPageLink = useCallback(() => {
    pageLink("/login", true)
  }, [pageLink])
  
  return (
    <button onClick={logoutPageLink}>Logout</button>
  )
}
```

### usePageBack

#### Interface

```typescript
export declare const usePageBack: () => () => void;
```

#### Example

```tsx
import { usePageBack } from "preact-page"

export const BackButton = () => {
  const pageBack = usePageBack()
  
  return (
    <button onClick={pageBack}>Back</button>
  )
}
```

### usePageFoward

#### Interface

```typescript
export declare const usePageForward: () => () => void;
```

#### Example

```tsx
import { usePageForward } from "preact-page"

export const ForwardButton = () => {
  const pageForward = usePageForward()
  
  return (
    <button onClick={pageForward}>Forward</button>
  )
}
```

### usePageGo

#### Interface

```typescript
export declare const usePageGo: () => (offset: number) => void;
```

#### Example


```tsx
import { useCallback } from "preact/hooks"
import { usePageGo } from "preact-page"

export const GoBackButton = () => {
  const pageGo = usePageGo()
  
  const goBackTwoPages = useCallback(() => {
    pageGo(-2)
  }, [pageGo])
  
  return (
    <button onClick={goBackTwoPages}>Go Back Two Pages</button>
  )
}
```

### usePageParameters

#### Interface

```typescript
export declare const usePageParameters: () => Record<string, string | undefined>;
```

#### Example

```tsx
import { useMemo } from "preact/hooks"
import { usePageParameters } from "preact-page"

export const UserPage = () => {
  const pageParameters = usePageParameters()

  const user = useMemo(() => {
    return pageParameters["user"] || "???"
  }, [pageParameters])

  return (
    <h1>User#{user}</h1>
  )
}
```

### usePageSearchParameters

#### Interface

```typescript
export declare const usePageSearchParameters: () => Record<string, string | undefined>;
```

#### Example

```tsx
import { useMemo } from "preact/hooks"
import { usePageSearchParameters } from "preact-page"

export const UsersPage = () => {
  const pageSearchParameters = usePageSearchParameters()

  const sort = useMemo(() => {
    return pageSearchParameters["sort"] || "date"
  }, [pageSearchParameters])

  return (
    <p>Users sorted by {sort}</p>
  )
}
```

### usePageHash

#### Interface

```typescript
export declare const usePageHash: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePageHash } from "preact-page"

const OAuthLoginPage = () => {
  const token = usePageHash()

  return (
    <Fragment>
      <h1>OAuth Login</h1>
      <p>Token is {token}</p>
    </Fragment>
  )
}
```

### usePageHost

#### Interface

```typescript
export declare const usePageHost: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePageHost } from "preact-page"

const HomePage = () => {
  const host = usePageHost()

  return (
    <p>Host is {host}</p>
  )
}
```

### usePageHostName

#### Interface

```typescript
export declare const usePageHostName: () => string;
```

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

### usePageUrl

#### Interface

```typescript
export declare const usePageUrl: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePageUrl } from "preact-page"

const HomePage = () => {
  const url = usePageUrl()

  return (
    <p>Url is {url}</p>
  )
}
```

### usePageOrigin

#### Interface

```typescript
export declare const usePageOrigin: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePageUrl } from "preact-page"

const HomePage = () => {
  const url = usePageUrl()

  return (
    <p>Url is {url}</p>
  )
}
```

### usePagePassword

#### Interface

```typescript
export declare const usePagePassword: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePagePassword } from "preact-page"

const HomePage = () => {
  const password = usePagePassword()

  return (
    <p>Password is {password}</p>
  )
}
```

### usePageUserName

#### Interface

```typescript
export declare const usePageUserName: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePageUserName } from "preact-page"

const HomePage = () => {
  const userName = usePageUserName()

  return (
    <p>User name is {userName}</p>
  )
}
```

### usePagePath

#### Interface

```typescript
export declare const usePagePath: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePagePath } from "preact-page"

const HomePage = () => {
  const path = usePagePath()

  return (
    <p>Path is {path}</p>
  )
}
```

### usePageProtocol

#### Interface

```typescript
export declare const usePageProtocol: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePageProtocol } from "preact-page"

const HomePage = () => {
  const protocol = usePageProtocol()

  return (
    <p>Protocol is {protocol}</p>
  )
}
```

### usePagePort

#### Interface

```typescript
export declare const usePagePort: () => string;
```

#### Example

```tsx
import { Fragment } from "preact"
import { usePagePort } from "preact-page"

const HomePage = () => {
  const port = usePagePort()

  return (
    <p>Port is {port}</p>
  )
}
```

### match

#### Interface

```typescript
export declare const match: (route: string, path: string) => boolean;
```

#### Example

```typescript
import { match } from "preact-page"

match("/users/:user", "/users") === false
match("/users/:user", "/users/123") === true
match("/users/:user", "/users/123/articles") === false
```

### matchParameters

#### Interface

```typescript
export declare const matchParameters: (route: string, path: string) => Record<string, string | undefined>;
```

#### Example

```typescript
matchParameters("/users/:user", "/users") === {}
matchParameters("/users/:user", "/users/123") === {"user": "123"}
matchParameters("/users/:user", "/users/123/articles") === {"user", "123"}
```

### useReady

#### Interface

```typescript
export declare const useReady: () => boolean;
```

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

## Issues

See [`issues`](../../issues).

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## Code of conduct

See [`CODE_OF_CONDUCT`](./CODE_OF_CONDUCT.md).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

See [`LICENSE`](./LICENSE).

## Security

See [`SECURITY.md`](./SECURITY.md).
