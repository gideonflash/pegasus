import { Context } from "../pegasusRunner/flowRunner";

type PegasusAST = {
  type: "Program";
  body: Resolver | IfExp;
};

export type IfExp = {
  type: "IfStatement";
  test: Equality | LogicalExpression;
  consequent: Resolver;
  alternate?: Resolver | IfExp;
};

export type Resolver =
  | {
      type: "Resolver";
      name: "show";
      view: StringLiteral;
    }
  | {
      type: "Resolver";
      name: "useExperiment";
      experiment: StringLiteral;
      default: StringLiteral;
    };

export type LogicalExpression = {
  type: "LogicalExpression";
  operator: "or" | "and";
  right: Equality | LogicalExpression;
  left: Equality | LogicalExpression;
};

export type Equality = {
  type: "Equality";
  op: "equal";
  field: Identifier;
  arg: string;
};

type ContextIdentifier = keyof Context;

type Identifier = {
  type: "Identifier";
  value: ContextIdentifier;
};

export type Literals = BooleanLiteral | StringLiteral;

export type BooleanLiteral = {
  type: "BooleanLiteral";
  value: boolean;
};

export type StringLiteral = {
  type: "StringLiteral";
  value: string;
};

export type ExperimentLiteral = {
  type: "ExperimentLiteral";
  experimentName: string;
  defaultView: string;
};

export type ValidatoinAST = PegasusAST | null;
