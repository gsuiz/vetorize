import { Matrix, Vector } from "../types";

export const isVector = (param: unknown): param is Vector => {
  if (
    Array.isArray(param) &&
    param.length === 2 &&
    param.every((item) => typeof item === "number")
  ) {
    return true;
  }
  return false;
};

export const isMatrix = (param: unknown): param is Matrix => {
  if (Array.isArray(param) && param.every((item) => isVector(item))) {
    return true;
  }
  return false;
};
