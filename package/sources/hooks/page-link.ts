import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const usePageLink = () => useContext(PageContext).pageLink
