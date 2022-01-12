import { Context } from "../../pegasusClient/enquiry";
import {
  BooleanLiteral,
  Equality,
  IfExp,
  LogicalExpression,
  Resolver,
  StringLiteral,
  ExperimentLiteral,
} from "./types";

type Expression = Resolver | IfExp;
type PegasusEval = StringLiteral | ExperimentLiteral;

export const evalPegasus = (
  exp: Expression,
  ctx: Context
): PegasusEval | undefined => {
  const { type } = exp;
  if (type === "Resolver") {
    if (exp.name === "show") {
      return {
        type: "StringLiteral",
        value: exp.view.value,
      };
    }

    if (exp.name === "useExperiment") {
      return {
        type: "ExperimentLiteral",
        experimentName: exp.experiment.value,
        defaultView: exp.default.value,
      };
    }
  }

  if (type === "IfStatement") {
    const test = handleBooleanExpressions(exp.test, ctx);

    if (test?.value && !exp.alternate) {
      return evalPegasus(exp.consequent, ctx);
    }

    if (exp?.alternate && exp.alternate.type === "Resolver") {
      return test?.value
        ? evalPegasus(exp.consequent, ctx)
        : evalPegasus(exp.alternate, ctx);
    }

    if (exp?.alternate && exp.alternate.type === "IfStatement") {
      return evalPegasus(exp.alternate, ctx);
    }
  }
};

function handleBooleanExpressions(
  expression: Equality | LogicalExpression,
  ctx: Context
): BooleanLiteral | undefined {
  if (expression.type === "Equality") {
    const { op, field, arg } = expression;
    if (op === "equal") {
      const isMatch = ctx[field.value] === arg;

      return isMatch
        ? {
            type: "BooleanLiteral",
            value: true,
          }
        : {
            type: "BooleanLiteral",
            value: false,
          };
    }
  }

  if (expression.type === "LogicalExpression") {
    const { operator, right, left } = expression;

    if (operator === "and") {
      const rhs = handleBooleanExpressions(right, ctx);
      const lhs = handleBooleanExpressions(left, ctx);

      return {
        type: "BooleanLiteral",
        value: !!(rhs?.value && lhs?.value),
      };
    }

    if (operator === "or") {
      const rhs = handleBooleanExpressions(right, ctx);
      const lhs = handleBooleanExpressions(left, ctx);

      return {
        type: "BooleanLiteral",
        value: !!(rhs?.value || lhs?.value),
      };
    }
  }
}
