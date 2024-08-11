import diaries from '../../data/entries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

export function getEntries(): DiaryEntry[] {
  return diaries;
}

export function getNonSensitiveEntries(): NonSensitiveDiaryEntry[] {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
}

export function addDiary(entry: NewDiaryEntry): DiaryEntry {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
}

export function findById(id: number): DiaryEntry | undefined {
  const entry = diaries.find(d => d.id === id);
  return entry;
}
