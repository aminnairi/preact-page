export const match = (route: string, path: string): boolean => {
  const routeParts = new URL(`http://localhost/${route}`).pathname.split("/").filter(Boolean)
  const pathParts = new URL(`http://localhost/${path}`).pathname.split("/").filter(Boolean)

  if (routeParts.length !== pathParts.length) {
    return false
  }

  return routeParts.every((routePart, routePartIndex) => {
    if (routePart.startsWith(":")) {
      return true
    }

    const pathPart = pathParts[routePartIndex]

    return routePart === pathPart
  })
}
