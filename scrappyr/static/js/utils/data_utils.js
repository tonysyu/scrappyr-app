export function compareDateStrings(a, b) {
  a = new Date(a);
  b = new Date(b);
  return (a > b) ? -1 : (a < b) ? 1 : 0;
}
