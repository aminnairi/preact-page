import { ComponentChildren } from "preact"
import { PageParameters } from "./page-parameters"
import { PageMetaInterface } from "./page-meta"

export interface PageInterface {
  path: string
  title?: (parameters: PageParameters) => string
  description?: (parameters: PageParameters) => string
  metas?: Array<(parameters: PageParameters) => PageMetaInterface>
  element: ComponentChildren
}
