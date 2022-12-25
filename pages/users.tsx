import { Fragment } from "preact"
import { useMemo } from "preact/hooks"
import { usePageSearchParameters } from "preact-page"

export const UsersPage = () => {
  const pageSearchParameters = usePageSearchParameters()

  console.log(pageSearchParameters)

  const sort = useMemo(() => {
    const sortedBy = pageSearchParameters["sort"]

    if (!sortedBy) {
      return "date"
    }

    return sortedBy
  }, [pageSearchParameters])

  return (
    <Fragment>
      <h1>Users</h1>
      <p>Sorted by {sort}</p>
    </Fragment>
  )
}
