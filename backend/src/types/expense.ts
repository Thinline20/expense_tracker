import * as S from "@effect/schema/Schema";

export const ExpenseSchema = S.Struct({
  id: S.NonNegative,
  title: S.String,
  amount: S.NonNegative,
});

export type Expense = S.Schema.Type<typeof ExpenseSchema>;
