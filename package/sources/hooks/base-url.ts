import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const useBaseUrl = () => useContext(PageContext).baseUrl
