import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber, isNumber, isNumberArray } from "./utils";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNotNumber(height as string) || isNotNumber(weight as string)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  return res.status(200).json({
    weight: Number(weight),
    height: Number(height),
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (isNumber(target) && isNumberArray(daily_exercises)) {
    const result = calculateExercises(daily_exercises, target);
    return res.status(200).json(result);
  } else {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
