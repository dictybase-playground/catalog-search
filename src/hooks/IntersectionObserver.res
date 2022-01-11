module IntersectionObserverEntry = {
  type t = Dom.intersectionObserverEntry
  @get external isIntersecting: t => bool = "isIntersecting"
}

module IntersectionObserver = {
  type t = Dom.intersectionObserver

  @deriving(abstract)
  type options = {
    @optional root: Dom.element,
    @optional rootMargin: string,
    @optional threshold: float,
  }

  @new
  external new: (array<IntersectionObserverEntry.t> => unit, options) => t = "IntersectionObserver"
  @send external disconnect: t => unit = "disconnect"
  @send external observe: (t, Dom.element) => unit = "observe"
  @send external unobserve: (t, Dom.element) => unit = "unobserve"
}

let useIntersectionObserver = (
  ~target: React.ref<ReactDOM.domRef>,
  ~option: IntersectionObserver.options,
  ~onIntersection: array<IntersectionObserverEntry.t> => unit,
) => {
  let observerRef = React.useRef(IntersectionObserver.new(onIntersection, option))
  React.useEffect3(() => {
    /* if !target.current->Js.Null_undefined.isNullable { */
    /* if !observerRef.current->Js.Nullable.isNullable {
     } */
    observerRef.current.disconnect()
    observerRef.current.observe(target.current)
    /* } */
  }, [option, target, onIntersection])
}
