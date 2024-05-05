import { createRoute } from "~/router";

export function GET() {
  return {
    message: "Hello World!",
  };
}

createRoute("get", "/", GET);
