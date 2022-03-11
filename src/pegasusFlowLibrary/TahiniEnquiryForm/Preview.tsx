import React from "react";
import { Box, Button, Text, Flex } from "@feast-it/pesto";
import { Formik, FormikHelpers, useFormikContext } from "formik";
import {
  Context,
  PegasusClientClientConfig,
} from "../../pegasusRunner/flowRunner";
import { usePegasus } from "../../pegasusClient/usePegasus";
import { Welcome, EventType, Tier1, Tags } from "./ViewComponents";

interface ViewProps {
  config: PegasusClientClientConfig;
}

/**
 * Context
 */
export type EnquiryContext = {
  user: string;
  event_type: string;
  category_tier1: string;
  tags: string[];
};

export type ViewComponents = Record<
  string,
  {
    name: string;
    component: React.FunctionComponent;
  }
>;

export const viewsCollection: ViewComponents = {
  start: {
    name: "Start page",
    component: Welcome,
  },
  eventType: {
    name: "EventType page",
    component: EventType,
  },
  tier1: {
    name: "Start page",
    component: Tier1,
  },
  tags: {
    name: "Start page",
    component: Tags,
  },
  priorityTags: {
    name: "Start page",
    component: Welcome,
  },
  done: {
    name: "Start page",
    component: Welcome,
  },
};

export const Preview = ({ config }: ViewProps) => {
  return (
    <Formik
      initialValues={
        {
          user: "customer",
          event_type: "",
          category_tier1: "",
          tags: [] as string[],
        } as EnquiryContext
      }
      onSubmit={(
        values: Context,
        { setSubmitting }: FormikHelpers<EnquiryContext>
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <CustomPreview config={config} />
    </Formik>
  );
};

const CustomPreview = ({ config }: ViewProps) => {
  const { values } = useFormikContext<EnquiryContext>();
  const { currentView, logs, onBack, onNext } = usePegasus(config, values);

  return (
    <Box>
      <Box
        p={5}
        minHeight={500}
        border={1}
        borderColor={"greyMedium"}
        borderStyle={"solid"}
        borderRadius={1}
      >
        {currentView ? (
          (() => {
            const Page = viewsCollection[currentView.viewComponent].component;

            return <Page />;
          })()
        ) : (
          <Text>Click Next</Text>
        )}
      </Box>
      <Flex justifyContent={"space-between"} pt={2} pb={4}>
        <Button size="medium" mr={4} onClick={() => onBack()}>
          Back
        </Button>
        <Button size="medium" mr={4} onClick={() => onNext()}>
          next
        </Button>
      </Flex>
      <pre
        style={{
          background: "#EEF3F6",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        {logs}
      </pre>
    </Box>
  );
};
