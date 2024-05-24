import Elysia from "elysia";

import { route as expensesRoute } from "./expenses";
import { route as authRoute } from "./auth";

function GET() {
  return {
    message: "Hello World!",
  };
}

export const route = new Elysia()
  .get("/", GET)
  .use(expensesRoute)
  .use(authRoute);
