import { Activity } from "../../lib/activities/models";

export function formatDate(time?: number) {
  if (!time) {
    return "";
  }
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  };
  return (new Date(time)).toLocaleString("en-US", options);
}

export function formatDuration(duration?: number) {
  if (!duration) {
    return "";
  }

  const seconds = duration;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  const displayUnit = (amount: number, label: string): string => {
    if (amount < 1) {
      return "";
    }

    return `${amount}${label}`;
  };

  return `${displayUnit(Math.floor(hours), "h")}
  ${displayUnit(Math.floor(minutes) % 60, "m")}
  ${displayUnit(Math.floor(seconds) % 60, "s")}`;
}

export function extraInfo(a: Activity) {
  switch (a.type) {
    case "strength":
    case "climbing":
      return a.subType ?? "";
    default:
      return "";
  }
}
