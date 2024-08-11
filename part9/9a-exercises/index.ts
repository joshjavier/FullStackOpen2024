import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils";

const app = express();

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
