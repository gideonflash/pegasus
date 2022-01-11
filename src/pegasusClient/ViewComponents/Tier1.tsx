import React, { useMemo } from "react";
import {
  Heading,
  Flex,
  Box,
  FormikField,
  FieldGroup,
  IconOption,
} from "@feast-it/pesto";
import { useFormikContext } from "formik";
import { TIER1, TIER_1_ICONS } from "./constants/tier1Types";
import { Context } from "../enquiry";

export const Tier1 = () => {
  const { values } = useFormikContext<Context>();
  const tier1Verticals = TIER1;

  const FIELDS = useMemo(
    () =>
      (tier1Verticals || []).map((vertical) => ({
        label: vertical.name,
        value: vertical.sysName,
        icon: TIER_1_ICONS[vertical.sysName],
      })),
    [tier1Verticals]
  );

  return (
    <Flex alignItems="center" flexDirection="column">
      <Box width="100%" maxWidth={600}>
        <Heading
          textAlign="center"
          mb={3}
          variant={["headingMedium", "headingLarge"]}
          color="blueDark"
        >
          What are you looking for?
        </Heading>
        <Heading
          color="blueDark"
          textAlign="center"
          variant="headingSmall"
          as="h2"
          mb={4}
        >
          We work with a variety of the country’s very best suppliers. Let us
          know what you’re interested in booking for your{" "}
          {values?.category_tier1.toLowerCase() || "event"}!
        </Heading>
      </Box>

      <Box width="100%" maxWidth={600}>
        <FormikField as={FieldGroup} name="category_tier1">
          <Flex justifyContent="center" flexWrap="wrap">
            {FIELDS.map((field) => (
              <IconOption
                key={`tier-1-${field.value}`}
                {...field}
                icon={field.icon}
                label={field.label.replace(" and ", " & ")}
                value={field.value}
                flexBasis={{ _: `${100 / 3}%`, m: "25%" }}
                size={{ _: 64, m: 92 }}
                px={{ _: 4, m: 6 }}
                py={5}
              />
            ))}
          </Flex>
        </FormikField>
      </Box>
    </Flex>
  );
};
