export function shuffle<T>(array: T[]): T[] {
  array.sort(() => 0.5 - Math.random());

  return array;
}
