import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageGo = () => useContext(PageContext).pageGo
