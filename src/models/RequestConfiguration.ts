export const credentialsValues: RequestInit['credentials'][] = ["include", "omit", "same-origin"];
export const modeValues: RequestInit['mode'][] = ["cors", "navigate", "no-cors", "same-origin"];

export type RequestConfigurationHeader = {
  name: string
  value: string
}

export type RequestConfiguration = {
  headers: RequestConfigurationHeader[],
  credentials: RequestInit['credentials'],
  mode: RequestInit['mode']
}
