import { AppProps } from "../types/props"

export default function LoadingDisplay({ loading }: AppProps.LoadingDisplayProps): JSX.Element {
  let component = <></>
  if (loading) {
    component = <h2>....Loading data....</h2>
  }
  return component
}
