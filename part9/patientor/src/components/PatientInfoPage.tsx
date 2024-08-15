import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Patient } from "../types";
import { isAxiosError } from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';
import PatientEntry from "./PatientEntry";

type Props = {
  diagnoses: Diagnosis[]
};

const PatientInfoPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const patient = await patientService.getPatient(id!);
        setPatient(patient);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log('Error: ' + error.response?.data);
          setError('Patient not found.');
        } else {
          console.log('Unknown error: ' + error);
          setError('Unknown error occurred.');
        }
      }
    };
    fetchPatientInfo();
  }, [id]);

  if (error || !patient) {
    return <p><em>{error || 'Loading...'}</em></p>;
  }

  const genderIcon = patient.gender === 'male' ? <MaleIcon />
    : patient.gender === 'female' ? <FemaleIcon />
    : <TransgenderIcon />;

  return (
    <div>
      <h2>{patient.name} {genderIcon}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>

      <h3>entries</h3>
      {patient.entries.length ? (
        patient.entries.map(entry => (
          <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      ) : (
        <div>No entries yet.</div>
      )}
    </div>
  );
};

export default PatientInfoPage;
