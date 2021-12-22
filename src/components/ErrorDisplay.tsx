import { AppProps } from "../types/props"

export default function ErrorDisplay({ error }: AppProps.ErrorDisplayProps): JSX.Element {
  return <h2>Error..... {error?.message}</h2>
}
