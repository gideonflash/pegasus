import { ValidatoinAST } from "../pegasusLang/types";
import {
  addView,
  addViewComponent,
  addViewValidation,
  createUiState,
  PegasusBuilderConfig,
} from "./configBuilder";

describe("UI state views", () => {
  test("Should add view to state", () => {
    const state = createUiState();
    const expectedState: PegasusBuilderConfig = {
      views: {
        start: {
          viewName: "start",
          viewComponent: "start",
          resolverConfig: undefined,
        },
        view1: {
          viewName: "view1",
          resolverConfig: undefined,
        },
      },
    };

    addView("view1", state);

    expect(state).toStrictEqual(expectedState);
  });

  test("Should not update view already exsits", () => {
    const state = createUiState();
    const expectedState: PegasusBuilderConfig = {
      views: {
        start: {
          viewName: "start",
          viewComponent: "start",
          resolverConfig: undefined,
        },
        view1: {
          viewName: "view1",
          resolverConfig: undefined,
        },
      },
    };

    addView("view1", state);
    addView("view1", state);

    expect(state).toStrictEqual(expectedState);
  });
});

describe("UI state view component", () => {
  test("Should add component to view", () => {
    const state: PegasusBuilderConfig = {
      views: {
        view1: {
          resolverConfig: undefined,
        },
      },
    };

    const expectedState: PegasusBuilderConfig = {
      views: {
        view1: {
          viewComponent: "start",
          resolverConfig: undefined,
        },
      },
    };

    addViewComponent("view1", "start", state);

    expect(state).toStrictEqual(expectedState);
  });
});

describe("UI state view config resolvers validation type", () => {
  test("Should add validation config resolver", () => {
    const state: PegasusBuilderConfig = {
      views: {
        view1: {
          resolverConfig: undefined,
        },
      },
    };

    const pegasusLang = `
    if user equal "customer" 
    then show "view1" 
    else useExperiment "experiment" "view"
    `;

    const pegasusLangAst: ValidatoinAST = {
      type: "Program",
      body: {
        type: "IfStatement",
        test: {
          type: "Equality",
          op: "equal",
          field: {
            type: "Identifier",
            value: "user",
          },
          arg: "customer",
        },
        consequent: {
          type: "Resolver",
          name: "show",
          view: {
            type: "StringLiteral",
            value: "view1",
          },
        },
        alternate: {
          type: "Resolver",
          name: "useExperiment",
          experiment: {
            type: "StringLiteral",
            value: "experiment",
          },
          default: {
            type: "StringLiteral",
            value: "view",
          },
        },
      },
    };

    const expectedState: PegasusBuilderConfig = {
      views: {
        view1: {
          resolverConfig: {
            config: pegasusLang,
            valAst: pegasusLangAst,
          },
        },
      },
    };

    addViewValidation("view1", { config: pegasusLang }, state);

    expect(state).toStrictEqual(expectedState);
  });

  test("Should show error message if view logic not valid", () => {
    const state: PegasusBuilderConfig = {
      views: {
        view1: {
          resolverConfig: undefined,
        },
      },
    };

    const pegasusLang = `
     if 
    `;

    const expectedState: PegasusBuilderConfig = {
      views: {
        view1: {
          resolverConfig: undefined,
        },
      },
    };

    const { success } = addViewValidation(
      "view1",
      { config: pegasusLang },
      state
    );

    expect(state).toStrictEqual(expectedState);
    expect(success).toStrictEqual(false);
  });
});
