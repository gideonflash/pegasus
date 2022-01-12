import { Context, View } from "./enquiry";
import { evalPegasus } from "../pegasusLang/langtools/evaluator";
import { ValidatoinAST } from "../pegasusLang/langtools/types";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import cookiesBrowser from "js-cookie";

const token = cookiesBrowser.get("AUTHENTICATION_TOKEN_V2");

export const GET_TREATMENT_FOR_IDENTIFIER = gql`
  query getTreatment($identifier: String!, $test: String!) {
    getTreatment(identifier: $identifier, test: $test) {
      name
      treatment
    }
  }
`;

const client = new ApolloClient({
  uri: "https://staging-api-graph.feast-it.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

export type SelectionResovler = {
  config: string;
  valAst: ValidatoinAST;
};

type Result = { viewName?: string; message: string };

type ViewResult =
  | {
      type: "view";
      view: string;
      message: string;
    }
  | {
      type: "experiment";
      experimentName: string;
      defaultView: string;
      message: string;
    }
  | {
      type: "error";
      message: string;
    };

export const evalValidation = (
  validation: ValidatoinAST,
  ctx: Context
): ViewResult => {
  if (validation?.type === "Program") {
    const evaluatedValue = evalPegasus(validation.body, ctx);

    if (evaluatedValue) {
      if (evaluatedValue.type === "StringLiteral")
        return {
          type: "view",
          view: evaluatedValue.value,
          message: "",
        };

      if (evaluatedValue.type === "ExperimentLiteral") {
        return {
          type: "experiment",
          defaultView: evaluatedValue.defaultView,
          experimentName: evaluatedValue.experimentName,
          message: "",
        };
      }
    }
  }

  return {
    type: "error",
    message: "",
  };
};

export const getView = async (
  viewConfig: View,
  ctx: Context
): Promise<Result> => {
  const result = evalValidation(viewConfig.resolverConfig.valAst, ctx);

  console.log({ result });
  if (result.type === "error") return { message: result.message };

  if (result.type === "view")
    return { viewName: result.view, message: result.message };

  if (result.type === "experiment") {
    try {
      const experiment = await client.query<{
        getTreatment: { name: string; treatment: string };
      }>({
        query: GET_TREATMENT_FOR_IDENTIFIER,
        variables: {
          identifier: "pegsus-user",
          test: result.experimentName,
        },
      });

      const { name, treatment } = experiment.data.getTreatment;

      if (treatment === "control") {
        return {
          viewName: result.defaultView,
          message: `using experiment ${name}`,
        };
      }

      return {
        viewName: treatment,
        message: "",
      };
    } catch (error: any) {
      return {
        message: error,
      };
    }
  }

  return { message: "" };
};
