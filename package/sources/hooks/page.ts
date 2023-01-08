import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePage = () => useContext(PageContext).page
