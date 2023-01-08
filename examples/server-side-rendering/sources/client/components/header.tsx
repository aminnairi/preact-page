import { PageLink } from "preact-page"
import { route } from "../pages"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <PageLink path={route.home} activeClassName="active">
              Home
            </PageLink>
          </li>
          <li>
            <PageLink path="/about" activeClassName="active">
              About
            </PageLink>
          </li>
          <li>
            <PageLink path={route.user.computed({user: "1"})} activeClassName="active">
              User#1
            </PageLink>
          </li>
          <li>
            <PageLink path={route.user.computed({user: "2"})} activeClassName="active">
              User#2
            </PageLink>
          </li>
          <li>
            <PageLink path={route.user.computed({user: "3"})} activeClassName="active">
              User#3
            </PageLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
