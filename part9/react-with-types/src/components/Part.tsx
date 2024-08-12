import { CoursePart } from "../types"
import '../css/part.css'

type Props = {
  part: CoursePart
}

function Part({ part }: Props) {
  const details = {
    description: (part.kind === 'basic' || part.kind === 'background' || part.kind === 'special') && <em>{part.description}</em>,
    projectExercises: part.kind === 'group' && <>project exercises {part.groupProjectCount}</>,
    submitTo: part.kind === 'background' && <>submit to {part.backgroundMaterial}</>,
    requirements: part.kind === 'special' && <>required skills: {part.requirements.join(', ')}</>,
  }

  return (
    <div className="part">
      <p><strong>{part.name} {part.exerciseCount}</strong></p>
      {Object.entries(details).map(([key, value]) => {
        if (value) return <p key={key}>{value}</p>
      })}
    </div>
  )
}

export default Part
