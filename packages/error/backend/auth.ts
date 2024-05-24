import { BaseError } from "../base-error";

export class InvalidFormData extends BaseError {
  readonly _tag = "InvalidFormDataError";
}

export class InvalidUsernameError extends BaseError {
  readonly _tag = "InvalidUsernameError";
}

export class InvalidPasswordError extends BaseError {
  readonly _tag = "InvalidPasswordError";
}

export class ExistingUserError extends BaseError {
  readonly _tag = "ExistingUserError";
}

export class InvalidSessionError extends BaseError {
  readonly _tag = "InvalidSessionError";
}

export class CannotInvalidateSessionError extends BaseError {
  readonly _tag = "CannotInvalidateSessionError";
}

export class NoMatchingUserError extends BaseError {
  readonly _tag = "NoMatchingUserError";
}
