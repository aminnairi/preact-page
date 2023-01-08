import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePagePort = () => {
  return useContext(PageContext).url.port
}
