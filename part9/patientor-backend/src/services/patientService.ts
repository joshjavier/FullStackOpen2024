import patients from "../../data/patients";
import { NonSensitivePatientData } from "../types";

export function getPatients(): NonSensitivePatientData[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}
