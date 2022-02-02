import React from "react";
import {
  Heading,
  Flex,
  Box,
  FormikField,
  FieldGroup,
  Option,
} from "@feast-it/pesto";

import { EVENT_TYPES } from "./constants/eventTypes";

export const EventType = () => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Heading
        mb={9}
        textAlign="center"
        variant={["headingMedium", "headingLarge"]}
      >
        What&#39;s the occasion?
      </Heading>

      <Box width="100%" maxWidth={400}>
        <FormikField as={FieldGroup} name="event_type">
          {EVENT_TYPES.map((field) => (
            <Option
              key={`event-type-${field.value}`}
              label={field.label.replace(" and ", " & ")}
              value={field.value}
              icon={field.icon}
              size={{ _: "m", m: "l" }}
              mt={{ _: 2, m: 3 }}
              testId={`event-type-option-${field.value}`}
            />
          ))}
        </FormikField>
      </Box>
    </Flex>
  );
};
