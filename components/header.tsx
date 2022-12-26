import { path } from "../pages"
import { PageLink } from "../sources"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <PageLink path={path.home} activeClassName="active">
              Home
            </PageLink>
          </li>
          <li>
            <PageLink path={path.about} activeClassName="active">
              About
            </PageLink>
          </li>
          <li>
            <PageLink path={path.user.computed({user: "1"})} activeClassName="active">
              User#1
            </PageLink>
          </li>
          <li>
            <PageLink path={path.user.computed({user: "2"})} activeClassName="active">
              User#2
            </PageLink>
          </li>
          <li>
            <PageLink path={path.user.computed({user: "3"})} activeClassName="active">
              User#3
            </PageLink>
          </li>
          <li>
            <PageLink path={path.users} activeClassName="active">
              All Users
            </PageLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
