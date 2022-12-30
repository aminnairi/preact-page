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
            <PageLink path="/old" activeClassName="active">
              Old
            </PageLink>
          </li>
          <li>
            <PageLink path="/user/1" activeClassName="active">
              User#1
            </PageLink>
          </li>
          <li>
            <PageLink path="/user/2" activeClassName="active">
              User#2
            </PageLink>
          </li>
          <li>
            <PageLink path="/user/3" activeClassName="active">
              User#3
            </PageLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
