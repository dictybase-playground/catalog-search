module URLSearchParams = {
  type t
  @new external make: string => t = "URLSearchParams"
  @send external get: (t, string) => string = "get"
  @send external has: (t, string) => bool = "has"
}
