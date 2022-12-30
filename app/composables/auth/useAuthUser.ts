import { useState } from "#app";

export const useAuthUser = () => {
  return useState("user", () => null);
};
