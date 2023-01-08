import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { usePageBack } from "../hooks/page-back"
import { useReady } from "../hooks/ready"

export const PageBack: FunctionComponent = () => {
  const pageBack = usePageBack()
  const ready = useReady()

  useEffect(() => {
    if (ready) {
      pageBack()
    }
  }, [pageBack, ready])

  return null
}

