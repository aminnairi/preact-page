# preact-page
 
History Web API implementation for Preact written in TypeScript

[![NPM](https://badgen.net/npm/v/preact-page)](https://npmjs.com/package/preact-page) ![Bundlephobia](https://badgen.net/bundlephobia/minzip/preact-page) ![Snyk](https://badgen.net/snyk/aminnairi/preact-page) ![Types](https://badgen.net/npm/types/preact-page)

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

This is the component that should be on top of all of the components in which you wish to use the other library's components & hooks. You can also set a base URL in case you are using this router in a sub-page like GitHub Pages or GitLab Pages. Routes do not have to use the base URL in the `pages` array since it is automatically handled by all the components & hooks for you.

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
    base: string
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
  <PageProvider pages={pages} base="/preact-page">
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

This component let's you navigate back in the history if there is an entry available.

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

This component let's you navigate forward in the history if there is an entry available.

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

This component let's you navigate in any direction of any page count of your choice in the history.

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

This hook let's you use the function that is used internally by the `<PageLink>` component to navigate programmatically in the history. Note that if you are using a base URL, you don't have to account for the base URL in the given path to the `pageLink` function since it is handled automatically for you at runtime.

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

This hook let's you programmatically navigate back in the history.

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

This hook let's you programmatically navigate back in the history.

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

This hook let's you programmatically navigate in any direction of your choice in any count in the history.

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

This hook let's you use the parameters that have been setup when adding a route. A parameter is something that looks like `:user` or `:article` in a path like `/users/:user` or `/articles/:article`. Since it may be easy to make a mistake when updating the route, the return value is a record that may define a string for a given property, or not. In this case, you have to account for possible case where the parameter might be undefined (when updating the route parameter's name).

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

### useBaseUrl

Let's you access the base url defined in the provider.

#### Interface

```typescript
export declare const useBaseUrl: () => string;
```

#### Example

```tsx
import { useBaseUrl } from "preact-page"

export const HomePage = () => {
  const baseUrl = useBaseUrl()
  
  return (
    <p>Base url is {baseUrl}</p>
  )
}
```

### usePageSearchParameters

This hook let's you use the query parameters of the URL, for instance if the URL looks like `https://domain.com/page?query=something`, the query would be equal to `?query=something`. In this case, this hook let's you access the query as a record of string. Note that a query might not always be there, even if the route matches so you have to account for cases where the query might be `undefined`.

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

This hook let's you access the hash in the URL. For instance, if the URL looks like `https://domain.com/oauth/login/return#token`, the hash (or fragment) would be equal to `token` in this case. This is useful when dealing with OAuth2 login flow where a token might be set in the hash part of your URL for instance.

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

This hook let's you access the host of your URL. For instance, if the URL looks like `https://domain.com:8000/page`, the host would be `domain.com:8000` including the port.

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

This hook let's you access the host of your URL. For instance, if the URL looks like `https://domain.com:8000/page`, the host would be `domain.com` ignoring the port.

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

This hook let's you access the full URL, meaning everything from the protocol up until the hash.

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

This hook let's you access the origin of the request. For instance, if the URL looks like `https://domain.com:8000/page`, the origin would be equal to `https://domain.com:8000`.

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

This hook let's you access the password of a URL. Though it is rarely useful in the context of a client-side application, you can access it. For instance, if the URL looks like `https://username:password@domain.com/page`, the password would be equal to `password`.

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

This hook let's you access the user name of a URL. Though it is rarely useful in the context of a client-side application, you can access it. For instance, if the URL looks like `https://username:password@domain.com/page`, the user name would be equal to `username`.

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

This hook let's you access the path of a URL. For instance, if the URL looks like `https://domain.com/resources/users?sort=date#token`, the path would be equal to `/resources/users`.

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

This hook let's you access the protocol of a URL. For instance, if the URL looks like `https://domain.com`, the domain would be equal to `https:` (without the double-slashes at the end but with a semi-colon).

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

This hook let's you access the port of a URL. For instance, if the URL looks like `https://domain.com:8000/page`, the port would be equal to `8000`.

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

This function let's you match a URL that looks like a path you set in the `pages` like `/users/:user` with some parameters eventually. It will be matched against another path which is a concrete path, like the path of your URL. This function is used internally to match URLs and should not be used in a regular basis. It is exposed for completeness purposes and in the hope that it may be useful if you need to extend the capabilities of this library.

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

This function let's you get the parameters of a URL that looks like a path you set in the `pages` like `/users/:user` with some parameters eventually. It will be matched against another path which is a concrete path, like the path of your URL. This function is used internally to match URLs and should not be used in a regular basis. It is exposed for completeness purposes and in the hope that it may be useful if you need to extend the capabilities of this library.

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

### join

This function let's you join multiple path, without the headache of handling dangling or multiple slashes. This function is used internally to join URLs and should not be used in a regular basis. It is exposed for completeness purposes and in the hope that it may be useful if you need to extend the capabilities of this library.

#### Interface

```typescript
export declare const join: (...paths: Array<string>) => string;
```

#### Example

```tsx
import { join } from "preact-page"

join("", "/articles/") === "/articles"
join("/preact-page", "/") === "/preact-page"
join("/preact-page", "/users/123/") === "/preact-page/users/123"
```

### useReady

This hook let's you know whenever the provider is ready to listen for route changes. This is useful if you want to programmatically handle the History API, but still want to get the reactivity of this library. Though it is available and exposed for completeness, it should not be used in a regular basis.

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
