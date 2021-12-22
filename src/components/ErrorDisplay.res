type apolloError = {message: string}

@react.component
let make = (~error: apolloError) => {
  let errorDisplay = "error ...... " ++ error.message
  <h2> {React.string(errorDisplay)} </h2>
}
