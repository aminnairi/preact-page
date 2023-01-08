import { useContext } from "preact/hooks"
import { PageContext } from "../contexts/page"

export const useReady = () => useContext(PageContext).ready
