import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePagePassword = () => {
  return useContext(PageContext).url.password
}
