import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageParameters = () => {
  return useContext(PageContext).parameters
}
