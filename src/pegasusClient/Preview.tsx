import React from "react";
import { Box, Button, Text, Flex } from "@feast-it/pesto";
import { PegasusClientClientConfig } from "./enquiry";
import { usePegasus } from "./usePegasus";

interface ViewProps {
  config: PegasusClientClientConfig;
}

export const Preview = ({ config }: ViewProps) => {
  const { currentView, logs, onBack, onNext } = usePegasus(config);

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
        <Text fontSize="display" fontWeight="heading" textAlign={"center"}>
          {currentView
            ? `${currentView.viewName.toLocaleUpperCase()} VIEW`
            : `Click Next`}
        </Text>
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
