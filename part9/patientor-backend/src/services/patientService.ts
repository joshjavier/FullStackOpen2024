import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

export function getPatients(): NonSensitivePatient[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export function getPatientById(id: string): Patient | undefined {
  const patient = patients.find(patient => patient.id === id);
  if (patient)
    patient.entries = [];
  return patient;
}

export function addPatient(patient: NewPatient): Patient {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
}
