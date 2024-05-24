import { BaseError } from "./base-error";

export * from "./backend";

export class NetworkError extends BaseError {
  readonly _tag = "NetworkError";
}

export class JSONParseError extends BaseError {
  readonly _tag = "JSONParseError";
}
