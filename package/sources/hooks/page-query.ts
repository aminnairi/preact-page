import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageQuery = (): Record<string, string | undefined> => {
  const queries = useContext(PageContext).url.searchParams
  const entries = [...queries]
  const initialQueries = {}

  const unpollutedQueries = entries.reduce((previousQueries, [query, value]) => {
    if (query in previousQueries) {
      return previousQueries
    }

    return {
      ...previousQueries,
      [query]: value
    }
  }, initialQueries)

  return unpollutedQueries
}
