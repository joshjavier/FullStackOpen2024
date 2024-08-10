function calculateBmi(height: number, weight: number): string {
  const bmi = weight / (height ** 2) * 1e4
  let category
  if (bmi < 18.5) {
    category = 'underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'normal weight'
  } else if (bmi >= 25 && bmi < 30) {
    category = 'overweight'
  } else {
    category = 'obese'
  }
  return category
}

console.log(calculateBmi(180, 74))
