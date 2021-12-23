@val @scope("window")
external addEventListener: (string, unit => unit) => unit = "addEventListener"

@val @scope("window")
external removeEventListener: (string, unit => unit) => unit = "removeEventListener"

@val @scope("window")
external innerWidth: int = "innerWidth"

@val @scope("window")
external innerHeight: int = "innerHeight"

type sizeProps = {width: int, height: int}

let useWindowSize = (): sizeProps => {
  let initialState: sizeProps = {width: innerWidth, height: innerHeight}
  let (windowSize, setWindowSize) = React.useState(_ => initialState)
  React.useEffect1(() => {
    let handleResize = () => {
      setWindowSize(_ => {width: innerWidth, height: innerHeight})
    }
    addEventListener("resize", handleResize)
    handleResize()
    Some(() => {removeEventListener("resize", handleResize)})
  }, [setWindowSize])
  windowSize
}
