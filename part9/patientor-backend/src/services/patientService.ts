import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";

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
  return patient;
}

export function addPatient(patient: NewPatient): Patient {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
}

export function addEntry(entry: NewEntry, id: string): Entry {
  const newEntry = { id: uuid(), ...entry };
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    throw new Error('No patient with corresponding ID.');
  }

  patient.entries.push(newEntry);
  return newEntry;
}
