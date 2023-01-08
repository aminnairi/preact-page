import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageForward = () => useContext(PageContext).pageForward
