import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageHash = () => {
  return useContext(PageContext).url.hash
}
