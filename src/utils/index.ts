/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { FirebaseDate } from "../interfaces";

export function getAgoFormattedDate(firebaseDate: FirebaseDate): string {
  if (!firebaseDate) return "";
  const now = new Date();
  const milliseconds =
    firebaseDate?._seconds * 1000 + firebaseDate._nanoseconds / 1000000;
  const timeDiff = now.getTime() - milliseconds;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  let formattedString = "";
  if (days > 0) {
    formattedString += `${days} day${days > 1 ? "s" : ""}`;
    if (remainingHours > 0) {
      formattedString += ` ${remainingHours} hour${
        remainingHours > 1 ? "s" : ""
      }`;
    }
  } else if (hours > 0) {
    formattedString += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (remainingMinutes > 0) {
      formattedString += ` ${remainingMinutes} minute${
        remainingMinutes > 1 ? "s" : ""
      }`;
    }
  } else if (minutes > 0) {
    formattedString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    if (remainingSeconds > 0) {
      formattedString += ` ${remainingSeconds} second${
        remainingSeconds > 1 ? "s" : ""
      }`;
    }
  } else {
    formattedString += `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return formattedString.trim();
}

export const formattedDate = (firebaseDate: FirebaseDate): string => {
  if (!firebaseDate) return "";
  const dateInMilliseconds =
    firebaseDate?._seconds * 1000 + firebaseDate._nanoseconds / 1000000;
  const date = new Date(dateInMilliseconds).toLocaleString();
  return date;
};

// generate 4 random numbers to be the orderID
export const generateRandomNumbers = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

export const getCloudFlareImageUrl = (res: any) => {
  return `https://imagedelivery.net/hN43VFjQOkIgkZeSM1-gCQ/${res.id}/public`;
};

export const createClassName = (
  props: { className?: string },
  classToAdd: string | string[]
) => {
  return Array.isArray(classToAdd)
    ? `${classToAdd.toString().replaceAll(",", " ")}${
        props.className ? " " + props.className : ""
      } `
    : classToAdd + (props.className ? " " + props.className : "");
};

export const getImageUrl = (image: string | Blob | null) => {
  if (typeof image === "string") return image;
  if (image instanceof Blob) return URL.createObjectURL(image);
  return "";
};

export const generateAlphanumericId = (
  idLength = 8,
  prepend: boolean = false
) => {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = "";
  if (prepend) {
    result = "GnG";
  }

  // Add the remaining characters
  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result.toUpperCase();
};

export const sortByCreatedAt = (a: any, b: any) => {
  if (a.createdAt._seconds !== b.createdAt._seconds) {
    return b.createdAt._seconds - a.createdAt._seconds;
  } else {
    return b.createdAt._nanoseconds - a.createdAt._nanoseconds;
  }
};
export const getSortedData = (data: any[], sortBy: string) => {
  if (sortBy === "createdAt") {
    return data?.slice().sort(sortByCreatedAt);
  }
  return data;
};
