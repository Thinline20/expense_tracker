import { treaty } from "@elysiajs/eden";
import type Elysia from "elysia";
import type { App } from "../../../backend/eden-type";

export const client = treaty<App>("http://localhost:4321");
