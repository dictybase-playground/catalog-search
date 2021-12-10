import { ApolloError } from "@apollo/client"

interface ErrorDisplayProps {
  error: ApolloError | undefined
}


export default function ErrorDisplay({ error }: ErrorDisplayProps): JSX.Element {
    return <h2>Error..... {error?.message}</h2>
}
