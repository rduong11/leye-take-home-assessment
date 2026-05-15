import { parse } from "date-fns";

export function msToDay(date: string) {
  return Math.floor(
    (new Date().getTime() - parse(date, "MMMM d, yyyy", new Date()).getTime()) /
      1000 /
      60 /
      60 /
      24,
  );
}
