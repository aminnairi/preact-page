import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageUserName = () => {
  return useContext(PageContext).url.username
}
