// import { isNotNumber } from "./utils";

// interface Args {
//   trainingHours: number[]
//   target: number
// }

// function parseArguments(args: string[]): Args {
//   if (args.length < 4) throw new Error('Not enough arguments');

//   const [target, ...trainingHours] = args.slice(2);
//   if (!isNotNumber(target) && trainingHours.every(val => !isNotNumber(val))) {
//     return {
//       target: Number(target),
//       trainingHours: trainingHours.map(Number),
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export function calculateExercises(trainingHours: number[], target: number): Result {
  const nonzeroDays = (count: number, day: number): number => {
    return day !== 0 ? count + 1 : count;
  };
  const trainingDays = trainingHours.reduce(nonzeroDays, 0);
  const periodLength = trainingHours.length;
  const sum = trainingHours.reduce((sum, val) => sum + val, 0);
  const average = sum / periodLength;
  const success = average >= target;

  let rating;
  if (average > target) {
    rating = 4;
  } else if (average === target) {
    rating = 3;
  } else if (average === 0) {
    rating = 0;
  } else if (trainingDays >= Math.floor(periodLength / 2)) {
    rating = 2;
  } else {
    rating = 1;
  }

  const ratingDescription = [
    'You suck.',
    'You need to exercise more often.',
    'Not too bad but could be better.',
    'Perfect! You reached your target!',
    'Plus ultra! You make All Might proud by going beyond your target.',
  ];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription[rating],
    target,
    average,
  };
}

// try {
//   const { trainingHours, target } = parseArguments(process.argv);
//   console.log(calculateExercises(trainingHours, target));
// } catch (error) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }
