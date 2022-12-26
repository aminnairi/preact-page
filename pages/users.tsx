import { Fragment } from "preact"
import { useMemo } from "preact/hooks"
import { usePageQuery } from "../sources"

export const UsersPage = () => {
  const queries = usePageQuery()

  const sort = useMemo(() => {
    const sortedBy = queries["sort"]

    if (!sortedBy) {
      return "date"
    }

    return sortedBy
  }, [queries])

  return (
    <Fragment>
      <h1>Users</h1>
      <p>Sorted by {sort}</p>
    </Fragment>
  )
}
