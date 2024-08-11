import { Part } from "../types"

type Props = {
  parts: Part[]
}

function Content({ parts }: Props) {
  return (
    <>
      {parts.map(p => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  )
}

export default Content
