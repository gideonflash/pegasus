import { Context, View } from "./enquiry";
import { evalPegasus } from "../pegasusLang/langtools/evaluator";
import { ValidatoinAST } from "../pegasusLang/langtools/types";

export type SelectionResovler = {
  config: string;
  valAst: ValidatoinAST;
};

type Result = { viewName?: string; message: string };
type EvalResult = {
  message: string;
  view?: string;
};

export const evalValidation = (
  validation: ValidatoinAST,
  ctx: Context
): EvalResult => {
  if (validation?.type === "Program") {
    const evaluatedValue = evalPegasus(validation.body, ctx);
    if (evaluatedValue) {
      return {
        view: evaluatedValue.value,
        message: "",
      };
    }
  }

  return {
    message: "",
  };
};

export const getView = (viewConfig: View, ctx: Context): Result => {
  const { view, message } = evalValidation(
    viewConfig.resolverConfig.valAst,
    ctx
  );

  if (view) {
    return { viewName: view, message };
  } else {
    return { message };
  }
};
