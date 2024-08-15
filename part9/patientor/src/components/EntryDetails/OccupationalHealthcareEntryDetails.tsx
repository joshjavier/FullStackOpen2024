import { Card, CardContent } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

type Props = {
  entry: OccupationalHealthcareEntry
  diagnoses: Diagnosis[]
};

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: Props) => {
  const diagnosisList = (
    <ul>
      {entry.diagnosisCodes?.map(code => {
        const name = diagnoses.find(d => d.code === code)?.name;
        return <li key={code}>{code} {name}</li>;
      })}
    </ul>
  );

  return (
    <Card variant="outlined" className="entry">
      <CardContent>
        <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
        <p><em>{entry.description}</em></p>
        <p>Sick Leave: {entry.sickLeave ? (
          `${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`
        ) : (
          'N/A'
        )}</p>

        {entry.diagnosisCodes && diagnosisList}

        <p>diagnosed by {entry.specialist}</p>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;
