import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageHost = () => {
  return useContext(PageContext).url.host
}
