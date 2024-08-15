import { Diagnosis, Entry } from "../../types";
import '../../css/EntryDetails.css';
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";

type Props = {
  entry: Entry
  diagnoses: Diagnosis[]
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      break;
  }
};

export default EntryDetails;
