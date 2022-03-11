import { Context } from "../pegasusRunner/flowRunner";
import { createAst } from "./createAst";
import { evalPegasus } from "./evaluator";

const evaluate = (program: string, ctx: Context) => {
  const parsed = createAst(program);

  if (parsed.ast) {
    const evalRes = evalPegasus(parsed.ast.body, ctx);

    return evalRes;
  }
};

describe("Get views", () => {
  test("Should resolve show value", () => {
    const show = `show "view1"`;

    const result = evaluate(show, { user: "supplier" });

    expect(result).toStrictEqual({ type: "StringLiteral", value: "view1" });
  });

  test("Should resolve if exp", () => {
    const ifExp = `
    if user equal "supplier"
    then show "view2"
    `;

    const result = evaluate(ifExp, { user: "supplier" });

    expect(result).toStrictEqual({ type: "StringLiteral", value: "view2" });
  });

  test("Should resolve if else with resolver", () => {
    const ifExp = `
    if user equal "customer"
    then show "view3" else show "view4"
    `;

    const result = evaluate(ifExp, { user: "supplier", tag: "nice" });

    expect(result).toStrictEqual({ type: "StringLiteral", value: "view4" });
  });

  test("Should resolve if else with another else", () => {
    const ifExp = `
    if user equal "customer"
    then show "view5" 
    else if tag equal "food" then show "view6"
    `;

    const result = evaluate(ifExp, { user: "supplier", tag: "food" });

    expect(result).toStrictEqual({ type: "StringLiteral", value: "view6" });
  });
});
