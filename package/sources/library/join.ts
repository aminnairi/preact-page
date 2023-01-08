export const join = (...paths: Array<string>) => {
  return "/" + paths.filter(Boolean).map(path => {
    return path.split(/\/+/g).filter(Boolean).join("/")
  }).filter(Boolean).join("/")
}
