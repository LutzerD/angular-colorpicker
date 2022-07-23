export const valueWithinRange = (val: number, min: number, max: number): boolean{
  if (val === null || val == undefined) return false;
  if (typeof val != 'number') return false;
  return (val >= min && val <= max);
}

