// import { isNotNumber } from "./utils"

// interface Args {
//   height: number
//   weight: number
// }

// function parseArguments(args: string[]): Args {
//   if (args.length < 4) throw new Error('Not enough arguments')
//   if (args.length > 4) throw new Error('Too many arguments')

//   if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3]),
//     }
//   } else {
//     throw new Error('Provided values were not numbers!')
//   }
// }

export function calculateBmi(height: number, weight: number): string {
  const bmi = weight / (height ** 2) * 1e4;
  let category;
  if (bmi < 18.5) {
    category = 'underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'overweight';
  } else {
    category = 'obese';
  }
  return category;
}

// try {
//   const { height, weight } = parseArguments(process.argv)
//   console.log(calculateBmi(height, weight))
// } catch (error) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message
//   }
//   console.log(errorMessage)
// }
