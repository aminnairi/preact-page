import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageUrl = () => {
  return useContext(PageContext).url.href
}
