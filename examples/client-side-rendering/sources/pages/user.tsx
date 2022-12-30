import { usePageParameters } from "preact-page"

export default () => {
  const { user } = usePageParameters()

  return (
    <h1>User #{user}</h1>
  )
}
