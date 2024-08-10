export function isNotNumber(argument: any): boolean {
  return argument === '' || isNaN(Number(argument))
}
