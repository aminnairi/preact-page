import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { usePageForward } from "../hooks/page-forward"
import { useReady } from "../hooks/ready"

export const PageForward: FunctionComponent = () => {
  const pageForward = usePageForward()
  const ready = useReady()

  useEffect(() => {
    if (ready) {
      pageForward()
    }
  }, [pageForward])

  return null
}

