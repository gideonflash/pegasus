import React, { useEffect, useState } from "react";
import { Text, Box, TextArea, Dropdown } from "@feast-it/pesto";
import { ResolverConfig } from "./configBuilder";
import { Env } from "./ConfigCreator";
import { ViewComponent } from "../pegasusClient/enquiry";
import { viewsCollection } from "../pegasusWorkSpaces/Preview";

interface ViewProps {
  viewName: string;
  addLogicToView: (
    viewName: string,
    stringToParse: string,
    onError: (msg: string) => void
  ) => void;
  addComponentName: (viewName: string, component: ViewComponent) => void;
  viewConfig: ResolverConfig;
}

const componentNames = Object.keys(viewsCollection);
const options = componentNames.map((componentName) => {
  return {
    value: componentName,
    label: componentName,
  };
});

export const ViewEditor = ({
  viewName,
  addLogicToView,
  viewConfig,
  addComponentName,
}: ViewProps) => {
  const [stringToParse, setStringToParse] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (stringToParse !== "" && viewName) {
      addLogicToView(viewName, stringToParse, setErrMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringToParse, viewName]);

  const viewDetails = viewConfig.resolverConfig && viewConfig.resolverConfig;
  const ast = viewDetails && viewDetails.valAst && viewDetails.valAst;

  return (
    <Box p={4} m={2} boxShadow={0} bg="white">
      <Text color="primary" fontSize="small" m={0} fontWeight="heading">
        {viewName.toLocaleUpperCase()}
      </Text>

      <Text color="grey" fontSize="extraSmall" m={0}>
        View component
      </Text>

      <Dropdown
        name="dropdown-single"
        value={viewConfig.viewComponent ?? ""}
        options={options}
        onChange={(selectedComponent: ViewComponent) =>
          addComponentName(viewName, selectedComponent)
        }
        width={360}
        placeholder={"Select component for view"}
      />

      <Text color="grey" fontSize="extraSmall" m={0}>
        Your view logic
      </Text>
      <TextArea
        name="view-logic"
        error={errMsg && errMsg}
        value={stringToParse}
        onChange={(newStringToParse: React.SetStateAction<string>) => {
          setStringToParse(newStringToParse);
        }}
        width={{ m: "93%" }}
        minHeight={60}
        maxHeight={100}
        resize
        fontSize="small"
        bg="greyLight"
        borderColor="greyLight"
        m={0}
      />

      <Text color="grey" fontSize="extraSmall" m={0}>
        Result: {viewDetails && viewDetails.config}
      </Text>
      {Env.debug && <pre>{`${JSON.stringify(ast, null, 2)}`}</pre>}
    </Box>
  );
};
