import { PageParameters } from "../types/page-parameters"

export const matchParameters = (route: string, path: string): PageParameters => {
  const routeParts = new URL(`http://localhost/${route}`).pathname.split("/").filter(Boolean)
  const pathParts = new URL(`http://localhost/${path}`).pathname.split("/").filter(Boolean)
  const parameters = {}

  return routeParts.reduce((previousParameters, routePart, routePartIndex) => {
    if (routePart.startsWith(":")) {
      return {
        ...previousParameters,
        [`${routePart.slice(1)}`]: pathParts[routePartIndex]
      }
    }

    return parameters
  }, parameters)
}
