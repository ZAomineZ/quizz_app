import { useState } from "#app";
import { User as UserType } from "~/types/User";

export const useAuthUser = () => {
  return useState<UserType | null>("user", () => null);
};
