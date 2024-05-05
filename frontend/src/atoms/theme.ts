import { atom } from "nanostores";

export const theme = atom<"light" | "dark" | "system">("light");
