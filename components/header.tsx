import { PageLink } from "preact-page"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <PageLink path="/" activeClassName="active">
              Home
            </PageLink>
          </li>
          <li>
            <PageLink path="/about" activeClassName="active">
              About
            </PageLink>
          </li>
          <li>
            <PageLink path="/users/2" activeClassName="active">
              User#2
            </PageLink>
          </li>
          <li>
            <PageLink path="/users?sort=email" activeClassName="active">
              All Users
            </PageLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
