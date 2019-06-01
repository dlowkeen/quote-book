export function delay(ms: number) {
  return new Promise((r: any) => setTimeout(r, ms || 100));
}
