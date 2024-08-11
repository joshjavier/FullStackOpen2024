import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NonSensitivePatientData, Patient } from "../types";

export function getPatients(): NonSensitivePatientData[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export function addPatient(patient: NewPatient): Patient {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
}
