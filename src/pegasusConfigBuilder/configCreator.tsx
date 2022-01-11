import React, { useEffect, useState } from "react";
import { Text, Container } from "@feast-it/pesto";
import {
  addView,
  addViewValidation,
  createUiState,
  addViewComponent,
} from "./configBuilder";
import {
  PegasusClientClientConfig,
  ViewComponent,
} from "../pegasusClient/enquiry";
import { ViewEditor } from "./ViewEditor";
import { ViewAdder } from "./ViewAdder";

interface ConfigCreatorProps {
  onValidConfig: (config: PegasusClientClientConfig | null) => void;
}

export const Env = {
  debug: false,
};
/**
 *
 * Create intial state
 * Add view
 * Remove view
 */

export const ConfigCreator = ({ onValidConfig }: ConfigCreatorProps) => {
  const [config, setConfig] = useState(createUiState());
  const [viewAdderErr, setViewAdderErr] = useState("");
  const [isValidConfig, setIsValidConfig] = useState(false);

  useEffect(() => {
    if (config.views) {
      /**
       * To do
       * check showing views that dont exsist
       * empty views
       * not end no start
       */
      const hasValidViews = Object.entries(config.views).every(
        ([_, resolver]) => {
          const hasResolver = !!resolver.resolverConfig;
          const hasComponentName = !!resolver.viewComponent;

          return hasResolver && hasComponentName;
        }
      );

      setIsValidConfig(hasValidViews);

      if (hasValidViews) {
        onValidConfig(config as PegasusClientClientConfig);
      } else {
        onValidConfig(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const addViewToConfig = (viewName: string) => {
    const result = addView(viewName, config);

    if (!result.success) {
      setViewAdderErr(result.message);
    }

    setConfig((prev) => {
      return { ...prev, ...config };
    });
  };

  const addComponentName = (viewName: string, component: ViewComponent) => {
    const result = addViewComponent(viewName, component, config);

    if (!result.success) {
      setViewAdderErr(result.message);
    }

    setConfig((prev) => {
      return { ...prev, ...config };
    });
  };

  const addLogicToView = (
    viewName: string,
    stringToParse: string,
    onError: (msg: string) => void
  ) => {
    const result = addViewValidation(
      viewName,
      {
        config: stringToParse,
      },
      config
    );

    if (!result.success) {
      onError(result.message);

      // undo invalid config
      if (config?.views && config.views[viewName].resolverConfig) {
        config.views[viewName].resolverConfig = undefined;
      }
      setConfig((prev) => {
        return { ...prev, ...config };
      });
    } else {
      onError("");
      setConfig((prev) => {
        return { ...prev, ...config };
      });
    }
  };

  const views = config.views && Object.entries(config.views);

  return (
    <Container>
      <Text fontWeight="heading">Config builder</Text>

      <Text color="grey" fontSize="small" m={1}>
        Your config is: {isValidConfig ? `valid` : `notValid`}
      </Text>

      <ViewAdder addViewToConfig={addViewToConfig} errMsg={viewAdderErr} />

      {views &&
        views.map(([viewName, viewConfig]) => {
          return (
            <ViewEditor
              key={viewName}
              viewName={viewName}
              addLogicToView={addLogicToView}
              addComponentName={addComponentName}
              viewConfig={viewConfig}
            />
          );
        })}
    </Container>
  );
};
