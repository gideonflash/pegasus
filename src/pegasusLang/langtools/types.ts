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

type Identifier = {
  type: "Identifier";
  value: string;
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

export type ValidatoinAST = PegasusAST | null;
