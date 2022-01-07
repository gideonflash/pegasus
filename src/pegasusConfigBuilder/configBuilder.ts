import { createAst } from "../pegasusLang/langtools/createAst";
import { ValidatoinAST } from "../pegasusLang/langtools/types";

export type SelctionResolverUI = {
  config: string;
  valAst?: ValidatoinAST;
};

export type ResolverConfig = {
  viewName?: string;
  resolverConfig?: SelctionResolverUI;
};

export type PegasusBuilderConfig = {
  views?: {
    [key: string]: ResolverConfig;
  };
};

type Result = { success: boolean; message: string };

/**
 * 1. Create state
 */

export const createUiState = (): PegasusBuilderConfig => {
  return {
    views: {
      start: {
        viewName: "start",
        resolverConfig: undefined,
      },
    },
  };
};

/**
 * 2. *Add, Update, Remove a view
 * TODO - Remove view
 */
export const addView = (
  viewName: string,
  uiState: PegasusBuilderConfig
): Result => {
  if (viewName === "") {
    return { success: false, message: `${viewName} can not add empty` };
  }
  // add if no vieww
  if (!uiState?.views) {
    uiState.views = {
      [viewName]: {
        viewName,
        resolverConfig: undefined,
      },
    };
    return { success: true, message: `${viewName} added to state` };
  } else if (uiState.views[viewName]) {
    // aready exsit
    return { success: false, message: `${viewName} already exist` };
  } else {
    // does not exsit so you can add
    uiState.views[viewName] = {
      viewName,
      resolverConfig: undefined,
    };
    return { success: true, message: `${viewName} added to state` };
  }
};

/**
 * 4. Add validation type
 *
 */
export const addViewValidation = (
  viewName: string,
  selectionResolver: SelctionResolverUI,
  uiState: PegasusBuilderConfig
): Result => {
  const { ast, message } = createAst(selectionResolver.config);

  const hasView = uiState.views && uiState.views[viewName];
  if (ast && hasView) {
    selectionResolver.valAst = ast;
    const view = uiState.views && uiState.views[viewName];

    if (view) {
      view.resolverConfig = selectionResolver;
      return {
        success: true,
        message: "",
      };
    }
  }

  let errorMessage = "";

  if (!ast) {
    errorMessage = message;
  }

  if (!hasView) {
    errorMessage = `view ${viewName} not found`;
  }

  return {
    success: false,
    message: errorMessage,
  };
};
