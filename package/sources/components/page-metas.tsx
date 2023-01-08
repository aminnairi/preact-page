import { Fragment, FunctionComponent } from "preact"
import { usePage } from "../hooks/page"
import { usePageParameters } from "../hooks/page-parameters"

export const PageMetas: FunctionComponent = () => {
  const page = usePage()
  const pageParameters = usePageParameters()

  if (!page || !page.metas) {
    return null
  }

  return (
    <Fragment>
      {page.metas.map(getPageMeta => {
        const pageMeta = getPageMeta(pageParameters)

        return (
          <meta name={pageMeta.name} content={pageMeta.content} />
          )
      })}
    </Fragment> 
  )
}

