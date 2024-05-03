export class NetworkError {
  readonly _tag = "NetworkError";
}

export class JSONParseError {
  readonly _tag = "JSONParseError";
}

/**
 * @description
 * Represents a validation error that occurred while parsing an expense.
 */
export class ExpenseValidationError {
  readonly _tag = "ExpenseValidationError";
}