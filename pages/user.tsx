import { Fragment } from "preact"
import { useEffect, useMemo, useState } from "preact/hooks"
import { usePageParameters } from "../sources"

export const UserPage = () => {
  const pageParameters = usePageParameters()

  const user = useMemo(() => {
    return Number(pageParameters["user"] || "0") || 0
  }, [pageParameters])

  return (
    <Fragment>
      <h1>User#{user}</h1>
    </Fragment>
  )
}
