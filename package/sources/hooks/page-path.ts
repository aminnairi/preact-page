import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePagePath = () => {
  return useContext(PageContext).url.pathname
}
