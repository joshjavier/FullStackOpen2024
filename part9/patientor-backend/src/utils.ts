import { Diagnosis, Discharge, EntryType, Gender, HealthCheckRating, NewEntry, NewPatient, SickLeave } from "./types";

export function toNewPatient(object: unknown): NewPatient {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object
    && 'dateOfBirth' in object
    && 'ssn' in object
    && 'gender' in object
    && 'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: [], // new patients have no entries yet
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

export function toNewEntry(object: unknown): NewEntry {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const newEntry = {} as NewEntry;
  if ('description' in object
    && 'date' in object
    && 'specialist' in object
    && 'type' in object
  ) {
    newEntry.description = parseString(object.description, 'description');
    newEntry.date = parseDate(object.date);
    newEntry.specialist = parseString(object.specialist, 'specialist');
    newEntry.type = parseType(object.type);
  }

  if ('diagnosisCodes' in object) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  if (newEntry.type === 'HealthCheck' && 'healthCheckRating' in object) {
    return Object.assign(newEntry, {
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    });
  }

  if (newEntry.type === 'Hospital' && 'discharge' in object) {
    return Object.assign(newEntry, {
      discharge: parseDischarge(object.discharge),
    });
  }

  if (newEntry.type === 'OccupationalHealthcare') {
    return Object.assign(newEntry, {
      employerName: 'employerName' in object ? parseString(object.employerName, 'employer name') : undefined,
      sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined,
    });
  }

  throw new Error('Incorrect data: some fields are missing');
}

function isValidType(param: string): param is EntryType {
  return Object.values(EntryType).map(String).includes(param);
}

function isHealthCheckRating(param: number): param is HealthCheckRating {
  return Object.values(HealthCheckRating).map(Number).includes(param);
}

function isDischarge(param: object): param is Discharge {
  return 'date' in param && 'criteria' in param;
}

function isSickLeave(param: object): param is SickLeave {
  return 'startDate' in param && 'endDate' in param;
}

function parseType(type: unknown): EntryType {
  if (!isString(type) || !isValidType(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
}

function parseHealthCheckRating(rating: unknown): HealthCheckRating {
  if (typeof rating !== 'number' || !Number.isInteger(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
}

function parseDischarge(discharge: unknown): Discharge {
  if (!discharge || typeof discharge !== 'object' || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
}

function parseSickLeave(sickLeave: unknown): SickLeave | undefined {
  if (!sickLeave) return;
  if (typeof sickLeave !== 'object' || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
}

function parseDiagnosisCodes(codes: unknown): Array<Diagnosis['code']> | undefined {
  if (!codes) return;
  if (!Array.isArray(codes) || codes.some(code => !isString(code))) {
    throw new Error('Incorrect or missing diagnosis codes');
  }
  return codes as Array<Diagnosis['code']>;
}
