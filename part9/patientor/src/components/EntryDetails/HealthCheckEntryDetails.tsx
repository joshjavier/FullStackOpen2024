import { Card, CardContent } from "@mui/material";
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

type Props = {
  entry: HealthCheckEntry
  diagnoses: Diagnosis[]
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props) => {
  const diagnosisList = (
    <ul>
      {entry.diagnosisCodes?.map(code => {
        const name = diagnoses.find(d => d.code === code)?.name;
        return <li key={code}>{code} {name}</li>;
      })}
    </ul>
  );

  let healthCheckRatingIcon;
  switch (entry.healthCheckRating) {
    case 0:
      healthCheckRatingIcon = <SentimentVerySatisfiedIcon color="success" />;
      break;
    case 1:
      healthCheckRatingIcon = <SentimentSatisfiedIcon color="info" />;
      break;
    case 2:
      healthCheckRatingIcon = <SentimentDissatisfiedIcon color="warning" />;
      break;
    case 3:
      healthCheckRatingIcon = <SentimentVeryDissatisfiedIcon color="error" />;
      break;
    default:
      break;
  }

  return (
    <Card variant="outlined" className="entry">
      <CardContent>
        <p>{entry.date} <MedicalServicesIcon /></p>
        <p><em>{entry.description}</em></p>
        <p>
          {healthCheckRatingIcon}{' '}
          {HealthCheckRating[entry.healthCheckRating]}
        </p>

        {entry.diagnosisCodes && diagnosisList}

        <p>diagnosed by {entry.specialist}</p>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetails;
