import Elysia from "elysia";

export const route = new Elysia().get("/callback", ({ redirect }) => {
  return redirect("/");
});
