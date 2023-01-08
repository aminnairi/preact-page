export const withParameters = (path: string, parameters: Record<string, string>) => {
  return Object.entries(parameters).reduce((computedPath, [parameterName, parameterValue]) => {
    return computedPath.replace(`:${parameterName}`, parameterValue)
  }, path)
}
