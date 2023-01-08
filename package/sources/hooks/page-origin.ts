import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageOrigin = () => {
  return useContext(PageContext).url.origin
}
