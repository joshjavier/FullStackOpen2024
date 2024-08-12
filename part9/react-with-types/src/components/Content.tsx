import Part from "./Part"
import { CoursePart } from "../types"

type Props = {
  parts: CoursePart[]
}

function Content({ parts }: Props) {
  return (
    <>
      {parts.map(p => (
        <Part key={p.name} part={p} />
      ))}
    </>
  )
}

export default Content
