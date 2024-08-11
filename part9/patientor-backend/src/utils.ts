import { Gender, NewPatient } from "./types";

export function toNewPatient(object: unknown): NewPatient {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
}

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isSSN(param: string): boolean {
  return /^[A-Za-z0-9]{6}-[A-Za-z0-9]{3,4}$/.test(param);
}

function isGender(param: string): param is Gender {
  return Object.values(Gender).map(String).includes(param);
}

function parseString(value: unknown, field: string): string {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
}

function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
}

function parseSSN(ssn: unknown): string {
  if (!isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
}

function parseGender(gender: unknown): Gender {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
}
