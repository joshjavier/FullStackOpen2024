import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Entry, NewEntry, Patient } from "../types";
import { isAxiosError } from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "./EntryDetails";
import { Stack } from "@mui/material";
import AddEntry from "./AddEntry";

type Props = {
  diagnoses: Diagnosis[]
};

const PatientInfoPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>({} as Patient);
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

  const addEntry = async (entry: NewEntry): Promise<{ data?: Entry, error?: string }> => {
    try {
      const newEntry = await patientService.addEntry(entry, id!);
      setPatient(patient => ({
        ...patient,
        entries: patient.entries.concat(newEntry),
      }));
      return { data: newEntry };
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data.replace('Something went wrong. ', '');
        console.log(errorMessage);
        return { error: errorMessage };
      } else {
        console.log('Unknown error: ' + error);
        return { error: 'Unknown error.' };
      }
    }
  };

  if (error || !Object.keys(patient).length) {
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

      <AddEntry addEntry={addEntry} />

      <h3>entries</h3>
      {patient.entries.length ? (
        <Stack spacing={2}>
          {patient.entries.map(entry => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </Stack>
      ) : (
        <div>No entries yet.</div>
      )}
    </div>
  );
};

export default PatientInfoPage;
