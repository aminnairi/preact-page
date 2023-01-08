import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageProtocol = () => {
  return useContext(PageContext).url.protocol
}
