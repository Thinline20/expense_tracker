import Elysia from "elysia";
import { route as loginRoute } from "./signup";
import { route as signupRoute } from "./login";
import { route as logoutRoute } from "./logout";
import { route as callbackRoute } from "./callback";
import { route as meRoute } from "./me";

export const route = new Elysia({ prefix: "/auth" })
  .use(loginRoute)
  .use(signupRoute)
  .use(logoutRoute)
  .use(callbackRoute)
  .use(meRoute);
