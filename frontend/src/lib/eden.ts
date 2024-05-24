import { treaty } from "@elysiajs/eden";
import type { App } from "@repo/backend/src";

export const client = treaty<App>("http://localhost:4321");

export const api = client.api;
