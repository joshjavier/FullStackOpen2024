export function isNotNumber(argument: unknown): boolean {
  return argument === '' || isNaN(Number(argument));
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isNumberArray(value: unknown): value is number[] {
  if (!Array.isArray(value)) return false;
  if (value.some(v => !isNumber(v))) return false;
  return true;
}
