import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import {
  Heading,
  Text,
  Grid,
  Flex,
  FormikField,
  FormikError,
  FieldGroup,
  Option,
  PillOption,
  Box,
} from "@feast-it/pesto";

import { TagsRequest } from "./constants/tags";
import { EquiryContext } from "../Preview";

const COLORS = [
  "#D4E6A8",
  "#AFD5E7",
  "#FFD4CD",
  "#FFEBB3",
  "#DCCEBB",
  "#FFC69C",
];

export const Tags = () => {
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  const { values, setFieldValue } = useFormikContext<EquiryContext>();
  const { heading, description, tagsType, optionType, tagDestination } = {
    heading: "What’s your event style?",
    description:
      "Let us know what themes are most relevant for your event. You can pick as many as you like.",
    tagsType: "event_theme",
    optionType: "pill",
    tagDestination: "event",
  };

  useEffect(() => {
    if (tagsType) {
      setTags(TagsRequest.map((tag) => ({ label: tag.name, value: tag.uuid })));

      if (values?.tags) {
        setFieldValue("tags", [
          ...values.tags,
          ...values.tags.map((t) => {
            const tag = TagsRequest.find((tag) => tag.name === t);

            if (tag) {
              return tag.uuid;
            }
          }),
        ]);
      }
    }
  }, []);

  return (
    <Flex alignItems="center" flexDirection="column">
      {heading && (
        <Heading
          as="h2"
          textAlign="center"
          variant={{ _: "headingLargeMobile", m: "headingLarge" }}
          color="blueDark"
          mb={0}
        >
          {heading}
        </Heading>
      )}

      {description && (
        <Text color="blueDark" mt={2} mb={0} textAlign="center">
          {description}
        </Text>
      )}

      <FormikError
        mt={2}
        name={"tags"}
        textAlign="center"
        fontSize="small"
        testId="tags-page-error"
      />

      {!!tags.length && (
        <Box mb={9} width="100%" maxWidth={600}>
          <FormikField as={FieldGroup} name={"tags"} mt={4} showError={false}>
            {optionType === "pill" && (
              <Flex justifyContent="center" flexWrap="wrap">
                {tags.map((tag, i) => (
                  <PillOption
                    key={`tag-${tag.value}`}
                    label={tag.label.replace(" and ", " & ")}
                    value={tag.value}
                    color={COLORS[i % COLORS.length]}
                    mx={1}
                    my={2}
                    testId={`tags-option-${tag.value}`}
                  />
                ))}
              </Flex>
            )}
          </FormikField>
        </Box>
      )}
    </Flex>
  );
};
