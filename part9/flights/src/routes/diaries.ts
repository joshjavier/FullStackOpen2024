import { Router } from "express";
import * as diaryService from '../services/diaryService';
import { toNewDiaryEntry } from "../utils";

const router = Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const NewDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(NewDiaryEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
