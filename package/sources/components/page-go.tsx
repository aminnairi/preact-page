import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { usePageGo } from "../hooks/page-go"
import { useReady } from "../hooks/ready"
import { PageGoInterface } from "../types/page-go"

export const PageGo: FunctionComponent<PageGoInterface> = ({ offset }) => {
  const pageGo = usePageGo()
  const ready = useReady()

  useEffect(() => {
    if (ready) {
      pageGo(offset)
    }
  }, [offset, pageGo])

  return null
}

