import { Card, CardContent } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

type Props = {
  entry: HospitalEntry
  diagnoses: Diagnosis[]
};

const HospitalEntryDetails = ({ entry, diagnoses }: Props) => {
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
        <p>{entry.date} <LocalHospitalIcon /></p>
        <p><em>{entry.description}</em></p>

        {entry.diagnosisCodes && diagnosisList}

        <p>diagnosed by {entry.specialist}</p>

        <p>
          Discharged on {entry.discharge.date}.{' '}
          Criteria: {entry.discharge.criteria}
        </p>
      </CardContent>
    </Card>
  );
};

export default HospitalEntryDetails;
