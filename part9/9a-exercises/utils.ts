export function isNotNumber(argument: string): boolean {
  return argument === '' || isNaN(Number(argument));
}
