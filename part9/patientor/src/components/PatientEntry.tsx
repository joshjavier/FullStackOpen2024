import { Entry } from "../types";

type Props = {
  entry: Entry
};

const PatientEntry = ({ entry }: Props) => {
  const diagnosesList = (
    <ul>
      {entry.diagnosisCodes?.map(code => (
          <li key={code}>{code}</li>
        ))}
    </ul>
  );

  return (
    <div>
      <p><span>{entry.date}</span> <em>{entry.description}</em></p>

      {entry.diagnosisCodes && diagnosesList}
    </div>
  );
};

export default PatientEntry;
