import { Parser } from "./pegasusParser";
import { ValidatoinAST } from "./types";

type AstResult = {
  ast?: ValidatoinAST;
  message: string;
};

export const createAst = (pegasusLangString: string): AstResult => {
  try {
    const ast = Parser.parse(pegasusLangString);

    return {
      ast,
      message: "",
    };
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
};
