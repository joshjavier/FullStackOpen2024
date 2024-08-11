import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

export function getDiagnoses(): Diagnosis[] {
  return diagnoses;
}
