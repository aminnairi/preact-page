import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageBack = () => useContext(PageContext).pageBack
