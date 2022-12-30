import { PageLink } from "preact-page"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <PageLink path="/">
              Home
            </PageLink>
          </li>
          <li>
            <PageLink path="/about">
              About
            </PageLink>
          </li>
          <li>
            <PageLink path="/user/1">
              User#1
            </PageLink>
          </li>
          <li>
            <PageLink path="/user/2">
              User#2
            </PageLink>
          </li>
          <li>
            <PageLink path="/user/3">
              User#3
            </PageLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
