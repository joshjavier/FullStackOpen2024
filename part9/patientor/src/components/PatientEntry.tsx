import { Diagnosis, Entry } from "../types";

type Props = {
  entry: Entry
  diagnoses: Diagnosis[]
};

const PatientEntry = ({ entry, diagnoses }: Props) => {
  const diagnosisList = (
    <ul>
      {entry.diagnosisCodes?.map(code => {
        const name = diagnoses.find(d => d.code === code)?.name;
        return <li key={code}>{code} {name}</li>;
      })}
    </ul>
  );

  return (
    <div>
      <p><span>{entry.date}</span> <em>{entry.description}</em></p>

      {entry.diagnosisCodes && diagnosisList}
    </div>
  );
};

export default PatientEntry;
